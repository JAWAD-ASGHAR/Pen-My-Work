"use client";

import { Box, Container, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function PrivacyPage() {
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
              Privacy Policy
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
                  1. Information We Collect
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  We collect information you provide directly to us, such as when you create an account, use our services, or contact us. This may include your name, email address, and any content you submit for handwriting generation.
                </Text>
              </Box>

              <Box>
                <Heading fontSize="xl" fontWeight="bold" color="orange.900" mb={3}>
                  2. How We Use Your Information
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  We use the information we collect to provide, maintain, and improve our services, process your requests, communicate with you, and ensure the security of our platform.
                </Text>
              </Box>

              <Box>
                <Heading fontSize="xl" fontWeight="bold" color="orange.900" mb={3}>
                  3. Information Sharing
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.
                </Text>
              </Box>

              <Box>
                <Heading fontSize="xl" fontWeight="bold" color="orange.900" mb={3}>
                  4. Data Security
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </Text>
              </Box>

              <Box>
                <Heading fontSize="xl" fontWeight="bold" color="orange.900" mb={3}>
                  5. Cookies and Tracking
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and improve our services. You can control cookie settings through your browser preferences.
                </Text>
              </Box>

              <Box>
                <Heading fontSize="xl" fontWeight="bold" color="orange.900" mb={3}>
                  6. Third-Party Services
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  Our service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.
                </Text>
              </Box>

              <Box>
                <Heading fontSize="xl" fontWeight="bold" color="orange.900" mb={3}>
                  7. Children&apos;s Privacy
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian, please contact us if you believe your child has provided us with personal information.
                </Text>
              </Box>

              <Box>
                <Heading fontSize="xl" fontWeight="bold" color="orange.900" mb={3}>
                  8. Your Rights
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us. Contact us to exercise these rights.
                </Text>
              </Box>

              <Box>
                <Heading fontSize="xl" fontWeight="bold" color="orange.900" mb={3}>
                  9. Changes to This Policy
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date.
                </Text>
              </Box>

              <Box>
                <Heading fontSize="xl" fontWeight="bold" color="orange.900" mb={3}>
                  10. Contact Us
                </Heading>
                <Text color="gray.700" lineHeight="relaxed">
                  If you have any questions about this Privacy Policy, please contact us at privacy@penmywork.com
                </Text>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
