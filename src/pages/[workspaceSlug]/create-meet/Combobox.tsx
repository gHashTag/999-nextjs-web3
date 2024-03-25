"use client";
import React, { useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { RoomsData } from "@/types";

type ComboboxProps = RoomsData & {
  onSelectRoom: (id: string, name: string) => void;
  selectedRoomName: string;
  selectedRoomId: string;
};

export function Combobox({
  data,
  onSelectRoom,
  selectedRoomName,
  selectedRoomId,
}: ComboboxProps) {
  const [value, setValues] = React.useState(new Set([]));
  console.log(value, "value");
  console.log(selectedRoomName, "Combobox selectedRoomName");

  //   useEffect(() => {
  //     setValue(selectedRoomName);
  //   }, [selectedRoomName]);
  const handleSelectionChange = (e) => {
    console.log(e, "e");
    setValues(new Set(e.target.value.split(",")));
  };
  return (
    <div className="flex w-56 items-center space-x-4">
      <div className="flex w-full max-w-xs flex-col gap-2">
        <Select
          label="Room"
          variant="bordered"
          placeholder={selectedRoomName}
          selectedKeys={value}
          className="max-w-xs"
          //@ts-ignore
          onChange={handleSelectionChange}
        >
          {data.roomsCollection.edges.map((node) => (
            <SelectItem
              key={node.node.id}
              value={selectedRoomName}
              onClick={() => onSelectRoom(node.node.room_id, node.node.name)}
            >
              {node.node.name}
              {/* {console.log(node.node, "node.node")} */}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
