/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useRef, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { UploadIcon } from "./ui/UploadIcon";

interface UploadCVProps {
  onFileUpload: (file: File | null) => void;
  errorMessage?: string;
  file: File | null;
}

export const UploadCVForm: React.FC<UploadCVProps> = ({
  onFileUpload,
  errorMessage,
  file,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const validateAndProcessFile = (selectedFile: File | null) => {
    if (selectedFile) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!validTypes.includes(selectedFile.type)) {
        setFileError(
          "Invalid file type. Please upload a PDF or Word document."
        );
        onFileUpload(null);
        console.log("Invalid file type:", selectedFile.type);
        return false;
      }

      if (selectedFile.size > 2 * 1024 * 1024) {
        setFileError("File size exceeds 2MB. Please upload a smaller file.");
        onFileUpload(null);
        console.log("File size too large:", selectedFile.size);
        return false;
      }

      setFileError(null);
      onFileUpload(selectedFile);
      //console.log("File is valid:", selectedFile);
      return true;
    }
    return false;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files?.[0] || null;
    validateAndProcessFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile) {
      validateAndProcessFile(selectedFile);
    }
  };

  return (
    <div className="upload-cv-container w-full">
      {!file && (
        <h1 className="text-center text-5xl not-italic font-normal pb-8">
          Upload your resume
        </h1>
      )}
      {file ? (
        <div className="uploaded-file flex flex-col items-center gap-4 w-full">
          {file.type === "application/pdf" && (
            <div className="w-full">
              <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
                <div
                  style={{
                    height: "330px",
                    border: "none",
                    borderBottom: "1px solid #e8e8e8",
                    boxShadow: "none",
                    overflowY: "hidden",
                  }}
                >
                  <Viewer
                    fileUrl={URL.createObjectURL(file)}
                    renderLoader={(percentages: number) => (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        <span className="ml-2">Loading PDF...</span>
                      </div>
                    )}
                  />
                </div>
              </Worker>
            </div>
          )}
          {file.type.includes("word") && (
            <div className="p-4 bg-gray-100 rounded w-full text-center">
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-600">
                Word document uploaded successfully
              </p>
            </div>
          )}
        </div>
      ) : (
        <div
          className="upload flex flex-col justify-center items-center gap-4 border border-slate-300 rounded-lg w-full p-6 cursor-pointer hover:border-slate-400 transition-colors"
          onClick={handleDivClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleDivClick();
            }
          }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          role="button"
          tabIndex={0}
          aria-label="Upload your resume"
        >
          <UploadIcon />
          <p className="text-center text-lg not-italic font-normal leading-7">
            Click the icon above or drop your resume in here!
          </p>
          <p className="text-center text-xs not-italic font-normal leading-4 text-slate-300">
            Resumes in PDF or DOCS. Readable text only (no scans). Max 2MB file
            size.
          </p>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
        </div>
      )}
      {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
};
