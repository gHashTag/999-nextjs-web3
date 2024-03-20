import { useEffect } from "react";
import { useRouter } from "next/router";

import { useSupabase } from "@/hooks/useSupabase";
import { useReactiveVar } from "@apollo/client";
import { userId } from "@/apollo/reactive-store";

const Meets = ({ roomId = "gcy-elue-bot" }) => {
  const router = useRouter();
  const workspaceSlug = useReactiveVar(userId);

  useEffect(() => {
    // const setRoute = async () => {
    //   try {
    //     if (workspaceSlug && roomId) {
    //       router.push(
    //         {
    //           pathname: `/[workspaceSlug]/create-meet/audio-spaces/[roomId]`,
    //           query: { workspaceSlug, roomId },
    //         },
    //         `/${workspaceSlug}/create-meet/audio-spaces/${roomId}`
    //       );
    //     }
    //   } catch (error) {
    //     console.error("Error", error);
    //   }
    // };
    const setRoute = async () => {
      try {
        router.push({
          pathname: `/[workspaceSlug]/create-meet/audio-spaces/[roomId]`,

          query: { workspaceSlug: "workspaceSlug", roomId },
        });
      } catch (error) {
        console.error("Error", error);
      }
    };

    setRoute();
  }, []);
};

export default Meets;
