"use client";

import { Box, Container, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function TermsPage() {
  const router = useRouter();

  return (
    <Box
      minH="100vh"
      bg="#FDF7EE"
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

      <Container maxW="4xl" py={20} px={6}>
        <VStack spacing={8} align="start">
          <Box textAlign="center" w="full">
            <Heading fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" color="orange.900" mb={4}>
              Terms of Service
            </Heading>
            <Text color="orange.700" fontSize="lg">
              Last updated: July 2025
            </Text>
          </Box>

          <Box
            bg="white"
            borderRadius="2xl"
            p={8}
            shadow="lg"
            border="1px solid"
            borderColor="orange.100"
            w="full"
          >
            <VStack spacing={6} align="start">
              <Box>
                <Heading fontSize="xl" fontWeight="bold" color="orange.900" mb={3}>
                  1. Acceptance of Terms
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  By accessing and using Pen My Work &ldquo;the Service&rdquo;, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </Text>
              </Box>

              <Box>
                <Heading fontSize="xl" fontWeight="bold" color="orange.900" mb={3}>
                  2. Description of Service
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  Pen My Work is an AI-powered handwriting generation service that transforms typed text into authentic handwritten pages. Our service includes various handwriting styles, paper types, and formatting options.
                </Text>
              </Box>

              <Box>
                <Heading fontSize="xl" fontWeight="bold" color="orange.900" mb={3}>
                  3. User Accounts
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                </Text>
              </Box>

              <Box>
                <Heading fontSize="xl" fontWeight="bold" color="orange.900" mb={3}>
                  4. Acceptable Use
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  You agree to use the Service only for lawful purposes and in accordance with these Terms. You may not use the Service to generate content that is illegal, harmful, threatening, abusive, or violates any third-party rights.
                </Text>
              </Box>

              <Box>
                <Heading fontSize="xl" fontWeight="bold" color="orange.900" mb={3}>
                  5. Intellectual Property
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  The Service and its original content, features, and functionality are owned by Pen My Work and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </Text>
              </Box>

              <Box>
                <Heading fontSize="xl" fontWeight="bold" color="orange.900" mb={3}>
                  6. Privacy Policy
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                </Text>
              </Box>

              <Box>
                <Heading fontSize="xl" fontWeight="bold" color="orange.900" mb={3}>
                  7. Limitation of Liability
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  In no event shall Pen My Work, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.
                </Text>
              </Box>

              <Box>
                <Heading fontSize="xl" fontWeight="bold" color="orange.900" mb={3}>
                  8. Changes to Terms
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                </Text>
              </Box>

              <Box>
                <Heading fontSize="xl" fontWeight="bold" color="orange.900" mb={3}>
                  9. Contact Information
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  If you have any questions about these Terms of Service, please contact us at support@penmywork.com
                </Text>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
