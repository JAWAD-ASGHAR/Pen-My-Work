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
    <Box mb={8}>
      <Flex align="center" justify="center" gap={2} mb={4}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          
          return (
            <Flex key={stepNumber} align="center">
              <Box
                w="8"
                h="8"
                bg={isCompleted ? "green.500" : isCurrent ? "#FF6A00" : "gray.200"}
                color={isCompleted || isCurrent ? "white" : "gray.500"}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="sm"
                fontWeight={isCurrent ? "medium" : "normal"}
              >
                {isCompleted ? "✓" : stepNumber}
              </Box>
              {index < totalSteps - 1 && (
                <Box 
                  w="16" 
                  h="1" 
                  bg={isCompleted ? "green.500" : "gray.200"} 
                  mx={2}
                />
              )}
            </Flex>
          )
        })}
      </Flex>
    </Box>
  )
} 