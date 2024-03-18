import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Task } from "@/types";
import { BackgroundGradient } from "../ui/background-gradient";
import { card } from "@nextui-org/theme";
import { Spacer } from "@nextui-org/react";

const Card: FC<Task> = ({ id, title, description }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: id,
  });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      <div id={id.toString()}>
        <BackgroundGradient>
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
        </BackgroundGradient>
        <Spacer x={40} />
      </div>
    </div>
  );
};

export default Card;
