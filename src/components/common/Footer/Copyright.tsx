import React from "react";

const Copyright = () => {
  const date = new Date();
  return (
    <div className="text-slate-400 md:text-sm font-medium mt-7 md:px-[6rem]">
      Copyright © {date.getFullYear()} Graphene 01, Inc. All Rights Reserved.
    </div>
  );
};

export default Copyright;
