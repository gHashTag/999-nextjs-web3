import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Task } from "@/types";
import { BackgroundGradient } from "../ui/background-gradient";
import { card } from "@nextui-org/theme";
import { Spacer } from "@nextui-org/react";

interface CardProps extends Task {
  onClick?: () => void;
  openModal: (id: string) => void; // Добавление функции openModal в пропсы
}

const Card: FC<CardProps> = ({
  id,
  title,
  description,
  onClick,
  openModal,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: id,
  });

  const handleClick = () => {
    console.log(handleClick, "handleClick");
    if (onClick) {
      onClick(); // Вызов существующего onClick
    }
    openModal(id); // Вызов функции openModal с id карточки
  };

  return (
    <a onClick={handleClick}>
      <BackgroundGradient className="rounded-[22px] sm:p-1 dark:bg-zinc-300">
        <div ref={setNodeRef} {...attributes} {...listeners}>
          <div
            className="text-2xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold"
            style={{ paddingTop: 10, paddingLeft: 5, paddingRight: 5 }}
          >
            {title}
          </div>

          <div
            className="text-1xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
            style={{ padding: 10, color: "gray" }}
          >
            {description}
          </div>
        </div>
      </BackgroundGradient>
      <Spacer x={40} />
      <div id={id.toString()}>
        <span>edit</span>
      </div>
    </a>
  );
};

export default Card;
