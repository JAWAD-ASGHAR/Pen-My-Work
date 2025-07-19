"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Grid,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import {
  FiFileText,
  FiPlusCircle,
  FiSearch,
  FiGrid,
} from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAssignments, type Assignment } from "@/server/actions/assignments";
import LoadingSpinner from "../../components/LoadingSpinner";
import Header from "../../components/Header";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Dashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const data = await getAssignments();
        setAssignments(data);
      } catch (err) {
        setError("Failed to load assignments");
        console.error("Error fetching assignments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const hasAssignments = assignments.length > 0;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  const getStylesText = (assignment: Assignment) => {
    const parts = [];
    if (assignment.paper) parts.push(assignment.paper);
    if (assignment.ink) parts.push(assignment.ink);
    return parts.join(" | ");
  };

  const getInkColor = (ink: string) => {
    switch (ink.toLowerCase()) {
      case "blue":
        return "#0052A3";
      case "black":
        return "#0A0A0A";
      case "dark-gray":
        return "#4A4A4A";
      default:
        return "#0A0A0A";
    }
  };

  // Filter assignments based on search and filter
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.paper?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.ink?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "blank" && !assignment.text.trim()) ||
      (selectedFilter === "ruled" &&
        assignment.paper?.toLowerCase().includes("ruled")) ||
      (selectedFilter === "grid" &&
        assignment.paper?.toLowerCase().includes("grid")) ||
      (selectedFilter === "plain" &&
        assignment.paper?.toLowerCase().includes("plain"));

    return matchesSearch && matchesFilter;
  });

  // Get filter counts
  const getFilterCount = (filter: string) => {
    return assignments.filter((assignment) => {
      if (filter === "all") return true;
      if (filter === "blank") return !assignment.text.trim();
      if (filter === "ruled")
        return assignment.paper?.toLowerCase().includes("ruled");
      if (filter === "grid")
        return assignment.paper?.toLowerCase().includes("grid");
      if (filter === "plain")
        return assignment.paper?.toLowerCase().includes("plain");
      return false;
    }).length;
  };

  return (
    <Box minH="100vh" bg="#FDF7EE">
      <Header title="Scribbly" showCreateButton={true} createUrl="/create" />

      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }} py={8}>
        {loading ? (
          <LoadingSpinner message="Loading your assignments..." />
        ) : error ? (
          <Center py={16}>
            <VStack spacing={4}>
              <Icon as={FiFileText} w={12} h={12} color="red.400" />
              <Heading size="md" color="#1A1A1A">
                {error}
              </Heading>
              <Text color="#666">Please try again later</Text>
              <Button
                onClick={() => window.location.reload()}
                bg="#FF6A00"
                _hover={{ bg: "#FF8A33" }}
                color="white"
              >
                Retry
              </Button>
            </VStack>
          </Center>
        ) : hasAssignments ? (
          <Box>
            {/* Header Section */}
            <VStack spacing={2} align="start" mb={8}>
              <Heading size="2xl" color="#1A1A1A">
                Assignments Catalog
              </Heading>
              <Text color="#666">
                Choose from your handwritten assignments or create a new one
              </Text>
            </VStack>

            {/* Search and Upload Section */}
            <Flex
              mb={6}
              gap={4}
              direction={{ base: "column", md: "row" }}
              align="center"
            >
              <InputGroup maxW={{ base: "full", md: "400px" }}>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiSearch} color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search assignments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  bg="white"
                  border="1px solid"
                  borderColor="gray.200"
                  _focus={{
                    borderColor: "#FF6A00",
                    boxShadow: "0 0 0 1px #FF6A00",
                  }}
                />
              </InputGroup>

              <Spacer />

              {/* Filter Buttons */}
              <HStack spacing={3} mb={8} flexWrap="wrap">
              <Button
                variant={selectedFilter === "all" ? "solid" : "outline"}
                colorScheme="orange"
                size="md"
                onClick={() => setSelectedFilter("all")}
                borderRadius="md"
              >
                All Assignments ({getFilterCount("all")})
              </Button>
              <Button
                variant={selectedFilter === "blank" ? "solid" : "outline"}
                colorScheme="orange"
                size="md"
                onClick={() => setSelectedFilter("blank")}
                borderRadius="md"
              >
                Blank ({getFilterCount("blank")})
              </Button>
              <Button
                variant={selectedFilter === "ruled" ? "solid" : "outline"}
                colorScheme="orange"
                size="md"
                onClick={() => setSelectedFilter("ruled")}
                borderRadius="md"
              >
                Ruled ({getFilterCount("ruled")})
              </Button>
              <Button
                variant={selectedFilter === "grid" ? "solid" : "outline"}
                colorScheme="orange"
                size="md"
                onClick={() => setSelectedFilter("grid")}
                borderRadius="md"
              >
                Grid ({getFilterCount("grid")})
              </Button>
            </HStack>
            </Flex>


            {/* Assignments Grid */}
            {filteredAssignments.length > 0 ? (
              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap={6}
              >
                {/* Create New Assignment Card */}
                <Link href="/create">
                  <Card
                    bg="gray.50"
                    border="2px dashed"
                    borderColor="gray.300"
                    _hover={{
                      borderColor: "#FF6A00",
                      bg: "gray.100",
                    }}
                    transition="all 0.3s ease"
                    cursor="pointer"
                    height="300px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <VStack spacing={4}>
                      <Icon as={FiPlusCircle} w={12} h={12} color="gray.400" />
                      <Text
                        color="gray.600"
                        fontSize="sm"
                        textAlign="center"
                        fontWeight="medium"
                      >
                        Create a new assignment
                      </Text>
                    </VStack>
                  </Card>
                </Link>
                {filteredAssignments.map((assignment) => (
                  <Link
                    href={`/assignment/${assignment.id}`}
                    key={assignment.id}
                  >
                    <Card
                      bg="white"
                      border="1px"
                      borderColor="gray.200"
                      _hover={{
                        shadow: "xl",
                        transform: "translateY(-4px)",
                        borderColor: "#FF6A00",
                      }}
                      transition="all 0.3s ease"
                      cursor="pointer"
                      position="relative"
                      overflow="hidden"
                      height="300px"
                    >
                      <CardBody p={0} height="full">
                        {/* Document Preview */}
                        <Box
                          height="full"
                          position="relative"
                          overflow="hidden"
                          bg="white"
                          p={4}
                        >
                          {/* Document Header */}
                          <Box mb={3}>
                            <HStack alignItems="center">
                              <Icon
                                as={
                                  assignment.paper
                                    ?.toLowerCase()
                                    .includes("grid")
                                    ? FiGrid
                                    : assignment.paper
                                        ?.toLowerCase()
                                        .includes("ruled")
                                    ? RxHamburgerMenu
                                    : FiFileText
                                }
                                color="#FF6A00"
                                fontWeight="bold"
                                size={4}
                              />
                              <Text
                                fontSize="lg"
                                fontWeight="bold"
                                color="#1A1A1A"
                                mb={1}
                              >
                                Assignment
                              </Text>
                            </HStack>
                              <Text fontSize="xs" color="gray.500">
                                Created: {formatDate(assignment.createdAt)}
                              </Text>
                          </Box>

                          {/* Document Content Preview */}
                          <Box
                            flex={1}
                            bg={
                              assignment.paper?.toLowerCase().includes("ruled")
                                ? "repeating-linear-gradient(0deg, transparent, transparent 20px, #e2e8f0 20px, #e2e8f0 21px)"
                                : assignment.paper
                                    ?.toLowerCase()
                                    .includes("grid")
                                ? "repeating-linear-gradient(0deg, transparent, transparent 20px, #e2e8f0 20px, #e2e8f0 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, #e2e8f0 20px, #e2e8f0 21px)"
                                : "white"
                            }
                            p={3}
                            borderRadius="md"
                            border="1px solid"
                            borderColor="gray.200"
                            minH="150px"
                            position="relative"
                          >
                            <Text
                              color="#1A1A1A"
                              fontSize="sm"
                              lineHeight="1.6"
                              fontFamily="monospace"
                              style={{
                                color: getInkColor(assignment.ink),
                              }}
                            >
                              {assignment.text.length > 200
                                ? `${assignment.text.substring(0, 200)}...`
                                : assignment.text || "Empty assignment"}
                            </Text>

                            {/* Ink color indicator */}
                            <Box
                              position="absolute"
                              top={2}
                              right={2}
                              w="3"
                              h="3"
                              borderRadius="full"
                              bg={getInkColor(assignment.ink)}
                              border="1px solid white"
                              boxShadow="0 1px 2px rgba(0,0,0,0.1)"
                            />
                          </Box>

                          {/* Document Footer */}
                          <Box
                            mt={3}
                            pt={2}
                            borderTop="1px solid"
                            borderColor="gray.200"
                          >
                            <HStack spacing={2} fontSize="xs" color="gray.500">
                              <Text>{getStylesText(assignment)}</Text>
                            </HStack>
                          </Box>
                        </Box>
                      </CardBody>
                    </Card>
                  </Link>
                ))}
              </Grid>
            ) : (
              <Center py={16}>
                <VStack spacing={4}>
                  <Icon as={FiFileText} w={12} h={12} color="gray.400" />
                  <Heading size="md" color="#1A1A1A">
                    No assignments found
                  </Heading>
                  <Text color="#666">
                    {searchQuery
                      ? "Try adjusting your search or filters"
                      : "Create your first assignment to get started"}
                  </Text>
                  {!searchQuery && (
                    <Link href="/create">
                      <Button
                        bg="#FF6A00"
                        _hover={{ bg: "#FF8A33" }}
                        color="white"
                        leftIcon={<Icon as={FiPlusCircle} />}
                      >
                        Create Assignment
                      </Button>
                    </Link>
                  )}
                </VStack>
              </Center>
            )}
          </Box>
        ) : (
          <Box py={16}>
            <Container maxW="4xl">
              <VStack spacing={12} align="center">
                {/* Hero Section */}
                <VStack spacing={8} textAlign="center">
                  <Box position="relative">
                    {/* Main illustration */}
                    <Box
                      w="48"
                      h="48"
                      mx="auto"
                      mb={8}
                      bg="linear-gradient(135deg, #FF6A00 0%, #FF8A33 100%)"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      boxShadow="0 20px 40px rgba(255, 106, 0, 0.3)"
                      position="relative"
                      _before={{
                        content: '""',
                        position: "absolute",
                        top: "-8px",
                        left: "-8px",
                        right: "-8px",
                        bottom: "-8px",
                        bg: "linear-gradient(135deg, #FF6A00 0%, #FF8A33 100%)",
                        borderRadius: "full",
                        opacity: 0.2,
                        zIndex: -1,
                      }}
                    >
                      <Icon as={FiFileText} w="24" h="24" color="white" />
                    </Box>

                    {/* Floating elements */}
                    <Box
                      position="absolute"
                      top="20%"
                      right="-20px"
                      w="6"
                      h="6"
                      bg="blue.400"
                      borderRadius="full"
                      opacity={0.8}
                      animation="float 3s ease-in-out infinite"
                    />
                    <Box
                      position="absolute"
                      bottom="10%"
                      left="-15px"
                      w="4"
                      h="4"
                      bg="green.400"
                      borderRadius="full"
                      opacity={0.6}
                      animation="float 2.5s ease-in-out infinite reverse"
                    />
                  </Box>

                  <VStack spacing={4}>
                    <Heading
                      size="2xl"
                      color="#1A1A1A"
                      fontWeight="bold"
                      bgGradient="linear(to-r, #1A1A1A, #FF6A00)"
                      bgClip="text"
                    >
                      Ready to Create Magic?
                    </Heading>
                    <Text
                      fontSize="xl"
                      color="#666"
                      maxW="2xl"
                      lineHeight="tall"
                    >
                      Transform your ideas into beautiful handwritten content.
                      Whether it&apos;s assignments, notes, or creative
                      projects, let&apos;s bring your words to life.
                    </Text>
                  </VStack>
                </VStack>

                {/* CTA Section */}
                <Box textAlign="center">
                  <Text color="#666" fontSize="lg" mb={4}>
                    Start your journey with your first assignment
                  </Text>
                  <Link href="/create">
                    <Button
                      size="lg"
                      bg="linear-gradient(135deg, #FF6A00 0%, #FF8A33 100%)"
                      _hover={{
                        bg: "linear-gradient(135deg, #FF8A33 0%, #FF6A00 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 25px rgba(255, 106, 0, 0.4)",
                      }}
                      _active={{
                        transform: "translateY(0px)",
                      }}
                      color="white"
                      leftIcon={<Icon as={FiPlusCircle} />}
                      px={8}
                      py={6}
                      fontSize="lg"
                      fontWeight="semibold"
                      borderRadius="xl"
                      boxShadow="0 8px 20px rgba(255, 106, 0, 0.3)"
                      transition="all 0.2s"
                    >
                      Create Your First Assignment
                    </Button>
                  </Link>
                </Box>
              </VStack>
            </Container>
          </Box>
        )}
      </Container>
    </Box>
  );
}
