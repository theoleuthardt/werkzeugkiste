"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";

export default function RgbToHex() {
  const [loading, setLoading] = useState(false);
  const [hex, setHex] = useState("");

  const convertToHex = async () => {
    setLoading(true);

    const red = (document.getElementById("red") as HTMLInputElement).value;
    const green = (document.getElementById("green") as HTMLInputElement).value;
    const blue = (document.getElementById("blue") as HTMLInputElement).value;

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/color-convert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ red: red, green: green, blue: blue }),
        },
      );
      if (!response.ok) {
        return new Error(`Error: ${response.statusText}`);
      }
      const hex: string = await response.text();
      setHex(hex);
    } catch (error) {
      console.error("Error while converting:", error);
      alert("Error while converting");
    } finally {
      setLoading(false);
    }
  };

  const clearInAndOutput = () => {
    setHex("");
    const red = document.getElementById("red") as HTMLInputElement;
    const green = document.getElementById("green") as HTMLInputElement;
    const blue = document.getElementById("blue") as HTMLInputElement;
    red.value = "";
    green.value = "";
    blue.value = "";
  };

  const checkInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = document.getElementById(event.target.id) as HTMLInputElement;
    const colorValue = +color.value;

    if (colorValue < 0 || colorValue > 255) {
      alert("Invalid input. Please enter a number between 0 and 255.");
    }
    if (colorValue < 0) {
      color.value = "0";
    } else if (colorValue > 255) {
      color.value = "255";
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white font-noto flex flex-col items-center">
      <Navbar renderHomeLink={true} />
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <h2 className="text-5xl font-bold text-white mb-16">rgb-to-hex</h2>
        <div className="border-2 border-white p-3 rounded-xl text-center text-white">
          <label className="mr-2" htmlFor="red">
            red:
          </label>
          <input
            type="number"
            id="red"
            name="red"
            min="0"
            max="255"
            className="w-16 bg-black border-1 border-white text-center"
            onInput={checkInput}
          />
          <label className="mx-2 text-white" htmlFor="green">
            green:
          </label>
          <input
            type="number"
            id="green"
            name="green"
            min="0"
            max="255"
            className="w-16 bg-black border-1 border-white text-center"
            onChange={checkInput}
          />
          <label className="mx-2" htmlFor="blue">
            blue:
          </label>
          <input
            type="number"
            id="blue"
            name="blue"
            min="0"
            max="255"
            className="w-16 bg-black border-1 border-white text-center"
            onInput={checkInput}
          />
        </div>
        <div className={"flex flex-row items-center gap-4 mt-4 mb-16"}>
          <Button
            content={
              loading ? (
                <div className="h-10 w-10 border-8 border-blue-100 border-t-blue-500 rounded-full animate-spin" />
              ) : (
                "convert"
              )
            }
            onClick={convertToHex}
          />
          <Button content="clear" onClick={clearInAndOutput} />
        </div>
        <div className="p-3 rounded-xl text-center">
          <output id="hex" className="text-blue-400 text-3xl">
            {hex}
          </output>
        </div>
      </div>
      <Footer />
    </div>
  );
}
