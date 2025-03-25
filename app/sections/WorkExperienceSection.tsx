"use client"

import { getFormattedTimeSpan } from "@/app/lib/date";
import { SkillChip } from "@/app/components/SkillChip";
import { OptionalLink } from "../components/OptionalLink";
import { FiExternalLink } from "react-icons/fi";

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
    position: 'Lead Full-Stack Engineer',
    subTitle: 'Full-Time',
    description: <>
      In my full-time role, I am responsible for leading and delivering high-impact projects, developing scalable applications,
      optimizing workflows, and leveraging emerging technologies to drive business success.
    </>,
    tasks: [
      'Led development of a mission-critical internal web app, ensuring scalability, security, and reliability',
      'Built and maintained a customer-facing website to streamline car accessory purchases, boosting engagement and sales',
      'Developing a modular e-commerce management platform, empowering businesses to manage catalogs, orders, and interactions efficiently',
      'Launched a generative AI tool on the Shopify App Store, helping merchants in creating blog content and enhance digital marketing',
      'Integrated data systems via REST APIs and FTP services, improving interoperability and data-driven decision-making',
      'Enhanced front-end and back-end features across multiple frameworks, optimizing performance and user experience',
      'Refactored legacy codebases for better maintainability, performance, and scalability',
      'Optimized CI/CD pipelines, accelerating release cycles and improving deployment efficiency'
    ],
    skills: [
      'React (Next.js)',
      'Node.js (Nest.js)',
      'Vue.js',
      'TypeScript',
      'Shopify & Shopify Hydrogen',
      'PHP (Laravel)',
      'Docker',
      'TailwindCSS',
    ],
    companyLink: 'https://www.elektrohub.de',
    company: 'Elektrohub'
  },
  {
    start: new Date(2022, 4),
    end: new Date(2024, 0),
    position: 'Application Developer',
    subTitle: 'Apprenticeship',
    description: <>
      During my apprenticeship, I undertook the following responsibilities:
    </>,
    tasks: [
      'Creation of several desktop applications (text editor with IntelliSense features, calculator, demo app of a web content renderer with additional optimizations)',
      'Complete revision of the user interface and logic of certain program areas',
      'Performance optimization for database queries',
      'Maintenance of the software'
    ],
    skills: [
      'C#',
      'WPF',
      '.NET'
    ],
    companyLink: 'https://www.nistech.de',
    company: 'Nistech'
  },
  {
    start: new Date(2019, 2),
    end: new Date(2019, 2),
    position: 'Embedded Software Developer',
    subTitle: 'Internship',
    description: <>
      During my internship, I focused on the following:
    </>,
    tasks: [
      'Development of microcontroller software',
      'Reading & processing real-time sensor data'
    ],
    skills: [
      'Embedded Systems'
    ],
    companyLink: 'https://www.siemensgamesa.com/global/en/home.html',
    company: 'Siemens Gamesa Renewable Energy, S.A.U'
  }
]

export function WorkExperienceSection() {
  return (
    <section className="py-16" id="experience">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-medium text-center mb-8">
          Professional Experience
        </h2>

        <div className="grid grid-cols-1 gap-8">
          {WORK_EXPERIENCE_DATA.map((item, pos) => <WorkExperienceItem key={pos} item={item} />)}
        </div>
      </div>
    </section>
  )
}

function WorkExperienceItem({ item }: { item: WorkExperience }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-8 gap-4">
      <div className="hidden sm:block sm:col-span-2">
        <p className="text-gray-400 mt-1 text-left">
          {getFormattedTimeSpan(item.start, item.end)}
        </p>
      </div>
      <div className="col-span-1 sm:col-span-6">
        <OptionalLink href={item.companyLink}>
          <h3 className="text-xl font-medium flex items-center">
            {item.position} @ {item.company}
            {item.companyLink && <FiExternalLink className="ml-1 mb-0.5 inline-block h-auto w-4" />}
          </h3>
        </OptionalLink>
        <p className="text-gray-400 mb-2 hidden sm:block">
          {item.subTitle}
        </p>
        <p className="text-gray-500 mb-2 sm:hidden">
          {item.subTitle} — <span className="whitespace-nowrap">{getFormattedTimeSpan(item.start, item.end)}</span>
        </p>
        <div className="text-gray-300">{item.description}</div>
        <ul className="pl-5 my-2 list-disc">
          {item.tasks.map((task, pos) => <li key={pos} className="text-gray-300">{task}</li>)}
        </ul>
        <div className="flex flex-wrap gap-2 mt-3">
          {item.skills.map((skill, pos) => <SkillChip key={pos} variant="work" skill={skill} />)}
        </div>
      </div>
    </div>
  );
}
