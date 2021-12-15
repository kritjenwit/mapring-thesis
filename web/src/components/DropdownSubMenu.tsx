import React from "react";

interface DropdownSubMenuProps {
  title: string;
}

export const DropdownSubMenu: React.FC<DropdownSubMenuProps> = ({
  title,
  children,
}) => {
  return (
    <>
      <li>
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
