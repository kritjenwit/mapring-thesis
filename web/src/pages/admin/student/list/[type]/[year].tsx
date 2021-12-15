import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import { Layout } from "../../../../../components/Layout";
import { NavbarState } from "../../../../../features/navbarSlice";
import myAxios from "../../../../../utils/axios";
import { isServer } from "../../../../../utils/isServer";

interface yearProps {}

interface StudentListType {
  type: string;
  year: string;
}

const getAllClassRoom = (classType: number, year: number): any[] => {
  const navbar = useSelector((state: RootState) => state.navbar);
  let room: any[] = [];
  let room2: any[] = [];
  if (navbar.studentClassRoomList && navbar.studentClassRoomList.length > 0) {
    room = navbar.studentClassRoomList.map((cl: any) => {
      if (cl.id === classType) {
        let data = cl.subMenu.map((mn: any) => {
          if (mn.year === year) {
            let rooms: any[] = [];
            mn.rooms.forEach(function (element: any) {
              let el = {
                room: element.room,
                active: false,
              };
              rooms.push(el);
            });
            room2.push(rooms);
          }
        });
        if (data.length > 0) {
          return data;
        }
      }
    });
  }
  return room2.length > 0 ? room2[0] : [];
};

const fetchStudents = async (type: number, year: number, room: number) => {
  // TO-DO
  let data = {
    class_type: type,
    year,
    room,
  };
  const result = await myAxios.get("/api/students", {
    params: data,
  });

  return result.data;
};

const year: React.FC<yearProps> = ({}) => {
  const router = useRouter();
  const type = router.query.type as string;
  const year = router.query.year as string;
  const allClasses = getAllClassRoom(+type, +year);
  const [students, setStudents] = useState([]) as any[];
  const [roomSelected, setRoomSelected] = useState(0);
  const [className, setClassName] = useState("");
  const navbar = useSelector((state: RootState) => state.navbar);

  const handleOnClickRoom = async (
    type: number,
    year: number,
    room: number
  ) => {
    setRoomSelected(room);
    let result = await fetchStudents(type, year, room);
    setStudents(result);
  };

  const fetchClassName = (navbar: NavbarState, classType: number): string => {
    let name = "";
    if (navbar.studentClassRoomList && navbar.studentClassRoomList.length > 0) {
      const room = navbar.studentClassRoomList.filter((cl: any) => {
        return cl.id === classType;
      });
      if (room && room.length > 0) {
        name = room[0].name;
      }
    }

    return name;
  };

  useEffect(() => {
    if (!isServer()) {
      let name = fetchClassName(navbar, +type);
      setClassName(name);
    }
  }, [router]);

  return (
    <Layout>
      <Row className="justify-content-md-center">
        <Col lg="12" md="12" xs="12">
          <Card style={{ marginTop: 20 }}>
            <Card.Header>
              ข้อมูลนักเรียนชั้น {className} ปีที่ {year}
            </Card.Header>
            <Card.Body>
              {allClasses && allClasses.length > 0
                ? allClasses.map((menu: any) => (
                    <Fragment key={menu.room}>
                      <Button
                        onClick={() =>
                          handleOnClickRoom(+type, +year, menu.room)
                        }
                        variant="secondary"
                      >
                        ห้อง {menu.room}
                      </Button>{" "}
                    </Fragment>
                  ))
                : null}
            </Card.Body>
          </Card>

          {roomSelected !== 0 ? (
            <Card style={{ marginTop: "10px" }}>
              <Card.Header>
                รายชื่อนักเรียน {className} ปีที่ {year}/{roomSelected}
              </Card.Header>
              <Card.Body>
                <Table>
                  <thead>
                    <tr>
                      <th>เลขที่</th>
                      <th>รหัสนักเรียน</th>
                      <th>ชื่อ-สกุล</th>
                      <th>Process</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students && students.length > 0 ? (
                      students.map((student: any) => (
                        <tr key={student.student_id}>
                          <td>{student.student_no}</td>
                          <td>{student.student_id}</td>
                          <td>{student.thai_fullname}</td>
                          <td><Button>ดูข้อมูล</Button></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="text-center" colSpan={4}>No Data</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          ) : null}
        </Col>
      </Row>
    </Layout>
  );
};

export default year;
