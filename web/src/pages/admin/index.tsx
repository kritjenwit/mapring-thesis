import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SSRProvider, Form as BtForm, Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Layout } from "../../components/Layout";
import axios from "../../utils/axios";
import { isServer } from "../../utils/isServer";
import NextLink from "next/link";
import { setGlobalError } from "../../features/globalSlice";
import { userLogout, fetchMe } from "../../features/userSlice";

interface indexProps {}

interface APIResponse {
  code: number;
  data: any[] | null;
  message: string;
}

const index: React.FC<indexProps> = ({}) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [students, setStudents] = useState([] as any[]);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  if (!isServer() && !user.isLoggedIn) {
    router.push(`/login?next=${router.route}`);
  }

  if (!isServer() && user.user?.role !== 1) {
    router.push(`/main`);
  }

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
    <>
      <SSRProvider>
        <Layout>
          <h1>ค้นหานักเรียน</h1>
          <Formik
            initialValues={{
              keyword: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = (await axios.post(
                  "/api/search",
                  values
                )) as AxiosResponse<APIResponse>;
                if (response.data.code === 1101) {
                  setStudents(response.data.data as any[]);
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
                <BtForm.Group>
                  <BtForm.Label>Search</BtForm.Label>
                  <BtForm.Control
                    type="text"
                    name="keyword"
                    onChange={handleChange}
                    defaultValue={values.keyword}
                  />
                </BtForm.Group>
              </Form>
            )}
          </Formik>

          {students.length > 0 ? (
            <Card style={{ marginTop: 20 }}>
              <Card.Header>ข้อมูลนักเรียน</Card.Header>
              <Card.Body>
                <Table responsive striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th className={"text-center"}>เลขที่</th>
                      <th className={"text-center"}>รหัสนักเรียน</th>
                      <th className={"text-center"}>ชื่อ-สกุล</th>
                      <th className={"text-center"}>ห้องเรียน</th>
                      <th className={"text-center"}>Process</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students && students.length > 0 ? (
                      students.map((student: any) => (
                        <tr key={student.student_id}>
                          <td className={"text-center"}>
                            {student.student_no}
                          </td>
                          <td className={"text-center"}>
                            {student.student_id}
                          </td>
                          <td className={"text-center"}>
                            {student.thai_fullname}
                          </td>
                          <td className={"text-center"}>
                            {student.class_type_name} {student.year}/
                            {student.room}
                          </td>
                          <td className={"text-center"}>
                            <NextLink
                              href={`/student/${student.academic_year}/${student.student_id}/info`}
                            >
                              <a
                                href={`/student/${student.academic_year}/${student.student_id}/info`}
                                className="btn btn-primary"
                              >
                                ดูข้อมูล
                              </a>
                            </NextLink>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="text-center" colSpan={4}>
                          No Data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          ) : null}
        </Layout>
      </SSRProvider>
    </>
  );
};

export default index;
