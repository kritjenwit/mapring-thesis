import { Formik } from "formik";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { SSRProvider, Row, Col, Button, Form as BtForm } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import { BtDropdown } from "../../../components/BtDropdown";
import { Layout } from "../../../components/Layout";
import { setGlobalError } from "../../../features/globalSlice";
import { userLogout, fetchMe } from "../../../features/userSlice";
import axios from "../../../utils/axios";

interface addProps {}

const add: React.FC<addProps> = ({}) => {
  const router = useRouter();
  const query = router.query;
  const [isEditMode, setIsEditMode] = useState(true);

  const config = useSelector((state: RootState) => state.config);
  const user = useSelector((state: RootState) => state.user);

  const academic_year = config.academicYear;
  const term = config.academicTerm;

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
      <Layout>
        <Row style={{ marginTop: 10 }}>
          <Col id="page-content-wrapper">
            <h1>ข้อมูลนักเรียน</h1>
            <hr />
            <Formik
              initialValues={{
                academic_year,
                term,
                year: "",
                room: "",
                class_type_id: 1,
                idcard: "",
                name_title_id: 1,
                gender_id: 0,
                thai_firstname: "",
                thai_lastname: "",
                eng_firstname: "",
                eng_lastname: "",
                dob: "",
                nationality_id: 0,
                race_id: 1,
                religion_id: 1,
              }}
              onSubmit={async (values, { resetForm }) => {
                let response = await axios.post("/api/students/add", values, {
                  headers: {
                    token: user.user!.token,
                  },
                });
                resetForm({});
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <>
                  <Row style={{ marginTop: 10 }}>
                    <Col lg={4} md={6} sm={12}>
                      <BtForm.Group>
                        <BtForm.Label>ปีการศึกษา</BtForm.Label>
                        <BtForm.Control
                          type="text"
                          name="academic_year"
                          id="academic_year"
                          size="sm"
                          disabled
                          defaultValue={academic_year}
                        />
                      </BtForm.Group>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: 10 }}>
                    <Col lg={2} md={3} sm={12}>
                      <BtForm.Group>
                        <BtForm.Label>ชั้น</BtForm.Label>
                        <BtForm.Select
                          aria-label="class_type_id"
                          name="class_type_id"
                          id="class_type_id"
                          size="sm"
                          disabled={!isEditMode}
                          onChange={handleChange}
                        >
                          <BtDropdown
                            config={config}
                            keyProp="classType"
                            id="id"
                            name="name"
                          />
                        </BtForm.Select>
                      </BtForm.Group>
                    </Col>
                    <Col lg={2} md={3} sm={12}>
                      <BtForm.Group>
                        <BtForm.Label>ปี</BtForm.Label>
                        <BtForm.Control
                          type="text"
                          name="year"
                          id="year"
                          size="sm"
                          onChange={handleChange}
                        />
                      </BtForm.Group>
                    </Col>
                    <Col lg={2} md={3} sm={12}>
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
                  <hr />
                  <Row style={{ marginTop: 10 }}>
                    <Col lg={4} md={6} sm={12}>
                      <BtForm.Group>
                        <BtForm.Label>คำนำหน้าชื่อ</BtForm.Label>
                        <BtForm.Select
                          aria-label="name_title_id"
                          name="name_title_id"
                          id="name_title_id"
                          size="sm"
                          disabled={!isEditMode}
                          onChange={handleChange}
                        >
                          <BtDropdown
                            config={config}
                            keyProp="nameTitle"
                            id="id"
                            name="name"
                          />
                        </BtForm.Select>
                      </BtForm.Group>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <BtForm.Group>
                        <BtForm.Label>เพศ</BtForm.Label>
                        <BtForm.Select
                          aria-label="gender"
                          name="gender_id"
                          id="gender_id"
                          size="sm"
                          disabled={!isEditMode}
                          onChange={handleChange}
                        >
                          <BtDropdown
                            config={config}
                            keyProp="gender"
                            id="id"
                            name="name"
                          />
                        </BtForm.Select>
                      </BtForm.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 10 }}>
                    <Col lg={4} md={6} sm={12}>
                      <BtForm.Group>
                        <BtForm.Label>ชื่อ</BtForm.Label>
                        <BtForm.Control
                          type="text"
                          name="thai_firstname"
                          id="thai_firstname"
                          size="sm"
                          disabled={!isEditMode}
                          onChange={handleChange}
                        />
                      </BtForm.Group>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <BtForm.Group>
                        <BtForm.Label>นามสกุล</BtForm.Label>
                        <BtForm.Control
                          type="text"
                          name="thai_lastname"
                          id="thai_lastname"
                          size="sm"
                          disabled={!isEditMode}
                          onChange={handleChange}
                        />
                      </BtForm.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 10 }}>
                    <Col lg={4} md={6} sm={12}>
                      <BtForm.Group>
                        <BtForm.Label>ชื่อ (อังกฤษ)</BtForm.Label>
                        <BtForm.Control
                          type="text"
                          name="eng_firstname"
                          id="eng_firstname"
                          size="sm"
                          disabled={!isEditMode}
                          onChange={handleChange}
                        />
                      </BtForm.Group>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <BtForm.Group>
                        <BtForm.Label>นามสกุล (อังกฤษ)</BtForm.Label>
                        <BtForm.Control
                          type="text"
                          name="eng_lastname"
                          id="eng_lastname"
                          size="sm"
                          disabled={!isEditMode}
                          onChange={handleChange}
                        />
                      </BtForm.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 10 }}>
                    <Col lg={4} md={6} sm={12}>
                      <BtForm.Group>
                        <BtForm.Label>วันเกิด</BtForm.Label>
                        <BtForm.Control
                          type="text"
                          name="dob"
                          id="dob"
                          size="sm"
                          disabled={!isEditMode}
                          onChange={handleChange}
                        />
                      </BtForm.Group>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <BtForm.Group>
                        <BtForm.Label>เลขบัตรประชาชน</BtForm.Label>
                        <BtForm.Control
                          type="text"
                          name="idcard"
                          id="idcard"
                          size="sm"
                          disabled={!isEditMode}
                          onChange={handleChange}
                        />
                      </BtForm.Group>
                    </Col>
                  </Row>
                  <hr />
                  <Row style={{ marginTop: 10 }}>
                    <Col lg={4} md={6} sm={12}>
                      <BtForm.Group>
                        <BtForm.Label>สัญชาติ</BtForm.Label>
                        <BtForm.Select
                          name="nationality_id"
                          id="nationality_id"
                          aria-label="nationality_id"
                          size="sm"
                          disabled={!isEditMode}
                          onChange={handleChange}
                        >
                          <BtDropdown
                            config={config}
                            keyProp="nationality"
                            id="id"
                            name="name"
                          />
                        </BtForm.Select>
                      </BtForm.Group>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <BtForm.Group>
                        <BtForm.Label>เชื้อชาติ</BtForm.Label>
                        <BtForm.Select
                          aria-label="races"
                          name="races"
                          id="races"
                          size="sm"
                          disabled={!isEditMode}
                          onChange={handleChange}
                        >
                          <BtDropdown
                            config={config}
                            keyProp="races"
                            id="id"
                            name="name"
                          />
                        </BtForm.Select>
                      </BtForm.Group>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <BtForm.Group>
                        <BtForm.Label>ศาสนา</BtForm.Label>
                        <BtForm.Select
                          aria-label="religion"
                          name="religion"
                          id="religion"
                          size="sm"
                          disabled={!isEditMode}
                          onChange={handleChange}
                        >
                          <BtDropdown
                            config={config}
                            keyProp="religion"
                            id="id"
                            name="name"
                          />
                        </BtForm.Select>
                      </BtForm.Group>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>
                      <Button
                        size="sm"
                        type="submit"
                        variant="success"
                        onClick={() => {
                          if (confirm("ยืนยันการแก้ไข")) {
                            handleSubmit();
                          }
                        }}
                      >
                        ยืนยัน
                      </Button>{" "}
                      <Button size="sm" type="reset" variant="danger">
                        ยกเลิก
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
            </Formik>
          </Col>
        </Row>
      </Layout>
    </SSRProvider>
  );
};

export default add;
