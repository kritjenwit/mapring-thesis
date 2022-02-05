import React, { useEffect } from "react";
// import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import NextLink from "next/link";
import { APP_NAME } from "../configs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { userLogout, UserState } from "../features/userSlice";
import { DropdownSubMenu } from "./DropdownSubMenu";
import { fetchClassesMenu, NavbarState } from "../features/navbarSlice";

interface NavbarComponentProps {}

const StudentClassRoomListComponent = (studentClassRoomList: any[]) => {
  return studentClassRoomList && studentClassRoomList.length > 0
    ? studentClassRoomList.map((list) => (
        <DropdownSubMenu key={list.id} title={list.name}>
          {list.subMenu && list.subMenu.length > 0
            ? list.subMenu.map((subMenu: any) => (
                <NextLink key={subMenu.year} href={subMenu.path}>
                  <NavDropdown.Item href={subMenu.path}>
                    {subMenu.year}
                  </NavDropdown.Item>
                </NextLink>
              ))
            : null}
        </DropdownSubMenu>
      ))
    : null;
};

const AdminLoginRightMenuComponent = (user: UserState, navbar: NavbarState) => {
  return user.isLoggedIn && [1, 2, 3].includes(user.user!.role) ? (
    <>
      <NavDropdown title="Admin" id="collasible-nav-dropdown">
        <NextLink href="/admin/registration">
          <NavDropdown.Item href="/admin/registration">
            ข้อมูลลงทะเบียน
          </NavDropdown.Item>
        </NextLink>
      </NavDropdown>

      <NextLink href="/">
        <Nav.Link href="/">หน้าแรก</Nav.Link>
      </NextLink>

      <NextLink href="/admin/search">
        <Nav.Link href="/admin/search">ค้นหา</Nav.Link>
      </NextLink>

      <NavDropdown title="งานธุรการชั้นเรียน">
        <DropdownSubMenu title="ด้านประวัติทะเบียนนักเรียน">
          <NextLink href="/admin/student/info/basic">
            <NavDropdown.Item href="/admin/student/info/basic">
              ข้อมูลเบื้องต้น
            </NavDropdown.Item>
          </NextLink>
          <NextLink href="/admin/student/info/address">
            <NavDropdown.Item href="/admin/student/info/address">
              ที่อยู่และการติดต่อ
            </NavDropdown.Item>
          </NextLink>
          <NextLink href="/admin/student/info/advance">
            <NavDropdown.Item href="/admin/student/info/advance">
              รายละเอียดนักเรียน
            </NavDropdown.Item>
          </NextLink>
          <NextLink href="/admin/student/info/family">
            <NavDropdown.Item href="/admin/student/info/family">
              ครอบครัว
            </NavDropdown.Item>
          </NextLink>
        </DropdownSubMenu>
        <DropdownSubMenu title={"ด้านวิชาการ"}>
          <NextLink href="/admin/student/academic/transcript">
            <NavDropdown.Item href="/admin/student/academic/transcript">
              ปพ.6
            </NavDropdown.Item>
          </NextLink>
          <NextLink href="/admin/student/academic/evaluate">
            <NavDropdown.Item href="/admin/student/academic/evaluate">
              แบบประเมิณการอ่าน คิด วิเคราะห์
            </NavDropdown.Item>
          </NextLink>
          <NextLink href="/admin/student/academic/nature">
            <NavDropdown.Item href="/admin/student/academic/nature">
              ลักษณะอันพึงประสงค์
            </NavDropdown.Item>
          </NextLink>
          <NextLink href="/admin/student/academic/house">
            <NavDropdown.Item href="/admin/student/academic/house">
              เยี่ยมบ้าน
            </NavDropdown.Item>
          </NextLink>
        </DropdownSubMenu>
        <NextLink href="/admin/student/behavior">
          <NavDropdown.Item href="/admin/student/behavior">
            ด้านพฤติกรรมนักเรียน
          </NavDropdown.Item>
        </NextLink>
        <NextLink href="/admin/student/health">
          <NavDropdown.Item href="/admin/student/health">
            ด้านสุขภาพพลานามัย
          </NavDropdown.Item>
        </NextLink>
      </NavDropdown>
      <NavDropdown title="ข้อมูลสารสนเทศ/คู่มือ" id="collasible-nav-dropdown">
        <NextLink href="/docs/a">
          <NavDropdown.Item href="/docs/a">ข้อมูลสารสนเทศ</NavDropdown.Item>
        </NextLink>
        <NextLink href="/docs/b">
          <NavDropdown.Item href="/docs/b">คู่มือการใช้งาน</NavDropdown.Item>
        </NextLink>
      </NavDropdown>
    </>
  ) : null;
};

const UserNotLoginLeftMenuComponent = () => {
  return (
    <Nav>
      <NextLink href="/login">
        <Nav.Link href="/login">Login</Nav.Link>
      </NextLink>
      <NextLink href="/register">
        <Nav.Link href="/register">Register</Nav.Link>
      </NextLink>
    </Nav>
  );
};

const UserLoginLeftMenuComponent = (user: UserState) => {
  const dispatch = useDispatch();
  return (
    <Nav>
      <Navbar.Text>
        Signed in as:{" "}
        {user.user?.username}
      </Navbar.Text>
      <NextLink href="/login">
        <Nav.Link
          href="/login"
          onClick={() => {
            dispatch(userLogout());
          }}
        >
          Logout
        </Nav.Link>
      </NextLink>
    </Nav>
  );
};

export const NavbarComponent: React.FC<NavbarComponentProps> = ({}) => {
  const user = useSelector((state: RootState) => state.user);
  const navbar = useSelector((state: RootState) => state.navbar);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(fetchClassesMenu({ token: user.user!.token }));
    }
  }, [user]);

  const indexPath = "/";

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <NextLink href={indexPath}>
            <Navbar.Brand href={indexPath}>{APP_NAME}</Navbar.Brand>
          </NextLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {AdminLoginRightMenuComponent(user, navbar)}
            </Nav>
            {!user.isLoggedIn
              ? UserNotLoginLeftMenuComponent()
              : UserLoginLeftMenuComponent(user)}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
