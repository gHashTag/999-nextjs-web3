import { useEffect } from "react";
import { useRouter } from "next/router";
// import { useWeb3Auth } from "@/hooks/useWeb3Auth";

const Meets = () => {
  const router = useRouter();
  const pathname = router.pathname;
  console.log(pathname, "pathname");
  useEffect(() => {
    const setRoute = async () => {
      try {
        router.push(
          {
            pathname: `/[workspaceSlug]/create-meet/meets/[roomId]`,
            query: {
              workspaceSlug: router.query.workspaceSlug,
              roomId: router.query.slug,
            },
          },
          `/[workspaceSlug]/create-meet/meets/${router.query.slug}`
        );
      } catch (error) {
        console.error("Error", error);
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
  return <div>Meets</div>;
};

export default Meets;
