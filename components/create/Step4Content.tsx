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
  HStack,
  Badge,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FiArrowRight } from "react-icons/fi";
import { charCount } from "@/utils/char-count";

// Update the interface
interface Step4ContentProps {
  content: string;
  setContent: (content: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  userCredits?: { totalCredits: number; usedCredits: number } | null;
  userPlan?: { planId: string; name: string } | null;
  subscription?: { status: string; statusFormatted: string; renewsAt?: string; endsAt?: string } | null;
  selectedWritingStyle: string;
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

export default function Step4Content({
  content,
  setContent,
  onNext,
  onPrevious,
  userCredits,
  userPlan,
  subscription,
  selectedWritingStyle,
}: Step4ContentProps) {
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
          Enter Content
        </Heading>
        <Text 
          color="#666" 
          textAlign="center"
          fontSize={{ base: "sm", md: "md" }}
          px={{ base: 4, md: 0 }}
        >
          Paste or type your assignment text
        </Text>
      </VStack>

      <Card bg="white" border="1px" borderColor="gray.200" mb={{ base: 6, md: 8 }} mx={{ base: 2, md: 0 }}>
        <CardBody p={{ base: 4, md: 6 }}>
          <Box mb={4}>
            <Text
              as="label"
              display="block"
              fontSize={{ base: "sm", md: "md" }}
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
              minH={{ base: "200px", md: "300px" }}
              resize="none"
              borderColor="gray.300"
              fontSize={{ base: "sm", md: "md" }}
              _focus={{
                borderColor: "#FF6A00",
                boxShadow: "0 0 0 1px var(--chakra-colors-orange-500)",
              }}
            />
            <Flex justify="space-between" align="center" mt={2}>
              <Text fontSize={{ base: "xs", md: "sm" }} color="#666">
                Supports basic formatting with **bold** and *italic* text
              </Text>
            </Flex>
          </Box>
        </CardBody>
      </Card>

      {/* Cancelled but Still Active Subscription Message */}
      {isCancelledButActive && content.trim() && (
        <Card bg="white" border="1px" borderColor="orange.200" mb={{ base: 6, md: 8 }} mx={{ base: 2, md: 0 }}>
          <CardBody p={{ base: 4, md: 6 }}>
            <VStack spacing={4} align="stretch">
              <Heading size={{ base: "sm", md: "md" }} color="#1A1A1A">
                Subscription Status
              </Heading>
              <Box bg="orange.50" p={{ base: 3, md: 4 }} borderRadius="md" border="1px solid" borderColor="orange.200">
                <Text color="orange.700" fontSize={{ base: "xs", md: "sm" }} textAlign="center" fontWeight="medium">
                  Your subscription has been cancelled but is still active until {subscription.renewsAt ? new Date(subscription.renewsAt).toLocaleDateString() : "the renewal date"}. 
                  You continue to have access to Pro features.
                </Text>
              </Box>
              <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>Pages Required:</Text>
                <Badge colorScheme="green" variant="subtle" fontSize={{ base: "xs", md: "sm" }}>
                  {pageCount} pages
                </Badge>
              </HStack>
              <Box bg="blue.50" p={{ base: 3, md: 4 }} borderRadius="md" border="1px solid" borderColor="blue.200">
                <Text color="blue.700" fontSize={{ base: "xs", md: "sm" }} textAlign="center">
                  🎉 You still have unlimited pages with your Pro plan until the renewal date!
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      )}

      {/* Cancelled and Expired Subscription Message */}
      {isCancelledAndExpired && content.trim() && (
        <Card bg="white" border="1px" borderColor="red.200" mb={{ base: 6, md: 8 }} mx={{ base: 2, md: 0 }}>
          <CardBody p={{ base: 4, md: 6 }}>
            <VStack spacing={4} align="stretch">
              <Heading size={{ base: "sm", md: "md" }} color="#1A1A1A">
                Subscription Status
              </Heading>
              <Box bg="red.50" p={{ base: 3, md: 4 }} borderRadius="md" border="1px solid" borderColor="red.200">
                <Text color="red.700" fontSize={{ base: "xs", md: "sm" }} textAlign="center" fontWeight="medium">
                  Your subscription has been cancelled and has expired. You now have access to the free plan features.
                </Text>
              </Box>
              <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>Pages Required:</Text>
                <Badge colorScheme="blue" variant="subtle" fontSize={{ base: "xs", md: "sm" }}>
                  {pageCount} pages
                </Badge>
              </HStack>
              <Box bg="orange.50" p={{ base: 3, md: 4 }} borderRadius="md" border="1px solid" borderColor="orange.200">
                <Text color="orange.700" fontSize={{ base: "xs", md: "sm" }} textAlign="center">
                  Upgrade to Pro for unlimited pages and premium features!
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      )}

      {/* Credit Information - Only show for free plan users or expired cancelled subscriptions */}
      {(isFreePlan || isCancelledAndExpired) && !isCancelledButActive && userCredits && content.trim() && (
        <Card bg="white" border="1px" borderColor="gray.200" mb={{ base: 6, md: 8 }} mx={{ base: 2, md: 0 }}>
          <CardBody p={{ base: 4, md: 6 }}>
            <VStack spacing={4} align="stretch">
              <Heading size={{ base: "sm", md: "md" }} color="#1A1A1A">
                Credit Summary
              </Heading>
              <VStack spacing={3} align="stretch">
                <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                  <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>Pages Required:</Text>
                  <Badge colorScheme="blue" variant="subtle" fontSize={{ base: "xs", md: "sm" }}>
                    {pageCount} pages
                  </Badge>
                </HStack>
                <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                  <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>Credits Available:</Text>
                  <Badge colorScheme="green" variant="subtle" fontSize={{ base: "xs", md: "sm" }}>
                    {availableCredits} credits
                  </Badge>
                </HStack>
                <HStack 
                  justify="space-between" 
                  p={3} 
                  bg={hasEnoughCredits ? "green.50" : "red.50"} 
                  borderRadius="md"
                  border="1px solid"
                  borderColor={hasEnoughCredits ? "green.200" : "red.200"}
                >
                  <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>Status:</Text>
                  <Badge 
                    colorScheme={hasEnoughCredits ? "green" : "red"}
                    variant="subtle"
                    fontSize={{ base: "xs", md: "sm" }}
                  >
                    {hasEnoughCredits ? "Sufficient Credits" : "Insufficient Credits"}
                  </Badge>
                </HStack>
              </VStack>
              
              {!hasEnoughCredits && (
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

      {/* Pro Plan Message - Show for active subscriptions (including cancelled but still active) */}
      {!isFreePlan && !isCancelledAndExpired && isSubscriptionActiveNow && content.trim() && (
        <Card bg="white" border="1px" borderColor="gray.200" mb={{ base: 6, md: 8 }} mx={{ base: 2, md: 0 }}>
          <CardBody p={{ base: 4, md: 6 }}>
            <VStack spacing={4} align="stretch">
              <Heading size={{ base: "sm", md: "md" }} color="#1A1A1A">
                Pro Plan Benefits
              </Heading>
              <HStack justify="space-between" p={3} bg="green.50" borderRadius="md">
                <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>Pages Required:</Text>
                <Badge colorScheme="green" variant="subtle" fontSize={{ base: "xs", md: "sm" }}>
                  {pageCount} pages
                </Badge>
              </HStack>
              <Box bg="green.50" p={{ base: 3, md: 4 }} borderRadius="md" border="1px solid" borderColor="green.200">
                <Text color="green.700" fontSize={{ base: "xs", md: "sm" }} textAlign="center">
                  🎉 Unlimited pages with your {userPlan?.name}! No credit limits.
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      )}

      <Flex 
        justify="space-between" 
        px={{ base: 4, md: 0 }}
        direction={{ base: "column", sm: "row" }}
        gap={{ base: 3, sm: 0 }}
      >
        <Button
          bg="#FF6A00"
          _hover={{ bg: "#FF8A33" }}
          color="white"
          px={{ base: 6, md: 8 }}
          py={{ base: 3, md: 4 }}
          fontSize={{ base: "sm", md: "md" }}
          rightIcon={<FiArrowRight />}
          isDisabled={!content.trim() || ((isFreePlan || isCancelledAndExpired) && !isCancelledButActive && userCredits ? !hasEnoughCredits : false)}
          onClick={onNext}
          w={{ base: "full", sm: "auto" }}
          className="mobile-button"
        >
          {(isFreePlan || isCancelledAndExpired) && !isCancelledButActive && userCredits && !hasEnoughCredits 
            ? "Insufficient Credits" 
            : "Continue to Generate"
          }
        </Button>
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
    </>
  );
}