"use client";
import React, { useState } from "react";
import Link from "next/link";

// TODO: Adjust the width of the option list to match the width of the button
// TODO: Dynamic rendering of options

interface DropdownProps {
  content: string;
  className?: string;
}

const Dropdown = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className={`w-full py-6 pb-8 ${props.className}`}>
      <div className="relative inline-block">
        <button
          type="button"
          className="px-4 py-2 text-white bg-black rounded-lg text-2xl inline-flex items-center
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
          className={`origin-top-right absolute right-0 mt-1 rounded-lg shadow-lg ring-1 ring-white
        ring-opacity-5 border-2 border-white transition-all duration-500 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}
        >
          <ul
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <li>
              <Link
                href="#"
                className="block px-4 py-2 rounded-lg hover:text-blue-400 hover:border-2 hover:border-blue-400"
                onClick={closeDropdown}
              >
                Option 1
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block px-4 py-2 rounded-lg hover:text-blue-400 hover:border-2 hover:border-blue-400"
                onClick={closeDropdown}
              >
                Option 2
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block px-4 py-2 rounded-lg hover:text-blue-400 hover:border-2 hover:border-blue-400"
                onClick={closeDropdown}
              >
                Option 3
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
