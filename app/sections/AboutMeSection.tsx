import { SectionHeading } from "@/app/components/SectionHeading";
import { aboutMeSectionContent } from "@/app/data/aboutMeSection";
import { FaUser } from "react-icons/fa";
import { HighlightedSectionBackground } from "./backgrounds/HighlightedSectionBackground";
import { SectionBodyText } from "../components/SectionBodyText";

export function AboutMeSection() {
  return (
    <section id="about-me" className="py-16 sm:py-20 md:py-24 relative">
      <HighlightedSectionBackground />

      <div className="container mx-auto max-w-4xl px-8">
        <SectionHeading
          title={aboutMeSectionContent.title}
          icon={FaUser}
          gradient="from-blue-500/40 to-blue-300/40"
        />

        <div className="space-y-4">
          {aboutMeSectionContent.paragraphs.map((paragraph) => (
            <SectionBodyText key={paragraph}>{paragraph}</SectionBodyText>
          ))}
        </div>
      </div>
    </section>
  );
}
