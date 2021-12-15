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
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { RootState } from "../app/store";
import { userLogin } from "../features/userSlice";
import { isServer } from "../utils/isServer";

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  const [error, setError] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
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
          <Col lg="6" md="6" xs="8">
            <Card style={{ marginTop: 20 }}>
              <Card.Header>เข้าสู่ระบบ</Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    username: "",
                    password: "",
                  }}
                  validate={() => {}}
                  onSubmit={async (values, { setSubmitting }) => {
                    let data = {
                      username: values.username,
                      password: values.password,
                    };

                    try {
                      let resdata = await dispatch(userLogin(data));
                      console.log(resdata);
                      // @ts-ignore
                      if (resdata.error) {
                        // @ts-ignore
                        setError(resdata.payload);
                      } else {
                        router.push(redirect);
                      }
                    } catch (err: any) {
                      setError(err.response.data.message);
                    }
                    setSubmitting(false);
                  }}
                >
                  {({ values, handleChange, isSubmitting }) => (
                    <Form>
                      {error ? <Alert variant="danger">{error}</Alert> : null}
                      <Row style={{ marginTop: 10 }}>
                        <Col>
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
                          </BtForm.Group>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: 10 }}>
                        <Col>
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
                      </Row>
                      <Row style={{ marginTop: 10 }}>
                        <Col>
                          <BtForm.Group>
                            <Button
                              variant="success"
                              size="sm"
                              disabled={isSubmitting}
                              type="submit"
                            >
                              {isSubmitting ? "Loading…" : "เข้าสู่ระบบ"}
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

export default login;
