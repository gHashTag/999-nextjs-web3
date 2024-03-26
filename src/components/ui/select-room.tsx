import * as React from "react";
import SubCard from "@/components/revamp/LandingCards/SubCard";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const SelectRoom = ({
  items,
  setOpenModalType,
}: {
  items: any;
  setOpenModalType: (type: string) => void;
}) => {
  return (
    <>
      <div
        className="flex-col"
        style={{
          paddingTop: 10,
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
    </>
  );
};

export { SelectRoom };
