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

        {/* <NextLink href="/admin/class_administrative">
          <NavDropdown.Item href="/admin/class_administrative">
            งานธุรการชั้นเรียน
          </NavDropdown.Item>
        </NextLink> */}
      </NavDropdown>

      <NavDropdown title="ข้อมูลนักเรียน" id="collasible-nav-dropdown">
        <NextLink href="/admin">
          <NavDropdown.Item href="/admin">ค้นหานักเรียน</NavDropdown.Item>
        </NextLink>
        <NextLink href="/admin/student/add">
          <NavDropdown.Item href="/admin/student/add">เพิ่มข้อมูล</NavDropdown.Item>
        </NextLink>
      </NavDropdown>

      <NavDropdown title="งานธุรการชั้นเรียน">
        {/* <NextLink href="/admin/student/registration">
          <NavDropdown.Item href="/admin/student/registration">
            ด้านทะเบียน
          </NavDropdown.Item>
        </NextLink> */}
        {/* <NextLink href="/admin">
          <NavDropdown.Item href="/admin">ค้นหานักเรียน</NavDropdown.Item>
        </NextLink> */}
        {/* <NextLink href="/admin/student/academic">
          <NavDropdown.Item href="/admin/student/academic">
            ด้านวิชาการ
          </NavDropdown.Item>
        </NextLink> */}
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
            ด้านพฤติกรรม
          </NavDropdown.Item>
        </NextLink>
        <NextLink href="/admin/student/health">
          <NavDropdown.Item href="/admin/student/health">
            ด้านสุขภาพ
          </NavDropdown.Item>
        </NextLink>
      </NavDropdown>
      {/* <NavDropdown title="ข้อมูลนักเรียนตามชั้นปี">
        {StudentClassRoomListComponent(navbar.studentClassRoomList)}
      </NavDropdown> */}
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
        <NextLink href="/profile">
          <a href="/profile">{user.user?.username}</a>
        </NextLink>
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

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <NextLink href="/">
            <Navbar.Brand href="/">{APP_NAME}</Navbar.Brand>
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
