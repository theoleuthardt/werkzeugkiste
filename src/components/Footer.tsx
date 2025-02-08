import React from "react";

interface FooterProps {
  className?: string;
}

const Footer = (props: FooterProps) => {
  return (
    <div className={`h-18 w-full p-3 ` + props.className}>
      <div className="text-md text-white font-bold flex flex-row items-center justify-center">
        <p>made by</p>
        <a
          className="mx-2 hover:underline hover:text-blue-400"
          href="https://github.com/AuriomTex"
        >
          Domi
        </a>
        <p>and</p>
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

export default Footer;
