import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FiArrowRight } from "react-icons/fi";
import { writingStyles } from "@/data/styles";

interface Step2WritingStyleProps {
  selectedWritingStyle: string;
  setSelectedWritingStyle: (style: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Step2WritingStyle({
  selectedWritingStyle,
  setSelectedWritingStyle,
  onNext,
  onPrevious,
}: Step2WritingStyleProps) {
  return (
    <>
      <VStack spacing={{ base: 6, md: 8 }} align="center" mb={{ base: 6, md: 8 }}>
        <Heading 
          size={{ base: "xl", md: "2xl" }} 
          color="#1A1A1A" 
          textAlign="center"
          px={{ base: 2, md: 0 }}
        >
          Choose Writing Style
        </Heading>
        <Text 
          color="#666" 
          textAlign="center"
          fontSize={{ base: "sm", md: "md" }}
          px={{ base: 4, md: 0 }}
        >
          Select the handwriting style for your assignment
        </Text>
      </VStack>

      <VStack spacing={{ base: 3, md: 4 }} px={{ base: 2, md: 0 }}>
        {writingStyles.map((style) => (
                  <Card
          key={style.id}
          bg={selectedWritingStyle === style.id ? "orange.50" : "white"}
          border="1px"
          borderColor={
            selectedWritingStyle === style.id ? "#FF6A00" : "gray.200"
          }
          w="full"
          cursor="pointer"
          onClick={() => setSelectedWritingStyle(style.id)}
          _hover={{ shadow: "md" }}
          transition="all 0.2s"
          _active={{ transform: "scale(0.98)" }}
          className="mobile-card"
        >
            <CardBody p={{ base: 4, md: 6, lg: 8 }}>
              <Box bg="gray.50" p={{ base: 4, md: 6 }} borderRadius="lg">
                <Text
                  textAlign="center"
                  color="#1A1A1A"
                  fontFamily={style.fontFamily}
                  fontSize={{ base: "16px", sm: style.fontSize }}
                  transition="opacity 0.2s"
                  lineHeight="1.4"
                >
                  The quick brown fox jumps over the lazy dog
                </Text>
              </Box>
            </CardBody>
          </Card>
        ))}
      </VStack>

      <Flex 
        justify="space-between" 
        mt={{ base: 6, md: 8 }}
        px={{ base: 4, md: 0 }}
        direction={{ base: "column", sm: "row" }}
        gap={{ base: 3, sm: 0 }}
      >
        <Button
          variant="outline"
          borderColor="gray.200"
          color="#666"
          bg="transparent"
          onClick={onPrevious}
          w={{ base: "full", sm: "auto" }}
          py={{ base: 3, md: 4 }}
          fontSize={{ base: "sm", md: "md" }}
          className="mobile-button"
        >
          <ArrowBackIcon w={4} h={4} mr={2} />
          Previous
        </Button>
        <Button
          bg="#FF6A00"
          _hover={{ bg: "#FF8A33" }}
          color="white"
          px={{ base: 6, md: 8 }}
          py={{ base: 3, md: 4 }}
          fontSize={{ base: "sm", md: "md" }}
          rightIcon={<Icon as={FiArrowRight} />}
          onClick={onNext}
          isDisabled={!selectedWritingStyle}
          w={{ base: "full", sm: "auto" }}
          className="mobile-button"
        >
          Next Step
        </Button>
      </Flex>
    </>
  );
} 