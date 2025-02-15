"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Home() {
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
        <h2 className="text-5xl font-bold text-white mb-16">doc-converter</h2>
        <input
          type="file"
          className="border-2 border-white p-3 rounded-xl text-center text-white"
          id="documentUpload"
          onChange={handleFileChange}
        />
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
              onClick={convertToPdf}
            />
          )}
        </div>
        {
          // TODO: Fix Table Head widths (fixed and the same as the max body width)
          // TODO: Add hover animation to table head (scale-110, blue text, blue border)
          // TODO: Fix general site height and add scrolling
          // TODO: Add animated pop in for the table body
        }
        <div className="overflow-hidden text-xl rounded-lg border border-white">
          <div
            className="cursor-pointer flex justify-between items-center"
            onClick={() => setTableOpen(!tableOpen)}
          >
            <table className="w-full px-6 py-4 border-b">
              <thead>
                <tr className="border-b border-white">
                  <th className="w-sm px-6 py-4 border-r">📥 Input Format</th>
                  <th className="w-sm px-6 py-4 flex flex-row">
                    <p className="pr-4">📤 Output Format</p>
                    {tableOpen ? (
                      <ChevronUp className="h-6 w-6" />
                    ) : (
                      <ChevronDown className="h-6 w-6" />
                    )}
                  </th>
                </tr>
              </thead>
            </table>
          </div>

          {tableOpen && (
            <table className="w-full text-left border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4 border-r">.doc (MS Word)</td>
                  <td className="px-6 py-4">
                    .pdf, .docx, .odt, .txt, .rtf, .html, .epub
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 border-r">.docx (MS Word)</td>
                  <td className="px-6 py-4">
                    .pdf, .odt, .txt, .rtf, .html, .epub
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 border-r">
                    .odt (OpenDocument Text)
                  </td>
                  <td className="px-6 py-4">
                    .pdf, .doc, .docx, .txt, .rtf, .html, .epub
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 border-r">
                    .rtf (Rich Text Format)
                  </td>
                  <td className="px-6 py-4">
                    .pdf, .doc, .docx, .odt, .txt, .html
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 border-r">.txt (Text)</td>
                  <td className="px-6 py-4">
                    .pdf, .doc, .docx, .odt, .txt, .html
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 border-r">.html (Webseite)</td>
                  <td className="px-6 py-4">
                    .pdf, .doc, .docx, .odt, .rtf, .txt
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 border-r">.epub (E-Book)</td>
                  <td className="px-6 py-4">
                    .pdf, .doc, .docx, .odt, .rtf, .txt
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 border-r">.xls (MS Excel)</td>
                  <td className="px-6 py-4">.pdf, .xlsx, .ods, .csv</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 border-r">.xlsx (MS Excel)</td>
                  <td className="px-6 py-4">.pdf, .xls, .ods, .csv</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 border-r">
                    .ods (OpenDocument Spreadsheet)
                  </td>
                  <td className="px-6 py-4">.pdf, .xls, .xlsx, .csv</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 border-r">
                    .csv (Comma-Separated Values)
                  </td>
                  <td className="px-6 py-4">.pdf, .xls, .xlsx, .ods</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 border-r">.ppt (MS PowerPoint)</td>
                  <td className="px-6 py-4">.pdf, .pptx, .odp</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 border-r">.pptx (MS PowerPoint)</td>
                  <td className="px-6 py-4">.pdf, .ppt, .odp</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 border-r">
                    .odp (OpenDocument Presentation)
                  </td>
                  <td className="px-6 py-4">.pdf, .ppt, .pptx</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
