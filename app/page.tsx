import type { Metadata } from "next";
import { HomePageHeroSection } from "@/app/sections/HomePageHeroSection";
import { AboutMeSection } from "@/app/sections/AboutMeSection";
import { TimelineSection } from "@/app/sections/timeline/TimelineSection";
import { ToolsSection } from "@/app/sections/ToolsSection";
import { FlightRadarSection } from "@/app/sections/FlightRadarSection";
import { InterestsSection } from "@/app/sections/InterestsSection";
import { LatestPostsSection } from "@/app/sections/LatestPostsSection";
import { siteConfig } from "@/app/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: "/",
  },
};

export default function Home() {
  return (
    <div>
      <HomePageHeroSection />
      <AboutMeSection />
      <LatestPostsSection />
      <TimelineSection />
      <ToolsSection />
      <InterestsSection />
      <FlightRadarSection />
    </div>
  );
}
