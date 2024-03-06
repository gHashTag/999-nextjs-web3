"use client";

import { useState, useEffect } from "react";
import { IProvider } from "@web3auth/base";
import { web3auth } from "@/utils/web3Auth";
import Web3 from "web3";
import { OpenloginUserInfo } from "@toruslabs/openlogin-utils";
// import { useLocalStorage } from '@hooks/useLocalStorage'
// import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
// import { Web3Auth } from '@web3auth/modal'

const useWeb3Auth = () => {
  //   const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn', 'false')
  const [loggedIn, setLoggedIn] = useState(true);
  console.log("loggedIn", loggedIn);
  const [provider, setProvider] = useState<IProvider | null>(null);

  const [address, setAddress] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<OpenloginUserInfo | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  console.log("loggedIn - useWeb3Auth", loggedIn);

  const getUserInfo = async () => {
    try {
      const user = await web3auth.getUserInfo();
      // Ensure that user object has all the properties of IUserInfo, with fallbacks for undefined properties
      setUserInfo((user as OpenloginUserInfo) ?? {});
      console.log("user", user);
    } catch (error) {
      console.error("Ошибка при получении информации о пользователе:", error);
      console.log("Ошибка при получении информации о пользователе");
    }
  };

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);

    if (web3auth.connected) {
      setLoggedIn(true);
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
  };
};

export { useWeb3Auth };
