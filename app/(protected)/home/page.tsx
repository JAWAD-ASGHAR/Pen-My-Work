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
  Image,
  Text,
  VStack,
  Center,
} from "@chakra-ui/react"
import { FiFileText, FiPlusCircle, FiCalendar, FiDroplet } from "react-icons/fi"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getAssignments, type Assignment } from "@/server/actions/assignments"
import LoadingSpinner from "../../components/LoadingSpinner"

export default function Dashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true)
        const data = await getAssignments()
        setAssignments(data)
      } catch (err) {
        setError("Failed to load assignments")
        console.error("Error fetching assignments:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAssignments()
  }, [])

  const hasAssignments = assignments.length > 0

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date))
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(date))
  }

  const getStylesText = (assignment: Assignment) => {
    const parts = []
    if (assignment.paper) parts.push(assignment.paper)
    if (assignment.ink) parts.push(assignment.ink)
    return parts.join(" | ")
  }

  return (
    <Box minH="100vh" bg="#FDF7EE">
      {/* Header */}
      <Box
        as="header"
        borderBottom="1px"
        borderColor="gray.200"
        bg="white"
        backdropFilter="blur(8px)"
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <Flex justify="space-between" align="center" h="16">
            <HStack spacing={2}>
              <Icon as={FiFileText} h={8} w={8} color="#FF6A00" />
              <Heading size="lg" color="#1A1A1A" fontFamily="sans">
                Scribbly
              </Heading>
            </HStack>
            <Link href="/create">
              <Button bg="#FF6A00" _hover={{ bg: "#FF8A33" }} color="white" leftIcon={<Icon as={FiPlusCircle} />}>
                Create New
              </Button>
            </Link>
          </Flex>
        </Container>
      </Box>

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
            <VStack spacing={2} align="start" mb={8}>
              <Heading size="2xl" color="#1A1A1A">
                Recent Assignments
              </Heading>
              <Text color="#666">Your handwritten assignment history</Text>
            </VStack>

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
              {assignments.map((assignment) => (
                <Card
                  key={assignment.id}
                  bg="white"
                  border="1px"
                  borderColor="gray.200"
                  _hover={{ shadow: "lg" }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  <CardBody p={0}>
                    <Box aspectRatio="4/3" position="relative" overflow="hidden" borderTopRadius="lg">
                      <Image
                        src={assignment.resultImageURL || "/placeholder.svg"}
                        alt="Assignment preview"
                        w="full"
                        h="full"
                        objectFit="cover"
                        fallbackSrc="/placeholder.svg"
                      />
                    </Box>
                    <Box p={4}>
                      <HStack spacing={1} color="#666" fontSize="sm" mb={2}>
                        <Icon as={FiCalendar} w={4} h={4} />
                        <Text>
                          {formatDate(assignment.createdAt)} at {formatTime(assignment.createdAt)}
                        </Text>
                      </HStack>
                      <HStack spacing={1} color="#666" fontSize="sm">
                        <Icon as={FiDroplet} w={4} h={4} />
                        <Text>{getStylesText(assignment)}</Text>
                      </HStack>
                    </Box>
                  </CardBody>
                </Card>
              ))}
            </Grid>
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
                      Whether it&apos;s assignments, notes, or creative projects, 
                      let&apos;s bring your words to life.
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
                          boxShadow: "0 10px 25px rgba(255, 106, 0, 0.4)"
                        }}
                        _active={{
                          transform: "translateY(0px)"
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
  )
}
