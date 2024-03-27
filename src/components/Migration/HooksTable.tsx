import React from "react";
import { useRouter } from "next/router";
import { HooksData } from "./data";
import { cn } from "@helpers/utils";

const HooksTable: React.FC = () => {
  const { push } = useRouter();
  return (
    <table className="w-full lg:mt-8 mt-4">
      <thead className="text-start">
        <tr className="">
          <th className="border border-[#1D1F22] p-2">Old Hooks</th>
          <th className="border border-[#1D1F22] p-2">New Hooks</th>
        </tr>
      </thead>
      <tbody className="p-8">
        {HooksData.map((item, i) => (
          <tr
            key={`hook-${item.old.one}`}
            className={`${i % 2 === 0 ? "bg-[#1D1F22]/40" : "bg-transparent"}`}
          >
            <td
              className={cn(
                "border border-[#1D1F22] p-2",
                i < 6 && "cursor-pointer underline"
              )}
              role="presentation"
              // onClick={() => (i < 6 ? push(item.old.url) : null)}
            >
              {item.old.one}
            </td>
            <td className="border border-[#1D1F22] p-2 cursor-pointer">
              <span
                className={cn(
                  item.new.one && item.new.one === "Deprecated"
                    ? "text-red-400 cursor-default"
                    : null,
                  item.new.one?.startsWith("use")
                    ? "text-blue-500 underline"
                    : null
                )}
                role="presentation"
                onClick={() => item.new.urlOne && push(item.new.urlOne)}
              >
                {item.new.one}
              </span>{" "}
              <span
                className={cn(
                  item.new.two?.startsWith("use")
                    ? "text-blue-500 underline"
                    : null
                )}
                role="presentation"
                onClick={() => item.new.UrlTwo && push(item.new.UrlTwo)}
              >
                {item.new.two && `/ ${item.new.two}`}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default HooksTable;
