"use client";
import { useEffect, useState } from "react";
import { useWeb3Auth } from "@hooks/useWeb3Auth";
import { Button, User, Card, CardBody } from "@nextui-org/react";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { Snippet } from "@nextui-org/react";
// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSupabase } from "@/hooks/useSupabase";
import { Globe } from "@/components/ui/globe";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import apolloClient from "@/apollo/apollo-client";
import { setUserEmail } from "@/apollo/reactive-store";

const QUERY = gql`
  query GetUserByEmail($email: String!) {
    usersCollection(filter: { email: { eq: $email } }) {
      edges {
        node {
          first_name
          last_name
          username
          avatar
        }
      }
    }
  }
`;

export default function Wallet() {
  const router = useRouter();

  const { address, balance, loggedIn, logout, getAccounts, getBalance } =
    useWeb3Auth();
  const email = useReactiveVar(setUserEmail);
  console.log(email, "email");
  const [copyStatus, setCopyStatus] = useState(false);
  const { loading, error, data } = useQuery(QUERY, {
    client: apolloClient,
    variables: { email: email },
  });

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const loggedInView = (
    <>
      <div>
        <Button onClick={logout} color="primary" variant="faded">
          Log Out
        </Button>
      </div>
    </>
  );
  const userNode = data?.usersCollection?.edges[0]?.node;

  return (
    <Layout>
      <main className="flex flex-col items-center justify-between p-24">
        {!loading && userNode && (
          <User
            name={`${userNode.first_name} ${userNode.last_name}`}
            description={userNode.username}
            avatarProps={{ src: userNode.avatar }}
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
