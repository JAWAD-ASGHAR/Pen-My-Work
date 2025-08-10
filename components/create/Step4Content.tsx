import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FiArrowRight } from "react-icons/fi";

interface Step4ContentProps {
  content: string;
  setContent: (content: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Step4Content({
  content,
  setContent,
  onNext,
  onPrevious,
}: Step4ContentProps) {

  return (
    <>
      <VStack spacing={8} align="center" mb={8}>
        <Heading size="2xl" color="#1A1A1A" textAlign="center">
          Enter Content
        </Heading>
        <Text color="#666" textAlign="center">
          Paste or type your assignment text
        </Text>
      </VStack>

      <Card bg="white" border="1px" borderColor="gray.200" mb={8}>
        <CardBody p={6}>
          <Box mb={4}>
            <Text
              as="label"
              display="block"
              fontSize="sm"
              fontWeight="medium"
              color="#1A1A1A"
              mb={2}
            >
              Assignment Text
            </Text>
            <Textarea
              placeholder="Paste your assignment text here..."
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setContent(e.target.value)
              }
              minH="300px"
              resize="none"
              borderColor="gray.300"
              _focus={{
                borderColor: "#FF6A00",
                boxShadow: "0 0 0 1px var(--chakra-colors-orange-500)",
              }}
            />
            <Flex justify="space-between" align="center" mt={2}>
              <Text fontSize="sm" color="#666">
                Supports basic formatting with **bold** and *italic* text
              </Text>
            </Flex>
          </Box>
        </CardBody>
      </Card>

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
          rightIcon={<FiArrowRight />}
          isDisabled={!content.trim()}
          onClick={onNext}
        >
          Continue to Generate
        </Button>
      </Flex>
    </>
  );
} 