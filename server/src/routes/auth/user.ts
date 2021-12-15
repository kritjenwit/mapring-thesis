import { Request, Response } from "express";
import { RESPONSE } from "../../constants";
import { checkEmptyString } from "../../utils/string";

export const userHandler = (req: Request, res: Response) => {
  let response = {};
  const username = req.query.username as string;
  const role_id = req.query.role as string;
  if (!username || !role_id) {
    response = {
      code: RESPONSE.INVALID_INPUT.CODE,
      message: RESPONSE.INVALID_INPUT.MESSAGE,
    };
    res.status(400).send(response);
    return;
  }

  if (checkEmptyString(username) || checkEmptyString(role_id)) {
    response = {
      code: RESPONSE.INVALID_INPUT.CODE,
      message: RESPONSE.INVALID_INPUT.MESSAGE,
    };
    res.status(400).send(response);
    return;
  }

  const userid = (req as any).userid;
  const role = (req as any).role;

  if (username !== userid || role_id !== role) {
    response = {
      code: RESPONSE.UNAUTHORIZED.CODE,
      message: RESPONSE.UNAUTHORIZED.MESSAGE,
    };
    res.status(403).send(response);
    return;
  }
  response = {
    code: RESPONSE.SUCCESS.CODE,
    message: RESPONSE.SUCCESS.MESSAGE,
  };
  res.status(200).send(response);
  return;
};
