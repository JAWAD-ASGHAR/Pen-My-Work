import {
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Portal,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FiArrowRight } from "react-icons/fi";

const inkColors = [
  { id: "blue", name: "Blue", color: "#0052A3", hex: "#0052A3" },
  { id: "black", name: "Black", color: "#0A0A0A", hex: "#0A0A0A" },
  { id: "custom", name: "Custom", color: "#FF6A00", hex: "#FF6A00" },
];

const writingStyles = [
  {
    id: "caveat",
    name: "Caveat",
    description: "Natural handwritten style",
    fontFamily: "'Caveat', cursive",
    fontSize: "30px",
  },
  {
    id: "gloria",
    name: "Gloria Hallelujah",
    description: "Playful and expressive",
    fontFamily: "'Gloria Hallelujah', cursive",
    fontSize: "20px",
  },
  {
    id: "patrick",
    name: "Patrick Hand",
    description: "Clear and readable",
    fontFamily: "'Patrick Hand', cursive",
    fontSize: "24px",
  },
  {
    id: "permanent-marker",
    name: "Permanent Marker",
    description: "Bold and confident",
    fontFamily: "'Permanent Marker', cursive",
    fontSize: "20px",
  },
  {
    id: "reenie-beanie",
    name: "Reenie Beanie",
    description: "Casual and friendly",
    fontFamily: "'Reenie Beanie', cursive",
    fontSize: "30px",
  },
  {
    id: "shadows-into-light",
    name: "Shadows Into Light",
    description: "Elegant and flowing",
    fontFamily: "'Shadows Into Light', cursive",
    fontSize: "24px",
  },
  {
    id: "edu-sa-hand",
    name: "Edu SA Hand",
    description: "Professional handwritten",
    fontFamily: "'Edu SA Hand', cursive",
    fontSize: "24px",
  },
];

