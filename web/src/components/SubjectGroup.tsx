import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { Form as BtForm } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import axios from "../utils/axios";

interface SubjectGroupProps {
  student: any;
  subject: any;
}

export const SubjectGroup: React.FC<SubjectGroupProps> = ({
  student,
  subject,
}) => {
  const config = useSelector((state: RootState) => state.config);
  const subjectObject = student.subjects[subject.id];
  const [error, setError] = useState("");
  return (
    <Formik
      initialValues={{
        academic_year: config.academicYear,
        term: config.academicTerm,
        student_id: student.student_id,
        subject_id: subject.id,
        score_work: subjectObject.score_work,
        score_test: subjectObject.score_test,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = (await axios.post(
            `/api/students/edit/academic/transcript`,
            values
          )) as AxiosResponse<any[]>;
        } catch (err: any) {
          setError(err.response.data.message);
        }
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <>
          <td className={"text-center"}>
            <BtForm.Control
              size="sm"
              name="score_work"
              onChange={handleChange}
              defaultValue={subjectObject.score_work}
            />
          </td>
          <td className={"text-center"}>
            <BtForm.Control
              size="sm"
              name="score_test"
              onChange={handleChange}
              defaultValue={subjectObject.score_test}
              onKeyPress={(e) => {
                if (e.code === "Enter" || e.code === "NumpadEnter") {
                  handleSubmit();
                }
              }}
            />
          </td>
          <td className={"text-center"}>
            <p>{subjectObject.score}</p>
          </td>
        </>
      )}
    </Formik>
  );
};
