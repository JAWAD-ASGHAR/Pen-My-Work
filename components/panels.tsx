"use client"

import React, { useEffect, useState } from "react"
import { Box, Text, Flex, Icon } from "@chakra-ui/react"
import { FiPenTool, FiZap, FiCheckCircle } from "react-icons/fi"

const fadeGradient = {
  background: 'linear-gradient(to top, #FDF7EE 20%, rgba(255,251,234,0.7) 50%, rgba(255,255,255,0.0) 100%)',
};

export const PreviewPanels = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { icon: FiPenTool, text: "Paste your content", color: "blue.500" },
    { icon: FiZap, text: "AI transforms text", color: "orange.500" },
    { icon: FiCheckCircle, text: "Get handwritten result", color: "green.500" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [steps.length])



  return (
    <Box
      ref={ref}
      w="full"
      mt={-10}
      position="relative"
      bg="#FDF7EE"
      overflow="hidden"
    >
      <Box position="relative" h="600px" overflow="hidden">
        {/* Floating handwritten pages - Improved positioning */}
        <Box
          position="absolute"
          top="8%"
          left="8%"
          w="220px"
          h="300px"
          bg="white"
          borderRadius="xl"
          boxShadow="2xl"
          transform="rotate(-8deg)"
          animation="float1 6s ease-in-out infinite"
          zIndex={2}
        >
          <Box
            position="absolute"
            top="12px"
            left="12px"
            right="12px"
            bottom="12px"
            bg="repeating-linear-gradient(0deg, transparent, transparent 24px, #e8e8e8 24px, #e8e8e8 25px)"
            borderRadius="lg"
          />
          <Box
            position="absolute"
            top="24px"
            left="20px"
            right="20px"
            fontFamily="'Caveat', cursive"
            fontSize="16px"
            color="#2d3748"
            lineHeight="1.8"
            opacity={0.85}
            transform="rotate(-1deg)"
          >
            <Text mb={2} fontWeight="600">Dear Diary,</Text>
            <Text mb={2}>Today was amazing!</Text>
            <Text mb={2}>I learned so much about</Text>
            <Text>AI and technology...</Text>
          </Box>
        </Box>

        <Box
          position="absolute"
          top="15%"
          right="12%"
          w="200px"
          h="280px"
          bg="white"
          borderRadius="xl"
          boxShadow="2xl"
          transform="rotate(6deg)"
          animation="float2 8s ease-in-out infinite"
          zIndex={2}
        >
          <Box
            position="absolute"
            top="12px"
            left="12px"
            right="12px"
            bottom="12px"
            bg="repeating-linear-gradient(0deg, transparent, transparent 20px, #e0e0e0 20px, #e0e0e0 21px)"
            borderRadius="lg"
          />
          <Box
            position="absolute"
            top="24px"
            left="20px"
            right="20px"
            fontFamily="'Caveat', cursive"
            fontSize="16px"
            color="#2d3748"
            lineHeight="1.9"
            opacity={0.85}
            transform="rotate(0.5deg)"
          >
            <Text mb={2} fontWeight="600">Math Notes:</Text>
            <Text mb={2}>x² + 2x + 1 = 0</Text>
            <Text mb={2}>Quadratic formula:</Text>
            <Text>x = (-b ± √b²-4ac)/2a</Text>
          </Box>
        </Box>

        <Box
          position="absolute"
          bottom="12%"
          left="18%"
          w="180px"
          h="240px"
          bg="white"
          borderRadius="xl"
          boxShadow="2xl"
          transform="rotate(-3deg)"
          animation="float3 7s ease-in-out infinite"
          zIndex={2}
        >
          <Box
            position="absolute"
            top="12px"
            left="12px"
            right="12px"
            bottom="12px"
            bg="white"
            borderRadius="lg"
            border="2px solid #e2e8f0"
          />
          <Box
            position="absolute"
            top="24px"
            left="20px"
            right="20px"
            fontFamily="'Caveat', cursive"
            fontSize="16px"
            color="#2d3748"
            lineHeight="1.7"
            opacity={0.85}
            transform="rotate(-0.5deg)"
          >
            <Text mb={3} fontWeight="600">Shopping List:</Text>
            <Text mb={1}>• Milk</Text>
            <Text mb={1}>• Bread</Text>
            <Text mb={1}>• Eggs</Text>
            <Text mb={1}>• Butter</Text>
            <Text>• Cheese</Text>
          </Box>
        </Box>

        {/* Central transformation showcase - Better positioned */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="420px"
          h="320px"
          bg="white"
          borderRadius="3xl"
          boxShadow="2xl"
          p={8}
          zIndex={3}
        >
          {/* Step indicator - Improved spacing */}
          <Flex justify="center" mb={8} gap={3}>
            {steps.map((step, index) => (
              <Flex
                key={index}
                align="center"
                gap={0.5}
                px={1.5}
                py={0.5}
                borderRadius="full"
                bg={currentStep === index ? `${step.color}15` : "gray.100"}
                color={currentStep === index ? step.color : "gray.500"}
                transition="all 0.3s ease"
                transform={currentStep === index ? "scale(1.05)" : "scale(1)"}
                fontSize="2xs"
              >
                <Icon as={step.icon} boxSize={2.5} />
                <Text fontWeight="medium" whiteSpace="nowrap" fontSize="2xs">
                  {step.text}
                </Text>
              </Flex>
            ))}
          </Flex>

          {/* Content area - Better proportions */}
          <Box
            h="200px"
            bg="gray.50"
            borderRadius="2xl"
            p={6}
            position="relative"
            overflow="hidden"
            border="1px solid"
            borderColor="gray.200"
          >
            {currentStep === 0 && (
              <Box
                animation="fadeIn 0.5s ease-in"
                fontFamily="mono"
                fontSize="sm"
                color="gray.600"
                lineHeight="1.6"
              >
                <Text fontWeight="bold" mb={3} color="blue.600">
                  📝 Your Content:
                </Text>
                <Text opacity={0.7} fontSize="md">
                  Paste your text here...
                </Text>
              </Box>
            )}

            {currentStep === 1 && (
              <Box animation="fadeIn 0.5s ease-in">
                <Text fontWeight="bold" mb={3} color="orange.600">
                  ⚡ AI Processing:
                </Text>
                <Flex align="center" justify="center" h="120px">
                  <Box textAlign="center">
                    <Box
                      w="40px"
                      h="40px"
                      border="3px solid"
                      borderColor="orange.200"
                      borderTopColor="orange.500"
                      borderRadius="full"
                      animation="spin 1s linear infinite"
                      mx="auto"
                      mb={3}
                    />
                    <Text fontSize="sm" color="gray.600" fontWeight="medium">
                      Transforming text to handwriting...
                    </Text>
                  </Box>
                </Flex>
              </Box>
            )}

            {currentStep === 2 && (
              <Box animation="fadeIn 0.5s ease-in">
                <Text fontWeight="bold" mb={3} color="green.600">
                  ✨ Handwritten Result:
                </Text>
                <Box
                  fontFamily="'Caveat', cursive"
                  fontSize="16px"
                  color="#2d3748"
                  lineHeight="1.8"
                  opacity={0.9}
                  transform="rotate(-0.5deg)"
                >
                  <Text mb={2}>The Industrial Revolution</Text>
                  <Text mb={2}>transformed society through</Text>
                  <Text mb={2}>technological innovation</Text>
                  <Text>and urbanization.</Text>
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {/* Floating particles - Better positioned */}
        <Box
          position="absolute"
          top="25%"
          left="25%"
          w="4px"
          h="4px"
          bg="orange.400"
          borderRadius="full"
          animation="particle1 4s ease-in-out infinite"
          opacity={0.6}
        />
        <Box
          position="absolute"
          top="65%"
          right="30%"
          w="6px"
          h="6px"
          bg="blue.400"
          borderRadius="full"
          animation="particle2 5s ease-in-out infinite"
          opacity={0.6}
        />
        <Box
          position="absolute"
          bottom="35%"
          left="35%"
          w="3px"
          h="3px"
          bg="green.400"
          borderRadius="full"
          animation="particle3 6s ease-in-out infinite"
          opacity={0.6}
        />

        {/* Fade-out gradient at bottom */}
        <Box
          pointerEvents="none"
          position="absolute"
          left={0}
          right={0}
          bottom={0}
          h="128px"
          zIndex={1}
          {...fadeGradient}
        />
      </Box>

      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: rotate(-8deg) translateY(0px); }
          50% { transform: rotate(-8deg) translateY(-15px); }
        }
        @keyframes float2 {
          0%, 100% { transform: rotate(6deg) translateY(0px); }
          50% { transform: rotate(6deg) translateY(-12px); }
        }
        @keyframes float3 {
          0%, 100% { transform: rotate(-3deg) translateY(0px); }
          50% { transform: rotate(-3deg) translateY(-18px); }
        }
        @keyframes particle1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          50% { transform: translateY(-25px) translateX(15px); opacity: 1; }
        }
        @keyframes particle2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          50% { transform: translateY(-20px) translateX(-12px); opacity: 1; }
        }
        @keyframes particle3 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          50% { transform: translateY(-30px) translateX(8px); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0px); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  )
})

PreviewPanels.displayName = "PreviewPanels"
