"use client"

import { Box, Center, Text, VStack } from "@chakra-ui/react"
import { RotateLoader } from "react-spinners"

interface LoadingSpinnerProps {
  message?: string
  size?: number
  color?: string
  margin?: number
  speedMultiplier?: number
  minHeight?: string
}

export default function LoadingSpinner({
  message = "Loading...",
  size = 20,
  color = "#FF6A00",
  margin = 4,
  speedMultiplier = 1,
  minHeight = "100vh"
}: LoadingSpinnerProps) {
  return (
    <Box minH={minHeight} bg="#FDF7EE" display="flex" alignItems="center" justifyContent="center">
      <Center>
        <VStack spacing={6}>
          <RotateLoader
            color={color}
            size={size}
            margin={margin}
            speedMultiplier={speedMultiplier}
          />
          <Text color="#666" fontSize="lg">
            {message}
          </Text>
        </VStack>
      </Center>
    </Box>
  )
} 