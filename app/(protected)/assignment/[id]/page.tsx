"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Heading,
  Icon,
  Text,
  VStack,
  Badge,
  HStack,
  useToast,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import {
  FiFileText,
  FiDownload,
  FiArrowLeft,
  FiCalendar,
  FiDroplet,
  FiImage,
  FiFile,
  FiMenu,
} from "react-icons/fi";
import Link from "next/link";
import { charCount } from "@/utils/char-count";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getAssignmentById,
  type Assignment,
} from "@/server/actions/assignments";
import LoadingSpinner from "@/components/LoadingSpinner";
import Paper from "@/components/Paper";
import { toPng } from "html-to-image";
import { useRef } from "react";
import JSZip from "jszip";
import jsPDF from "jspdf";
import { writingStyles } from "@/data/styles";

export default function AssignmentDetails() {
  const params = useParams();
  const toast = useToast();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Add refs for each page
  const paperRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        setLoading(true);
        const data = await getAssignmentById(params.id as string);
        setAssignment(data);
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

  const downloadImage = async (index: number) => {
    try {
      setDownloading(`image-${index}`);
      const paperNode = paperRefs.current[index];
      if (!paperNode) throw new Error("Paper not found");
      const dataUrl = await toPng(paperNode, { 
        backgroundColor: '#ffffff',
        quality: 1.0,
        width: 595,
        height: 842
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `assignment-page-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Download successful",
        description: `Page ${index + 1} downloaded successfully`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Error downloading image:", err);
      toast({
        title: "Download failed",
        description: "Failed to download the image",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setDownloading(null);
    }
  };

  const downloadAllImages = async () => {
    if (!assignment) return;
    try {
      setDownloading("all");
      const zip = new JSZip();
      // Render each Paper to PNG and add to zip
      for (let i = 0; i < paperRefs.current.length; i++) {
        const paperNode = paperRefs.current[i];
        if (!paperNode) continue;
        const dataUrl = await toPng(paperNode, { 
          backgroundColor: '#ffffff',
          quality: 1.0,
          width: 595,
          height: 842
        });
        // Remove prefix for zip
        const imgData = dataUrl.split(",")[1];
        zip.file(`assignment-page-${i + 1}.png`, imgData, { base64: true });
      }
      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "assignment-pages.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Download successful",
        description: `All pages downloaded as ZIP`,
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
    if (!assignment) return;
    try {
      setDownloading("pdf");
      const pdf = new jsPDF({ unit: "px", format: [595, 842] }); // A4 size in px
      for (let i = 0; i < paperRefs.current.length; i++) {
        const paperNode = paperRefs.current[i];
        if (!paperNode) continue;
        const imgData = await toPng(paperNode, { 
          backgroundColor: '#ffffff',
          quality: 1.0,
          width: 595,
          height: 842
        });
        if (i > 0) pdf.addPage([595, 842], "p");
        pdf.addImage(imgData, "PNG", 0, 0, 595, 842);
      }
      pdf.save("assignment.pdf");
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

  // Assignment Information Component
  const AssignmentInfo = () => (
    <VStack spacing={6} align="stretch">
      {/* Assignment Details Card */}
      <Card bg="white" border="1px" borderColor="gray.200">
        <CardBody p={{ base: 4, md: 6 }}>
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
              <Text fontSize="sm">{formatDate(assignment!.createdAt)}</Text>
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
                {assignment!.paper.charAt(0).toUpperCase() + assignment!.paper.slice(1)}
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
              <Badge colorScheme="blue" variant="subtle">
                {assignment!.ink.charAt(0).toUpperCase() + assignment!.ink.slice(1)}
              </Badge>
            </HStack>

            {/* Special Query */}
            {assignment!.specialQuery && (
              <HStack justify="space-between" align="start">
                <HStack>
                  <Icon as={FiFileText} color="#FF6A00" />
                  <Text fontSize="sm" fontWeight="medium" color="#1A1A1A">
                    Additional Instructions
                  </Text>
                </HStack>
                <Text fontSize="sm" color="#666" maxW="200px" textAlign="right">
                  {assignment!.specialQuery}
                </Text>
              </HStack>
            )}
          </VStack>
        </CardBody>
      </Card>

      {/* Download Options Card - Desktop Only */}
      <Card bg="white" border="1px" borderColor="gray.200" display={{ base: "none", lg: "block" }}>
        <CardBody p={{ base: 4, md: 6 }}>
          <VStack spacing={4} align="stretch">
            <Heading size="md" color="#1A1A1A">
              Download Options
            </Heading>

            <Button
              onClick={downloadAsPDF}
              isLoading={downloading === "pdf"}
              leftIcon={<Icon as={FiFileText} />}
              bg="#FF6A00"
              _hover={{ bg: "#FF8A33" }}
              color="white"
              size="md"
            >
              Download as PDF
            </Button>

            <Button
              onClick={downloadAllImages}
              isLoading={downloading === "all"}
              leftIcon={<Icon as={FiDownload} />}
              variant="outline"
              borderColor="gray.300"
              color="#1A1A1A"
              size="md"
            >
              Download All as ZIP
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  if (loading) {
    return <LoadingSpinner />;
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

  // Split text into pages for rendering
  const { pages: textPages } = charCount(assignment.text, assignment.writingStyle);

  return (
    <Box minH="100vh" bg="#FDF7EE" overflow="hidden">
      {/* Mobile Header with Menu Button and Download Options */}
      <Box 
        display={{ base: "flex", lg: "none" }} 
        bg="white" 
        borderBottom="1px" 
        borderColor="gray.200"
        p={4}
        position="sticky"
        top={0}
        zIndex={4}
      >
        <VStack spacing={3} w="full">
          {/* Top Row - Navigation */}
          <HStack justify="space-between" w="full">
            <Link href="/home">
              <Button
                variant="ghost"
                color="#666"
                size="sm"
                leftIcon={<Icon as={FiArrowLeft} />}
              >
                Back
              </Button>
            </Link>
            <Heading size="md" color="#1A1A1A">
              Assignment Details
            </Heading>
            <Button
              variant="ghost"
              color="#666"
              size="sm"
              onClick={onOpen}
              leftIcon={<Icon as={FiMenu} />}
            >
              Info
            </Button>
          </HStack>
          
          {/* Bottom Row - Download Buttons */}
          <HStack justify="center" w="full" spacing={3}>
            <Button
              onClick={downloadAsPDF}
              isLoading={downloading === "pdf"}
              leftIcon={<Icon as={FiFileText} />}
              bg="#FF6A00"
              _hover={{ bg: "#FF8A33" }}
              color="white"
              size="sm"
              flex={1}
              maxW="140px"
            >
              Download PDF
            </Button>
            <Button
              onClick={downloadAllImages}
              isLoading={downloading === "all"}
              leftIcon={<Icon as={FiDownload} />}
              variant="outline"
              borderColor="gray.300"
              color="#1A1A1A"
              size="sm"
              flex={1}
              maxW="140px"
            >
              Download ZIP
            </Button>
          </HStack>
        </VStack>
      </Box>

      {/* Mobile Drawer for Assignment Info */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Assignment Information</DrawerHeader>
          <DrawerBody p={4}>
            <AssignmentInfo />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Container maxW="7xl" px={{ base: 2, sm: 4, lg: 8 }} py={{ base: 4, md: 6 }} overflow="hidden">
        <Grid
          templateColumns={{ base: "1fr", lg: "400px 1fr" }}
          gap={{ base: 4, lg: 8 }}
          minH="calc(100vh - 80px)"
          overflow="hidden"
        >
          {/* Left Sidebar - Desktop Only */}
          <GridItem display={{ base: "none", lg: "block" }} overflow="hidden">
            <Box position="sticky" top={6} overflow="hidden">
              <AssignmentInfo />
            </Box>
          </GridItem>

          {/* Right Side - Content */}
          <GridItem overflow="hidden">
            <VStack spacing={6} align="stretch" overflow="hidden">
              <Heading size="lg" color="#1A1A1A" display={{ base: "none", lg: "block" }}>
                Generated Pages ({textPages.length})
              </Heading>
              
              {textPages.length > 0 ? (
                <VStack spacing={6} align="stretch" overflow="hidden">
                  {textPages.map((pageContent, index) => (
                    <Card
                      key={index}
                      bg="white"
                      border="1px"
                      borderColor="gray.200"
                      shadow="md"
                      _hover={{ shadow: "lg" }}
                      transition="shadow"
                      overflow="hidden"
                    >
                      <CardBody p={{ base: 3, md: 6 }} overflow="hidden">
                        <VStack spacing={4} align="stretch" overflow="hidden">
                          <HStack justify="space-between">
                            <Text fontSize="lg" fontWeight="semibold" color="#1A1A1A">
                              Page {index + 1}
                            </Text>
                            <Button
                              size="sm"
                              onClick={() => downloadImage(index)}
                              isLoading={downloading === `image-${index}`}
                              leftIcon={<Icon as={FiDownload} />}
                              variant="ghost"
                              color="#FF6A00"
                              _hover={{ bg: "orange.50" }}
                            >
                              Download
                            </Button>
                          </HStack>
                          
                          <Box 
                            bg="gray.50" 
                            borderRadius="lg" 
                            p={{ base: 1, md: 4 }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            overflow="hidden"
                            w="full"
                          >
                            <Paper
                              text={pageContent}
                              textColor={assignment.ink}
                              fontFamily={writingStyles.find(style => style.id === assignment.writingStyle)?.fontFamily || ''}
                              paperType={
                                assignment.paper === "ruled" ? "lined" :
                                assignment.paper === "blank" ? "blank" :
                                assignment.paper === "grid" ? "grid" : "blank"
                              }
                              paperRef={(el: HTMLDivElement | null) => { paperRefs.current[index] = el; }}
                            />
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              ) : (
                <Card bg="white" border="1px" borderColor="gray.200">
                  <CardBody p={8}>
                    <VStack spacing={4} align="center">
                      <Icon as={FiImage} w={12} h={12} color="gray.400" />
                      <Text color="#666" textAlign="center">
                        No content found for this assignment.
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              )}
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
