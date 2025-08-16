"use client";
import { SectionHeading } from "@/app/components/SectionHeading";
import { GlassCard } from "../components/cards/GlassCard";
import { CardSecondaryInfo } from "../components/cards/CardSecondaryInfo";
import { CardTitle } from "../components/cards/CardTitle";
import { CardBodyText } from "../components/cards/CardBodyText";
import { CardList } from "../components/cards/CardList";
import { CardChipsList } from "../components/cards/CardChipsList";
import { FaBriefcase } from "react-icons/fa";

import type { JSX } from "react";

interface WorkExperience {
  start: Date;
  end?: Date;
  position: string;
  subTitle: string;
  description: JSX.Element;
  tasks: string[];
  skills: string[];
  companyLink: string;
  company: string;
}

const WORK_EXPERIENCE_DATA: WorkExperience[] = [
  {
    start: new Date(2024, 1, 0),
    position: "Lead Full-Stack Engineer",
    subTitle: "Full-Time",
    description: (
      <>
        In my full-time role, I am responsible for leading and delivering
        high-impact projects, developing scalable applications, optimizing
        workflows, and leveraging emerging technologies to drive business
        success.
      </>
    ),
    tasks: [
      "Led development of a mission-critical internal web app, ensuring scalability, security, and reliability",
      "Built and maintained a customer-facing website to streamline car accessory purchases, boosting engagement and sales",
      "Developing a modular e-commerce management platform, empowering businesses to manage catalogs, orders, and interactions efficiently",
      "Launched a generative AI tool on the Shopify App Store, helping merchants in creating blog content and enhance digital marketing",
      "Integrated data systems via REST APIs and FTP services, improving interoperability and data-driven decision-making",
      "Enhanced front-end and back-end features across multiple frameworks, optimizing performance and user experience",
      "Refactored legacy codebases for better maintainability, performance, and scalability",
      "Optimized CI/CD pipelines, accelerating release cycles and improving deployment efficiency",
    ],
    skills: [
      "React (Next.js)",
      "Node.js (Nest.js)",
      "Vue.js",
      "TypeScript",
      "Shopify & Shopify Hydrogen",
      "PHP (Laravel)",
      "Docker",
      "TailwindCSS",
    ],
    companyLink: "https://www.elektrohub.de",
    company: "Elektrohub",
  },
  {
    start: new Date(2022, 4),
    end: new Date(2024, 0),
    position: "Application Developer",
    subTitle: "Apprenticeship",
    description: (
      <>During my apprenticeship, I undertook the following responsibilities:</>
    ),
    tasks: [
      "Creation of several desktop applications (text editor with IntelliSense features, calculator, demo app of a web content renderer with additional optimizations)",
      "Complete revision of the user interface and logic of certain program areas",
      "Performance optimization for database queries",
      "Maintenance of the software",
    ],
    skills: ["C#", "WPF", ".NET"],
    companyLink: "https://www.nistech.de",
    company: "Nistech",
  },
  {
    start: new Date(2019, 2),
    end: new Date(2019, 2),
    position: "Embedded Software Developer",
    subTitle: "Internship",
    description: <>During my internship, I focused on the following:</>,
    tasks: [
      "Development of microcontroller software",
      "Reading & processing real-time sensor data",
    ],
    skills: ["Embedded Systems"],
    companyLink: "https://www.siemensgamesa.com/global/en/home.html",
    company: "Siemens Gamesa Renewable Energy, S.A.U",
  },
];

export function WorkExperienceSection() {
  return (
    <section className="py-16 sm:py-20 md:py-28" id="experience">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <SectionHeading
          title="Professional Experience"
          icon={FaBriefcase}
          gradient="from-blue-500/40 to-blue-300/40"
        />

        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-[7px] top-6 bottom-0 w-px bg-gradient-to-b from-blue-500/30 via-blue-400/20 to-transparent hidden md:block"></div>

          <div className="space-y-16">
            {WORK_EXPERIENCE_DATA.map((item, pos) => (
              <WorkExperienceItem
                key={pos}
                item={item}
                isLast={pos === WORK_EXPERIENCE_DATA.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkExperienceItem({
  item,
  isLast,
}: {
  item: WorkExperience;
  isLast: boolean;
}) {
  return (
    <div className="group">
      <div className="flex items-start">
        {/* Timeline dot and connector */}
        <div className="hidden md:flex flex-col items-center mr-8 mt-2">
          <div className="relative">
            <div className="w-[14px] h-[14px] rounded-full bg-blue-500/80 z-10 relative group-hover:scale-110 transition-transform duration-300"></div>
            <div className="absolute -inset-1.5 bg-blue-500/20 rounded-full animate-pulse"></div>
          </div>
          <div className={`h-full ${isLast ? "hidden" : "block"}`}></div>
        </div>

        <GlassCard accentColor="blue">
          <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
            <CardSecondaryInfo
              start={item.start}
              end={item.end}
              subTitle={item.subTitle}
            />

            <div className="flex-1">
              <CardTitle
                title={item.position}
                link={item.companyLink}
                color="blue"
              />

              <p className="text-blue-200/80 mt-1 mb-6">@ {item.company}</p>

              <CardBodyText className="mb-5">{item.description}</CardBodyText>

              <CardList className="mb-8" items={item.tasks} />

              <CardChipsList items={item.skills} color="blue" />
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
