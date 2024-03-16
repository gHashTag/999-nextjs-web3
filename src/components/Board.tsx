import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { DotsVerticalIcon, PlusCircleIcon } from "@heroicons/react/outline";
import CardItem from "./Card";

import { supabase } from "@/utils/supabase";
import { BoardData, BoardItem, DropResult, Task, TasksArray } from "@/types";
import { useSupabaseBoard } from "@/hooks/useSupabase";

function createGuidId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function Board() {
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);

  const { tasks, setTasks, boardData, setBoardData } = useSupabaseBoard();

  if (boardData === null) {
    // Обработка состояния загрузки или отсутствия данных
    return <div>Loading...</div>;
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newBoardData: BoardData = boardData?.map((board, index) => {
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
                          <CardItem key={item.id} data={item} index={iIndex} />
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
    </>
  );
}

export default Board;
