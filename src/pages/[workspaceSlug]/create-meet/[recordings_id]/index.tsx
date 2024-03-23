import React from "react";

import { usePathname } from "next/navigation";

import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import { useSupabase } from "@/hooks/useSupabase";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { twMerge } from "tailwind-merge";

const RecordingPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [asset, setAsset] = useState<any[] | null>();

  const { getAssetById } = useSupabase();

  useEffect(() => {
    const fetchAsset = async () => {
      if (id) {
        const asset = await getAssetById(id);
        setAsset(asset);
      }
    };

    fetchAsset();
  }, [id]);

  const formattedText = asset?.[0]?.transcription.replace(/(:)/g, "$1\n");

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
          <TracingBeam className="px-6">
            <div className="max-w-2xl mx-auto antialiased pt-4 relative">
              <div className="mb-10">
                <p className={twMerge("text-4xl mb-4")}>{asset?.[0]?.title}</p>
                <p className={twMerge("text-xl mb-4")}>
                  {asset?.[0]?.summary_short}
                </p>

                <div className="text-sm  prose prose-sm dark:prose-invert">
                  {formattedText}
                </div>
              </div>
            </div>
          </TracingBeam>
        </div>
      </Layout>
    </>
  );
};

export default RecordingPage;
