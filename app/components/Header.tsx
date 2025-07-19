"use client"

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
} from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { FiFileText } from "react-icons/fi"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface HeaderProps {
  showBackButton?: boolean
  backUrl?: string
  backText?: string
  title?: string
  showCreateButton?: boolean
  createUrl?: string
  children?: React.ReactNode
}

export default function Header({ 
  showBackButton = false, 
  backUrl = "/home", 
  backText = "Back",
  title = "Scribbly",
  showCreateButton = false,
  createUrl = "/create",
  children
}: HeaderProps) {
  const router = useRouter()
  return (
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
            {showBackButton && (
              <>
                <Link href={backUrl}>
                  <Button variant="ghost" color="#666" size="sm">
                    <ArrowBackIcon w={4} h={4} mr={2} />
                    {backText}
                  </Button>
                </Link>
                <Box w="1px" h="6" bg="gray.300" />
              </>
            )}
            <Icon as={FiFileText} h={6} w={6} color="#FF6A00" />
            <Heading size="lg" onClick={() => router.push("/home")} cursor="pointer" color="#1A1A1A" fontFamily="sans">
              {title}
            </Heading>
          </HStack>
          
          {children || (showCreateButton && (
            <Link href={createUrl}>
              <Button bg="#FF6A00" _hover={{ bg: "#FF8A33" }} color="white">
                Create New
              </Button>
            </Link>
          ))}
        </Flex>
      </Container>
    </Box>
  )
} 