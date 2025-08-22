import { paperTypes } from "@/data/paper";
import {
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
interface Step1PaperTypeProps {
  selectedPaper: string;
  setSelectedPaper: (paper: string) => void;
  onNext: () => void;
}

export default function Step1PaperType({
  selectedPaper,
  setSelectedPaper,
  onNext,
}: Step1PaperTypeProps) {
  return (
    <>
      <VStack spacing={{ base: 6, md: 8 }} align="center" mb={{ base: 6, md: 8 }}>
        <Heading 
          size={{ base: "xl", md: "2xl" }} 
          color="#1A1A1A" 
          textAlign="center"
          px={{ base: 2, md: 0 }}
        >
          Choose Paper Type
        </Heading>
        <Text 
          color="#666" 
          textAlign="center"
          fontSize={{ base: "sm", md: "md" }}
          px={{ base: 4, md: 0 }}
        >
          Select the type of paper for your assignment
        </Text>
      </VStack>

      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={{ base: 4, md: 6 }}
        mb={{ base: 6, md: 8 }}
        px={{ base: 2, md: 0 }}
      >
        {paperTypes.map((paper) => (
                  <Card
          key={paper.id}
          cursor="pointer"
          transition="all 0.2s"
          onClick={() => setSelectedPaper(paper.id)}
          bg={selectedPaper === paper.id ? "orange.50" : "white"}
          border="1px"
          borderColor={selectedPaper === paper.id ? "#FF6A00" : "gray.200"}
          _hover={{ shadow: "md" }}
          _active={{ transform: "scale(0.98)" }}
          className="mobile-card"
        >
            <CardBody p={{ base: 4, md: 6 }} textAlign="center">
              <Box
                aspectRatio="3/4"
                position="relative"
                mb={{ base: 3, md: 4 }}
                bg="gray.50"
                borderRadius="lg"
                overflow="hidden"
                minH={{ base: "120px", sm: "140px", md: "160px" }}
              >
                <Image
                  src={paper.preview || "/placeholder.svg"}
                  alt={`${paper.name} paper preview`}
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              </Box>
              <HStack spacing={2} justify="center" mb={2}>
                <Icon as={paper.icon} w={{ base: 4, md: 5 }} h={{ base: 4, md: 5 }} color="#FF6A00" />
                <Heading size={{ base: "sm", md: "md" }} color="#1A1A1A">
                  {paper.name}
                </Heading>
              </HStack>
              <Text fontSize={{ base: "xs", md: "sm" }} color="#666">
                {paper.description}
              </Text>
            </CardBody>
          </Card>
        ))}
      </Grid>

      <Flex justify="center" px={{ base: 4, md: 0 }}>
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