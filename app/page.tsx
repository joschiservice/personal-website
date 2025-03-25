import { HomePageHeroSection } from "@/app/sections/HomePageHeroSection";
import { AboutMeSection } from "@/app/sections/AboutMeSection";
import { WorkExperienceSection } from "@/app/sections/WorkExperienceSection";
import { CertificatesSection } from "@/app/sections/CertificatesSection";
import { ProjectsSection } from "@/app/sections/ProjectsSection";
import { ToolsSection } from "@/app/sections/ToolsSection";
import { FlightRadarSection } from "./sections/FlightRadarSection";

export default function Home() {
  return (
    <div>
      <HomePageHeroSection />
      <AboutMeSection />
      <WorkExperienceSection />
      <CertificatesSection />
      <ProjectsSection />
      <ToolsSection />
      <FlightRadarSection />
    </div>
  );
}
