import React, { JSX } from "react";

interface ButtonProps {
  className?: string;
  content: string | JSX.Element;
  onClick?: () => void;
  visible?: boolean;
}

const Button = ({
  className,
  content,
  onClick,
  visible = true,
}: ButtonProps) => {
  return (
    <button
      className={
        `p-3 border-2 border-white rounded-xl text-2xl hover:scale-110 hover:transition-scale hover:duration-200
              hover:text-blue-400 hover:border-blue-400 ` + className
      }
      onClick={() => onClick && onClick()}
      style={{ display: visible ? "block" : "none" }}
    >
      {content}
    </button>
  );
};

export default Button;
