import LandingCards from "@components/revamp/LandingCards/LandingCards";
import SubCard from "@/components/revamp/LandingCards/SubCard";
import Layout from "@/components/layout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CreateMeet = () => {
  const router = useRouter();
  const getRoom = async () => {
    router.push(`/create-meet/meets`);
  };

  const getSpace = async () => {
    router.push(`/create-meet/audio-spaces`);
  };

  const getTokenGated = async () => {
    router.push(`/create-meet/token-gated`);
  };

  const managementToken = process.env.NEXT_PUBLIC_MANAGEMENT_TOKEN;

  if (!managementToken) {
    throw new Error("NEXT_PUBLIC_100MS_TOKEN_SECRET is not set");
  }

  const getSessions = async () => {
    try {
      const response = await fetch("https://api.100ms.live/v2/sessions", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${managementToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Ошибка при получении сессий");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error", error);
    }
  };

  const getRecordings = async () => {
    try {
      const response = await fetch("https://api.100ms.live/v2/recordings", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${managementToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Ошибка при получении сессий");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    // getSessions();
    getRecordings();
  }, []);

  return (
    <Layout>
      <LandingCards
        title="Get started quickly"
        type="Guide"
        className="flex-col mt-10"
      >
        <div className="grid lg:grid-cols-3 gap-4 grid-cols-1 mt-6">
          <SubCard
            title="Video Meeting"
            img="Video Meeting.png"
            onClick={getRoom}
          />
          <SubCard
            title="Audio Spaces"
            img="Audio Spaces.png"
            onClick={getSpace}
          />
          <SubCard
            title="Token-gated Room"
            img="Token-gated Room.png"
            onClick={getTokenGated}
          />
        </div>
      </LandingCards>
    </Layout>
  );
};

export default CreateMeet;
