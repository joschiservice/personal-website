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
    start: new Date(2024, 2, 1),
    end: new Date(2026, 1, 9),
    position: "Sole Full-Stack Engineer, E-Commerce & Operations",
    subTitle: "Full-Time",
    description: (
      <>
        As Elektrohub&apos;s sole engineer, I owned development of a
        business-critical e-commerce and operations platform spanning order,
        catalog, customer, and internal workflow systems. The role combined
        product delivery, modernization, integrations, and production ownership.
      </>
    ),
    tasks: [
      "Modernized major platform areas from Laravel and PHP to NestJS and TypeScript, creating a more maintainable and scalable foundation for future work",
      "Built and maintained five external integrations, primarily REST-based, including Shopify GraphQL and Hydrogen flows plus FTP-based order exchange with Galaxus",
      "Reworked the internal B2B platform used by around 20 users into a significantly faster and more responsive React experience",
      "Improved critical query performance from 10+ minutes to seconds, often reducing execution times by roughly 80%",
      "Supported reliable processing of 10,000+ orders through platform improvements, analytics dashboards, automated testing, and operational ownership",
      "Built and maintained customer-facing commerce experiences and a modular internal platform for catalogs, orders, and customer workflows",
      "Shipped adjacent external work using Symfony PHP and Vue.js while continuing to improve legacy and modern codebases in parallel",
      "Owned production infrastructure across Docker, CI/CD, DigitalOcean, Vercel, Sentry, backups, and release processes",
      "Launched a generative AI Shopify app to help merchants create blog content and strengthen digital marketing workflows",
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
    start: new Date(2021, 7, 1),
    end: new Date(2024, 0, 1),
    position: "Software Development Apprentice",
    subTitle: "Apprenticeship",
    description: (
      <>
        I took on real software engineering responsibility early and contributed
        well beyond a typical apprenticeship scope, working on production desktop
        software used by customers.
      </>
    ),
    tasks: [
      "Improved core UI and application logic in a C# .NET WPF software system through larger refactors and feature delivery",
      "Optimized database queries, investigated production issues, tested changes thoroughly, and shipped new functionality used by customers",
      "Added new product capabilities, including a medical data module and an IntelliSense-related feature",
      "Built supporting desktop applications and prototypes, including a text editor with IntelliSense features, a calculator, and a demo web content renderer with additional optimizations",
      "Maintained and evolved existing software while learning how to deliver changes safely in a production environment",
    ],
    skills: ["C#", "WPF", ".NET"],
    companyLink: "https://www.nistech.de",
    company: "Nistech",
  },
  {
    start: new Date(2019, 2, 1),
    end: new Date(2019, 2, 1),
    position: "Embedded Software Developer",
    subTitle: "Internship",
    description: (
      <>
        During my internship, I worked close to hardware and real-time data
        handling, which gave me an early foundation in reliability-focused
        software development.
      </>
    ),
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
