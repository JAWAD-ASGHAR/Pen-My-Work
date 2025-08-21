"use client";

import { Box, Button, Container, Flex, HStack, Icon } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FiHome, FiLogOut, FiCreditCard } from "react-icons/fi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { authClient } from "@/lib/auth-client";

interface HeaderProps {
  showBackButton?: boolean;
  backUrl?: string;
  backText?: string;
  showCreateButton?: boolean;
  createUrl?: string;
  children?: React.ReactNode;
}

export default function Header({
  showBackButton = false,
  backUrl = "/home",
  backText = "Back",
  children,
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/home";

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
          },
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Box
      as="header"
      borderBottom="1px"
      borderColor="gray.200"
      bg="white"
      backdropFilter="blur(8px)"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
        <Flex justify="space-between" align="center" h="16">
          <HStack spacing={2}>
            {showBackButton && (
              <>
                <Link href={backUrl}>
                  <Button variant="ghost" color="#666" size="sm">
                    <ArrowBackIcon w={4} h={4} mr={2} />
                    {backText}
                  </Button>
                </Link>
                <Box w="1px" h="6" bg="gray.300" />
              </>
            )}
            <Link href={isHomePage ? "/" : "/home"}>
              <Box
                cursor="pointer"
                _hover={{ opacity: 0.8 }}
                transition="opacity 0.2s"
              >
                <Logo size="md" />
              </Box>
            </Link>
          </HStack>

          <HStack spacing={3}>
            {children ||
              (isHomePage ? (
                <>
                  <Link href="/subscription">
                    <Button
                      variant="ghost"
                      leftIcon={<Icon as={FiCreditCard} />}
                      color="#666"
                      _hover={{ bg: "gray.100" }}
                      size="sm"
                    >
                      Subscription
                    </Button>
                  </Link>
                  <Button
                    variant="primary"
                    bg="#FF6A00"
                    _hover={{ bg: "#FF8A33" }}
                    color="white"
                    leftIcon={<Icon as={FiLogOut} />}
                    onClick={handleLogout}
                    colorScheme="orange"
                    size="sm"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/subscription">
                    <Button
                      variant="ghost"
                      leftIcon={<Icon as={FiCreditCard} />}
                      color="#666"
                      _hover={{ bg: "gray.100" }}
                      size="sm"
                    >
                      Subscription
                    </Button>
                  </Link>
                  <Link href="/home">
                    <Button
                      variant="ghost"
                      leftIcon={<Icon as={FiHome} />}
                      color="#666"
                      _hover={{ bg: "gray.100" }}
                      size="sm"
                    >
                      Go to Home
                    </Button>
                  </Link>
                </>
              ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
