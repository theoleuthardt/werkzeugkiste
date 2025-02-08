"use client";
import React from "react";

interface ButtonProps {
  className?: string;
  content: string;
  onClick?: Function;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`p-3 border-2 border-white rounded-xl ` + props.className}
      onClick={() => props.onClick && props.onClick()}
    >
      {props.content}
    </button>
  );
};

export default Button;
