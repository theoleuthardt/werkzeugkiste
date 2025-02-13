"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [showDownload, setShowDownload] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const convertToPdf = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/libre-convert", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        return new Error(`Error: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      setShowDownload(true);
    } catch (error) {
      console.error("Error while converting:", error);
      alert("Error while converting");
    }
  };

  useEffect(() => {
    if (file) {
      console.log(file);
    }
  }, [file]);

  return (
    <div className="h-screen w-screen bg-black text-white font-noto flex flex-col items-center">
      <Navbar renderHomeLink={true} />
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <h2 className="text-5xl font-bold text-white mb-16">doc-to-pdf</h2>
        <input
          type="file"
          className="border-2 border-white p-3 rounded-xl text-center text-white"
          id="documentUpload"
          onChange={handleFileChange}
        />
        <div className={"flex flex-row items-center gap-4 mt-4"}>
          <Button content="convert" onClick={convertToPdf} />
          <Link id="downloadPDF" href={downloadUrl}>
            <Button content="download" visible={showDownload} />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
