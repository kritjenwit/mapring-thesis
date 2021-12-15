import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "./fetcher";

interface APIResponse {
  code: number;
  data?: {
    token: string;
    username: string;
  } | null;
  message: string;
}

export default function useIsLogin(): APIResponse {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
  const username =
    typeof window !== "undefined" ? sessionStorage.getItem("username") : null;

  let data;

  if (typeof window !== "undefined" && username !== null) {
    const swrData = useSWR(
      [`http://localhost:4000/api/auth/me?username=${username}`, token],
      fetcher
    );
    data = swrData.data;
  }

  return data as unknown as APIResponse;
}
