import React from "react";
import { Meteors } from "./meteors";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { RecordingAsset } from "@/types";

export function MeteorsCard({
  asset,
  onClick,
}: {
  asset: RecordingAsset;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        maxWidth: "calc(100% / 4)",
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 50,
      }}
    >
      <BackgroundGradient>
        <div>
          {/* <div className="absolute inset-0 h-full w-full transform scale-[0.80] rounded-full blur-2xl" /> */}
          <div
            className="relative px-5 py-5 h-full rounded-2xl flex rounded-[22px]"
            style={{ backgroundColor: "#0c0a09" }}
          >
            <h1
              className="font-bold text-3xl text-white mb-4 relative z-50"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 6,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {asset.summary_short}
            </h1>
            {/* <Meteors number={10} /> */}
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
}
