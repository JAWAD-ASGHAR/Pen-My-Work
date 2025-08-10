"use client"

import React, { forwardRef, useRef, useEffect, useState } from "react";
import { Badge, Box, Button, Text, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const assignmentTypes = [
  "Write an Essay",
  "Create Notes",
  "Draft a Letter",
  "Make a Checklist",
  "Write a Report",
  "Create a Journal",
  "Draft a Proposal",
  "Write a Story",
  "Create a Summary",
  "Draft a Memo",
];

const BUTTON_TEXT = "Start Generating Now ✨";
const SCRAMBLE_CHARS = "!<>-_/[]{}—=+*^?#________";

function scrambleText(text: string, chars: string) {
  return text
    .split("")
    .map((c) =>
      c === " " ? " " : chars[Math.floor(Math.random() * chars.length)]
    )
    .join("");
}

export const HeroSection = forwardRef<HTMLDivElement>((props, ref) => {
  const router = useRouter();
  const scrambleRef = useRef<HTMLSpanElement>(null);
  const [typeIndex, setTypeIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Ensure component only runs on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let scrambleFrame: NodeJS.Timeout;
    let running = false;
    const scrambleTimeout = setInterval(() => {
      const nextIndex = (typeIndex + 1) % assignmentTypes.length;
      setTypeIndex(nextIndex);
      runScramble(assignmentTypes[nextIndex]);
    }, 2000);

    const runScramble = (newType: string) => {
      if (!scrambleRef.current || running) return;
      running = true;
      let frame = 0;
      const scrambleDuration = 500; // ms
      const frameRate = 30; // ms
      const totalFrames = Math.floor(scrambleDuration / frameRate);
      scrambleFrame = setInterval(() => {
        if (!scrambleRef.current) return;
        if (frame < totalFrames) {
          scrambleRef.current.textContent = scrambleText(
            newType,
            SCRAMBLE_CHARS
          );
          frame++;
        } else {
          clearInterval(scrambleFrame);
          scrambleRef.current.textContent = newType;
          running = false;
        }
      }, frameRate);
    };

    // Initial scramble
    runScramble(assignmentTypes[typeIndex]);

    return () => {
      clearInterval(scrambleFrame);
      clearInterval(scrambleTimeout);
    };
  }, [typeIndex, isClient]);

  const handleButtonClick = () => {
      router.push("/signin");
  };

  return (
    <Box ref={ref} w="full" textAlign="center" py={8}>
      <Badge
        variant="subtle"
        bg="orange.100"
        color="orange.600"
        border="1px solid"
        borderColor="orange.200"
        px={3}
        py={1}
        fontWeight="medium"
        fontSize="xs"
        mb={4}
      >
        ✨ AI-powered handwriting generator
      </Badge>
      <Box mb={4}>
        <Text as="h1" fontSize={{ base: "4xl", md: "6xl" }} fontWeight="bold" color="#181717" lineHeight="shorter">
          Instantly create assignments<br />as good as
          <Text as="span" color="orange.500"> hand written</Text>
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" maxW="2xl" mx="auto" mt={4} mb={2}>
          Paste your content, choose your style, and get photo-realistic handwritten pages instantly. Perfect for assignments, notes, letters, and more.
        </Text>
      </Box>
      <Box maxW="md" mx="auto" mt={4}>
        {/* Scrambled assignment type display */}
        <Flex h={8} align="center" justify="center" fontSize="md" fontWeight="semibold" color="orange.500" mb={4}>
          <span ref={scrambleRef} suppressHydrationWarning>
            {isClient ? assignmentTypes[typeIndex] : assignmentTypes[0]}
          </span>
        </Flex>
        <Button
          w="full"
          h={12}
          fontSize="lg"
          borderRadius="lg"
          bg={"#181717"}
          color="white"
          _hover={{ bg: "#181717CC" }}
          onClick={handleButtonClick}
        >
          {BUTTON_TEXT}
        </Button>
      </Box>
    </Box>
  );
});

HeroSection.displayName = "HeroSection";