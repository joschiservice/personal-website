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
            Back in the days when I was 15 years old and still went to school, I
            was already very passionate about software engineering. As one of my
            favorite tools for collaborating with others in virtual trucking
            companies for the game &apos;Euro Truck Simulator 2&apos; decided to
            shut down its operations, I decided to build a replacement
            application for everyone who still wants to continue using such a
            tool.
          </SectionBodyText>
          <SectionBodyText>
            Currently, I am primarily working on full-stack web, iOS and C# WPF
            applications. In my free time, I sometimes work on small casual
            projects, but primarily on{" "}
            <TextLink
              href="https://www.nextgendrive.net/products/sparky"
              text="Sparky"
            />
            , a companion mobile app for Kia & Hyundai drivers.
          </SectionBodyText>
          <SectionBodyText>
            When I&apos;m not at the computer, I&apos;m usually traveling
            around, working on my own electric vehicle (a{" "}
            <TextLink
              text="Kia e-Soul SK3"
              href="https://www.nextgendrive.net/products/ng-one"
            />
            ), hanging out with friends, doing photography or playing around in
            virtual reality.
          </SectionBodyText>
        </div>
      </div>
    </section>
  );
}
