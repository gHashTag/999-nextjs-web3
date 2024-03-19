"use client";
import { useEffect, useState } from "react";
import { useWeb3Auth } from "@hooks/useWeb3Auth";
import { Button, User, Card, CardBody } from "@nextui-org/react";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { Snippet } from "@nextui-org/react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Wallet() {
  const {
    address,
    balance,
    userInfo,
    login,
    loggedIn,
    logout,
    getAccounts,
    getBalance,
    signMessage,
    createSupabaseUser,
  } = useWeb3Auth();
  const [textToCopy, setTextToCopy] = useState(""); // The text you want to copy
  const [copyStatus, setCopyStatus] = useState(false); // To indicate if the text was copied
  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
  };

  const router = useRouter();
  const { inviteCode } = router.query;

  useEffect(() => {
    console.log("loggedIn", loggedIn);
    if (loggedIn) {
      // Выполнить действия после успешного входа
      console.log("Успешный вход");

      // Или получить баланс
      getBalance();
      // Или получить список аккаунтов
      getAccounts();

      // if (inviteCode) {
      const createdUser = async (inviteCode: string) =>
        await createSupabaseUser(inviteCode);

      createdUser(inviteCode as string);
      //}
    }
    // else {
    //   router.push("/");
    // }
  }, [loggedIn, inviteCode]);

  const loggedInView = (
    <>
      <div className="flex gap-4 items-center">
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
  const avatar = userInfo?.avatar;

  return (
    <Layout>
      <main className="flex flex-col items-center justify-between p-24">
        {loggedIn && (
          <User
            name={name}
            description={description}
            avatarProps={{ src: avatar }}
          />
        )}
        <div style={{ padding: "20px" }} />
        {address && (
          <>
            <Card>
              <CardBody>
                <CopyToClipboard text={address} onCopy={onCopyText}>
                  <span>{address}</span>
                </CopyToClipboard>
              </CardBody>
            </Card>
            {copyStatus && <p>Text copied to clipboard!</p>}
          </>
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
