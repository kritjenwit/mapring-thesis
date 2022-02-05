import React from "react";

interface DropdownSubMenuProps {
  title: string;
  id?: string,
}

export const DropdownSubMenu: React.FC<DropdownSubMenuProps> = ({
  id,
  title,
  children,
}) => {
  return (
    <>
      <li id={id}>
        <a className="dropdown-item" style={{ cursor: "pointer" }}>
          {title} &raquo;
        </a>
        {/* <ul className="dropdown-menu dropdown-submenu">{children}</ul> */}
        <div
          aria-labelledby=""
          data-bs-popper="static"
          className="dropdown-menu dropdown-submenu"
        >
          {children}
        </div>
      </li>
    </>
  );
};
