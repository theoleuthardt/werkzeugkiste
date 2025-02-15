"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import Dropdown from "@/components/Dropdown";

export default function DocConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setDownloadUrl("");
    }
  };

  const convertDoc = async () => {
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
    <div className="w-screen h-auto min-h-screen bg-black text-white font-noto flex flex-col items-center">
      <Navbar renderHomeLink={true} />
      <div className="w-screen h-auto min-h-[calc(100vh-80px-60px)] flex flex-1 flex-col items-center justify-center">
        <h2 className="text-5xl font-bold text-white mb-16">doc-converter</h2>
        <div className="h-36 flex flex-row items-center justify-center gap-20">
          <input
            type="file"
            className="h-14 border-2 border-white p-3 rounded-xl text-center text-white"
            id="documentUpload"
            onChange={handleFileChange}
          />
          {/* TODO: Fix Dropdown menu placement */}
          <Dropdown content="output format" className="h-14" />
        </div>
        <div className={"flex flex-row items-center gap-4 mt-4 mb-16"}>
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
              onClick={convertDoc}
            />
          )}
        </div>
        <div className="overflow-hidden text-xl rounded-lg border border-white mb-16 transition-all duration-300 ease-in-out hover:border-blue-400">
          <div
            className="cursor-pointer flex justify-between items-center"
            onClick={() => setTableOpen(!tableOpen)}
          >
            <table className="px-6 py-4 border-b">
              <thead>
                <tr className="border-b border-white">
                  <th className="min-w-96 px-6 py-4 border-r border-white">
                    📥 Input Format
                  </th>
                  <th className="min-w-[398px] px-6 py-4 flex flex-row justify-between items-center">
                    <p className="pr-4 mx-auto">📤 Output Format</p>
                    <div className="flex items-end justify-end place-content-end">
                      {tableOpen ? (
                        <ChevronUp className="h-6 w-6" />
                      ) : (
                        <ChevronDown className="h-6 w-6" />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
          </div>

          <div
            className={`
          }overflow-hidden transition-all duration-700 ease-in-out ${tableOpen ? "max-h-[900px]" : "max-h-0"}`}
          >
            <table className="w-full h-auto text-left border-collapse border-white">
              <tbody>
                <tr className="border-b">
                  <td className="min-w-96 px-6 py-4 border-r">
                    .doc (MS Word)
                  </td>
                  <td className="min-w-96 px-6 py-4">
                    .pdf, .docx, .odt, .txt, .rtf, .html, .epub
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="min-w-96 px-6 py-4 border-r">
                    .docx (MS Word)
                  </td>
                  <td className="min-w-96 px-6 py-4">
                    .pdf, .odt, .txt, .rtf, .html, .epub
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="min-w-96 px-6 py-4 border-r">
                    .odt (OpenDocument Text)
                  </td>
                  <td className="min-w-96 px-6 py-4">
                    .pdf, .doc, .docx, .txt, .rtf, .html, .epub
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="min-w-96 px-6 py-4 border-r">
                    .rtf (Rich Text Format)
                  </td>
                  <td className="min-w-96 px-6 py-4">
                    .pdf, .doc, .docx, .odt, .txt, .html
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="min-w-96 px-6 py-4 border-r">.txt (Text)</td>
                  <td className="min-w-96 px-6 py-4">
                    .pdf, .doc, .docx, .odt, .txt, .html
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="min-w-96 px-6 py-4 border-r">
                    .html (Webseite)
                  </td>
                  <td className="min-w-96 px-6 py-4">
                    .pdf, .doc, .docx, .odt, .rtf, .txt
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="min-w-96 px-6 py-4 border-r">
                    .epub (E-Book)
                  </td>
                  <td className="min-w-96 px-6 py-4">
                    .pdf, .doc, .docx, .odt, .rtf, .txt
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="min-w-96 px-6 py-4 border-r">
                    .xls (MS Excel)
                  </td>
                  <td className="min-w-96 px-6 py-4">
                    .pdf, .xlsx, .ods, .csv
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="min-w-96 px-6 py-4 border-r">
                    .xlsx (MS Excel)
                  </td>
                  <td className="min-w-96 px-6 py-4">.pdf, .xls, .ods, .csv</td>
                </tr>
                <tr className="border-b">
                  <td className="min-w-96 px-6 py-4 border-r">
                    .ods (OpenDocument Spreadsheet)
                  </td>
                  <td className="min-w-96 px-6 py-4">
                    .pdf, .xls, .xlsx, .csv
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="min-w-96 px-6 py-4 border-r">
                    .csv (Comma-Separated Values)
                  </td>
                  <td className="min-w-96 px-6 py-4">
                    .pdf, .xls, .xlsx, .ods
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="min-w-96 px-6 py-4 border-r">
                    .ppt (MS PowerPoint)
                  </td>
                  <td className="min-w-96 px-6 py-4">.pdf, .pptx, .odp</td>
                </tr>
                <tr className="border-b">
                  <td className="min-w-96 px-6 py-4 border-r">
                    .pptx (MS PowerPoint)
                  </td>
                  <td className="min-w-96 px-6 py-4">.pdf, .ppt, .odp</td>
                </tr>
                <tr className="pb-10">
                  <td className="min-w-96 px-6 py-4 border-r">
                    .odp (OpenDocument Presentation)
                  </td>
                  <td className="min-w-96 px-6 py-4">.pdf, .ppt, .pptx</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer className="flex justify-center items-end" />
    </div>
  );
}
