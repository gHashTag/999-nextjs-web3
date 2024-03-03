import React from "react";

import Link from "next/link";
import Image from "next/image";

const Container = () => {
  const roomData = [
    { id: "1", name: "Create Room", href: "/apis/create-room" },
    { id: "2", name: "Join Room Token", href: "/apis/join-room-token" },
    { id: "3", name: "Meeting Details", href: "/apis/meeting-details" },
    { id: "4", name: "Get Metrics", href: "/apis/get-metrics" },
    { id: "5", name: "Get the list of Rooms", href: "/apis/get-rooms" },
    {
      id: "6",
      name: "Get the list of Recordings",
      href: "/apis/get-recordings",
    },
  ];
  return (
    <div>
      <p>
        At Huddle01, we offer a variety of APIs to meet your specific needs.
        Whether you want to build your own custom applications or quickly get
        started with our pre-built applications, we have you covered. Our APIs
        are designed to provide flexibility and customization.
      </p>

      <div className="grid md:grid-cols-3 grid-cols-1 mt-6 gap-4 items-center">
        {roomData.map(({ href, id, name }) => (
          <Link
            href={href}
            key={id}
            className="rounded-lg p-4 flex items-start flex-col gap-y-1 border border-custom-5 cursor-pointer "
          >
            <Image
              src={`/docs/api/${name}.png`}
              alt={name}
              width={23}
              height={23}
              priority
              quality={100}
              className="object-contain"
            />
            <div className="text-sm text-slate-400 font-medium">{name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Container;
