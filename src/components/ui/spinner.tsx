import * as React from "react";
import { Spinner as LoadingSpinner } from "@nextui-org/react";

const Spinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "70vh",
    }}
  >
    <LoadingSpinner size="lg" />
  </div>
);

export { Spinner };
