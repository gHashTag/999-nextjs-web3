import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column from "./Column";

import { useSupabase } from "@/hooks/useSupabase";
import { Board, BoardData, StatusMap, Task, TasksArray } from "@/types";
import { Button } from "@/components/ui/moving-border";
import { useCallback, useEffect, useState } from "react";
import TaskModal from "./TaskModal";
import { gql, useQuery, useReactiveVar, useMutation } from "@apollo/client";
import apolloClient from "@/apollo/apollo-client";
import { useDisclosure } from "@nextui-org/react";
import { setUserId } from "@/apollo/reactive-store";

const QUERY = gql`
  query TasksCollection {
    tasksCollection {
      edges {
        node {
          id
          user_id
          created_at
          title
          description
          updated_at
          due_date
          priority
          assigned_to
          labels
          completed_at
          is_archived
          status
        }
      }
    }
  }
`;

const MUTATION = gql`
  mutation updatetasksCollection(
    $id: BigInt!
    $status: BigInt!
    $updated_at: Datetime!
  ) {
    updatetasksCollection(
      filter: { id: { eq: $id } }
      set: { status: $status, updated_at: $updated_at }
    ) {
      records {
        id
        user_id
        title
        description
        status
        due_date
        assigned_to
        completed_at
        is_archived
        updated_at
        created_at
        labels
        priority
      }
    }
  }
`;

function KanbanBoard() {
  const user_id = useReactiveVar(setUserId);
  const { loading, error, data, refetch } = useQuery(QUERY, {
    client: apolloClient,
    fetchPolicy: "network-only",
  });
  console.log(data);
  const [mutateUpdateTaskStatus] = useMutation(MUTATION, {
    client: apolloClient,
  });
  // const { updateTaskStatus } = useSupabase();
  const [boardData, setBoardData] = useState<BoardData[]>([]);
  const statusToColumnName: Record<number, string> = {
    1: "To Do",
    2: "In Progress",
    3: "Review",
    4: "Done",
  };

  const transformTasksToBoardData = useCallback(
    (tasksFromServer: TasksArray): BoardData[] => {
      const board: Board = {
        "To Do": [],
        "In Progress": [],
        Review: [],
        Done: [],
      };

      tasksFromServer.forEach((task) => {
        const columnName = statusToColumnName[task.node.status];
        if (columnName && board[columnName]) {
          board[columnName].push({
            __typename: task.__typename,
            node: {
              ...task.node,
            },
          });
        }
      });

      const newData = Object.entries(board).map(([title, cards]) => ({
        id: title,
        title,
        cards,
      }));

      return newData;
    },
    []
  );
  // if (loading) return <p>Loading...</p>;
  ///  if (error) return <p>Error : {error.message}</p>;
  //
  useEffect(() => {
    if (data) {
      const newData = transformTasksToBoardData(data.tasksCollection.edges);
      console.log(newData, "newData");
      setBoardData(newData);
    }
  }, [data]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const findColumn = (unique: string | null) => {
    if (!unique || !boardData) {
      return null;
    }

    if (boardData.some((c) => String(c.id) === String(unique))) {
      return boardData.find((c) => String(c.id) === String(unique)) ?? null;
    }

    const id = String(unique);
    const itemWithColumnId = boardData.flatMap((card: BoardData) => {
      const columnId = card.id;
      return card.cards?.map((i: Task) => ({
        itemId: i.node.id,
        columnId: columnId,
      }));
    });

    const columnId = itemWithColumnId.find(
      (i) => String(i?.itemId) === id
    )?.columnId;
    return boardData.find((c) => String(c.id) === String(columnId)) ?? null;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);

    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }

    setBoardData((prevState: BoardData[]) => {
      if (!prevState) {
        return [];
      }
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;
      const activeIndex = activeItems
        ? activeItems.findIndex((i) => String(i.node.id) === activeId)
        : -1;
      const overIndex = overItems
        ? overItems.findIndex((i) => String(i.node.id) === overId)
        : -1;

      const newIndex = () => {
        const putOnBelowLastItem =
          overItems && overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0
          ? overIndex + modifier
          : (overItems ? overItems.length : 0) + 1;
      };
      return prevState?.map((c) => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems
            ? activeItems.filter((i) => String(i.node.id) !== activeId)
            : [];
          return c;
        } else if (c.id === overColumn.id) {
          c.cards = [
            ...(overItems ? overItems.slice(0, newIndex()) : []),
            ...(activeItems ? [activeItems[activeIndex]] : []),
            ...(overItems ? overItems.slice(newIndex(), overItems.length) : []),
          ];
          return c;
        } else {
          return c;
        }
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null;
    }

    function getColumnStatus(columnId: string): number {
      const statusMap: StatusMap = {
        "To Do": 1,
        "In Progress": 2,
        Review: 3,
        Done: 4,
      };
      return statusMap[columnId] || 1;
    }

    const newStatus = getColumnStatus(overColumn.id.toString());
    console.log(newStatus, "newStatus");
    mutateUpdateTaskStatus({
      variables: {
        id: activeId,
        status: newStatus,
        updated_at: new Date().toISOString(),
      },
    });

    const activeIndex = activeColumn.cards
      ? activeColumn.cards.findIndex((i) => String(i.node.id) === activeId)
      : -1;
    const overIndex = overColumn.cards
      ? overColumn.cards.findIndex((i) => String(i.node.id) === overId)
      : -1;
    if (activeIndex !== overIndex) {
      setBoardData((prevState) => {
        if (!prevState) {
          return [];
        }
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            if (overColumn.cards) {
              column.cards = arrayMove(
                overColumn.cards,
                activeIndex,
                overIndex
              );
            }
            return column;
          } else {
            return column;
          }
        });
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div style={{ paddingLeft: 40, paddingTop: 40 }}>
      <div style={{ position: "fixed", top: 100, right: 30 }}>
        <Button onClick={onOpen}>Create task</Button>
      </div>

      <TaskModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-1">
          {boardData &&
            boardData.map((value: BoardData) => {
              console.log(value.cards);
              return (
                <Column
                  key={value.id}
                  id={value.id}
                  title={value.title}
                  cards={value.cards}
                />
              );
            })}
        </div>
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
//https://codesandbox.io/p/sandbox/dnd-kit-kanban-board-1df69n?
