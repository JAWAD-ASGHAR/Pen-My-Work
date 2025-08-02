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
} from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
import { FiPenTool, FiArrowLeft, FiMail, FiStar } from "react-icons/fi"
import { FcGoogle } from "react-icons/fc"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

// Animation keyframes
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`

export default function SignInPage() {
  const bgColor = "#FDF7EE"
  const textColor = "#1A1A1A"
  const accentColor = "#FF6A00"

  const router = useRouter();

  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session) {
        router.push("/home");
      }
    });
  }, [router]);

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/home",
      errorCallbackURL: "/sign-in",
      newUserCallbackURL: "/home",
    });
  }

  return (
    <Box minH="100vh" bg={bgColor} position="relative" overflow="hidden">
      {/* Background decorative elements */}
      <Box
        position="absolute"
        top="-10%"
        right="-10%"
        w="400px"
        h="400px"
        bgGradient="linear(45deg, #FF6A00, #FF8A33)"
        borderRadius="full"
        opacity={0.1}
        animation={`${float} 6s ease-in-out infinite`}
      />
      <Box
        position="absolute"
        bottom="-5%"
        left="-5%"
        w="300px"
        h="300px"
        bgGradient="linear(45deg, #FF8A33, #FF6A00)"
        borderRadius="full"
        opacity={0.08}
        animation={`${float} 8s ease-in-out infinite reverse`}
      />

      {/* Header */}
      <Box as="header" px={6} py={6} position="relative" zIndex={10}>
        <Container maxW="7xl">
          <Flex align="center" justify="space-between">
            <Link href="/">
              <Flex align="center" gap={3} cursor="pointer" _hover={{ transform: "scale(1.05)" }} transition="transform 0.2s">
                <Box
                  p={2}
                  bgGradient="linear(45deg, #FF6A00, #FF8A33)"
                  borderRadius="xl"
                  boxShadow="lg"
                >
                  <Icon as={FiPenTool} h={6} w={6} color="white" />
                </Box>
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
                _hover={{ bg: "whiteAlpha.300", transform: "translateX(-2px)" }}
                transition="all 0.2s"
                borderRadius="full"
                px={6}
              >
                Back to Home
              </Button>
            </Link>
          </Flex>
        </Container>
      </Box>

      {/* Sign In Section */}
      <Box as="section" px={6} py={16} position="relative" zIndex={10}>
        <Container maxW="lg">
          <VStack spacing={10}>
            {/* Welcome Card */}
            <Card 
              bg="white" 
              shadow="2xl" 
              borderRadius="3xl" 
              w="full"
              border="1px"
              borderColor="whiteAlpha.200"
              backdropFilter="blur(10px)"
              _hover={{ transform: "translateY(-2px)", shadow: "3xl" }}
              transition="all 0.3s ease"
            >
              <CardBody p={10}>
                <VStack spacing={10} textAlign="center">
                  {/* Header */}
                  <VStack spacing={6}>
                    <Box
                      w="20"
                      h="20"
                      bgGradient="linear(45deg, #FF6A00, #FF8A33)"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      boxShadow="xl"
                      animation={`${pulse} 3s ease-in-out infinite`}
                      position="relative"
                    >
                      <Icon as={FiMail} w={10} h={10} color="white" />
                      <Box
                        position="absolute"
                        top="-2"
                        right="-2"
                        w="6"
                        h="6"
                        bg="green.400"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        animation={`${pulse} 2s ease-in-out infinite`}
                      >
                        <Icon as={FiStar} w={3} h={3} color="white" />
                      </Box>
                    </Box>
                    <VStack spacing={3}>
                      <Heading size="xl" color={textColor} fontWeight="bold">
                        Welcome to ScriptAI
                      </Heading>
                      <Text color="#666" fontSize="lg" maxW="md">
                        Sign in with Google to start creating beautiful handwritten content
                      </Text>
                    </VStack>
                  </VStack>

                  {/* Sign In Options */}
                  <VStack spacing={6} w="full">
                    <Button
                      w="full"
                      h={16}
                      bg="white"
                      border="2px"
                      borderColor="gray.200"
                      _hover={{ 
                        borderColor: accentColor, 
                        bg: "gray.50",
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                        _before: { left: "100%" }
                      }}
                      _active={{ bg: "gray.100" }}
                      leftIcon={<FcGoogle size={24} />}
                      onClick={handleGoogleSignIn}
                      fontWeight="semibold"
                      fontSize="lg"
                      borderRadius="xl"
                      transition="all 0.2s ease"
                      position="relative"
                      overflow="hidden"
                      _before={{
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                        transition: "left 0.5s",
                      }}
                    >
                      Continue with Google
                    </Button>
                  </VStack>

                  {/* Terms */}
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
              </CardBody>
            </Card>

          </VStack>
        </Container>
      </Box>
    </Box>
  )
} 