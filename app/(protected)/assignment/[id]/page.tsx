"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Grid,
  Heading,
  Icon,
  Text,
  VStack,
  Badge,
  HStack,
  useToast,
} from "@chakra-ui/react";
import Paper from "@/components/Paper";
import {
  FiFileText,
  FiDownload,
  FiArrowLeft,
  FiCalendar,
  FiDroplet,
  FiFile,
} from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getAssignmentById,
  type Assignment,
} from "@/server/actions/assignments";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AssignmentDetails() {
  const params = useParams();
  const toast = useToast();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [paperContent, setPaperContent] = useState<string>("");

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        setLoading(true);
        const data = await getAssignmentById(params.id as string);
        console.log('+++++++++++++++++',data);
        setAssignment(data);
        // Set the paper content from the assignment
        if (data?.text) {
          setPaperContent(data.text);
        }
      } catch (err) {
        setError("Failed to load assignment");
        console.error("Error fetching assignment:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAssignment();
    }
  }, [params.id]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  const downloadAllImages = async () => {
    if (!assignment?.imageURLs?.length) return;

    try {
      setDownloading("all");

      // Create a zip file with all images
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      const downloadPromises = assignment.imageURLs.map(
        async (imageUrl, index) => {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          zip.file(`page-${index + 1}.png`, blob);
        }
      );

      await Promise.all(downloadPromises);
      const zipBlob = await zip.generateAsync({ type: "blob" });

      const url = window.URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `assignment-${assignment.id}-all-pages.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Download successful",
        description: `All ${assignment.imageURLs.length} pages downloaded as ZIP`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Error downloading all images:", err);
      toast({
        title: "Download failed",
        description: "Failed to download all images",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setDownloading(null);
    }
  };

  const downloadAsPDF = async () => {
    if (!assignment?.imageURLs?.length) return;

    try {
      setDownloading("pdf");

      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF();

      for (let i = 0; i < assignment.imageURLs.length; i++) {
        const imageUrl = assignment.imageURLs[i];
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });

        // Add new page for each image (except the first one)
        if (i > 0) {
          pdf.addPage();
        }

        // Calculate dimensions to fit image on page
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (297 * imgWidth) / 210; // Maintain aspect ratio

        pdf.addImage(base64, "PNG", 0, 0, imgWidth, imgHeight);
      }

      pdf.save(`assignment-${assignment.id}.pdf`);

      toast({
        title: "PDF downloaded",
        description: "Assignment downloaded as PDF successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Error creating PDF:", err);
      toast({
        title: "PDF download failed",
        description: "Failed to create PDF",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading assignment details..." />;
  }

  if (error || !assignment) {
    return (
      <Box minH="100vh" bg="#FDF7EE">
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }} py={8}>
          <VStack spacing={8} align="center" py={16}>
            <Icon as={FiFileText} w={16} h={16} color="red.400" />
            <Heading size="lg" color="#1A1A1A">
              {error || "Assignment not found"}
            </Heading>
            <Text color="#666">
              Please try again or go back to your assignments.
            </Text>
            <Link href="/home">
              <Button
                bg="#FF6A00"
                _hover={{ bg: "#FF8A33" }}
                color="white"
                leftIcon={<Icon as={FiArrowLeft} />}
              >
                Back to Assignments
              </Button>
            </Link>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="#FDF7EE">
      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }} py={8}>
        <Grid templateColumns={{ base: "1fr", lg: "400px 1fr" }} gap={8} minH="calc(100vh - 100px)">
          {/* Left Side - Fixed Section */}
          <VStack spacing={6} align="stretch" position="sticky" top={8} h="fit-content">
            {/* Main Heading */}
            <Box>
              <Heading size="xl" color="#1A1A1A" mb={2}>
                Assignment Results
              </Heading>
              <Text color="#666" fontSize="sm">
                View and download your handwritten results
              </Text>
            </Box>

            {/* Assignment Details Card */}
            <Card bg="white" border="1px" borderColor="gray.200" shadow="sm">
              <CardBody p={6}>
                <VStack spacing={4} align="stretch">
                  <Heading size="md" color="#1A1A1A">
                    Assignment Information
                  </Heading>

                  {/* Date and Time */}
                  <HStack justify="space-between">
                    <HStack>
                      <Icon as={FiCalendar} color="#FF6A00" />
                      <Text fontSize="sm" color="#666">
                        Created on
                      </Text>
                    </HStack>
                    <Text>{formatDate(assignment.createdAt)}</Text>
                  </HStack>

                  {/* Paper Type */}
                  <HStack justify="space-between">
                    <HStack>
                      <Icon as={FiFile} color="#FF6A00" />
                      <Text fontSize="sm" fontWeight="medium" color="#1A1A1A">
                        Paper Type
                      </Text>
                    </HStack>
                    <Badge colorScheme="orange" variant="subtle">
                      {assignment.paper.charAt(0).toUpperCase() +
                        assignment.paper.slice(1)}
                    </Badge>
                  </HStack>

                  {/* Ink Color */}
                  <HStack justify="space-between">
                    <HStack>
                      <Icon as={FiDroplet} color="#FF6A00" />
                      <Text fontSize="sm" fontWeight="medium" color="#1A1A1A">
                        Ink Color
                      </Text>
                    </HStack>
                    <HStack>
                      <Box
                        w="4"
                        h="4"
                        borderRadius="full"
                        bg={assignment.ink}
                        border="1px"
                        borderColor="gray.300"
                      />
                      <Text fontSize="sm" color="#666">
                        {assignment.ink}
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>

            {/* Download Options Card */}
            <Card bg="white" border="1px" borderColor="gray.200" shadow="sm">
              <CardBody p={6}>
                <VStack spacing={4} align="stretch">
                  <Heading size="md" color="#1A1A1A">
                    Download Options
                  </Heading>

                  <Button
                    onClick={downloadAllImages}
                    isLoading={downloading === "all"}
                    leftIcon={<Icon as={FiDownload} />}
                    bg="#FF6A00"
                    _hover={{ bg: "#FF8A33" }}
                    color="white"
                    size="md"
                  >
                    Download All as ZIP
                  </Button>

                  <Button
                    onClick={downloadAsPDF}
                    isLoading={downloading === "pdf"}
                    leftIcon={<Icon as={FiFileText} />}
                    variant="outline"
                    borderColor="gray.300"
                    color="#1A1A1A"
                    size="md"
                  >
                    Download as PDF
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </VStack>

          {/* Right Side - Scrollable Section */}
          <Box overflowY="auto" mt={28} maxH="calc(100vh - 100px)" bg="transparent">
            {paperContent ? (

                    <Box 
                      display="flex" 
                      justifyContent="center" 
                      alignItems="flex-start"
                      bg="transparent"
                    >
                      {/* Render the appropriate paper based on selection */}
                      <Paper
                        text={paperContent}
                        textColor={assignment.ink}
                        fontFamily="'Caveat', cursive"
                        paperType={
                          assignment.paper === "ruled" ? "lined" :
                          assignment.paper === "blank" ? "blank" :
                          assignment.paper === "grid" ? "grid" : "blank"
                        }
                      />
                    </Box>

            ) : (
              <Card bg="white" border="1px" borderColor="gray.200" shadow="sm">
                <CardBody p={8}>
                  <VStack spacing={4} align="center">
                    <Icon as={FiFileText} w={12} h={12} color="gray.400" />
                    <Text color="#666" textAlign="center">
                      No content found for this assignment.
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            )}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
