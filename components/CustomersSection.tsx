import { Box, Container, VStack, Heading, Grid } from '@chakra-ui/react'
import React from 'react'
import Testimonials from './Testimonials'
import ContactForm from './ContactForm'
import Image from 'next/image'

const CustomersSection = ({accentColor, textColor}: {accentColor: string, textColor: string}) => {
  return (
    <Box as="section" id="testimonials" px={6} py={20} bg="white">
    <Container maxW="7xl">
      <VStack spacing={4} mb={16} textAlign="center">
        <Heading
          fontSize={{ base: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color={textColor}
        >
          What customers say{" "}
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
                width={230}
                height={100}
                objectFit="cover"
                style={{ transform: "scale(0.8)" }}
              />
            </Box>
            <Box position="relative" zIndex={1} display="inline">
              About us
            </Box>
          </Box>
        </Heading>
      </VStack>

      <Grid
        templateColumns={{ lg: "1fr 1fr" }}
        gap={12}
        alignItems="center"
      >
        <ContactForm accentColor={accentColor} textColor={textColor} />

        <Testimonials accentColor={accentColor} textColor={textColor} />
      </Grid>
    </Container>
  </Box>
  )
}

export default CustomersSection