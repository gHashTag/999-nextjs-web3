import { Draggable } from "react-beautiful-dnd";

interface CardItemProps {
  data: { id: number; [key: string]: any }; // Assuming `id` is a number
  index: number;
}

const CardItem: React.FC<CardItemProps> = ({ data, index }) => {
  if (!data || data.id == null) {
    // Handle the undefined case, e.g., render nothing or a placeholder
    return null;
  }
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => {
        return (
          <div
            className="bg-black rounded-2xl shadow-sm p-2 m-2"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div style={{ paddingTop: 5 }} key={index}>
              <div
                className="text-2xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold"
                style={{ padding: 5 }}
              >
                {data.title}
              </div>
              <div
                className="text-1xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                style={{
                  padding: 10,
                  color: "gray",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {data.description}
              </div>

              {/* Spacer компонент должен быть импортирован или его использование должно быть убрано */}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default CardItem;
