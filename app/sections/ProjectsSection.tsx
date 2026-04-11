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
  link?: string;
  description: string;
}

const PROJECTS: Project[] = [
  {
    title: "ShiftIQ - Intelligent Shift Management Platform",
    type: "Product Engineering",
    start: new Date(2026, 1, 1),
    skills: ["Next.js", "NestJS", "TypeScript", "Python", "OR-Tools"],
    description:
      "I am building ShiftIQ as an intelligent shift management platform that combines a recruiter- and operator-friendly product experience with deeper scheduling logic in the backend. The platform uses NestJS and Next.js for the core application and Python with OR-Tools for automated planning and coordination workflows.",
  },
  {
    title: "Sparky - Cloud Vehicle Management Platform for Kia & Hyundai EVs",
    type: "Product Development",
    start: new Date(2022, 10),
    end: new Date(2025, 4),
    skills: ["SwiftUI", "XCode", "Next.js", "Vercel"],
    link: "https://www.nextgendrive.net/products/sparky",
    description:
      "As a Kia e-Soul owner, I wanted a better connected-car experience than the official Kia Connect app offered, so I built my own product. Sparky adds capabilities such as Siri support, widgets, Live Activities, richer drive data, dark mode, and more flexible climate scheduling. The backend API runs on Next.js and Vercel, while the native iOS app is built with SwiftUI.",
  },
  {
    title: "NG001 - My improved Kia e-Soul",
    type: "Software & Hardware Engineering",
    start: new Date(2023, 7),
    end: new Date(2025, 4),
    skills: ["Arduino", "C++", "CAD", "Electronics"],
    link: "https://www.nextgendrive.net/products/ng-one",
    description:
      "Alongside the mobile companion app, I started improving the in-car experience itself through a fully custom ambient lighting system with smart integration into the vehicle. To keep the system visible in daylight without becoming distracting at night or in tunnels, I used an Arduino-based controller that adapts the lighting behavior based on vehicle data.",
  },
  {
    title: "ArcticWolf - Reviving old Fortnite builds & live-data logging",
    type: "Game Modding",
    start: new Date(2021, 11),
    end: new Date(2022, 5),
    skills: ["C++", "UnrealEngine", "C#"],
    link: "https://github.com/joschiservice/ArcticWolf",
    description:
      "I adapted an existing mod to revive a specific older Fortnite build and extended it with live event logging to surface interesting in-game changes. It was a strong exercise in working with unfamiliar constraints, reverse-engineering behavior, and building useful tooling around an existing codebase.",
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
