import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import axios from "../utils/axios";
import { Form as BtForm } from "react-bootstrap";

interface EvaluateInputGroupProps {
  student: any;
}

export const EvaluateInputGroup: React.FC<EvaluateInputGroupProps> = ({
  student,
}) => {
  const config = useSelector((state: RootState) => state.config);
  const [error, setError] = useState("");
  return (
    <Formik
      initialValues={{
        academic_year: config.academicYear,
        term: config.academicTerm,
        student_id: student.student_id,
        reading: student.reading_score,
        writing: student.writing_score,
        analysing: student.analysing_score,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = (await axios.post(
            `/api/students/edit/academic/evaluate`,
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
              name="reading"
              onChange={handleChange}
              defaultValue={student.reading_score}
            />
          </td>
          <td className={"text-center"}>
            <BtForm.Control
              size="sm"
              name="writing"
              onChange={handleChange}
              defaultValue={student.writing_score}
            />
          </td>
          
          <td className={"text-center"}>
            <BtForm.Control
              size="sm"
              name="analysing"
              onChange={handleChange}
              defaultValue={student.analysing_score}
              onKeyPress={(e) => {
                if (e.code === "Enter" || e.code === "NumpadEnter") {
                  handleSubmit();
                }
              }}
            />
          </td>
          <td className={"text-center"}>
            <p>{student.evaluation_score}</p>
          </td>
          <td className={"text-center"}>
            <p>{student.evaluation_result}</p>
          </td>
        </>
      )}
    </Formik>
  );
};
