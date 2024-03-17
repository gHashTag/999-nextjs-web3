// hooks/useSupabaseBoard.ts
import { useState, useEffect, useCallback, useMemo } from "react";
import { Task, BoardData, TasksArray } from "@/types"; // Предполагается, что типы определены в отдельном файле types.ts
import { supabase } from "@/utils/supabase";

export function useSupabaseBoard() {
  const [tasks, setTasks] = useState<TasksArray>([]);
  const [boardData, setBoardData] = useState<BoardData[]>([]);
  console.log(boardData, "boardData");
  const [error, setError] = useState<string | null>(null);
  console.log(error, "error");
  // console.log(boardData, "boardData");
  const statusToColumnName: Record<number, string> = {
    1: "To Do",
    2: "In Progress",
    3: "Review",
    4: "Done",
  };

  const transformTasksToBoardData = useCallback(
    (tasksFromServer: TasksArray): BoardData[] => {
      const board = {
        "To Do": [],
        "In Progress": [],
        Review: [],
        Done: [],
      };
      console.log(board, "board");
      tasksFromServer.forEach((task) => {
        const columnName =
          task.status !== undefined ? statusToColumnName[task.status] : "";

        if (columnName && board[columnName]) {
          board[columnName].push({
            ...task,
            id: task.id.toString(), // FIXME Преобразование id к строке очень важно иначе ломается скрипт DND @dnd-kit
          });
        } else {
          console.error(
            `Status '${task.status}' does not have a corresponding column. Current board:`,
            board
          );
        }
      });

      return Object.entries(board).map(
        ([title, cards]) =>
          ({
            id: title,
            title,
            cards,
          } as unknown as BoardData)
      ) as BoardData[];
    },
    []
  );

  const fetchBoardData = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("tasks").select("*");

      if (error) throw error;

      const transformedData = transformTasksToBoardData(data);
      console.log(transformedData, "transformedData");
      setBoardData(transformedData);
    } catch (error: any) {
      console.error(error); // Логируем полную ошибку для дебага
      setError(`Ошибка при загрузке данных доски: ${error.message}`);
    }
  }, [transformTasksToBoardData]);

  // Получение всех задач
  const fetchTasks = useCallback(async () => {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) {
      console.error("Ошибка при получении задач:", error);
    } else {
      setTasks(data || []);
    }
  }, []);

  // Создание новой задачи
  const createTask = async (task: Omit<Task, "id">) => {
    const { data, error } = await supabase.from("tasks").insert([task]);
    if (error) {
      console.error("Ошибка при создании задачи:", error);
    } else if (data) {
      // Убедитесь, что data не null и является массивом
      setTasks([...tasks, ...data]);
    }
  };

  // Обновление задачи
  const updateTask = async (id: number, updatedFields: Partial<Task>) => {
    const { data, error } = await supabase
      .from("tasks")
      .update(updatedFields)
      .match({ id });

    if (error) {
      console.error("Ошибка при обновлении задачи:", error);
    } else if (data) {
      // Проверяем, что data не null и является массивом
      setTasks(
        tasks.map((task) => (task.id === id ? { ...task, ...data[0] } : task))
      );
    }
  };

  // Удаление задачи
  const deleteTask = async (id: number) => {
    const { error } = await supabase.from("tasks").delete().match({ id });
    if (error) {
      console.error("Ошибка при удалении задачи:", error);
    } else {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const updateTaskStatus = async (taskId: number, newStatus: number) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .match({ id: taskId });
      if (error) {
        console.error("Ошибка при обновлении статуса задачи:", error);
      } else {
        console.log(data, "updateTaskStatus data");
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса задачи:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchBoardData().then(() => {
      if (!isMounted) return;
      // ...другие действия, если компонент все еще смонтирован
    });
    return () => {
      isMounted = false;
    };
  }, [fetchBoardData]);

  return {
    tasks,
    setTasks,
    boardData,
    setBoardData,
    fetchBoardData,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
  };
}
