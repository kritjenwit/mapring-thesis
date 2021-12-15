import { Request, Response } from "express";
import { query } from "../../../../../db";

export const studentsEditAcademicHouseHandler = async (
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
    place_nearby,
    house_type_id 
 
  } = req.body;

  data = {
    academic_year,
    term,
    student_id,
    place_nearby,
    house_type_id 
  };

  console.log(data);

  sql = `CALL StudentOpreration(?, ?);`;
  params = [10, JSON.stringify(data)];
 
  console.log(params);

  result = await query(sql, params);
  // @ts-ignore
  res.json(result[0][0][0]);
}