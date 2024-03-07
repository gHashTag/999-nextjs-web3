import { web3auth } from "@/utils/web3Auth";
import { ADAPTER_EVENTS, IProvider } from "@web3auth/base";

export const initWeb3Auth = async () => {
  console.log("web3auth.connected", web3auth.connected);
  if (!web3auth.connected) {
    await web3auth.initModal();
  }
};

export const authenticateUser = async () => {
  const info = await web3auth.getUserInfo();
  console.log("info", info);
  const app_scoped_key = await web3auth.provider?.request({
    method: "eth_private_key", // use "private_key" for other non-evm chains
  });
  // ... дополнительная логика аутентификации
  return { info, app_scoped_key };
};

export const login = async () => {
  try {
    console.log("login");
    const web3authProvider = await web3auth.connect();
    console.log("web3authProvider", web3authProvider);
    return web3authProvider;
  } catch (error) {
    if (error instanceof Error && error.message === "popup_closed_by_user") {
      // Обработка ситуации, когда всплывающее окно было закрыто пользователем
      console.log("Вход отменен пользователем");
    } else {
      // Обработка других видов ошибок
      console.error("Ошибка входа:", error);
    }
  }
};

export const subscribeToEvents = (
  onConnected: (provider: IProvider) => void
) => {
  web3auth.on(ADAPTER_EVENTS.CONNECTED, onConnected);
  return () => {
    web3auth.off(ADAPTER_EVENTS.CONNECTED, onConnected);
  };
};
