import { useEffect } from "react";
import World from "./world";
import { visibleHeaderVar } from "@/apollo/reactive-store";

export const Globe = () => {
  useEffect(() => {
    visibleHeaderVar(true);
  }, []);
  return <World />;
};
