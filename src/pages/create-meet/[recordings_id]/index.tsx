import React from "react";

import { usePathname } from "next/navigation";
import LandingCards from "@components/revamp/LandingCards/LandingCards";
import SubCard from "@/components/revamp/LandingCards/SubCard";
import Layout from "@/components/layout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { MeteorsCard } from "@/components/ui/meteor-card";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const RecordingPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  console.log(pathname, "pathname");
  // const { recordings_id } = router.query || {};
  // console.log(recordings_id, "recordings_id");
  // const [assets, setAssets] = useState<any[] | null>();

  // const { asset } = router.query;

  // console.log(asset, "asset");

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
          <span>Записи для {id}</span>
        </div>
      </Layout>
    </>
  );
};

export default RecordingPage;
