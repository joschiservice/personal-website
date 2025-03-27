"use client";

import { SectionHeading } from "@/app/components/SectionHeading";
import { GlassCard } from "../components/cards/GlassCard";
import { CardSecondaryInfo } from "../components/cards/CardSecondaryInfo";
import { CardTitle } from "../components/cards/CardTitle";
import { CardBodyText } from "../components/cards/CardBodyText";
import { CardChipsList } from "../components/cards/CardChipsList";
import { FaRocket } from "react-icons/fa";

interface Project {
  title: string;
  type: string;
  start: Date;
  end?: Date;
  skills: string[];
  link: string;
  description: string;
}

const PROJECTS: Project[] = [
  {
    title: "Sparky - Cloud Vehicle Management Platform for Kia & Hyundai EVs",
    type: "Software Development",
    start: new Date(2022, 10),
    skills: ["SwiftUI", "XCode", "Next.js", "Vercel"],
    link: "https://www.nextgendrive.net/products/sparky",
    description:
      "I, as a Kia e-Soul owner, found myself frustrated with the limited features in the official KiaConnect app. So I decided to start making my own native iOS app with various enhancements like support for the Siri voice assistant, home screen widgets, live activities, dark mode, enhanced drive data and support for more than 2 climate control schedules. The API was built using Next.js and was deployed on Vercel. The native iOS app was built using SwiftUI.",
  },
  {
    title: "NG001 - My improved Kia e-Soul",
    type: "Software & Hardware Development",
    start: new Date(2023, 7),
    skills: ["Arduino", "C++", "CAD", "Electronics"],
    link: "https://www.nextgendrive.net/products/ng-one",
    description:
      "Besides building a new mobile companion app for my car, I started enhancing the overall in-car experience by installing a completely custom ambient lighting system with a seamless & smart integration. The ambient light system should be visible at sunny days, but shouldn't distract the driver at nights and in dark tunnels, therefore I integrated a Arduino microcontroller to adjust the lights based on the data from the vehicle.",
  },
  {
    title: "ArcticWolf - Reviving old Fortnite builds & live-data logging",
    type: "Game Modding",
    start: new Date(2021, 11),
    end: new Date(2022, 5),
    skills: ["C++", "UnrealEngine", "C#"],
    link: "https://github.com/joschiservice/ArcticWolf",
    description:
      "When I was still an active Fortnite player, I wanted to dive into old versions/chapters of the game again. At that time, it was impossible, because that was not intended by the game developer. Therefore, I took an already existing mod and modified it to make it work for a specific build of the game and built a logger for live data about in-game events to detect interesting changes.",
  },
];

export function ProjectsSection() {
  return (
    <section className="py-16 sm:py-20 md:py-28" id="projects">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <SectionHeading
          title="Projects"
          icon={FaRocket}
          gradient="from-purple-500/40 to-purple-300/40"
        />

        <div className="grid grid-cols-1 gap-12">
          {PROJECTS.map((project, pos) => (
            <ProjectItem key={pos} item={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectItem({ item }: { item: Project }) {
  return (
    <GlassCard accentColor="purple">
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
        <CardSecondaryInfo
          start={item.start}
          end={item.end}
          subTitle={item.type}
        />

        <div className="flex-1">
          <CardTitle
            title={item.title}
            link={item.link}
            color="purple"
          />

          <CardBodyText className="mt-4 mb-6">{item.description}</CardBodyText>

          <CardChipsList items={item.skills} color="purple" />
        </div>
      </div>
    </GlassCard>
  );
}
