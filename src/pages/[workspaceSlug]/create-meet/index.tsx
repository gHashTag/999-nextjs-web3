"use client";
import React, { useEffect, useState, Suspense } from "react";

import Layout from "@/components/layout";

import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { Button } from "@/components/ui/moving-border";
import apolloClient from "@/apollo/apollo-client";
import { useDisclosure } from "@nextui-org/react";
import MeetModal from "./MeetModal";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { createRoom } from "@/utils/edge-functions";

import { Combobox } from "./Combobox";

import {
  setAssetInfo,
  setRoomId,
  setSelectedRoomName,
} from "@/apollo/reactive-store";
import { Spinner } from "@/components/ui/spinner";
import { SelectRoom } from "@/components/ui/select-room";

const ROOMS_COLLECTION_QUERY = gql`
  query RoomsCollection {
    roomsCollection(orderBy: { updated_at: DescNullsLast }) {
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
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { control, handleSubmit, getValues, setValue, reset } = useForm();
  const [openModalId, setOpenModalId] = useState<string>("");
  const assetInfo = useReactiveVar(setAssetInfo);
  const selectedRoomName = useReactiveVar(setSelectedRoomName);
  const roomId = useReactiveVar(setRoomId);

  const {
    data: roomsData,
    loading: roomsLoading,
    refetch,
  } = useQuery(ROOMS_COLLECTION_QUERY, {
    client: apolloClient,
  });

  const { data, loading: assetsLoading } = useQuery(
    ROOMS_ASSETS_COLLECTION_QUERY,
    {
      variables: {
        room_id: roomId,
        name: selectedRoomName,
      },
      client: apolloClient,
    }
  );

  useEffect(() => {
    const firstRoom = roomsData?.roomsCollection?.edges[0]?.node;
    if (firstRoom) {
      setAssetInfo({
        value: firstRoom?.id,
        label: firstRoom?.name,
      });
    }
  }, [roomsData]);

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
    setLoading(true);
    const formData = getValues();
    try {
      const response = await createRoom(
        formData.name,
        openModalId,
        roomId || ""
      );
      console.log("🚀 ~ onCreateMeet ~ response:", response);
      if (response) {
        setSelectedRoomName(response.name);
        setRoomId(response.room_id);
        refetch();
        toast({
          title: "Success",
          description: `${response.name} created`,
        });
        setLoading(false);
      }
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
    // setSelectedRoomName(name);
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
        <div style={{ position: "absolute", top: 75, right: 20 }}>
          <Button onClick={onCreateRoom}>Create room</Button>
        </div>
        <div className="flex justify-center items-center">
          {roomsData && (
            <Combobox roomsData={roomsData} assetInfo={assetInfo} />
          )}
        </div>
        {loading || assetsLoading || roomsLoading ? (
          <Spinner />
        ) : (
          <SelectRoom items={items} setOpenModalType={setOpenModalType} />
        )}
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
