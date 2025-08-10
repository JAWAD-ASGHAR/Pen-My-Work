import { Box, Container, VStack, Heading, Grid, Text, Card, CardBody, Icon, Image, HStack } from '@chakra-ui/react'
import React from 'react'
import { FiCheckCircle } from 'react-icons/fi'

const SeeTheMagic = ({accentColor, textColor}: {accentColor: string, textColor: string}) => {
  return (
    <Box
        as="section"
        id="examples"
        px={6}
        pt={10}
        pb={20}
        bg="#FF9966"
        position="relative"
      >
        {/* Background decoration */}
        <Box
          position="absolute"
          top="10%"
          right="5%"
          w="200px"
          h="200px"
          bg={accentColor}
          opacity={0.05}
          borderRadius="full"
          filter="blur(40px)"
        />
        <Box
          position="absolute"
          bottom="10%"
          left="5%"
          w="150px"
          h="150px"
          bg={accentColor}
          opacity={0.05}
          borderRadius="full"
          filter="blur(30px)"
        />

        <Container maxW="7xl" position="relative">
          <VStack spacing={6} mb={10} textAlign="center">
            <Heading
              fontSize={{ base: "4xl", lg: "6xl" }}
              fontWeight="extrabold"
              color={textColor}
              lineHeight="tight"
            >
              See The{" "}
              <Box position="relative" display="inline">
                <Box
                  position="absolute"
                  bottom="-20px"
                  left="-8px"
                  right="-8px"
                >
                  <Image
                    src="/underline.svg"
                    alt=""
                    w="full"
                    h="full"
                    objectFit="cover"
                    style={{
                      transform: "scale(0.9)",
                      filter:
                        "brightness(0) saturate(100%) invert(84%) sepia(31%) saturate(638%) hue-rotate(359deg) brightness(103%) contrast(107%)",
                    }}
                  />
                </Box>
                <Box position="relative" zIndex={1} display="inline">
                  Magic
                </Box>
              </Box>
            </Heading>
            <Text
              fontSize={{ base: "lg", lg: "xl" }}
              color="black"
              maxW="3xl"
              lineHeight="relaxed"
              fontWeight="medium"
            >
              Typed text transformed into authentic handwritten pages within
              seconds.
            </Text>
          </VStack>
          {/* Example 1 - Academic Essay */}
          <Box w="full">
            <Grid
              templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
              gap={{ base: 8, lg: 12 }}
              alignItems="stretch"
              maxW="6xl"
              mx="auto"
            >
              {/* Typed Input */}
              <Card
                overflow="hidden"
                bg="#FDF7EE"
                border="2px solid #000000"
                boxShadow="4px 4px 0px #000000"
                borderRadius="xl"
                transition="box-shadow 0.2s"
              >
                <CardBody p={{ base: 6, lg: 8 }}>
                  <HStack gap={3} mb={6} align="center">
                    <HStack gap={1}>
                      <Box w={3} h={3} bg="red.500" borderRadius="full" />
                      <Box w={3} h={3} bg="yellow.400" borderRadius="full" />
                      <Box w={3} h={3} bg="green.500" borderRadius="full" />
                    </HStack>
                    <Text fontSize="md" color="gray.800" fontWeight="bold">
                      Typed Input
                    </Text>
                  </HStack>
                  <Box
                    bg="gray.50"
                    borderRadius="xl"
                    p={{ base: 5, lg: 6 }}
                    fontFamily="mono"
                    fontSize={{ base: "sm", lg: "md" }}
                    color={textColor}
                    lineHeight="relaxed"
                    border="2px solid black"
                    minH="200px"
                    display="flex"
                    alignItems="center"
                  >
                    The Role of Technology in Modern Life: Technology has become
                    an inseparable part of our daily lives, shaping the way we
                    communicate, work, and think. From smartphones to artificial
                    intelligence, advancements have brought convenience and
                    efficiency to tasks that once required significant time and
                    effort. Communication has transformed from handwritten
                    letters to instant messages and video calls, enabling
                    connections across continents within seconds. In education,
                    technology has opened doors to limitless learning
                    opportunities. Online courses, virtual classrooms, and
                    interactive tools have made knowledge more accessible than
                    ever. In healthcare, modern devices and diagnostic systems
                    have saved countless lives, while in business, automation
                    has increased productivity and reduced costs. However,
                    technology is not without challenges. Over-reliance on
                    digital tools can reduce face-to-face interaction, and
                    issues like data privacy and cybercrime pose serious
                    threats. The key lies in using technology responsibly
                    balancing innovation with ethical considerations.
                  </Box>
                </CardBody>
              </Card>

              {/* AI Handwritten Output */}
              <Card
                overflow="hidden"
                bg="#FDF7EE"
                border="2px solid #000000"
                boxShadow="4px 4px 0px #000000"
                borderRadius="xl"
                transition="box-shadow 0.2s"
              >
                <CardBody p={{ base: 6, lg: 8 }}>
                  <HStack gap={3} mb={6} align="center">
                    <Icon as={FiCheckCircle} w={5} h={5} color="green.500" />
                    <Text fontSize="md" color="gray.800" fontWeight="bold">
                      AI Handwritten Output
                    </Text>
                  </HStack>
                  <Box
                    position="relative"
                    borderRadius="xl"
                    overflow="hidden"
                    border="2px solid black"
                  >
                    <Image
                      src="/example.png"
                      alt="Handwritten essay on lined paper"
                      w="full"
                      h={"full"}
                      objectFit="cover"
                    />
                    <Box
                      position="absolute"
                      inset={0}
                      bgGradient="linear(to-t, blackAlpha.200, transparent)"
                    />
                    <Box
                      position="absolute"
                      top={4}
                      right={4}
                      bg="white"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      color="green.500"
                      fontWeight={"black"}
                      border={"2px solid black"}
                      boxShadow="md"
                    >
                      AI Generated
                    </Box>
                  </Box>
                </CardBody>
              </Card>
            </Grid>
          </Box>
        </Container>
      </Box>

  )
}

export default SeeTheMagic