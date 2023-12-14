import React from "react";
import Logo from "../../../public/Logo";

const Nav = () => {
  return (
    <nav className="xs:px-10 fixed top-0 z-10 flex w-full items-center justify-between px-4 py-6">
      <Logo />
    </nav>
  );
};

export default Nav;
