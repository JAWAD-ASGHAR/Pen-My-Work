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
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { FiArrowRight } from "react-icons/fi"
import Link from "next/link"
import { useState } from "react"
import Header from "../../../components/Header"
import ProgressIndicator from "../../../components/ProgressIndicator"

const inkColors = [
  { id: "blue", name: "Blue", color: "#0052A3", hex: "#0052A3" },
  { id: "black", name: "Black", color: "#0A0A0A", hex: "#0A0A0A" },
  { id: "dark-gray", name: "Dark Gray", color: "#4A4A4A", hex: "#4A4A4A" },
]

export default function Step2() {
  const [selectedInk, setSelectedInk] = useState("blue")
  const selectedColor = inkColors.find((ink) => ink.id === selectedInk)

  return (
    <Box minH="100vh" bg="#FDF7EE">
      <Header />
      
      <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }} py={8}>
        <ProgressIndicator currentStep={2} totalSteps={4} />

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
