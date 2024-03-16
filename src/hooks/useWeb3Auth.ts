"use client";

import { useState, useEffect } from "react";
import { IProvider } from "@web3auth/base";
import { web3auth } from "@/utils/web3Auth";
// Corrected the import path for supabaseClient
import { supabase } from "@/utils/supabase";
import Web3 from "web3";
import { OpenloginUserInfo } from "@toruslabs/openlogin-utils";
// Corrected the import path for useRouter
import { useRouter } from "next/router";
// import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
// import { Web3Auth } from '@web3auth/modal'

export const checkUsername = async (username: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);

  console.log(data, "data checkUsername");
  if (error) {
    console.error("Ошибка при запросе к Supabase", error);
    return false;
  }

  return data.length > 0 ? data[0].user_id : false;
};

const useWeb3Auth = () => {
  // const client = supabaseClient();
  const router = useRouter();
  //   const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn', 'false')
  const [loggedIn, setLoggedIn] = useState(false);

  const [provider, setProvider] = useState<IProvider | null>(null);

  const [address, setAddress] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<OpenloginUserInfo | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const createSupabaseUser = async (inviteCode: string) => {
    try {
      const user = await web3auth.getUserInfo();

      // Ensure that user object has all the properties of IUserInfo, with fallbacks for undefined properties
      setUserInfo((user as OpenloginUserInfo) ?? {});

      let { data: users, error } = await supabase.from("users").select("email");

      if (users && users.length === 0 && user.email) {
        // Пользователя с таким email нет в базе, создаем нового
        const newUser = {
          email: user.email,
          first_name: user.name,
          username: user.name,
          aggregateverifier: user.aggregateVerifier,
          verifier: user.verifier,
          profileimage: user.profileImage,
          typeoflogin: user.typeOfLogin,
          inviter: inviteCode,
        };

        const data = await supabase.from("users").insert([{ ...newUser }]);

        if (error) {
          console.error("Ошибка при создании пользователя:", error);
        } else {
          console.log("Пользователь создан:", data);
        }
      } else {
        // Пользователь с таким email уже существует, создание не требуется
        console.log("Пользователь с таким email уже существует");
      }
    } catch (error) {
      console.error("Ошибка при получении информации о пользователе:", error);
      console.log("Ошибка при получении информации о пользователе");
    }
  };

  const getUserInfo = async () => {
    try {
      const user = await web3auth.getUserInfo();

      setUserInfo((user as OpenloginUserInfo) ?? {});
    } catch (error) {
      console.error("Ошибка при получении информации о пользователе:", error);
      console.log("Ошибка при получении информации о пользователе");
    }
  };

  const login = async () => {
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);

      if (web3auth.connected) {
        setLoggedIn(true);
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
    getUserInfo,
    createSupabaseUser,
  };
};

export { useWeb3Auth };
