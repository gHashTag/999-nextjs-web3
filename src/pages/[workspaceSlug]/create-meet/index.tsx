import React from "react";
import SubCard from "@/components/revamp/LandingCards/SubCard";
import Layout from "@/components/layout";
import { useRouter } from "next/navigation";
import { MeteorsCard } from "@/components/ui/meteor-card";
import { RecordingAsset } from "@/types";
import { useSupabase } from "@/hooks/useSupabase";
import { useWeb3Auth } from "@/hooks/useWeb3Auth";
import { useReactiveVar } from "@apollo/client";
import { setUserId } from "@/apollo/reactive-store";

const CreateMeet = () => {
  const router = useRouter();
  const workspaceSlug = useReactiveVar(setUserId);
  const { assets } = useSupabase();

  const getRoom = async () => {
    router.push(`/workspaceSlug/create-meet/meets`);
  };

  const getSpace = async () => {
    router.push(`/workspaceSlug/create-meet/audio-spaces`);
  };

  const getTokenGated = async () => {
    router.push(`/workspaceSlug/create-meet/token-gated`);
  };

  const managementToken = process.env.NEXT_PUBLIC_MANAGEMENT_TOKEN;

  if (!managementToken) {
    throw new Error("NEXT_PUBLIC_MANAGEMENT_TOKEN is not set");
  }

  const goToRecording = (recordings_id: string, asset: RecordingAsset) => {
    router.push(`/${workspaceSlug}/create-meet/${recordings_id}`);
  };

  return (
    <>
      <Layout>
        <div
          className="flex-col mt-10"
          style={{
            paddingRight: 20,
            paddingLeft: 20,
            paddingBottom: 70,
          }}
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
              isDisabled={true}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {assets?.map((asset, index) => (
            <MeteorsCard
              key={index}
              asset={asset}
              onClick={() => goToRecording(asset.recording_id, asset)}
            />
          ))}

          {/* <HoverEffect items={assets || []} /> */}
        </div>
      </Layout>
    </>
  );
};

export default CreateMeet;
// const getRecordings = async () => {
//   try {
//     const response = await fetch("https://api.100ms.live/v2/recordings", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${managementToken}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Ошибка при получении сессий");
//     }

//     const data = await response.json();
//     console.log(data, "data");
//     return data;
//   } catch (error) {
//     console.error("Error", error);
//   }
// };
