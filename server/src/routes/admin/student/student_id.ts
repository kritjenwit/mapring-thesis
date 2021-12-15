import { Request, Response } from "express";
import { query } from "../../../db";

const getStudents = async (data: any) => {
  let sql = `CALL StudentOpreration(?, ?);`;
  let params = [2, JSON.stringify(data)];

  let result = await query(sql, params);
  // @ts-ignore
  return result[0][0];
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

// const getAcademicYear = async () => {
//   let sql = `SELECT Get_AcademicYear() as academicYear`;
//   let result = await query(sql);
//   // @ts-ignore
//   return result[0][0].academicYear;
// };

// const getAcademicTerm = async (academicYear: number | string) => {
//   let sql = `SELECT Get_AcademicTerm(${academicYear}) as academicTerm`;
//   let result = await query(sql);
//   // @ts-ignore
//   return result[0][0].academicTerm;
// };

const getStudentSubject = async (
  academic_year: number | string,
  student_id: string
) => {
  let sql = `SELECT *
  FROM tbl_student_subject
  WHERE academic_year = ${academic_year}
  AND term = (SELECT Get_AcademicTerm(${academic_year}))
  AND student_id = '${student_id}'`;
  let result = await query(sql);
  // @ts-ignore
  return result[0];
};

export const studentsIdHandler = async (req: Request, res: Response) => {
  const { academic_year, id } = req.params;
  let data = {
    academic_year,
    student_id: id,
  };

  const [
    resultGetStudent,
    resultGetSubjects,
    // resultGetAcademicYear,
    // resultGetAcademicTerm,
    resultGetStudentSubject,
  ] = await Promise.all([
    getStudents(data),
    getSubjects(),
    // getAcademicYear(),
    // getAcademicTerm(academic_year),
    getStudentSubject(academic_year, id),
  ]);

  let studentSubject = {};
  // @ts-ignore
  for (let i = 0; i < resultGetStudentSubject.length; i++) {
    // @ts-ignore
    let subjectId = resultGetStudentSubject[i].subject_id;
    // @ts-ignore
    studentSubject[subjectId] = resultGetStudentSubject[i];
  }

  console.log(studentSubject);
  console.log(resultGetSubjects);

  let subjects = {};
  // @ts-ignore
  for (let i = 0; i < resultGetSubjects.length; i++) {
    // @ts-ignore
    let subjectId = resultGetSubjects[i].id;
    // @ts-ignore
    subjects[subjectId] = resultGetSubjects[i];
    // @ts-ignore
    if (typeof studentSubject[subjectId] !== "undefined") {
      // @ts-ignore
      subjects[subjectId].score = studentSubject[subjectId].score;
      // @ts-ignore
      subjects[subjectId].score_work = studentSubject[subjectId].score_work;
      // @ts-ignore
      subjects[subjectId].score_test = studentSubject[subjectId].score_test;
    } else {
      // @ts-ignore
      subjects[subjectId].score = 0;
      // @ts-ignore
      subjects[subjectId].score_work = 0;
      // @ts-ignore
      subjects[subjectId].score_test = 0;
    }
  }

  let response = resultGetStudent[0];
  response.subjects = subjects;

  // @ts-ignore
  res.json(response);
};
