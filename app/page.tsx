"use client"
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'

export default function Home() {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="center">
        <Heading size="2xl" color="brand.900">
          Welcome to Your Chakra UI App
        </Heading>
        
        <Text fontSize="lg" color="brand.500" textAlign="center">
          Your Chakra UI v2 setup is working perfectly! 🎉
        </Text>
        
        <Box>
          <Button colorScheme="blue" size="lg" mr={4}>
            Primary Button
          </Button>
          <Button variant="outline" size="lg">
            Secondary Button
          </Button>
        </Box>
        
        <Text fontSize="sm" color="gray.500">
          React 18 + Chakra UI v2 + Next.js 15
        </Text>
      </VStack>
    </Container>
  )
}
