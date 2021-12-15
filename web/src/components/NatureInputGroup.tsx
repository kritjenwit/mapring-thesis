import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import axios from "../utils/axios";
import { Form as BtForm } from "react-bootstrap";
import { BtDropdown } from "./BtDropdown";

interface NatureInputGroupProps {
  student: any;
  manner: any;
}

export const NatureInputGroup: React.FC<NatureInputGroupProps> = ({
  student,
  manner
}) => {
  const config = useSelector((state: RootState) => state.config);
  const [error, setError] = useState("");
  const mannerObject = student.manners[manner.id];
  return (
    <Formik
      initialValues={{
        academic_year: config.academicYear,
        term: config.academicTerm,
        student_id: student.student_id,
        score: student.manner_score,
        manner_id: manner.id,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = (await axios.post(
            `/api/students/edit/academic/nature`,
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
              name="score"
              onChange={handleChange}
              defaultValue={mannerObject.score}
              onKeyPress={(e) => {
                if (e.code === "Enter" || e.code === "NumpadEnter") {
                  handleSubmit();
                }
              }}
            />
          </td>
        </>
      )}
    </Formik>
  );
};
