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
  Text,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react"
import { FiPenTool, FiArrowLeft, FiMail } from "react-icons/fi"
import { FcGoogle } from "react-icons/fc"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const bgColor = "#FDF7EE"
  const textColor = "#1A1A1A"
  const accentColor = "#FF6A00"
  const accentHoverColor = "#FF8A33"
  const router = useRouter()
  const toast = useToast()

  const handleGoogleSignIn = () => {
    // Redirect to the Better Auth Google sign-in endpoint
    window.location.href = "/api/auth/signin/google"
  }

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Header */}
      <Box as="header" px={6} py={4}>
        <Container maxW="7xl">
          <Flex align="center" justify="space-between">
            <Link href="/">
              <Flex align="center" gap={2} cursor="pointer">
                <Icon as={FiPenTool} h={8} w={8} color={accentColor} />
                <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                  ScriptAI
                </Text>
              </Flex>
            </Link>
            <Link href="/">
              <Button
                variant="ghost"
                leftIcon={<Icon as={FiArrowLeft} />}
                color={textColor}
                _hover={{ bg: "whiteAlpha.200" }}
              >
                Back to Home
              </Button>
            </Link>
          </Flex>
        </Container>
      </Box>

      {/* Sign In Section */}
      <Box as="section" px={6} py={20}>
        <Container maxW="md">
          <VStack spacing={8}>
            {/* Welcome Card */}
            <Card bg="white" shadow="2xl" borderRadius="3xl" w="full">
              <CardBody p={8}>
                <VStack spacing={8} textAlign="center">
                  {/* Header */}
                  <VStack spacing={4}>
                    <Box
                      w="16"
                      h="16"
                      bg={accentColor}
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FiMail} w={8} h={8} color="white" />
                    </Box>
                    <VStack spacing={2}>
                      <Heading size="xl" color={textColor}>
                        Welcome to ScriptAI
                      </Heading>
                      <Text color="#666" fontSize="lg">
                        Sign in with Google to start creating beautiful handwritten content
                      </Text>
                    </VStack>
                  </VStack>

                  {/* Google Sign In Button */}
                  <VStack spacing={6} w="full">
                    <Button
                      w="full"
                      h={14}
                      bg="white"
                      border="2px"
                      borderColor="gray.200"
                      _hover={{ borderColor: accentColor, bg: "gray.50" }}
                      _active={{ bg: "gray.100" }}
                      leftIcon={<FcGoogle size={24} />}
                      onClick={handleGoogleSignIn}
                      fontWeight="medium"
                      fontSize="lg"
                    >
                      Continue with Google
                    </Button>

                    <Text fontSize="sm" color="gray.500" textAlign="center" lineHeight="relaxed">
                      By signing in, you agree to our{" "}
                      <Text as="span" color={accentColor} cursor="pointer" _hover={{ textDecoration: "underline" }}>
                        Terms of Service
                      </Text>{" "}
                      and{" "}
                      <Text as="span" color={accentColor} cursor="pointer" _hover={{ textDecoration: "underline" }}>
                        Privacy Policy
                      </Text>
                    </Text>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>

            {/* Features Preview */}
            <Card bg="white" shadow="lg" borderRadius="2xl" w="full">
              <CardBody p={6}>
                <VStack spacing={4} textAlign="center">
                  <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                    What you&apos;ll get:
                  </Text>
                  <VStack spacing={3} align="start" w="full">
                    <HStack spacing={3}>
                      <Box w={2} h={2} bg={accentColor} borderRadius="full" />
                      <Text fontSize="sm" color="#666">
                        Unlimited handwritten document creation
                      </Text>
                    </HStack>
                    <HStack spacing={3}>
                      <Box w={2} h={2} bg={accentColor} borderRadius="full" />
                      <Text fontSize="sm" color="#666">
                        Multiple handwriting styles and templates
                      </Text>
                    </HStack>
                    <HStack spacing={3}>
                      <Box w={2} h={2} bg={accentColor} borderRadius="full" />
                      <Text fontSize="sm" color="#666">
                        Export to PDF, PNG, and other formats
                      </Text>
                    </HStack>
                    <HStack spacing={3}>
                      <Box w={2} h={2} bg={accentColor} borderRadius="full" />
                      <Text fontSize="sm" color="#666">
                        Save and organize your projects
                      </Text>
                    </HStack>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
} 