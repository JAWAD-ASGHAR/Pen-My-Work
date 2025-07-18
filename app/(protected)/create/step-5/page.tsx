"use client"

import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { FiDownload, FiHome, FiPlay } from "react-icons/fi"
import Link from "next/link"
import { useState } from "react"
import Header from "../../../components/Header"
import ProgressIndicator from "../../../components/ProgressIndicator"

export default function Step5() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
    }, 3000)
  }

  return (
    <Box minH="100vh" bg="#FDF7EE">
      <Header />
      
      <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }} py={8}>
        <ProgressIndicator currentStep={5} totalSteps={5} />

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
                      <Badge colorScheme="orange" variant="subtle">Ruled</Badge>
                    </HStack>
                    <HStack justify="space-between" p={4} bg="gray.50" borderRadius="md">
                      <Text fontWeight="medium">Pages to Generate:</Text>
                      <Badge colorScheme="blue" variant="subtle">2-3 pages</Badge>
                    </HStack>
                    <HStack justify="space-between" p={4} bg="gray.50" borderRadius="md">
                      <Text fontWeight="medium">Content Length:</Text>
                      <Badge colorScheme="green" variant="subtle">~800 characters</Badge>
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
              <Link href="/create/download">
                <Button bg="#FF6A00" _hover={{ bg: "#FF8A33" }} color="white" px={6} leftIcon={<Icon as={FiDownload} />}>
                  Download Image
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  borderColor="gray.200"
                  color="#666"
                  bg="transparent"
                  leftIcon={<Icon as={FiHome} />}
                >
                  Back to Dashboard
                </Button>
              </Link>
            </Flex>
          </VStack>
        )}

        {!isGenerated && (
          <Flex justify="space-between">
            <Link href="/create/step-4">
              <Button variant="outline" borderColor="gray.200" color="#666" bg="transparent">
                <ArrowBackIcon w={4} h={4} mr={2} />
                Previous
              </Button>
            </Link>
          </Flex>
        )}
      </Container>
    </Box>
  )
} 