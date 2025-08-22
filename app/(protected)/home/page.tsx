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
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Stack,
} from "@chakra-ui/react";
import {
  FiFileText,
  FiPlusCircle,
  FiSearch,
  FiGrid,
  FiMoreVertical,
  FiTrash2,
  FiFilter,
} from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getAssignments,
  deleteAssignment,
  type Assignment,
} from "@/server/actions/assignments";
import { RxHamburgerMenu } from "react-icons/rx";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Dashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [deletingAssignment, setDeletingAssignment] = useState<string | null>(
    null
  );
  const [assignmentToDelete, setAssignmentToDelete] =
    useState<Assignment | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      (selectedFilter === "blank" &&
        assignment.paper?.toLowerCase().includes("blank")) ||
      (selectedFilter === "ruled" &&
        assignment.paper?.toLowerCase().includes("ruled")) ||
      (selectedFilter === "grid" &&
        assignment.paper?.toLowerCase().includes("grid"));

    return matchesSearch && matchesFilter;
  });

  // Get filter counts
  const getFilterCount = (filter: string) => {
    return assignments.filter((assignment) => {
      if (filter === "all") return true;
      if (filter === "blank")
        return assignment.paper?.toLowerCase().includes("blank");
      if (filter === "ruled")
        return assignment.paper?.toLowerCase().includes("ruled");
      if (filter === "grid")
        return assignment.paper?.toLowerCase().includes("grid");
      return false;
    }).length;
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    const assignment = assignments.find((a) => a.id === assignmentId);
    if (assignment) {
      setAssignmentToDelete(assignment);
      onOpen();
    }
  };

  const confirmDelete = async () => {
    if (!assignmentToDelete) return;

    try {
      setDeletingAssignment(assignmentToDelete.id);
      const result = await deleteAssignment(assignmentToDelete.id);

      if (result.success) {
        // Remove the assignment from the local state
        setAssignments((prev) =>
          prev.filter((assignment) => assignment.id !== assignmentToDelete.id)
        );
        onClose();
        setAssignmentToDelete(null);
      } else {
        console.error("Error deleting assignment:", result.error);
        alert("Failed to delete assignment. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting assignment:", error);
      alert("Failed to delete assignment. Please try again.");
    } finally {
      setDeletingAssignment(null);
    }
  };

  return (
    <>
      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }} py={8}>
        {loading ? (
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={20}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <LoadingSpinner
              minHeight="auto"
            />
          </Box>
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
              <Flex 
                justify="space-between" 
                align={{ base: "start", md: "center" }} 
                w="full"
                direction={{ base: "column", md: "row" }}
                gap={{ base: 4, md: 0 }}
              >
                <VStack spacing={2} align="start">
                  <Heading size="xl" color="#1A1A1A">
                    Assignments Catalog
                  </Heading>
                  <Text color="#666">
                    Choose from your handwritten assignments or create a new one
                  </Text>
                </VStack>
                {/* Mobile Filter Menu in Header */}
                <Box display={{ base: "block", lg: "none" }}>
                  <Menu>
                    <MenuButton
                      as={Button}
                      variant="outline"
                      borderColor="gray.300"
                      color="#666"
                      _hover={{
                        borderColor: "#FF6A00",
                        color: "#FF6A00",
                        bg: "orange.50",
                      }}
                      size="sm"
                      px={4}
                      py={2}
                      fontSize="sm"
                      fontWeight="medium"
                      borderRadius="lg"
                      transition="all 0.2s"
                      rightIcon={<Icon as={FiFilter} />}
                      w={{ base: "full", md: "auto" }}
                    >
                      {selectedFilter === "all" && `All Assignments (${getFilterCount("all")})`}
                      {selectedFilter === "blank" && `Blank (${getFilterCount("blank")})`}
                      {selectedFilter === "ruled" && `Ruled (${getFilterCount("ruled")})`}
                      {selectedFilter === "grid" && `Grid (${getFilterCount("grid")})`}
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => setSelectedFilter("all")}
                        bg={selectedFilter === "all" ? "orange.50" : "transparent"}
                        color={selectedFilter === "all" ? "#FF6A00" : "#666"}
                        _hover={{
                          bg: selectedFilter === "all" ? "orange.100" : "gray.50",
                        }}
                      >
                        All Assignments ({getFilterCount("all")})
                      </MenuItem>
                      <MenuItem
                        onClick={() => setSelectedFilter("blank")}
                        bg={selectedFilter === "blank" ? "orange.50" : "transparent"}
                        color={selectedFilter === "blank" ? "#FF6A00" : "#666"}
                        _hover={{
                          bg: selectedFilter === "blank" ? "orange.100" : "gray.50",
                        }}
                      >
                        Blank ({getFilterCount("blank")})
                      </MenuItem>
                      <MenuItem
                        onClick={() => setSelectedFilter("ruled")}
                        bg={selectedFilter === "ruled" ? "orange.50" : "transparent"}
                        color={selectedFilter === "ruled" ? "#FF6A00" : "#666"}
                        _hover={{
                          bg: selectedFilter === "ruled" ? "orange.100" : "gray.50",
                        }}
                      >
                        Ruled ({getFilterCount("ruled")})
                      </MenuItem>
                      <MenuItem
                        onClick={() => setSelectedFilter("grid")}
                        bg={selectedFilter === "grid" ? "orange.50" : "transparent"}
                        color={selectedFilter === "grid" ? "#FF6A00" : "#666"}
                        _hover={{
                          bg: selectedFilter === "grid" ? "orange.100" : "gray.50",
                        }}
                      >
                        Grid ({getFilterCount("grid")})
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </Flex>
            </VStack>

            {/* Search and Filter Section */}
            <Stack 
              spacing={4} 
              mb={6}
              direction={{ base: "column", md: "row" }}
              align={{ base: "stretch", md: "center" }}
            >
              {/* Search Input */}
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

              <Spacer display={{ base: "none", md: "block" }} />

              {/* Desktop Filter Buttons */}
              <HStack spacing={3} display={{ base: "none", lg: "flex" }} flexWrap="wrap">
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
            </Stack>

            {/* Assignments Grid */}
            {filteredAssignments.length > 0 ? (
              <Grid
                templateColumns={{
                  base: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap={{ base: 4, md: 6 }}
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
                    height={{ base: "250px", md: "300px" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <VStack spacing={4}>
                      <Icon as={FiPlusCircle} w={{ base: 10, md: 12 }} h={{ base: 10, md: 12 }} color="gray.400" />
                      <Text
                        color="gray.600"
                        fontSize={{ base: "xs", md: "sm" }}
                        textAlign="center"
                        fontWeight="medium"
                        px={2}
                      >
                        Create a new assignment
                      </Text>
                    </VStack>
                  </Card>
                </Link>
                {filteredAssignments.map((assignment) => (
                  <Card
                    key={assignment.id}
                    bg="white"
                    border="1px"
                    borderColor="gray.200"
                    _hover={{
                      shadow: "xl",
                      transform: "translateY(-4px)",
                      borderColor: "#FF6A00",
                    }}
                    transition="all 0.3s ease"
                    position="relative"
                    overflow="hidden"
                    height={{ base: "250px", md: "300px" }}
                  >
                    {/* Assignment Menu */}
                    <Menu>
                      <MenuButton
                        as={Button}
                        position="absolute"
                        top={2}
                        right={2}
                        zIndex={10}
                        size="sm"
                        variant="ghost"
                        color="gray.600"
                        _hover={{ bg: "gray.100" }}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Icon as={FiMoreVertical} />
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          icon={<Icon as={FiFileText} />}
                          onClick={() => {
                            window.location.href = `/assignment/${assignment.id}`;
                          }}
                        >
                          View Details
                        </MenuItem>
                        <MenuItem
                          icon={<Icon as={FiTrash2} />}
                          color="red.500"
                          onClick={() => handleDeleteAssignment(assignment.id)}
                          isDisabled={deletingAssignment === assignment.id}
                        >
                          {deletingAssignment === assignment.id
                            ? "Deleting..."
                            : "Delete Assignment"}
                        </MenuItem>
                      </MenuList>
                    </Menu>

                    <Link href={`/assignment/${assignment.id}`}>
                      <Box
                        cursor="pointer"
                        height="full"
                        _hover={{ opacity: 0.9 }}
                        transition="opacity 0.2s"
                      >
                        <CardBody p={0} height="full">
                          {/* Document Preview */}
                          <Box
                            height="full"
                            position="relative"
                            overflow="hidden"
                            bg="white"
                            p={{ base: 3, md: 4 }}
                          >
                            {/* Document Header */}
                            <Box mb={3}>
                              <HStack
                                alignItems="center"
                                justifyContent="space-between"
                              >
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
                                    fontSize={{ base: "md", md: "lg" }}
                                    fontWeight="bold"
                                    color="#1A1A1A"
                                    mb={1}
                                  >
                                    Assignment
                                  </Text>
                                </HStack>
                              </HStack>
                              <Text fontSize="xs" color="gray.500">
                                Created: {formatDate(assignment.createdAt)}
                              </Text>
                            </Box>

                            {/* Document Content Preview */}
                            <Box
                              flex={1}
                              bg={
                                assignment.paper
                                  ?.toLowerCase()
                                  .includes("ruled")
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
                              minH={{ base: "120px", md: "150px" }}
                              position="relative"
                            >
                              <Text
                                color="#1A1A1A"
                                fontSize={{ base: "xs", md: "sm" }}
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
                              <Flex justify="space-between" align="center">
                                <HStack
                                  spacing={2}
                                  fontSize="xs"
                                  color="gray.500"
                                >
                                  <Text fontSize={{ base: "2xs", md: "xs" }}>
                                    {getStylesText(assignment)}
                                  </Text>
                                </HStack>

                                {assignment.imageURLs?.length && (
                                  <Badge colorScheme="orange" variant="subtle" fontSize={{ base: "2xs", md: "xs" }}>
                                    {assignment.imageURLs?.length} page
                                    {assignment.imageURLs?.length !== 1
                                      ? "s"
                                      : ""}
                                  </Badge>
                                )}
                              </Flex>
                            </Box>
                          </Box>
                        </CardBody>
                      </Box>
                    </Link>
                  </Card>
                ))}
              </Grid>
            ) : (
              <Center py={16}>
                <VStack spacing={4}>
                  <Icon as={FiFileText} w={12} h={12} color="gray.400" />
                  <Heading size="md" color="#1A1A1A">
                    No assignments found
                  </Heading>
                  <Text color="#666" textAlign="center" px={4}>
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
                      w={{ base: "40", md: "48" }}
                      h={{ base: "40", md: "48" }}
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
                      <Icon as={FiFileText} w={{ base: "20", md: "24" }} h={{ base: "20", md: "24" }} color="white" />
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
                      size={{ base: "xl", md: "2xl" }}
                      color="#1A1A1A"
                      fontWeight="bold"
                      bgGradient="linear(to-r, #1A1A1A, #FF6A00)"
                      bgClip="text"
                      px={4}
                    >
                      Ready to Create Magic?
                    </Heading>
                    <Text
                      fontSize={{ base: "lg", md: "xl" }}
                      color="#666"
                      maxW="2xl"
                      lineHeight="tall"
                      px={4}
                    >
                      Transform your ideas into beautiful handwritten content.
                      Whether it&apos;s assignments, notes, or creative
                      projects, let&apos;s bring your words to life.
                    </Text>
                  </VStack>
                </VStack>

                {/* CTA Section */}
                <Box textAlign="center" px={4}>
                  <Text color="#666" fontSize={{ base: "md", md: "lg" }} mb={4}>
                    Start your journey with your first assignment
                  </Text>
                  <VStack spacing={4}>
                    <Link href="/create">
                      <Button
                        size={{ base: "md", md: "lg" }}
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
                        px={{ base: 6, md: 8 }}
                        py={{ base: 4, md: 6 }}
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="semibold"
                        borderRadius="xl"
                        boxShadow="0 8px 20px rgba(255, 106, 0, 0.3)"
                        transition="all 0.2s"
                        w={{ base: "full", sm: "auto" }}
                      >
                        Create Your First Assignment
                      </Button>
                    </Link>
                    <Link href="/plans">
                      <Button
                        variant="outline"
                        borderColor="gray.300"
                        color="#666"
                        _hover={{
                          borderColor: "#FF6A00",
                          color: "#FF6A00",
                          bg: "orange.50",
                        }}
                        size={{ base: "sm", md: "md" }}
                        px={{ base: 4, md: 6 }}
                        py={{ base: 3, md: 4 }}
                        fontSize={{ base: "sm", md: "md" }}
                        fontWeight="medium"
                        borderRadius="lg"
                        transition="all 0.2s"
                        w={{ base: "full", sm: "auto" }}
                      >
                        View Plans & Pricing
                      </Button>
                    </Link>
                  </VStack>
                </Box>
              </VStack>
            </Container>
          </Box>
        )}
      </Container>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>Delete Assignment</ModalHeader>
          <ModalBody>
            <Text>
              Are you sure you want to delete &quot;
              {assignmentToDelete?.text?.substring(0, 50)}...&quot;? This action
              cannot be undone.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={confirmDelete}
              isLoading={deletingAssignment === assignmentToDelete?.id}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
