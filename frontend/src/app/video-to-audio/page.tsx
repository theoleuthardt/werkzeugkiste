"use client";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import { ChevronDown, ChevronUp } from "lucide-react";
import Dropdown from "@/components/Dropdown";
import { videoAudioFormats, videoAudioFormatsTable } from "@/constants";

export default function DocConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [selectedOutputFormat, setSelectedOutputFormat] = useState<string | "">(
    "",
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();

      const isSupported = videoAudioFormats.some((format) =>
        format.input.toLowerCase().includes(fileExtension || ""),
      );

      if (!isSupported) {
        alert("File format not supported!");
        event.target.value = "";
        return;
      }

      setFile(selectedFile);
      setSelectedOutputFormat("");

      const matchedFormat = videoAudioFormats.find((format) =>
        format.input.toLowerCase().includes(fileExtension || ""),
      );
      setFilteredOptions(matchedFormat ? matchedFormat.output : []);
    }
  };

  const convertVideo = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("outputFormat", selectedOutputFormat);

    setLoading(true);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/video-to-audio",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const filename = file.name.split(".")[0];

      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}${selectedOutputFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 5000);
    } catch (error) {
      console.error("Error while converting:", error);
      alert("Error while converting!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-auto min-h-screen bg-black text-white font-noto flex flex-col items-center">
      <Navbar renderHomeLink={true} />
      <div className="w-screen h-auto min-h-[calc(100vh-80px-60px)] flex flex-1 flex-col items-center justify-center">
        <h2 className="text-5xl font-bold text-white mb-16">video-to-audio</h2>
        <div className="h-36 flex flex-row items-center justify-center gap-4">
          <input
            type="file"
            className="h-16 border-2 border-white p-3 rounded-xl text-2xl text-center text-white"
            id="audioUpload"
            onChange={handleFileChange}
          />
          <Dropdown
            content={
              file
                ? `Convert to: ${selectedOutputFormat}`
                : "output file format"
            }
            options={filteredOptions.length > 0 ? filteredOptions : [""]}
            onClick={(event) => {
              const selectedFormat =
                event.currentTarget.textContent?.trim() || "";
              setSelectedOutputFormat(selectedFormat);
            }}
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
            onClick={convertVideo}
          />
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
                {videoAudioFormatsTable.map((format) => (
                  <tr key={format.input} className="border-b">
                    <td className="w-96 px-6 py-4 border-r">{format.input}</td>
                    <td className="px-6 py-4">{format.output.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer className="flex justify-center items-end" />
    </div>
  );
}
