"use client";
import { useEffect, useState } from "react";

import Layout from "@/components/layout";
import { supabase } from "@/utils/supabase";
import dynamic from "next/dynamic";

export default function Init() {
  const handleOnClick = () => {};
  return (
    <Layout>
      <span>hello</span>
    </Layout>
  );
}
