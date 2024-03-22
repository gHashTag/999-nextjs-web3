// hooks/useSupabase.ts
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Task,
  BoardData,
  TasksArray,
  Board,
  ExtendedOpenloginUserInfo,
} from "@/types";
import { supabase } from "@/utils/supabase";
import { web3auth } from "@/utils/web3Auth";
import {
  setInviterUserId,
  setUserInfo,
  setUserSupabase,
  setUserId,
} from "@/apollo/reactive-store";
import { useReactiveVar } from "@apollo/client";

export function useSupabase() {
  const inviter = useReactiveVar(setInviterUserId);
  const userSupabase = useReactiveVar(setUserSupabase);
  const user_id = useReactiveVar(setUserId);
  const [tasks, setTasks] = useState<TasksArray>([]);
  const [boardData, setBoardData] = useState<BoardData[]>([]);
  const [assets, setAssets] = useState<any[] | null>();
  const [error, setError] = useState<string | null>(null);
  const userInfo = useReactiveVar(setUserInfo);

  const checkUsername = async (username: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username);

    if (error) {
      console.error("Ошибка при запросе к Supabase", error);
      return false;
    }

    if (data.length > 0) {
      const user_id = data[0].user_id;
      setInviterUserId(user_id);
    }
    return data.length > 0 ? true : false;
  };

  const getSupabaseUser = async (email: string) => {
    try {
      const response = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (response.error && response.error.code === "PGRST116") {
        console.error("Пользователь не найден");
        return null;
      }

      if (response.error) {
        console.error(
          "Ошибка при получении информации о пользователе:",
          response.error
        );
        return null;
      }

      return response.data;
    } catch (error) {
      console.error("Ошибка при получении информации о пользователе:", error);
      return null;
    }
  };

  const createSupabaseUser = async () => {
    try {
      const user = await web3auth.getUserInfo();
      if (!user.email) {
        console.error("Email пользователя не найден");
        return { workspaceSlug: "" };
      }
      const userData = await getSupabaseUser(user.email);
      if (!userData) {
        console.log("Создание нового пользователя, так как текущий не найден");
        // Логика создания пользователя
        // Пользователя с таким email нет в базе, создаем нового
        //@ts-ignore
        const parts = user.name.split(" ");
        const newUser = {
          // user_id: "5619bcb3-0b78-4270-bd56-0f1069d9e8a1",
          email: user.email,
          first_name: parts[0],
          last_name: parts.slice(1).join(" "),
          aggregateverifier: user.aggregateVerifier,
          verifier: user.verifier,
          avatar: user.profileImage,
          typeoflogin: user.typeOfLogin,
          inviter,
        };

        const { error } = await supabase.from("users").insert([{ ...newUser }]);

        if (!error) {
          setUserInfo({ ...userData } as ExtendedOpenloginUserInfo);
          return {
            workspaceSlug: userData.user_id,
          };
        } else {
          console.log(error, "Ошибка создания пользователя");
          return { workspaceSlug: "" };
        }
      } else {
        console.log(userData, "userData");
        setUserInfo(userData as ExtendedOpenloginUserInfo);
      }
    } catch (error) {
      console.error("Ошибка при получении информации о пользователе:", error);
    }
  };

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

  const getAllAssets = async () => {
    try {
      let { data, error } = await supabase.from("room_assets").select("*");
      if (error) console.error("Error fetching assets:", error);

      setAssets(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getAssetById = async (recording_id: string) => {
    try {
      let { data, error } = await supabase
        .from("room_assets")
        .select("*")
        .eq("recording_id", recording_id);
      console.log(data, "data");
      if (error) console.error("Error fetching assets:", error);
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const getTaskById = async (id: string) => {
    try {
      let { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("id", id)
        .single();

      console.log(data, "data");
      if (error) console.error("Error fetching assets:", error);
      return data;
    } catch (error) {
      console.log("error", error);
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
    getAllAssets();
    fetchBoardData().then(() => {
      if (!isMounted) return;
      // ...другие действия, если компонент все еще смонтирован
    });
    return () => {
      isMounted = false;
    };
  }, [fetchBoardData]);

  return {
    getAssetById,
    assets,
    tasks,
    setTasks,
    boardData,
    setBoardData,
    fetchBoardData,
    fetchTasks,
    updateTask,
    deleteTask,
    updateTaskStatus,
    getAllAssets,
    createSupabaseUser,
    userSupabase,
    setUserSupabase,
    userInfo,
    setUserInfo,
    checkUsername,
    transformTasksToBoardData,
    getTaskById,
  };
}
