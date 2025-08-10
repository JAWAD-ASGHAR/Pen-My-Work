"use client"

import { Box } from "@chakra-ui/react"
import Header from "@/components/Header"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Box minH="100vh" bg="#FDF7EE">
      <Header />
      {children}
    </Box>
  )
} 