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
    classTypeV2,
    cardType,
    studentJoinType,
    bloodType,
    idcard,
    room
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
    class_type_id_v2: classTypeV2,
    card_type_id: cardType,
    student_join_type_id: studentJoinType,
    blood_type_id: bloodType,
    idcard,
    room
  };

  sql = `CALL StudentOpreration(?, ?);`;
  params = [5, JSON.stringify(data)];

  console.log(params);

  result = await query(sql, params);
  // @ts-ignore
  res.json(result[0][0][0]);
};
