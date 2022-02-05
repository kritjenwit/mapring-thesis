import { useRouter } from "next/router";
import React from "react";
import { SSRProvider } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Layout } from "../components/Layout";
import { NavbarComponent } from "../components/NavbarComponent";

interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  if (!user.isLoggedIn) {
    router.push("/login");
  }

  return (
    <SSRProvider>
      <Layout>
        <div></div>
      </Layout>
    </SSRProvider>
  );
};

export default index;
