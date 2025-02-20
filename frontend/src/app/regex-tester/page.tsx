"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";

export default function RgbToHex() {

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const testRegex = async () => {

    setLoading(true);

    const regex = (document.getElementById("regex") as HTMLInputElement).value;
    const test = (document.getElementById("test") as HTMLInputElement).value;

    try {
      const response = await fetch(
        process.env.backend_url + "/api/regex-test",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({  regex: regex, test: test}),
        },
      );
      if (!response.ok) {
        return new Error(`Error: ${response.statusText}`);
      }
      const output: string = await response.text();
      console.log(output);
      setOutput(output);

    } catch (error) {
      console.error("Error while converting:", error);
      alert("Error while converting");
    } finally {
      setLoading(false);
    }
  };

  const clearInAndOutput = () => {
    setOutput("");
    const regex = document.getElementById("regex") as HTMLInputElement;
    const test = document.getElementById("test") as HTMLInputElement;
    test.value = "";
    regex.value = "";
  };

  return (
    <div className="h-screen w-screen bg-black text-white font-noto flex flex-col items-center">
      <Navbar renderHomeLink={true} />
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <h2 className="text-5xl font-bold text-white mb-16">regex-tester</h2>
        <div className="border-2 border-white p-3 rounded-xl text-center text-white flex flex-col justify-between">
          <div>
          <label className="mr-2 m" htmlFor="regex">regex:</label>
          <input
            type="text"
            id="regex"
            name="regex"
            className="field-sizing-content bg-black border-1 border-white text-center mb-3"
          />
          </div>
          <div>
          <label className="mr-2" htmlFor="test">test string:</label>
            <input
              type="text"
              id="test"
              name="test"
              className="field-sizing-content bg-black border-1 border-white text-center"
            />
          </div>
        </div>
        <div className={"flex flex-row items-center gap-4 mt-4 mb-16"}>
          <Button
            content={
              loading ? (
                <div className="h-10 w-10 border-8 border-blue-100 border-t-blue-500 rounded-full animate-spin" />
              ) : (
                "test"
              )
            }
            onClick={testRegex}
          />
          <Button
            content="clear"
            onClick={clearInAndOutput}
          />
          </div>
        <div className="p-3 rounded-xl text-center">
          <output
            id="output"
            className="text-blue-400 text-3xl"
          >{output}</output>
        </div>
      </div>
      <Footer />
    </div>
  );
}