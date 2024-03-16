import React from "react";
import { Meteors } from "./meteors";
import { BackgroundGradient } from "@/components/ui/background-gradient";

interface MeteorsCardProps {
  title: string;
}

export function MeteorsCard({ title }: MeteorsCardProps) {
  return (
    <div
      className=""
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
          <div className="relative px-5 py-5 h-full rounded-2xl flex">
            <h1
              className="font-bold text-4xl text-white mb-4 relative z-50"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 6,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </h1>
            <Meteors number={10} />
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
}
