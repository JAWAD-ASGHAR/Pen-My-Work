import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  textColor?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = "md", 
  showText = true, 
  textColor = "gray.900" 
}) => {
  const getSize = () => {
    switch (size) {
      case "sm":
        return { imageSize: 20, textSize: "sm" };
      case "lg":
        return { imageSize: 32, textSize: "2xl" };
      default:
        return { imageSize: 28, textSize: "xl" };
    }
  };

  const { imageSize, textSize } = getSize();

  return (
    <Flex align="center" gap={2} minW="fit-content">
      <Image 
        src="/Logo.png" 
        alt="Pen My Work" 
        width={imageSize} 
        height={imageSize} 
        style={{ flexShrink: 0 }}
      />
      {showText && (
        <Text 
          fontSize={{ base: "sm", sm: textSize }}
          fontWeight="bold" 
          color={textColor}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          maxW={{ base: "120px", sm: "none" }}
        >
          Pen My Work
        </Text>
      )}
    </Flex>
  );
}; 