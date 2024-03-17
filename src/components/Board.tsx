import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { DotsVerticalIcon, PlusCircleIcon } from "@heroicons/react/outline";
import CardItem from "./Card";

import { supabase } from "@/utils/supabase";
import {
  BoardColumn,
  BoardData,
  BoardItem,
  DropResult,
  Task,
  TaskStatus,
  TasksArray,
} from "@/types";
import { useSupabaseBoard } from "@/hooks/useSupabase";

const statusMapping: {
  [key: number]: number;
} = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
};

function Board() {
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);

  const {
    setTasks,
    boardData,
    fetchBoardData,
    updateTaskStatus,
    setBoardData,
  } = useSupabaseBoard();

  if (boardData === null) {
    // Обработка состояния загрузки или отсутствия данных
    return <div>Loading...</div>;
  }

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const taskId = parseInt(result.draggableId);
    const newStatusId = parseInt(result.destination.droppableId) + 1;

    if (!statusMapping[newStatusId]) {
      console.error(`Статус '${newStatusId}' не существует на доске.`);
      return;
    }

    const newStatus = newStatusId as TaskStatus;

    // Сохраняем текущее состояние для возможного отката
    const previousBoardData = [...boardData];

    const optimisticUpdatedBoardData = boardData.map((board, index) => {
      if (index === parseInt(result.source.droppableId)) {
        const copiedItems = [...board.items];
        const [removed] = copiedItems.splice(result.source.index, 1);
        copiedItems.splice(result.destination.index, 0, removed);
        return { ...board, items: copiedItems };
      }
      return board;
    });

    setBoardData(optimisticUpdatedBoardData);

    try {
      await updateTaskStatus(taskId, newStatus);
      // Подтверждаем изменения, обновляя данные с сервера
      fetchBoardData();
    } catch (error) {
      console.error("Ошибка при обновлении статуса задачи:", error);
      // Откатываем изменения в случае ошибки
      setBoardData(previousBoardData);
    }
  };

  const addTaskHandler = (e: any) => {
    e.preventDefault();
    setShowForm(true);
  };

  const onTextAreaKeyPress = (e: any) => {};

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
