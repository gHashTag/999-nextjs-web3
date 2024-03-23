import React, { useEffect, useState } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAccount, useDisconnect } from "wagmi";

import { cn, extractProjectName } from "../@helpers/utils";
import DomainInputStrip from "./DomainInputStrip";
import KeyStrip from "./KeyStrip";

const APISection = () => {
  const [apiKey, setApiKey] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState<string | null>(null);
  const [emailName, setEmailName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: fetchApiKey } = useMutation({
    mutationFn: async ({ address }: { address: string }) => {
      setIsLoading(true);
      const { data } = await axios.request<{
        apiKey: string;
        message: string;
        projectId: string;
        domain: string;
        email: string;
      }>({
        method: "GET",
        url: `/docs/api/getApiKey?address=${address}`,
      });
      return data;
    },
    onSuccess: ({ apiKey, projectId, domain, email }) => {
      setApiKey(apiKey);
      setProjectId(projectId);
      if (!domain || domain === "[]") return;
      if (domain.startsWith("http")) {
        const name = extractProjectName(domain);
        setProjectName(name);
      } else {
        setProjectName(domain);
      }
      setEmailName(email);
    },
  });

  const { isConnected } = useAccount({
    onConnect({ address }) {
      if (address) {
        fetchApiKey({
          address,
        })
          .then(() => {
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            // console.error(err);
          });
      }
    },
    onDisconnect() {
      setProjectName(null);
    },
  });

  return (
    <div className="flex flex-col gap-6 mt-10 justify-center items-center w-full">
      <ConnectButton />
      {isConnected && !isLoading && (
        <span className="font-bold text-lg text-center w-1/2">
          {projectName?.length > 0 && emailName?.length > 0
            ? projectName
            : "To access your API keys, kindly provide the Project Name along with your Email ID"}
        </span>
      )}
      {isConnected && !isLoading && (
        <div className={cn("flex flex-col items-center gap-5 w-full")}>
          {projectName?.length > 0 && emailName?.length > 0 ? (
            <>
              <KeyStrip label="API Key" text={apiKey} />
              <KeyStrip label="Project ID" text={projectId} />
            </>
          ) : (
            <DomainInputStrip
              apiKey={apiKey}
              projectName={projectName}
              setProjectName={setProjectName}
              setEmail={setEmailName}
              setApiKey={setApiKey}
              setProjectId={setProjectId}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default APISection;
