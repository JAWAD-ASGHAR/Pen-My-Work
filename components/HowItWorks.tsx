import { Box, Container, VStack, Heading, Grid, Text, Card, CardBody, Icon, Image } from '@chakra-ui/react'
import React from 'react'
import { FiUpload, FiPenTool, FiDownload } from 'react-icons/fi'

const HowItWorks = ({accentColor, textColor}: {accentColor: string, textColor: string}) => {
  return (
<Box as="section" id="how-it-works" px={6} py={20} bg="white">
        <Container maxW="7xl">
          <VStack spacing={4} mb={16} textAlign="center">
            <Heading
              fontSize={{ base: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color={textColor}
            >
              How It{" "}
              <Box position="relative" display="inline">
                <Box
                  position="absolute"
                  bottom="-13px"
                  left="-8px"
                  right="-8px"
                >
                  <Image
                    src="/underline.svg"
                    alt=""
                    w="full"
                    h="full"
                    objectFit="cover"
                    style={{ transform: "scale(0.8)" }}
                  />
                </Box>
                <Box position="relative" zIndex={1} display="inline">
                  Works
                </Box>
              </Box>
            </Heading>
            <Text fontSize="xl" color="#666" maxW="2xl">
              Transform your typed content into authentic handwritten pages in
              just three simple steps.
            </Text>
          </VStack>

          <Grid templateColumns={{ md: "repeat(3, 1fr)" }} gap={8}>
            {[
              {
                icon: FiUpload,
                step: "01",
                title: "Paste Your Content",
                description:
                  "Simply paste or type your text - assignments, letters, notes, or any content you want handwritten.",
                image:
                  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop&crop=center",
              },
              {
                icon: FiPenTool,
                step: "02",
                title: "Choose Style & Paper",
                description:
                  "Select from various handwriting styles and paper types to match your needs perfectly.",
                image:
                  "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop&crop=center",
              },
              {
                icon: FiDownload,
                step: "03",
                title: "Download Image",
                description:
                  "Get your photo-realistic handwritten page instantly, ready to use or print.",
                image:
                  "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=200&fit=crop&crop=center",
              },
            ].map((item, index) => (
              <Card
                key={index}
                bg="#FDF7EE"
                border="2px solid #000000"
                boxShadow="4px 4px 0px #000000"
                borderRadius="xl"
                _hover={{ boxShadow: "8px 8px 0px #000000" }}
                transition="box-shadow 0.2s"
              >
                <CardBody p={8}>
                  <VStack spacing={6}>
                    <Box position="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        w="full"
                        h={48}
                        objectFit="cover"
                        borderRadius="2xl"
                      />
                      <Box
                        position="absolute"
                        bottom="-16px"
                        left="50%"
                        transform="translateX(-50%)"
                      >
                        <Box
                          w={16}
                          h={16}
                          bg={accentColor}
                          borderRadius="2xl"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon as={item.icon} h={8} w={8} color="white" />
                        </Box>
                        <Box
                          position="absolute"
                          top="-8px"
                          right="-8px"
                          w={8}
                          h={8}
                          bg={textColor}
                          color="white"
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontSize="sm"
                          fontWeight="bold"
                        >
                          {item.step}
                        </Box>
                      </Box>
                    </Box>
                    <VStack spacing={4} pt={4} textAlign="center">
                      <Heading
                        fontSize="xl"
                        fontWeight="bold"
                        color={textColor}
                      >
                        {item.title}
                      </Heading>
                      <Text color="#666" lineHeight="relaxed">
                        {item.description}
                      </Text>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Container>
      </Box>
  )
}

export default HowItWorks