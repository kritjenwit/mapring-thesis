import React, { useEffect } from "react";
import { Alert, Container, SSRProvider } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { fetchConfig } from "../features/configSlice";
import { unsetGlobalError } from "../features/globalSlice";
import { userLogout } from "../features/userSlice";
import { NavbarComponent } from "./NavbarComponent";

interface LayoutProps {
  isFluid?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, isFluid }) => {
  const global = useSelector((state: RootState) => state.global);
  const user = useSelector((state: RootState) => state.user);
  const config = useSelector((state: RootState) => state.config);

  const dispatch = useDispatch();

  useEffect(() => {
    if (global.isError) {
      setTimeout(() => {
        dispatch(unsetGlobalError());
      }, 2000);
    }
  }, [dispatch, global]);

  useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(fetchConfig({ token: user.user!.token }));
    }
  }, [config]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    console.log(user)
    if (user.isLoggedIn) {
      interval = setInterval(() => {
        const userStorage = localStorage.getItem("user");
        if (userStorage) {
          const JSONUserStorage = JSON.parse(userStorage);
          console.log(JSONUserStorage)
          if (
            !JSONUserStorage.username ||
            !JSONUserStorage.role ||
            !JSONUserStorage.token
          ) {
            dispatch(userLogout());
            clearInterval(interval);
          }
        } else {
          dispatch(userLogout());
          clearInterval(interval);
        }
      }, 3000);
    }
  }, [dispatch, user]);

  return (
    <SSRProvider>
      <NavbarComponent />

      <Container fluid={isFluid}>
        {global.isError ? (
          <Alert style={{ marginTop: "20px" }} variant="danger">
            {global.error}
          </Alert>
        ) : null}
        {children}
      </Container>
    </SSRProvider>
  );
};
