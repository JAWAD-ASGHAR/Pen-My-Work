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
} from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { FiFileText, FiGrid, FiMinus, FiArrowRight } from "react-icons/fi"
import Link from "next/link"
import { useState } from "react"

const paperTypes = [
  {
    id: "ruled",
    name: "Ruled",
    description: "Traditional lined paper",
    icon: FiMinus,
    preview: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "blank",
    name: "Blank",
    description: "Clean white paper",
    icon: FiFileText,
    preview: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "grid",
    name: "Grid",
    description: "Graph paper with grid lines",
    icon: FiGrid,
    preview: "/placeholder.svg?height=200&width=150",
  },
]

export default function Step1() {
  const [selectedPaper, setSelectedPaper] = useState("ruled")

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
              bg="#FF6A00"
              color="white"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="sm"
              fontWeight="medium"
            >
              1
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
          <Link href="/create/step-2">
            <Button bg="#FF6A00" _hover={{ bg: "#FF8A33" }} color="white" px={8} rightIcon={<Icon as={FiArrowRight} />}>
              Next Step
            </Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  )
}
