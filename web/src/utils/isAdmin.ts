import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { isServer } from "./isServer";

export const isAdmin = (role: number[]): boolean => {
  const user = useSelector((state: RootState) => state.user);
  return !isServer() && role.includes(user.user!.role);
};
