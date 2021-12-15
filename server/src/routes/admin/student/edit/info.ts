import { Request, Response } from "express";
import { query } from "../../../../db";

export const studentsEditInfoHandler = async (req: Request, res: Response) => {
  let sql = "";
  let params = [];
  let data = {};
  let result;

  //   console.log(req.params);

  const {
    academic_year,
    student_id,
    name_title_id,
    thai_firstname,
    thai_lastname,
    eng_firstname,
    eng_lastname,
    dob,
    nationality_id,
    race_id,
    religion_id,
  } = req.body;

  data = {
    academic_year,
    student_id,
    name_title_id,
    thai_firstname,
    thai_lastname,
    eng_firstname,
    eng_lastname,
    dob,
    nationality_id,
    race_id,
    religion_id,
  };


  
  sql = `CALL StudentOpreration(?, ?);`;
  params = [5, JSON.stringify(data)];

  console.log(params);

  result = await query(sql, params);
  // @ts-ignore
  res.json(result[0][0][0]);
};
  