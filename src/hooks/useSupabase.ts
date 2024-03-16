// hooks/useSupabaseBoard.ts
import { useState, useEffect, useCallback } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Task, BoardData, TasksArray, BoardItem } from "@/types"; // Предполагается, что типы определены в отдельном файле types.ts

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase: SupabaseClient = createClient(supabaseUrl!, supabaseAnonKey!);

export function useSupabaseBoard() {
  const [tasks, setTasks] = useState<TasksArray | null>(null);
  const [boardData, setBoardData] = useState<BoardData | null>(null);

  const transformTasksToBoardData = useCallback(
    (tasks: TasksArray | null): BoardData => {
      const board: BoardItem = {
        Backlog: [],
        "In Progress": [],
        "In Review": [],
        Completed: [],
      };

      tasks?.forEach((task) => {
        const status =
          task.status.charAt(0).toUpperCase() + task.status.slice(1);
        if (board.hasOwnProperty(status)) {
          board[status].push(task);
        }
      });

      return Object.keys(board).map((status) => ({
        name: status,
        items: board[status],
      }));
    },
    []
  );

  const fetchBoardData = useCallback(async () => {
    const { data, error } = await supabase.from("tasks").select("*");

    if (error) {
      console.error("Ошибка при загрузке данных доски:", error);
    } else {
      const transformedData = transformTasksToBoardData(data);
      setBoardData(transformedData);
    }
  }, [transformTasksToBoardData]);

  useEffect(() => {
    fetchBoardData();
  }, [fetchBoardData]);

  return {
    tasks,
    setTasks,
    boardData,
    setBoardData,
    fetchBoardData,
  };
}
