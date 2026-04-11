import { TextLink } from "@/app/components/TextLink";
import { SectionHeading } from "@/app/components/SectionHeading";
import { FaUser } from "react-icons/fa";
import { HighlightedSectionBackground } from "./backgrounds/HighlightedSectionBackground";
import { SectionBodyText } from "../components/SectionBodyText";

export function AboutMeSection() {
  return (
    <section id="about-me" className="py-16 sm:py-20 md:py-24 relative">
      <HighlightedSectionBackground />

      <div className="container mx-auto max-w-4xl px-8">
        <SectionHeading
          title="About Me"
          icon={FaUser}
          gradient="from-blue-500/40 to-blue-300/40"
        />

        <div className="space-y-4">
          <SectionBodyText>
            I started building software seriously as a teenager after one of my
            favorite collaboration tools for virtual trucking companies in Euro
            Truck Simulator 2 shut down. Instead of accepting that gap, I built a
            replacement for the community and got pulled deeper into product
            thinking, user needs, and shipping software people actually rely on.
          </SectionBodyText>
          <SectionBodyText>
            Since then, I have grown into an engineer who is comfortable owning
            the full stack: frontend experience, backend services, integrations,
            performance bottlenecks, deployment pipelines, and day-to-day
            production responsibility. My recent work has centered on e-commerce,
            internal operations software, and modernizing legacy systems without
            interrupting business-critical workflows.
          </SectionBodyText>
          <SectionBodyText>
            Outside of work, I still enjoy building smaller software experiments
            across web, backend, mobile, and desktop when a problem feels worth
            solving. I am especially interested in products that combine strong
            usability with deeper technical complexity behind the scenes.
          </SectionBodyText>
          <SectionBodyText>
            When I&apos;m not at the computer, I&apos;m usually traveling,
            spending time with friends, doing photography, or flying in
            Microsoft Flight Simulator. Aviation and travel are a big part of
            what keeps me curious and energized outside of engineering.
          </SectionBodyText>
        </div>
      </div>
    </section>
  );
}
