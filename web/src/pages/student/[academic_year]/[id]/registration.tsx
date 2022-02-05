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
  const config = useSelector((state: RootState) => state.config);
  const user = useSelector((state: RootState) => state.user);
  const [student, setStudent] = useState(null as null | any);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [houseAddressDistricts, setHouseAddressDistricts] = useState([]);
  const [houseAddressSubDistricts, setHouseAddressSubDistricts] = useState([]);

  const [currentAddressDistricts, setCurrentAddressDistricts] = useState([]);
  const [currentAddressSubDistricts, setCurrentAddressSubDistricts] = useState(
    []
  );

  const [selectedHouseAddressDistrict, setSelectedHouseAddressDistrict] =
    useState("");
  const [selectedHouseAddressSubDistrict, setSelectedHouseAddressSubDistrict] =
    useState("");

  const [selectedCurrentAddressDistrict, setSelectedCurrentAddressDistrict] =
    useState("");
  const [
    selectedCurrentAddressSubDistrict,
    setSelectedCurrentAddressSubDistrict,
  ] = useState("");

  const academic_year = query.academic_year as string;
  const student_id = query.id as string;

  const getDistrict = async (pcode: string | number) => {
    const response = await axios.get("/api/app/district", {
      params: { pcode: pcode },
    });
    const data = response.data as any;
    return data;
  };

  const getSubDistrict = async (
    pcode: string | number,
    acode: string | number
  ) => {
    const response = await axios.get("/api/app/sub_district", {
      params: { pcode: pcode, acode: acode },
    });
    const data = response.data as any;
    return data;
  };

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
        <Row style={{ marginBottom: 20, marginTop: 10 }}>
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

                  house_address_no: student.house_address_no,
                  house_address_moo: student.house_address_moo,
                  house_address_road: student.house_address_road,
                  house_address_province: student.house_address_province_id,
                  house_address_district: student.house_address_district_id,
                  house_address_sub_district:
                    student.house_address_sub_district_id,
                  house_address_postcode: student.house_address_postcode,

                  current_address_no: student.current_address_no,
                  current_address_moo: student.current_address_moo,
                  current_address_road: student.current_address_road,
                  current_address_province: student.current_address_province_id,
                  current_address_district: student.current_address_district_id,
                  current_address_sub_district:
                    student.current_address_sub_district_id,
                  current_address_postcode: student.current_address_postcode,

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

                  dad_card_type: student.dad_card_type_id,
                  dad_name_title: student.dad_name_title_id,

                  dad_firstname: student.dad_firstname,
                  dad_lastname: student.dad_lastname,
                  dad_salary: student.dad_salary,
                  dad_phoneno: student.dad_phoneno,
                  mom_idcard: student.mom_idcard,

                  mom_card_type: student.mom_card_type_id,
                  mom_name_title: student.mom_name_title_id,

                  mom_firstname: student.mom_firstname,
                  mom_lastname: student.mom_lastname,
                  mom_salary: student.mom_salary,
                  mom_phoneno: student.mom_phoneno,
                }}
                onSubmit={async (values) => {
                  console.log(values);
                  // try {
                  //   let response = (await axios.post(
                  //     "/api/students/edit/registration",
                  //     values,
                  //     {
                  //       headers: {
                  //         token: user.user!.token,
                  //       },
                  //     }
                  //   )) as AxiosResponse<{
                  //     code: number;
                  //     message: string;
                  //     data: any;
                  //   }>;
                  //   if (response.status !== 200) {
                  //     setError("Server error");
                  //   } else if (response.data.code !== 1101) {
                  //     setError(response.data.message);
                  //   } else {
                  //     setSuccess(response.data.message);
                  //   }
                  // } catch (error: any) {
                  //   setError(error.message);
                  // }

                  // getStudent(academic_year, student_id);
                  // setIsEditMode(!isEditMode);
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
                    <h5>ที่อยู่ตามทะเบียนบ้าน</h5>
                    <Row style={{ marginTop: 10 }}>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>บ้านเลขที่</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="house_address_no"
                            id="house_address_no"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.house_address_no}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>หมู่</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="house_address_moo"
                            id="house_address_moo"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.house_address_moo}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>ถนน</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="house_address_road"
                            id="house_address_road"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.house_address_road}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>จังหวัด</BtForm.Label>
                          <BtForm.Select
                            aria-label="province"
                            size="sm"
                            defaultValue={student.house_address_province}
                            disabled={!isEditMode}
                            name="house_address_province"
                            id="house_address_province"
                            onChange={async (e) => {
                              handleChange(e);
                              // @ts-ignore
                              let selectedValue = e.target.value;
                              const district = await getDistrict(selectedValue);
                              setHouseAddressDistricts(district);
                              setSelectedHouseAddressDistrict(selectedValue);
                              if (selectedHouseAddressSubDistrict) {
                                const subDistrict = await getSubDistrict(
                                  selectedValue,
                                  selectedHouseAddressSubDistrict
                                );
                                setHouseAddressSubDistricts(subDistrict);
                              }
                            }}
                          >
                            <option value="-">--- โปรดระบุ ---</option>
                            <BtDropdown
                              config={config}
                              keyProp="provinces"
                              id="id"
                              name="name"
                            />
                          </BtForm.Select>
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group
                          style={{
                            display:
                              houseAddressDistricts.length === 0 ? "none" : "",
                          }}
                        >
                          <BtForm.Label>อำเภอ</BtForm.Label>
                          <BtForm.Select
                            aria-label="district"
                            size="sm"
                            defaultValue={student.house_address_district}
                            disabled={houseAddressDistricts.length === 0}
                            name="house_address_district"
                            id="house_address_district"
                            onChange={async (e) => {
                              handleChange(e);
                              // @ts-ignore
                              let selectedValue = e.target.value;
                              const subDistrict = await getSubDistrict(
                                selectedHouseAddressDistrict,
                                selectedValue
                              );
                              setHouseAddressSubDistricts(subDistrict);
                              setSelectedHouseAddressSubDistrict(selectedValue);
                            }}
                          >
                            <option value="-">--- โปรดระบุ ---</option>
                            {houseAddressDistricts &&
                            houseAddressDistricts.length > 0
                              ? houseAddressDistricts.map(
                                  (district: { id: string; name: string }) => (
                                    <option value={district.id}>
                                      {district.name}
                                    </option>
                                  )
                                )
                              : null}
                          </BtForm.Select>
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group
                          style={{
                            display:
                              houseAddressSubDistricts.length === 0
                                ? "none"
                                : "",
                          }}
                        >
                          <BtForm.Label>ตำบล</BtForm.Label>
                          <BtForm.Select
                            aria-label="sub_district"
                            size="sm"
                            defaultValue={student.house_address_sub_district}
                            disabled={houseAddressSubDistricts.length === 0}
                            name="house_address_sub_district"
                            id="house_address_sub_district"
                            onChange={handleChange}
                          >
                            <option value="-">--- โปรดระบุ ---</option>
                            {houseAddressSubDistricts &&
                            houseAddressSubDistricts.length > 0
                              ? houseAddressSubDistricts.map(
                                  (district: { id: string; name: string }) => (
                                    <option value={district.id}>
                                      {district.name}
                                    </option>
                                  )
                                )
                              : null}
                          </BtForm.Select>
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Label>รหัสไปรษณีย์</BtForm.Label>
                        <BtForm.Control
                          type="text"
                          name="house_address_postcode"
                          id="house_address_postcode"
                          size="sm"
                          disabled={!isEditMode}
                          defaultValue={student.house_address_postcode}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                    <hr />
                    <h5>ที่อยู่ปัจจุบัน</h5>
                    <Row style={{ marginTop: 10 }}>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>บ้านเลขที่</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="current_address_no"
                            id="current_address_no"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.current_address_no}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>หมู่</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="current_address_moo"
                            id="current_address_moo"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.current_address_moo}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>ถนน</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="current_address_road"
                            id="current_address_road"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.current_address_road}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>จังหวัด</BtForm.Label>
                          <BtForm.Select
                            aria-label="province"
                            size="sm"
                            defaultValue={student.current_address_province}
                            disabled={!isEditMode}
                            name="current_address_province"
                            id="current_address_province"
                            onChange={async (e) => {
                              handleChange(e);
                              // @ts-ignore
                              let selectedValue = e.target.value;
                              const district = await getDistrict(selectedValue);
                              setCurrentAddressDistricts(district);
                              setSelectedCurrentAddressDistrict(selectedValue);
                              if (selectedCurrentAddressSubDistrict) {
                                const subDistrict = await getSubDistrict(
                                  selectedValue,
                                  selectedCurrentAddressSubDistrict
                                );
                                setCurrentAddressSubDistricts(subDistrict);
                              }
                            }}
                          >
                            <option value="-">--- โปรดระบุ ---</option>
                            <BtDropdown
                              config={config}
                              keyProp="provinces"
                              id="id"
                              name="name"
                            />
                          </BtForm.Select>
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group
                          style={{
                            display:
                              currentAddressDistricts.length === 0
                                ? "none"
                                : "",
                          }}
                        >
                          <BtForm.Label>อำเภอ</BtForm.Label>
                          <BtForm.Select
                            aria-label="district"
                            size="sm"
                            defaultValue={student.house_address_district}
                            disabled={currentAddressDistricts.length === 0}
                            name="house_address_district"
                            id="house_address_district"
                            onChange={async (e) => {
                              handleChange(e);
                              // @ts-ignore
                              let selectedValue = e.target.value;
                              const district = await getSubDistrict(
                                selectedCurrentAddressDistrict,
                                selectedValue
                              );
                              setCurrentAddressDistricts(district);
                              setSelectedCurrentAddressSubDistrict(
                                selectedValue
                              );
                            }}
                          >
                            <option value="-">--- โปรดระบุ ---</option>
                            {currentAddressDistricts &&
                            currentAddressDistricts.length > 0
                              ? currentAddressDistricts.map(
                                  (district: { id: string; name: string }) => (
                                    <option value={district.id}>
                                      {district.name}
                                    </option>
                                  )
                                )
                              : null}
                          </BtForm.Select>
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group
                          style={{
                            display:
                              currentAddressSubDistricts.length === 0
                                ? "none"
                                : "",
                          }}
                        >
                          <BtForm.Label>ตำบล</BtForm.Label>
                          <BtForm.Select
                            aria-label="sub_district"
                            size="sm"
                            defaultValue={student.house_address_sub_district}
                            disabled={currentAddressSubDistricts.length === 0}
                            name="house_address_sub_district"
                            id="house_address_sub_district"
                            onChange={handleChange}
                          >
                            <option value="-">--- โปรดระบุ ---</option>
                            {currentAddressSubDistricts &&
                            currentAddressSubDistricts.length > 0
                              ? currentAddressSubDistricts.map(
                                  (district: { id: string; name: string }) => (
                                    <option value={district.id}>
                                      {district.name}
                                    </option>
                                  )
                                )
                              : null}
                          </BtForm.Select>
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Label>รหัสไปรษณีย์</BtForm.Label>
                        <BtForm.Control
                          type="text"
                          name="current_address_postcode"
                          id="current_address_postcode"
                          size="sm"
                          disabled={!isEditMode}
                          defaultValue={student.current_address_postcode}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                    <hr />
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
                            <BtDropdown
                              config={config}
                              keyProp="sleepness"
                              id="id"
                              name="name"
                            />
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
                            <BtDropdown
                              config={config}
                              keyProp="disability"
                              id="id"
                              name="name"
                            />
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
                            <BtDropdown
                              config={config}
                              keyProp="disadvantaged"
                              id="id"
                              name="name"
                            />
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
                            <BtDropdown
                              config={config}
                              keyProp="journey"
                              id="id"
                              name="name"
                            />
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
                            <BtDropdown
                              config={config}
                              keyProp="momDadStatus"
                              id="id"
                              name="name"
                            />
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
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>ชนิดบัตร</BtForm.Label>
                          <BtForm.Select
                            aria-label="dad_card_type"
                            size="sm"
                            defaultValue={student.dad_card_type}
                            disabled={!isEditMode}
                            name="dad_card_type"
                            id="dad_card_type"
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
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>คำนำหน้าชื่อ</BtForm.Label>
                          <BtForm.Select
                            aria-label="dad_name_title"
                            size="sm"
                            defaultValue={student.dad_name_title}
                            disabled={!isEditMode}
                            name="dad_name_title"
                            id="dad_name_title"
                            onChange={handleChange}
                          >
                            <BtDropdown
                              config={config}
                              keyProp="parentNameTitle"
                              id="id"
                              name="name"
                            />
                          </BtForm.Select>
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>อาชีพ</BtForm.Label>
                          <BtForm.Select
                            aria-label="dad_job"
                            size="sm"
                            defaultValue={student.dad_job}
                            disabled={!isEditMode}
                            name="dad_job"
                            id="dad_job"
                            onChange={handleChange}
                          >
                            <BtDropdown
                              config={config}
                              keyProp="jobs"
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
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>ชนิดบัตร</BtForm.Label>
                          <BtForm.Select
                            aria-label="mom_card_type"
                            size="sm"
                            defaultValue={student.mom_card_type}
                            disabled={!isEditMode}
                            name="mom_card_type"
                            id="mom_card_type"
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
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>คำนำหน้าชื่อ</BtForm.Label>
                          <BtForm.Select
                            aria-label="mom_name_title"
                            size="sm"
                            defaultValue={student.mom_name_title}
                            disabled={!isEditMode}
                            name="mom_name_title"
                            id="mom_name_title"
                            onChange={handleChange}
                          >
                            <BtDropdown
                              config={config}
                              keyProp="parentNameTitle"
                              id="id"
                              name="name"
                            />
                          </BtForm.Select>
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>อาชีพ</BtForm.Label>
                          <BtForm.Select
                            aria-label="mom_job"
                            size="sm"
                            defaultValue={student.mom_job}
                            disabled={!isEditMode}
                            name="mom_job"
                            id="mom_job"
                            onChange={handleChange}
                          >
                            <BtDropdown
                              config={config}
                              keyProp="jobs"
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
                    <h5>ข้อมูลผู้ปกครอง</h5>
                    <Row style={{ marginTop: 10 }}>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>
                            เลขประจำตัวประชาชนผู้ปกครอง (ถ้าไม่มีใส่ -)
                          </BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="guardian_idcard"
                            id="guardian_idcard"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.guardian_idcard}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>ชนิดบัตร</BtForm.Label>
                          <BtForm.Select
                            aria-label="guardian_card_type"
                            size="sm"
                            defaultValue={student.guardian_card_type}
                            disabled={!isEditMode}
                            name="guardian_card_type"
                            id="guardian_card_type"
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
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>คำนำหน้าชื่อ</BtForm.Label>
                          <BtForm.Select
                            aria-label="guardian_name_title"
                            size="sm"
                            defaultValue={student.guardian_name_title}
                            disabled={!isEditMode}
                            name="guardian_name_title"
                            id="guardian_name_title"
                            onChange={handleChange}
                          >
                            <BtDropdown
                              config={config}
                              keyProp="parentNameTitle"
                              id="id"
                              name="name"
                            />
                          </BtForm.Select>
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>อาชีพ</BtForm.Label>
                          <BtForm.Select
                            aria-label="guardian_job"
                            size="sm"
                            defaultValue={student.guardian_job}
                            disabled={!isEditMode}
                            name="guardian_job"
                            id="guardian_job"
                            onChange={handleChange}
                          >
                            <BtDropdown
                              config={config}
                              keyProp="jobs"
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
                          <BtForm.Label>ชื่อผู้ปกครอง</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="guardian_firstname"
                            id="guardian_firstname"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.guardian_firstname}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>นามสกุลผู้ปกครอง</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="guardian_lastname"
                            id="guardian_lastname"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.guardian_lastname}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>เบอร์โทรศัพท์ผู้ปกครอง</BtForm.Label>
                          <BtForm.Control
                            type="text"
                            name="guardian_phoneno"
                            id="guardian_phoneno"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.guardian_phoneno}
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
                            name="guardian_salary"
                            id="guardian_salary"
                            size="sm"
                            disabled={!isEditMode}
                            defaultValue={student.guardian_salary}
                            onChange={handleChange}
                          />
                        </BtForm.Group>
                      </Col>
                      <Col lg={4} md={6} sm={12}>
                        <BtForm.Group>
                          <BtForm.Label>
                            ความเกี่ยวของผู้ปกครองกับนักเรียน
                          </BtForm.Label>
                          <BtForm.Select
                            aria-label="guardian_type"
                            size="sm"
                            defaultValue={student.guardian_type}
                            disabled={!isEditMode}
                            name="guardian_type"
                            id="guardian_type"
                            onChange={handleChange}
                          >
                            <option value="">-</option>
                            <BtDropdown
                              config={config}
                              keyProp="guardian"
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
