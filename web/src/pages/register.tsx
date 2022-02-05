import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Form as BtForm,
  Row,
  SSRProvider,
} from "react-bootstrap";
import { Layout } from "../components/Layout";
import { Form, Formik } from "formik";
import axios from "../utils/axios";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";

interface registerProps {}

interface APIResponse {
  code: number;
  data: any[] | null;
  message: string;
}

const register: React.FC<registerProps> = ({}) => {
  const [error, setError] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const next = router.query["next"] as string;
  const redirect = next ? next : "/main";

  useEffect(() => {
    if (user.isLoggedIn) {
      router.push(redirect);
    }
  }, [user]);

  return (
    <SSRProvider>
      <Layout>
        <Row className="justify-content-md-center">
          <Col>
            <Card style={{ marginTop: 20 }}>
              <Card.Header>ลงทะเบียนผู้ใช้งานใหม่</Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    username: "",
                    firstName: "",
                    lastName: "",
                    mobileNo: "",
                    telNo: "",
                    email: "",
                    teamCode: 1,
                    areaCode: 1,
                    schoolCode: 1,
                    password: "",
                    passwordAgain: "",
                  }}
                  validate={(values) => {}}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      const response = (await axios.post(
                        "/api/auth/register",
                        values
                      )) as AxiosResponse<APIResponse>;
                      if (response.data.code === 1101) {
                        alert(response.data.message);
                      } else {
                        setError(response.data.message);
                      }
                    } catch (err: any) {
                      setError(err.response.data.message);
                    }
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <Form>
                      {error ? <Alert variant="danger">{error}</Alert> : null}
                      <Row style={{ marginTop: 10 }}>
                        <Col sm="12" md="8" lg="6">
                          <BtForm.Group>
                            <BtForm.Label>
                              ชื่อผู้ใช้งาน (Username){" "}
                              <small className="text-danger">*</small>
                            </BtForm.Label>
                            <BtForm.Control
                              type="text"
                              name="username"
                              id="username"
                              size="sm"
                              onChange={handleChange}
                              value={values.username}
                            />
                            <BtForm.Text className="text-muted">
                              อีเมลหรือหมายเลขโทรศัพท์
                            </BtForm.Text>
                          </BtForm.Group>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: 10 }}>
                        <Col sm="12" md="8" lg="6">
                          <BtForm.Group>
                            <BtForm.Label>
                              ชื่อ <small className="text-danger">*</small>
                            </BtForm.Label>
                            <BtForm.Control
                              type="text"
                              name="firstName"
                              id="firstName"
                              size="sm"
                              onChange={handleChange}
                              value={values.firstName}
                            />
                          </BtForm.Group>
                        </Col>
                        <Col sm="12" md="8" lg="6">
                          <BtForm.Group>
                            <BtForm.Label>
                              นามสกุล <small className="text-danger">*</small>
                            </BtForm.Label>
                            <BtForm.Control
                              type="text"
                              name="lastName"
                              id="lastName"
                              size="sm"
                              onChange={handleChange}
                              value={values.lastName}
                            />
                          </BtForm.Group>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: 10 }}>
                        <Col sm="12" md="8" lg="6">
                          <BtForm.Group>
                            <BtForm.Label>
                              โทรศัพท์มือถือ{" "}
                              <small className="text-danger">*</small>
                            </BtForm.Label>
                            <BtForm.Control
                              type="text"
                              name="mobileNo"
                              id="mobileNo"
                              size="sm"
                              onChange={handleChange}
                              value={values.mobileNo}
                            />
                          </BtForm.Group>
                        </Col>
                        <Col sm="12" md="8" lg="6">
                          <BtForm.Group>
                            <BtForm.Label>
                              โทรศัพท์ที่ทำงาน{" "}
                              <small className="text-danger">*</small>
                            </BtForm.Label>
                            <BtForm.Control
                              type="text"
                              name="telNo"
                              id="telNo"
                              size="sm"
                              onChange={handleChange}
                              value={values.telNo}
                            />
                          </BtForm.Group>
                        </Col>
                        <Col sm="12" md="8" lg="6">
                          <BtForm.Group>
                            <BtForm.Label>
                              Email <small className="text-danger">*</small>
                            </BtForm.Label>
                            <BtForm.Control
                              type="text"
                              name="email"
                              id="email"
                              size="sm"
                              onChange={handleChange}
                              value={values.email}
                            />
                          </BtForm.Group>
                        </Col>
                      </Row>
                      {/* <Row style={{ marginTop: 10 }}>
                        <Col sm="12" md="8" lg="6">
                          <BtForm.Group>
                            <BtForm.Label>
                              กลุ่มผู้ใช้งาน{" "}
                              <small className="text-danger">*</small>
                            </BtForm.Label>
                            <BtForm.Select
                              name="teamCode"
                              id="teamCode"
                              size="sm"
                              value={values.teamCode}
                              aria-label="Default select example"
                              onChange={handleChange}
                            >
                              <option value="1">A</option>
                            </BtForm.Select>
                          </BtForm.Group>
                        </Col>
                        <Col sm="12" md="8" lg="6">
                          <BtForm.Group>
                            <BtForm.Label>
                              เขตพื้นที่การศึกษา{" "}
                              <small className="text-danger">*</small>
                            </BtForm.Label>
                            <BtForm.Select
                              name="areaCode"
                              id="areaCode"
                              size="sm"
                              value={values.areaCode}
                              aria-label="Default select example"
                              onChange={handleChange}
                            >
                              <option value="1">A</option>
                            </BtForm.Select>
                          </BtForm.Group>
                        </Col>
                        <Col sm="12" md="8" lg="6">
                          <BtForm.Group>
                            <BtForm.Label>
                              โรงเรียน <small className="text-danger">*</small>
                            </BtForm.Label>
                            <BtForm.Select
                              name="schoolCode"
                              id="schoolCode"
                              size="sm"
                              value={values.schoolCode}
                              aria-label="Default select example"
                              onChange={handleChange}
                            >
                              <option value="1">A</option>
                            </BtForm.Select>
                          </BtForm.Group>
                        </Col>
                      </Row> */}
                      <Row style={{ marginTop: 10 }}>
                        <Col sm="12" md="8" lg="6">
                          <BtForm.Group>
                            <BtForm.Label>
                              โรงเรียน <small className="text-danger">*</small>
                            </BtForm.Label>
                            <BtForm.Select
                              name="schoolCode"
                              id="schoolCode"
                              size="sm"
                              value={values.schoolCode}
                              aria-label="Default select example"
                              onChange={handleChange}
                            >
                              <option value="1">A</option>
                            </BtForm.Select>
                          </BtForm.Group>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: 10 }}>
                        <Col sm="12" md="8" lg="6">
                          <BtForm.Group>
                            <BtForm.Label>
                              รหัสผ่าน <small className="text-danger">*</small>
                            </BtForm.Label>
                            <BtForm.Control
                              type="password"
                              name="password"
                              id="password"
                              size="sm"
                              onChange={handleChange}
                              value={values.password}
                            />
                          </BtForm.Group>
                        </Col>
                        <Col sm="12" md="8" lg="6">
                          <BtForm.Group>
                            <BtForm.Label>
                              ยืนยันรหัสผ่าน{" "}
                              <small className="text-danger">*</small>
                            </BtForm.Label>
                            <BtForm.Control
                              type="password"
                              name="passwordAgain"
                              id="passwordAgain"
                              size="sm"
                              onChange={handleChange}
                              value={values.passwordAgain}
                            />
                          </BtForm.Group>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: 10 }}>
                        <Col sm="12" md="8" lg="6">
                          <BtForm.Group>
                            <Button
                              variant="success"
                              size="sm"
                              disabled={isSubmitting}
                              type="submit"
                            >
                              {isSubmitting ? "Loading…" : "ลงทะเบียน"}
                            </Button>
                          </BtForm.Group>
                        </Col>
                      </Row>
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

export default register;
