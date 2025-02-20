"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";

export default function PasswordGenerator() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = async () => {
    setLoading(true);

    const length = (document.getElementById("length") as HTMLInputElement)
      .value;
    const numb = (document.getElementById("numb") as HTMLInputElement).checked;
    const lower = (document.getElementById("lower") as HTMLInputElement)
      .checked;
    const upper = (document.getElementById("upper") as HTMLInputElement)
      .checked;
    const special = (document.getElementById("special") as HTMLInputElement)
      .checked;

    try {
      const response = await fetch(
        process.env.backend_url + "/api/password-generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            length: length,
            numb: numb,
            lower: lower,
            upper: upper,
            special: special,
          }),
        },
      );
      if (!response.ok) {
        return new Error(`Error: ${response.statusText}`);
      }
      const password: string = await response.text();
      console.log(password);
      setPassword(password);
    } catch (error) {
      console.error("Error while converting:", error);
      alert("Error while converting");
    } finally {
      setLoading(false);
    }
  };

  const clearInAndOutput = () => {
    setPassword("");
    const length = document.getElementById("length") as HTMLInputElement;
    const numb = document.getElementById("numb") as HTMLInputElement;
    const lower = document.getElementById("lower") as HTMLInputElement;
    const upper = document.getElementById("upper") as HTMLInputElement;
    const special = document.getElementById("special") as HTMLInputElement;
    length.value = "";
    numb.checked = false;
    lower.checked = false;
    upper.checked = false;
    special.checked = false;
  };

  const checkInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const length = document.getElementById(event.target.id) as HTMLInputElement;
    const lengthValue = +length.value;

    if (lengthValue < 1 || lengthValue > 64) {
      alert("Invalid input. Please enter a number between 1 and 64.");
    }
    if (lengthValue < 1) {
      length.value = "1";
    } else if (lengthValue > 64) {
      length.value = "64";
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white font-noto flex flex-col items-center">
      <Navbar renderHomeLink={true} />
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <h2 className="text-5xl font-bold text-white mb-16">
          password-generator
        </h2>
        <div className="border-2 border-white p-3 rounded-xl text-center text-white flex flex-row justify-between">
          <div className="flex flex-col items-start">
            <label className="mx-2" htmlFor="length">
              length:
            </label>
            <label className="mx-2 text-white" htmlFor="numb">
              numbers
            </label>
            <label className="mx-2" htmlFor="lower">
              lower case characters
            </label>
            <label className="mx-2" htmlFor="upper">
              upper case characters
            </label>
            <label className="mx-2" htmlFor="special">
              special characters
            </label>
          </div>
          <div className="flex flex-col items-end justify-evenly gap-2">
            <input
              type="number"
              id="length"
              name="length"
              min="1"
              max="64"
              className="w-16 bg-black border-1 border-white text-center"
              onInput={checkInput}
            />
            <input
              type="checkbox"
              id="numb"
              name="numb"
              className="w-16 bg-black border-1 border-white text-center"
            />
            <input
              type="checkbox"
              id="lower"
              name="lower"
              className="w-16 bg-black border-1 border-white text-center"
            />
            <input
              type="checkbox"
              id="upper"
              name="upper"
              className="w-16 bg-black border-1 border-white text-center"
            />
            <input
              type="checkbox"
              id="special"
              name="special"
              className="w-16 bg-black border-1 border-white text-center"
            />
          </div>
        </div>
        <div className={"flex flex-row items-center gap-4 mt-4 mb-16"}>
          <Button
            content={
              loading ? (
                <div className="h-10 w-10 border-8 border-blue-100 border-t-blue-500 rounded-full animate-spin" />
              ) : (
                "generate"
              )
            }
            onClick={generatePassword}
          />
          <Button content="clear" onClick={clearInAndOutput} />
        </div>
        <div className="p-3 rounded-xl text-center">
          <output id="password" className="text-blue-400 text-3xl">
            {password}
          </output>
        </div>
      </div>
      <Footer />
    </div>
  );
}
