export type MilestoneKind = "experience" | "project" | "certificate";
export type MilestoneEmphasis = "primary" | "secondary";

export interface CareerMilestone {
  id: string;
  kind: MilestoneKind;
  title: string;
  organization?: string;
  link?: string;
  start: Date;
  end?: Date;
  subTitle: string;
  summary: string;
  skills?: string[];
  tasks?: string[];
  routeLabel: string;
  emphasis: MilestoneEmphasis;
}

export interface ExperienceStop {
  experience: CareerMilestone;
  attachedMilestones: CareerMilestone[];
}

export const timelineSectionContent = {
  title: "Career Timeline",
  description:
    "From embedded systems to desktop software to full-stack product ownership, this is the route so far, including the side builds and credentials that shaped it.",
} as const;

const careerMilestones: CareerMilestone[] = [
  {
    id: "elektrohub",
    kind: "experience",
    title: "Sole Full-Stack Engineer, E-Commerce & Operations",
    organization: "Elektrohub",
    link: "https://www.elektrohub.de",
    start: new Date(2024, 2, 1),
    end: new Date(2026, 1, 9),
    subTitle: "Full-Time",
    summary:
      "As Elektrohub's sole engineer, I owned development of a business-critical e-commerce and operations platform spanning order, catalog, customer, and internal workflow systems.",
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
    routeLabel: "Full-Stack Cruise",
    emphasis: "primary",
  },
  {
    id: "nistech",
    kind: "experience",
    title: "Software Development Apprentice",
    organization: "Nistech",
    link: "https://www.nistech.de",
    start: new Date(2021, 7, 1),
    end: new Date(2024, 0, 1),
    subTitle: "Apprenticeship",
    summary:
      "I took on real software engineering responsibility early and contributed well beyond a typical apprenticeship scope, working on production desktop software used by customers.",
    tasks: [
      "Improved core UI and application logic in a C# .NET WPF software system through larger refactors and feature delivery",
      "Optimized database queries, investigated production issues, tested changes thoroughly, and shipped new functionality used by customers",
      "Added new product capabilities, including a medical data module and an IntelliSense-related feature",
      "Built supporting desktop applications and prototypes, including a text editor with IntelliSense features, a calculator, and a demo web content renderer with additional optimizations",
      "Maintained and evolved existing software while learning how to deliver changes safely in a production environment",
    ],
    skills: ["C#", "WPF", ".NET"],
    routeLabel: "Systems Leg",
    emphasis: "primary",
  },
  {
    id: "siemens-gamesa",
    kind: "experience",
    title: "Embedded Software Developer",
    organization: "Siemens Gamesa Renewable Energy, S.A.U",
    link: "https://www.siemensgamesa.com/global/en/home.html",
    start: new Date(2019, 2, 1),
    end: new Date(2019, 2, 1),
    subTitle: "Internship",
    summary:
      "During my internship, I worked close to hardware and real-time data handling, which gave me an early foundation in reliability-focused software development.",
    tasks: [
      "Development of microcontroller software",
      "Reading & processing real-time sensor data",
    ],
    skills: ["Embedded Systems"],
    routeLabel: "First Departure",
    emphasis: "primary",
  },
  {
    id: "shiftiq",
    kind: "project",
    title: "ShiftIQ - Intelligent Shift Management Platform",
    start: new Date(2026, 1, 1),
    subTitle: "Product Engineering",
    summary:
      "I am building ShiftIQ as an intelligent shift management platform that combines a recruiter- and operator-friendly product experience with deeper scheduling logic in the backend.",
    skills: ["Next.js", "NestJS", "TypeScript", "Python", "OR-Tools"],
    routeLabel: "Next Build",
    emphasis: "secondary",
  },
  {
    id: "sparky",
    kind: "project",
    title: "Sparky - Cloud Vehicle Management Platform for Kia & Hyundai EVs",
    link: "https://www.nextgendrive.net/products/sparky",
    start: new Date(2022, 10),
    end: new Date(2025, 4),
    subTitle: "Product Development",
    summary:
      "I built Sparky to create a better connected-car experience, adding Siri support, widgets, Live Activities, richer drive data, and more flexible climate scheduling.",
    skills: ["SwiftUI", "XCode", "Next.js", "Vercel"],
    routeLabel: "Product Excursion",
    emphasis: "secondary",
  },
  {
    id: "ng001",
    kind: "project",
    title: "NG001 - My improved Kia e-Soul",
    link: "https://www.nextgendrive.net/products/ng-one",
    start: new Date(2023, 7),
    end: new Date(2025, 4),
    subTitle: "Software & Hardware Engineering",
    summary:
      "Alongside the mobile companion app, I started improving the in-car experience itself through a custom ambient lighting system with smart integration into the vehicle.",
    skills: ["Arduino", "C++", "CAD", "Electronics"],
    routeLabel: "Hardware Detour",
    emphasis: "secondary",
  },
  {
    id: "arcticwolf",
    kind: "project",
    title: "ArcticWolf - Reviving old Fortnite builds & live-data logging",
    link: "https://github.com/joschiservice/ArcticWolf",
    start: new Date(2021, 11),
    end: new Date(2022, 5),
    subTitle: "Game Modding",
    summary:
      "I adapted an existing mod to revive a specific older Fortnite build and extended it with live event logging to surface interesting in-game changes.",
    skills: ["C++", "UnrealEngine", "C#"],
    routeLabel: "Reverse-Engineering Stop",
    emphasis: "secondary",
  },
  {
    id: "ibm-full-stack-certificate",
    kind: "certificate",
    title: "IBM Full Stack Software Developer Specialization",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/9X2DHARTH6D2",
    start: new Date(2023, 4),
    end: new Date(2023, 4),
    subTitle: "Professional Certificate",
    summary:
      "Credential covering full-stack development, cloud foundations, containers, deployment, and modern application architecture.",
    skills: [
      "Full-Stack Development",
      "Cloud Computing",
      "Serverless Computing",
      "CI/CD",
      "Microservices",
      "React.js",
      "Python",
      "Django",
      "GitHub",
      "Docker",
      "Kubernetes",
      "Databases",
    ],
    routeLabel: "Credential Stamp",
    emphasis: "secondary",
  },
];

