import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  Flex,
  HStack,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FiPlay } from "react-icons/fi";
import { charCount } from "@/utils/char-count";

const paperTypes = [
  {
    id: "ruled",
    name: "Ruled",
    description: "Traditional lined paper",
  },
  {
    id: "blank",
    name: "Blank",
    description: "Clean white paper",
  },
  {
    id: "grid",
    name: "Grid",
    description: "Graph paper with grid lines",
  },
];

interface Step5GenerateProps {
  content: string;
  selectedPaper: string;
  selectedInk: string;
  isGenerating: boolean;
  onGenerate: () => void;
  onPrevious: () => void;
}

export default function Step5Generate({
  content,
  selectedPaper,
  selectedInk,
  isGenerating,
  onGenerate,
  onPrevious,
}: Step5GenerateProps) {
  const { pages, pageCount } = charCount(content);

  return (
    <>
      <VStack spacing={8} align="center" mb={8}>
        <Heading size="2xl" color="#1A1A1A" textAlign="center">
          Generate Assignment
        </Heading>
        <Text color="#666" textAlign="center">
          Create your handwritten assignment image
        </Text>
      </VStack>

      {!isGenerating && (
        <Card bg="white" border="1px" borderColor="gray.200" mb={8}>
          <CardBody p={8}>
            <VStack spacing={8} align="stretch">
              <Box>
                <Heading size="md" color="#1A1A1A" mb={4}>
                  Generation Summary
                </Heading>
                <VStack spacing={4} align="stretch">
                  <HStack
                    justify="space-between"
                    p={4}
                    bg="gray.50"
                    borderRadius="md"
                  >
                    <Text fontWeight="medium">Page Style:</Text>
                    <Badge colorScheme="orange" variant="subtle">
                      {paperTypes.find((p) => p.id === selectedPaper)?.name}
                    </Badge>
                  </HStack>
                  <HStack
                    justify="space-between"
                    p={4}
                    bg="gray.50"
                    borderRadius="md"
                  >
                    <Text fontWeight="medium">Pages to Generate:</Text>
                    <Badge colorScheme="blue" variant="subtle">
                      {pageCount} pages
                    </Badge>
                  </HStack>
                  <HStack
                    justify="space-between"
                    p={4}
                    bg="gray.50"
                    borderRadius="md"
                  >
                    <Text fontWeight="medium">Content Length:</Text>
                    <Badge colorScheme="green" variant="subtle">
                      ~{content.length} characters
                    </Badge>
                  </HStack>
                  <HStack
                    justify="space-between"
                    p={4}
                    bg="orange.50"
                    borderRadius="md"
                  >
                    <Text fontWeight="medium">Estimated Time:</Text>
                    <Badge colorScheme="orange">2-3 minutes</Badge>
                  </HStack>
                </VStack>
              </Box>

              <Button
                onClick={onGenerate}
                bg="#FF6A00"
                _hover={{ bg: "#FF8A33" }}
                color="white"
                size="lg"
                w="full"
                leftIcon={<Icon as={FiPlay} />}
              >
                Generate Assignment
              </Button>
            </VStack>
          </CardBody>
        </Card>
      )}

      {isGenerating && (
        <Card bg="white" border="1px" borderColor="gray.200" mb={8}>
          <CardBody p={8} textAlign="center">
            <Box
              w="24"
              h="24"
              mx="auto"
              mb={6}
              bg="orange.50"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                w="12"
                h="12"
                border="2px"
                borderColor="#FF6A00"
                borderTop="transparent"
                borderRadius="full"
                animation="spin 1s linear infinite"
              ></Box>
            </Box>
            <Heading size="lg" color="#1A1A1A" mb={2}>
              Writing with virtual ink...
            </Heading>
            <Text color="#666" mb={4}>
              Please wait while we generate your handwritten assignment
            </Text>
            <Box w="full" bg="gray.200" borderRadius="full" h={2}>
              <Box
                bg="#FF6A00"
                h="full"
                borderRadius="full"
                animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                w="60%"
              ></Box>
            </Box>
          </CardBody>
        </Card>
      )}

      {!isGenerating && (
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
        </Flex>
      )}
    </>
  );
} 