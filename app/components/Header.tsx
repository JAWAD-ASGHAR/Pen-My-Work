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
}

export default function Header({ showBackButton = true }: HeaderProps) {
  const router = useRouter()
  return (
    <Box
      as="header"
      borderBottom="1px"
      borderColor="gray.200"
      bg="white"
      backdropFilter="blur(8px)"
    >
      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
        <Flex justify="space-between" align="center" h="16">
          <HStack spacing={2}>
            <Icon as={FiFileText} h={8} w={8} color="#FF6A00" />
            <Heading onClick={() => router.push("/")} size="lg" color="#1A1A1A" cursor="pointer" fontFamily="sans">
              Scribbly
            </Heading>
          </HStack>
          {showBackButton && (
            <Link href="/">
              <Button variant="ghost" color="#666">
                <ArrowBackIcon w={4} h={4} mr={2} />
                Back to Dashboard
              </Button>
            </Link>
          )}
        </Flex>
      </Container>
    </Box>
  )
} 