"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import Link from "next/link";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setDownloadUrl("");
    }
  };

  const convertToPdf = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await fetch(
        process.env.backend_url + "/api/libre-convert",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        return new Error(`Error: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error("Error while converting:", error);
      alert("Error while converting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white font-noto flex flex-col items-center">
      <Navbar renderHomeLink={true} />
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <h2 className="text-5xl font-bold text-white mb-16">doc-to-pdf</h2>
        <table className="border-2 border-white text-xl rounded-xl mb-16">
          <thead>
            <tr>
              <th>Input Format</th>
              <th>Output Format</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>docx</td>
              <td>pdf</td>
            </tr>
            <tr>
              <td>doc</td>
              <td>pdf</td>
            </tr>
            <tr>
              <td>odt</td>
              <td>pdf</td>
            </tr>
          </tbody>
        </table>
        <input
          type="file"
          className="border-2 border-white p-3 rounded-xl text-center text-white"
          id="documentUpload"
          onChange={handleFileChange}
        />
        <div className={"flex flex-row items-center gap-4 mt-4"}>
          {downloadUrl ? (
            <Link id="downloadPDF" href={downloadUrl}>
              <Button content="download" />
            </Link>
          ) : (
            <Button
              content={
                loading ? (
                  <div className="h-10 w-10 border-8 border-blue-100 border-t-blue-500 rounded-full animate-spin" />
                ) : (
                  "convert"
                )
              }
              onClick={convertToPdf}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
