"use client";
import { useEffect, useState } from "react";
// import { useWeb3Auth } from "@hooks/useWeb3Auth";
import {
  Spacer,
  Image,
  // Button,
  Pagination,
  // Card,
  // CardBody,
} from "@nextui-org/react";
import Layout from "@/components/layout";
import Board from "@/components/Board";
import { supabase } from "@/utils/supabase";

// import { Space } from "@supabase/ui";

export default function Tasks() {
  // const [tasks, setTasks] = useState<any[] | null>();
  // useEffect(() => {
  //   const getTasks = async () => {
  //     try {
  //       let { data, error } = await supabase.from("tasks").select("*");
  //       console.log(data, "data");
  //       if (error) console.error("Error fetching tasks:", error);
  //       setTasks(data);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };
  //   getTasks();
  // }, []);

  const handleOnClick = () => {};
  return (
    <Layout>
      <Board />
    </Layout>
  );
}
