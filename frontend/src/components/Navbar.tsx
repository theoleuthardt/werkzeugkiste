import React from "react";
import Image from "next/image";
import LOGO from "../assets/werkzeugkasten.svg";
import Link from "next/link";

interface NavProps {
  className?: string;
  renderHomeLink: boolean;
}

const Navbar = (props: NavProps) => {
  return (
    <div className={`h-18 w-full p-3 ` + props.className}>
      <nav className="h-14 bg-black text-white font-bold flex flex-row items-center justify-between">
        <div className="justify-items-start flex flex-1 flex-row items-center">
          <Image src={LOGO} alt="" width={70} height={70} className="invert" />
          <div className="text-white text-2xl ml-5">werkzeugkiste.</div>
        </div>
        <div className="flex flex-auto justify-center">
          {props.renderHomeLink ? (
            <Link
              href="/"
              className="justify-center text-2xl hover:underline hover:transition-underline hover:duration-300 hover:text-blue-400"
            >
              home
            </Link>
          ) : null}
        </div>
        <div className="flex flex-1 justify-end">
          <Link
            href="https://github.com/theoleuthardt/werkzeugkiste"
            className="items-end mr-3 text-2xl hover:underline hover:transition-underline hover:duration-300 hover:text-blue-400"
          >
            github
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
