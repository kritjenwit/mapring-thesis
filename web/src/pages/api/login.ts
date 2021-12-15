import type { NextApiRequest, NextApiResponse } from "next";

type Error = {
  message: string;
};

type Success = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Error | Success>
) {
  if (req.method === "POST") {
    const { username, password }: { username: string; password: string } =
      req.body;

    if (!username || !password) {
      res.status(400).send({ message: "Username and password is incorrect" });
    }

    res.status(200).send({ message: "Succcess" });
  } else {
    res.status(400).send({ message: "Method not allowed" });
  }
}
