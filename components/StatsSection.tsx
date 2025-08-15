import { Box, Container, VStack, Heading, Grid, Text, Card, CardBody, Image } from '@chakra-ui/react'
import React from 'react'

const StatsSection = ({bgColor, textColor}: {bgColor: string, textColor: string}) => {
  return (
    <Box as="section" id="stats" px={6} mb={20} py={20} bg={bgColor}>
    <Container maxW="7xl">
      <VStack spacing={4} mb={16} textAlign="center">
        <Heading
          fontSize={{ base: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color={textColor}
        >
          Trusted{" "}
          <Box position="relative" display="inline">
            <Box
              position="absolute"
              bottom="-30px"
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
              Worldwide
            </Box>
          </Box>
        </Heading>
      </VStack>

      <Grid
        templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={6}
      >
        {[
          { number: "1M+", label: "Handwritten pages generated" },
          { number: "98%", label: "User satisfaction rate" },
          { number: "150K+", label: "Active users worldwide" },
          { number: "100+", label: "Countries served" },
        ].map((stat, index) => (
          <Card
            key={index}
            bg="white"
            border="2px solid #000000"
            boxShadow="4px 4px 0px #000000"
            borderRadius="xl"
            _hover={{ boxShadow: "8px 8px 0px #000000" }}
            transition="box-shadow 0.2s"
          >
            <CardBody p={8}>
              <VStack spacing={2} textAlign="center">
                <Text fontSize="4xl" fontWeight="bold" color={textColor}>
                  {stat.number}
                </Text>
                <Text color="#666">{stat.label}</Text>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Container>
  </Box>
  )
}

export default StatsSection