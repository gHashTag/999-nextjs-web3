"use client";
import { useEffect, useState } from "react";
import { useWeb3Auth } from "@hooks/useWeb3Auth";
import { Button, User, Card, CardBody } from "@nextui-org/react";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FieldValues } from "react-hook-form";
import { gql, useQuery, useReactiveVar, useMutation } from "@apollo/client";
import apolloClient from "@/apollo/apollo-client";
import { setUserEmail } from "@/apollo/reactive-store";
import { useToast } from "@/components/ui/use-toast";
import { SignupFormDemo } from "@/components/ui/signup-form";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const QUERY = gql`
  query GetUserByEmail($email: String!) {
    usersCollection(filter: { email: { eq: $email } }) {
      edges {
        node {
          user_id
          first_name
          last_name
          username
          avatar
          designation
          company
          position
        }
      }
    }
  }
`;

const MUTATION = gql`
  mutation UpdateUser(
    $user_id: UUID
    $first_name: String!
    $last_name: String!
    $designation: String!
  ) {
    updateusersCollection(
      filter: { user_id: { eq: $user_id } }
      set: {
        first_name: $first_name
        last_name: $last_name
        designation: $designation
      }
    ) {
      records {
        id
        first_name
        last_name
        username
        avatar
        user_id
      }
    }
  }
`;
export type updateUserDataType = {
  user_id: string;
  first_name: string;
  last_name: string;
  designation: string;
};

export default function Wallet() {
  const { address, balance, logout, getAccounts, getBalance } = useWeb3Auth();
  const email = useReactiveVar(setUserEmail);
  const { toast } = useToast();
  const [copyStatus, setCopyStatus] = useState(false);

  const { loading, error, data, refetch } = useQuery(QUERY, {
    client: apolloClient,
    fetchPolicy: "network-only",
    variables: { email: email },
  });

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const userNode = data?.usersCollection?.edges[0]?.node;

  const [mutateUser] = useMutation(MUTATION, { client: apolloClient });

  const handleFormData = (data: FieldValues) => {
    console.log(data);
    try {
      if (data.first_name) {
        const variables = {
          user_id: userNode.user_id,
          first_name: data.first_name,
          last_name: data.last_name,
          designation: data.designation,
        };
        console.log(variables, "variables");
        mutateUser({
          variables,
          onCompleted: () => {
            refetch();
          },
        });
        toast({
          title: "Success",
          description: "User data updated successfully",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Closed access",
        description: JSON.stringify(error),
      });
    }
  };
  return (
    <Layout>
      <main className="flex flex-col items-center justify-between p-14">
        {!loading && userNode && (
          <>
            <AnimatedTooltip
              items={[
                {
                  id: 1,
                  name: `${userNode.first_name} ${userNode.last_name}`,
                  designation: userNode.username,
                  image: userNode.avatar,
                },
              ]}
            />
            <SignupFormDemo
              first_name={userNode.first_name}
              last_name={userNode.last_name}
              position={userNode.position}
              company={userNode.company}
              designation={userNode.designation}
              logout={logout}
              onSubmit={handleFormData}
            />
          </>
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
            <div style={{ padding: "5px" }} />
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
      </main>
    </Layout>
  );
}
