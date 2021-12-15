import { Request, Response } from "express";
import { query } from "../../../../../db";

export const studentsEditAcademicEvaluateHandler = async (
  req: Request,
  res: Response
) => {
  let sql = "";
  let params = [];
  let data = {};
  let result;

  const {
    academic_year,
    term,
    student_id,
    reading,
    analysing,
    writing,
 
  } = req.body;

  data = {
    academic_year,
    term,
    student_id,
    reading,
    analysing,
    writing,
  };

  console.log(data);

  sql = `CALL StudentOpreration(?, ?);`;
  params = [9, JSON.stringify(data)];
 
  console.log(params);

  result = await query(sql, params);
  // @ts-ignore
  res.json(result[0][0][0]);
}