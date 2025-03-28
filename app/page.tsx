import { HomePageHeroSection } from "@/app/sections/HomePageHeroSection";
import { AboutMeSection } from "@/app/sections/AboutMeSection";
import { WorkExperienceSection } from "@/app/sections/WorkExperienceSection";
import { CertificatesSection } from "@/app/sections/CertificatesSection";
import { ProjectsSection } from "@/app/sections/ProjectsSection";
import { ToolsSection } from "@/app/sections/ToolsSection";
import { FlightRadarSection } from "@/app/sections/FlightRadarSection";
import { InterestsSection } from "@/app/sections/InterestsSection";

export default function Home() {
  return (
    <div>
      <HomePageHeroSection />
      <AboutMeSection />
      <WorkExperienceSection />
      <CertificatesSection />
      <ProjectsSection />
      <ToolsSection />
      <InterestsSection />
      <FlightRadarSection />
    </div>
  );
}