interface Step3InkColorProps {
  selectedInk: string; // This will now store hex codes
  setSelectedInk: (ink: string) => void;
  customColor: string;
  setCustomColor: (color: string) => void;
  isColorPickerOpen: boolean;
  setIsColorPickerOpen: (open: boolean) => void;
  selectedWritingStyle: string;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Step3InkColor({
  selectedInk,
  setSelectedInk,
  customColor,
  setCustomColor,
  isColorPickerOpen,
  setIsColorPickerOpen,
  selectedWritingStyle,
  onNext,
  onPrevious,
}: Step3InkColorProps) {
  // Determine if we're using a predefined color or custom color
  const isCustomColor = selectedInk === customColor;
  const selectedColor = isCustomColor 
    ? { id: "custom", name: "Custom", color: customColor, hex: customColor }
    : inkColors.find((ink) => ink.hex === selectedInk) || { id: "custom", name: "Custom", color: selectedInk, hex: selectedInk };

  return (
    <>
      <VStack spacing={{ base: 6, md: 8 }} align="center" mb={{ base: 6, md: 8 }}>
        <Heading 
          size={{ base: "xl", md: "2xl" }} 
          color="#1A1A1A" 
          textAlign="center"
          px={{ base: 2, md: 0 }}
        >
          Choose Ink Color
        </Heading>
        <Text 
          color="#666" 
          textAlign="center"
          fontSize={{ base: "sm", md: "md" }}
          px={{ base: 4, md: 0 }}
        >
          Select the ink color for your handwriting
        </Text>
      </VStack>

      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={{ base: 4, md: 6 }}
        mb={{ base: 6, md: 8 }}
        px={{ base: 2, md: 0 }}
      >
        {inkColors.map((ink) => (
          ink.id === "custom" ? (
            <Popover
              key={ink.id}
              isOpen={isColorPickerOpen}
              onClose={() => setIsColorPickerOpen(false)}
              placement="top"
            >
              <PopoverTrigger>
                <Card
                  cursor="pointer"
                  transition="all 0.2s"
                  onClick={() => setSelectedInk(customColor)}
                  bg={selectedInk === customColor ? "orange.50" : "white"}
                  border="1px"
                  borderColor={selectedInk === customColor ? "#FF6A00" : "gray.200"}
                  _hover={{ shadow: "md" }}
                  _active={{ transform: "scale(0.98)" }}
                  className="mobile-card"
                >
                  <CardBody p={{ base: 4, md: 6 }} textAlign="center">
                    <Box
                      w={{ base: "12", md: "16" }}
                      h={{ base: "12", md: "16" }}
                      borderRadius="full"
                      mx="auto"
                      mb={{ base: 3, md: 4 }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bg={customColor}
                      cursor="pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsColorPickerOpen(true);
                      }}
                      _hover={{ transform: "scale(1.05)" }}
                      transition="transform 0.2s"
                    >
                      <Box w={{ base: "6", md: "8" }} h={{ base: "6", md: "8" }} bg="white" borderRadius="full"></Box>
                    </Box>
                    <Heading size={{ base: "sm", md: "md" }} color="#1A1A1A" mb={1}>
                      {ink.name}
                    </Heading>
                    <Text 
                      fontSize={{ base: "xs", md: "sm" }} 
                      color="#666"
                      cursor="pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsColorPickerOpen(true);
                      }}
                      _hover={{ color: "#FF6A00" }}
                      transition="color 0.2s"
                    >
                      {customColor}
                    </Text>
                  </CardBody>
                </Card>
              </PopoverTrigger>
              <Portal>
                <PopoverContent p={4} w={{ base: "280px", md: "300px" }}>
                  <PopoverBody>
                    <VStack spacing={4}>
                      <Heading size="md" color="#1A1A1A" textAlign="center">
                        Choose Custom Color
                      </Heading>
                      <Box>
                        <Text fontSize="sm" color="#666" mb={2}>
                          Color Picker
                        </Text>
                        <input
                          type="color"
                          value={customColor}
                          onChange={(e) => {
                            setCustomColor(e.target.value);
                            setSelectedInk(e.target.value);
                          }}
                          style={{
                            width: "100%",
                            height: "60px",
                            border: "2px solid #FF6A00",
                            borderRadius: "8px",
                            cursor: "pointer",
                          }}
                        />
                      </Box>
                      <HStack justify="space-between" w="full">
                        <Text fontSize="sm" color="#666">
                          Selected Color:
                        </Text>
                        <input
                          type="text"
                          value={customColor}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Only update if it's a valid hex color
                            if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                              setCustomColor(value);
                              setSelectedInk(value);
                            } else if (value.length <= 7) {
                              // Allow typing but don't update color until valid
                              setCustomColor(value);
                            }
                          }}
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#1A1A1A",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            width: "80px",
                            textAlign: "center",
                          }}
                        />
                      </HStack>
                      <Button
                        colorScheme="orange"
                        size="sm"
                        onClick={() => setIsColorPickerOpen(false)}
                        w="full"
                      >
                        Done
                      </Button>
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          ) : (
            <Card
              key={ink.id}
              cursor="pointer"
              transition="all 0.2s"
              onClick={() => setSelectedInk(ink.hex)}
              bg={selectedInk === ink.hex ? "orange.50" : "white"}
              border="1px"
              borderColor={selectedInk === ink.hex ? "#FF6A00" : "gray.200"}
              _hover={{ shadow: "md" }}
              _active={{ transform: "scale(0.98)" }}
              className="mobile-card"
            >
              <CardBody p={{ base: 4, md: 6 }} textAlign="center">
                <Box
                  w={{ base: "12", md: "16" }}
                  h={{ base: "12", md: "16" }}
                  borderRadius="full"
                  mx="auto"
                  mb={{ base: 3, md: 4 }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg={ink.color}
                >
                  <Box w={{ base: "6", md: "8" }} h={{ base: "6", md: "8" }} bg="white" borderRadius="full"></Box>
                </Box>
                <Heading size={{ base: "sm", md: "md" }} color="#1A1A1A" mb={1}>
                  {ink.name}
                </Heading>
                <Text fontSize={{ base: "xs", md: "sm" }} color="#666">
                  {ink.hex}
                </Text>
              </CardBody>
            </Card>
          )
        ))}
      </Grid>

      {/* Handwriting Preview */}
      <Card bg="white" border="1px" borderColor="gray.200" mb={{ base: 6, md: 8 }} mx={{ base: 2, md: 0 }}>
        <CardBody p={{ base: 6, md: 8 }}>
          <Heading size={{ base: "sm", md: "md" }} color="#1A1A1A" mb={4} textAlign="center">
            Preview
          </Heading>
          <Box bg="gray.50" p={{ base: 4, md: 6 }} borderRadius="lg">
            <Text
              fontSize={{ base: "16px", sm: writingStyles.find((s) => s.id === selectedWritingStyle)
                  ?.fontSize || "24px" }}
              textAlign="center"
              color={selectedColor?.color}
              fontFamily={
                writingStyles.find((s) => s.id === selectedWritingStyle)
                  ?.fontFamily || "'Patrick Hand', cursive"
              }
              lineHeight="1.4"
            >
              The quick brown fox jumps over the lazy dog
            </Text>
          </Box>
        </CardBody>
      </Card>

      <Flex 
        justify="space-between" 
        px={{ base: 4, md: 0 }}
        direction={{ base: "column", sm: "row" }}
        gap={{ base: 3, sm: 0 }}
      >
        <Button
          variant="outline"
          borderColor="gray.200"
          color="#666"
          bg="transparent"
          onClick={onPrevious}
          w={{ base: "full", sm: "auto" }}
          py={{ base: 3, md: 4 }}
          fontSize={{ base: "sm", md: "md" }}
          className="mobile-button"
        >
          <ArrowBackIcon w={4} h={4} mr={2} />
          Previous
        </Button>
        <Button
          bg="#FF6A00"
          _hover={{ bg: "#FF8A33" }}
          color="white"
          px={{ base: 6, md: 8 }}
          py={{ base: 3, md: 4 }}
          fontSize={{ base: "sm", md: "md" }}
          rightIcon={<Icon as={FiArrowRight} />}
          onClick={onNext}
          w={{ base: "full", sm: "auto" }}
          className="mobile-button"
        >
          Next Step
        </Button>
      </Flex>
    </>
  );
} 