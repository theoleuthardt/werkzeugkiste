"use client";
import React, { useState } from "react";
import Link from "next/link";

interface DropdownProps {
  content: string;
  options: string[];
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Dropdown = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(false);
    if (props.onClick) props.onClick(event);
  };

  return (
    <div className={`w-full ${props.className}`}>
      <div className="relative">
        <button
          type="button"
          className="h-16 px-4 py-2 text-white bg-black rounded-lg text-2xl inline-flex items-center
          border-white border-2 hover:text-blue-400 hover:border-blue-400"
          onClick={toggleDropdown}
        >
          {props.content}{" "}
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          className={`absolute left-0 mt-2 w-full rounded-lg shadow-lg ring-1 ring-white
                      ring-opacity-5 border-2 border-white transition-all duration-500 ease-in-out text-center
                      ${isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}
        >
          <ul
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            className="max-h-[164px] w-full overflow-y-auto"
          >
            {props.options?.map((option) => (
              <li key={option}>
                <Link
                  href="#"
                  className="block px-4 py-2 rounded-lg hover:text-blue-400 hover:border-2 hover:border-blue-400"
                  onClick={closeDropdown}
                >
                  {option}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
