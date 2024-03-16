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
import { BackgroundGradient } from "@/components/ui/background-gradient";
// import { Space } from "@supabase/ui";

export default function Tasks() {
  const [tasks, setTasks] = useState<any[] | null>();
  useEffect(() => {
    const getTasks = async () => {
      try {
        let { data, error } = await supabase.from("tasks").select("*");
        if (error) console.error("Error fetching tasks:", error);
        setTasks(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getTasks();
  }, []);

  const handleOnClick = () => {};

  return (
    <Layout>
      <span>h</span>
      {/* <Board /> */}
      {/* <main className="flex flex-col items-center justify-between p-24">
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {tasks &&
            tasks.map((task: any, index) => {
              return (
                <div style={{ paddingTop: 20 }} key={index}>
                  <BackgroundGradient>
                    <Image
                      width="100%"
                      height="auto"
                      style={{
                        padding: 5,
                        display: "block",
                        borderRadius: 15,
                      }}
                      alt="NextUI hero Image with delay"
                      src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                    />
                    <div
                      className="text-2xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold"
                      style={{ padding: 5 }}
                    >
                      {task.title}
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
                      {task.description}
                    </div>
                  </BackgroundGradient>
                  <Spacer x={40} />
                </div>
              );
            })}
        </div>
        <div style={{ padding: 30 }} />
        <Pagination total={10} initialPage={1} color="primary" />
      </main> */}
    </Layout>
  );
}
