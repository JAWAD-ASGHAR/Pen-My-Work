"use client"

import { Box } from "@chakra-ui/react"
import Header from "@/components/Header"
import { usePathname } from "next/navigation"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHomePage = pathname === "/home"

  return (
    <Box minH="100vh" bg="#FDF7EE">
      <Header 
        title="Scribbly"
        showCreateButton={isHomePage}
        createUrl="/create"
      />
      {children}
    </Box>
  )
} 