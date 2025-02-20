"use client";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";

export default function DocConverter() {
  const [loading, setLoading] = useState(false);
  const [convertedTMZ, setConvertedTMZ] = useState("");

  const convertTMZ = async () => {
    setLoading(true);

    const time = (document.getElementById("time") as HTMLInputElement).value;
    const fromZone = (document.getElementById("fromZone") as HTMLInputElement)
      .value;
    const toZone = (document.getElementById("toZone") as HTMLInputElement)
      .value;

    try {
      const response = await fetch(
        process.env.backend_url + "/api/tmz-convert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            time: time,
            fromZone: fromZone,
            toZone: toZone,
          }),
        },
      );
      if (!response.ok) {
        return new Error(`Error: ${response.statusText}`);
      }
      const output: string = await response.text();
      setConvertedTMZ(output);
    } catch (error) {
      console.error("Error while converting:", error);
      alert("Error while converting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-auto min-h-screen bg-black text-white font-noto flex flex-col items-center">
      <Navbar renderHomeLink={true} />
      <div className="w-screen h-auto min-h-[calc(100vh-80px-60px)] flex flex-1 flex-col items-center justify-center">
        <h2 className="text-5xl font-bold text-white mb-16">tmz-converter</h2>
        <h3 className="text-3xl font-bold text-white">Example:</h3>
        <div className="h-8 flex flex-row items-center justify-center gap-4 mt-3">
          <p className="text-white text-xl">Time: 2025-02-20T15:30:00</p>
          <p className="text-white text-xl">From TMZ: America/New_York</p>
          <p className="text-white text-xl">To TMZ: Europe/Berlin</p>
        </div>
        <p className="text-xl text-white mb-3">
          Output: 2025-02-20T21:30:00.000+01:00
        </p>
        <div className="h-24 flex flex-row items-center justify-center gap-4">
          <input
            className="h-10 w-64 p-2 rounded-xl text-white bg-black border-2 border-white text-center"
            type="text"
            id="time"
            placeholder="Enter Time!"
          />
          <input
            className="h-10 w-64 p-2 rounded-xl text-white bg-black border-2 border-white text-center"
            type="text"
            id="fromZone"
            placeholder="Enter your TMZ!"
          />
          <input
            className="h-10 w-64 p-2 rounded-xl text-white bg-black border-2 border-white text-center"
            type="text"
            id="toZone"
            placeholder="Enter destination TMZ!"
          />
        </div>
        <div className={"flex flex-row items-center gap-4 mt-1 mb-10"}>
          <Button
            content={
              loading ? (
                <div className="h-10 w-10 border-8 border-blue-100 border-t-blue-500 rounded-full animate-spin" />
              ) : (
                "convert"
              )
            }
            onClick={convertTMZ}
          />
        </div>
        <div className="p-3 rounded-xl text-center">
          <output id="output" className="text-blue-400 text-3xl">
            {convertedTMZ}
          </output>
        </div>
      </div>
      <Footer className="flex justify-center items-end" />
    </div>
  );
}