const attachedMilestones: Record<string, string> = {
  shiftiq: "elektrohub",
  sparky: "elektrohub",
  ng001: "elektrohub",
  arcticwolf: "nistech",
  "ibm-full-stack-certificate": "nistech",
};

const experiences = careerMilestones
  .filter((milestone) => milestone.kind === "experience")
  .sort(sortNewestFirst);

const secondaryMilestones = careerMilestones
  .filter((milestone) => milestone.kind !== "experience")
  .sort(sortNewestFirst);

const attachedMilestonesByExperience = secondaryMilestones.reduce<
  Record<string, CareerMilestone[]>
>((grouped, milestone) => {
  const experienceId = attachedMilestones[milestone.id];
  if (!experienceId) return grouped;

  grouped[experienceId] ??= [];
  grouped[experienceId].push(milestone);
  return grouped;
}, {});

export const EXPERIENCE_STOPS: ExperienceStop[] = experiences.map((experience) => ({
  experience,
  attachedMilestones: attachedMilestonesByExperience[experience.id] ?? [],
}));

export function getMilestoneBadgeLabel(kind: MilestoneKind) {
  if (kind === "project") return "Project";
  if (kind === "certificate") return "Credential";
  return "Experience";
}

function sortNewestFirst(a: CareerMilestone, b: CareerMilestone) {
  return getMilestoneSortTime(b) - getMilestoneSortTime(a);
}

function getMilestoneSortTime(milestone: CareerMilestone) {
  return (milestone.end ?? milestone.start).getTime();
}
