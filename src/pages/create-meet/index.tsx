import React from "react";
import LandingCards from "@components/revamp/LandingCards/LandingCards";
import SubCard from "@/components/revamp/LandingCards/SubCard";
import Layout from "@/components/layout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { MeteorsCard } from "@/components/ui/meteor-card";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const CreateMeet = () => {
  const router = useRouter();

  const [assets, setAssets] = useState<any[] | null>();

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
    throw new Error("NEXT_PUBLIC_MANAGEMENT_TOKEN is not set");
  }

  const getAssets = async () => {
    try {
      let { data, error } = await supabase.from("room_assets").select("*");
      console.log(data, "data");
      if (error) console.error("Error fetching assets:", error);

      setAssets(data);
    } catch (error) {
      console.log("error", error);
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
      console.log(data, "data");
      return data;
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    // getRecordings();
    getAssets();
  }, []);

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
            <MeteorsCard key={index} asset={asset} />
          ))}

          {/* <HoverEffect items={assets || []} /> */}
        </div>
      </Layout>
    </>
  );
};

export default CreateMeet;
