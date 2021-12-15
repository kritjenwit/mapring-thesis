import { Request, Response } from "express";
import { query } from "../../../../db";

export const studentsEditBehaviourHandler = async (
  req: Request,
  res: Response
) => {
  let sql = "";
  let params = [];
  let data = {};
  let result;

  //   console.log(req.params);

  const { academic_year, term, student_id, behaviour } = req.body;

  data = {
    academic_year,
    student_id,
    term,
    behaviour,
  };

  console.log(data)

  sql = `CALL StudentOpreration(?, ?);`;
  params = [7, JSON.stringify(data)];

  console.log(params);

  result = await query(sql, params);
  // @ts-ignore
  res.json(result[0][0][0]);
};
