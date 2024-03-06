import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
if (!process.env.NEXT_PUBLIC_CLIENT_ID) {
  throw new Error("NEXT_PUBLIC_CLIENT_ID is not set");
}

const chainConfig = {
  chainId: "0x1", // Please use 0x1 for Mainnet
  rpcTarget: "https://rpc.ankr.com/eth",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://images.toruswallet.io/eth.svg",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfig },
});

export const web3auth = new Web3Auth({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  chainConfig,
  privateKeyProvider,
});
