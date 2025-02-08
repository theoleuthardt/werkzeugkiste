import React from "react";

interface NavProps {
  className?: string;
}

const navbar = (props: NavProps) => {
  return (
    <div className={`h-18 w-full p-3 ` + props.className}>
      <div className="text-md text-white font-bold flex flex-row items-center justify-center">
        <text>made by</text>
        <a
          className="mx-2 hover:underline hover:text-blue-400"
          href="https://github.com/AuriomTex"
        >
          Domi
        </a>
        <text>and</text>
        <a
          className="mx-2 hover:underline hover:text-blue-400"
          href="https://github.com/theoleuthardt"
        >
          Theo.
        </a>
      </div>
    </div>
  );
};

export default navbar;
