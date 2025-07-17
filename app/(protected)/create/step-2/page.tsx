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
  Text,
  VStack,
} from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { FiFileText, FiArrowRight } from "react-icons/fi"
import Link from "next/link"
import { useState } from "react"

const inkColors = [
  { id: "blue", name: "Blue", color: "#0066CC", hex: "#0066CC" },
  { id: "black", name: "Black", color: "#0A0A0A", hex: "#0A0A0A" },
  { id: "dark-gray", name: "Dark Gray", color: "#4A4A4A", hex: "#4A4A4A" },
]

export default function Step2() {
  const [selectedInk, setSelectedInk] = useState("blue")
  const selectedColor = inkColors.find((ink) => ink.id === selectedInk)

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
              bg="#FF6A00"
              color="white"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="sm"
              fontWeight="medium"
            >
              2
            </Box>
            <Box w="16" h="1" bg="gray.200" mx={2}></Box>
            <Box
              w="8"
              h="8"
              bg="gray.200"
              color="gray.500"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="sm"
            >
              3
            </Box>
            <Box w="16" h="1" bg="gray.200" mx={2}></Box>
            <Box
              w="8"
              h="8"
              bg="gray.200"
              color="gray.500"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="sm"
            >
              4
            </Box>
            <Box w="16" h="1" bg="gray.200" mx={2}></Box>
            <Box
              w="8"
              h="8"
              bg="gray.200"
              color="gray.500"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="sm"
            >
              5
            </Box>
          </Flex>
        </Box>

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
          <Link href="/create/step-1">
            <Button variant="outline" borderColor="gray.200" color="#666" bg="transparent">
              <ArrowBackIcon w={4} h={4} mr={2} />
              Previous
            </Button>
          </Link>
          <Link href="/create/step-3">
            <Button bg="#FF6A00" _hover={{ bg: "#FF8A33" }} color="white" px={8} rightIcon={<Icon as={FiArrowRight} />}>
              Next Step
            </Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  )
}
