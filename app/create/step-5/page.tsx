"use client"

import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { FiFileText, FiDownload, FiRotateCcw, FiHome } from "react-icons/fi"
import Link from "next/link"
import { useState } from "react"

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
      {/* Header */}
      <Box
        as="header"
        borderBottom="1px"
        borderColor="gray.200"
        bg="white"
        backdropFilter="blur(8px)"
      >
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <Flex justify="space-between" align="center" h="16">
            <HStack spacing={2}>
              <Icon as={FiFileText} h={8} w={8} color="#FF6A00" />
              <Heading size="lg" color="#1A1A1A" fontFamily="sans">
                Scribbly
              </Heading>
            </HStack>
            <Link href="/">
              <Button variant="ghost" color="#666">
                <ArrowBackIcon w={4} h={4} mr={2} />
                Back to Dashboard
              </Button>
            </Link>
          </Flex>
        </Container>
      </Box>

      <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }} py={8}>
        {/* Progress indicator */}
        <Box mb={8}>
          <Flex align="center" justify="center" gap={2} mb={4}>
            <Box
              w="8"
              h="8"
              bg="green.500"
              color="white"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="sm"
              fontWeight="medium"
            >
              ✓
            </Box>
            <Box w="16" h="1" bg="green.500" mx={2}></Box>
            <Box
              w="8"
              h="8"
              bg="green.500"
              color="white"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="sm"
              fontWeight="medium"
            >
              ✓
            </Box>
            <Box w="16" h="1" bg="green.500" mx={2}></Box>
            <Box
              w="8"
              h="8"
              bg="green.500"
              color="white"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="sm"
              fontWeight="medium"
            >
              ✓
            </Box>
            <Box w="16" h="1" bg="green.500" mx={2}></Box>
            <Box
              w="8"
              h="8"
              bg="green.500"
              color="white"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="sm"
              fontWeight="medium"
            >
              ✓
            </Box>
            <Box w="16" h="1" bg="green.500" mx={2}></Box>
            <Box
              w="8"
              h="8"
              bg="#FF6A00"
              color="white"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="sm"
              fontWeight="medium"
            >
              5
            </Box>
          </Flex>
        </Box>

        <VStack spacing={8} align="center" mb={8}>
          <Heading size="2xl" color="#1A1A1A" textAlign="center">
            Generate & Preview
          </Heading>
          <Text color="#666" textAlign="center">
            Create your handwritten assignment image
          </Text>
        </VStack>

        {!isGenerated && !isGenerating && (
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
                <Icon as={FiFileText} w={12} h={12} color="#FF6A00" />
              </Box>
              <Heading size="lg" color="#1A1A1A" mb={2}>
                Ready to Generate
              </Heading>
              <Text color="#666" mb={6}>
                Your assignment is ready to be converted to handwritten format
              </Text>
              <Button
                onClick={handleGenerate}
                bg="#FF6A00"
                _hover={{ bg: "#FF8A33" }}
                color="white"
                px={8}
                py={3}
                fontSize="lg"
              >
                Generate Assignment
              </Button>
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
              <Button
                variant="outline"
                borderColor="gray.200"
                color="#666"
                bg="transparent"
                leftIcon={<Icon as={FiRotateCcw} />}
                onClick={() => {
                  setIsGenerated(false)
                  setIsGenerating(false)
                }}
              >
                Regenerate
              </Button>
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
