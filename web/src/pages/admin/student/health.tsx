import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import router from "next/router";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form as BtForm,
  Row,
  SSRProvider,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Layout } from "../../../components/Layout";
import { setGlobalError } from "../../../features/globalSlice";
import { userLogout, fetchMe } from "../../../features/userSlice";
import axios from "../../../utils/axios";

interface healthProps {}

const health: React.FC<healthProps> = ({}) => {
  const [students, setStudents] = useState([] as any);
  const [error, setError] = useState("");
  const config = useSelector((state: RootState) => state.config);

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const isValidRole = () => {
    if (user.user?.role) {
      return [1].includes(user.user!.role);
    }
    return false;
  };

  useEffect(() => {
    if (!user.isLoggedIn) {
      dispatch(userLogout());
      router.push(`/login?next=${router.route}`);
    }
    if (user.user?.token) {
      dispatch(fetchMe({ token: user.user!.token }));
    }
  }, [user]);

  useEffect(() => {
    let isOk = false;
    if (user.user?.token) {
      isOk = true;
      dispatch(fetchMe({ token: user.user!.token }));
      if (!isValidRole()) {
        dispatch(setGlobalError({ error: "Not Allowed" }));
      }
    } else {
      dispatch(userLogout());
      router.push(`/login?next=${router.route}`);
    }
  }, []);

  return (
    <SSRProvider>
      <Layout isFluid>
        <Row
          className="justify-content-md-center"
          style={{ marginTop: "20px" }}
        >
          <Col lg={12}>
            <h1>ด้านสุขภาพ</h1>
            <Card style={{ marginTop: 20 }}>
              <Card.Header>ค้นหานักเรียน</Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    academic_year: config.academicYear,
                    term: config.academicTerm,
                    class_type: 0,
                    year: 0,
                    room: 0,
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      const response = (await axios.get(`/api/students`, {
                        params: values,
                      })) as AxiosResponse<any[]>;
                      setStudents(response.data);
                    } catch (err: any) {
                      setError(err.response.data.message);
                    }
                  }}
                >
                  {({ values, handleChange, handleSubmit }) => (
                    <Form>
                      <Row>
                        <Col lg={6}>
                          <Row>
                            <Col lg={3} md={12} sm={12}>
                              <BtForm.Group>
                                <BtForm.Label>ชั้น</BtForm.Label>
                                <BtForm.Select
                                  aria-label="Default select example"
                                  name="class_type"
                                  size="sm"
                                  onChange={handleChange}
                                >
                                  <option>-</option>
                                  {config.dropdown &&
                                  config.dropdown.classType.length > 0
                                    ? config.dropdown.classType.map(
                                        (classType) => (
                                          <option value={classType.id}>
                                            {classType.name}
                                          </option>
                                        )
                                      )
                                    : null}
                                </BtForm.Select>
                              </BtForm.Group>
                            </Col>
                            <Col lg={3} md={12} sm={12}>
                              <BtForm.Group>
                                <BtForm.Label>ปี</BtForm.Label>
                                <BtForm.Select
                                  aria-label="Default select example"
                                  name="year"
                                  size="sm"
                                  onChange={handleChange}
                                >
                                  <option>-</option>
                                  {config.dropdown &&
                                  config.dropdown.years.length > 0
                                    ? config.dropdown.years.map((years) => (
                                        <option value={years.year}>
                                          {years.year}
                                        </option>
                                      ))
                                    : null}
                                </BtForm.Select>
                              </BtForm.Group>
                            </Col>
                            <Col lg={3} md={12} sm={12}>
                              <BtForm.Group>
                                <BtForm.Label>ห้อง</BtForm.Label>
                                <BtForm.Control
                                  type="text"
                                  name="room"
                                  id="room"
                                  size="sm"
                                  onChange={handleChange}
                                />
                              </BtForm.Group>
                            </Col>
                          </Row>
                          <Row style={{ marginTop: 10 }}>
                            <Col>
                              <Button variant="success" type="submit">
                                ค้นหา
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      {students && students.length > 0 ? (
                        <>
                          <hr />
                          <Row>
                            <Col lg={12}>
                              <Table responsive bordered striped size="sm">
                                <thead>
                                  <tr>
                                    <th
                                      style={{ width: "10px !important" }}
                                      rowSpan={2}
                                      // @ts-ignore
                                      valign={"middle"}
                                      className={"text-center"}
                                    >
                                      รหัสนักเรียน
                                    </th>
                                    <th
                                      style={{ width: "10px !important" }}
                                      rowSpan={2}
                                      // @ts-ignore
                                      valign={"middle"}
                                      className={"text-center"}
                                    >
                                      ชื่อ
                                    </th>
                                    <th
                                      style={{ width: "10px !important" }}
                                      rowSpan={2}
                                      // @ts-ignore
                                      valign={"middle"}
                                      className={"text-center"}
                                    >
                                      สกุล
                                    </th>
                                    <th
                                      style={{ width: "10px !important" }}
                                      colSpan={2}
                                      // @ts-ignore
                                      valign={"middle"}
                                      className={"text-center"}
                                    >
                                      เทอม 1
                                    </th>
                                    <th
                                      style={{ width: "10px !important" }}
                                      rowSpan={2}
                                      // @ts-ignore
                                      valign={"middle"}
                                      className={"text-center"}
                                    >
                                      น้ำหนักตามเกณฑ์ส่วนสูง
                                    </th>
                                    <th
                                      style={{ width: "10px !important" }}
                                      colSpan={2}
                                      // @ts-ignore
                                      valign={"middle"}
                                      className={"text-center"}
                                    >
                                      เทอม 2
                                    </th>
                                    <th
                                      style={{ width: "10px !important" }}
                                      rowSpan={2}
                                      // @ts-ignore
                                      valign={"middle"}
                                      className={"text-center"}
                                    >
                                      น้ำหนักตามเกณฑ์ส่วนสูง
                                    </th>
                                  </tr>
                                  <tr>
                                    <th
                                      style={{ width: "10px !important" }}
                                      className={"text-center"}
                                    >
                                      น้ำหนัก
                                    </th>
                                    <th
                                      style={{ width: "10px !important" }}
                                      className={"text-center"}
                                    >
                                      ส่วนสูง
                                    </th>
                                    <th
                                      style={{ width: "10px !important" }}
                                      className={"text-center"}
                                    >
                                      น้ำหนัก
                                    </th>
                                    <th
                                      style={{ width: "10px !important" }}
                                      className={"text-center"}
                                    >
                                      ส่วนสูง
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {students.map((student: any) => (
                                    <tr key={student.student_id}>
                                      <td className={"text-center"}>
                                        {student.student_id}
                                      </td>
                                      <td className={"text-center"}>
                                        {student.thai_firstname}
                                      </td>
                                      <td className={"text-center"}>
                                        {student.thai_lastname}
                                      </td>
                                      <Formik
                                        initialValues={{
                                          term: 1,
                                          student_id: student.student_id,
                                          weight: student.weight_term_1
                                            ? student.weight_term_1
                                            : 0,
                                          height: student.height_term_1
                                            ? student.height_term_1
                                            : 0,
                                        }}
                                        onSubmit={async (values) => {
                                          try {
                                            const response = (await axios.post(
                                              `/api/students/health`,
                                              {
                                                values,
                                              }
                                            )) as AxiosResponse<any[]>;
                                          } catch (err: any) {
                                            setError(err.response.data.message);
                                          }
                                        }}
                                      >
                                        {({
                                          values,
                                          handleChange,
                                          handleSubmit,
                                        }) => (
                                          <>
                                            <td className={"text-center"}>
                                              <BtForm.Control
                                                size="sm"
                                                name="weight"
                                                onChange={handleChange}
                                                defaultValue={
                                                  student.weight_term_1
                                                }
                                              />
                                            </td>
                                            <td className={"text-center"}>
                                              <BtForm.Control
                                                size="sm"
                                                name="height"
                                                onChange={handleChange}
                                                defaultValue={
                                                  student.height_term_1
                                                }
                                                onKeyPress={(e) => {
                                                  if (
                                                    e.code === "Enter" ||
                                                    e.code === "NumpadEnter"
                                                  ) {
                                                    handleSubmit();
                                                  }
                                                }}
                                              />
                                            </td>
                                          </>
                                        )}
                                      </Formik>
                                      <td className={"text-center"}>
                                        {student.bmi_name_term_1}
                                      </td>
                                      <Formik
                                        initialValues={{
                                          term: 2,
                                          student_id: student.student_id,
                                          weight: student.weight_term_2
                                            ? student.weight_term_2
                                            : 0,
                                          height: student.height_term_2
                                            ? student.height_term_2
                                            : 0,
                                        }}
                                        onSubmit={async (values) => {
                                          try {
                                            const response = (await axios.post(
                                              `/api/students/health`,
                                              {
                                                values,
                                              }
                                            )) as AxiosResponse<any[]>;
                                            // students.map((s: any) =>
                                            //   s.student_id === values.student_id
                                            //     ? {
                                            //         ...s,
                                            //         bmi_name_term_2:
                                            //           response.data.bmi_message,
                                            //       }
                                            //     : s
                                            // );
                                          } catch (err: any) {
                                            setError(err.response.data.message);
                                          }
                                        }}
                                      >
                                        {({
                                          values,
                                          handleChange,
                                          handleSubmit,
                                        }) => (
                                          <>
                                            <td className={"text-center"}>
                                              <BtForm.Control
                                                size="sm"
                                                name="weight"
                                                onChange={handleChange}
                                                defaultValue={
                                                  student.weight_term_2
                                                }
                                              />
                                            </td>
                                            <td className={"text-center"}>
                                              <BtForm.Control
                                                size="sm"
                                                name="height"
                                                onChange={handleChange}
                                                defaultValue={
                                                  student.height_term_2
                                                }
                                                onKeyPress={(e) => {
                                                  if (
                                                    e.code === "Enter" ||
                                                    e.code === "NumpadEnter"
                                                  ) {
                                                    handleSubmit();
                                                  }
                                                }}
                                              />
                                            </td>
                                          </>
                                        )}
                                      </Formik>
                                      <td className={"text-center"}>
                                        {student.bmi_name_term_2}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </Col>
                          </Row>
                        </>
                      ) : null}
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Layout>
    </SSRProvider>
  );
};

export default health;
