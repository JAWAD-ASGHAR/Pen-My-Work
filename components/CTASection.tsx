import {
  Box,
  Button,
  Container,
  Text,
  Flex,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const CTASection = ({
  accentColor,
  textColor,
}: {
  accentColor: string;
  textColor: string;
}) => {
  return (
 
        <Box bg="#FF9966" position="relative" py={20} px={6}>
          <Container
            maxW="4xl"
            textAlign="center"
            position="relative"
            zIndex={10}
          >
            <VStack spacing={8}>
              <Heading
                fontSize={{ base: "4xl", lg: "5xl" }}
                fontWeight="bold"
                lineHeight="tight"
              >
                Ready to Handwrite Anything?
              </Heading>

              <Text fontSize="xl" maxW="2xl">
                Transform your typed content into authentic handwritten pages in
                just seconds.
              </Text>

              <Flex
                direction={{ base: "column", sm: "row" }}
                gap={4}
                maxW="md"
                mx="auto"
                align="center"
              >
                <Input
                  placeholder="Enter your email"
                  flex={1}
                  h={14}
                  borderRadius="lg"
                  border="2px solid black"
                  bg="white"
                  _placeholder={{ color: "gray.900", fontWeight: "semibold" }}
                  color={textColor}
                  _focus={{ borderColor: accentColor, boxShadow: "none" }}
                />
                <Button
                  bg={accentColor}
                  _hover={{ bg: "orange.500" }}
                  color="white"
                  h={14}
                  px={8}
                  borderRadius="lg"
                  fontWeight="semibold"
                  border="2px solid black"
                  boxShadow="4px 4px 0px #000000"
                >
                  Get Started
                </Button>
              </Flex>

              <Text fontSize="sm">
                No credit card required • 7-day free trial • Cancel anytime
              </Text>
            </VStack>
          </Container>
        </Box>
  );
};

export default CTASection;
