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
}

// Utility function to check if a subscription is still active
function isSubscriptionActive(subscription: any): boolean {
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
}: Step4ContentProps) {
  const { pageCount } = charCount(content);
  const availableCredits = userCredits ? userCredits.totalCredits - userCredits.usedCredits : 0;
  const hasEnoughCredits = availableCredits >= pageCount;
  const isFreePlan = userPlan?.planId === "free";
  const isSubscriptionActiveNow = isSubscriptionActive(subscription);
  const isCancelledButActive = subscription?.status === "cancelled" && isSubscriptionActiveNow;
  const isCancelledAndExpired = subscription?.status === "cancelled" && !isSubscriptionActiveNow;

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

      {/* Cancelled but Still Active Subscription Message */}
      {isCancelledButActive && content.trim() && (
        <Card bg="white" border="1px" borderColor="orange.200" mb={8}>
          <CardBody p={6}>
            <VStack spacing={4} align="stretch">
              <Heading size="md" color="#1A1A1A">
                Subscription Status
              </Heading>
              <Box bg="orange.50" p={4} borderRadius="md" border="1px solid" borderColor="orange.200">
                <Text color="orange.700" fontSize="sm" textAlign="center" fontWeight="medium">
                  Your subscription has been cancelled but is still active until {subscription.renewsAt ? new Date(subscription.renewsAt).toLocaleDateString() : "the renewal date"}. 
                  You continue to have access to Pro features.
                </Text>
              </Box>
              <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                <Text fontWeight="medium">Pages Required:</Text>
                <Badge colorScheme="green" variant="subtle">
                  {pageCount} pages
                </Badge>
              </HStack>
              <Box bg="blue.50" p={4} borderRadius="md" border="1px solid" borderColor="blue.200">
                <Text color="blue.700" fontSize="sm" textAlign="center">
                  🎉 You still have unlimited pages with your Pro plan until the renewal date!
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      )}

      {/* Cancelled and Expired Subscription Message */}
      {isCancelledAndExpired && content.trim() && (
        <Card bg="white" border="1px" borderColor="red.200" mb={8}>
          <CardBody p={6}>
            <VStack spacing={4} align="stretch">
              <Heading size="md" color="#1A1A1A">
                Subscription Status
              </Heading>
              <Box bg="red.50" p={4} borderRadius="md" border="1px solid" borderColor="red.200">
                <Text color="red.700" fontSize="sm" textAlign="center" fontWeight="medium">
                  Your subscription has been cancelled and has expired. You now have access to the free plan features.
                </Text>
              </Box>
              <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                <Text fontWeight="medium">Pages Required:</Text>
                <Badge colorScheme="blue" variant="subtle">
                  {pageCount} pages
                </Badge>
              </HStack>
              <Box bg="orange.50" p={4} borderRadius="md" border="1px solid" borderColor="orange.200">
                <Text color="orange.700" fontSize="sm" textAlign="center">
                  Upgrade to Pro for unlimited pages and premium features!
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      )}

      {/* Credit Information - Only show for free plan users or expired cancelled subscriptions */}
      {(isFreePlan || isCancelledAndExpired) && !isCancelledButActive && userCredits && content.trim() && (
        <Card bg="white" border="1px" borderColor="gray.200" mb={8}>
          <CardBody p={6}>
            <VStack spacing={4} align="stretch">
              <Heading size="md" color="#1A1A1A">
                Credit Summary
              </Heading>
              <VStack spacing={3} align="stretch">
                <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                  <Text fontWeight="medium">Pages Required:</Text>
                  <Badge colorScheme="blue" variant="subtle">
                    {pageCount} pages
                  </Badge>
                </HStack>
                <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                  <Text fontWeight="medium">Credits Available:</Text>
                  <Badge colorScheme="green" variant="subtle">
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
                  <Text fontWeight="medium">Status:</Text>
                  <Badge 
                    colorScheme={hasEnoughCredits ? "green" : "red"}
                    variant="subtle"
                  >
                    {hasEnoughCredits ? "Sufficient Credits" : "Insufficient Credits"}
                  </Badge>
                </HStack>
              </VStack>
              
              {!hasEnoughCredits && (
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

      {/* Pro Plan Message - Show for active subscriptions (including cancelled but still active) */}
      {!isFreePlan && !isCancelledAndExpired && isSubscriptionActiveNow && content.trim() && (
        <Card bg="white" border="1px" borderColor="gray.200" mb={8}>
          <CardBody p={6}>
            <VStack spacing={4} align="stretch">
              <Heading size="md" color="#1A1A1A">
                Pro Plan Benefits
              </Heading>
              <HStack justify="space-between" p={3} bg="green.50" borderRadius="md">
                <Text fontWeight="medium">Pages Required:</Text>
                <Badge colorScheme="green" variant="subtle">
                  {pageCount} pages
                </Badge>
              </HStack>
              <Box bg="green.50" p={4} borderRadius="md" border="1px solid" borderColor="green.200">
                <Text color="green.700" fontSize="sm" textAlign="center">
                  🎉 Unlimited pages with your {userPlan?.name}! No credit limits.
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      )}

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
          isDisabled={!content.trim() || ((isFreePlan || isCancelledAndExpired) && !isCancelledButActive && userCredits ? !hasEnoughCredits : false)}
          onClick={onNext}
        >
          {(isFreePlan || isCancelledAndExpired) && !isCancelledButActive && userCredits && !hasEnoughCredits 
            ? "Insufficient Credits" 
            : "Continue to Generate"
          }
        </Button>
      </Flex>
    </>
  );
}