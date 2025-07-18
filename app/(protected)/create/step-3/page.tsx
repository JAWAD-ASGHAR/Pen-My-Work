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
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { FiFileText, FiArrowRight } from "react-icons/fi"
import Link from "next/link"
import { useState } from "react"

export default function Step4() {
  const [content, setContent] = useState("")
  const maxLength = 2000

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
          <Link href="/create/step-2">
            <Button variant="outline" borderColor="gray.200" color="#666" bg="transparent">
              <ArrowBackIcon w={4} h={4} mr={2} />
              Previous
            </Button>
          </Link>
          <Link href="/create/step-4">
            <Button 
              bg="#FF6A00" 
              _hover={{ bg: "#FF8A33" }}
              color="white"
              px={8} 
              rightIcon={<Icon as={FiArrowRight} />}
              isDisabled={!content.trim()}
            >
              Next Step
            </Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  )
}
