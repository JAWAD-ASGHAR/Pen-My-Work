"use client"

import React, { useEffect, useState } from "react"
import { Box, Text, Flex, Icon } from "@chakra-ui/react"
import { FiPenTool, FiZap, FiCheckCircle } from "react-icons/fi"

const fadeGradient = {
  background: 'linear-gradient(to top, #FDF7EE 20%, rgba(255,251,234,0.7) 50%, rgba(255,255,255,0.0) 100%)',
};

export const PreviewPanels = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [typedText, setTypedText] = useState("")

  const demoText = "The Industrial Revolution transformed society through technological innovation and urbanization."
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

  useEffect(() => {
    if (currentStep === 1) {
      setIsTyping(true)
      setTypedText("")
      let index = 0
      const typeInterval = setInterval(() => {
        if (index < demoText.length) {
          setTypedText(demoText.slice(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          clearInterval(typeInterval)
        }
      }, 50)
      return () => clearInterval(typeInterval)
    }
  }, [currentStep])

  return (
    <Box
      ref={ref}
      w="full"
      mt={6}
      position="relative"
      bg="#FDF7EE"
      overflow="hidden"
    >
      <Box position="relative" h="600px" overflow="hidden">
        {/* Floating handwritten pages */}
        <Box
          position="absolute"
          top="10%"
          left="5%"
          w="200px"
          h="280px"
          bg="white"
          borderRadius="xl"
          boxShadow="2xl"
          transform="rotate(-12deg)"
          animation="float1 6s ease-in-out infinite"
          zIndex={2}
        >
          <Box
            position="absolute"
            top="10px"
            left="10px"
            right="10px"
            bottom="10px"
            bg="linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)"
            bgSize="20px 20px"
            bgPosition="0 0, 0 10px, 10px -10px, -10px 0px"
            borderRadius="lg"
          />
          <Box
            position="absolute"
            top="20px"
            left="20px"
            right="20px"
            fontFamily="cursive"
            fontSize="sm"
            color="#333"
            lineHeight="1.6"
            opacity={0.8}
          >
            Dear Diary,<br />
            Today was amazing!<br />
            I learned so much...
          </Box>
        </Box>

        <Box
          position="absolute"
          top="20%"
          right="10%"
          w="180px"
          h="250px"
          bg="white"
          borderRadius="xl"
          boxShadow="2xl"
          transform="rotate(8deg)"
          animation="float2 8s ease-in-out infinite"
          zIndex={2}
        >
          <Box
            position="absolute"
            top="10px"
            left="10px"
            right="10px"
            bottom="10px"
            bg="repeating-linear-gradient(0deg, transparent, transparent 20px, #e0e0e0 20px, #e0e0e0 21px)"
            borderRadius="lg"
          />
          <Box
            position="absolute"
            top="20px"
            left="20px"
            right="20px"
            fontFamily="cursive"
            fontSize="sm"
            color="#333"
            lineHeight="1.8"
            opacity={0.8}
          >
            Math Notes:<br />
            x² + 2x + 1 = 0<br />
            Quadratic formula...
          </Box>
        </Box>

        <Box
          position="absolute"
          bottom="15%"
          left="15%"
          w="160px"
          h="220px"
          bg="white"
          borderRadius="xl"
          boxShadow="2xl"
          transform="rotate(-5deg)"
          animation="float3 7s ease-in-out infinite"
          zIndex={2}
        >
          <Box
            position="absolute"
            top="10px"
            left="10px"
            right="10px"
            bottom="10px"
            bg="white"
            borderRadius="lg"
            border="2px solid #e0e0e0"
          />
          <Box
            position="absolute"
            top="20px"
            left="20px"
            right="20px"
            fontFamily="cursive"
            fontSize="sm"
            color="#333"
            lineHeight="1.6"
            opacity={0.8}
          >
            Shopping List:<br />
            - Milk<br />
            - Bread<br />
            - Eggs
          </Box>
        </Box>

        {/* Central transformation showcase */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="400px"
          h="300px"
          bg="white"
          borderRadius="3xl"
          boxShadow="2xl"
          p={8}
          zIndex={3}
        >
          {/* Step indicator */}
          <Flex justify="center" mb={6} gap={4}>
            {steps.map((step, index) => (
              <Flex
                key={index}
                align="center"
                gap={2}
                px={4}
                py={2}
                borderRadius="full"
                bg={currentStep === index ? `${step.color}20` : "gray.100"}
                color={currentStep === index ? step.color : "gray.500"}
                transition="all 0.3s ease"
                transform={currentStep === index ? "scale(1.05)" : "scale(1)"}
              >
                <Icon as={step.icon} />
                <Text fontSize="sm" fontWeight="medium">
                  {step.text}
                </Text>
              </Flex>
            ))}
          </Flex>

          {/* Content area */}
          <Box
            h="180px"
            bg="gray.50"
            borderRadius="2xl"
            p={6}
            position="relative"
            overflow="hidden"
          >
            {currentStep === 0 && (
              <Box
                animation="fadeIn 0.5s ease-in"
                fontFamily="mono"
                fontSize="sm"
                color="gray.600"
                lineHeight="1.6"
              >
                <Text fontWeight="bold" mb={2}>📝 Your Content:</Text>
                <Text opacity={0.7}>Paste your text here...</Text>
              </Box>
            )}

            {currentStep === 1 && (
              <Box animation="fadeIn 0.5s ease-in">
                <Text fontWeight="bold" mb={2} color="orange.600">
                  ⚡ AI Processing:
                </Text>
                <Text
                  fontFamily="mono"
                  fontSize="sm"
                  color="gray.700"
                  lineHeight="1.6"
                >
                  {typedText}
                  {isTyping && (
                    <Box
                      as="span"
                      w="2px"
                      h="4"
                      bg="orange.500"
                      display="inline-block"
                      animation="blink 1s infinite"
                      ml={1}
                    />
                  )}
                </Text>
              </Box>
            )}

            {currentStep === 2 && (
              <Box animation="fadeIn 0.5s ease-in">
                <Text fontWeight="bold" mb={2} color="green.600">
                  ✨ Handwritten Result:
                </Text>
                <Box
                  fontFamily="cursive"
                  fontSize="sm"
                  color="#333"
                  lineHeight="1.8"
                  opacity={0.9}
                  transform="rotate(-1deg)"
                >
                  The Industrial Revolution<br />
                  transformed society through<br />
                  technological innovation<br />
                  and urbanization.
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {/* Floating particles */}
        <Box
          position="absolute"
          top="20%"
          left="20%"
          w="4px"
          h="4px"
          bg="orange.400"
          borderRadius="full"
          animation="particle1 4s ease-in-out infinite"
          opacity={0.6}
        />
        <Box
          position="absolute"
          top="60%"
          right="25%"
          w="6px"
          h="6px"
          bg="blue.400"
          borderRadius="full"
          animation="particle2 5s ease-in-out infinite"
          opacity={0.6}
        />
        <Box
          position="absolute"
          bottom="30%"
          left="30%"
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
          0%, 100% { transform: rotate(-12deg) translateY(0px); }
          50% { transform: rotate(-12deg) translateY(-20px); }
        }
        @keyframes float2 {
          0%, 100% { transform: rotate(8deg) translateY(0px); }
          50% { transform: rotate(8deg) translateY(-15px); }
        }
        @keyframes float3 {
          0%, 100% { transform: rotate(-5deg) translateY(0px); }
          50% { transform: rotate(-5deg) translateY(-25px); }
        }
        @keyframes particle1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          50% { transform: translateY(-30px) translateX(20px); opacity: 1; }
        }
        @keyframes particle2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          50% { transform: translateY(-25px) translateX(-15px); opacity: 1; }
        }
        @keyframes particle3 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          50% { transform: translateY(-35px) translateX(10px); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0px); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </Box>
  )
})

PreviewPanels.displayName = "PreviewPanels"
