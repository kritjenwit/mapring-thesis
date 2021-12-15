import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWTPayload } from "../types";
import { jwtSecret } from "../constants";

// @ts-ignore
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(403).json({ code: 403, message: "Not authorized" });
    }
    const payload = verify(jwtToken, jwtSecret) as JWTPayload;
    (req as any).userid = payload.userid;
    (req as any).role = +payload.role;
    // console.log(payload);
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json({ code: 403, message: "Not authorized" });
  }
};
