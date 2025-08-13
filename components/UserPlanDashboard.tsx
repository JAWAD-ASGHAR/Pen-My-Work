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
import { FiCheck, FiStar, FiZap, FiCreditCard, FiPause, FiPlay, FiX } from "react-icons/fi"
import { 
  getCurrentUserSubscription,
  cancelUserSubscription,
  pauseSubscription,
  unpauseSubscription,
  getSubscriptionManagementURLs,
  getCurrentUserPlanAndSubscription
} from "@/server/actions/user-plans"

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

export default function UserPlanDashboard() {
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

  const handlePauseSubscription = async () => {
    setActionLoading("pause")
    try {
      await pauseSubscription()
      toast({
        title: "Success",
        description: "Your subscription has been paused",
        status: "success",
      })
      // Refresh subscription data
      const sub = await getCurrentUserSubscription()
      setSubscription(sub)
    } catch (error) {
      console.error("Pause subscription error:", error)
      toast({
        title: "Error",
        description: "Failed to pause subscription",
        status: "error",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleUnpauseSubscription = async () => {
    setActionLoading("unpause")
    try {
      await unpauseSubscription()
      toast({
        title: "Success",
        description: "Your subscription has been resumed",
        status: "success",
      })
      // Refresh subscription data
      const sub = await getCurrentUserSubscription()
      setSubscription(sub)
    } catch (error) {
      console.error("Unpause subscription error:", error)
      toast({
        title: "Error",
        description: "Failed to resume subscription",
        status: "error",
      })
    } finally {
      setActionLoading(null)
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
      <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
        <Text>Loading your subscription...</Text>
      </Box>
    )
  }

  const isFreePlan = currentPlan?.planId === "free"
  const isActive = subscription?.status === "active"
  const isPaused = subscription?.isPaused ?? false

  return (
    <Box minH="100vh" bg="gray.50" py={8}>
      <Container maxW="4xl">
        <VStack spacing={8}>
          {/* Current Plan Card */}
          <Card w="full" shadow="lg" borderRadius="2xl">
            <CardBody p={8}>
              <VStack spacing={6} align="stretch">
                <HStack justify="space-between" align="start">
                  <VStack align="start" spacing={2}>
                    <HStack>
                      <Icon 
                        as={isFreePlan ? FiStar : FiZap} 
                        color={isFreePlan ? "gray.500" : "#FF6A00"} 
                        h={6} 
                        w={6} 
                      />
                      <Heading fontSize="2xl" fontWeight="bold">
                        {currentPlan?.name}
                      </Heading>
                      {!isFreePlan && (
                        <Badge 
                          colorScheme={isActive ? "green" : isPaused ? "yellow" : "red"}
                          variant="subtle"
                        >
                          {subscription?.statusFormatted}
                        </Badge>
                      )}
                    </HStack>
                    <Text color="gray.600" fontSize="lg">
                      {currentPlan?.description}
                    </Text>
                  </VStack>
                  
                  <VStack align="end" spacing={2}>
                    <Text fontSize="3xl" fontWeight="bold" color="#FF6A00">
                      {isFreePlan ? "Free" : `$${(parseInt(currentPlan?.price || "0") / 100).toFixed(2)}`}
                    </Text>
                    <Text color="gray.600">
                      {isFreePlan ? "forever" : "per month"}
                    </Text>
                  </VStack>
                </HStack>

                {/* Subscription Details */}
                {!isFreePlan && subscription && (
                  <Box bg="gray.50" p={4} borderRadius="xl">
                    <VStack spacing={3} align="stretch">
                      <Text fontWeight="semibold" color="gray.700">
                        Subscription Details
                      </Text>
                      <HStack justify="space-between">
                        <Text color="gray.600">Next billing:</Text>
                        <Text fontWeight="medium">
                          {subscription.renewsAt ? new Date(subscription.renewsAt).toLocaleDateString() : "N/A"}
                        </Text>
                      </HStack>
                      {subscription.endsAt && (
                        <HStack justify="space-between">
                          <Text color="gray.600">Ends on:</Text>
                          <Text fontWeight="medium">
                            {new Date(subscription.endsAt).toLocaleDateString()}
                          </Text>
                        </HStack>
                      )}
                    </VStack>
                  </Box>
                )}

                {/* Features */}
                {currentPlan?.features && (
                  <Box>
                    <Text fontWeight="semibold" color="gray.700" mb={3}>
                      Your plan includes:
                    </Text>
                    <List spacing={2}>
                      {currentPlan.features.map((feature, index) => (
                        <ListItem key={index} display="flex" alignItems="center">
                          <ListIcon as={FiCheck} color="green.500" />
                          <Text color="gray.600" fontSize="sm">
                            {feature}
                          </Text>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {/* Action Buttons */}
                {!isFreePlan && subscription && (
                  <HStack spacing={4} wrap="wrap">
                    <Button
                      leftIcon={<Icon as={FiCreditCard} />}
                      onClick={handleUpdateBilling}
                      isLoading={actionLoading === "billing"}
                      loadingText="Opening..."
                      colorScheme="blue"
                      variant="outline"
                    >
                      Update Billing
                    </Button>
                    
                    {isPaused ? (
                      <Button
                        leftIcon={<Icon as={FiPlay} />}
                        onClick={handleUnpauseSubscription}
                        isLoading={actionLoading === "unpause"}
                        loadingText="Resuming..."
                        colorScheme="green"
                      >
                        Resume Subscription
                      </Button>
                    ) : (
                      <Button
                        leftIcon={<Icon as={FiPause} />}
                        onClick={handlePauseSubscription}
                        isLoading={actionLoading === "pause"}
                        loadingText="Pausing..."
                        colorScheme="yellow"
                        variant="outline"
                      >
                        Pause Subscription
                      </Button>
                    )}
                    
                    <Button
                      leftIcon={<Icon as={FiX} />}
                      onClick={onOpen}
                      isLoading={actionLoading === "cancel"}
                      loadingText="Cancelling..."
                      colorScheme="red"
                      variant="outline"
                    >
                      Cancel Subscription
                    </Button>
                  </HStack>
                )}

                {/* Upgrade Button for Free Plan */}
                {isFreePlan && (
                  <Button
                    leftIcon={<Icon as={FiZap} />}
                    colorScheme="orange"
                    size="lg"
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
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancel Subscription
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to cancel your subscription? You&apos;ll continue to have access until the end of your current billing period.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Keep Subscription
              </Button>
              <Button 
                colorScheme="red" 
                onClick={handleCancelSubscription} 
                ml={3}
                isLoading={actionLoading === "cancel"}
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
