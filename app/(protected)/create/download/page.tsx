"use client"

import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react"
import { ArrowBackIcon, DownloadIcon } from "@chakra-ui/icons"
import { FiFileText, FiRotateCcw, FiPlusCircle } from "react-icons/fi"
import Link from "next/link"

export default function DownloadPage() {
  return (
    <Box minH="100vh" bg="#FDF7EE">
      {/* Header */}
      <Box
        as="header"
        borderBottom="1px"
        borderColor="gray.200"
        bg="white"
        backdropFilter="blur(8px)"
        position="sticky"
        top={0}
        zIndex={10}
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
        <VStack spacing={8} align="center" mb={8}>
          <Heading size="2xl" color="#1A1A1A" textAlign="center">
            Download Your Assignment
          </Heading>
          <Text color="#666" textAlign="center">
            Your handwritten assignment is ready for download
          </Text>
        </VStack>

        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
          {/* Large Preview */}
          <GridItem>
            <Card bg="white" border="1px" borderColor="gray.200">
              <CardBody p={6}>
                <Box
                  aspectRatio="8.5/11"
                  bg="gray.100"
                  borderRadius="lg"
                  overflow="hidden"
                  position="relative"
                >
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
          </GridItem>

          {/* Download Options */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              <Card bg="white" border="1px" borderColor="gray.200">
                <CardBody p={6}>
                  <Heading size="md" color="#1A1A1A" mb={4}>
                    File Details
                  </Heading>
                  <VStack spacing={2} align="stretch">
                    <Flex justify="space-between" fontSize="sm" color="#666">
                      <Text>Resolution:</Text>
                      <Text>2480 × 3508 px</Text>
                    </Flex>
                    <Flex justify="space-between" fontSize="sm" color="#666">
                      <Text>Paper Style:</Text>
                      <Text>Ruled</Text>
                    </Flex>
                    <Flex justify="space-between" fontSize="sm" color="#666">
                      <Text>Ink Color:</Text>
                      <Text>Blue</Text>
                    </Flex>
                    <Flex justify="space-between" fontSize="sm" color="#666">
                      <Text>File Size:</Text>
                      <Text>~2.5 MB</Text>
                    </Flex>
                  </VStack>
                </CardBody>
              </Card>

              <Card bg="white" border="1px" borderColor="gray.200">
                <CardBody p={6}>
                  <Heading size="md" color="#1A1A1A" mb={4}>
                    Download Options
                  </Heading>
                  <VStack spacing={3}>
                    <Button
                      bg="#FF6A00"
                      _hover={{ bg: "#FF8A33" }}
                      color="white"
                      w="full"
                      leftIcon={<DownloadIcon />}
                      size="lg"
                    >
                      Download PNG
                    </Button>
                    <Button
                      variant="outline"
                      w="full"
                      leftIcon={<DownloadIcon />}
                      borderColor="gray.200"
                      color="#666"
                    >
                      Download PDF
                    </Button>
                  </VStack>
                </CardBody>
              </Card>

              <Card bg="white" border="1px" borderColor="gray.200">
                <CardBody p={6}>
                  <Heading size="md" color="#1A1A1A" mb={4}>
                    Actions
                  </Heading>
                  <VStack spacing={3}>
                    <Button
                      variant="outline"
                      w="full"
                      leftIcon={<Icon as={FiRotateCcw} />}
                      borderColor="gray.200"
                      color="#666"
                    >
                      Regenerate
                    </Button>
                    <Link href="/create/step-1" style={{ width: "100%" }}>
                      <Button
                        variant="outline"
                        w="full"
                        leftIcon={<Icon as={FiPlusCircle} />}
                        borderColor="gray.200"
                        color="#666"
                      >
                        Create Another
                      </Button>
                    </Link>
                  </VStack>
                </CardBody>
              </Card>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}
