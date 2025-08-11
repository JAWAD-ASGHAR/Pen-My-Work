"use client"

import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
  Badge,
  List,
  ListItem,
  ListIcon,
  Divider,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { FiCheck, FiStar, FiZap, FiUsers, FiDownload, FiRepeat, FiShield } from "react-icons/fi"
import { gsap } from "gsap"
import { useRef } from "react"
import { Banner } from "@/components/banner"
import { Navbar } from "@/components/nav"
import { useRouter } from "next/navigation"
import { getPlans } from "@/server/actions/user-plans"

export default function PlansPage() {
  const bgColor = "#FDF7EE"
  const textColor = "#1A1A1A"
  const accentColor = "#FF6A00"
  const router = useRouter()
  
  const plansRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plansData = await getPlans()
        setPlans(plansData)
      } catch (error) {
        console.error("Error fetching plans:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  useEffect(() => {
    if (loading) return

    const ctx = gsap.context(() => {
      // Banner animation
      gsap.fromTo(bannerRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })

      // Header animation
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.2, ease: "power2.out" },
      )

      // Plans animation
      gsap.fromTo(
        plansRef.current?.children || [],
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.2, delay: 0.4, ease: "power2.out" },
      )
    })
    return () => ctx.revert()
  }, [loading])

  // Function to get plan display data based on database plan
  const getPlanDisplayData = (plan: any) => {
    const baseData = {
      name: plan.name,
      price: plan.price === 0 ? "$0" : `$${plan.price}`,
      period: plan.price === 0 ? "forever" : "per month",
      description: plan.description,
      color: plan.id === "@free" ? "gray.500" : accentColor,
      bgColor: plan.id === "@free" ? "gray.50" : "orange.50",
      popular: plan.id === "@pro",
      buttonText: plan.id === "@free" ? "Get Started Free" : "Start Pro Trial",
      buttonVariant: plan.id === "@free" ? "outline" as const : "solid" as const,
      icon: plan.id === "@free" ? FiStar : FiZap,
      features: [] as string[],
      limitations: [] as string[],
    }

    // Add features based on plan
    if (plan.id === "@free") {
      return {
        ...baseData,
        features: [
          `${plan.features.max_pages} handwritten pages per month`,
          "Basic handwriting styles",
          "Standard paper types",
          "Email support",
          "720p image quality",
        ],
        limitations: [
          "Limited to 100 words per page",
          "Watermark on downloads",
          "No priority support",
        ],
      }
    } else if (plan.id === "@pro") {
      return {
        ...baseData,
        features: [
          "Unlimited handwritten pages",
          "All handwriting styles",
          "All paper types",
          "Priority email support",
          "1080p HD image quality",
          "Bulk processing (up to 10 pages)",
          "Custom ink colors",
          "No watermarks",
        ],
        limitations: [],
      }
    }

    return baseData
  }

  const features = [
    {
      icon: FiDownload,
      title: "High-Quality Downloads",
      description: "Get your handwritten pages in multiple formats and resolutions",
    },
    {
      icon: FiRepeat,
      title: "Unlimited Styles",
      description: "Access to all handwriting styles and paper types",
    },
    {
      icon: FiShield,
      title: "Secure & Private",
      description: "Your content is encrypted and never stored permanently",
    },
    {
      icon: FiUsers,
      title: "Team Collaboration",
      description: "Share and collaborate with team members seamlessly",
    },
  ]

  if (loading) {
    return (
      <Box minH="100vh" bg="white" display="flex" alignItems="center" justifyContent="center">
        <Text>Loading plans...</Text>
      </Box>
    )
  }

  return (
    <Box minH="100vh" bg="white">
      <Banner ref={bannerRef} />
      <Box h="16px" />
      <Navbar ref={headerRef} scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} router={router} />
      
      {/* Hero Section */}
      <Box as="section" px={6} py={20} bg={bgColor}>
        <Container maxW="7xl">
          <VStack spacing={6} textAlign="center" mb={16}>
            <Heading
              fontSize={{ base: "4xl", lg: "6xl" }}
              fontWeight="bold"
              color={textColor}
              lineHeight="tight"
            >
              Choose Your{" "}
              <Box position="relative" display="inline">
                Plan
                <Box
                  position="absolute"
                  bottom="-8px"
                  left={0}
                  w="full"
                  h={3}
                  bg={accentColor}
                  opacity={0.3}
                  borderRadius="full"
                />
              </Box>
            </Heading>
            <Text fontSize="xl" color="#666" maxW="3xl">
              Transform your digital text into authentic handwritten pages. Start free and upgrade as you grow.
            </Text>
          </VStack>

          {/* Plans Grid */}
          <Grid 
            ref={plansRef}
            templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} 
            gap={8} 
            mb={16}
          >
            {plans.map((plan, index) => {
              const planData = getPlanDisplayData(plan)
              return (
                <Card
                  key={index}
                  bg="white"
                  shadow="xl"
                  borderRadius="3xl"
                  border={planData.popular ? `3px solid ${accentColor}` : "1px solid"}
                  borderColor={planData.popular ? accentColor : "gray.200"}
                  position="relative"
                  _hover={{ shadow: "2xl", transform: "translateY(-8px)" }}
                  transition="all 0.3s ease"
                >
                  {planData.popular && (
                    <Badge
                      position="absolute"
                      top={-3}
                      left="50%"
                      transform="translateX(-50%)"
                      bg={accentColor}
                      color="white"
                      px={4}
                      py={2}
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="bold"
                      zIndex={10}
                    >
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardBody p={8}>
                    <VStack spacing={6} align="stretch">
                      {/* Plan Header */}
                      <VStack spacing={4} textAlign="center">
                        <Box
                          w={16}
                          h={16}
                          bg={planData.bgColor}
                          color={planData.color}
                          borderRadius="2xl"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon as={planData.icon} h={8} w={8} />
                        </Box>
                        <VStack spacing={2}>
                          <Heading fontSize="2xl" fontWeight="bold" color={textColor}>
                            {planData.name}
                          </Heading>
                          <Text color="#666" fontSize="lg">
                            {planData.description}
                          </Text>
                        </VStack>
                      </VStack>

                      {/* Pricing */}
                      <VStack spacing={1} textAlign="center">
                        <HStack spacing={1} justify="center">
                          <Text fontSize="4xl" fontWeight="bold" color={textColor}>
                            {planData.price}
                          </Text>
                          <Text fontSize="lg" color="#666">
                            /{planData.period}
                          </Text>
                        </HStack>
                      </VStack>

                      <Divider />

                      {/* Features */}
                      <VStack spacing={4} align="stretch">
                        <Text fontWeight="semibold" color={textColor} fontSize="lg">
                          What's included:
                        </Text>
                        <List spacing={3}>
                          {planData.features.map((feature: string, featureIndex: number) => (
                            <ListItem key={featureIndex} display="flex" alignItems="center">
                              <ListIcon as={FiCheck} color="green.500" />
                              <Text color="#666" fontSize="sm">
                                {feature}
                              </Text>
                            </ListItem>
                          ))}
                        </List>
                        
                        {planData.limitations && planData.limitations.length > 0 && (
                          <>
                            <Text fontWeight="semibold" color="red.500" fontSize="lg" mt={4}>
                              Limitations:
                            </Text>
                            <List spacing={3}>
                              {planData.limitations.map((limitation: string, limitationIndex: number) => (
                                <ListItem key={limitationIndex} display="flex" alignItems="center">
                                  <Box w={2} h={2} bg="red.500" borderRadius="full" mr={3} />
                                  <Text color="#666" fontSize="sm">
                                    {limitation}
                                  </Text>
                                </ListItem>
                              ))}
                            </List>
                          </>
                        )}
                      </VStack>

                      {/* CTA Button */}
                      <Button
                        bg={planData.buttonVariant === "solid" ? accentColor : "transparent"}
                        color={planData.buttonVariant === "solid" ? "white" : accentColor}
                        border={planData.buttonVariant === "outline" ? `2px solid ${accentColor}` : "none"}
                        _hover={{
                          bg: planData.buttonVariant === "solid" ? "#FF8A33" : "orange.50",
                        }}
                        h={14}
                        borderRadius="full"
                        fontWeight="semibold"
                        fontSize="lg"
                        onClick={() => {
                          if (planData.name === "Free Plan") {
                            router.push("/sign-in")
                          } else {
                            // Handle pro plan signup
                            router.push("/sign-in")
                          }
                        }}
                      >
                        {planData.buttonText}
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              )
            })}
          </Grid>

          {/* Features Section */}
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading fontSize={{ base: "3xl", lg: "4xl" }} fontWeight="bold" color={textColor}>
                All Plans Include
              </Heading>
              <Text fontSize="lg" color="#666" maxW="2xl">
                Powerful features to help you create authentic handwritten content
              </Text>
            </VStack>

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
              {features.map((feature, index) => (
                <Card key={index} bg="white" shadow="lg" borderRadius="2xl" border={0}>
                  <CardBody p={6} textAlign="center">
                    <VStack spacing={4}>
                      <Box
                        w={12}
                        h={12}
                        bg={bgColor}
                        color={accentColor}
                        borderRadius="xl"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={feature.icon} h={6} w={6} />
                      </Box>
                      <VStack spacing={2}>
                        <Text fontWeight="semibold" color={textColor}>
                          {feature.title}
                        </Text>
                        <Text color="#666" fontSize="sm" lineHeight="relaxed">
                          {feature.description}
                        </Text>
                      </VStack>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box as="section" px={6} py={20} bg="white">
        <Container maxW="4xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading fontSize={{ base: "3xl", lg: "4xl" }} fontWeight="bold" color={textColor}>
                Frequently Asked Questions
              </Heading>
            </VStack>

            <VStack spacing={6} w="full">
              {[
                {
                  question: "Can I cancel my subscription anytime?",
                  answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through Stripe.",
                },
                {
                  question: "Is there a free trial?",
                  answer: "Yes! All paid plans come with a 7-day free trial. No credit card required to start your trial.",
                },
                {
                  question: "Can I upgrade or downgrade my plan?",
                  answer: "Absolutely! You can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle.",
                },
                {
                  question: "What happens if I exceed my monthly limit?",
                  answer: "You'll receive a notification when you're close to your limit. You can either upgrade your plan or wait until the next billing cycle.",
                },
              ].map((faq, index) => (
                <Card key={index} bg="white" shadow="sm" borderRadius="2xl" border="1px solid" borderColor="gray.200" w="full">
                  <CardBody p={6}>
                    <VStack spacing={3} align="stretch">
                      <Text fontWeight="semibold" color={textColor} fontSize="lg">
                        {faq.question}
                      </Text>
                      <Text color="#666" lineHeight="relaxed">
                        {faq.answer}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </VStack>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box
        as="section"
        px={6}
        py={20}
        bgGradient="linear(to-br, #FF6A00, #FF8A33)"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          inset={0}
          bgImage="url('https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=400&fit=crop&crop=center')"
          opacity={0.1}
        />
        <Container maxW="4xl" textAlign="center" position="relative" zIndex={10}>
          <VStack spacing={8}>
            <Heading fontSize={{ base: "4xl", lg: "5xl" }} fontWeight="bold" color="white" lineHeight="tight">
              Ready to Get Started?
            </Heading>
            <Text fontSize="xl" color="whiteAlpha.900" maxW="2xl">
              Join thousands of users who trust Pen My Work for authentic handwritten content. Start your free trial today.
            </Text>

            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={4}
              maxW="md"
              mx="auto"
            >
              <Button
                bg="white"
                _hover={{ bg: "gray.100" }}
                color={textColor}
                h={14}
                px={8}
                borderRadius="full"
                fontWeight="semibold"
                fontSize="lg"
                onClick={() => router.push("/sign-in")}
              >
                Start Free Trial
              </Button>
              <Button
                bg="transparent"
                _hover={{ bg: "whiteAlpha.200" }}
                color="white"
                h={14}
                px={8}
                borderRadius="full"
                fontWeight="semibold"
                fontSize="lg"
                border="2px solid white"
                onClick={() => router.push("/plans")}
              >
                View All Plans
              </Button>
            </Flex>

            <Text color="whiteAlpha.800" fontSize="sm">
              No credit card required • 7-day free trial • Cancel anytime
            </Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
