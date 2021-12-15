import React from "react";
import { Nav } from "react-bootstrap";
import NextLink from "next/link";

interface StudentPortalSidebarProps {
  academic_year: string;
  student_id: string;
  activeKey: string;
}

export const StudentPortalSidebar: React.FC<StudentPortalSidebarProps> = ({
  academic_year,
  student_id,
  activeKey
}) => {
  return (
    


    <div
      style={{
        marginTop: "20px",
      }}
    >
      <Nav defaultActiveKey={activeKey} className="flex-column" variant="pills">
        <NextLink href={`/student/${academic_year}/${student_id}/info`}>
          <Nav.Link
            eventKey="info"
            href={`/student/${academic_year}/${student_id}/info`}
          >
            ข้อมูลนักเรียน
          </Nav.Link>
        </NextLink>
        <NextLink href={`/student/${academic_year}/${student_id}/registration`}>
          <Nav.Link
            eventKey="registration"
            href={`/student/${academic_year}/${student_id}/registration`}
          >
            ด้านทะเบียน
          </Nav.Link>
        </NextLink>
        {/* <NextLink href={`/student/${academic_year}/${student_id}/academic`}>
          <Nav.Link href={`/student/${academic_year}/${student_id}/academic`}>
            ด้านวิชาการ
          </Nav.Link>
        </NextLink>
        <NextLink href={`/student/${academic_year}/${student_id}/behavior`}>
          <Nav.Link href={`/student/${academic_year}/${student_id}/behavior`}>
            ด้านพฤติกรรม
          </Nav.Link>
        </NextLink>
        <NextLink href={`/student/${academic_year}/${student_id}/health`}>
          <Nav.Link href={`/student/${academic_year}/${student_id}/health`}>
            ด้านสุขภาพ
          </Nav.Link>
        </NextLink> */}
      </Nav>
    </div>
  );
};
