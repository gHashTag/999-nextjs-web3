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

import { useSupabaseBoard } from "@/hooks/useSupabaseBoard";
import { BoardData, StatusMap, Task } from "@/types";

function KanbanBoard() {
  const { boardData, setBoardData, updateTaskStatus } = useSupabaseBoard();

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
        itemId: i.id,
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
        ? activeItems.findIndex((i) => String(i.id) === activeId)
        : -1;
      const overIndex = overItems
        ? overItems.findIndex((i) => String(i.id) === overId)
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
            ? activeItems.filter((i) => String(i.id) !== activeId)
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

    updateTaskStatus(Number(activeId), newStatus);

    const activeIndex = activeColumn.cards
      ? activeColumn.cards.findIndex((i) => String(i.id) === activeId)
      : -1;
    const overIndex = overColumn.cards
      ? overColumn.cards.findIndex((i) => String(i.id) === overId)
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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div
        className="App"
        style={{ display: "flex", flexDirection: "row", padding: "20px" }}
      >
        {boardData &&
          boardData.map(
            (value: BoardData, index: number, array: BoardData[]) => {
              return (
                <Column
                  key={value.id}
                  id={value.id}
                  title={value.title}
                  cards={value.cards}
                />
              );
            }
          )}
      </div>
    </DndContext>
  );
}

export default KanbanBoard;
//https://codesandbox.io/p/sandbox/dnd-kit-kanban-board-1df69n?
