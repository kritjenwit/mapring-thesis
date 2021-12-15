import { Request, Response } from "express";
import { query } from "../../db";
import { RESPONSE } from "../../constants";

export const registrationHandler = async (req: Request, res: Response) => {
  const role = (req as any).role;
  const userid = (req as any).userid;
  let response = {};
  let sql = "";
  // let params = [];
  if (![1].includes(role)) {
    // TODO: not allowed and then response
    response = {
      code: RESPONSE.UNAUTHORIZED.CODE,
      message: RESPONSE.UNAUTHORIZED.MESSAGE,
    };
    res.status(400).send(response);
  }

  try {
    sql = `CALL AccountOperation(3, '{"username": "${userid}"}')`;
    const result = await query(sql);
    // @ts-ignore
    const data = result[0][0].length > 0 ? result[0][0] : [];
    response = {
      code: RESPONSE.SUCCESS.CODE,
      message: RESPONSE.SUCCESS.MESSAGE,
      data,
    };
    res.status(200).send(response);
  } catch (err) {}
};
