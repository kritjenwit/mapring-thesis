import { Request, Response } from "express";
import { jwtSecret } from "../../constants";
import { verify } from "jsonwebtoken";
import { JWTPayload } from "../../types";

export const meHandler = async (req: Request, res: Response) => {
  const jwtToken = req.header("token");
  if (!jwtToken) {
    return res.status(403).json({ code: 403, message: "Not authorized" });
  }
  // const payload = verify(jwtToken, jwtSecret) as JWTPayload;
  verify(jwtToken, jwtSecret) as JWTPayload;
  // console.log(payload);
  res.send("ok");
  return;
};
