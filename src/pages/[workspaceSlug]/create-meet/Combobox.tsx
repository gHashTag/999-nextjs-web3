"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { RoomsData } from "@/types";

type ComboboxProps = RoomsData & {
  onSelectRoomId: (id: string, name: string) => void;
};

export function Combobox({ data, onSelectRoomId }: ComboboxProps) {
  const [value, setValue] = React.useState(new Set([]));

  return (
    <div className="flex w-56 items-center space-x-4">
      <div className="flex w-full max-w-xs flex-col gap-2">
        <Select
          label="Room"
          variant="bordered"
          placeholder="Select room"
          selectedKeys={value}
          className="max-w-xs"
          //@ts-ignore
          onSelectionChange={setValue}
        >
          {data.roomsCollection.edges.map((node) => (
            <SelectItem
              key={node.node.id}
              value={node.node.id}
              onClick={() => onSelectRoomId(node.node.room_id, node.node.name)}
            >
              {node.node.name}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
