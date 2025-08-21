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
      <VStack spacing={8} align="center" mb={8}>
        <Heading size="2xl" color="#1A1A1A" textAlign="center">
          Choose Paper Type
        </Heading>
        <Text color="#666" textAlign="center">
          Select the type of paper for your assignment
        </Text>
      </VStack>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={6}
        mb={8}
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
          >
            <CardBody p={6} textAlign="center">
              <Box
                aspectRatio="3/4"
                position="relative"
                mb={4}
                bg="gray.50"
                borderRadius="lg"
                overflow="hidden"
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
                <Icon as={paper.icon} w={5} h={5} color="#FF6A00" />
                <Heading size="md" color="#1A1A1A">
                  {paper.name}
                </Heading>
              </HStack>
              <Text fontSize="sm" color="#666">
                {paper.description}
              </Text>
            </CardBody>
          </Card>
        ))}
      </Grid>

      <Flex justify="center">
        <Button
          bg="#FF6A00"
          _hover={{ bg: "#FF8A33" }}
          color="white"
          px={8}
          rightIcon={<Icon as={FiArrowRight} />}
          onClick={onNext}
        >
          Next Step
        </Button>
      </Flex>
    </>
  );
} 