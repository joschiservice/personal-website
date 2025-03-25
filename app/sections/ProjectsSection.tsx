"use client"

import { getFormattedTimeSpan } from "@/app/lib/date";
import { SkillChip } from "@/app/components/SkillChip";
import { OptionalLink } from "@/app/components/OptionalLink";
import { FiExternalLink } from "react-icons/fi";

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
    skills: [
      "SwiftUI",
      "XCode",
      "Next.js",
      "Vercel"
    ],
    link: 'https://www.nextgendrive.net/products/sparky',
    description: "I, as a Kia e-Soul owner, found myself frustrated with the limited features in the official KiaConnect app. So I decided to start making my own native iOS app with various enhancements like support for the Siri voice assistant, home screen widgets, live activities, dark mode, enhanced drive data and support for more than 2 climate control schedules. The API was built using Next.js and was deployed on Vercel. The native iOS app was built using SwiftUI."
  },
  {
    title: "NG001 - My improved Kia e-Soul",
    type: "Software & Hardware Development",
    start: new Date(2023, 7),
    skills: [
      "Arduino",
      "C++",
      "CAD",
      "Electronics"
    ],
    link: 'https://www.nextgendrive.net/products/ng-one',
    description: "Besides building a new mobile companion app for my car, I started enhancing the overall in-car experience by installing a completely custom ambient lighting system with a seamless & smart integration. The ambient light system should be visible at sunny days, but shouldn't distract the driver at nights and in dark tunnels, therefore I integrated a Arduino microcontroller to adjust the lights based on the data from the vehicle."
  },
  {
    title: "ArcticWolf - Reviving old Fortnite builds & live-data logging",
    type: "Game Modification Development",
    start: new Date(2021, 11),
    end: new Date(2022, 5),
    skills: [
      "C++",
      "UnrealEngine",
      "C#"
    ],
    link: 'https://github.com/joschiservice/ArcticWolf',
    description: "When I was still an active Fortnite player, I wanted to dive into old versions/chapters of the game again. At that time, it was impossible, because that was not intended by the game developer. Therefore, I took an already existing mod and modified it to make it work for a specific build of the game and built a logger for live data about in-game events to detect interesting changes."
  }
]

export function ProjectsSection() {
  return (
    <section className="py-16" id="projects">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-medium text-center mb-8">
          Projects
        </h2>

        <div className="grid grid-cols-1 gap-8">
          {PROJECTS.map((project, pos) => <ProjectItem key={pos} item={project} />)}
        </div>
      </div>
    </section>
  )
}

function ProjectItem({ item }: { item: Project }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-8 gap-4">
      <div className="hidden sm:block sm:col-span-2">
        <p className="text-gray-400 mt-1 text-left">
          {getFormattedTimeSpan(item.start, item.end)}
        </p>
      </div>
      <div className="col-span-1 sm:col-span-6">
        <OptionalLink href={item.link}>
          <h3 className="text-xl font-medium flex items-center">
            {item.title}
            {item.link && <FiExternalLink className="ml-1 mb-0.5 inline-block h-auto w-4" />}
          </h3>
        </OptionalLink>
        <p className="text-gray-400 mb-2 hidden sm:block">
          {item.type}
        </p>
        <p className="text-gray-500 mb-2 sm:hidden">
          {item.type} — <span className="whitespace-nowrap">{getFormattedTimeSpan(item.start, item.end)}</span>
        </p>
        <p className="text-gray-300">{item.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {item.skills.map((skill, pos) => <SkillChip key={pos} variant="project" skill={skill} />)}
        </div>
      </div>
    </div>
  );
}