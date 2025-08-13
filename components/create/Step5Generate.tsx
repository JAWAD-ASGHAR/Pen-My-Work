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
import { FiPlay, FiFileText } from "react-icons/fi";
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

// Update the interface
interface Step5GenerateProps {
  content: string;
  selectedPaper: string;
  isGenerating: boolean;
  onGenerate: () => void;
  onPrevious: () => void;
  userCredits?: { totalCredits: number; usedCredits: number } | null;
  requiredPages?: number;
  userPlan?: { planId: string; name: string } | null;
}

export default function Step5Generate({
  content,
  selectedPaper,
  isGenerating,
  onGenerate,
  onPrevious,
  userCredits,
  requiredPages = 0,
  userPlan,
}: Step5GenerateProps) {
  const { pageCount } = charCount(content);
  const availableCredits = userCredits ? userCredits.totalCredits - userCredits.usedCredits : 0;
  const hasEnoughCredits = availableCredits >= pageCount;
  const isFreePlan = userPlan?.planId === "free";

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
                  
                  {/* Credit Information - Only show for free plan users */}
                  {isFreePlan && userCredits && (
                    <HStack
                      justify="space-between"
                      p={4}
                      bg={hasEnoughCredits ? "green.50" : "red.50"}
                      borderRadius="md"
                      border="1px solid"
                      borderColor={hasEnoughCredits ? "green.200" : "red.200"}
                    >
                      <Text fontWeight="medium">Credits Available:</Text>
                      <Badge 
                        colorScheme={hasEnoughCredits ? "green" : "red"}
                        variant="subtle"
                      >
                        {availableCredits} / {pageCount} needed
                      </Badge>
                    </HStack>
                  )}
                  
                  {/* Pro Plan Message */}
                  {!isFreePlan && (
                    <HStack
                      justify="space-between"
                      p={4}
                      bg="green.50"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="green.200"
                    >
                      <Text fontWeight="medium">Plan Status:</Text>
                      <Badge colorScheme="green" variant="subtle">
                        Unlimited with {userPlan?.name}
                      </Badge>
                    </HStack>
                  )}
                  
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
                isDisabled={!content.trim() || (isFreePlan && userCredits ? !hasEnoughCredits : false)}
              >
                {isFreePlan && userCredits && !hasEnoughCredits 
                  ? "Insufficient Credits - Upgrade Required" 
                  : "Generate Assignment"
                }
              </Button>
              
              {isFreePlan && userCredits && !hasEnoughCredits && (
                <Box bg="red.50" p={4} borderRadius="md" border="1px solid" borderColor="red.200">
                  <Text color="red.700" fontSize="sm" textAlign="center">
                    You need {pageCount} credits but only have {availableCredits} available. 
                    Please upgrade to Pro for unlimited pages.
                  </Text>
                </Box>
              )}
            </VStack>
          </CardBody>
        </Card>
      )}

      {/* Rest of the component remains the same */}
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
              <Icon
                as={FiFileText}
                w="12"
                h="12"
                color="#FF6A00"
                animation="bounce 1s ease-in-out infinite"
              />
            </Box>
            <Heading size="lg" color="#1A1A1A" mb={2}>
              Writing with virtual ink...
            </Heading>
            <Text color="#666" mb={4}>
              Please wait while we generate your handwritten assignment
            </Text>
            <Box w="full" bg="gray.200" borderRadius="full" h={3} overflow="hidden">
              <Box
                bg="linear-gradient(90deg, #FF6A00, #FF8A33)"
                h="full"
                borderRadius="full"
                animation="loadingProgress 2s ease-in-out infinite"
                w="100%"
                transform="translateX(-100%)"
              ></Box>
            </Box>
            <Text fontSize="sm" color="#666" mt={3}>
              This may take a few moments...
            </Text>
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