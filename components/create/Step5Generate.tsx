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
import { FiPlay, FiFileText, FiZap } from "react-icons/fi";
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
  selectedWritingStyle: string;
  isGenerating: boolean;
  onGenerate: () => void;
  onPrevious: () => void;
  userCredits?: { totalCredits: number; usedCredits: number } | null;
  userPlan?: { planId: string; name: string } | null;
  subscription?: { status: string; statusFormatted: string; renewsAt?: string; endsAt?: string } | null;
}

// Utility function to check if a subscription is still active
function isSubscriptionActive(subscription: { status: string; statusFormatted: string; renewsAt?: string; endsAt?: string } | null): boolean {
  if (!subscription) return false
  
  // If status is active, check if it hasn't ended
  if (subscription.status === "active") {
    return !subscription.endsAt || new Date(subscription.endsAt) > new Date()
  }
  
  // If status is cancelled, check if the renewal date is still in the future
  // This means they've paid for the current period and should still have access
  if (subscription.status === "cancelled" && subscription.renewsAt) {
    return new Date(subscription.renewsAt) > new Date()
  }
  
  return false
}

export default function Step5Generate({
  content,
  selectedPaper,
  selectedWritingStyle,
  isGenerating,
  onGenerate,
  onPrevious,
  userCredits,
  userPlan,
  subscription,
}: Step5GenerateProps) {
  const { pageCount } = charCount(content,selectedWritingStyle);
  const availableCredits = userCredits ? userCredits.totalCredits - userCredits.usedCredits : 0;
  const hasEnoughCredits = availableCredits >= pageCount;
  const isFreePlan = userPlan?.planId === "free";
  const isSubscriptionActiveNow = isSubscriptionActive(subscription || null);
  const isCancelledButActive = subscription?.status === "cancelled" && isSubscriptionActiveNow;
  const isCancelledAndExpired = subscription?.status === "cancelled" && !isSubscriptionActiveNow;

  return (
    <>
      <VStack spacing={{ base: 6, md: 8 }} align="center" mb={{ base: 6, md: 8 }}>
        <Heading 
          size={{ base: "xl", md: "2xl" }} 
          color="#1A1A1A" 
          textAlign="center"
          px={{ base: 2, md: 0 }}
        >
          Generate Assignment
        </Heading>
        <Text 
          color="#666" 
          textAlign="center"
          fontSize={{ base: "sm", md: "md" }}
          px={{ base: 4, md: 0 }}
        >
          Create your handwritten assignment image
        </Text>
      </VStack>

      {!isGenerating && (
        <Card bg="white" border="1px" borderColor="gray.200" mb={{ base: 6, md: 8 }} mx={{ base: 2, md: 0 }}>
          <CardBody p={{ base: 6, md: 8 }}>
            <VStack spacing={{ base: 6, md: 8 }} align="stretch">
              <Box>
                <Heading size={{ base: "sm", md: "md" }} color="#1A1A1A" mb={4}>
                  Generation Summary
                </Heading>
                <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                  <HStack
                    justify="space-between"
                    p={{ base: 3, md: 4 }}
                    bg="gray.50"
                    borderRadius="md"
                  >
                    <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>Page Style:</Text>
                    <Badge colorScheme="orange" variant="subtle" fontSize={{ base: "xs", md: "sm" }}>
                      {paperTypes.find((p) => p.id === selectedPaper)?.name}
                    </Badge>
                  </HStack>
                  <HStack
                    justify="space-between"
                    p={{ base: 3, md: 4 }}
                    bg="gray.50"
                    borderRadius="md"
                  >
                    <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>Pages to Generate:</Text>
                    <Badge colorScheme="blue" variant="subtle" fontSize={{ base: "xs", md: "sm" }}>
                      {pageCount} pages
                    </Badge>
                  </HStack>
                  <HStack
                    justify="space-between"
                    p={{ base: 3, md: 4 }}
                    bg="gray.50"
                    borderRadius="md"
                  >
                    <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>Content Length:</Text>
                    <Badge colorScheme="green" variant="subtle" fontSize={{ base: "xs", md: "sm" }}>
                      ~{content.length} characters
                    </Badge>
                  </HStack>
                  
                  {/* Cancelled but Still Active Subscription Status */}
                  {isCancelledButActive && (
                    <HStack
                      justify="space-between"
                      p={{ base: 3, md: 4 }}
                      bg="orange.50"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="orange.200"
                    >
                      <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>Subscription Status:</Text>
                      <Badge colorScheme="orange" variant="subtle" fontSize={{ base: "xs", md: "sm" }}>
                        Cancelled (Active until {subscription.renewsAt ? new Date(subscription.renewsAt).toLocaleDateString() : "renewal"})
                      </Badge>
                    </HStack>
                  )}
                  
                  {/* Cancelled and Expired Subscription Status */}
                  {isCancelledAndExpired && (
                    <HStack
                      justify="space-between"
                      p={{ base: 3, md: 4 }}
                      bg="red.50"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="red.200"
                    >
                      <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>Subscription Status:</Text>
                      <Badge colorScheme="red" variant="subtle" fontSize={{ base: "xs", md: "sm" }}>
                        Cancelled (Expired)
                      </Badge>
                    </HStack>
                  )}
                  
                  {/* Credit Information - Only show for free plan users or expired cancelled subscriptions */}
                  {(isFreePlan || isCancelledAndExpired) && !isCancelledButActive && userCredits && (
                    <HStack
                      justify="space-between"
                      p={{ base: 3, md: 4 }}
                      bg={hasEnoughCredits ? "green.50" : "red.50"}
                      borderRadius="md"
                      border="1px solid"
                      borderColor={hasEnoughCredits ? "green.200" : "red.200"}
                    >
                      <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>Credits Available:</Text>
                      <Badge 
                        colorScheme={hasEnoughCredits ? "green" : "red"}
                        variant="subtle"
                        fontSize={{ base: "xs", md: "sm" }}
                      >
                        {availableCredits} / {pageCount} required
                      </Badge>
                    </HStack>
                  )}
                  
                  {/* Pro Plan Message */}
                  {!isFreePlan && !isCancelledAndExpired && (
                    <HStack
                      justify="space-between"
                      p={{ base: 3, md: 4 }}
                      bg="green.50"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="green.200"
                    >
                      <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>Plan Status:</Text>
                      <Badge colorScheme="green" variant="subtle" fontSize={{ base: "xs", md: "sm" }}>
                        Unlimited with {userPlan?.name}
                      </Badge>
                    </HStack>
                  )}
                  
                  <HStack
                    justify="space-between"
                    p={{ base: 3, md: 4 }}
                    bg="orange.50"
                    borderRadius="md"
                  >
                    <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>Estimated Time:</Text>
                    <Badge colorScheme="orange" fontSize={{ base: "xs", md: "sm" }}>2-3 minutes</Badge>
                  </HStack>
                </VStack>
              </Box>

              <Button
                onClick={onGenerate}
                bg="#FF6A00"
                _hover={{ bg: "#FF8A33" }}
                color="white"
                size={{ base: "md", md: "lg" }}
                w="full"
                leftIcon={<Icon as={FiPlay} />}
                isDisabled={!content.trim() || (isFreePlan && !isCancelledAndExpired && userCredits ? !hasEnoughCredits : false)}
                py={{ base: 3, md: 4 }}
                fontSize={{ base: "sm", md: "md" }}
                className="mobile-button"
              >
                {isFreePlan && !isCancelledAndExpired && userCredits && !hasEnoughCredits 
                  ? "Insufficient Credits - Upgrade Required" 
                  : "Generate Assignment"
                }
              </Button>
              
              {/* Cancelled Subscription Message */}
              {isCancelledAndExpired && (
                <Box bg="red.50" p={{ base: 3, md: 4 }} borderRadius="md" border="1px solid" borderColor="red.200">
                  <Text color="red.700" fontSize={{ base: "xs", md: "sm" }} textAlign="center" mb={3}>
                    Your subscription has expired. You now have access to the free plan features.
                  </Text>
                                      <Button
                      leftIcon={<Icon as={FiZap} />}
                      colorScheme="orange"
                      size={{ base: "sm", md: "md" }}
                      w="full"
                      onClick={() => window.location.href = "/plans"}
                      py={{ base: 2, md: 3 }}
                      fontSize={{ base: "xs", md: "sm" }}
                      className="mobile-button"
                    >
                    Upgrade to Pro for Unlimited Pages
                  </Button>
                </Box>
              )}
              
              {isFreePlan && !isCancelledAndExpired && userCredits && !hasEnoughCredits && (
                <Box bg="red.50" p={{ base: 3, md: 4 }} borderRadius="md" border="1px solid" borderColor="red.200">
                  <Text color="red.700" fontSize={{ base: "xs", md: "sm" }} textAlign="center">
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
        <Card bg="white" border="1px" borderColor="gray.200" mb={{ base: 6, md: 8 }} mx={{ base: 2, md: 0 }}>
          <CardBody p={{ base: 6, md: 8 }} textAlign="center">
            <Box
              w={{ base: "20", md: "24" }}
              h={{ base: "20", md: "24" }}
              mx="auto"
              mb={{ base: 4, md: 6 }}
              bg="orange.50"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                as={FiFileText}
                w={{ base: "10", md: "12" }}
                h={{ base: "10", md: "12" }}
                color="#FF6A00"
                animation="bounce 1s ease-in-out infinite"
              />
            </Box>
            <Heading size={{ base: "md", md: "lg" }} color="#1A1A1A" mb={2}>
              Writing with virtual ink...
            </Heading>
            <Text color="#666" mb={4} fontSize={{ base: "sm", md: "md" }}>
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
            <Text fontSize={{ base: "xs", md: "sm" }} color="#666" mt={3}>
              This may take a few moments...
            </Text>
          </CardBody>
        </Card>
      )}

      {!isGenerating && (
        <Flex 
          justify="space-between" 
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
        </Flex>
      )}
    </>
  );
}