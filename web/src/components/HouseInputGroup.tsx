import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import axios from "../utils/axios";
import { Form as BtForm } from "react-bootstrap";
import { BtDropdown } from "./BtDropdown";

interface HouseInputGroupProps {
  student: any;
}

export const HouseInputGroup: React.FC<HouseInputGroupProps> = ({
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
        place_nearby: student.place_nearby,
        house_type_id: student.house_type_id,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = (await axios.post(
            `/api/students/edit/academic/house`,
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
              as={"textarea"}
              size="sm"
              name="current_address"
              defaultValue={student.current_address}
              disabled
            />
          </td>
          <td className={"text-center"}>
            <BtForm.Group>
              <BtForm.Select
                aria-label="house_type_id"
                name="house_type_id"
                size="sm"
                onChange={handleChange}
                defaultValue={student.house_type_id}
              >
                <BtDropdown
                  config={config}
                  keyProp="houseType"
                  id="id"
                  name="name"
                />
              </BtForm.Select>
            </BtForm.Group>
          </td>

          <td className={"text-center"}>
            <BtForm.Control
              size="sm"
              name="place_nearby"
              onChange={handleChange}
              defaultValue={student.place_nearby}
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
