import { AxiosResponse } from "axios";
import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  SSRProvider,
  Row,
  Col,
  Form as BtForm,
  Button,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { BtDropdown } from "../../../../components/BtDropdown";
import { Layout } from "../../../../components/Layout";
import { StudentPortalSidebar } from "../../../../components/StudentPortalSidebar";
import { setGlobalError } from "../../../../features/globalSlice";
import { userLogout, fetchMe } from "../../../../features/userSlice";
import axios from "../../../../utils/axios";

interface registrationProps {}

const registration: React.FC<registrationProps> = ({}) => {
  const router = useRouter();
  const query = router.query;
  const [student, setStudent] = useState(null as null | any);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const academic_year = query.academic_year as string;
  const student_id = query.id as string;

  const config = useSelector((state: RootState) => state.config);
  const user = useSelector((state: RootState) => state.user);

  const getStudent = async (academic_year: string, student_id: string) => {
    let response = await axios.get(
      `/api/students/${academic_year}/${student_id}`
    );
    let data = response.data;
    setStudent(data);
  };

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
      router.push(`/login?next=/admin/search`);
    }
  }, []);

  useEffect(() => {
    const query = router.query;
    const academic_year = query.academic_year as string;
    const student_id = query.id as string;

    if (academic_year && student_id) {
      getStudent(academic_year, student_id);
    }
  }, [router]);

  return (
    <SSRProvider>
      <Layout>
        <Row style={{ marginTop: 10 }}>
          <Col lg={2} md={4} sm={0}>
            <StudentPortalSidebar
              academic_year={academic_year}
              student_id={student_id}
              activeKey="info"
            />
          </Col>
          {student ? (
            <Col id="page-content-wrapper">
              <h1>ข้อมูลนักเรียน</h1>
              <hr />
              <Formik
                initialValues={{
                  academic_year,
                  student_id,
                  name_title_id: student.name_title_id,
                  gender_id: student.gender_id,
                  thai_firstname: student.thai_firstname,
                  thai_lastname: student.thai_lastname,
                  eng_firstname: student.eng_firstname,
                  eng_lastname: student.eng_lastname,
                  dob: student.dob,
                  nationality_id: student.nationality_id,
                  race_id: student.race_id,
                  religion_id: student.religion_id,
                  bloodType: student.blood_type_id,
                  cardType: student.idcard_type,
                  studentJoinType: student.join_type_id,
                  classTypeV2: student.class_type_id_v2,
                  idcard: student.idcard,
                  room: student.room
                }}
                onSubmit={async (values) => {
                  // console.log(values)
                  try {
                    let response = (await axios.post(
                      "/api/students/edit/info",
                      values,
                      {
                        headers: {
                          token: user.user!.token,
                        },
                      }
                    )) as AxiosResponse<{
                      code: number;
                      message: string;
                      data: any;
                    }>;
                    if (response.status !== 200) {
                      setError("Server error");
                    } else if (response.data.code !== 1101) {
                      setError(response.data.message);
                    } else {
                      setSuccess(response.data.message);
                    }
                  } catch (error: any) {
                    setError(error.message);
                  }

                  getStudent(academic_year, student_id);
                  setIsEditMode(!isEditMode);
                }}
              >
                {({ values, handleChange, handleSubmit }) => (
                  <>
                    {error ? <Alert variant="danger">{error}</Alert> : null}
                    {success ? (
                      <Alert variant="success">{success}</Alert>
                    ) : null}
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
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>รหัสนักเรียน</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="student_id"
                            id="student_id"
                            size="sm"
                            disabled
                            defaultValue={student_id}
                          />
                        </BtForm.Group>
                      </Col>
                    </Row>
                    <hr />
                    <Row style={{ marginTop: 10 }}>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>ชนิดบัตร</BtForm.Label>
                          <BtForm.Select
                            aria-label="classTypeV2"
                            name="classTypeV2"
                            id="classTypeV2"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.class_type_id_v2}
                            onChange={handleChange}
                          >
                            <BtDropdown
                              config={config}
                              keyProp="classTypeV2"
                              id="id"
                              name="name"
                            />
                          </BtForm.Select>
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>ห้อง</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="room"
                            id="room"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.room}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                    </Row>
                    {/* <hr /> */}
                    <Row style={{ marginTop: 10 }}>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>เลขประจำตัวประชาชน</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="idcard"
                            id="idcard"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.idcard}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>ชนิดบัตร</BtForm.Label>
                          <BtForm.Select
                            aria-label="cardType"
                            name="cardType"
                            id="cardType"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.idcard_type}
                            onChange={handleChange}
                          >
                            <BtDropdown
                              config={config}
                              keyProp="cardType"
                              id="id"
                              name="name"
                            />
                          </BtForm.Select>
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>ประเภทนักเรียน</BtForm.Label>
                          <BtForm.Select
                            aria-label="studentJoinType"
                            name="studentJoinType"
                            id="studentJoinType"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.join_type_id}
                            onChange={handleChange}
                          >
                            <BtDropdown
                              config={config}
                              keyProp="studentJoinType"
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
                          <BtForm.Label>คำนำหน้าชื่อ</BtForm.Label>
                          <BtForm.Select
                            aria-label="nameTitle"
                            name="nameTitle"
                            id="nameTitle"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.nameTitle_id}
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
                            defaultValue={student.gender_id}
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
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>กรุ๊บเลือด</BtForm.Label>
                          <BtForm.Select
                            aria-label="bloodType"
                            name="bloodType"
                            id="bloodType"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.blood_type_id}
                            onChange={handleChange}
                          >
                            <BtDropdown
                              config={config}
                              keyProp="bloodType"
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
                            defaultValue={`${student.thai_firstname}`}
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
                            defaultValue={`${student.thai_lastname}`}
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
                            defaultValue={`${student.eng_firstname}`}
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
                            defaultValue={`${student.eng_lastname}`}
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
                            defaultValue={`${student.dob}`}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                    </Row>
                    {/* <hr /> */}
                    <Row style={{ marginTop: 10 }}>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>สัญชาติ</BtForm.Label>
                          <BtForm.Select
                            name="nationality"
                            id="nationality"
                            aria-label="nationality"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.nationality_id}
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
                            defaultValue={student.race_id}
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
                            defaultValue={student.religion_id}
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
                        {isEditMode ? (
                          <>
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
                            <Button
                              size="sm"
                              type="reset"
                              variant="danger"
                              onClick={() => setIsEditMode(!isEditMode)}
                            >
                              ยกเลิก
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            type="button"
                            variant="warning"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsEditMode(!isEditMode);
                            }}
                          >
                            แก้ไข
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </>
                )}
              </Formik>
            </Col>
          ) : null}
        </Row>
      </Layout>
    </SSRProvider>
  );
};

export default registration;
