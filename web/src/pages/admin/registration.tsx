import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Button, Card, SSRProvider, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Layout } from "../../components/Layout";
import { setRegistration } from "../../features/adminSlice";
import { setGlobalError } from "../../features/globalSlice";
import { APITemplateResponse } from "../../types";
import myAxios from "../../utils/axios";
import { fetchMe, userLogout } from "../../features/userSlice";

interface registrationProps {}

const registration: React.FC<registrationProps> = ({}) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const admin = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch();

  const checkCanFectchRegsiter = () => {
    return admin.registration.length === 0;
  };

  const fetchRegistrations = async () => {
    try {
      const response = (await myAxios.get("/api/admin/registration", {
        headers: {
          token: user.user!.token,
        },
      })) as AxiosResponse<APITemplateResponse>;

      const data = response.data.data as any[];
      if (response.status === 200) {
        dispatch(setRegistration({ registration: data }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const verifyAccount = async (username: string) => {
    try {
      (await myAxios.post(
        "/api/admin/account/verify",
        {
          username,
        },
        {
          headers: {
            token: user.user!.token,
          },
        }
      )) as AxiosResponse<APITemplateResponse>;
      fetchRegistrations();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAccount = async (username: string) => {
    try {
      (await myAxios.post(
        "/api/admin/account/delete",
        {
          username,
        },
        {
          headers: {
            token: user.user!.token,
          },
        }
      )) as AxiosResponse<APITemplateResponse>;
      fetchRegistrations();
    } catch (err) {
      console.error(err);
    }
  };

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

    try {
      if (isOk) {
        if (checkCanFectchRegsiter()) {
          fetchRegistrations();
        }
      }
    } catch (e) {
      console.error("Cannot fetch registration");
    }
  }, []);

  return (
    <SSRProvider>
      <Layout>
        <Card style={{ marginTop: 20 }}>
          <Card.Header>ข้อมูลลงทะเบียน</Card.Header>
          <Card.Body>
            <Table responsive striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Mobile Number</th>
                  <th>Tel Number</th>
                  <th>Email</th>
                  <th>Verify</th>
                  <th>Operation</th>
                </tr>
              </thead>

              {admin.registration.length > 0 ? (
                <>
                  <tbody>
                    {admin.registration.map((account) => (
                      <tr key={account.username}>
                        <td>{account.username}</td>
                        <td>{account.firstname}</td>
                        <td>{account.lastname}</td>
                        <td>{account.mobile_no}</td>
                        <td>{account.tel_no}</td>
                        <td>{account.email}</td>
                        <td>
                          {account.is_verified === 1 ? (
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-success"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faTimes}
                              className="text-danger"
                            />
                          )}
                        </td>
                        <td>
                          {account.is_verified !== 1 ? (
                            <Button
                              onClick={async () =>
                                await verifyAccount(account.username)
                              }
                              style={{ marginRight: 5 }}
                              variant="success"
                              size="sm"
                            >
                              Verify
                            </Button>
                          ) : null}
                          <Button
                            style={{ marginRight: 5 }}
                            variant="warning"
                            size="sm"
                          >
                            Edit
                          </Button>
                          <Button
                            style={{ marginRight: 5 }}
                            variant="danger"
                            size="sm"
                            onClick={async () =>
                              await deleteAccount(account.username)
                            }
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : (
                <>
                  <tbody>
                    <tr>
                      <td colSpan={8} className="text-center">
                        No Data
                      </td>
                    </tr>
                  </tbody>
                </>
              )}
            </Table>
          </Card.Body>
        </Card>
      </Layout>
    </SSRProvider>
  );
};

export default registration;
