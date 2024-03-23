import { useEffect } from "react";
import { useRouter } from "next/router";
// import { useWeb3Auth } from "@/hooks/useWeb3Auth";

const Meets = ({ roomId = "wlj-dqpm-bcr" }) => {
  const router = useRouter();
  // const { workspaceSlug } = useWeb3Auth();
  useEffect(() => {
    const setRoute = async () => {
      try {
        router.push({
          pathname: `/[workspaceSlug]/create-meet/meets/[roomId]`,

          query: { workspaceSlug: "workspaceSlug", roomId },
        });
      } catch (error) {
        // console.error("Error", error);
      }
    };
    // const setRoute = async () => {
    //   try {
    //     router.push({
    //       pathname: `/[workspaceSlug]/create-meet/meets/[roomId]`,

    //       query: { workspaceSlug: "workspaceSlug", roomId },
    //     });
    //   } catch (error) {
    //     console.error("Error", error);
    //   }
    // };

    setRoute();
  }, []);
};

export default Meets;
