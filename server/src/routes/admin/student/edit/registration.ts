import { Request, Response } from "express";
import { query } from "../../../../db";

export const studentsEditRegistrationHandler = async (
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
    student_id,
    current_address,
    house_address,
    email,
    phoneno,
    sleepness_id,
    disability_id,
    disadvantaged_id,
    journey_id,
    special_ability,
    mom_dad_status_id,
    no_big_bro,
    no_little_bro,
    no_big_sis,
    no_little_sis,
    student_rank,
    dad_idcard,
    dad_firstname,
    dad_lastname,
    dad_salary,
    mom_idcard,
    mom_firstname,
    mom_lastname,
    mom_salary,
    dad_phoneno,
    mom_phoneno,
  } = req.body;

  data = {
    academic_year,
    student_id,
    current_address,
    house_address,
    email,
    phoneno,
    sleepness_id,
    disability_id,
    disadvantaged_id,
    journey_id,
    special_ability,
    mom_dad_status_id,
    no_big_bro,
    no_little_bro,
    no_big_sis,
    no_little_sis,
    student_rank,
    dad_idcard,
    dad_firstname,
    dad_lastname,
    dad_salary,
    mom_idcard,
    mom_firstname,
    mom_lastname,
    mom_salary,
    dad_phoneno,
    mom_phoneno,
  };

  sql = `CALL StudentOpreration(?, ?);`;
  params = [6, JSON.stringify(data)];

  console.log(params);

  result = await query(sql, params);
  // @ts-ignore
  res.json(result[0][0][0]);
};
 