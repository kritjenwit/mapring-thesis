import { Request, Response } from "express";
import { query } from "../../db";

const getSleepness = async () => {
  let sql = `SELECT id,name
    FROM tbl_sleepness
    WHERE status = 1
    ORDER BY sort;`;
  let result = await query(sql);
  return result[0];
};

const getDisability = async () => {
  let sql = `SELECT id,name
    FROM tbl_disability
    WHERE status = 1
    ORDER BY sort;`;
  let result = await query(sql);
  return result[0];
};

const getDisadvatage = async () => {
  let sql = `SELECT id,name
    FROM tbl_disadvantage
    WHERE status = 1
    ORDER BY sort;`;
  let result = await query(sql);
  return result[0];
};

const getJourney = async () => {
  let sql = `SELECT id,name
    FROM tbl_journey
    WHERE status = 1
    ORDER BY sort;`;
  let result = await query(sql);
  return result[0];
};

const getMomDadStatus = async () => {
  let sql = `SELECT id,name
    FROM tbl_mom_dad_status
    WHERE status = 1
    ORDER BY sort;`;
  let result = await query(sql);
  return result[0];
};

const getRaces = async () => {
  let sql = `SELECT id,name
    FROM tbl_races
    WHERE status = 1
    ORDER BY sort;`;
  let result = await query(sql);
  return result[0];
};

const getNationality = async () => {
  let sql = `SELECT id,name
    FROM tbl_nationalities
    WHERE status = 1
    ORDER BY sort;`;
  let result = await query(sql);
  return result[0];
};

const getReligion = async () => {
  let sql = `SELECT id,name
    FROM tbl_religions
    WHERE status = 1
    ORDER BY sort;`;
  let result = await query(sql);
  return result[0];
};

const getNameTitle = async () => {
  let sql = `SELECT id,name
    FROM tbl_name_title
    WHERE status = 1
    ORDER BY sort;`;
  let result = await query(sql);
  return result[0];
};

const getGender = async () => {
  let sql = `SELECT id,name
    FROM tbl_genders
    WHERE status = 1
    ORDER BY sort;`;
  let result = await query(sql);
  return result[0];
};

const getClassType = async () => {
  let sql = `SELECT id, name
  FROM tbl_class_type
  WHERE status = 1
  ORDER BY "order"`;
  let result = await query(sql);
  return result[0];
};

const getYears = async () => {
  let sql = `SELECT DISTINCT year
  FROM tbl_student_academic_year
  WHERE academic_year = (SELECT Get_Academicyear())
  AND term = (SELECT Get_AcademicTerm((SELECT Get_Academicyear())))
  ORDER BY year`;
  let result = await query(sql);
  return result[0];
};

const getRoom = async () => {
  let sql = `SELECT DISTINCT room
  FROM tbl_student_academic_year
  WHERE academic_year = (SELECT Get_Academicyear())
  AND term = (SELECT Get_AcademicTerm((SELECT Get_Academicyear())))
  ORDER BY room`;
  let result = await query(sql);
  return result[0];
};

const getSubjects = async () => {
  let sql = `SELECT id, name, min_score, max_score
  FROM tbl_subjects
  WHERE status = 1
  ORDER BY "sort"`;
  let result = await query(sql);
  // @ts-ignore
  return result[0];
};

const getHouseType = async () => {
  let sql = `SELECT id,name
    FROM tbl_house_type
    WHERE status = 1
    ORDER BY sort;`;
  let result = await query(sql);
  return result[0];
};

const getManners = async () => {
  let sql = `SELECT id,name,min_score,max_score
    FROM tbl_manners
    WHERE status = 1
    ORDER BY sort;`;
  let result = await query(sql);
  return result[0];
};


const getAcademicYear = async () => {
  let sql = `SELECT Get_AcademicYear() as academicYear`;
  let result = await query(sql);
  // @ts-ignore
  return result[0][0].academicYear;
};

const getAcademicTerm = async () => {
  let sql = `SELECT Get_AcademicTerm((SELECT Get_Academicyear())) as academicTerm`;
  let result = await query(sql);
  // @ts-ignore
  return result[0][0].academicTerm;
};

export const studentsConfigHandler = async (_: Request, res: Response) => {
  const [
    sleepness,
    disability,
    disadvantaged,
    journey,
    momDadStatus,
    academicYear,
    academicTerm,
    races,
    nationality,
    religion,
    nameTitle,
    gender,
    classType,
    years,
    rooms,
    subjects,
    houseType,
    manners,
  ] = await Promise.all([
    getSleepness(),
    getDisability(),
    getDisadvatage(),
    getJourney(),
    getMomDadStatus(),
    getAcademicYear(),
    getAcademicTerm(),
    getRaces(),
    getNationality(),
    getReligion(),
    getNameTitle(),
    getGender(),
    getClassType(),
    getYears(),
    getRoom(),
    getSubjects(),
    getHouseType(),
    getManners(),
  ]);

  let response = {
    academicYear,
    academicTerm,
    dropdown: {
      sleepness,
      disability,
      disadvantaged,
      journey,
      momDadStatus,
      races,
      nationality,
      religion,
      nameTitle,
      gender,
      classType,
      years,
      rooms,
      subjects,
      houseType,
      manners
    },
  };
  res.json(response);
};
 