"use client"
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
} from "@chakra-ui/react"
import { useRouter } from "next/navigation"

import {
  FiPenTool,
  FiUpload,
  FiDownload,
  FiBriefcase,
  FiPlay,
  FiStar,
  FiArrowRight,
  FiCheckCircle,
  FiBookOpen,
  FiImage,
} from "react-icons/fi"

export default function HandwritingAILanding() {
  const bgColor = "#FDF7EE"
  const textColor = "#1A1A1A"
  const accentColor = "#FF6A00"
  const accentHoverColor = "#FF8A33"
  const router = useRouter()

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Header */}
      <Box as="header" px={6} py={4}>
        <Container maxW="7xl">
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={2}>
              <Icon as={FiPenTool} h={8} w={8} color={accentColor} />
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                ScriptAI
              </Text>
            </Flex>
            <HStack spacing={8} display={{ base: "none", md: "flex" }}>
              <Text
                as="a"
                href="#features"
                color={textColor}
                _hover={{ color: accentColor }}
                transition="colors"
              >
                Features
              </Text>
              <Text
                as="a"
                href="#how-it-works"
                color={textColor}
                _hover={{ color: accentColor }}
                transition="colors"
              >
                How It Works
              </Text>
              <Text
                as="a"
                href="#pricing"
                color={textColor}
                _hover={{ color: accentColor }}
                transition="colors"
              >
                Pricing
              </Text>
              <Button
                bg={accentColor}
                _hover={{ bg: accentHoverColor }}
                color="white"
                borderRadius="full"
                px={6}
                onClick={() => router.push("/sign-in")}
              >
                Sign Up
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box as="section" px={6} py={20}>
        <Container maxW="7xl">
          <Grid templateColumns={{ lg: "1fr 1fr" }} gap={12} alignItems="center">
            <VStack align="start" spacing={8}>
              <VStack align="start" spacing={6}>
                <Heading
                  fontSize={{ base: "5xl", lg: "6xl" }}
                  fontWeight="bold"
                  color={textColor}
                  lineHeight="tight"
                >
                  Make It Look{" "}
                  <Box position="relative" display="inline">
                    Handwritten
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
                  </Box>{" "}
                  — Instantly.
                </Heading>
                <Text fontSize="xl" color="#666" lineHeight="relaxed">
                  Convert any typed text into stunning, lifelike handwritten paper images with AI. Perfect for students,
                  professionals, and creatives.
                </Text>
              </VStack>

              <Flex
                direction={{ base: "column", sm: "row" }}
                gap={4}
                maxW="md"
                w="full"
              >
                <Input
                  placeholder="Enter your email"
                  flex={1}
                  h={12}
                  borderRadius="full"
                  borderWidth={2}
                  borderColor={textColor}
                  bg="white"
                />
                <Button
                  bg={accentColor}
                  _hover={{ bg: accentHoverColor }}
                  color="white"
                  h={12}
                  px={8}
                  borderRadius="full"
                  fontWeight="semibold"
                >
                  Get Started
                </Button>
              </Flex>

              <Text fontSize="sm" color="#666">
                Trusted by 130,000+ users in 180+ countries
              </Text>
            </VStack>

            <Box position="relative">
              <Card bg="white" shadow="2xl" borderRadius="3xl" overflow="hidden">
                <CardBody p={8}>
                  <VStack spacing={6}>
                    <Box bg="#F5F5F5" borderRadius="2xl" p={6}>
                      <HStack gap={2} mb={4}>
                        <Box w={3} h={3} bg="red.500" borderRadius="full" />
                        <Box w={3} h={3} bg="yellow.500" borderRadius="full" />
                        <Box w={3} h={3} bg="green.500" borderRadius="full" />
                        <Text fontSize="xs" color="gray.500" ml={2}>
                          Text Editor
                        </Text>
                      </HStack>
                      <Text
                        color={textColor}
                        fontFamily="mono"
                        fontSize="sm"
                        lineHeight="relaxed"
                      >
                        Dear Professor Johnson,
                        <br />
                        <br />I hope this email finds you well. I wanted to discuss the upcoming project deadline and
                        request a brief extension if possible.
                        <br />
                        <br />
                        Best regards,
                        <br />
                        Sarah
                      </Text>
                    </Box>
                    <Flex justify="center">
                      <Icon as={FiArrowRight} h={6} w={6} color={accentColor} />
                    </Flex>
                    <Box position="relative">
                      <Image
                        src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop&crop=center"
                        alt="Handwritten letter on paper"
                        w="full"
                        h={64}
                        objectFit="cover"
                        borderRadius="2xl"
                        shadow="lg"
                      />
                      <Box
                        position="absolute"
                        inset={0}
                        bgGradient="linear(to-t, blackAlpha.200, transparent)"
                        borderRadius="2xl"
                      />
                      <Box position="absolute" bottom={4} left={4} right={4}>
                        <Text color="white" fontSize="sm" fontWeight="semibold">
                          ✨ AI-Generated Handwriting
                        </Text>
                      </Box>
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            </Box>
          </Grid>
        </Container>
      </Box>

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
                Works
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
            <Text fontSize="xl" color="#666" maxW="2xl">
              Transform your typed content into authentic handwritten pages in just three simple steps.
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
                image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop&crop=center",
              },
              {
                icon: FiPenTool,
                step: "02",
                title: "Choose Style & Paper",
                description: "Select from various handwriting styles and paper types to match your needs perfectly.",
                image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop&crop=center",
              },
              {
                icon: FiDownload,
                step: "03",
                title: "Download Image",
                description: "Get your photo-realistic handwritten page instantly, ready to use or print.",
                image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=200&fit=crop&crop=center",
              },
            ].map((item, index) => (
              <Card
                key={index}
                bg="white"
                shadow="lg"
                borderRadius="3xl"
                border={0}
                _hover={{ shadow: "xl" }}
                transition="shadow"
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
                          shadow="lg"
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
                      <Heading fontSize="xl" fontWeight="bold" color={textColor}>
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

      {/* Output Showcase */}
      <Box as="section" px={6} py={20} bg={bgColor}>
        <Container maxW="7xl">
          <VStack spacing={4} mb={16} textAlign="center">
            <Heading
              fontSize={{ base: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color={textColor}
            >
              See The{" "}
              <Box position="relative" display="inline">
                Magic
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
            <Text fontSize="xl" color="#666" maxW="2xl">
              Real examples of typed text transformed into authentic handwritten pages.
            </Text>
          </VStack>

          <VStack spacing={12}>
            {/* Example 1 */}
            <Grid templateColumns={{ lg: "1fr 1fr" }} gap={8} alignItems="center">
              <Card bg="white" shadow="xl" borderRadius="3xl" overflow="hidden">
                <CardBody p={8}>
                  <HStack gap={2} mb={4}>
                    <Box w={3} h={3} bg="red.500" borderRadius="full" />
                    <Box w={3} h={3} bg="yellow.500" borderRadius="full" />
                    <Box w={3} h={3} bg="green.500" borderRadius="full" />
                    <Text fontSize="xs" color="gray.500" ml={2}>
                      Typed Input
                    </Text>
                  </HStack>
                  <Box
                    bg="#F5F5F5"
                    borderRadius="2xl"
                    p={6}
                    fontFamily="mono"
                    fontSize="sm"
                    color={textColor}
                    lineHeight="relaxed"
                  >
                    The Industrial Revolution, which took place from the 18th to 19th centuries, was a period during
                    which predominantly agrarian, rural societies in Europe and America became industrial and urban.
                    This transformation included going from hand production methods to machines, new chemical
                    manufacturing and iron production processes.
                  </Box>
                </CardBody>
              </Card>

              <Card bg="white" shadow="xl" borderRadius="3xl" overflow="hidden">
                <CardBody p={8}>
                  <HStack gap={2} mb={4}>
                    <Icon as={FiCheckCircle} w={4} h={4} color="green.500" />
                    <Text fontSize="xs" color="gray.500">
                      AI Handwritten Output
                    </Text>
                  </HStack>
                  <Box position="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=400&fit=crop&crop=center"
                      alt="Handwritten essay on lined paper"
                      w="full"
                      h={80}
                      objectFit="cover"
                      borderRadius="2xl"
                    />
                    <Box
                      position="absolute"
                      inset={0}
                      bgGradient="linear(to-t, blackAlpha.100, transparent)"
                      borderRadius="2xl"
                    />
                  </Box>
                </CardBody>
              </Card>
            </Grid>

            {/* Example 2 */}
            <Grid templateColumns={{ lg: "1fr 1fr" }} gap={8} alignItems="center">
              <Card
                bg="white"
                shadow="xl"
                borderRadius="3xl"
                overflow="hidden"
                order={{ lg: 2 }}
              >
                <CardBody p={8}>
                  <HStack gap={2} mb={4}>
                    <Box w={3} h={3} bg="red.500" borderRadius="full" />
                    <Box w={3} h={3} bg="yellow.500" borderRadius="full" />
                    <Box w={3} h={3} bg="green.500" borderRadius="full" />
                    <Text fontSize="xs" color="gray.500" ml={2}>
                      Typed Input
                    </Text>
                  </HStack>
                  <Box
                    bg="#F5F5F5"
                    borderRadius="2xl"
                    p={6}
                    fontFamily="mono"
                    fontSize="sm"
                    color={textColor}
                    lineHeight="relaxed"
                  >
                    Dear Mom and Dad,
                    <br />
                    <br />I hope you&apos;re both doing well. College has been amazing so far! I&apos;ve made some great friends
                    and my professors are really inspiring. The campus is beautiful, especially in the fall with all the
                    colorful leaves.
                    <br />
                    <br />
                    Love you both,
                    <br />
                    Emma
                  </Box>
                </CardBody>
              </Card>

              <Card
                bg="white"
                shadow="xl"
                borderRadius="3xl"
                overflow="hidden"
                order={{ lg: 1 }}
              >
                <CardBody p={8}>
                  <HStack gap={2} mb={4}>
                    <Icon as={FiCheckCircle} w={4} h={4} color="green.500" />
                    <Text fontSize="xs" color="gray.500">
                      AI Handwritten Output
                    </Text>
                  </HStack>
                  <Box position="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=400&fit=crop&crop=center"
                      alt="Handwritten letter on personal stationery"
                      w="full"
                      h={80}
                      objectFit="cover"
                      borderRadius="2xl"
                    />
                    <Box
                      position="absolute"
                      inset={0}
                      bgGradient="linear(to-t, blackAlpha.100, transparent)"
                      borderRadius="2xl"
                    />
                  </Box>
                </CardBody>
              </Card>
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* Use Cases */}
      <Box as="section" px={6} py={20} bg="white">
        <Container maxW="7xl">
          <VStack spacing={4} mb={16} textAlign="center">
            <Heading
              fontSize={{ base: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color={textColor}
            >
              Perfect For{" "}
              <Box position="relative" display="inline">
                Everyone
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
          </VStack>

          <Grid templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
            {[
              {
                icon: FiStar,
                title: "Students",
                description: "Assignments, essays, and homework that look authentically handwritten.",
                color: "blue.100",
                iconColor: "blue.600",
                image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop&crop=center",
              },
              {
                icon: FiBriefcase,
                title: "Professionals",
                description: "Personal notes, letters, and documents with a human touch.",
                color: "green.100",
                iconColor: "green.600",
                image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=200&fit=crop&crop=center",
              },
              {
                icon: FiBookOpen,
                title: "Educators",
                description: "Create worksheets and materials that feel personal and engaging.",
                color: "purple.100",
                iconColor: "purple.600",
                image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop&crop=center",
              },
              {
                icon: FiImage,
                title: "Designers",
                description: "Handwritten assets for projects, mockups, and creative work.",
                color: "pink.100",
                iconColor: "pink.600",
                image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop&crop=center",
              },
            ].map((item, index) => (
              <Card
                key={index}
                bg="white"
                shadow="lg"
                borderRadius="3xl"
                border={0}
                _hover={{ shadow: "xl", transform: "translateY(-4px)" }}
                transition="all"
                overflow="hidden"
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
                Worldwide
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
          </VStack>

          <Grid templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
            {[
              { number: "1M+", label: "Handwritten pages generated" },
              { number: "98%", label: "User satisfaction rate" },
              { number: "150K+", label: "Active users worldwide" },
              { number: "100+", label: "Countries served" },
            ].map((stat, index) => (
              <Card key={index} bg="white" shadow="lg" borderRadius="3xl" border={0}>
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
          <Grid templateColumns={{ lg: "1fr 1fr" }} gap={12} alignItems="center">
            <Card
              bgGradient="linear(to-br, #FF6A00, #FF8A33)"
              borderRadius="3xl"
              overflow="hidden"
              shadow="2xl"
            >
              <CardBody p={12} textAlign="center" position="relative">
                <Box
                  position="absolute"
                  inset={0}
                  bgImage="url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face')"
                  opacity={0.1}
                  borderRadius="3xl"
                />
                <VStack spacing={6} position="relative" zIndex={10}>
                  <Box
                    w={24}
                    h={24}
                    bg="whiteAlpha.200"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={FiPlay} h={12} w={12} color="white" />
                  </Box>
                  <Box w={20} h={20} bg="white" borderRadius="full" overflow="hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
                      alt="Sarah - Student testimonial"
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                  </Box>
                  <Text color="white" fontWeight="semibold" fontSize="lg">
                    Watch Sarah&apos;s Story
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    Computer Science Student at Stanford
                  </Text>
                </VStack>
              </CardBody>
            </Card>

            <VStack spacing={8}>
              {[
                {
                  text: "ScriptAI saved me hours on my assignments. The handwriting looks so natural, my professors never knew the difference!",
                  author: "Alex Chen",
                  role: "Computer Science Student",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
                },
                {
                  text: "As a teacher, I use this to create personalized worksheets. My students love the authentic handwritten feel.",
                  author: "Maria Rodriguez",
                  role: "Elementary School Teacher",
                  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
                },
                {
                  text: "Perfect for my design projects. The handwritten elements add that human touch clients love.",
                  author: "James Wilson",
                  role: "Graphic Designer",
                  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
                },
              ].map((testimonial, index) => (
                <Card key={index} bg="white" shadow="lg" borderRadius="2xl" border={0}>
                  <CardBody p={6}>
                    <HStack spacing={1} mb={3}>
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} as={FiStar} h={4} w={4} fill={accentColor} color={accentColor} />
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
        <Container maxW="4xl" textAlign="center" position="relative" zIndex={10}>
          <VStack spacing={8}>
            <Heading fontSize={{ base: "4xl", lg: "5xl" }} fontWeight="bold" color="white" lineHeight="tight">
              Ready to Handwrite Anything?
            </Heading>
            <Text fontSize="xl" color="whiteAlpha.900" maxW="2xl">
              Join thousands of users who trust ScriptAI for authentic handwritten content. Start your free trial today.
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
                Transform typed text into authentic handwritten pages with AI-powered technology.
              </Text>
            </VStack>

            <VStack align="start" spacing={4}>
              <Text fontWeight="semibold">Features</Text>
              <VStack align="start" spacing={2} color="gray.400">
                <Text as="a" href="#" _hover={{ color: "white" }} transition="colors">
                  AI Handwriting
                </Text>
                <Text as="a" href="#" _hover={{ color: "white" }} transition="colors">
                  Multiple Styles
                </Text>
                <Text as="a" href="#" _hover={{ color: "white" }} transition="colors">
                  Paper Types
                </Text>
                <Text as="a" href="#" _hover={{ color: "white" }} transition="colors">
                  Bulk Processing
                </Text>
              </VStack>
            </VStack>

            <VStack align="start" spacing={4}>
              <Text fontWeight="semibold">Support</Text>
              <VStack align="start" spacing={2} color="gray.400">
                <Text as="a" href="#" _hover={{ color: "white" }} transition="colors">
                  Help Center
                </Text>
                <Text as="a" href="#" _hover={{ color: "white" }} transition="colors">
                  Tutorials
                </Text>
                <Text as="a" href="#" _hover={{ color: "white" }} transition="colors">
                  FAQ
                </Text>
                <Text as="a" href="#" _hover={{ color: "white" }} transition="colors">
                  Contact Us
                </Text>
              </VStack>
            </VStack>

            <VStack align="start" spacing={4}>
              <Text fontWeight="semibold">Company</Text>
              <VStack align="start" spacing={2} color="gray.400">
                <Text as="a" href="#" _hover={{ color: "white" }} transition="colors">
                  About Us
                </Text>
                <Text as="a" href="#" _hover={{ color: "white" }} transition="colors">
                  Privacy Policy
                </Text>
                <Text as="a" href="#" _hover={{ color: "white" }} transition="colors">
                  Terms of Service
                </Text>
                <Text as="a" href="#" _hover={{ color: "white" }} transition="colors">
                  Careers
                </Text>
              </VStack>
            </VStack>
          </Grid>

          <Box borderTop="1px" borderColor="gray.800" pt={8} textAlign="center" color="gray.400">
            <Text>&copy; 2024 ScriptAI. All rights reserved.</Text>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
