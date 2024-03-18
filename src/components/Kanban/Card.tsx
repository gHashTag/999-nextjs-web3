import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Task } from "@/types";
import { BackgroundGradient } from "../ui/background-gradient";
import { card } from "@nextui-org/theme";
import { Spacer } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/solid";

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

  const style = {
    opacity: 1,
    transform: CSS.Transform.toString(transform),
  };
  const onTrash = () => {
    console.log("click");
  };

  return (
    <a onClick={handleClick}>
      <BackgroundGradient className="rounded-[22px] sm:p-1 dark:bg-black">
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
          <div
            className="text-2xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold"
            style={{ paddingTop: 10, paddingLeft: 10 }}
          >
            {title}
          </div>

          <div
            className="text-1xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
            style={{ padding: 10 }}
          >
            {description}
          </div>
          {/* <a onClick={onTrash}>
            <TrashIcon
              className="h-6 w-6 text-gray-500"
              style={{ right: 10, marginBottom: 5 }}
            />
          </a> */}
        </div>
      </BackgroundGradient>
      <Spacer x={40} />
      <div id={id.toString()} />
    </a>
  );
};

export default Card;
