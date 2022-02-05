import { AxiosResponse } from "axios";
import { Formik, Form } from "formik";
import router from "next/router";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form as BtForm,
  Row,
  SSRProvider,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { BtDropdown } from "../../../components/BtDropdown";
import { Layout } from "../../../components/Layout";
import { setGlobalError } from "../../../features/globalSlice";
import { userLogout, fetchMe } from "../../../features/userSlice";
import axios from "../../../utils/axios";

interface behaviorProps {}

const behavior: React.FC<behaviorProps> = ({}) => {
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
            <h1>ด้านพฤติกรรม</h1>
            <Card style={{ marginTop: 20 }}>
              <Card.Header>ค้นหานักเรียน</Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    academic_year: config.academicYear,
                    term: config.academicTerm,
                    class_type: 0,
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
                                  <BtDropdown
                                    config={config}
                                    keyProp="classTypeV2"
                                    id="id"
                                    name="name"
                                  />
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
                              <Container>
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
                                        พฤติกรรมที่สังเกตุได้
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
                                          {student.thai_fullname}
                                        </td>

                                        <Formik
                                          initialValues={{
                                            academic_year: config.academicYear,
                                            term: config.academicTerm,
                                            student_id: student.student_id,
                                            behaviour: student.behaviour,
                                          }}
                                          onSubmit={async (values) => {
                                            try {
                                              const response =
                                                (await axios.post(
                                                  `/api/students/edit/behaviour`,
                                                  values
                                                )) as AxiosResponse<any[]>;
                                            } catch (err: any) {
                                              setError(
                                                err.response.data.message
                                              );
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
                                                  name="behaviour"
                                                  onChange={handleChange}
                                                  defaultValue={
                                                    student.behaviour
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
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              </Container>
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

export default behavior;
