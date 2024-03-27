import { FC } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card, { CardType } from "./Card";
import { Task } from "@/types";

interface ColumnProps {
  id: string;
  title: string;
  cards: CardType[];
  openModal: (cardId: string) => void;
}

const Column: FC<ColumnProps> = ({ id, title, cards, openModal }) => {
  const { setNodeRef } = useDroppable({ id: id });
  console.log(cards, "cards");
  return (
    // ソートを行うためのContextです。
    // strategyは4つほど存在しますが、今回は縦・横移動可能なリストを作るためrectSortingStrategyを採用
    <SortableContext
      id={id}
      items={cards && cards.map((card) => ({ id: card.id }))}
      strategy={rectSortingStrategy}
    >
      <div
        ref={setNodeRef}
        style={{
          width: "200px",
          background: "rgba(245,247,249,1.00)",
          marginRight: "10px",
        }}
      >
        <p
          style={{
            padding: "5px 20px",
            textAlign: "left",
            fontWeight: "500",
            color: "#575757",
          }}
        >
          {title}
        </p>
        {cards.map((card) => (
          <Card key={card.id} id={card.id} title={card.title}></Card>
        ))}
      </div>
    </SortableContext>
  );
};

export default Column;
