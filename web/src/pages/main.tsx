import { SSRProvider } from "react-bootstrap";
import React from "react";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";
import { isServer } from "../utils/isServer";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface mainProps {}

const main: React.FC<mainProps> = ({}) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  if (!isServer() && !user.isLoggedIn) {
    router.push(`/login?next=${router.route}`);
    return <div>Loading</div>;
  }

  return (
    <Layout>
      <div>Main Page</div>
    </Layout>
  );
};

export default main;
