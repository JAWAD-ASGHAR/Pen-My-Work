"use client"

import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
  Badge,
  List,
  ListItem,
  ListIcon,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react"
import { FiCheck, FiStar, FiZap, FiCreditCard, FiX } from "react-icons/fi"
import { 
  cancelUserSubscription,
  getSubscriptionManagementURLs,
  getCurrentUserPlanAndSubscription
} from "@/server/actions/user-plans"
import LoadingSpinner from "./LoadingSpinner"

type Plan = {
  planId: string;
  name: string;
  price: string;
  description?: string | null;
  features?: string[] | null;
  limitations?: string[] | null;
  variantId?: number | null;
}

type Subscription = {
  lemonSqueezyId: string;
  status: string;
  statusFormatted: string;
  renewsAt: string | null;
  endsAt: string | null;
  isPaused: boolean | null;
  price: string;
}

function isSubscriptionActive(subscription: Subscription | null): boolean {
  if (!subscription) return false
  
  if (subscription.status === "active") {
    return !subscription.endsAt || new Date(subscription.endsAt) > new Date()
  }
  
  if (subscription.status === "cancelled" && subscription.renewsAt) {
    return new Date(subscription.renewsAt) > new Date()
  }
  
  return false
}

export default function UserPlanDashboard() {
  const bgColor = "#FDF7EE";
  const textColor = "#1A1A1A";
  const accentColor = "#FF6A00";
  
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { plan, subscription } = await getCurrentUserPlanAndSubscription()
        setCurrentPlan(plan || null)
        setSubscription(subscription || null)
      } catch (error) {
        console.error("Error fetching user data:", error)
        toast({
          title: "Error",
          description: "Failed to load your subscription details",
          status: "error",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [toast])

  const handleCancelSubscription = async () => {
    setActionLoading("cancel")
    try {
      await cancelUserSubscription()
      toast({
        title: "Success",
        description: "Your subscription has been cancelled",
        status: "success",
      })
      // Refresh data
      const { plan, subscription } = await getCurrentUserPlanAndSubscription()
      setCurrentPlan(plan || null)
      setSubscription(subscription || null)
    } catch (error) {
      console.error("Cancel subscription error:", error)
      toast({
        title: "Error",
        description: "Failed to cancel subscription",
        status: "error",
      })
    } finally {
      setActionLoading(null)
      onClose()
    }
  }

  const handleUpdateBilling = async () => {
    setActionLoading("billing")
    try {
      const urls = await getSubscriptionManagementURLs()
      if (urls?.update_payment_method) {
        window.open(urls.update_payment_method, '_blank')
      }
    } catch (error) {
      console.error("Update billing error:", error)
      toast({
        title: "Error",
        description: "Failed to open billing portal",
        status: "error",
      })
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <LoadingSpinner />
    )
  }

  const isFreePlan = currentPlan?.planId === "free"
  const isSubscriptionActiveNow = isSubscriptionActive(subscription)
  const isCancelledButActive = subscription?.status === "cancelled" && isSubscriptionActiveNow
  const isCancelledAndExpired = subscription?.status === "cancelled" && !isSubscriptionActiveNow
  const isPaused = subscription?.isPaused ?? false

  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW="4xl">
        <VStack spacing={8}>
          {/* Header Section */}
          <VStack spacing={4} textAlign="center" mb={8}>
            <Heading
              fontSize={{ base: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color={textColor}
              lineHeight="tight"
            >
              Your Subscription
            </Heading>
            <Text fontSize="xl" color="#666" maxW="2xl">
              Manage your plan and subscription settings
            </Text>
          </VStack>

          {/* Current Plan Card */}
          <Card 
            w="full" 
            shadow="lg" 
            borderRadius="2xl"
            bg="white"
            border="2px solid #000000"
            boxShadow="4px 4px 0px #000000"
            _hover={{ boxShadow: "8px 8px 0px #000000" }}
            transition="box-shadow 0.2s"
          >
            <CardBody p={8}>
              <VStack spacing={6} align="stretch">
                <HStack justify="space-between" align="start">
                  <VStack align="start" spacing={2}>
                    <HStack>
                      <Icon 
                        as={isFreePlan ? FiStar : FiZap} 
                        color={isFreePlan ? "gray.500" : accentColor} 
                        h={6} 
                        w={6} 
                      />
                      <Heading fontSize="2xl" fontWeight="bold" color={textColor}>
                        {currentPlan?.name}
                      </Heading>
                      {!isFreePlan && (
                        <Badge 
                          colorScheme={
                            isSubscriptionActiveNow 
                              ? (isCancelledButActive ? "orange" : "green") 
                              : isPaused 
                                ? "yellow" 
                                : "red"
                          }
                          variant="subtle"
                          borderRadius="full"
                          px={3}
                          py={1}
                        >
                          {isCancelledButActive 
                            ? "Cancelled (Active)" 
                            : subscription?.statusFormatted
                          }
                        </Badge>
                      )}
                    </HStack>
                    <Text color="gray.600" fontSize="lg">
                      {currentPlan?.description}
                    </Text>
                  </VStack>
                  
                  <VStack align="end" spacing={2}>
                    <Text fontSize="3xl" fontWeight="bold" color={accentColor}>
                      {isFreePlan ? "Free" : `$${(parseInt(currentPlan?.price || "0") / 100).toFixed(2)}`}
                    </Text>
                    <Text color="gray.600">
                      {isFreePlan ? "trial" : "per month"}
                    </Text>
                  </VStack>
                </HStack>

                {/* Subscription Details */}
                {!isFreePlan && subscription && (
                  <Box bg={bgColor} p={6} borderRadius="xl" border="2px solid #000000">
                    <VStack spacing={4} align="stretch">
                      <Text fontWeight="semibold" color={textColor} fontSize="lg">
                        Subscription Details
                      </Text>
                      <HStack justify="space-between">
                        <Text color="gray.600">Next billing:</Text>
                        <Text fontWeight="medium" color={textColor}>
                          {subscription.renewsAt ? new Date(subscription.renewsAt).toLocaleDateString() : "N/A"}
                        </Text>
                      </HStack>
                      {subscription.endsAt && (
                        <HStack justify="space-between">
                          <Text color="gray.600">Ends on:</Text>
                          <Text fontWeight="medium" color={textColor}>
                            {new Date(subscription.endsAt).toLocaleDateString()}
                          </Text>
                        </HStack>
                      )}
                      {isCancelledButActive && (
                        <Box bg="orange.50" p={3} borderRadius="md" border="1px solid" borderColor="orange.200">
                          <Text color="orange.700" fontSize="sm" textAlign="center">
                            Your subscription is cancelled but remains active until the renewal date. You continue to have access to Pro features.
                          </Text>
                        </Box>
                      )}
                    </VStack>
                  </Box>
                )}

                {/* Features */}
                {currentPlan?.features && (
                  <Box>
                    <Text fontWeight="semibold" color={textColor} mb={4} fontSize="lg">
                      Your plan includes:
                    </Text>
                    <List spacing={3}>
                      {currentPlan.features.map((feature, index) => (
                        <ListItem key={index} display="flex" alignItems="center">
                          <ListIcon as={FiCheck} color="green.500" boxSize={5} />
                          <Text color="gray.600" fontSize="md">
                            {feature}
                          </Text>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {/* Action Buttons */}
                {!isFreePlan && subscription && isSubscriptionActiveNow && (
                  <VStack spacing={4} align="stretch">
                    <Text fontWeight="semibold" color={textColor} fontSize="lg">
                      Manage Subscription
                    </Text>
                    <HStack spacing={4} wrap="wrap">
                      <Button
                        leftIcon={<Icon as={FiCreditCard} />}
                        onClick={handleUpdateBilling}
                        isLoading={actionLoading === "billing"}
                        loadingText="Opening..."
                        bg="white"
                        color={textColor}
                        border="2px solid #000000"
                        boxShadow="4px 4px 0px #000000"
                        _hover={{ boxShadow: "8px 8px 0px #000000" }}
                        transition="box-shadow 0.2s"
                        borderRadius="xl"
                        fontWeight="semibold"
                      >
                        Update Billing
                      </Button>
                      
                      {/* {isPaused ? (
                        <Button
                          leftIcon={<Icon as={FiPlay} />}
                          onClick={handleUnpauseSubscription}
                          isLoading={actionLoading === "unpause"}
                          loadingText="Resuming..."
                          bg="green.500"
                          color="white"
                          border="2px solid #000000"
                          boxShadow="4px 4px 0px #000000"
                          _hover={{ boxShadow: "8px 8px 0px #000000" }}
                          transition="box-shadow 0.2s"
                          borderRadius="xl"
                          fontWeight="semibold"
                        >
                          Resume Subscription
                        </Button>
                      ) : (
                        <Button
                          leftIcon={<Icon as={FiPause} />}
                          onClick={handlePauseSubscription}
                          isLoading={actionLoading === "pause"}
                          loadingText="Pausing..."
                          bg="yellow.400"
                          color="white"
                          border="2px solid #000000"
                          boxShadow="4px 4px 0px #000000"
                          _hover={{ boxShadow: "8px 8px 0px #000000" }}
                          transition="box-shadow 0.2s"
                          borderRadius="xl"
                          fontWeight="semibold"
                        >
                          Pause Subscription
                        </Button>
                      )} */}
                      
                      <Button
                        leftIcon={<Icon as={FiX} />}
                        onClick={onOpen}
                        isLoading={actionLoading === "cancel"}
                        loadingText="Cancelling..."
                        bg="red.500"
                        color="white"
                        border="2px solid #000000"
                        boxShadow="4px 4px 0px #000000"
                        _hover={{ boxShadow: "8px 8px 0px #000000" }}
                        transition="box-shadow 0.2s"
                        borderRadius="xl"
                        fontWeight="semibold"
                      >
                        Cancel Subscription
                      </Button>
                    </HStack>
                  </VStack>
                )}

                {/* Buy Plan Button for Cancelled/Expired Subscriptions */}
                {!isFreePlan && subscription && isCancelledAndExpired && (
                  <VStack spacing={4}>
                    <Box bg="red.50" p={6} borderRadius="xl" border="2px solid" borderColor="red.200" w="full">
                      <Text color="red.700" fontSize="md" textAlign="center" fontWeight="medium">
                        Your subscription has been cancelled. You now have access to the free plan features.
                      </Text>
                    </Box>
                    <Button
                      leftIcon={<Icon as={FiZap} />}
                      bg={accentColor}
                      color="white"
                      size="lg"
                      border="2px solid #000000"
                      boxShadow="4px 4px 0px #000000"
                      _hover={{ boxShadow: "8px 8px 0px #000000" }}
                      transition="box-shadow 0.2s"
                      borderRadius="xl"
                      fontWeight="semibold"
                      onClick={() => window.location.href = "/plans"}
                    >
                      Buy a New Plan
                    </Button>
                  </VStack>
                )}

                {/* Upgrade Button for Free Plan */}
                {isFreePlan && (
                  <Button
                    leftIcon={<Icon as={FiZap} />}
                    bg={accentColor}
                    color="white"
                    size="lg"
                    border="2px solid #000000"
                    boxShadow="4px 4px 0px #000000"
                    _hover={{ boxShadow: "8px 8px 0px #000000" }}
                    transition="box-shadow 0.2s"
                    borderRadius="xl"
                    fontWeight="semibold"
                    onClick={() => window.location.href = "/plans"}
                  >
                    Upgrade to Pro
                  </Button>
                )}
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            bg="white"
            border="2px solid #000000"
            boxShadow="4px 4px 0px #000000"
            borderRadius="xl"
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color={textColor}>
              Cancel Subscription
            </AlertDialogHeader>

            <AlertDialogBody color="gray.600">
              Are you sure you want to cancel your subscription? You&apos;ll continue to have access until the end of your current billing period.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button 
                ref={cancelRef} 
                onClick={onClose}
                bg="white"
                color={textColor}
                border="2px solid #000000"
                boxShadow="4px 4px 0px #000000"
                _hover={{ boxShadow: "8px 8px 0px #000000" }}
                transition="box-shadow 0.2s"
                borderRadius="xl"
                fontWeight="semibold"
              >
                Keep Subscription
              </Button>
              <Button 
                bg="red.500"
                color="white"
                onClick={handleCancelSubscription} 
                ml={3}
                isLoading={actionLoading === "cancel"}
                border="2px solid #000000"
                boxShadow="4px 4px 0px #000000"
                _hover={{ boxShadow: "8px 8px 0px #000000" }}
                transition="box-shadow 0.2s"
                borderRadius="xl"
                fontWeight="semibold"
              >
                Cancel Subscription
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}
