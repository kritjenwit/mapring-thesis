import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { isServer } from "./isServer";

export const isLogin = (): boolean => {
  const user = useSelector((state: RootState) => state.user);
  if (!isServer()) {
    if (!user.isLoggedIn) {
      return true;
    }
  }
  return false;
};
