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
} from "@chakra-ui/react"
import { FiFileText, FiPlusCircle, FiCalendar, FiDroplet } from "react-icons/fi"
import Link from "next/link"

// Mock data for recent assignments
const recentAssignments = [
  {
    id: 1,
    thumbnail: "/placeholder.svg?height=200&width=300",
    date: "2024-01-15",
    time: "2:30 PM",
    styles: "Ruled | Blue Ink | Bold Heading",
  },
  {
    id: 2,
    thumbnail: "/placeholder.svg?height=200&width=300",
    date: "2024-01-14",
    time: "10:15 AM",
    styles: "Blank | Black Ink | Normal",
  },
  {
    id: 3,
    thumbnail: "/placeholder.svg?height=200&width=300",
    date: "2024-01-13",
    time: "4:45 PM",
    styles: "Grid | Dark Gray | Underlined",
  },
]

export default function Dashboard() {
  const hasAssignments = recentAssignments.length > 0

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
            <Link href="/create/step-1">
              <Button bg="#FF6A00" _hover={{ bg: "#FF8A33" }} color="white" leftIcon={<Icon as={FiPlusCircle} />}>
                Create New
              </Button>
            </Link>
          </Flex>
        </Container>
      </Box>

      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }} py={8}>
        {hasAssignments ? (
          <Box>
            <VStack spacing={2} align="start" mb={8}>
              <Heading size="2xl" color="#1A1A1A">
                Recent Assignments
              </Heading>
              <Text color="#666">Your handwritten assignment history</Text>
            </VStack>

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
              {recentAssignments.map((assignment) => (
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
                        src={assignment.thumbnail || "/placeholder.svg"}
                        alt="Assignment preview"
                        w="full"
                        h="full"
                        objectFit="cover"
                      />
                    </Box>
                    <Box p={4}>
                      <HStack spacing={1} color="#666" fontSize="sm" mb={2}>
                        <Icon as={FiCalendar} w={4} h={4} />
                        <Text>
                          {assignment.date} at {assignment.time}
                        </Text>
                      </HStack>
                      <HStack spacing={1} color="#666" fontSize="sm">
                        <Icon as={FiDroplet} w={4} h={4} />
                        <Text>{assignment.styles}</Text>
                      </HStack>
                    </Box>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </Box>
        ) : (
          <VStack spacing={8} align="center" py={16}>
            <Box maxW="md" textAlign="center">
              <Box
                w="24"
                h="24"
                mx="auto"
                mb={6}
                bg="gray.100"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FiFileText} w={12} h={12} color="gray.400" />
              </Box>
              <Heading size="xl" color="#1A1A1A" mb={2}>
                No assignments yet
              </Heading>
              <Text color="#666" mb={8}>
                Click &apos;Create New&apos; to get started with your first handwritten assignment.
              </Text>
              <Link href="/create/step-1">
                <Button bg="#FF6A00" _hover={{ bg: "#FF8A33" }} color="white" leftIcon={<Icon as={FiPlusCircle} />}>
                  Create Your First Assignment
                </Button>
              </Link>
            </Box>
          </VStack>
        )}
      </Container>
    </Box>
  )
}
