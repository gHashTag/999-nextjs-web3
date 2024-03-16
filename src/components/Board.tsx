import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { DotsVerticalIcon, PlusCircleIcon } from "@heroicons/react/outline";
import CardItem from "./Card";

import { supabase } from "@/utils/supabase";

interface BoardItem {
  [status: string]: {
    id: number;
    title: string;
    description: string;
    status: string;
    user_id: number;
    created_at: string;
  }[];
}

type TasksArray = Task[];

interface DropResult {
  draggableId: string;
  type: string;
  reason: string;
  source: {
    index: number;
    droppableId: string;
  };
  destination?: {
    droppableId: string;
    index: number;
  };
}

interface Task {
  id: number;
  user_id: number;
  created_at: string;
  title: string;
  description: string;
  status: string;
}

interface BoardColumn {
  name: string;
  items: Task[];
}

type BoardData = BoardColumn[];

function createGuidId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function Board() {
  const [ready, setReady] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);
  const [tasks, setTasks] = useState<TasksArray | null>(null);

  function transformTasksToBoardData(tasks: TasksArray | null): BoardData {
    const board: BoardItem = {
      Backlog: [],
      "In Progress": [],
      "In Review": [],
      Completed: [],
    };

    tasks?.forEach((task) => {
      const status = task.status.charAt(0).toUpperCase() + task.status.slice(1);
      if (board.hasOwnProperty(status)) {
        // Убедитесь, что объект полностью соответствует интерфейсу Task
        board[status].push({
          id: task.id,
          user_id: task.user_id, // Убедитесь, что это поле присутствует
          created_at: task.created_at, // Убедитесь, что это поле присутствует
          title: task.title,
          description: task.description,
          status: task.status,
        });
      }
    });

    return Object.keys(board).map((status) => ({
      name: status,
      items: board[status],
    }));
  }

  const boardData = transformTasksToBoardData(tasks);

  useEffect(() => {
    const getTasks = async () => {
      try {
        let { data, error } = await supabase.from("tasks").select("*");
        console.log(data, "data");
        if (error) console.error("Error fetching tasks:", error);
        if (data) {
          setTasks(data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    getTasks();
  }, []);

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newBoardData: BoardData = boardData.map((board, index) => {
      if (index.toString() === result.source.droppableId) {
        const newItems = Array.from(board.items);
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        if (result.destination) {
          newItems.splice(result.destination.index, 0, reorderedItem);
        }
        return { ...board, items: newItems };
      }
      return board;
    });

    // Преобразование BoardData обратно в TasksArray
    const newTasksArray: Task[] = newBoardData.reduce((acc: Task[], column) => {
      return acc.concat(column.items);
    }, []);

    setTasks(newTasksArray);
  };

  const addTaskHandler = (e) => {
    e.preventDefault();
    setShowForm(true);
  };

  const onTextAreaKeyPress = (e) => {
    // if (e.keyCode === 13) {
    //   //Enter
    //   const val = e.target.value;
    //   if (val.length === 0) {
    //     setShowForm(false);
    //   } else {
    //     const boardId = e.target.attributes["data-id"].value;
    //     const item = {
    //       id: createGuidId(),
    //       title: val,
    //       priority: 0,
    //       chat: 0,
    //       attachment: 0,
    //       assignees: [],
    //     };
    //     let newBoardData = boardData;
    //     newBoardData[boardId].items.push(item);
    //     setTasks(newBoardData);
    //     setShowForm(false);
    //     e.target.value = "";
    //   }
    // }
  };

  return (
    <>
      {ready && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="mx-8 my-8 grid grid-cols-1 md:grid-cols-4 gap-2">
            {boardData.map((board, bIndex) => (
              <div key={bIndex} className="bg-opacity-50 shadow-md rounded-md ">
                <Droppable droppableId={bIndex.toString()}>
                  {(provider: any) => (
                    <div {...provider.droppableProps} ref={provider.innerRef}>
                      <h4 className="flex justify-between items-center p-2">
                        <span className="uppercase text-xs font-semibold text-gray-600 tracking-[.25em]">
                          {board.name}
                        </span>

                        <DotsVerticalIcon className="w-4 h-4 text-gray-500 mb-4" />
                      </h4>
                      {board.items.length > 0 &&
                        board.items.map((item, iIndex) => {
                          console.log(item, "item");
                          return (
                            <CardItem
                              key={item.id}
                              data={item}
                              index={iIndex}
                            />
                          );
                        })}

                      {showForm && selectedBoard === bIndex ? (
                        <div className="flex flex-col mx-2 mt-3 text-sm ">
                          <textarea
                            rows={3}
                            placeholder="Add Task"
                            onKeyPress={(e) => onTextAreaKeyPress}
                            data-id={bIndex}
                            onKeyDown={(e) => onTextAreaKeyPress(e)}
                            className="flex border border-gray-100 rounded-sm p-2 outline-none"
                          />
                          <p className="text-xs text-gray-500 mt-1 italic">
                            Press Enter to send the data
                          </p>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="flex w-full justify-center items-center my-3 space-x-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition"
                          onClick={() => {
                            setSelectedBoard(bIndex);
                            setShowForm(true);
                          }}
                        >
                          <span>Add Task</span>
                          <PlusCircleIcon className="w-5 h-5 " />
                        </button>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      )}
    </>
  );
}

export default Board;
