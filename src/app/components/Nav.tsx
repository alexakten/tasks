import React from "react";
import Logo from "../../../public/Logo";

const Nav = ({ LogoOnly = false }) => {
  return (
    <nav className="fixed top-0 z-10 flex w-full items-center justify-between px-10 py-5 text-zinc-200">
      <div className="flex-1">
        <a href="/" aria-label="home">
          <Logo />
        </a>
      </div>
      {/* Only display if LogoOnly is false */}
      {!LogoOnly && (
        <>
          <div className="hidden space-x-6 sm:flex">
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
          <div className="hidden flex-1 items-center justify-end space-x-6 sm:flex">
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
        </>
      )}
    </nav>
  );
};

export default Nav;
