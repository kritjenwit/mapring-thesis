import { Request, Response } from "express";
import { query } from "../../../db";

const getStudents = async (data: any) => {
  let sql = `CALL StudentOpreration(?, ?);`;
  let params = [1, JSON.stringify(data)];

  let result = await query(sql, params);
  // @ts-ignore
  return result[0];
};

const getSubjects = async () => {
  let sql = `SELECT id, name, min_score, max_score, 0 as score, 0 as score_work, 0 as score_test
  FROM tbl_subjects
  WHERE status = 1
  ORDER BY "sort"`;
  let result = await query(sql);
  // @ts-ignore
  return result[0];
};

const getStudentSubject = async (
  academic_year: number | string,
  term: string | number,
  studentList: string
) => {
  let sql = `SELECT *
  FROM tbl_student_subject
  WHERE academic_year = ${academic_year}
  AND term = ${term}
  AND student_id in (${studentList})`;
  let result = await query(sql);
  // @ts-ignore
  return result[0];
};

const getManners = async () => {
  let sql = `SELECT id, name, min_score, max_score, 0 as score
  FROM tbl_manners
  WHERE status = 1
  ORDER BY "sort"`;
  let result = await query(sql);
  // @ts-ignore
  return result[0];
};

const getStudentManner = async (
  academic_year: number | string,
  term: string | number,
  studentList: string
) => {
  let sql = `SELECT *
  FROM tbl_student_manner
  WHERE academic_year = ${academic_year}
  AND term = ${term}
  AND student_id in (${studentList})`;
  let result = await query(sql);
  // @ts-ignore
  return result[0];
};

export const studentsHandler = async (req: Request, res: Response) => {
  let data = {};

  const queryString = req.query;
  const { academic_year, term, classType, year, room } =
    queryString as unknown as {
      academic_year: number;
      term: number;
      classType: number;
      year: number;
      room: number;
    };

  data = {
    academic_year: academic_year,
    term: term,
    class_type: classType,
    year: year,
    room: room,
  };

  const [resultGetStudents, resultGetSubject, resultGetManners] = await Promise.all([
    getStudents(data),
    getSubjects(),
    getManners(),
  ]);

  let students = resultGetStudents as any[];
  let students1 = students[0];
  let studentList = students[0]
    .map((student: any) => student.student_id)
    .join(`','`) as unknown as any[];
  let studentStringList = `'${studentList}'`;

  const [resultGetStudentSubject, resultGetStudentManner] = await Promise.all([
    getStudentSubject(academic_year, term, studentStringList),
    getStudentManner(academic_year, term, studentStringList),
  ]);

  let studentSubject = {};
  // @ts-ignore
  for (let i = 0; i < resultGetStudentSubject.length; i++) {
    // @ts-ignore
    let subjectId = resultGetStudentSubject[i].subject_id;
    // @ts-ignore
    let studentId = resultGetStudentSubject[i].student_id;

    // @ts-ignore
    if (typeof studentSubject[studentId] === "undefined") {
      // @ts-ignore
      studentSubject[studentId] = {};
    }
    // @ts-ignore
    studentSubject[studentId][subjectId] = resultGetStudentSubject[i];
  }

  let studentManner = {};
  // @ts-ignore
  for (let i = 0; i < resultGetStudentManner.length; i++) {
    // @ts-ignore
    let mannerId = resultGetStudentManner[i].manner_id;
    // @ts-ignore
    let studentId = resultGetStudentManner[i].student_id;

    // @ts-ignore
    if (typeof studentManner[studentId] === "undefined") {
      // @ts-ignore
      studentManner[studentId] = {};
    }
    // @ts-ignore
    studentManner[studentId][mannerId] = resultGetStudentManner[i];
  }


  let tmpStudent = {};
  let subjects = {};
  let manners = {};
  if (students1.length > 0) {
    for (let i = 0; i < students1.length; i++) {
      let studentId = students1[i].student_id;
      // @ts-ignore
      tmpStudent[studentId] = students1[i];
      // @ts-ignore
      for (let j = 0; j < resultGetSubject.length; j++) {
        // @ts-ignore
        let subjectId = resultGetSubject[j].id;
        // @ts-ignore
        if (typeof subjects[studentId] === "undefined") {
          // @ts-ignore
          subjects[studentId] = {};
        }
        // @ts-ignore
        if (typeof subjects[studentId][subjectId] === "undefined") {
          // @ts-ignore
          subjects[studentId][subjectId] = {};
        }

        // @ts-ignore
        // subjects[studentId][subjectId] = resultGetSubject[j];
        // @ts-ignore
        Object.assign(subjects[studentId][subjectId], resultGetSubject[j]);

        // @ts-ignore
        if (
          // @ts-ignore
          typeof studentSubject[studentId] !== "undefined" &&
          // @ts-ignore
          typeof studentSubject[studentId][subjectId] !== "undefined"
        ) {
          // @ts-ignore
          let stdSubjectObject = studentSubject[studentId][subjectId];
          // @ts-ignore
          subjects[studentId][subjectId].score = stdSubjectObject.score;
          // @ts-ignore
          subjects[studentId][subjectId].score_work =
            stdSubjectObject.score_work;
          // @ts-ignore
          subjects[studentId][subjectId].score_test =
            stdSubjectObject.score_test;

          // subjects[studentId][subjectId] = {
          //   score: 123,
          //   score_work: 123,
          //   score_test: 123,
          // }
        } else {
          // @ts-ignore
          subjects[studentId][subjectId].score = null;
          // @ts-ignore
          subjects[studentId][subjectId].score_work = null;
          // @ts-ignore
          subjects[studentId][subjectId].score_test = null;
        }
      }

      // @ts-ignore
      for (let k = 0; k < resultGetManners.length; k++) {
        // @ts-ignore
        let mannerId = resultGetManners[k].id;
        // @ts-ignore
        if (typeof manners[studentId] === "undefined") {
          // @ts-ignore
          manners[studentId] = {};
        }
        // @ts-ignore
        if (typeof manners[studentId][mannerId] === "undefined") {
          // @ts-ignore
          manners[studentId][mannerId] = {};
        }

        // @ts-ignore
        // manners[studentId][mannerId] = resultGetManners[j];
        // @ts-ignore
        Object.assign(manners[studentId][mannerId], resultGetManners[k]);

        // @ts-ignore
        if (
          // @ts-ignore
          typeof studentManner[studentId] !== "undefined" &&
          // @ts-ignore
          typeof studentManner[studentId][mannerId] !== "undefined"
        ) {
          // @ts-ignore
          let stdMannersObject = studentManner[studentId][mannerId];
          // @ts-ignore
          manners[studentId][mannerId].score = stdMannersObject.score;
          // @ts-ignore
          manners[studentId][mannerId].score_work =
            stdMannersObject.score_work;
          // @ts-ignore
          manners[studentId][mannerId].score_test =
            stdMannersObject.score_test;

          // manners[studentId][mannerId] = {
          //   score: 123,
          //   score_work: 123,
          //   score_test: 123,
          // }
        } else {
          // @ts-ignore
          manners[studentId][mannerId].score = null;
          // @ts-ignore
          manners[studentId][mannerId].score_work = null;
          // @ts-ignore
          manners[studentId][mannerId].score_test = null;
        }
      }
      // @ts-ignore
      tmpStudent[studentId].subjects = subjects[studentId];
      // @ts-ignore
      tmpStudent[studentId].manners = manners[studentId];
    }
  }

  // @ts-ignore
  res.json(students1); 

  // console.log(query);
  // res.send("ok");
};
