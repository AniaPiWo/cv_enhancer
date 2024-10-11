"use client";
import React, { useState, useRef } from "react";
import { Stepper } from "@/components/ui/Stepper";
import { JobOfferForm } from "@/components/JobOfferForm";
import { UploadCVForm } from "@/components/UploadCVForm";
import { Loader } from "@/components/ui/Loader";
import EnhancedCVDisplay from "@/components/EnhancedCV";

import Link from "next/link";

const steps = [
  { label: "Job description" },
  { label: "Upload Resume" },
  { label: "Enhanced CV" },
];

export default function JobOfferPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedCVText, setExtractedCVText] = useState<any | null>(null);
  const [enhancedCV, setEnhancedCV] = useState<any | null>(null);

  // Job offer form submission
  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setErrorMessage(undefined);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setJobDescription(event.target.value);
  };

  // Upload CV handling
  const handleFileUpload = async (file: File | null) => {
    setUploadedFile(file);

    if (file) {
      setLoading(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(arrayBuffer);

        const response = await fetch("/api/extractCvText", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileBuffer }),
        });

        if (!response.ok) {
          throw new Error("Failed to extract text from the CV");
        }

        const { extractedText } = await response.json();
        setExtractedCVText(extractedText);
      } catch (error) {
        setErrorMessage("Failed to extract text from the uploaded CV.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Enhance CV handling
  const handleEnhanceCV = async () => {
    if (!extractedCVText) {
      setErrorMessage("No CV data to enhance.");
      return;
    }

    setEnhancing(true);
    try {
      const response = await fetch("/api/a", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ extractedCV: extractedCVText }),
      });

      if (!response.ok) {
        throw new Error("Failed to enhance the CV");
      }

      const { enhancedCv } = await response.json();
      setEnhancedCV(enhancedCv);
      console.log("Enhanced CV:", enhancedCv);
    } catch (error) {
      console.error("Error enhancing CV:", error);
      setErrorMessage("Failed to enhance the CV.");
    } finally {
      setEnhancing(false);
    }
  };

  // Enhanced CV change handling
  const handleEnhancedCVChange = (field: string, value: any) => {
    const keys = field.split(".");
    let updatedCV = { ...enhancedCV };

    let current = updatedCV;
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = value;
      } else {
        current = current[key];
      }
    });

    setEnhancedCV(updatedCV);
  };

  // Steps navigation
  const goToNextStep = () => {
    if (activeStep === 1) {
      handleEnhanceCV();
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="flex flex-col items-center w-full h-full min-h-[calc(100vh-328px)] bg-white p-6">
      <div className="flex flex-col items-center flex-grow w-full bg-white pt-9">
        <Stepper steps={steps} activeStep={activeStep} />
      </div>
      <div className="w-[650px]">
        {loading || enhancing ? (
          <Loader
            mainText={
              enhancing
                ? "Enhancing your CV..."
                : "Your CV is being processed..."
            }
            subText={
              enhancing
                ? "Improving the content and formatting according to ATS standards."
                : "Analyzing the content and extracting key information."
            }
            subText2="This usually takes just a few seconds."
          />
        ) : (
          <>
            {activeStep === 0 && (
              <div className="flex justify-center mt-6 space-x-4">
                <JobOfferForm
                  ref={formRef}
                  jobDescription={jobDescription}
                  errorMessage={errorMessage}
                  onSubmit={handleFormSubmit}
                  onChange={handleInputChange}
                />
              </div>
            )}
            {activeStep === 1 && (
              <div className="flex justify-center mt-6 space-x-4">
                <UploadCVForm
                  onFileUpload={handleFileUpload}
                  file={uploadedFile}
                />
              </div>
            )}

            <div className="flex items-center justify-between w-full mt-4">
              {activeStep === 0 && (
                <Link href="/" className="btn btn-outline btn-primary">
                  Back
                </Link>
              )}
              {activeStep === 1 && (
                <button
                  className="btn btn-outline btn-primary"
                  onClick={goToPreviousStep}
                >
                  Back
                </button>
              )}
              {activeStep < steps.length - 1 && (
                <button
                  className="btn btn-primary text-white"
                  onClick={goToNextStep}
                >
                  Go to {steps[activeStep + 1].label}
                </button>
              )}
            </div>
          </>
        )}
      </div>
      {activeStep === 2 && (
        <div className="mt-6 w-3/4">
          <EnhancedCVDisplay
            enhancedCV={enhancedCV}
            onChange={handleEnhancedCVChange}
          />
        </div>
      )}
    </div>
  );
}
