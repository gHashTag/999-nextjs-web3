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
import { useState } from "react";
import { useSupabaseBoard } from "@/hooks/useSupabaseBoard";
import { BoardData } from "@/types";

function KanbanBoard() {
  const { boardData, setBoardData } = useSupabaseBoard();

  const findColumn = (unique: string | null) => {
    if (!unique || !boardData) {
      return null;
    }

    if (boardData.some((c) => String(c.id) === String(unique))) {
      return boardData.find((c) => String(c.id) === String(unique)) ?? null;
    }

    const id = String(unique);
    const itemWithColumnId = boardData.flatMap((c) => {
      const columnId = c.id;
      return c.cards.map((i) => ({ itemId: i.id, columnId: columnId }));
    });

    const columnId = itemWithColumnId.find(
      (i) => String(i.itemId) === id
    )?.columnId;
    return boardData.find((c) => c.id === columnId) ?? null;
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
    setBoardData((prevState: BoardData | null) => {
      if (!prevState) {
        return null;
      }
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;
      const activeIndex = activeItems.findIndex(
        (i) => String(i.id) === activeId
      );
      const overIndex = overItems.findIndex((i) => String(i.id) === overId);
      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };
      return prevState?.map((c) => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems.filter((i) => String(i.id) !== activeId);
          return c;
        } else if (c.id === overColumn.id) {
          c.cards = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex(), overItems.length),
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
    const activeIndex = activeColumn.cards.findIndex(
      (i) => String(i.id) === activeId
    );
    const overIndex = overColumn.cards.findIndex(
      (i) => String(i.id) === overId
    );
    if (activeIndex !== overIndex) {
      setBoardData((prevState) => {
        if (!prevState) {
          return null;
        }
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            column.cards = arrayMove(overColumn.cards, activeIndex, overIndex);
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
          boardData.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              cards={column.cards}
            ></Column>
          ))}
      </div>
    </DndContext>
  );
}

export default KanbanBoard;
