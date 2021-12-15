import axios from "axios";

export const fetcher = async (url: string, token: string | null) => {
  const header = token
    ? {
        headers: {
          token,
        },
      }
    : undefined;

  const res = await axios.get(url, header);
    return res.data;
};
