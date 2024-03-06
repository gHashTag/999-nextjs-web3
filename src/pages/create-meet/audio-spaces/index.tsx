import { useEffect } from "react";
import { useRouter } from "next/router";

const Meets = ({ roomId = "gcy-elue-bot" }) => {
  const router = useRouter();

  useEffect(() => {
    const setRoute = async () => {
      try {
        router.push({
          pathname: `/create-meet/audio-spaces/[roomId]`,
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
