"use client"

import { HeroText } from "@/app/components/HeroText";
import { ColorGlowTransitionAnimation } from "@/app/animations/ColorGlowTransitionAnimation";
import { ScrollDownButton } from "@/app/components/buttons/ScrollDownButton";
import { SocialLinks } from "../components/SocialLinks";
import { DownloadCvButton } from "../components/buttons/DownloadCvButton";
import { ContactButton } from "../components/buttons/ContactButton";

export function HomePageHeroSection() {
  return (
    <div className="container mx-auto max-w-(--breakpoint-lg) px-4" id="root">
      <div className="min-h-screen flex items-center">
        <div>
          <HeroText>
            Hi<span className="text-gray-400">,</span><br />I am <ColorGlowTransitionAnimation fromColor="white" toColor="#2196f3" toColorGlow="#1976d2">Joschua Haß</ColorGlowTransitionAnimation>
          </HeroText>
          <p className="max-w-lg mb-8 sm:mb-4 text-gray-300 text-md">
            Full-stack developer specializing in the development of web and desktop applications with 4 years of experience (3 years in a professional setting).
          </p>
          <div className="flex flex-row gap-4 mb-8">
            <ContactButton />
            <DownloadCvButton />
          </div>

          <SocialLinks />

          <ScrollDownButton scrollToId="about-me" />
        </div>
      </div>
    </div>
  );
}