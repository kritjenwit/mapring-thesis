import { sign } from "jsonwebtoken";
import { JWTPayload } from "../types";
import { jwtSecret } from "../constants";

export const jwtGenerator = (userid: string, role: string) => {
  const payload: JWTPayload = {
    userid,
    role,
  };

  return sign(payload, jwtSecret, { expiresIn: "1hr" });
};
