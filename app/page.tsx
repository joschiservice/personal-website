import {HomePageHeroSection} from "@/app/sections/HomePageHeroSection";
import {AboutMeSection} from "@/app/sections/AboutMeSection";
import {WorkExperienceSection} from "@/app/sections/WorkExperienceSection";
import {CertificatesSection} from "@/app/sections/CertificatesSection";
import {ProjectsSection} from "@/app/sections/ProjectsSection";
import {Navbar} from "@/app/components/navbar";
import {ToolsSection} from "@/app/sections/ToolsSection";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HomePageHeroSection />
      <AboutMeSection />
      <WorkExperienceSection />
      <CertificatesSection />
      <ProjectsSection />
      <ToolsSection />
    </div>
  )
}
