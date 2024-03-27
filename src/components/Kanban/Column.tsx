import React from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";
import { Task } from "@/types";

interface ColumnProps {
  id: string;
  title: string;
  cards: Task[];
  openModal: (cardId: string) => void;
}

const Column = ({ id, title, cards, openModal }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        minHeight: "100px",
        minWidth: "200px",
        width: "280px",
        background: "transparent",
        marginRight: "10px",
        marginBottom: "80px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SortableContext
        id={id}
        items={cards ? cards.map((card) => ({ id: card.node.id })) : []}
        strategy={rectSortingStrategy}
      >
        <p
          style={{
            padding: "5px 40px",
            textAlign: "left",
            fontWeight: "500",
            color: "#575757",
            marginBottom: "20px",
            fontSize: "15px",
          }}
        >
          {title}
        </p>

        {cards.length > 0 ? (
          cards.map((card) => (
            <Card
              key={card.node.id}
              node={{
                id: card.node.id,
                title: card.node.title,
                description: card.node.description,
              }}
              onClick={() => openModal(card.node.id)}
            />
          ))
        ) : (
          <div style={{ padding: "10px", minHeight: "20px" }}>
            Перетащите задачи сюда
          </div>
        )}
      </SortableContext>
    </div>
  );
};

export default Column;
