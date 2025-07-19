"use client"

import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
  Badge,
  Divider,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { FiFileText, FiDownload, FiArrowLeft, FiCalendar, FiDroplet, FiImage, FiFile } from "react-icons/fi"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getAssignmentById, type Assignment } from "@/server/actions/assignments"
import LoadingSpinner from "../../../components/LoadingSpinner"


export default function AssignmentDetails() {
  const params = useParams()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [downloading, setDownloading] = useState<string | null>(null)
  const [selectedPage, setSelectedPage] = useState<{ url: string; index: number } | null>(null)

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        setLoading(true)
        const data = await getAssignmentById(params.id as string)
        setAssignment(data)
      } catch (err) {
        setError("Failed to load assignment")
        console.error("Error fetching assignment:", err)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchAssignment()
    }
  }, [params.id])

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date))
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(date))
  }

  const getStylesText = (assignment: Assignment) => {
    const parts = []
    if (assignment.paper) parts.push(assignment.paper)
    if (assignment.ink) parts.push(assignment.ink)
    return parts.join(" | ")
  }

  const getInkColor = (ink: string) => {
    switch (ink.toLowerCase()) {
      case 'blue':
        return '#0052A3'
      case 'black':
        return '#0A0A0A'
      case 'dark-gray':
        return '#4A4A4A'
      default:
        return '#0A0A0A'
    }
  }

  const openPageModal = (imageUrl: string, index: number) => {
    setSelectedPage({ url: imageUrl, index })
    onOpen()
  }

  const downloadImage = async (imageUrl: string, index: number) => {
    try {
      setDownloading(`image-${index}`)
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `assignment-${assignment?.id}-page-${index + 1}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast({
        title: "Download successful",
        description: `Page ${index + 1} downloaded successfully`,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } catch (err) {
      console.error("Error downloading image:", err)
      toast({
        title: "Download failed",
        description: "Failed to download the image",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setDownloading(null)
    }
  }

  const downloadAllImages = async () => {
    if (!assignment?.imageURLs?.length) return

    try {
      setDownloading('all')
      
      // Create a zip file with all images
      const JSZip = (await import('jszip')).default
      const zip = new JSZip()
      
      const downloadPromises = assignment.imageURLs.map(async (imageUrl, index) => {
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        zip.file(`page-${index + 1}.png`, blob)
      })
      
      await Promise.all(downloadPromises)
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      
      const url = window.URL.createObjectURL(zipBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `assignment-${assignment.id}-all-pages.zip`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast({
        title: "Download successful",
        description: `All ${assignment.imageURLs.length} pages downloaded as ZIP`,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } catch (err) {
      console.error("Error downloading all images:", err)
      toast({
        title: "Download failed",
        description: "Failed to download all images",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setDownloading(null)
    }
  }

  const downloadAsPDF = async () => {
    if (!assignment?.imageURLs?.length) return

    try {
      setDownloading('pdf')
      
      const { jsPDF } = await import('jspdf')
      const pdf = new jsPDF()
      
      for (let i = 0; i < assignment.imageURLs.length; i++) {
        const imageUrl = assignment.imageURLs[i]
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(blob)
        })
        
        // Add new page for each image (except the first one)
        if (i > 0) {
          pdf.addPage()
        }
        
        // Calculate dimensions to fit image on page
        const imgWidth = 210 // A4 width in mm
        const imgHeight = (297 * imgWidth) / 210 // Maintain aspect ratio
        
        pdf.addImage(base64, 'PNG', 0, 0, imgWidth, imgHeight)
      }
      
      pdf.save(`assignment-${assignment.id}.pdf`)
      
      toast({
        title: "PDF downloaded",
        description: "Assignment downloaded as PDF successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } catch (err) {
      console.error("Error creating PDF:", err)
      toast({
        title: "PDF download failed",
        description: "Failed to create PDF",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setDownloading(null)
    }
  }

  if (loading) {
    return <LoadingSpinner message="Loading assignment details..." />
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
            <Text color="#666">Please try again or go back to your assignments.</Text>
            <Link href="/home">
              <Button bg="#FF6A00" _hover={{ bg: "#FF8A33" }} color="white" leftIcon={<Icon as={FiArrowLeft} />}>
                Back to Assignments
              </Button>
            </Link>
          </VStack>
        </Container>
      </Box>
    )
  }

  return (
    <>
      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }} py={8}>
      <VStack spacing={2} align="start" mb={8}>
              <Heading size="xl" color="#1A1A1A">
                Assignment Results
              </Heading>
              <Text color="#666">
                View and download your handwritten assignment results
              </Text>
            </VStack>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 2fr" }} gap={8} minH="calc(100vh - 200px)">
          {/* Left Side - Assignment Info */}
          <VStack spacing={6} align="stretch">
            
          </VStack>

          {/* Right Side - Generated Pages */}
          <VStack spacing={6} align="stretch">
         
          </VStack>
        </Grid>
      </Container>

      {/* Page Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalCloseButton 
            color="white" 
            bg="blackAlpha.600" 
            _hover={{ bg: "blackAlpha.700" }}
            borderRadius="full"
            zIndex={10}
          />
          <ModalBody p={0}>
            {selectedPage && (
              <Box position="relative">
                <Image
                  src={selectedPage.url}
                  alt={`Page ${selectedPage.index + 1}`}
                  w="full"
                  objectFit="contain"
                  bg="gray.50"
                  maxH="90vh"
                />
                
                {/* Page info overlay */}
                <Box
                  position="absolute"
                  top={4}
                  left={4}
                  bg="blackAlpha.700"
                  color="white"
                  px={3}
                  py={2}
                  borderRadius="md"
                  fontSize="sm"
                  fontWeight="medium"
                >
                  Page {selectedPage.index + 1}
                </Box>
                
                {/* Download button overlay */}
                <Box
                  position="absolute"
                  bottom={4}
                  right={4}
                >
                  <Button
                    onClick={() => downloadImage(selectedPage.url, selectedPage.index)}
                    isLoading={downloading === `image-${selectedPage.index}`}
                    size="md"
                    bg="white"
                    _hover={{ bg: "gray.50" }}
                    color="#1A1A1A"
                    leftIcon={<Icon as={FiDownload} />}
                    boxShadow="0 4px 12px rgba(0,0,0,0.15)"
                  >
                    Download
                  </Button>
                </Box>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
