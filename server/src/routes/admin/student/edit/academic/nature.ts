import { Request, Response } from "express";
import { query } from "../../../../../db";

export const studentsEditAcademicNatureHandler = async (
  req: Request,
  res: Response
) => {
  let sql = "";
  let params = [];
  let data = {};
  let result;

  //   console.log(req.params);

  const {
    academic_year,
    term,
    student_id,
    score,
    manner_id,
  } = req.body;

  data = {
    academic_year,
    term,
    student_id,
    score,
    manner_id,
  };

  console.log(data);

  sql = `CALL StudentOpreration(?, ?);`;
  params = [11, JSON.stringify(data)];

  console.log(params);

  result = await query(sql, params);
  // @ts-ignore
  res.json(result[0][0][0]);
};
