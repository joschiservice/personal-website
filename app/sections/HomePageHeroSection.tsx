"use client"

import { HeroText } from "@/app/components/HeroText";
import { ColorGlowTransitionAnimation } from "@/app/animations/ColorGlowTransitionAnimation";
import { ScrollDownButton } from "@/app/components/buttons/ScrollDownButton";
import { SocialLinks } from "../components/SocialLinks";
import { DownloadCvButton } from "../components/buttons/DownloadCvButton";
import { ContactButton } from "../components/buttons/ContactButton";
import { HeroBackgroundAnimation } from "../animations/HeroBackgroundAnimation";

export function HomePageHeroSection() {
  return (
    <div className="min-h-screen">
      <HeroBackgroundAnimation>
        <div className="container mx-auto max-w-screen-lg px-4" id="root">
          <div className="min-h-screen flex items-center">
            <div>
              <HeroText>
                Hi<span className="text-gray-400">,</span><br />I am <ColorGlowTransitionAnimation fromColor="white" toColor="#2196f3" toColorGlow="#1976d2">Joschua Haß</ColorGlowTransitionAnimation>
              </HeroText>
              <p className="max-w-2xl mb-5 text-gray-200 text-sm sm:text-base leading-relaxed">
                Full-stack engineer focused on operations and product
                systems. I build reliable applications end to end across React,
                Next.js, NestJS, TypeScript, and .NET, with hands-on ownership of
                architecture, integrations, performance, and production delivery.
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
      </HeroBackgroundAnimation>
    </div>
  );
}
