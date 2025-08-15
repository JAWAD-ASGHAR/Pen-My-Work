"use client";

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
  List,
  ListItem,
  ListIcon,
  Image,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  FiStar,
  FiZap,
  FiUsers,
  FiDownload,
  FiRepeat,
  FiShield,
} from "react-icons/fi";
import { FaCircleCheck } from "react-icons/fa6";
import { gsap } from "gsap";
import { useRef } from "react";
import { Banner } from "@/components/banner";
import { Navbar } from "@/components/nav";
import { useRouter } from "next/navigation";
import { getPlans } from "@/server/actions/user-plans";
import { PlanButton } from "@/components/PlanButton";

type Plan = {
  planId: string;
  name: string;
  price: string;
  description?: string | null;
  features?: string[] | null;
  limitations?: string[] | null;
  variantId?: number | null;
  productId?: number | null;
  productName?: string | null;
  isUsageBased?: boolean | null;
  interval?: string | null;
  intervalCount?: number | null;
  trialInterval?: string | null;
  trialIntervalCount?: number | null;
  sort?: number | null;
};

export default function PlansPage() {
  const bgColor = "#F7F7D2";
  const textColor = "#1A1A1A";
  const accentColor = "#FF6A00";
  const router = useRouter();

  const plansRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plansData = await getPlans();
        setPlans(plansData);
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Banner animation
      gsap.fromTo(
        bannerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );

      // Header animation
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out",
        }
      );

      // Hero content animation
      gsap.fromTo(
        heroRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.4,
          ease: "power2.out",
        }
      );

      // Plans animation - smoother and less aggressive
      gsap.fromTo(
        plansRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.6,
          ease: "power2.out",
        }
      );

      // Features animation
      gsap.fromTo(
        featuresRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 1.0,
          ease: "power2.out",
        }
      );
    });
    return () => ctx.revert();
  }, [loading]);

  // Function to get plan display data based on database plan
  const getPlanDisplayData = (plan: {
    planId: string;
    name: string;
    price: string;
    description?: string | null;
    features?: string[] | null;
    limitations?: string[] | null;
    variantId?: number | null;
  }) => {
    const baseData = {
      name: plan.name,
      price:
        plan.price === "0"
          ? "$0"
          : `$${(parseInt(plan.price) / 100).toFixed(2)}`, // Convert cents to dollars
      period: plan.price === "0" ? "forever" : "per month",
      description: plan.description,
      color: plan.planId === "free" ? "gray.500" : accentColor,
      bgColor: plan.planId === "free" ? "gray.50" : "orange.50",
      popular: plan.planId === "pro",
      buttonText:
        plan.planId === "free" ? "Get Started Free" : "Start Pro Trial",
      buttonVariant:
        plan.planId === "free" ? ("outline" as const) : ("solid" as const),
      icon: plan.planId === "free" ? FiStar : FiZap,
      features: Array.isArray(plan.features) ? plan.features : [],
      limitations: Array.isArray(plan.limitations) ? plan.limitations : [],
      planId: plan.planId,
      variantId: plan.variantId || undefined,
    };

    return baseData;
  };

  const features = [
    {
      icon: FiDownload,
      title: "High-Quality Downloads",
      description:
        "Get your handwritten pages in multiple formats and resolutions",
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
  ];

  if (loading) {
    return (
      <Box
        minH="100vh"
        bg="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text>Loading plans...</Text>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="white">
      <Banner ref={bannerRef} />
      <Box h="16px" />
      <Navbar
        ref={headerRef}
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        router={router}
      />

      {/* Hero Section - Matching landing page design */}
      <Box as="section" px={6} py={20} bg={"white"}>
        <Container maxW="7xl">
          <VStack ref={heroRef} spacing={6} textAlign="center" mb={16}>
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
              Transform your digital text into authentic handwritten pages.
              Start free and upgrade as you grow.
            </Text>
          </VStack>

          {/* Plans Grid - Improved design */}
          <Grid
            ref={plansRef}
            templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
            gap={8}
            mb={16}
          >
            {plans.map((plan, index) => {
              const planData = getPlanDisplayData(plan);
              return (
                <Card
                  key={index}
                  position="relative"
                  overflow="hidden"
                  bg="#FDF7EE"
                  border="2px solid #000000"
                  boxShadow="4px 4px 0px #000000"
                  borderRadius="xl"
                  _hover={{ boxShadow: "8px 8px 0px #000000" }}
                  transition="box-shadow 0.2s"
                >
                  <CardBody p={8}>
                    <VStack  align="start">
                      {/* Plan Title */}
                      <VStack spacing={2} align="start">
                        <Heading
                          fontSize="xl"
                          fontWeight="semibold"
                          color={textColor}
                        >
                          {planData.name}
                        </Heading>
                      </VStack>

                      {/* Pricing */}
                      <VStack align="start">
                        <HStack spacing={1}>
                          <Text
                            fontSize="5xl"
                            fontWeight="bold"
                            color={textColor}
                          >
                            {planData.price}
                          </Text>
                          <Text fontSize="lg" color="#666">
                            /{planData.period}
                          </Text>
                        </HStack>
                        <Text color="#666" fontSize="sm">
                          {planData.description}
                        </Text>
                      </VStack>

                      {/* CTA Button */}
                      <PlanButton
                        plan={{
                          planId: plan.planId,
                          name: plan.name,
                          price: plan.price,
                          variantId: plan.variantId || undefined,
                        }}
                      />

                      <Divider borderColor="gray.400" my={4} />

                      {/* Features Section */}
                      <VStack spacing={2} align="start">
                        <Text
                          fontWeight="bold"
                          color={textColor}
                          fontSize="sm"
                          textTransform="uppercase"
                        >
                          Features
                        </Text>
                        <Text color="#gray.700" fontSize="sm" mb={4}>
                          {planData.planId === "free"
                            ? "Everything you need to get started"
                            : planData.planId === "pro"
                            ? "Everything in our free plan plus...."
                            : "Everything in Pro plus...."}
                        </Text>
                        <List spacing={2}>
                          {planData.features
                            .slice(0, 4)
                            .map((feature: string, featureIndex: number) => (
                              <ListItem
                                key={featureIndex}
                                display="flex"
                                alignItems="center"
                              >
                                <ListIcon
                                  as={FaCircleCheck}
                                  color="green.500"
                                  boxSize={4}
                                />
                                <Text color="#gray.700" fontSize="sm">
                                  {feature}
                                </Text>
                              </ListItem>
                            ))}
                        </List>
                      </VStack>
                    </VStack>
                  </CardBody>
                </Card>
              );
            })}

            {/* Manual Handwriting Comparison Card */}
            <Card
              position="relative"
              overflow="hidden"
              bg="#FDF7EE"
              border="2px solid #000000"
              boxShadow="4px 4px 0px #000000"
              borderRadius="xl"
              _hover={{ boxShadow: "8px 8px 0px #000000" }}
              transition="box-shadow 0.2s"
            >
              <CardBody p={8}>
                <VStack spacing={6} align="stretch">
                  {/* Plan Title */}
                  <VStack spacing={2} textAlign="center">
                    <Heading fontSize="2xl" fontWeight="bold" color="gray.500">
                      Manual Handwriting
                    </Heading>
                  </VStack>

                  {/* Pricing with strikethrough */}
                  <VStack spacing={1} textAlign="center">
                    <HStack spacing={1} justify="center">
                      <Text
                        fontSize="5xl"
                        fontWeight="bold"
                        color="gray.400"
                        textDecoration="line-through"
                      >
                        $50
                      </Text>
                      <Text fontSize="lg" color="gray.400">
                        /page
                      </Text>
                    </HStack>
                    <Text color="gray.400" fontSize="md">
                      Hire someone to write by hand
                    </Text>
                  </VStack>

                  {/* Disabled CTA Button */}
                  <Button
                    bg="gray.100"
                    color="gray.400"
                    border="2px solid"
                    borderColor="gray.200"
                    h={14}
                    borderRadius="full"
                    fontWeight="semibold"
                    fontSize="lg"
                    w="full"
                    cursor="not-allowed"
                    _hover={{
                      bg: "gray.100",
                      transform: "none",
                    }}
                    _active={{
                      transform: "none",
                    }}
                  >
                    Not Available
                  </Button>

                  {/* Features Section */}
                  <VStack spacing={2} align="stretch">
                    <Text
                      fontWeight="bold"
                      color="gray.500"
                      fontSize="sm"
                      textTransform="uppercase"
                    >
                      Features
                    </Text>
                    <Text color="gray.400" fontSize="xs" mb={2}>
                      What you get with manual service
                    </Text>
                    <List spacing={1}>
                      <ListItem display="flex" alignItems="center">
                        <Box
                          w={2}
                          h={2}
                          bg="gray.400"
                          borderRadius="full"
                          mr={3}
                        />
                        <Text color="gray.400" fontSize="xs">
                          One-time handwriting service
                        </Text>
                      </ListItem>
                      <ListItem display="flex" alignItems="center">
                        <Box
                          w={2}
                          h={2}
                          bg="gray.400"
                          borderRadius="full"
                          mr={3}
                        />
                        <Text color="gray.400" fontSize="xs">
                          No digital copies
                        </Text>
                      </ListItem>
                      <ListItem display="flex" alignItems="center">
                        <Box
                          w={2}
                          h={2}
                          bg="gray.400"
                          borderRadius="full"
                          mr={3}
                        />
                        <Text color="gray.400" fontSize="xs">
                          Limited revisions
                        </Text>
                      </ListItem>
                      <ListItem display="flex" alignItems="center">
                        <Box
                          w={2}
                          h={2}
                          bg="gray.400"
                          borderRadius="full"
                          mr={3}
                        />
                        <Text color="gray.400" fontSize="xs">
                          Shipping costs extra
                        </Text>
                      </ListItem>
                    </List>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </Grid>

          {/* Features Section - Improved design */}
          <VStack ref={featuresRef} spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading
                fontSize={{ base: "3xl", lg: "4xl" }}
                fontWeight="bold"
                color={textColor}
              >
                All Plans Include
              </Heading>
              <Text fontSize="lg" color="#666" maxW="2xl">
                Powerful features to help you create authentic handwritten
                content
              </Text>
            </VStack>

            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={6}
            >
              {features.map((feature, index) => (
                <Card
                  key={index}
                  bg="#FDF7EE"
                  border="2px solid #000000"
                  boxShadow="4px 4px 0px #000000"
                  borderRadius="xl"
                  _hover={{ boxShadow: "8px 8px 0px #000000" }}
                  transition="box-shadow 0.2s"
                >
                  <CardBody p={6} textAlign="center">
                    <VStack spacing={4}>
                      <Box
                        w={12}
                        h={12}
                        bg={accentColor}
                        color={"white"}
                        borderRadius="lg"
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

      {/* Wave Top - Transition from bgColor to white */}
      <Box position="relative" bg={"white"}>
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          zIndex={1}
          transform="translateY(1px) rotate(180deg)"
        >
          <Image
            src="/wavetop.svg"
            alt=""
            w="full"
            h="auto"
            objectFit="cover"
            filter="brightness(0) saturate(100%) invert(97%) sepia(5%) saturate(1200%) hue-rotate(355deg) brightness(105%) contrast(94%)"
          />
        </Box>
        <Box h="150px" bg={"white"} />
      </Box>

      {/* FAQ Section - Improved design */}
      <Box as="section" px={6} py={20} bg={bgColor}>
        <Container maxW="4xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading
                fontSize={{ base: "3xl", lg: "4xl" }}
                fontWeight="bold"
                color={textColor}
              >
                Frequently Asked Questions
              </Heading>
            </VStack>

            <VStack spacing={6} w="full">
              {[
                {
                  question: "Can I cancel my subscription anytime?",
                  answer:
                    "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through Stripe.",
                },
                {
                  question: "Is there a free trial?",
                  answer:
                    "Yes! All paid plans come with a 7-day free trial. No credit card required to start your trial.",
                },
                {
                  question: "Can I upgrade or downgrade my plan?",
                  answer:
                    "Absolutely! You can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle.",
                },
                {
                  question: "What happens if I exceed my monthly limit?",
                  answer:
                    "You'll receive a notification when you're close to your limit. You can either upgrade your plan or wait until the next billing cycle.",
                },
              ].map((faq, index) => (
                <Card
                  key={index}
                  w="full"
                  bg="white"
                  border="2px solid #000000"
                  boxShadow="4px 4px 0px #000000"
                  borderRadius="xl"
                  _hover={{ boxShadow: "8px 8px 0px #000000" }}
                  transition="box-shadow 0.2s"
                >
                  <CardBody p={6}>
                    <VStack spacing={3} align="stretch">
                      <Text
                        fontWeight="semibold"
                        color={textColor}
                        fontSize="lg"
                      >
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

      {/* Wave Bottom - Transition from white to dark */}
      <Box position="relative" bg="white">
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          zIndex={1}
          transform="translateY(1px) rotate(180deg)"
        >
          <Image
            src="/wavetop.svg"
            alt=""
            w="full"
            h="auto"
            objectFit="cover"
          />
        </Box>
        <Box h="150px" bg={bgColor} />
      </Box>

      {/* Final CTA - Matching landing page design */}
      <Box
        as="section"
        px={6}
        py={20}
        bg="#FF9966"
        position="relative"
        overflow="hidden"
      >
        <Container
          maxW="4xl"
          textAlign="center"
          position="relative"
          zIndex={10}
        >
          <VStack spacing={8}>
            <Heading
              fontSize={{ base: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color="gray.800"
              lineHeight="tight"
            >
              Ready to Get Started?
            </Heading>
            <Text fontSize="xl" color="gray.800" maxW="2xl">
              Join thousands of users who trust Pen My Work for authentic
              handwritten content. Start your free trial today.
            </Text>

            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={4}
              maxW="md"
              mx="auto"
            >
              <Button
                bg="white"
                h={14}
                px={8}
                color="gray.800"
                borderRadius="full"
                fontWeight="semibold"
                fontSize="lg"
                border="2px solid black"
                boxShadow="4px 4px 0px #000000"
                _hover={{
                  bg: "gray.100",
                  boxShadow: "8px 8px 0px #000000",
                }}
                transition="all 0.2s"
                onClick={() => router.push("/sign-in")}
              >
                Start Free Trial
              </Button>
              <Button
                bg="transparent"
                _hover={{ bg: "whiteAlpha.200" }}
                h={14}
                px={8}
                borderRadius="full"
                fontWeight="semibold"
                color="gray.800"
                fontSize="lg"
                border="2px solid black"
                onClick={() => router.push("/sign-in")}
              >
                Sign In
              </Button>
            </Flex>

            <Text color="gray.800" fontSize="sm">
              No credit card required • 7-day free trial • Cancel anytime
            </Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}
