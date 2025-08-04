"use client";

import { Container } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressIndicator from "@/components/ProgressIndicator";
import { generateImages } from "@/server/actions/generateImages";
import { charCount } from "@/utils/char-count";
import Step1PaperType from "@/components/create/Step1PaperType";
import Step2WritingStyle from "@/components/create/Step2WritingStyle";
import Step3InkColor from "@/components/create/Step3InkColor";
import Step4Content from "@/components/create/Step4Content";
import Step5Generate from "@/components/create/Step5Generate";

export default function CreatePage() {
  // State for all steps
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPaper, setSelectedPaper] = useState("ruled");
  const [selectedWritingStyle, setSelectedWritingStyle] = useState("caveat");
  const [selectedInk, setSelectedInk] = useState("#0052A3"); // Initialize with blue hex code
  const [customColor, setCustomColor] = useState("#FF6A00");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const handleGenerate = async (
    pages: string[],
    ink: string,
    paper: string,
    additionalQueries: string
  ) => {
    try {
      setIsGenerating(true);
      
      // Direct assignment creation without image generation
      const result = await generateImages(
        pages,
        ink,
        paper,
        additionalQueries
      );
      
      if ("error" in result) {
        console.error("Error creating assignment:", result.error);
        setIsGenerating(false);
        return;
      }
      
      if (result.success && result.assignmentData && result.assignmentData.length > 0) {
        const assignmentId = result.assignmentData[0].id;
        router.push(`/assignment/${assignmentId}`);
        // Don't set isGenerating to false - let the redirect happen while loading
      } else {
        console.error("Error creating assignment:", result);
        setIsGenerating(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsGenerating(false);
      return;
    }
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateClick = () => {
    const { pages } = charCount(content);
    handleGenerate(pages, selectedInk, selectedPaper, "");
  };

  return (
    <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }} py={8}>
      <ProgressIndicator currentStep={currentStep} totalSteps={5} />
      
      {currentStep === 1 && (
        <Step1PaperType
          selectedPaper={selectedPaper}
          setSelectedPaper={setSelectedPaper}
          onNext={nextStep}
        />
      )}
      
      {currentStep === 2 && (
        <Step2WritingStyle
          selectedWritingStyle={selectedWritingStyle}
          setSelectedWritingStyle={setSelectedWritingStyle}
          onNext={nextStep}
          onPrevious={prevStep}
        />
      )}
      
      {currentStep === 3 && (
        <Step3InkColor
          selectedInk={selectedInk}
          setSelectedInk={setSelectedInk}
          customColor={customColor}
          setCustomColor={setCustomColor}
          isColorPickerOpen={isColorPickerOpen}
          setIsColorPickerOpen={setIsColorPickerOpen}
          selectedWritingStyle={selectedWritingStyle}
          onNext={nextStep}
          onPrevious={prevStep}
        />
      )}
      
      {currentStep === 4 && (
        <Step4Content
          content={content}
          setContent={setContent}
          onNext={nextStep}
          onPrevious={prevStep}
        />
      )}
      
      {currentStep === 5 && (
        <Step5Generate
          content={content}
          selectedPaper={selectedPaper}
          isGenerating={isGenerating}
          onGenerate={handleGenerateClick}
          onPrevious={prevStep}
        />
      )}
    </Container>
  );
}