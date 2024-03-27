// "use client";
// import { useEffect, useState } from "react";
// // import { useWeb3Auth } from "@hooks/useWeb3Auth";
// import {
//   Spacer,
//   Image,
//   // Button,
//   Pagination,
//   // Card,
//   // CardBody,
// } from "@nextui-org/react";
// import Layout from "@/components/layout";
// import { supabase } from "@/utils/supabase";
// import dynamic from "next/dynamic";

// // import { Space } from "@supabase/ui";
// const Kanban = dynamic(() => import("@/components/Kanban/KanbanBoard"), {
//   ssr: false,
// });
// export default function Tasks() {
//   return (
//     <Layout>
//       <Kanban />
//     </Layout>
//   );
// }
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
import Column, { ColumnType } from "./Column";
import { useState } from "react";
import { BoardData } from "@/types";
import { data } from "./data";

export default function Tasks() {
  // 仮データを定義

  const [columns, setColumns] = useState<BoardData[]>(data);

  const findColumn = (unique: string | null) => {
    // console.log("findColumn called with unique:", unique); // Логируем входной параметр

    if (!unique) {
      // console.log("findColumn: unique is null or undefined");
      return null;
    }

    if (columns.some((c) => c.id === unique)) {
      const foundColumn = columns.find((c) => c.id === unique) ?? null;
      // console.log(
      //   `findColumn: Found column directly with id ${unique}:`,
      //   foundColumn
      // );
      return foundColumn;
    }

    const id = String(unique);
    // console.log("findColumn: Converted unique to string:", id);

    const itemWithColumnId = columns.flatMap((c) => {
      const columnId = c.id;
      // Обновление для новой структуры данных
      return c.cards.map((i) => ({ itemId: i.node.id, columnId: columnId }));
    });

    // console.log("findColumn: itemWithColumnId mapping:", itemWithColumnId);

    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
    // console.log("findColumn: Found columnId from itemWithColumnId:", columnId);

    const foundColumn = columns.find((c) => c.id === columnId) ?? null;
    // console.log(
    //   `findColumn: Found column by columnId ${columnId}:`,
    //   foundColumn
    // );

    return foundColumn;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return;
    }
    setColumns((prevState) => {
      const activeItems = activeColumn.cards.map((card) => card.node); // Обновлено для новой структуры
      const overItems = overColumn.cards.map((card) => card.node); // Обновлено для новой структуры
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);
      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length;
      };
      return prevState.map((c) => {
        if (c.id === activeColumn.id) {
          c.cards = c.cards.filter((i) => i.node.id !== activeId); // Обновлено для новой структуры
          return c;
        } else if (c.id === overColumn.id) {
          const newCards = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex()),
          ];
          c.cards = newCards.map((item, index) => ({
            __typename: "tasksEdge",
            node: item,
          })); // Обновлено для новой структуры
          return c;
        } else {
          return c;
        }
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log("Drag End Event:", event);
    console.log(`Active ID: ${active.id}, Over ID: ${over ? over.id : "null"}`);

    if (over) {
      const activeId = active.id;
      const overId = over.id;
      let newColumns = [...columns];
      let sourceColumnIndex,
        destinationColumnIndex,
        sourceItemIndex,
        destinationItemIndex;

      newColumns.forEach((column, columnIndex) => {
        column.cards.forEach((card, itemIndex) => {
          if (card.node.id === activeId) {
            sourceColumnIndex = columnIndex;
            sourceItemIndex = itemIndex;
          }
          if (card.node.id === overId) {
            destinationColumnIndex = columnIndex;
            destinationItemIndex = itemIndex;
          }
        });
      });

      if (
        sourceColumnIndex !== undefined &&
        destinationColumnIndex !== undefined &&
        sourceItemIndex !== undefined
      ) {
        const itemToMove = newColumns[sourceColumnIndex].cards[sourceItemIndex];
        newColumns[sourceColumnIndex].cards.splice(sourceItemIndex, 1);
        if (destinationItemIndex !== undefined) {
          newColumns[destinationColumnIndex].cards.splice(
            destinationItemIndex,
            0,
            itemToMove
          );
        } else {
          // Если overId не совпадает ни с одной задачей, возможно, мы перетаскиваем в пустую колонку.
          // В этом случае, мы просто добавляем элемент в конец колонки.
          newColumns[destinationColumnIndex].cards.push(itemToMove);
        }
        setColumns(newColumns);
      }
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const openModal = () => {
    console.log("openModal");
  };
  return (
    // 今回は長くなってしまうためsensors、collisionDetectionなどに関しての説明は省きます。
    // ひとまずは一番使われていそうなものを置いています。
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-1">
          {columns &&
            columns.map((value: BoardData) => {
              if (value.cards) {
                console.log(value, "value");
                return (
                  <Column
                    key={value.id}
                    id={value.id}
                    title={value.title}
                    // Преобразование структуры данных карточек перед передачей
                    cards={value.cards.map((card) => card.node)}
                    openModal={openModal}
                  />
                );
              }
            })}
        </div>
      </div>
    </DndContext>
  );
}
