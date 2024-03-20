"use client";

import { useState, useEffect } from "react";
import { IProvider } from "@web3auth/base";
import { web3auth } from "@/utils/web3Auth";
// Corrected the import path for supabaseClient
import { supabase } from "@/utils/supabase";
import Web3 from "web3";

// Corrected the import path for useRouter
import { useRouter } from "next/router";
import { ExtendedOpenloginUserInfo, SupabaseUser } from "@/types";
// import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
// import { Web3Auth } from '@web3auth/modal'

export const checkUsername = async (username: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);

  if (error) {
    console.error("Ошибка при запросе к Supabase", error);
    return false;
  }

  return data.length > 0 ? data[0].user_id : false;
};

const useWeb3Auth = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [workspaceSlug, setWorkspaceSlug] = useState("");

  useEffect(() => {
    const getUserId = localStorage.getItem("user_id");
    getUserId && setWorkspaceSlug(getUserId);
  }, []);

  const [provider, setProvider] = useState<IProvider | null>(null);

  const [address, setAddress] = useState<string | null>(null);
  const [userSupabase, setUserSupabase] = useState<SupabaseUser | null>(null);
  const [userInfo, setUserInfo] = useState<ExtendedOpenloginUserInfo | null>(
    null
  );

  const getUserSupabase = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const response = await supabase
        .from("users")
        .select("*")
        .eq("user_id", user_id)
        .single();

      setUserSupabase(response.data);
    } catch (error) {
      console.log("");
    }
  };

  const [balance, setBalance] = useState<string | null>(null);

  const getSupabaseUser = async (email: string) => {
    try {
      const response = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (response.error && response.error.code === "PGRST116") {
        console.error("Пользователь не найден");
        return null;
      }

      if (response.error) {
        console.error(
          "Ошибка при получении информации о пользователе:",
          response.error
        );
        return null;
      }

      return response.data;
    } catch (error) {
      console.error("Ошибка при получении информации о пользователе:", error);
      return null;
    }
  };

  const createSupabaseUser = async (inviteCode: string) => {
    try {
      const user = await web3auth.getUserInfo();
      if (!user.email) {
        console.error("Email пользователя не найден");
        return;
      }
      const userData = await getSupabaseUser(user.email);
      if (!userData) {
        console.log("Создание нового пользователя, так как текущий не найден");
        // Логика создания пользователя
        // Пользователя с таким email нет в базе, создаем нового
        const newUser = {
          email: user.email,
          first_name: user.name,
          aggregateverifier: user.aggregateVerifier,
          verifier: user.verifier,
          avatar: user.profileImage,
          typeoflogin: user.typeOfLogin,
          inviter: inviteCode,
        };

        const { error } = await supabase.from("users").insert([{ ...newUser }]);

        if (!error) {
          const userData = await getSupabaseUser(user.email);
          setUserInfo({ ...userData } as ExtendedOpenloginUserInfo);
          localStorage.setItem("user_id", userData.user_id);
        } else {
          console.log(error, "Ошибка создания пользователя");
        }
      } else {
        setUserInfo(userData as ExtendedOpenloginUserInfo);
        localStorage.setItem("user_id", userData.user_id);
      }
    } catch (error) {
      console.error("Ошибка при получении информации о пользователе:", error);
    }
  };

  const login = async () => {
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);

      if (web3auth.connected) {
        setLoggedIn(true);
        const userInfo = await web3auth.getUserInfo();
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

  useEffect(() => {
    getUserSupabase();
    login();
  }, []);

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
    console.log("accounts", accounts);
    console.log("provider not initialized yet");
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
    console.log("balance", bal);
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
    userInfo,
    provider,
    loggedIn,
    login,
    logout,
    setProvider,
    setLoggedIn,
    signMessage,
    getBalance,
    getAccounts,
    createSupabaseUser,
    getSupabaseUser,
    workspaceSlug,
    userSupabase,
    setUserSupabase,
  };
};

export { useWeb3Auth };
