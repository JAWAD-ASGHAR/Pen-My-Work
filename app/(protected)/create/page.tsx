"use client"

import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
  Textarea,
  Badge,
} from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { FiGrid, FiArrowRight, FiFileText, FiDownload, FiHome, FiPlay } from "react-icons/fi"
import { useState } from "react"
import Header from "../../components/Header"
import ProgressIndicator from "../../components/ProgressIndicator"
import { RxHamburgerMenu } from "react-icons/rx"

const paperTypes = [
  {
    id: "ruled",
    name: "Ruled",
    description: "Traditional lined paper",
    icon: RxHamburgerMenu,
    preview: "/lines-page.png",
  },
  {
    id: "blank",
    name: "Blank",
    description: "Clean white paper",
    icon: FiFileText,
    preview: "/blank-page.png",
  },
  {
    id: "grid",
    name: "Grid",
    description: "Graph paper with grid lines",
    icon: FiGrid,
    preview: "/grid-page.png",
  },
]

const inkColors = [
  { id: "blue", name: "Blue", color: "#0052A3", hex: "#0052A3" },
  { id: "black", name: "Black", color: "#0A0A0A", hex: "#0A0A0A" },
  { id: "dark-gray", name: "Dark Gray", color: "#4A4A4A", hex: "#4A4A4A" },
]

