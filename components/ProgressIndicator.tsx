"use client"

import {
  Box,
  Flex,
} from "@chakra-ui/react"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <Box mb={{ base: 6, md: 8 }} px={{ base: 2, md: 0 }}>
      <Flex 
        align="center" 
        justify="center" 
        gap={{ base: 1, sm: 2 }} 
        mb={{ base: 3, md: 4 }}
        flexWrap="wrap"
      >
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          
          return (
            <Flex key={stepNumber} align="center">
              <Box
                w={{ base: "6", sm: "8" }}
                h={{ base: "6", sm: "8" }}
                bg={isCompleted ? "green.500" : isCurrent ? "#FF6A00" : "gray.200"}
                color={isCompleted || isCurrent ? "white" : "gray.500"}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={{ base: "xs", sm: "sm" }}
                fontWeight={isCurrent ? "medium" : "normal"}
                boxShadow={isCurrent ? "0 0 0 2px rgba(255, 106, 0, 0.2)" : "none"}
                transition="all 0.2s"
              >
                {isCompleted ? "✓" : stepNumber}
              </Box>
              {index < totalSteps - 1 && (
                <Box 
                  w={{ base: "8", sm: "12", md: "16" }} 
                  h="1" 
                  bg={isCompleted ? "green.500" : "gray.200"} 
                  mx={{ base: 1, sm: 2 }}
                  borderRadius="full"
                />
              )}
            </Flex>
          )
        })}
      </Flex>
    </Box>
  )
} 