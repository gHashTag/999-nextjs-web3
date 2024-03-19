// hooks/useSupabaseBoard.ts
import { useState, useEffect, useCallback, useMemo } from "react";
import { Task, BoardData, TasksArray, Board } from "@/types"; // Предполагается, что типы определены в отдельном файле types.ts
import { supabase } from "@/utils/supabase";
import { useWeb3Auth } from "./useWeb3Auth";

export function useSupabaseBoard() {
  const [tasks, setTasks] = useState<TasksArray>([]);
  const [boardData, setBoardData] = useState<BoardData[]>([]);

  const [error, setError] = useState<string | null>(null);

  // console.log(boardData, "boardData");
  const statusToColumnName: Record<number, string> = {
    1: "To Do",
    2: "In Progress",
    3: "Review",
    4: "Done",
  };

  const transformTasksToBoardData = useCallback(
    (tasksFromServer: TasksArray): BoardData[] => {
      const board: Board = {
        "To Do": [],
        "In Progress": [],
        Review: [],
        Done: [],
      };

      tasksFromServer.forEach((task) => {
        const columnName =
          task.status !== undefined ? statusToColumnName[task.status] : "";

        if (columnName && board[columnName]) {
          board[columnName].push({
            ...task,
            id: task.id.toString(),
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
      // console.log(transformedData, "transformedData");
      setBoardData(transformedData);
    } catch (error: any) {
      console.error("fetchBoardData", error);
      setError(`Ошибка при загрузке данных доски: ${error}`);
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

  const createTask = async (task: Omit<Task, "id">) => {
    const user_id = localStorage.getItem("user_id");
    // Проверка наличия user_id
    if (!user_id) {
      console.error("Ошибка: User Id не найден. Создание задачи невозможно.");
      return; // Ранний возврат, если user_id отсутствует
    }

    // Попытка создания задачи
    const { error } = await supabase
      .from("tasks")
      .insert([{ user_id, ...task }]);

    // Обновление данных доски после успешного создания задачи
    fetchBoardData();

    if (error) {
      console.error("Ошибка при создании задачи:", error.message);
      return; // Ранний возврат, если произошла ошибка
    }
  };

  // Обновление задачи
  const updateTask = async (id: number, updatedFields: Partial<Task>) => {
    console.log(id, "id");
    const { error } = await supabase
      .from("tasks")
      .update(updatedFields)
      .match({ id });

    console.log(error, "error");
    fetchBoardData();
    if (error) {
      console.error("Ошибка при обновлении задачи:", error);
    } else {
      fetchBoardData();
    }
  };

  // Удаление задачи
  const deleteTask = async (id: number) => {
    console.log(id, "id");
    const { error } = await supabase.from("tasks").delete().match({ id });
    fetchBoardData();
    if (error) {
      console.error("Ошибка при удалении задачи:", error);
    } else {
      setTasks(tasks.filter((task) => String(task.id) !== String(id)));
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
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса задачи:", error);
    }
  };

  useEffect(() => {
    const channels = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        (payload) => {
          fetchBoardData();
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);

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
