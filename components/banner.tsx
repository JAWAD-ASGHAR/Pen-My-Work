import React, { forwardRef } from "react"
import { Box, Text } from "@chakra-ui/react"

export const Banner = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Box
      ref={ref}
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      px={4}
      py={2}
      textAlign="center"
      fontSize="sm"
    >
      <Text as="span" color="orange.500" fontWeight="medium" display={{ base: "block", md: "inline" }}>
        Impress Your Clients
      </Text>
      <Text as="span" color="gray.600" ml={2} display={{ base: "none", md: "inline" }}>
        Create beautiful onboarding screens, proposals, and more — instantly, with AI.
      </Text>
    </Box>
  )
})

Banner.displayName = "Banner" 
