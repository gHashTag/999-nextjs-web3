"use client";
import { useEffect } from "react";
import { useWeb3Auth } from "@hooks/useWeb3Auth";
import { Button, User, Card, CardBody } from "@nextui-org/react";
import Layout from "@/components/layout";
import { useRouter } from "next/router";

export default function Wallet() {
  const {
    address,
    balance,
    userInfo,
    login,
    loggedIn,
    logout,
    getUserInfo,
    getAccounts,
    getBalance,
    signMessage,
    createSupabaseUser,
  } = useWeb3Auth();

  const router = useRouter();
  const { inviteCode } = router.query;

  useEffect(() => {
    console.log("loggedIn", loggedIn);
    if (loggedIn) {
      // Выполнить действия после успешного входа
      console.log("Успешный вход");
      // Например, получить информацию о пользователе
      getUserInfo();
      // Или получить баланс
      getBalance();
      // Или получить список аккаунтов
      getAccounts();

      if (inviteCode) {
        const createdUser = async (inviteCode: string) =>
          await createSupabaseUser(inviteCode);

        createdUser(inviteCode as string);
      }
    } else {
      router.push("/");
    }
  }, [loggedIn, inviteCode]);

  const loggedInView = (
    <>
      <div className="flex gap-4 items-center">
        <div>
          <Button onClick={getUserInfo} color="primary" variant="faded">
            Get User Info
          </Button>
        </div>
        <div>
          <Button onClick={getAccounts} color="primary" variant="faded">
            Get Accounts
          </Button>
        </div>
        <div>
          <Button onClick={getBalance} color="primary" variant="faded">
            Get Balance
          </Button>
        </div>
        {/* <div>
          <Button onClick={signMessage} color="primary" variant="faded">
            Sign Message
          </Button>
        </div> */}
        <div>
          <Button onClick={logout} color="primary" variant="faded">
            Log Out
          </Button>
        </div>
      </div>
    </>
  );

  const name = userInfo?.name;
  const description = userInfo?.email;
  const profileImage = userInfo?.profileImage;
  console.log("profileImage", profileImage);
  console.log("loggedIn - Wallet", loggedIn);
  return (
    <Layout>
      <main className="flex flex-col items-center justify-between p-24">
        {loggedIn && (
          <User
            name={name}
            description={description}
            avatarProps={{ src: profileImage }}
          />
        )}
        <div style={{ padding: "20px" }} />
        {address && (
          <Card>
            <CardBody>
              <p>{address}</p>
            </CardBody>
          </Card>
        )}

        <div style={{ padding: "20px" }} />
        {balance && (
          <Card>
            <CardBody>
              <p>{balance}</p>
            </CardBody>
          </Card>
        )}
        <div style={{ padding: "20px" }} />
        <div className="grid">{loggedIn && loggedInView}</div>
      </main>
    </Layout>
  );
}
