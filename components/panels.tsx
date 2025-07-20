
import Image from "next/image"
import React from "react"
import { Box, Grid } from "@chakra-ui/react"

const onboardingImages = [
  "/example-1.png",
  "/example-2.png",
  "/example-1.png",
  "/example-2.png",
  "/example-1.png",
  "/example-2.png",
  "/example-1.png",
  "/example-2.png",
  "/example-1.png",
  "/example-2.png",
]

const fadeGradient = {
  background: 'linear-gradient(to top, #FDF7EE 20%, rgba(255,251,234,0.7) 50%, rgba(255,255,255,0.0) 100%)',
};

export const PreviewPanels = React.forwardRef<HTMLDivElement>((props, ref) => (
  <Box
    ref={ref}
    w="full"
    mt={6}
    position="relative"
    bg="#FDF7EE"
  >
    <Box position="relative" h="600px" overflow="hidden">
      <Grid
        position="relative"
        zIndex={0}
        templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)" }}
        gap={4}
        px={4}
        py={4}
      >
        {onboardingImages.map((src, idx) => (
          <Box
            key={idx}
            borderRadius="xl"
            overflow="hidden"
            boxShadow="lg"
            bg="white"
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="flex-start"
            aspectRatio="9/16"
            minH="220px"
            maxH="340px"
            w="full"
          >
            <Image
              width={240}
              height={340}
              src={src}
              alt={`Onboarding screen ${idx + 1}`}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                aspectRatio: '9/16',
              }}
            />
          </Box>
        ))}
      </Grid>
      {/* Fade-out gradient at bottom */}
      <Box
        pointerEvents="none"
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        h="128px"
        zIndex={1}
        {...fadeGradient}
      />
    </Box>
  </Box>
))

PreviewPanels.displayName = "PreviewPanels" 