import React from "react";
import Logo from "../../../public/Logo";

const Nav = () => {
  return (
    <nav className="fixed top-0 z-10 flex w-full items-center justify-between px-4 py-6 text-zinc-200">
      <div className="flex-1">
        <Logo />
      </div>
      <div className="sm:flex hidden space-x-6 ">
        <a href="#features" className="hover:text-zinc-400">
          Features
        </a>
        <a href="#pricing" className="hover:text-zinc-400">
          Pricing
        </a>
        <a href="#contact" className="hover:text-zinc-400">
          Contact
        </a>
      </div>
      <div className="sm:flex hidden flex-1 items-center justify-end space-x-6">
        <a href="#login" className="hover:text-zinc-400">
          Log in
        </a>
        <a
          href="#signup"
          className="rounded-full bg-zinc-100 px-4 py-2 text-zinc-950 hover:bg-zinc-300"
        >
          Sign up
        </a>
      </div>
    </nav>
  );
};

export default Nav;
