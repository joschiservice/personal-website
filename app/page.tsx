import { HomePageHeroSection } from "@/app/sections/HomePageHeroSection";
import { AboutMeSection } from "@/app/sections/AboutMeSection";
import { TimelineSection } from "@/app/sections/timeline/TimelineSection";
import { ToolsSection } from "@/app/sections/ToolsSection";
import { FlightRadarSection } from "@/app/sections/FlightRadarSection";
import { InterestsSection } from "@/app/sections/InterestsSection";

export default function Home() {
  return (
    <div>
      <HomePageHeroSection />
      <AboutMeSection />
      <TimelineSection />
      <ToolsSection />
      <InterestsSection />
      <FlightRadarSection />
    </div>
  );
}
