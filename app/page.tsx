"use client";
import { Banner } from "@/components/banner";
import { HeroSection } from "@/components/hero";
import { Navbar } from "@/components/nav";
import { gsap } from "gsap";

import {
  Box,
  Container,
  VStack,
  Image,

} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PreviewPanels } from "@/components/panels";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import CustomersSection from "@/components/CustomersSection";
import HowItWorks from "@/components/HowItWorks";
import SeeTheMagic from "@/components/SeeTheMagic";
import UseCases from "@/components/UseCases";
import StatsSection from "@/components/StatsSection";

export default function HandwritingAILanding() {
  const bgColor = "#FDF7EE";
  const textColor = "#1A1A1A";
  const accentColor = "#FF6A00";
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerTimeline = useRef<gsap.core.Timeline | null>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Banner animation
      gsap.fromTo(
        bannerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );

      // Header animation (initial)
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out",
        }
      );

      // Hero content animation
      gsap.fromTo(
        heroRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.4,
          ease: "power2.out",
        }
      );

      // Preview panels animation
      gsap.fromTo(
        previewRef.current?.children || [],
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          delay: 0.8,
          ease: "power2.out",
        }
      );

      // Header shrink on scroll
      if (headerRef.current) {
        headerTimeline.current = gsap
          .timeline({ paused: true })
          .to(headerRef.current, {
            scale: 0.95,
            paddingTop: 8,
            paddingBottom: 8,
            boxShadow: "0 2px 16px 0 rgba(0,0,0,0.10)",
            duration: 0.3,
            ease: "power2.out",
          });
      }

      const handleScroll = () => {
        if (!headerTimeline.current || typeof window === "undefined") return;
        if (window.scrollY > 30) {
          headerTimeline.current.play();
          setScrolled(true);
        } else {
          headerTimeline.current.reverse();
          setScrolled(false);
        }
      };

      if (typeof window !== "undefined") {
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <Box minH="100vh" bg="white">
      <Banner ref={bannerRef} />
      <Box h="16px" /> {/* Spacer to push header below banner */}
      <Navbar
        ref={headerRef}
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        router={router}
      />
      <Container as="main" centerContent maxW="6xl" px={2} py={[0, null, 8]}>
        <VStack
          w="full"
          bg="#FDF7EE"
          borderRadius="2xl"
          shadow="sm"
          px={[6, null, 16]}
          pt={8}
          pb={0}
          mt={4}
        >
          <HeroSection ref={heroRef} />
          <PreviewPanels ref={previewRef} />
        </VStack>
      </Container>


      {/* How It Works */}
      <HowItWorks accentColor={accentColor} textColor={textColor} />


      {/* Wave Top - Transition from white to bgColor */}
      <Box position="relative" bg="white">
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          zIndex={1}
          transform="translateY(1px) rotate(180deg)"
        >
          <Image
            src="/wavetop.svg"
            alt=""
            w="full"
            h="auto"
            objectFit="cover"
          />
        </Box>
        <Box h="150px" bg="white" />
      </Box>


      {/* See The Magic Section */}
      <SeeTheMagic accentColor={accentColor} textColor={textColor} />

      {/* Wave Bottom - Transition from bgColor to white */}
      <Box position="relative" bg={bgColor}>
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          zIndex={1}
          transform="translateY(-1px)"
        >
          <Image
            src="/wavetop.svg"
            alt=""
            w="full"
            h="auto"
            objectFit="cover"
          />
        </Box>
        <Box h="20px" bg={bgColor} />
      </Box>


      {/* Use Cases */}
      <UseCases textColor={textColor} />


      {/* Stats Section */}
      <StatsSection bgColor={bgColor} textColor={textColor} />


      {/* Testimonial Section */}
          <CustomersSection accentColor={accentColor} textColor={textColor} />


      {/* Final CTA */}
      <Box as="section" position="relative" overflow="hidden">
        {/* Top wave border - transition from white to orange */}
        <Box position="relative" bg="white">
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            zIndex={1}
            transform="translateY(1px) rotate(180deg)"
            h="60px"
            overflow="hidden"
          >
            <Image
              src="/wavetop.svg"
              alt=""
              w="full"
              h="full"
              objectFit="cover"
            />
          </Box>
          <Box h="120px" bg="white" />
        </Box>

        <CTASection accentColor={accentColor} textColor={textColor} />

        {/* Bottom wave border - transition from orange to dark */}
        <Box position="relative" bg="#1A1A1A">
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            zIndex={1}
            transform="translateY(-1px)"
            h="60px"
            overflow="hidden"
          >
            <Image
              src="/wavetop.svg"
              alt=""
              w="full"
              h="full"
              objectFit="cover"
            />
          </Box>
          <Box h="120px" bg="#1A1A1A" />
        </Box>
      </Box>
      {/* Footer */}
      <Footer textColor={textColor} />
    </Box>
  );
}
