"use client"

import React, { useEffect, useState } from "react"
import { Box, Text, Flex, Icon, useBreakpointValue } from "@chakra-ui/react"
import { FiPenTool, FiZap, FiCheckCircle } from "react-icons/fi"

const fadeGradient = {
  background: 'linear-gradient(to top, #FDF7EE 20%, rgba(255,251,234,0.7) 50%, rgba(255,255,255,0.0) 100%)',
};

export const PreviewPanels = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [currentStep, setCurrentStep] = useState(0)

  // Responsive values - all hooks at top level
  const isMobile = useBreakpointValue({ base: true, md: false })
  const containerHeight = useBreakpointValue({ base: "350px", md: "500px" })
  const centralPanelWidth = useBreakpointValue({ base: "280px", md: "400px" })
  const centralPanelHeight = useBreakpointValue({ base: "220px", md: "300px" })
  const floatingPanelSize = useBreakpointValue({ base: "120px", md: "200px" })
  const floatingPanelHeight = useBreakpointValue({ base: "160px", md: "260px" })
  const marginTop = useBreakpointValue({ base: -5, md: -10 })
  const boxShadow = useBreakpointValue({ base: "4px 4px 0px #000000", md: "8px 8px 0px #000000" })
  const padding = useBreakpointValue({ base: 4, md: 6 })
  const stepMarginBottom = useBreakpointValue({ base: 4, md: 6 })
  const stepPaddingX = useBreakpointValue({ base: 1, md: 1.5 })
  const stepPaddingY = useBreakpointValue({ base: 0.5, md: 0.5 })
  const stepFontSize = useBreakpointValue({ base: "xs", md: "2xs" })
  const iconSize = useBreakpointValue({ base: 3, md: 2.5 })
  const stepTextFontSize = useBreakpointValue({ base: "xs", md: "2xs" })
  const stepTextDisplay = useBreakpointValue({ base: "none", sm: "block" })
  const contentHeight = useBreakpointValue({ base: "120px", md: "180px" })
  const contentPadding = useBreakpointValue({ base: 4, md: 6 })
  const textFontSize = useBreakpointValue({ base: "xs", md: "sm" })
  const textMarginBottom = useBreakpointValue({ base: 2, md: 3 })
  const contentFontSize = useBreakpointValue({ base: "sm", md: "md" })
  const processingHeight = useBreakpointValue({ base: "60px", md: "100px" })
  const spinnerSize = useBreakpointValue({ base: "24px", md: "32px" })
  const spinnerMarginBottom = useBreakpointValue({ base: 2, md: 3 })
  const processingFontSize = useBreakpointValue({ base: "xs", md: "sm" })
  const handwrittenFontSize = useBreakpointValue({ base: "14px", md: "16px" })
  const fadeHeight = useBreakpointValue({ base: "60px", md: "100px" })

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
      mt={marginTop}
      position="relative"
      overflow="hidden"
    >
      <Box position="relative" h={containerHeight} overflow="hidden">
        {/* Floating handwritten pages - Hidden on mobile */}
        {!isMobile && (
          <>
            <Box
              position="absolute"
              top="15%"
              left="10%"
              w={floatingPanelSize}
              h={floatingPanelHeight}
              bg="white"
              border="2px solid #000000"
              boxShadow="4px 4px 0px #000000"
              borderRadius="xl"
              transition="box-shadow 0.2s"
              transform="rotate(-6deg)"
              zIndex={2}
              style={{
                animation: 'float1 8s ease-in-out infinite',
                willChange: 'transform'
              }}
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
              top="25%"
              right="15%"
              w="180px"
              h="250px"
              bg="white"
              transform="rotate(5deg)"
              border="2px solid #000000"
              boxShadow="4px 4px 0px #000000"
              borderRadius="xl"
              transition="box-shadow 0.2s"
              zIndex={2}
              style={{
                animation: 'float2 9s ease-in-out infinite',
                willChange: 'transform'
              }}
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
              bottom="20%"
              left="15%"
              w="160px"
              h="220px"
              bg="white"
              border="2px solid #000000"
              boxShadow="4px 4px 0px #000000"
              borderRadius="xl"
              transition="box-shadow 0.2s"
              transform="rotate(-3deg)"
              zIndex={2}
              style={{
                animation: 'float3 10s ease-in-out infinite',
                willChange: 'transform'
              }}
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
              </Box>
            </Box>
          </>
        )}

        {/* Central transformation showcase - Responsive */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w={centralPanelWidth}
          h={centralPanelHeight}
          bg="white"
          border="2px solid #000000"
          boxShadow={boxShadow}
          borderRadius="3xl"
          transition="box-shadow 0.2s"
          p={padding}
          zIndex={3}
        >
          {/* Step indicator - Responsive */}
          <Flex justify="center" mb={stepMarginBottom} gap={2}>
            {steps.map((step, index) => (
              <Flex
                key={index}
                align="center"
                gap={0.5}
                px={stepPaddingX}
                py={stepPaddingY}
                borderRadius="full"
                bg={currentStep === index ? `${step.color}15` : "gray.100"}
                color={currentStep === index ? step.color : "gray.500"}
                transition="all 0.3s ease"
                transform={currentStep === index ? "scale(1.05)" : "scale(1)"}
                fontSize={stepFontSize}
              >
                <Icon as={step.icon} boxSize={iconSize} />
                <Text 
                  fontWeight="medium" 
                  whiteSpace="nowrap" 
                  fontSize={stepTextFontSize}
                  display={stepTextDisplay}
                >
                  {step.text}
                </Text>
              </Flex>
            ))}
          </Flex>

          {/* Content area - Responsive */}
          <Box
            h={contentHeight}
            bg="gray.50"
            borderRadius="2xl"
            p={contentPadding}
            position="relative"
            overflow="hidden"
            border="1px solid"
            borderColor="gray.200"
          >
            {currentStep === 0 && (
              <Box
                style={{
                  animation: 'fadeIn 0.4s ease-in',
                  willChange: 'opacity, transform'
                }}
                fontFamily="mono"
                fontSize={textFontSize}
                color="gray.600"
                lineHeight="1.6"
              >
                <Text fontWeight="bold" mb={textMarginBottom} color="blue.600">
                  📝 Your Content:
                </Text>
                <Text opacity={0.7} fontSize={contentFontSize}>
                  Paste your text here...
                </Text>
              </Box>
            )}

            {currentStep === 1 && (
              <Box 
                style={{
                  animation: 'fadeIn 0.4s ease-in',
                  willChange: 'opacity, transform'
                }}
              >
                <Text fontWeight="bold" mb={textMarginBottom} color="orange.600">
                  ⚡ AI Processing:
                </Text>
                <Flex align="center" justify="center" h={processingHeight}>
                  <Box textAlign="center">
                    <Box
                      w={spinnerSize}
                      h={spinnerSize}
                      border="2px solid"
                      borderColor="orange.200"
                      borderTopColor="orange.500"
                      borderRadius="full"
                      style={{
                        animation: 'spin 1s linear infinite',
                        willChange: 'transform'
                      }}
                      mx="auto"
                      mb={spinnerMarginBottom}
                    />
                    <Text fontSize={processingFontSize} color="gray.600" fontWeight="medium">
                      Transforming text...
                    </Text>
                  </Box>
                </Flex>
              </Box>
            )}

            {currentStep === 2 && (
              <Box 
                style={{
                  animation: 'fadeIn 0.4s ease-in',
                  willChange: 'opacity, transform'
                }}
              >
                <Text fontWeight="bold" mb={textMarginBottom} color="green.600">
                  ✨ Handwritten Result:
                </Text>
                <Box
                  fontFamily="'Caveat', cursive"
                  fontSize={handwrittenFontSize}
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

        {/* Floating particles - Hidden on mobile */}
        {!isMobile && (
          <>
            <Box
              position="absolute"
              top="30%"
              left="25%"
              w="4px"
              h="4px"
              bg="orange.400"
              borderRadius="full"
              opacity={0.6}
              style={{
                animation: 'particle1 6s ease-in-out infinite',
                willChange: 'transform, opacity'
              }}
            />
            <Box
              position="absolute"
              top="60%"
              right="25%"
              w="5px"
              h="5px"
              bg="blue.400"
              borderRadius="full"
              opacity={0.6}
              style={{
                animation: 'particle2 7s ease-in-out infinite',
                willChange: 'transform, opacity'
              }}
            />
            <Box
              position="absolute"
              bottom="35%"
              left="30%"
              w="3px"
              h="3px"
              bg="green.400"
              borderRadius="full"
              opacity={0.6}
              style={{
                animation: 'particle3 8s ease-in-out infinite',
                willChange: 'transform, opacity'
              }}
            />
          </>
        )}

        {/* Fade-out gradient at bottom */}
        <Box
          pointerEvents="none"
          position="absolute"
          left={0}
          right={0}
          bottom={0}
          h={fadeHeight}
          zIndex={1}
          {...fadeGradient}
        />
      </Box>

      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: rotate(-6deg) translateY(0px); }
          50% { transform: rotate(-6deg) translateY(-10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: rotate(5deg) translateY(0px); }
          50% { transform: rotate(5deg) translateY(-8px); }
        }
        @keyframes float3 {
          0%, 100% { transform: rotate(-3deg) translateY(0px); }
          50% { transform: rotate(-3deg) translateY(-12px); }
        }
        @keyframes particle1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
        }
        @keyframes particle2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          50% { transform: translateY(-15px) translateX(-8px); opacity: 1; }
        }
        @keyframes particle3 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          50% { transform: translateY(-25px) translateX(6px); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0px); }
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
