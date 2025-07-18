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
  Textarea,
} from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { FiArrowRight } from "react-icons/fi"
import Link from "next/link"
import { useState } from "react"
import Header from "../../../components/Header"
import ProgressIndicator from "../../../components/ProgressIndicator"

export default function Step4() {
  const [additionalQueries, setAdditionalQueries] = useState("")

  return (
    <Box minH="100vh" bg="#FDF7EE">
      <Header />
      
      <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }} py={8}>
        <ProgressIndicator currentStep={4} totalSteps={5} />

        <VStack spacing={8} align="center" mb={8}>
          <Heading size="2xl" color="#1A1A1A" textAlign="center">
            Additional Prompts  
          </Heading>
          <Text color="#666" textAlign="center">
            Add any specific instructions or prompts for the AI to generate your assignment in a particular way
          </Text>
        </VStack>

        <Card bg="white" border="1px" borderColor="gray.200" mb={8}>
          <CardBody p={8}>
              <Box>
                <Heading size="md" color="#1A1A1A" mb={4}>
                  Additional Prompts (Optional)
                </Heading>
                <Text color="#666" mb={4}>
                  Add any specific instructions or prompts for the AI to generate your assignment in a particular way
                </Text>
                <Textarea
                  placeholder="e.g., Make it look more casual, use bullet points, add diagrams, etc..."
                  value={additionalQueries}
                  onChange={(e) => setAdditionalQueries(e.target.value)}
                  minH="120px"
                  resize="none"
                  borderColor="gray.300"
                  _focus={{ borderColor: "#FF6A00", boxShadow: "0 0 0 1px var(--chakra-colors-orange-500)" }}
                />
              </Box>
          </CardBody>
        </Card>

        <Flex justify="space-between">
          <Link href="/create/step-3">
            <Button variant="outline" borderColor="gray.200" color="#666" bg="transparent">
              <ArrowBackIcon w={4} h={4} mr={2} />
              Previous
            </Button>
          </Link>
          <Link href="/create/step-5">
            <Button 
              bg="#FF6A00" 
              _hover={{ bg: "#FF8A33" }}
              color="white"
              px={8} 
              rightIcon={<Icon as={FiArrowRight} />}
            >
              Continue to Generate
            </Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  )
}
