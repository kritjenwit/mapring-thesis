import { Request, Response } from "express";
import { query } from "../../db";
import { RESPONSE } from "../../constants";

export const seachHandler = async (req: Request, res: Response) => {
  const { keyword } = req.body;
  console.log(keyword);
  let response = {};
  let sql = "";
  if (!keyword || keyword.length === 0) {
    response = {
      code: RESPONSE.UNAUTHORIZED.CODE,
      message: RESPONSE.UNAUTHORIZED.MESSAGE,
    };
    res.status(400).send(response);
  }

  try {
    sql = `CALL StudentOpreration(3, '{"keyword": "${keyword}"}');`;
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
