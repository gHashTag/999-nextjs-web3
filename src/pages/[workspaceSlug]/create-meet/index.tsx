import React from "react";
import SubCard from "@/components/revamp/LandingCards/SubCard";
import Layout from "@/components/layout";
import { useRouter } from "next/navigation";
import { MeteorsCard } from "@/components/ui/meteor-card";
import { setUserId } from "@/apollo/reactive-store";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { gql, useQuery, useReactiveVar } from "@apollo/client";

import apolloClient from "@/apollo/apollo-client";

const ROOMS_ASSETS_COLLECTION_QUERY = gql`
  query RoomAssetsCollection {
    room_assetsCollection {
      edges {
        node {
          id
          title
          summary_short
          recording_id
          transcription
        }
      }
    }
  }
`;

const CreateMeet = () => {
  const router = useRouter();
  const workspaceSlug = useReactiveVar(setUserId);
  const { data } = useQuery(ROOMS_ASSETS_COLLECTION_QUERY, {
    client: apolloClient,
  });

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

  const items = data?.room_assetsCollection?.edges;

  return (
    <>
      <Layout>
        <div
          className="flex-col mt-10"
          style={{
            paddingRight: 20,
            paddingLeft: 20,
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
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <HoverEffect items={items} />
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
