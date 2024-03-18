import React from "react";

const Copyright = () => {
  const date = new Date();
  return (
    <div style={{ paddingBottom: 50, color: "white" }}>
      Copyright © {date.getFullYear()} Graphene 01, Inc. All Rights Reserved.
    </div>
  );
};

export default Copyright;
