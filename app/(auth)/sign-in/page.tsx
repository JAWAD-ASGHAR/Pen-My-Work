"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import {
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  VStack, 
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function SignInPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // Responsive size for blobs
  const blobSize = useBreakpointValue({ base: "300px", md: "384px" });

  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session) {
        router.push("/home");
      }
    });
  }, [router]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/home",
        errorCallbackURL: "/sign-in",
        newUserCallbackURL: "/home", 
      });
      
    } catch (error) {
      setError(error instanceof Error ? error.message : "Sign in failed");
      setIsLoading(false);
    }
  };

  return (
    <Box
    height="100dvh"
    overflow="hidden"
    position="relative"
    style={{
      background: "radial-gradient(ellipse at 60% 60%, #FDF7EE 30%, #FEF9F2 80%, #FDF7EE 60%), linear-gradient(120deg, #FDF7EE 0%, #FEF9F2 100%)"
    }}
  >
    {/* Back Button */}
    <Button
      onClick={() => router.push("/")}
      position="absolute"
      top={6}
      left={6}
      display="flex"
      alignItems="center"
      gap={2}
      px={4}
      py={2}
      bg="whiteAlpha.800"
      backdropFilter="blur(4px)"
      border="1px solid"
      borderColor="orange.200"
      borderRadius="xl"
      color="orange.600"
      _hover={{ bg: "white", boxShadow: "md" }}
      zIndex={10}
      variant="solid"
      size="sm"
    >
      <FiArrowLeft style={{ width: 16, height: 16 }} />
      <Text fontSize="sm" fontWeight="medium">Back to Home</Text>
    </Button>

    {/* Animated Background Blobs */}
    <Box position="absolute" inset={0} overflow="hidden" zIndex={0}>
      <Box
        position="absolute"
        top="25%"
        left="25%"
        w={blobSize}
        h={blobSize}
        bg="#F58A5A"
        opacity={0.4}
        borderRadius="full"
        filter="blur(80px)"
        zIndex={0}
      />
      <Box
        position="absolute"
        top="33%"
        right="25%"
        w={blobSize}
        h={blobSize}
        bg="#EF7446"
        opacity={0.4}
        borderRadius="full"
        filter="blur(50px)"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="28%"
        left="28%"
        w={blobSize}
        h={blobSize}
        bg="#F7A06E"
        opacity={0.4}
        borderRadius="full"
        filter="blur(50px)"
        zIndex={0}
      />
    </Box>

    <Flex minH="100vh" align="center" justify="center" position="relative" zIndex={1}>
      <Box w="full" maxW="sm">
        <Box
          backdropFilter="blur(16px)"
          bg="white"
          borderRadius="2xl"
          boxShadow="lg"
          border="1px solid"
          borderColor="orange.100"
          p={6}
          mb={6}
        >
          {/* Header */}
          <Box textAlign="center">
            <Box mx="auto" w={20} h={20} position="relative" mb={4}>
              <Image
                src="/Logo.png"
                alt="ScriptAI Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Text fontSize="2xl" fontWeight="bold" color="orange.900" mb={1}>
              Pen My Work
            </Text>
            <Text color="orange.700" fontSize="sm">
              Sign in to access your home page
            </Text>
          </Box>

          {/* Error Message */}
          {error && (
            <Box bg="red.50" border="1px solid" borderColor="red.200" borderRadius="lg" p={3} mt={4}>
              <Text color="red.600" fontSize="sm">{error}</Text>
            </Box>
          )}

          {/* Sign In Buttons */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              w="full"
              mt={6}
              bg="orange.50"
              _hover={{ bg: "orange.100" }}
              border="1px solid"
              borderColor="orange.200"
              borderRadius="xl"
              height="48px"
              color="orange.900"
            >
              {isLoading ? (
                <Spinner size="sm" color="orange.400" style={{ marginRight: 8 }} />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              {isLoading ? "Connecting..." : "Continue with Google"}
            </Button>

          {/* Features */}
          <VStack gap={2} color="orange.800" mt={6}>
            <Text fontSize="xs" fontWeight="medium" textAlign="center">
              What you&apos;ll get:
            </Text>
            <VStack gap={2} align="start">
              {["AI-powered handwriting generation", "Multiple paper styles & formats", "High-quality image downloads"].map((feature, i) => (
                <HStack key={i} gap={2} fontSize="xs">
                  <Box w={5} h={5} bg="orange.100" borderRadius="full" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                    <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20" style={{ color: "#fb923c" }}>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </Box>
                  <span>{feature}</span>
                </HStack>
              ))}
            </VStack>
          </VStack>

          {/* Footer */}
          <Box textAlign="center" color="orange.700" fontSize="xs" mt={6}>
            <Text>
              By signing in, you agree to our {" "}
              <Box as="span" display="inline">
                <a href="/terms" style={{ color: "#f97316" }} onMouseOver={e => (e.currentTarget.style.color = '#ea580c')} onMouseOut={e => (e.currentTarget.style.color = '#f97316')}>Terms of Service</a>
              </Box>
              {" and "}
              <Box as="span" display="inline">
                <a href="/privacy" style={{ color: "#f97316" }} onMouseOver={e => (e.currentTarget.style.color = '#ea580c')} onMouseOut={e => (e.currentTarget.style.color = '#f97316')}>Privacy Policy</a>
              </Box>
            </Text>
          </Box>
        </Box>

        <Box textAlign="center" mt={6}>
          <Text fontSize="xs" color="orange.800">
            Trusted by <Box as="span" fontWeight="semibold" color="orange.900" display="inline">10,000+</Box> users worldwide
          </Text>
        </Box>
      </Box>
    </Flex>
  </Box>
  );
} 