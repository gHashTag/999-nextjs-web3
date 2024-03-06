"use client";
import { useWeb3Auth } from "@hooks/useWeb3Auth";
import { Button, User, Card, CardBody } from "@nextui-org/react";
import Layout from "@/components/layout";

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
  } = useWeb3Auth();

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

  const unloggedInView = (
    <Button onClick={login} color="primary" variant="faded">
      Login
    </Button>
  );

  const name = userInfo?.name;
  const description = userInfo?.email;
  const profileImage = userInfo?.profileImage;
  console.log("profileImage", profileImage);
  console.log("loggedIn - Wallet", loggedIn);
  return (
    <Layout>
      <main className="flex flex-col items-center justify-between p-24">
        {userInfo && (
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
        <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>
      </main>
    </Layout>
  );
}
