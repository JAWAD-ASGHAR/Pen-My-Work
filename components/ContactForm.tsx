import {
  Card,
  FormLabel,
  FormControl,
  Heading,
  VStack,
  CardBody,
  Input,
  Textarea,
  Button,
  Icon,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const ContactForm = ({
  accentColor,
  textColor,
}: {
  accentColor: string;
  textColor: string;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Message sent!",
        description: "We'll get back to you soon.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      bg="#FDF7EE"
      border="2px solid #000000"
      boxShadow="4px 4px 0px #000000"
      borderRadius="xl"
      transition="box-shadow 0.2s"
    >
      <CardBody p={8}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="start">
            <Heading fontSize="2xl" color={textColor}>
              Get In Touch
            </Heading>

            <FormControl>
              <FormLabel fontWeight="medium" fontSize={"sm"} color={textColor}>
                Name
              </FormLabel>
              <Input
                bg="white"
                border="1px solid black"
                borderRadius="lg"
                _focus={{ borderColor: accentColor, boxShadow: "none" }}
                placeholder="Your full name"
                value={formData.name}
                height={"50px"}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="medium" fontSize={"sm"} color={textColor}>
                Email
              </FormLabel>
              <Input
                bg="white"
                border="1px solid black"
                borderRadius="lg"
                _focus={{ borderColor: accentColor, boxShadow: "none" }}
                placeholder="email@example.com"
                type="email"
                height={"50px"}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="medium" fontSize={"sm"} color={textColor}>
                Subject
              </FormLabel>
              <Input
                bg="white"
                border="1px solid black"
                borderRadius="lg"
                _focus={{ borderColor: accentColor, boxShadow: "none" }}
                placeholder="What's this about?"
                height={"50px"}
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="medium" fontSize={"sm"} color={textColor}>
                Message
              </FormLabel>
              <Textarea
                bg="white"
                border="1px solid black"
                borderRadius="lg"
                _focus={{ borderColor: accentColor, boxShadow: "none" }}
                placeholder="Tell us more about your inquiry..."
                rows={4}
                resize="vertical"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                required
              />
            </FormControl>

            <Button
              type="submit"
              size="lg"
              bg={accentColor}
              color="white"
              _hover={{ bg: "orange.500" }}
              rightIcon={<Icon as={FiArrowRight} />}
              w="full"
              isLoading={isSubmitting}
              loadingText="Sending..."
            >
              Send Message
            </Button>
          </VStack>
        </form>
      </CardBody>
    </Card>
  );
};

export default ContactForm;
