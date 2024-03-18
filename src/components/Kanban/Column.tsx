import { FC } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";
import { BoardData } from "@/types";

const Column: FC<BoardData> = ({ id, title, cards }) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <SortableContext id={id} items={cards || []} strategy={rectSortingStrategy}>
      <div
        ref={setNodeRef}
        style={{
          width: "300px",
          background: "transparent",
          marginRight: "10px",
          marginBottom: "80px",
        }}
      >
        <p
          style={{
            padding: "5px 40px",
            textAlign: "left",
            fontWeight: "500",
            color: "#575757",
            marginBottom: "20px",
          }}
        >
          {title}
        </p>
        {cards?.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </SortableContext>
  );
};

export default Column;
