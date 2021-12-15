import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SSRProvider, Row, Col, Form as BtForm, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { Layout } from "../../../../components/Layout";
import { StudentPortalSidebar } from "../../../../components/StudentPortalSidebar";
import { setGlobalError } from "../../../../features/globalSlice";
import { userLogout, fetchMe } from "../../../../features/userSlice";
import axios from "../../../../utils/axios";

interface registrationProps {}

const registration: React.FC<registrationProps> = ({}) => {
  const router = useRouter();
  const query = router.query;
  const config = useSelector((state: RootState) => state.config);
  const user = useSelector((state: RootState) => state.user);
  const [student, setStudent] = useState(null as null | any);
  const [isEditMode, setIsEditMode] = useState(false);

  const academic_year = query.academic_year as string;
  const student_id = query.id as string;

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
      router.push(`/login?next=${router.route}`);
    }
  }, []);

  useEffect(() => {
    const query = router.query;
    const academic_year = query.academic_year as string;
    const student_id = query.id as string;

    getStudent(academic_year, student_id);
  }, [router]);
  return (
    <SSRProvider>
      <Layout>
        <Row>
          <Col lg={2} md={4} sm={0}>
            <StudentPortalSidebar
              academic_year={academic_year}
              student_id={student_id}
              activeKey="registration"
            />
          </Col>
          {student && Object.keys(student).length > 0 ? (
            <Col id="page-content-wrapper">
              <h1>ทะเบียนนักเรียน</h1>
              <hr />
              <Formik
                initialValues={{
                  academic_year,
                  student_id,
                  current_address: student.current_address,
                  house_address: student.house_address,
                  email: student.email,
                  phoneno: student.phoneno,
                  sleepness_id: student.sleepness_id,
                  disability_id: student.disability_id,
                  disadvantaged_id: student.disadvantaged_id,
                  journey_id: student.journey_id,
                  special_ability: student.special_ability,
                  mom_dad_status_id: student.mom_dad_status_id,
                  no_big_bro: student.no_big_bro,
                  no_little_bro: student.no_little_bro,
                  no_big_sis: student.no_big_sis,
                  no_little_sis: student.no_little_sis,
                  student_rank: student.student_rank,
                  dad_idcard: student.dad_idcard,
                  dad_firstname: student.dad_firstname,
                  dad_lastname: student.dad_lastname,
                  dad_salary: student.dad_salary,
                  dad_phoneno: student.dad_phoneno,
                  mom_idcard: student.mom_idcard,
                  mom_firstname: student.mom_firstname,
                  mom_lastname: student.mom_lastname,
                  mom_salary: student.mom_salary,
                  mom_phoneno: student.mom_phoneno,
                }}
                onSubmit={async (values) => {
                  let response = await axios.post(
                    "/api/students/edit/registration",
                    values,
                    {
                      headers: {
                        token: user.user!.token,
                      },
                    }
                  );
                  getStudent(academic_year, student_id);
                  setIsEditMode(!isEditMode)
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
                    <Row style={{ marginTop: 10 }}>
                      <Col lg={6} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>ที่อยู่ปัจจุบัน</BtForm.Label>
                          <BtForm.Control
                            as="textarea"
                            rows={5}
                            type="text"
                            name="current_address"
                            id="current_address"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.current_address}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>ที่อยู่ตามทะเบียนบ้าน</BtForm.Label>
                          <BtForm.Control
                            as="textarea"
                            rows={5}
                            type="text"
                            name="house_address"
                            id="house_address"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.house_address}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>Email</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="email"
                            id="email"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.email}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>เบอร์โทรศัพท์</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="phoneno"
                            id="phoneno"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.phoneno}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                    </Row>
                    <hr />
                    <Row style={{ marginTop: 10 }}>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>การพักนอน</BtForm.Label>
                          <BtForm.Select
                            aria-label="sleepness"
                            size="sm"
                            defaultValue={student.sleepness_id}
                            disabled={!isEditMode}
                            name="sleepness_id"
                            id="sleepness_id"
                            onChange={handleChange}
                          >
                            {config.dropdown &&
                            config.dropdown.sleepness.length > 0
                              ? config.dropdown.sleepness.map((sleepness) => (
                                  <option
                                    key={sleepness.id}
                                    value={sleepness.id}
                                  >
                                    {sleepness.name}
                                  </option>
                                ))
                              : null}
                          </BtForm.Select>
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>ความพิการ</BtForm.Label>
                          <BtForm.Select
                            aria-label="disability"
                            size="sm"
                            defaultValue={student.disability_id}
                            disabled={!isEditMode}
                            name="disability_id"
                            id="disability_id"
                            onChange={handleChange}
                          >
                            {config.dropdown &&
                            config.dropdown.disability.length > 0
                              ? config.dropdown.disability.map((disability) => (
                                  <option
                                    key={disability.id}
                                    value={disability.id}
                                  >
                                    {disability.name}
                                  </option>
                                ))
                              : null}
                          </BtForm.Select>
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>ความด้อยโอกาส/ขาดแคลน</BtForm.Label>
                          <BtForm.Select
                            aria-label="disadvantaged"
                            size="sm"
                            defaultValue={student.disadvantaged_id}
                            disabled={!isEditMode}
                            name="disadvantaged_id"
                            id="disadvantaged_id"
                            onChange={handleChange}
                          >
                            {config.dropdown &&
                            config.dropdown.disadvantaged.length > 0
                              ? config.dropdown.disadvantaged.map(
                                  (disadvantaged) => (
                                    <option
                                      key={disadvantaged.id}
                                      value={disadvantaged.id}
                                    >
                                      {disadvantaged.name}
                                    </option>
                                  )
                                )
                              : null}
                          </BtForm.Select>
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>การเดินทางมาโรงเรียน</BtForm.Label>
                          <BtForm.Select
                            aria-label="journey"
                            size="sm"
                            defaultValue={student.journey_id}
                            disabled={!isEditMode}
                            name="journey_id"
                            id="journey_id"
                            onChange={handleChange}
                          >
                            {config.dropdown &&
                            config.dropdown.journey.length > 0
                              ? config.dropdown.journey.map((journey) => (
                                  <option key={journey.id} value={journey.id}>
                                    {journey.name}
                                  </option>
                                ))
                              : null}
                          </BtForm.Select>
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>ความสามารถพิเศษ</BtForm.Label>
                          <BtForm.Control
                            as="textarea"
                            rows={3}
                            type="text"
                            name="special_ability"
                            id="special_ability"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.special_ability}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                    </Row>
                    <hr />
                    <h5>สถานภาพสมรสของบิดามารดา</h5>
                    <Row style={{ marginTop: 10 }}>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>สถานภาพสมรส</BtForm.Label>
                          <BtForm.Select
                            aria-label="momDadStatus"
                            size="sm"
                            defaultValue={student.mom_dad_status_id}
                            disabled={!isEditMode}
                            name="mom_dad_status_id"
                            id="mom_dad_status_id"
                            onChange={handleChange}
                          >
                            {config.dropdown &&
                            config.dropdown.momDadStatus.length > 0
                              ? config.dropdown.momDadStatus.map(
                                  (momDadStatus) => (
                                    <option
                                      key={momDadStatus.id}
                                      value={momDadStatus.id}
                                    >
                                      {momDadStatus.name}
                                    </option>
                                  )
                                )
                              : null}
                          </BtForm.Select>
                        </BtForm.Group>
                      </Col>
                    </Row>
                    <hr />
                    <h5>ข้อมูลพี่น้อง</h5>
                    <Row style={{ marginTop: 10 }}>
                      <Col lg={2} md={4} sm={6}>
                        <BtForm.Group>
                          <BtForm.Label>จำนวนพี่ชาย</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="no_big_bro"
                            id="no_big_bro"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.no_big_bro}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={2} md={4} sm={6}>
                        <BtForm.Group>
                          <BtForm.Label>จำนวนน้องชาย</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="no_little_bro"
                            id="no_little_bro"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.no_little_bro}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={2} md={4} sm={6}>
                        <BtForm.Group>
                          <BtForm.Label>จำนวนพี่สาว</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="no_big_sis"
                            id="no_big_sis"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.no_big_sis}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={2} md={4} sm={6}>
                        <BtForm.Group>
                          <BtForm.Label>จำนวนน้องสาว</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="no_little_sis"
                            id="no_little_sis"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.no_little_sis}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={2} md={4} sm={6}>
                        <BtForm.Group>
                          <BtForm.Label>เป็นบุตรคนที่</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="student_rank"
                            id="student_rank"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.student_rank}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                    </Row>
                    <hr />
                    <h5>ข้อมูลบิดา</h5>
                    <Row style={{ marginTop: 10 }}>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>
                            เลขประจำตัวประชาชนบิดา (ถ้าไม่มีใส่ -)
                          </BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="dad_idcard"
                            id="dad_idcard"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.dad_idcard}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>ชื่อบิดา</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="dad_firstname"
                            id="dad_firstname"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.dad_firstname}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>นามสกุลบิดา</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="dad_lastname"
                            id="dad_lastname"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.dad_lastname}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>เบอร์โทรศัพท์บิดา</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="dad_phoneno"
                            id="dad_phoneno"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.dad_phoneno}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>

                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>
                            รายได้ต่อเดือน(บาท)
                            (ผู้ปกครองของเด็กด้อยโอกาสต้องใส่รายได้มากกว่า 0)
                          </BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="dad_salary"
                            id="dad_salary"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.dad_salary}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                    </Row>
                    <hr />
                    <h5>ข้อมูลมารดา</h5>
                    <Row style={{ marginTop: 10 }}>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>
                            เลขประจำตัวประชาชนมารดา (ถ้าไม่มีใส่ -)
                          </BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="mom_idcard"
                            id="mom_idcard"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.mom_idcard}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>ชื่อมารดา</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="mom_firstname"
                            id="mom_firstname"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.mom_firstname}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>นามสกุลมารดา</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="mom_lastname"
                            id="mom_lastname"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.mom_lastname}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>เบอร์โทรศัพท์มารดา</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="mom_phoneno"
                            id="mom_phoneno"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.mom_phoneno}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>

                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>
                            รายได้ต่อเดือน(บาท)
                            (ผู้ปกครองของเด็กด้อยโอกาสต้องใส่รายได้มากกว่า 0)
                          </BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="mom_salary"
                            id="mom_salary"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.mom_salary}
                            onChange={handleChange}
                          />
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