export default function CreatePage() {
  // State for all steps
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPaper, setSelectedPaper] = useState("ruled")
  const [selectedInk, setSelectedInk] = useState("blue")
  const [content, setContent] = useState("")
  const [additionalQueries, setAdditionalQueries] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const maxLength = 2000
  const selectedColor = inkColors.find((ink) => ink.id === selectedInk)

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
    }, 3000)
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep1 = () => (
    <>
      <VStack spacing={8} align="center" mb={8}>
        <Heading size="2xl" color="#1A1A1A" textAlign="center">
          Choose Paper Type
        </Heading>
        <Text color="#666" textAlign="center">
          Select the type of paper for your assignment
        </Text>
      </VStack>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mb={8}>
        {paperTypes.map((paper) => (
          <Card
            key={paper.id}
            cursor="pointer"
            transition="all 0.2s"
            onClick={() => setSelectedPaper(paper.id)}
            bg={selectedPaper === paper.id ? "orange.50" : "white"}
            border="1px"
            borderColor={selectedPaper === paper.id ? "#FF6A00" : "gray.200"}
            _hover={{ shadow: "md" }}
          >
            <CardBody p={6} textAlign="center">
              <Box
                aspectRatio="3/4"
                position="relative"
                mb={4}
                bg="gray.50"
                borderRadius="lg"
                overflow="hidden"
              >
                <Image
                  src={paper.preview || "/placeholder.svg"}
                  alt={`${paper.name} paper preview`}
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              </Box>
              <HStack spacing={2} justify="center" mb={2}>
                <Icon as={paper.icon} w={5} h={5} color="#FF6A00" />
                <Heading size="md" color="#1A1A1A">
                  {paper.name}
                </Heading>
              </HStack>
              <Text fontSize="sm" color="#666">
                {paper.description}
              </Text>
            </CardBody>
          </Card>
        ))}
      </Grid>

      <Flex justify="center">
        <Button 
          bg="#FF6A00" 
          _hover={{ bg: "#FF8A33" }} 
          color="white" 
          px={8} 
          rightIcon={<Icon as={FiArrowRight} />}
          onClick={nextStep}
        >
          Next Step
        </Button>
      </Flex>
    </>
  )

  const renderStep2 = () => (
    <>
      <VStack spacing={8} align="center" mb={8}>
        <Heading size="2xl" color="#1A1A1A" textAlign="center">
          Choose Ink Color
        </Heading>
        <Text color="#666" textAlign="center">
          Select the ink color for your handwriting
        </Text>
      </VStack>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mb={8}>
        {inkColors.map((ink) => (
          <Card
            key={ink.id}
            cursor="pointer"
            transition="all 0.2s"
            onClick={() => setSelectedInk(ink.id)}
            bg={selectedInk === ink.id ? "orange.50" : "white"}
            border="1px"
            borderColor={selectedInk === ink.id ? "#FF6A00" : "gray.200"}
            _hover={{ shadow: "md" }}
          >
            <CardBody p={6} textAlign="center">
              <Box
                w="16"
                h="16"
                borderRadius="full"
                mx="auto"
                mb={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg={ink.color}
              >
                <Box w="8" h="8" bg="white" borderRadius="full"></Box>
              </Box>
              <Heading size="md" color="#1A1A1A" mb={1}>
                {ink.name}
              </Heading>
              <Text fontSize="sm" color="#666">
                {ink.hex}
              </Text>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {/* Handwriting Preview */}
      <Card bg="white" border="1px" borderColor="gray.200" mb={8}>
        <CardBody p={8}>
          <Heading size="md" color="#1A1A1A" mb={4} textAlign="center">
            Preview
          </Heading>
          <Box bg="gray.50" p={6} borderRadius="lg">
            <Text
              fontSize="2xl"
              textAlign="center"
              color={selectedColor?.color}
              fontFamily="Patrick Hand, cursive"
            >
              The quick brown fox jumps over the lazy dog
            </Text>
          </Box>
        </CardBody>
      </Card>

      <Flex justify="space-between">
        <Button 
          variant="outline" 
          borderColor="gray.200" 
          color="#666" 
          bg="transparent"
          onClick={prevStep}
        >
          <ArrowBackIcon w={4} h={4} mr={2} />
          Previous
        </Button>
        <Button 
          bg="#FF6A00" 
          _hover={{ bg: "#FF8A33" }} 
          color="white" 
          px={8} 
          rightIcon={<Icon as={FiArrowRight} />}
          onClick={nextStep}
        >
          Next Step
        </Button>
      </Flex>
    </>
  )

  const renderStep3 = () => (
    <>
      <VStack spacing={8} align="center" mb={8}>
        <Heading size="2xl" color="#1A1A1A" textAlign="center">
          Enter Content
        </Heading>
        <Text color="#666" textAlign="center">
          Paste or type your assignment text
        </Text>
      </VStack>

      <Card bg="white" border="1px" borderColor="gray.200" mb={8}>
        <CardBody p={6}>
          <Box mb={4}>
            <Text as="label" display="block" fontSize="sm" fontWeight="medium" color="#1A1A1A" mb={2}>
              Assignment Text
            </Text>
            <Textarea
              placeholder="Paste your assignment text here..."
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
              minH="300px"
              resize="none"
              borderColor="gray.300"
              _focus={{ borderColor: "#FF6A00", boxShadow: "0 0 0 1px var(--chakra-colors-orange-500)" }}
              maxLength={maxLength}
            />
            <Flex justify="space-between" align="center" mt={2}>
              <Text fontSize="sm" color="#666">
                Supports basic formatting with **bold** and *italic* text
              </Text>
              <Text fontSize="sm" color="#666">
                {content.length}/{maxLength} characters
              </Text>
            </Flex>
          </Box>
        </CardBody>
      </Card>

      <Flex justify="space-between">
        <Button 
          variant="outline" 
          borderColor="gray.200" 
          color="#666" 
          bg="transparent"
          onClick={prevStep}
        >
          <ArrowBackIcon w={4} h={4} mr={2} />
          Previous
        </Button>
        <Button 
          bg="#FF6A00" 
          _hover={{ bg: "#FF8A33" }}
          color="white"
          px={8} 
          rightIcon={<Icon as={FiArrowRight} />}
          isDisabled={!content.trim()}
          onClick={nextStep}
        >
          Next Step
        </Button>
      </Flex>
    </>
  )

  const renderStep4 = () => (
    <>
      <VStack spacing={8} align="center" mb={8}>
        <Heading size="2xl" color="#1A1A1A" textAlign="center">
          Additional Prompts  
        </Heading>
        <Text color="#666" textAlign="center">
          Add any specific instructions or prompts for the AI to generate your assignment in a particular way
        </Text>
      </VStack>

      <Card bg="white" border="1px" borderColor="gray.200" mb={8}>
        <CardBody p={8}>
          <Box>
            <Heading size="md" color="#1A1A1A" mb={4}>
              Additional Prompts (Optional)
            </Heading>
            <Text color="#666" mb={4}>
              Add any specific instructions or prompts for the AI to generate your assignment in a particular way
            </Text>
            <Textarea
              placeholder="e.g., Make it look more casual, use bullet points, add diagrams, etc..."
              value={additionalQueries}
              onChange={(e) => setAdditionalQueries(e.target.value)}
              minH="120px"
              resize="none"
              borderColor="gray.300"
              _focus={{ borderColor: "#FF6A00", boxShadow: "0 0 0 1px var(--chakra-colors-orange-500)" }}
            />
          </Box>
        </CardBody>
      </Card>

      <Flex justify="space-between">
        <Button 
          variant="outline" 
          borderColor="gray.200" 
          color="#666" 
          bg="transparent"
          onClick={prevStep}
        >
          <ArrowBackIcon w={4} h={4} mr={2} />
          Previous
        </Button>
        <Button 
          bg="#FF6A00" 
          _hover={{ bg: "#FF8A33" }}
          color="white"
          px={8} 
          rightIcon={<Icon as={FiArrowRight} />}
          onClick={nextStep}
        >
          Continue to Generate
        </Button>
      </Flex>
    </>
  )

  const renderStep5 = () => (
    <>
      <VStack spacing={8} align="center" mb={8}>
        <Heading size="2xl" color="#1A1A1A" textAlign="center">
          Generate Assignment
        </Heading>
        <Text color="#666" textAlign="center">
          Create your handwritten assignment image
        </Text>
      </VStack>

      {!isGenerated && !isGenerating && (
        <Card bg="white" border="1px" borderColor="gray.200" mb={8}>
          <CardBody p={8}>
            <VStack spacing={8} align="stretch">
              <Box>
                <Heading size="md" color="#1A1A1A" mb={4}>
                  Generation Summary
                </Heading>
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between" p={4} bg="gray.50" borderRadius="md">
                    <Text fontWeight="medium">Page Style:</Text>
                    <Badge colorScheme="orange" variant="subtle">{paperTypes.find(p => p.id === selectedPaper)?.name}</Badge>
                  </HStack>
                  <HStack justify="space-between" p={4} bg="gray.50" borderRadius="md">
                    <Text fontWeight="medium">Pages to Generate:</Text>
                    <Badge colorScheme="blue" variant="subtle">2-3 pages</Badge>
                  </HStack>
                  <HStack justify="space-between" p={4} bg="gray.50" borderRadius="md">
                    <Text fontWeight="medium">Content Length:</Text>
                    <Badge colorScheme="green" variant="subtle">~{content.length} characters</Badge>
                  </HStack>
                  <HStack justify="space-between" p={4} bg="orange.50" borderRadius="md">
                    <Text fontWeight="medium">Estimated Time:</Text>
                    <Badge colorScheme="orange">2-3 minutes</Badge>
                  </HStack>
                </VStack>
              </Box>

              <Button
                onClick={handleGenerate}
                bg="#FF6A00"
                _hover={{ bg: "#FF8A33" }}
                color="white"
                size="lg"
                w="full"
                leftIcon={<Icon as={FiPlay} />}
              >
                Generate Assignment
              </Button>
            </VStack>
          </CardBody>
        </Card>
      )}

      {isGenerating && (
        <Card bg="white" border="1px" borderColor="gray.200" mb={8}>
          <CardBody p={8} textAlign="center">
            <Box
              w="24"
              h="24"
              mx="auto"
              mb={6}
              bg="orange.50"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                w="12"
                h="12"
                border="2px"
                borderColor="#FF6A00"
                borderTop="transparent"
                borderRadius="full"
                animation="spin 1s linear infinite"
              ></Box>
            </Box>
            <Heading size="lg" color="#1A1A1A" mb={2}>
              Writing with virtual ink...
            </Heading>
            <Text color="#666" mb={4}>
              Please wait while we generate your handwritten assignment
            </Text>
            <Box w="full" bg="gray.200" borderRadius="full" h={2}>
              <Box
                bg="#FF6A00"
                h="full"
                borderRadius="full"
                animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                w="60%"
              ></Box>
            </Box>
          </CardBody>
        </Card>
      )}

      {isGenerated && (
        <VStack spacing={8}>
          <Card bg="white" border="1px" borderColor="gray.200">
            <CardBody p={6}>
              <Heading size="md" color="#1A1A1A" mb={4} textAlign="center">
                Your Handwritten Assignment
              </Heading>
              <Box aspectRatio="8.5/11" position="relative" bg="gray.50" borderRadius="lg" overflow="hidden">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="Generated handwritten assignment"
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              </Box>
            </CardBody>
          </Card>

          <Flex direction={{ base: "column", sm: "row" }} gap={4} justify="center">
            <Button bg="#FF6A00" _hover={{ bg: "#FF8A33" }} color="white" px={6} leftIcon={<Icon as={FiDownload} />}>
              Download Image
            </Button>
            <Button
              variant="outline"
              borderColor="gray.200"
              color="#666"
              bg="transparent"
              leftIcon={<Icon as={FiHome} />}
            >
              Back to Dashboard
            </Button>
          </Flex>
        </VStack>
      )}

      {!isGenerated && (
        <Flex justify="space-between">
          <Button 
            variant="outline" 
            borderColor="gray.200" 
            color="#666" 
            bg="transparent"
            onClick={prevStep}
          >
            <ArrowBackIcon w={4} h={4} mr={2} />
            Previous
          </Button>
        </Flex>
      )}
    </>
  )

  return (
    <Box minH="100vh" bg="#FDF7EE">
      <Header />
      
      <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }} py={8}>
        <ProgressIndicator currentStep={currentStep} totalSteps={5} />

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
      </Container>
    </Box>
  )
} 