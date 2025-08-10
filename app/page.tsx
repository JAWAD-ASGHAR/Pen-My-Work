"use client";
import { Banner } from "@/components/banner";
import { HeroSection } from "@/components/hero";
import { Navbar } from "@/components/nav";
import { gsap } from "gsap";

import {
  Box,
  Button,
  Input,
  Card,
  CardBody,
  Container,
  Flex,
  Text,
  Heading,
  VStack,
  HStack,
  Grid,
  Image,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  FiPenTool,
  FiUpload,
  FiDownload,
  FiBriefcase,
  FiStar,
  FiCheckCircle,
  FiBookOpen,
  FiImage,
  FiClock,
  FiArrowRight,
  FiShield,
  FiCheck,
} from "react-icons/fi";
import { PreviewPanels } from "@/components/panels";

export default function HandwritingAILanding() {
  const bgColor = "#FDF7EE";
  const textColor = "#1A1A1A";
  const accentColor = "#FF6A00";
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerTimeline = useRef<gsap.core.Timeline | null>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Banner animation
      gsap.fromTo(
        bannerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );

      // Header animation (initial)
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

      // Preview panels animation
      gsap.fromTo(
        previewRef.current?.children || [],
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          delay: 0.8,
          ease: "power2.out",
        }
      );

      // Header shrink on scroll
      if (headerRef.current) {
        headerTimeline.current = gsap
          .timeline({ paused: true })
          .to(headerRef.current, {
            scale: 0.95,
            paddingTop: 8,
            paddingBottom: 8,
            boxShadow: "0 2px 16px 0 rgba(0,0,0,0.10)",
            duration: 0.3,
            ease: "power2.out",
          });
      }

      const handleScroll = () => {
        if (!headerTimeline.current || typeof window === "undefined") return;
        if (window.scrollY > 30) {
          headerTimeline.current.play();
          setScrolled(true);
        } else {
          headerTimeline.current.reverse();
          setScrolled(false);
        }
      };

      if (typeof window !== "undefined") {
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <Box minH="100vh" bg="white">
      <Banner ref={bannerRef} />
      <Box h="16px" /> {/* Spacer to push header below banner */}
      <Navbar
        ref={headerRef}
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        router={router}
      />
      <Container as="main" centerContent maxW="6xl" px={2} py={[0, null, 8]}>
        <VStack
          w="full"
          bg="#FDF7EE"
          borderRadius="2xl"
          shadow="sm"
          px={[6, null, 16]}
          pt={8}
          pb={0}
          mt={4}
        >
          <HeroSection ref={heroRef} />
          <PreviewPanels ref={previewRef} />
        </VStack>
      </Container>
      {/* How It Works */}
      <Box as="section" id="how-it-works" px={6} py={20} bg="white">
        <Container maxW="7xl">
          <VStack spacing={4} mb={16} textAlign="center">
            <Heading
              fontSize={{ base: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color={textColor}
            >
              How It{" "}
              <Box position="relative" display="inline">
                <Box
                  position="absolute"
                  bottom="-13px"
                  left="-8px"
                  right="-8px"
                >
                  <Image
                    src="/underline.svg"
                    alt=""
                    w="full"
                    h="full"
                    objectFit="cover"
                    style={{ transform: "scale(0.8)" }}
                  />
                </Box>
                <Box position="relative" zIndex={1} display="inline">
                  Works
                </Box>
              </Box>
            </Heading>
            <Text fontSize="xl" color="#666" maxW="2xl">
              Transform your typed content into authentic handwritten pages in
              just three simple steps.
            </Text>
          </VStack>

          <Grid templateColumns={{ md: "repeat(3, 1fr)" }} gap={8}>
            {[
              {
                icon: FiUpload,
                step: "01",
                title: "Paste Your Content",
                description:
                  "Simply paste or type your text - assignments, letters, notes, or any content you want handwritten.",
                image:
                  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop&crop=center",
              },
              {
                icon: FiPenTool,
                step: "02",
                title: "Choose Style & Paper",
                description:
                  "Select from various handwriting styles and paper types to match your needs perfectly.",
                image:
                  "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop&crop=center",
              },
              {
                icon: FiDownload,
                step: "03",
                title: "Download Image",
                description:
                  "Get your photo-realistic handwritten page instantly, ready to use or print.",
                image:
                  "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=200&fit=crop&crop=center",
              },
            ].map((item, index) => (
              <Card
                key={index}
                bg="#FDF7EE"
                border="2px solid #000000"
                boxShadow="4px 4px 0px #000000"
                borderRadius="xl"
                _hover={{ boxShadow: "8px 8px 0px #000000" }}
                transition="box-shadow 0.2s"
              >
                <CardBody p={8}>
                  <VStack spacing={6}>
                    <Box position="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        w="full"
                        h={48}
                        objectFit="cover"
                        borderRadius="2xl"
                      />
                      <Box
                        position="absolute"
                        bottom="-16px"
                        left="50%"
                        transform="translateX(-50%)"
                      >
                        <Box
                          w={16}
                          h={16}
                          bg={accentColor}
                          borderRadius="2xl"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon as={item.icon} h={8} w={8} color="white" />
                        </Box>
                        <Box
                          position="absolute"
                          top="-8px"
                          right="-8px"
                          w={8}
                          h={8}
                          bg={textColor}
                          color="white"
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontSize="sm"
                          fontWeight="bold"
                        >
                          {item.step}
                        </Box>
                      </Box>
                    </Box>
                    <VStack spacing={4} pt={4} textAlign="center">
                      <Heading
                        fontSize="xl"
                        fontWeight="bold"
                        color={textColor}
                      >
                        {item.title}
                      </Heading>
                      <Text color="#666" lineHeight="relaxed">
                        {item.description}
                      </Text>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* Wave Top - Transition from white to bgColor */}
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
        <Box h="150px" bg="white" />
      </Box>
      {/* See The Magic Section */}
      <Box as="section" px={6} py={20} bg="#FF9966" position="relative">
        {/* Background decoration */}
        <Box
          position="absolute"
          top="10%"
          right="5%"
          w="200px"
          h="200px"
          bg={accentColor}
          opacity={0.05}
          borderRadius="full"
          filter="blur(40px)"
        />
        <Box
          position="absolute"
          bottom="10%"
          left="5%"
          w="150px"
          h="150px"
          bg={accentColor}
          opacity={0.05}
          borderRadius="full"
          filter="blur(30px)"
        />

        <Container maxW="7xl" position="relative">
          <VStack spacing={6} mb={10} textAlign="center">
            <Heading
              fontSize={{ base: "4xl", lg: "6xl" }}
              fontWeight="extrabold"
              color={textColor}
              lineHeight="tight"
            >
              See The{" "}
              <Box position="relative" display="inline">
                <Box
                  position="absolute"
                  bottom="-20px"
                  left="-8px"
                  right="-8px"
                >
                  <Image
                    src="/underline.svg"
                    alt=""
                    w="full"
                    h="full"
                    objectFit="cover"
                    style={{
                      transform: "scale(0.9)",
                      filter:
                        "brightness(0) saturate(100%) invert(84%) sepia(31%) saturate(638%) hue-rotate(359deg) brightness(103%) contrast(107%)",
                    }}
                  />
                </Box>
                <Box position="relative" zIndex={1} display="inline">
                  Magic
                </Box>
              </Box>
            </Heading>
            <Text
              fontSize={{ base: "lg", lg: "xl" }}
              color="black"
              maxW="3xl"
              lineHeight="relaxed"
              fontWeight="medium"
            >
              Real examples of typed text transformed into authentic handwritten
              pages.
            </Text>
          </VStack>

          <VStack spacing={20}>
            {/* Example 1 - Academic Essay */}
            <Box w="full">
              <Grid
                templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
                gap={{ base: 8, lg: 12 }}
                alignItems="stretch"
                maxW="6xl"
                mx="auto"
              >
                {/* Typed Input */}
                <Card
                  overflow="hidden"
                  bg="#FDF7EE"
                  border="2px solid #000000"
                  boxShadow="4px 4px 0px #000000"
                  borderRadius="xl"
                  transition="box-shadow 0.2s"
                >
                  <CardBody p={{ base: 6, lg: 8 }}>
                    <HStack gap={3} mb={6} align="center">
                      <HStack gap={1}>
                        <Box w={3} h={3} bg="red.400" borderRadius="full" />
                        <Box w={3} h={3} bg="yellow.400" borderRadius="full" />
                        <Box w={3} h={3} bg="green.400" borderRadius="full" />
                      </HStack>
                      <Text fontSize="sm" color="gray.500" fontWeight="medium">
                        Typed Input
                      </Text>
                    </HStack>
                    <Box
                      bg="gray.50"
                      borderRadius="2xl"
                      p={{ base: 5, lg: 6 }}
                      fontFamily="mono"
                      fontSize={{ base: "sm", lg: "md" }}
                      color={textColor}
                      lineHeight="relaxed"
                      border="1px solid"
                      borderColor="gray.200"
                      minH="200px"
                      display="flex"
                      alignItems="center"
                    >
                      The Industrial Revolution, which took place from the 18th
                      to 19th centuries, was a period during which predominantly
                      agrarian, rural societies in Europe and America became
                      industrial and urban. This transformation included going
                      from hand production methods to machines, new chemical
                      manufacturing and iron production processes.
                    </Box>
                  </CardBody>
                </Card>

                {/* AI Handwritten Output */}
                <Card
                  overflow="hidden"
                  bg="#FDF7EE"
                  border="2px solid #000000"
                  boxShadow="4px 4px 0px #000000"
                  borderRadius="xl"
                  transition="box-shadow 0.2s"
                >
                  <CardBody p={{ base: 6, lg: 8 }}>
                    <HStack gap={3} mb={6} align="center">
                      <Icon as={FiCheckCircle} w={5} h={5} color="green.500" />
                      <Text fontSize="sm" color="gray.500" fontWeight="medium">
                        AI Handwritten Output
                      </Text>
                    </HStack>
                    <Box
                      position="relative"
                      borderRadius="2xl"
                      overflow="hidden"
                    >
                      <Image
                        src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop&crop=center"
                        alt="Handwritten essay on lined paper"
                        w="full"
                        h={{ base: "240px", lg: "280px" }}
                        objectFit="cover"
                      />
                      <Box
                        position="absolute"
                        inset={0}
                        bgGradient="linear(to-t, blackAlpha.200, transparent)"
                      />
                      <Box
                        position="absolute"
                        top={4}
                        right={4}
                        bg="white"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="semibold"
                        color="green.600"
                        boxShadow="md"
                      >
                        AI Generated
                      </Box>
                    </Box>
                  </CardBody>
                </Card>
              </Grid>
            </Box>

            {/* Example 2 - Personal Letter */}
            <Box w="full">
              <Grid
                templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
                gap={{ base: 8, lg: 12 }}
                alignItems="stretch"
                maxW="6xl"
                mx="auto"
              >
                {/* AI Handwritten Output */}
                <Card
                  overflow="hidden"
                  order={{ base: 1, lg: 1 }}
                  bg="#FDF7EE"
                  border="2px solid #000000"
                  boxShadow="4px 4px 0px #000000"
                  borderRadius="xl"
                  transition="box-shadow 0.2s"
                >
                  <CardBody p={{ base: 6, lg: 8 }}>
                    <HStack gap={3} mb={6} align="center">
                      <Icon as={FiCheckCircle} w={5} h={5} color="green.500" />
                      <Text fontSize="sm" color="gray.500" fontWeight="medium">
                        AI Handwritten Output
                      </Text>
                    </HStack>
                    <Box
                      position="relative"
                      borderRadius="2xl"
                      overflow="hidden"
                    >
                      <Image
                        src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop&crop=center"
                        alt="Handwritten letter on personal stationery"
                        w="full"
                        h={{ base: "240px", lg: "280px" }}
                        objectFit="cover"
                      />
                      <Box
                        position="absolute"
                        inset={0}
                        bgGradient="linear(to-t, blackAlpha.200, transparent)"
                      />
                      <Box
                        position="absolute"
                        top={4}
                        right={4}
                        bg="white"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="semibold"
                        color="green.600"
                        boxShadow="md"
                      >
                        AI Generated
                      </Box>
                    </Box>
                  </CardBody>
                </Card>

                {/* Typed Input */}
                <Card
                  overflow="hidden"
                  order={{ base: 2, lg: 2 }}
                  bg="#FDF7EE"
                  border="2px solid #000000"
                  boxShadow="4px 4px 0px #000000"
                  borderRadius="xl"
                  transition="box-shadow 0.2s"
                >
                  <CardBody p={{ base: 6, lg: 8 }}>
                    <HStack gap={3} mb={6} align="center">
                      <HStack gap={1}>
                        <Box w={3} h={3} bg="red.400" borderRadius="full" />
                        <Box w={3} h={3} bg="yellow.400" borderRadius="full" />
                        <Box w={3} h={3} bg="green.400" borderRadius="full" />
                      </HStack>
                      <Text fontSize="sm" color="gray.500" fontWeight="medium">
                        Typed Input
                      </Text>
                    </HStack>
                    <Box
                      bg="gray.50"
                      borderRadius="2xl"
                      p={{ base: 5, lg: 6 }}
                      fontFamily="mono"
                      fontSize={{ base: "sm", lg: "md" }}
                      color={textColor}
                      lineHeight="relaxed"
                      border="1px solid"
                      borderColor="gray.200"
                      minH="200px"
                      display="flex"
                      alignItems="center"
                    >
                      Dear Mom and Dad,
                      <br />
                      <br />I hope you&apos;re both doing well. College has been
                      amazing so far! I&apos;ve made some great friends and my
                      professors are really inspiring. The campus is beautiful,
                      especially in the fall with all the colorful leaves.
                      <br />
                      <br />
                      Love you both,
                      <br />
                      Emma
                    </Box>
                  </CardBody>
                </Card>
              </Grid>
            </Box>
          </VStack>
        </Container>
      </Box>
      {/* Wave Bottom - Transition from bgColor to white */}
      <Box position="relative" bg={bgColor}>
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          zIndex={1}
          transform="translateY(-1px)"
        >
          <Image
            src="/wavetop.svg"
            alt=""
            w="full"
            h="auto"
            objectFit="cover"
          />
        </Box>
        <Box h="20px" bg={bgColor} />
      </Box>
      {/* Use Cases */}
      <Box as="section" px={6} mt={40} py={20} bg="white">
        <Container maxW="7xl">
          <VStack spacing={4} mb={16} textAlign="center">
            <Heading
              fontSize={{ base: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color={textColor}
            >
              Perfect For{" "}
              <Box position="relative" display="inline">
                <Box
                  position="absolute"
                  bottom="-25px"
                  left="-8px"
                  right="-8px"
                >
                  <Image
                    src="/underline.svg"
                    alt=""
                    w="full"
                    h="full"
                    objectFit="cover"
                    style={{ transform: "scale(0.9)" }}
                  />
                </Box>
                <Box position="relative" zIndex={1} display="inline">
                  Everyone
                </Box>
              </Box>
            </Heading>
          </VStack>

          <Grid
            templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
            gap={6}
          >
            {[
              {
                icon: FiStar,
                title: "Students",
                description:
                  "Assignments, essays, and homework that look authentically handwritten.",
                color: "blue.100",
                iconColor: "blue.600",
                image:
                  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop&crop=center",
              },
              {
                icon: FiBriefcase,
                title: "Professionals",
                description:
                  "Personal notes, letters, and documents with a human touch.",
                color: "green.100",
                iconColor: "green.600",
                image:
                  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=200&fit=crop&crop=center",
              },
              {
                icon: FiBookOpen,
                title: "Educators",
                description:
                  "Create worksheets and materials that feel personal and engaging.",
                color: "purple.100",
                iconColor: "purple.600",
                image:
                  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop&crop=center",
              },
              {
                icon: FiImage,
                title: "Designers",
                description:
                  "Handwritten assets for projects, mockups, and creative work.",
                color: "pink.100",
                iconColor: "pink.600",
                image:
                  "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop&crop=center",
              },
            ].map((item, index) => (
              <Card
                key={index}
                overflow="hidden"
                bg="#FDF7EE"
                border="2px solid #000000"
                boxShadow="4px 4px 0px #000000"
                borderRadius="xl"
                _hover={{ boxShadow: "8px 8px 0px #000000" }}
                transition="box-shadow 0.2s"
              >
                <Box position="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    w="full"
                    h={48}
                    objectFit="cover"
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bgGradient="linear(to-t, blackAlpha.200, transparent)"
                  />
                  <Box
                    position="absolute"
                    bottom={4}
                    left={4}
                    w={12}
                    h={12}
                    bg={item.color}
                    color={item.iconColor}
                    borderRadius="xl"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={item.icon} h={6} w={6} />
                  </Box>
                </Box>
                <CardBody p={6}>
                  <VStack spacing={3} align="start">
                    <Heading fontSize="xl" fontWeight="bold" color={textColor}>
                      {item.title}
                    </Heading>
                    <Text color="#666" lineHeight="relaxed" fontSize="sm">
                      {item.description}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* Stats Section */}
      <Box as="section" px={6} py={20} bg={bgColor}>
        <Container maxW="7xl">
          <VStack spacing={4} mb={16} textAlign="center">
            <Heading
              fontSize={{ base: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color={textColor}
            >
              Trusted{" "}
              <Box position="relative" display="inline">
                <Box
                  position="absolute"
                  bottom="-30px"
                  left="-8px"
                  right="-8px"
                >
                  <Image
                    src="/underline.svg"
                    alt=""
                    w="full"
                    h="full"
                    objectFit="cover"
                    style={{ transform: "scale(0.8)" }}
                  />
                </Box>
                <Box position="relative" zIndex={1} display="inline">
                  Worldwide
                </Box>
              </Box>
            </Heading>
          </VStack>

          <Grid
            templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
            gap={6}
          >
            {[
              { number: "1M+", label: "Handwritten pages generated" },
              { number: "98%", label: "User satisfaction rate" },
              { number: "150K+", label: "Active users worldwide" },
              { number: "100+", label: "Countries served" },
            ].map((stat, index) => (
              <Card
                key={index}
                bg="white"
                border="2px solid #000000"
                boxShadow="4px 4px 0px #000000"
                borderRadius="xl"
                _hover={{ boxShadow: "8px 8px 0px #000000" }}
                transition="box-shadow 0.2s"
              >
                <CardBody p={8}>
                  <VStack spacing={2} textAlign="center">
                    <Text fontSize="4xl" fontWeight="bold" color={textColor}>
                      {stat.number}
                    </Text>
                    <Text color="#666">{stat.label}</Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* Testimonial Section */}
      <Box as="section" px={6} py={20} bg="white">
        <Container maxW="7xl">
          <Grid
            templateColumns={{ lg: "1fr 1fr" }}
            gap={12}
            alignItems="center"
          >
            <Card
              bg="#FDF7EE"
              border="2px solid #000000"
              boxShadow="4px 4px 0px #000000"
              borderRadius="xl"
              _hover={{ boxShadow: "8px 8px 0px #000000" }}
              transition="box-shadow 0.2s"
            >
              <CardBody p={8}>
                <VStack spacing={6} align="start">
                  <Heading fontSize="2xl" color={textColor}>
                    Why Students Love ScriptAI
                  </Heading>
                  
                  <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                    <Box p={4} bg="white" borderRadius="xl" border="1px solid" borderColor="gray.200">
                      <HStack mb={3}>
                        <Icon as={FiClock} color="blue.500" />
                        <Text fontWeight="medium">Save Time</Text>
                      </HStack>
                      <Text fontSize="sm" color="gray.600">
                        Convert typed work to handwriting in seconds instead of hours
                      </Text>
                    </Box>

                    <Box p={4} bg="white" borderRadius="xl" border="1px solid" borderColor="gray.200">
                      <HStack mb={3}>
                        <Icon as={FiCheck} color="green.500" />
                        <Text fontWeight="medium">Natural Look</Text>
                      </HStack>
                      <Text fontSize="sm" color="gray.600">
                        AI-generated writing that looks authentically human
                      </Text>
                    </Box>

                    <Box p={4} bg="white" borderRadius="xl" border="1px solid" borderColor="gray.200">
                      <HStack mb={3}>
                        <Icon as={FiShield} color="purple.500" />
                        <Text fontWeight="medium">Safe & Private</Text>
                      </HStack>
                      <Text fontSize="sm" color="gray.600">
                        Your content is always private and secure
                      </Text>
                    </Box>

                    <Box p={4} bg="white" borderRadius="xl" border="1px solid" borderColor="gray.200">
                      <HStack mb={3}>
                        <Icon as={FiDownload} color="orange.500" />
                        <Text fontWeight="medium">Easy Export</Text>
                      </HStack>
                      <Text fontSize="sm" color="gray.600">
                        Download as images or PDFs in one click
                      </Text>
                    </Box>
                  </Grid>

                  <Button
                    size="lg"
                    bg={accentColor}
                    color="white"
                    _hover={{ bg: "orange.500" }}
                    rightIcon={<Icon as={FiArrowRight} />}
                    w="full"
                  >
                    Try It Free
                  </Button>
                </VStack>
              </CardBody>
            </Card>

            <VStack spacing={8}>
              {[
                {
                  text: "ScriptAI saved me hours on my assignments. The handwriting looks so natural, my professors never knew the difference!",
                  author: "Alex Chen",
                  role: "Computer Science Student",
                  avatar:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
                },
                {
                  text: "As a teacher, I use this to create personalized worksheets. My students love the authentic handwritten feel.",
                  author: "Maria Rodriguez",
                  role: "Elementary School Teacher",
                  avatar:
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
                },
                {
                  text: "Perfect for my design projects. The handwritten elements add that human touch clients love.",
                  author: "James Wilson",
                  role: "Graphic Designer",
                  avatar:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  bg="white"
                  shadow="lg"
                  border="2px solid #000000"
                  boxShadow="4px 4px 0px #000000"
                  borderRadius="xl"
                  transition="box-shadow 0.2s"
                >
                  <CardBody p={6}>
                    <HStack spacing={1} mb={3}>
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          as={FiStar}
                          h={4}
                          w={4}
                          fill={accentColor}
                          color={accentColor}
                        />
                      ))}
                    </HStack>
                    <Text color={textColor} mb={4} lineHeight="relaxed">
                      &ldquo;{testimonial.text}&rdquo;
                    </Text>
                    <HStack spacing={3}>
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.author}
                        w={12}
                        h={12}
                        borderRadius="full"
                        objectFit="cover"
                      />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="semibold" color={textColor}>
                          {testimonial.author}
                        </Text>
                        <Text fontSize="sm" color="#666">
                          {testimonial.role}
                        </Text>
                      </VStack>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </Grid>
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
              color="white"
              lineHeight="tight"
            >
              Ready to Handwrite Anything?
            </Heading>
            <Text fontSize="xl" color="whiteAlpha.900" maxW="2xl">
              Join thousands of users who trust ScriptAI for authentic
              handwritten content. Start your free trial today.
            </Text>

            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={4}
              maxW="md"
              mx="auto"
            >
              <Input
                placeholder="Enter your email"
                flex={1}
                h={14}
                borderRadius="full"
                border={0}
                bg="white"
                color={textColor}
              />
              <Button
                bg={textColor}
                _hover={{ bg: "#333" }}
                color="white"
                h={14}
                px={8}
                borderRadius="full"
                fontWeight="semibold"
              >
                Try It Now
              </Button>
            </Flex>

            <Text color="whiteAlpha.800" fontSize="sm">
              No credit card required • 7-day free trial • Cancel anytime
            </Text>
          </VStack>
        </Container>
      </Box>
      {/* Footer */}
      <Box as="footer" bg={textColor} color="white" px={6} py={16}>
        <Container maxW="7xl">
          <Grid templateColumns={{ md: "repeat(4, 1fr)" }} gap={8} mb={12}>
            <VStack align="start" spacing={4}>
              <Flex align="center" gap={2}>
                <Icon as={FiPenTool} h={8} w={8} color={accentColor} />
                <Text fontSize="2xl" fontWeight="bold">
                  ScriptAI
                </Text>
              </Flex>
              <Text color="gray.400" lineHeight="relaxed">
                Transform typed text into authentic handwritten pages with
                AI-powered technology.
              </Text>
            </VStack>

            <VStack align="start" spacing={4}>
              <Text fontWeight="semibold">Features</Text>
              <VStack align="start" spacing={2} color="gray.400">
                <Text
                  as="a"
                  href="#"
                  _hover={{ color: "white" }}
                  transition="colors"
                >
                  AI Handwriting
                </Text>
                <Text
                  as="a"
                  href="#"
                  _hover={{ color: "white" }}
                  transition="colors"
                >
                  Multiple Styles
                </Text>
                <Text
                  as="a"
                  href="#"
                  _hover={{ color: "white" }}
                  transition="colors"
                >
                  Paper Types
                </Text>
                <Text
                  as="a"
                  href="#"
                  _hover={{ color: "white" }}
                  transition="colors"
                >
                  Bulk Processing
                </Text>
              </VStack>
            </VStack>

            <VStack align="start" spacing={4}>
              <Text fontWeight="semibold">Support</Text>
              <VStack align="start" spacing={2} color="gray.400">
                <Text
                  as="a"
                  href="#"
                  _hover={{ color: "white" }}
                  transition="colors"
                >
                  Help Center
                </Text>
                <Text
                  as="a"
                  href="#"
                  _hover={{ color: "white" }}
                  transition="colors"
                >
                  Tutorials
                </Text>
                <Text
                  as="a"
                  href="#"
                  _hover={{ color: "white" }}
                  transition="colors"
                >
                  FAQ
                </Text>
                <Text
                  as="a"
                  href="#"
                  _hover={{ color: "white" }}
                  transition="colors"
                >
                  Contact Us
                </Text>
              </VStack>
            </VStack>

            <VStack align="start" spacing={4}>
              <Text fontWeight="semibold">Company</Text>
              <VStack align="start" spacing={2} color="gray.400">
                <Text
                  as="a"
                  href="#"
                  _hover={{ color: "white" }}
                  transition="colors"
                >
                  About Us
                </Text>
                <Text
                  as="a"
                  href="/privacy"
                  _hover={{ color: "white" }}
                  transition="colors"
                >
                  Privacy Policy
                </Text>
                <Text
                  as="a"
                  href="/terms"
                  _hover={{ color: "white" }}
                  transition="colors"
                >
                  Terms of Service
                </Text>
                <Text
                  as="a"
                  href="#"
                  _hover={{ color: "white" }}
                  transition="colors"
                >
                  Careers
                </Text>
              </VStack>
            </VStack>
          </Grid>

          <Box
            borderTop="1px"
            borderColor="gray.800"
            pt={8}
            textAlign="center"
            color="gray.400"
          >
            <Text>&copy; 2024 ScriptAI. All rights reserved.</Text>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
