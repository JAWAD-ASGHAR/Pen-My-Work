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
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { FiFileText, FiArrowRight } from "react-icons/fi"
import Link from "next/link"
import { useState } from "react"

export default function Step3() {
  const [headingStyle, setHeadingStyle] = useState("normal")
  const [textSpacing, setTextSpacing] = useState("normal")
  const [textSize, setTextSize] = useState("medium")

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
              bg="#FF6A00"
              color="white"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="sm"
              fontWeight="medium"
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
            Heading & Text Styles
          </Heading>
          <Text color="#666" textAlign="center">
            Customize the appearance of your handwriting
          </Text>
        </VStack>

        <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={8} mb={8}>
          {/* Heading Style */}
          <Card bg="white" border="1px" borderColor="gray.200">
            <CardBody p={6}>
              <Heading size="md" color="#1A1A1A" mb={4}>
                Heading Style
              </Heading>
              <RadioGroup value={headingStyle} onChange={setHeadingStyle}>
                <Stack spacing={3}>
                  <Radio value="normal">Normal</Radio>
                  <Radio value="underlined">Underlined</Radio>
                  <Radio value="caps">All Caps</Radio>
                </Stack>
              </RadioGroup>
            </CardBody>
          </Card>

          {/* Text Spacing */}
          <Card bg="white" border="1px" borderColor="gray.200">
            <CardBody p={6}>
              <Heading size="md" color="#1A1A1A" mb={4}>
                Text Spacing
              </Heading>
              <RadioGroup value={textSpacing} onChange={setTextSpacing}>
                <Stack spacing={3}>
                  <Radio value="normal">Normal</Radio>
                  <Radio value="wide">Wide</Radio>
                </Stack>
              </RadioGroup>
            </CardBody>
          </Card>

          {/* Text Size */}
          <Card bg="white" border="1px" borderColor="gray.200" gridColumn={{ lg: "span 2" }}>
            <CardBody p={6}>
              <Heading size="md" color="#1A1A1A" mb={4}>
                Text Size
              </Heading>
              <RadioGroup value={textSize} onChange={setTextSize}>
                <HStack spacing={8}>
                  <Radio value="small">Small</Radio>
                  <Radio value="medium">Medium</Radio>
                  <Radio value="large">Large</Radio>
                </HStack>
              </RadioGroup>
            </CardBody>
          </Card>
        </Grid>

        {/* Live Preview */}
        <Card bg="white" border="1px" borderColor="gray.200" mb={8}>
          <CardBody p={8}>
            <Heading size="md" color="#1A1A1A" mb={4} textAlign="center">
              Live Preview
            </Heading>
            <Box bg="gray.50" p={6} borderRadius="lg">
              <Box mb={4}>
                <Text
                  color="#FF6A00"
                  textAlign="center"
                  fontSize={
                    textSize === "small" ? "lg" : textSize === "large" ? "2xl" : "xl"
                  }
                  textTransform={headingStyle === "caps" ? "uppercase" : "none"}
                  textDecoration={headingStyle === "underlined" ? "underline" : "none"}
                  fontFamily="Patrick Hand, cursive"
                >
                  Assignment Title
                </Text>
              </Box>
              <Text
                color="#FF6A00"
                fontSize={
                  textSize === "small" ? "sm" : textSize === "large" ? "lg" : "md"
                }
                lineHeight={textSpacing === "wide" ? "loose" : "normal"}
                fontFamily="Patrick Hand, cursive"
              >
                This is a sample paragraph showing how your handwritten text will appear with the selected styles. The
                spacing and size will be applied consistently throughout your assignment.
              </Text>
            </Box>
          </CardBody>
        </Card>

        <Flex justify="space-between">
          <Link href="/create/step-2">
            <Button variant="outline" borderColor="gray.200" color="#666" bg="transparent">
              <ArrowBackIcon w={4} h={4} mr={2} />
              Previous
            </Button>
          </Link>
          <Link href="/create/step-4">
            <Button bg="#FF6A00" _hover={{ bg: "#FF8A33" }} color="white" px={8} rightIcon={<Icon as={FiArrowRight} />}>
              Next Step
            </Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  )
}
