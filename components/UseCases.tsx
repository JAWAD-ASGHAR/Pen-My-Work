import { Box, Container, VStack, Heading, Grid, Text, Card, CardBody, Icon, Image } from '@chakra-ui/react'
import React from 'react'
import { FiStar, FiBriefcase, FiBookOpen, FiImage } from 'react-icons/fi'

const UseCases = ({textColor}: {textColor: string}) => {
  return (
<Box as="section" id="use-cases" px={6} pt={52} pb={32} bg="white">
        <Container maxW="7xl">
          <VStack spacing={4} mb={16} textAlign="center">
            <Heading
              fontSize={{ base: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color={textColor}
            >
              Perfect For{" "}
              <Box position="relative" display="inline">
                <Box
                  position="absolute"
                  bottom="-25px"
                  left="-8px"
                  right="-8px"
                >
                  <Image
                    src="/underline.svg"
                    alt=""
                    w="full"
                    h="full"
                    objectFit="cover"
                    style={{ transform: "scale(0.9)" }}
                  />
                </Box>
                <Box position="relative" zIndex={1} display="inline">
                  Everyone
                </Box>
              </Box>
            </Heading>
          </VStack>

          <Grid
            templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
            gap={6}
          >
            {[
              {
                icon: FiStar,
                title: "Students",
                description:
                  "Assignments, essays, and homework that look authentically handwritten.",
                color: "blue.100",
                iconColor: "blue.600",
                image:
                  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop&crop=center",
              },
              {
                icon: FiBriefcase,
                title: "Professionals",
                description:
                  "Personal notes, letters, and documents with a human touch.",
                color: "green.100",
                iconColor: "green.600",
                image:
                  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=200&fit=crop&crop=center",
              },
              {
                icon: FiBookOpen,
                title: "Educators",
                description:
                  "Create worksheets and materials that feel personal and engaging.",
                color: "purple.100",
                iconColor: "purple.600",
                image:
                  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop&crop=center",
              },
              {
                icon: FiImage,
                title: "Designers",
                description:
                  "Handwritten assets for projects, mockups, and creative work.",
                color: "pink.100",
                iconColor: "pink.600",
                image:
                  "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop&crop=center",
              },
            ].map((item, index) => (
              <Card
                key={index}
                overflow="hidden"
                bg="#FDF7EE"
                border="2px solid #000000"
                boxShadow="4px 4px 0px #000000"
                borderRadius="xl"
                _hover={{ boxShadow: "8px 8px 0px #000000" }}
                transition="box-shadow 0.2s"
              >
                <Box position="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    w="full"
                    h={48}
                    objectFit="cover"
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bgGradient="linear(to-t, blackAlpha.200, transparent)"
                  />
                  <Box
                    position="absolute"
                    bottom={4}
                    left={4}
                    w={12}
                    h={12}
                    bg={item.color}
                    color={item.iconColor}
                    borderRadius="xl"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={item.icon} h={6} w={6} />
                  </Box>
                </Box>
                <CardBody p={6}>
                  <VStack spacing={3} align="start">
                    <Heading fontSize="xl" fontWeight="bold" color={textColor}>
                      {item.title}
                    </Heading>
                    <Text color="#666" lineHeight="relaxed" fontSize="sm">
                      {item.description}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Container>
      </Box>
  )
}

export default UseCases