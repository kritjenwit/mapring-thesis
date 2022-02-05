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

const getParentNameTitle = async () => {
  let sql = `SELECT id,name
    FROM tbl_name_title
    WHERE status = 1 and parent_status = 1
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

const getCardType = async () => {
  let sql = `SELECT id,name
    FROM tbl_card_type
    WHERE status = 1
    ORDER BY sort;`;
  let result = await query(sql);
  return result[0];
};

const getStudentJoinType = async () => {
  let sql = `SELECT id,name
    FROM tbl_student_join_type
    WHERE status = 1
    ORDER BY sort;`;
  let result = await query(sql);
  return result[0];
};

const getGuardianType = async () => {
  let sql = `SELECT id,name
    FROM tbl_guardian_type
    WHERE status = 1
    ORDER BY sort;`;
  let result = await query(sql);
  return result[0];
};

const getBloodType = async () => {
  let sql = `SELECT id,name
    FROM tbl_blood_type
    WHERE status = 1
    ORDER BY sort;`;
  let result = await query(sql);
  return result[0];
};

const getClassTypeV2 = async () => {
  let sql = `SELECT id,name
    FROM tbl_class_type_v2
    WHERE status = 1
    ORDER BY sort;`;
  let result = await query(sql);
  return result[0];
};

const getProvinces = async () => {
  let sql = `SELECT a.code as id,a.name_th as name
    FROM provinces as a
    ORDER BY a.id;`;
  let result = await query(sql);
  return result[0];
};

const getAmphures = async () => {
  let sql = `SELECT a.code as id,a.name_th as name
    FROM amphures as a
    ORDER BY a.id;`;
  let result = await query(sql);
  return result[0];
};

const getTambol = async () => {
  let sql = `SELECT a.tcode AS id, tname AS name
  FROM tambol AS a
  ORDER BY a.id`;
  let result = await query(sql);
  return result[0];
};

const getJobs = async () => {
  let sql = `SELECT id,name
    FROM tbl_jobs
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
    cardType,
    studentJoinType,
    bloodType,
    classTypeV2,
    provinces,
    amphures,
    tambol,
    parentNameTitle,
    jobs,
    guardian
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
    getCardType(),
    getStudentJoinType(),
    getBloodType(),
    getClassTypeV2(),
    getProvinces(),
    getAmphures(),
    getTambol(),
    getParentNameTitle(),
    getJobs(),
    getGuardianType()
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
      manners,
      cardType,
      studentJoinType,
      bloodType,
      classTypeV2,
      provinces,
      amphures,
      tambol,
      parentNameTitle,
      jobs,
      guardian
    },
  };
  res.json(response);
};
