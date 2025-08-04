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

const writingStyles = [
  {
    id: "caveat",
    name: "Caveat",
    description: "Natural handwritten style",
    fontFamily: "'Caveat', cursive",
    fontSize: "30px",
  },
  {
    id: "gloria",
    name: "Gloria Hallelujah",
    description: "Playful and expressive",
    fontFamily: "'Gloria Hallelujah', cursive",
    fontSize: "20px",
  },
  {
    id: "patrick",
    name: "Patrick Hand",
    description: "Clear and readable",
    fontFamily: "'Patrick Hand', cursive",
    fontSize: "24px",
  },
  {
    id: "permanent-marker",
    name: "Permanent Marker",
    description: "Bold and confident",
    fontFamily: "'Permanent Marker', cursive",
    fontSize: "20px",
  },
  {
    id: "reenie-beanie",
    name: "Reenie Beanie",
    description: "Casual and friendly",
    fontFamily: "'Reenie Beanie', cursive",
    fontSize: "30px",
  },
  {
    id: "shadows-into-light",
    name: "Shadows Into Light",
    description: "Elegant and flowing",
    fontFamily: "'Shadows Into Light', cursive",
    fontSize: "24px",
  },
  {
    id: "edu-sa-hand",
    name: "Edu SA Hand",
    description: "Professional handwritten",
    fontFamily: "'Edu SA Hand', cursive",
    fontSize: "24px",
  },
];

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
      <VStack spacing={8} align="center" mb={8}>
        <Heading size="2xl" color="#1A1A1A" textAlign="center">
          Choose Writing Style
        </Heading>
        <Text color="#666" textAlign="center">
          Select the handwriting style for your assignment
        </Text>
      </VStack>

      {writingStyles.map((style) => (
        <Card
          key={style.id}
          bg={selectedWritingStyle === style.id ? "orange.50" : "white"}
          border="1px"
          borderColor={
            selectedWritingStyle === style.id ? "#FF6A00" : "gray.200"
          }
          mb={4}
          cursor="pointer"
          onClick={() => setSelectedWritingStyle(style.id)}
          _hover={{ shadow: "md" }}
          transition="all 0.2s"
        >
          <CardBody p={8}>
            <Box bg="gray.50" p={6} borderRadius="lg">
              <Text
                textAlign="center"
                color="#1A1A1A"
                fontFamily={style.fontFamily}
                fontSize={style.fontSize}
                transition="opacity 0.2s"
              >
                The quick brown fox jumps over the lazy dog
              </Text>
            </Box>
          </CardBody>
        </Card>
      ))}

      <Flex justify="space-between">
        <Button
          variant="outline"
          borderColor="gray.200"
          color="#666"
          bg="transparent"
          onClick={onPrevious}
        >
          <ArrowBackIcon w={4} h={4} mr={2} />
          Previous
        </Button>
        <Button
          bg="#FF6A00"
          _hover={{ bg: "#FF8A33" }}
          color="white"
          px={8}
          rightIcon={<Icon as={FiArrowRight} />}
          onClick={onNext}
          isDisabled={!selectedWritingStyle}
        >
          Next Step
        </Button>
      </Flex>
    </>
  );
} 