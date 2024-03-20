"use client";

import { useState, useEffect } from "react";
import { IProvider } from "@web3auth/base";
import { web3auth } from "@/utils/web3Auth";
import Web3 from "web3";

// Corrected the import path for useRouter
import { useRouter } from "next/router";
import { ExtendedOpenloginUserInfo } from "@/types";
import { useSupabase } from "./useSupabase";
// import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'

const useWeb3Auth = () => {
  const router = useRouter();
  const { workspaceSlug, setUserInfo } = useSupabase();

  const [loggedIn, setLoggedIn] = useState(false);
  const [provider, setProvider] = useState<IProvider | null>(null);

  const [address, setAddress] = useState<string | null>(null);

  const [balance, setBalance] = useState<string | null>(null);

  const login = async () => {
    try {
      const web3authProvider = await web3auth.connect();
      console.log(web3authProvider, "web3authProvider");
      setProvider(web3authProvider);
      console.log(web3auth.connected, "web3auth.connected");
      if (web3auth.connected) {
        setLoggedIn(true);
        const userInfo = await web3auth.getUserInfo();
        console.log(userInfo, "userInfo");
        if (workspaceSlug) {
          router.push(`/${workspaceSlug}/wallet`);
        }

        if (userInfo) {
          setUserInfo({ ...userInfo } as ExtendedOpenloginUserInfo);
        }
      }
    } catch (error) {
      if (error instanceof Error && error.message === "User closed the modal") {
        // Обработка ситуации, когда всплывающее окно было закрыто пользователем
        console.log("Вход отменен пользователем");
        router.push("/");
      } else {
        // Обработка других видов ошибок
        console.error("Ошибка входа:", error);
      }
    }
  };

  const logout = async () => {
    // IMP START - Logout

    await web3auth.logout();
    // IMP END - Logout
    setLoggedIn(false);
    setProvider(null);
    setAddress(null);
    setUserInfo(null);
    setBalance(null);
    localStorage.removeItem("user_id");
    router.push("/");
    console.log("logged out");
  };

  // useEffect(() => {
  //   logout();
  // }, [workspaceSlug]);

  // IMP START - Blockchain Calls
  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider as any);

    // Get user's Ethereum public address
    const accounts = await web3.eth.getAccounts();
    setAddress(accounts[0]);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider as any);

    // Get user's Ethereum public address
    const address = (await web3.eth.getAccounts())[0];

    // Get user's balance in ether
    const bal = web3.utils.fromWei(
      await web3.eth.getBalance(address), // Balance is in wei
      "ether"
    );

    setBalance(bal);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider as any);

    // Get user's Ethereum public address
    const fromAddress = (await web3.eth.getAccounts())[0];

    const originalMessage = "YOUR_MESSAGE";

    // Sign the message
    const signedMessage = await web3.eth.personal.sign(
      originalMessage,
      fromAddress,
      "test password!" // configure your own password here.
    );
  };

  return {
    address,
    balance,
    provider,
    loggedIn,
    login,
    logout,
    setProvider,
    setLoggedIn,
    signMessage,
    getBalance,
    getAccounts,
  };
};

export { useWeb3Auth };
