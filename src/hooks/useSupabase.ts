// hooks/useSupabaseBoard.ts
import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Task, BoardData, TasksArray, BoardItem, TaskStatus } from "@/types"; // Предполагается, что типы определены в отдельном файле types.ts
import { supabase } from "@/utils/supabase";

export function useSupabaseBoard() {
  const [tasks, setTasks] = useState<TasksArray>([]);
  const [boardData, setBoardData] = useState<BoardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  console.log(boardData, "boardData");
  const transformTasksToBoardData = useCallback(
    (tasks: TasksArray): BoardData => {
      const board: Record<TaskStatus, Task[]> = {
        Backlog: [],
        "In Progress": [],
        "In Review": [],
        Completed: [],
      };

      tasks.forEach((task) => {
        const status = task.status as TaskStatus;
        if (!board[status]) {
          console.error(
            `Status '${status}' does not exist on the board. Current board:`,
            board
          );
        } else {
          board[status].push(task);
        }
      });

      return Object.entries(board).map(([name, items]) => ({ name, items }));
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
    } catch (error) {
      setError("Ошибка при загрузке данных доски");
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
  };
}
