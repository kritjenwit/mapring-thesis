import { Request, Response } from "express";
import { query } from "../../db";
import { RESPONSE } from "../../constants";

export const deleteAccountHandler = async (req: Request, res: Response) => {
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

  const { username }: { username: string } = req.body;

  try {
    let data: any = {
      username_del: username,
      username_admin: userid,
    };

    sql = `CALL AccountOperation(5, '${JSON.stringify(data)}')`;
    console.log(sql);
    await query(sql);
    // @ts-ignore
    response = {
      code: RESPONSE.SUCCESS.CODE,
      message: RESPONSE.SUCCESS.MESSAGE,
    };
    res.status(200).send(response);
  } catch (err) {
    response = {
      code: 500,
      message: "failed",
    };
    res.status(500).send(response);
  }
};
