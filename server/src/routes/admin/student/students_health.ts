import { Request, Response } from "express";
import { query } from "../../../db";

export const studentsHealthHandler = async (req: Request, res: Response) => {
  let sql = "";
  let params = [];
  let data = {};
  let result;

  const { student_id, term, weight, height } = req.body.values;

  data = {
    student_id,
    term: term,     
    weight: weight,
    height: height,
  };

  console.log(data)

  sql = `CALL StudentOpreration(?, ?);`;
  params = [4, JSON.stringify(data)];

  result = await query(sql, params);
  // @ts-ignore
  res.json(result[0][0][0]);
};
 