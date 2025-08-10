
// Named export only! No default export.
import React, { useEffect } from "react";
import { Box, Flex, Button, IconButton, Link } from "@chakra-ui/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FiMenu, FiX } from "react-icons/fi";
import { Logo } from "./Logo";

type HeaderProps = {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  router: AppRouterInstance;
};

export const Navbar = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ scrolled, menuOpen, setMenuOpen, router }, ref) => {

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
      if (typeof document !== 'undefined') {
        if (menuOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "unset";
        }

        // Cleanup function to restore scroll when component unmounts
        return () => {
          document.body.style.overflow = "unset";
        };
      }
    }, [menuOpen]);

    const handleAuthButtonClick = () => {
    
        router.push("/sign-in");
      
    };

    return (
      <Flex
        ref={ref}
        as="header"
        position="sticky"
        top="16px"
        left={0}
        right={0}
        zIndex={40}
        align="center"
        justify="space-between"
        px={{ base: 6, md: 8 }}
        py={5}
        w="full"
        maxW="6xl"
        mx="auto"
        bg="white"
        backdropFilter="blur(8px)"
        border="1px solid"
        borderColor="gray.300"
        borderRadius="2xl"
        boxShadow={scrolled ? "lg" : undefined}
        transition="all 0.3s"
        style={{ willChange: "transform, padding, box-shadow" }}
      >
        {/* Logo Left */}
        <Flex align="center" onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
        }} minW="120px" cursor="pointer">
          <Logo size="md" />
        </Flex>
        {/* Nav Centered */}
        <Flex
          display={{ base: "none", md: "flex" }}
          align="center"
          gap={6}
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
        >
          <Link
            href="#how-it-works"
            color="gray.800"
            fontWeight={"semibold"}
            _hover={{ color: "gray.900" }}
            transition="colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            How It Works
          </Link>
          <Link
            href="#examples"
            color="gray.800"
            fontWeight={"semibold"}
            _hover={{ color: "gray.900" }}
            transition="colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Examples
          </Link>
          <Link
            href="#use-cases"
            color="gray.800"
            fontWeight={"semibold"}
            _hover={{ color: "gray.900" }}
            transition="colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('use-cases')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Use Cases
          </Link>
          <Link
            href="#testimonials"
            color="gray.800"
            fontWeight={"semibold"}
            _hover={{ color: "gray.900" }}
            transition="colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Reviews
          </Link>
          <Link
            href="#contact"
            color="gray.800"
            fontWeight={"semibold"}
            _hover={{ color: "gray.900" }}
            transition="colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact
          </Link>
        </Flex>
        {/* Auth Button Right */}
        <Flex align="center" gap={4} minW="120px" justify="flex-end">
          <Button
            variant={"outline"}
            bg="white"
            borderRadius="lg"
            color="gray.900"
            borderColor="gray.300"
            _hover={{ bg: "gray.50" }}
            onClick={handleAuthButtonClick}
            fontWeight="medium"
          >
            Sign In
          </Button>
          {/* Mobile Burger */}
          <IconButton
            display={{ base: "inline-flex", md: "none" }}
            aria-label="Open menu"
            variant="ghost"
            onClick={() => setMenuOpen(true)}
            borderRadius="lg"
            p={2}
            _hover={{ bg: "gray.100" }}
          >
            <FiMenu style={{ width: "24px", height: "24px", color: "#111827" }} />
          </IconButton>
        </Flex>
        {/* Mobile Menu Popup */}
        {menuOpen && (
          <Box
            position="fixed"
            inset={0}
            top={0}
            zIndex={100}
            bg="white"
            display="flex"
            flexDir="column"
            p={4}
            m={0}
            borderRadius="none"
            w="100vw"
            h="100vh"
            animation="fadeIn 0.2s"
          >
            <Flex align="center" justify="space-between" mb={8} px={6} pt={6}>
              <Flex align="center">
                <Logo size="md" />
              </Flex>
              <IconButton
                aria-label="Close menu"
                variant="ghost"
                onClick={() => setMenuOpen(false)}
                borderRadius="lg"
                p={2}
                _hover={{ bg: "gray.100" }}
              >
                <FiX style={{ width: "24px", height: "24px", color: "#111827" }} />
              </IconButton>
            </Flex>
            <Flex
              as="nav"
              direction="column"
              gap={6}
              fontSize="2xl"
              fontWeight="medium"
              color="gray.700"
              mb={8}
              px={6}
            >
              <Link
                href="#how-it-works"
                _hover={{ color: "gray.900" }}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                How It Works
              </Link>
              <Link
                href="#examples"
                _hover={{ color: "gray.900" }}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Examples
              </Link>
              <Link
                href="#use-cases"
                _hover={{ color: "gray.900" }}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  document.getElementById('use-cases')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Use Cases
              </Link>
              <Link
                href="#testimonials"
                _hover={{ color: "gray.900" }}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Reviews
              </Link>
              <Link
                href="#contact"
                _hover={{ color: "gray.900" }}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact
              </Link>
              <Button
                w="full"
                h={12}
                fontWeight="medium"
                fontSize="lg"
                borderRadius="lg"
                bg="gray.800"
                color="white"
                _hover={{ bg: "gray.900" }}
                onClick={() => {
                  handleAuthButtonClick();
                  setMenuOpen(false);
                }}
              >
                Sign In
              </Button>
            </Flex>
          </Box>
        )}
      </Flex>
    );
  }
);

Navbar.displayName = "Navbar";


