import { Box, Container, Flex, Grid, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import { Logo } from './Logo';

const Footer = ({textColor}: { textColor: string}) => {
  return (
    <Box as="footer" bg={textColor} color="white" px={6} py={16}>
    <Container maxW="7xl">
      <Grid templateColumns={{ md: "repeat(3, 1fr)" }} gap={8} mb={12}>
        <VStack align="start" spacing={4}>
          <Flex align="center" gap={2}>
            <Logo size="md" textColor="white" />
          </Flex>
          <Text color="gray.400" lineHeight="relaxed">
            Transform typed text into authentic handwritten pages with
            AI-powered technology. Perfect for students, professionals, and
            creators.
          </Text>
        </VStack>

        <VStack align="start" spacing={4}>
          <Text fontWeight="semibold">Quick Links</Text>
          <VStack align="start" spacing={2} color="gray.400">
            <Text
              as="a"
              href="#how-it-works"
              _hover={{ color: "white" }}
              transition="colors"
              cursor="pointer"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              How It Works
            </Text>
            <Text
              as="a"
              href="#examples"
              _hover={{ color: "white" }}
              transition="colors"
              cursor="pointer"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("examples")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Examples
            </Text>
            <Text
              as="a"
              href="#use-cases"
              _hover={{ color: "white" }}
              transition="colors"
              cursor="pointer"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("use-cases")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Use Cases
            </Text>
            <Text
              as="a"
              href="#contact"
              _hover={{ color: "white" }}
              transition="colors"
              cursor="pointer"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact
            </Text>
          </VStack>
        </VStack>

        <VStack align="start" spacing={4}>
          <Text fontWeight="semibold">Legal</Text>
          <VStack align="start" spacing={2} color="gray.400">
            <Text
              as="a"
              href="/privacy"
              _hover={{ color: "white" }}
              transition="colors"
            >
              Privacy Policy
            </Text>
            <Text
              as="a"
              href="/terms"
              _hover={{ color: "white" }}
              transition="colors"
            >
              Terms of Service
            </Text>
          </VStack>
        </VStack>
      </Grid>

      <Box
        borderTop="1px"
        borderColor="gray.800"
        pt={8}
        textAlign="center"
        color="gray.400"
      >
        <Text>
          &copy; {new Date().getFullYear()} Pen My Work. All rights
          reserved.
        </Text>
      </Box>
    </Container>
  </Box>
  )
}

export default Footer