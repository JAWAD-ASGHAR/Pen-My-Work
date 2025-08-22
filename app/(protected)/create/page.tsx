"use client";

import {
  Container,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ProgressIndicator from "@/components/ProgressIndicator";
import { generateImages } from "@/server/actions/generate-images";
import { getUserCredits } from "@/server/actions/user-credits";
import { getCurrentUserPlanAndSubscription } from "@/server/actions/user-plans";
import Step1PaperType from "@/components/create/Step1PaperType";
import Step2WritingStyle from "@/components/create/Step2WritingStyle";
import Step3InkColor from "@/components/create/Step3InkColor";
import Step4Content from "@/components/create/Step4Content";
import Step5Generate from "@/components/create/Step5Generate";
import { charCount } from "@/utils/char-count";

export default function CreatePage() {
  // State for all steps
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPaper, setSelectedPaper] = useState("ruled");
  const [selectedWritingStyle, setSelectedWritingStyle] = useState("caveat");
  const [selectedInk, setSelectedInk] = useState("#0052A3");
  const [customColor, setCustomColor] = useState("#FF6A00");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [userCredits, setUserCredits] = useState<{ totalCredits: number; usedCredits: number } | null>(null);
  const [userPlan, setUserPlan] = useState<{ planId: string; name: string } | null>(null);
  const [showCreditError, setShowCreditError] = useState(false);
  const [requiredPages, setRequiredPages] = useState(0);
  const router = useRouter();
  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { plan } = await getCurrentUserPlanAndSubscription();
        setUserPlan(plan || null);

        // Only fetch credits if user is on free plan
        if (plan?.planId === "free") {
          const credits = await getUserCredits();
          setUserCredits(credits);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Calculate required pages when content changes
  useEffect(() => {
    if (content.trim()) {
      const { pageCount } = charCount(content,selectedWritingStyle);
      setRequiredPages(pageCount);
    } else {
      setRequiredPages(0);
    }
  }, [content,selectedWritingStyle]);

  const handleGenerate = async (
    pages: string,
    ink: string,
    paper: string,
    writingStyle: string,
    additionalQueries: string
  ) => {
    try {
      setIsGenerating(true);

      // Only check credits for free plan users
      if (userPlan?.planId === "free") {
        const availableCredits = userCredits ? userCredits.totalCredits - userCredits.usedCredits : 0;
        if (availableCredits < requiredPages) {
          setShowCreditError(true);
          setIsGenerating(false);
          return;
        }
      }

      // Direct assignment creation without image generation
      const result = await generateImages(
        pages,
        ink,
        paper,
        writingStyle,
        additionalQueries,
        requiredPages
      );

      if ("error" in result) {
        console.error("Error creating assignment:", result.error);
        toast({
          title: "Error", 
          description: result.error,
          status: "error",
        });
        setIsGenerating(false);
        return;
      }

      if (result.success && result.assignmentData && result.assignmentData.length > 0) {
        const assignmentId = result.assignmentData[0].id;
        router.push(`/assignment/${assignmentId}`);
      } else {
        console.error("Error creating assignment:", result);
        toast({
          title: "Error",
          description: "Failed to create assignment",
          status: "error",
        });
        setIsGenerating(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        status: "error",
      });
      setIsGenerating(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 5) {
      // Scroll to top before changing step
      window.scrollTo({ top: 0, behavior: 'instant' });
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      // Scroll to top before changing step
      window.scrollTo({ top: 0, behavior: 'instant' });
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateClick = () => {
    handleGenerate(content, selectedInk, selectedPaper, selectedWritingStyle, "");
  };

  const handleUpgradeToPro = () => {
    setShowCreditError(false);
    router.push("/plans");
  };

  const needsCreditCheck = userPlan?.planId === "free";

  const [subscription, setSubscription] = useState<{ status: string; statusFormatted: string; renewsAt?: string; endsAt?: string } | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { subscription: sub } = await getCurrentUserPlanAndSubscription();

        if (sub) {
          setSubscription({
            status: sub.status,
            statusFormatted: sub.statusFormatted,
            renewsAt: sub.renewsAt || undefined,
            endsAt: sub.endsAt || undefined,
          });
        } else {
          setSubscription(null);
        }
      } catch (error) {
        console.error("Error fetching subscription:", error);
      }
    };

    fetchSubscription();
  }, []);

  return (
    <Container 
      maxW={{ base: "100%", sm: "2xl", lg: "4xl" }} 
      px={{ base: 2, sm: 4, md: 6, lg: 8 }} 
      py={{ base: 4, md: 6, lg: 8 }}
      minH="100vh"
      className="mobile-scroll"
    >
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
          userCredits={needsCreditCheck ? userCredits : null}
          userPlan={userPlan}
          subscription={subscription}
          selectedWritingStyle={selectedWritingStyle}
        />
      )}

      {currentStep === 5 && (
        <Step5Generate
          content={content}
          selectedPaper={selectedPaper}
          selectedWritingStyle={selectedWritingStyle}
          isGenerating={isGenerating}
          onGenerate={handleGenerateClick}
          onPrevious={prevStep}
          userCredits={needsCreditCheck ? userCredits : null}
          userPlan={userPlan}
          subscription={subscription}
        />
      )}

      {/* Credit Error Dialog - Only show for free plan users */}
      <AlertDialog
        isOpen={showCreditError && needsCreditCheck}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowCreditError(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent mx={{ base: 4, md: 0 }}>
            <AlertDialogHeader fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
              Insufficient Credits
            </AlertDialogHeader>

            <AlertDialogBody>
              <VStack spacing={4} align="stretch">
                <Text fontSize={{ base: "sm", md: "md" }}>
                  You need {requiredPages} pages but only have {userCredits ? userCredits.totalCredits - userCredits.usedCredits : 0} credits remaining.
                </Text>
                <Box bg="orange.50" p={{ base: 3, md: 4 }} borderRadius="md">
                  <Text fontWeight="semibold" color="orange.800" fontSize={{ base: "sm", md: "md" }}>
                    Free Plan: 10 pages trial
                  </Text>
                  <Text color="orange.700" fontSize={{ base: "xs", md: "sm" }}>
                    Upgrade to Pro for unlimited pages!
                  </Text>
                </Box>
              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setShowCreditError(false)} size={{ base: "sm", md: "md" }}>
                Cancel
              </Button>
              <Button
                colorScheme="orange"
                onClick={handleUpgradeToPro}
                ml={3}
                size={{ base: "sm", md: "md" }}
              >
                Upgrade to Pro
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}