import { Request, Response } from "express";
import { query } from "../../../db";

export const studentsAddInfoHandler = async (req: Request, res: Response) => {
  let sql = "";
  let params = [];
  let data = {};
  let result;

  //   console.log(req.params);

  const {
    academic_year,
    term,
    class_type_id,
    year,
    room,

    name_title_id,
    thai_firstname,
    thai_lastname,
    eng_firstname,
    eng_lastname,
    dob,
    nationality_id,
    race_id,
    religion_id,
    gender_id,
  } = req.body;

  data = {
    academic_year,
    term,
    class_type_id,
    year,
    room,

    name_title_id,
    thai_firstname,
    thai_lastname,
    eng_firstname,
    eng_lastname,
    dob,
    nationality_id,
    race_id,
    religion_id,
    gender_id,
  };

  try {
    sql = `CALL StudentOpreration(?, ?);`;
    params = [12, JSON.stringify(data)];

    console.log(params);

    result = await query(sql, params);
    // @ts-ignore
    res.json(result[0][0][0]);
  } catch (err) {
      console.log(`Error`);
      console.log(err);
    res.json({ code: 401, message: "Error" });
  }
};
