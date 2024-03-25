"use client";
import React, { useEffect, useState } from "react";
import SubCard from "@/components/revamp/LandingCards/SubCard";
import Layout from "@/components/layout";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import { gql, useQuery } from "@apollo/client";
import { Button } from "@/components/ui/moving-border";
import apolloClient from "@/apollo/apollo-client";
import { useDisclosure } from "@nextui-org/react";
import MeetModal from "./MeetModal";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { createRoom } from "@/utils/edge-functions";
import { SidebarNav } from "@/components/ui/sidebar-nav";
import { Combobox } from "./Combobox";
import { supabase } from "@/utils/supabase";

const ROOMS_COLLECTION_QUERY = gql`
  query RoomsCollection {
    roomsCollection {
      edges {
        node {
          id
          user_id
          name
          description
          updated_at
          created_at
          type
          enabled
          description
          codes
          room_id
        }
      }
    }
  }
`;
const ROOMS_ASSETS_COLLECTION_QUERY = gql`
  query RoomAssetsCollection($room_id: String!, $name: String!) {
    room_assetsCollection(
      filter: { room_id: { eq: $room_id }, room_name: { eq: $name } }
    ) {
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
  const { toast } = useToast();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { control, handleSubmit, getValues, setValue, reset } = useForm();
  const [openModalId, setOpenModalId] = useState<string>("");
  const [selectedRoomName, setSelectedRoomName] = useState<string>("");
  console.log(selectedRoomName, "selectedRoomName");
  const { data: roomsData, refetch } = useQuery(ROOMS_COLLECTION_QUERY, {
    client: apolloClient,
  });
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");

  const { data } = useQuery(ROOMS_ASSETS_COLLECTION_QUERY, {
    variables: {
      room_id: selectedRoomId,
      name: selectedRoomName,
    },
    client: apolloClient,
  });

  useEffect(() => {
    const channels = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms" },
        (payload) => {
          refetch();
          setSelectedRoomName(selectedRoomName);
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);

  const onSelectRoom = (id: string, name: string) => {
    console.log(name, "name");
    setSelectedRoomId(id);
    setSelectedRoomName(name);
  };

  const setOpenModalType = async (type: string) => {
    onOpen();
    setOpenModalId(type);
  };

  const managementToken = process.env.NEXT_PUBLIC_MANAGEMENT_TOKEN;

  if (!managementToken) {
    throw new Error("NEXT_PUBLIC_MANAGEMENT_TOKEN is not set");
  }

  const items = data?.room_assetsCollection?.edges;

  const onCreateMeet = async () => {
    const formData = getValues();
    try {
      const response = await createRoom(
        formData.name,
        openModalId,
        selectedRoomId
      );
      setSelectedRoomName(response.name);
      setSelectedRoomId(response.id);
      // response &&
      //   setTimeout(() => {
      //     console.log("refetch");
      //     setSelectedRoomName(response.name);
      //     setSelectedRoomId(response.id);
      //     refetch();
      //   }, 5000);
    } catch (error) {
      if (error) {
        toast({
          title: "Error creating room",
          variant: "destructive",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(error, null, 2)}
              </code>
            </pre>
          ),
        });
      } else {
        reset({
          title: "",
        });
      }
    }
  };

  const onCreateRoom = () => {
    onOpen();
    setOpenModalId("meets");
    setSelectedRoomName(name);
  };

  return (
    <>
      <Layout>
        {isOpen && (
          <MeetModal
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            onCreate={onCreateMeet}
            control={control}
            handleSubmit={handleSubmit}
            getValues={getValues}
            setValue={setValue}
          />
        )}
        <div style={{ position: "fixed", top: 75, right: 20 }}>
          <Button onClick={onCreateRoom}>Create room</Button>
        </div>
        <div className="flex justify-center items-center">
          {roomsData && (
            <Combobox
              data={roomsData}
              onSelectRoom={onSelectRoom}
              selectedRoomName={selectedRoomName}
              selectedRoomId={selectedRoomId}
            />
          )}
        </div>

        <div
          className="flex-col"
          style={{
            paddingRight: 20,
            paddingLeft: 20,
          }}
        >
          <div className="grid lg:grid-cols-3 gap-4 grid-cols-1 mt-6">
            <SubCard
              title="Video Meeting"
              img="Video Meeting.png"
              onClick={() => setOpenModalType("meets")}
            />
            <SubCard
              title="Audio Spaces"
              img="Audio Spaces.png"
              onClick={() => setOpenModalType("audio-spaces")}
            />
            <SubCard
              title="Token-gated Room"
              img="Token-gated Room.png"
              onClick={() => setOpenModalType("token-gated")}
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
