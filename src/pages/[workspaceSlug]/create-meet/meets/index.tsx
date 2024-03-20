import { useEffect } from "react";
import { useRouter } from "next/router";

const Meets = ({ roomId = "jjv-yfww-zfu" }) => {
  const router = useRouter();

  useEffect(() => {
    const setRoute = async () => {
      try {
        router.push({
          pathname: `/create-meet/meets/[roomId]`,
          query: { roomId },
        });
      } catch (error) {
        console.error("Error", error);
      }
    };

    setRoute();
  }, []);
};

export default Meets;
