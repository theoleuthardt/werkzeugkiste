"use client";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import Image from "next/image";

export default function QrCodeGenerator() {
  const [loading, setLoading] = useState(false);
  const [qrcode, setQRCode] = useState<string | null>(null);

  const downloadImage = (dataUrl: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateQRCode = async () => {
    setLoading(true);

    const textInput = (document.getElementById("data") as HTMLInputElement)
      .value;

    try {
      const response = await fetch(
        process.env.backend_url + "/api/generate-qrcode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: textInput,
          }),
        },
      );

      if (!response.ok) {
        console.error("Error while converting");
      }

      const data = await response.json();
      console.log("Data:", data);
      if (data.qrCode) {
        setQRCode(data.qrCode);
        downloadImage(data.qrCode);
      }
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
        <h2 className="text-5xl font-bold text-white mb-16">
          qr-code-generator
        </h2>
        <div className="flex flex-row items-center justify-center gap-4 mb-6">
          <input
            className="h-20 w-64 p-2 rounded-xl text-white bg-black border-2 border-white text-center"
            type="text"
            id="data"
            placeholder="Enter some data to convert!"
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
            onClick={generateQRCode}
          />
        </div>
        <div className="p-3 rounded-xl text-center">
          {qrcode && (
            <Image
              id="output"
              src={qrcode}
              alt="QR Code"
              className="text-blue-400 text-3xl"
            />
          )}
        </div>
      </div>
      <Footer className="flex justify-center items-end" />
    </div>
  );
}
