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
import { RootState } from "../../../../app/store";
import { BtDropdown } from "../../../../components/BtDropdown";
import { Layout } from "../../../../components/Layout";
import { SubjectGroup } from "../../../../components/SubjectGroup";
import { setGlobalError } from "../../../../features/globalSlice";
import { userLogout, fetchMe } from "../../../../features/userSlice";
import axios from "../../../../utils/axios";

interface transcriptProps {}

const TheadSubjectScoreText = ({}) => {
  const style = {
    width: "10px !important",
  };
  const valign = "middle";
  const className = "text-center text-nowrap";

  return (
    <>
      <th
        style={style}
        // @ts-ignore
        valign={valign}
        className={className}
      >
        คะแนนเก็บ
      </th>
      <th
        style={style}
        // @ts-ignore
        valign={valign}
        className={className}
      >
        คะแนนสอบ
      </th>
      <th
        style={style}
        // @ts-ignore
        valign={valign}
        className={className}
      >
        คะแนนรวม
      </th>
    </>
  );
};

const transcript: React.FC<transcriptProps> = ({}) => {
  const [students, setStudents] = useState([] as any);
  const [error, setError] = useState("");
  const config = useSelector((state: RootState) => state.config);

  const style = {
    width: "10px !important",
  };
  const valign = "middle";
  const className = "text-center";

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
            <h1>ด้านวิชาการ (ปพ.6)</h1>
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
                                  <BtDropdown
                                    config={config}
                                    keyProp="classType"
                                    id="id"
                                    name="name"
                                  />
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
                                  <BtDropdown
                                    config={config}
                                    keyProp="years"
                                    id="id"
                                    name="year"
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
                              <Table responsive bordered striped size="sm">
                                <thead>
                                  <tr>
                                    <th
                                      style={style}
                                      // @ts-ignore
                                      valign={valign}
                                      className={className}
                                      rowSpan={2}
                                    >
                                      รหัสนักเรียน
                                    </th>
                                    <th
                                      style={style}
                                      // @ts-ignore
                                      valign={valign}
                                      className={className}
                                      rowSpan={2}
                                    >
                                      ชื่อ
                                    </th>
                                    {config.dropdown.subjects &&
                                    config.dropdown.subjects.length > 0
                                      ? config.dropdown.subjects.map(
                                          (subject) => (
                                            <th
                                              style={{
                                                width: "10px !important",
                                              }}
                                              // @ts-ignore
                                              valign={"middle"}
                                              className={"text-center"}
                                              key={subject.id}
                                              colSpan={3}
                                            >
                                              {subject.name}
                                            </th>
                                          )
                                        )
                                      : null}
                                  </tr>
                                  <tr>
                                    {config.dropdown.subjects &&
                                    config.dropdown.subjects.length > 0
                                      ? config.dropdown.subjects.map(
                                          (subject) => (
                                            <>
                                              <TheadSubjectScoreText />
                                            </>
                                          )
                                        )
                                      : null}
                                  </tr>
                                </thead>
                                <tbody>
                                  {students.map((student: any) => (
                                    <tr key={student.student_id}>
                                      <td className={"text-center"}>
                                        {student.student_id}
                                      </td>
                                      <td className={"text-center text-nowrap"}>
                                        {student.thai_fullname}
                                      </td>
                                      {config.dropdown.subjects &&
                                      config.dropdown.subjects.length > 0
                                        ? config.dropdown.subjects.map(
                                            (subject) => (
                                              <>
                                                <SubjectGroup
                                                  student={student}
                                                  subject={subject}
                                                />
                                              </>
                                            )
                                          )
                                        : null}
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

export default transcript;
