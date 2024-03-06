import LandingCards from "@components/revamp/LandingCards/LandingCards";
import SubCard from "@/components/revamp/LandingCards/SubCard";
import Layout from "@/components/layout";
import { createRoom } from "@components/createRoom";
import { useRouter } from "next/navigation";

const CreateMeet = () => {
  const router = useRouter();
  const getRoom = async () => {
    const roomId = await createRoom();
    console.log("roomId", roomId);
    router.push(`/create-meet/meets/${roomId}`);
  };

  const getSpace = async () => {
    router.push(`/create-meet/audio-spaces`);
  };

  const getTokenGated = async () => {
    router.push(`/create-meet/token-gated`);
  };

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
