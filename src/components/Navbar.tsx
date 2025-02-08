import React from "react";
import Image from "next/image";
import LOGO from "../assets/logo/icons8-toolbox-64.svg";

interface NavProps {
  renderHomeLink: boolean;
}

const navbar = (props: NavProps) => {
  return (
    <div className="h-18 w-full p-3">
      <nav className="bg-black text-white font-bold flex flex-row items-center justify-between">
        <div className="justify-items-start flex flex-1 flex-row items-center">
          <Image
            src={LOGO}
            alt={""}
            width={64}
            height={64}
            className="invert"
          />
          <div className="text-white ml-5">werkzeugkiste.</div>
        </div>
        <div className="flex flex-auto justify-center">
          {props.renderHomeLink ? (
            <a href="#" className="justify-center">
              home
            </a>
          ) : null}
        </div>
        <div className="flex flex-auto justify-end">
          <a
            href="https://github.com/theoleuthardt/werkzeugkiste"
            className="items-end mr-3"
          >
            github
          </a>
        </div>
      </nav>
    </div>
  );
};

export default navbar;
