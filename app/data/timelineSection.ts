export type MilestoneKind = "experience" | "project" | "certificate";
export type MilestoneEmphasis = "primary" | "secondary";

export interface CareerImpact {
  label: string;
  value: string;
}

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
  impact?: readonly CareerImpact[];
  skills?: readonly string[];
  tasks?: readonly string[];
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
    "Professional roles, independent products, and credentials—from embedded systems and desktop software to full-stack product ownership and optimization.",
} as const;

const careerMilestones: CareerMilestone[] = [
  {
    id: "independent-products",
    kind: "experience",
    title: "Independent Product Engineer",
    organization: "ShiftIQ · RosterSpec",
    start: new Date(2025, 11, 1),
    subTitle: "Product Engineering & Optimization",
    summary:
      "ShiftIQ and the solver work that became RosterSpec began together. Working directly with a care-service manager, I built ShiftIQ into a post-MVP workforce scheduling product close to pilot readiness. Its reusable scheduling core now continues as RosterSpec, available publicly as an open-source project.",
    impact: [
      { label: "Product stage", value: "Post-MVP" },
      { label: "Domain validation", value: "Care-service manager" },
      { label: "Planning workflow", value: "Hours → minutes" },
      { label: "Current work", value: "Open source" },
    ],
    routeLabel: "Independent Product Track",
    emphasis: "primary",
  },
  {
    id: "elektrohub",
    kind: "experience",
    title: "Sole Full-Stack Engineer, E-Commerce & Operations",
    organization: "Elektrohub",
    link: "https://www.elektrohub.de",
    start: new Date(2024, 1, 1),
    end: new Date(2026, 0, 9),
    subTitle: "Full-Time",
    summary:
      "As Elektrohub's sole engineer, I rebuilt and operated a business-critical e-commerce and operations platform, owning product discovery, architecture, integrations, delivery, and production reliability end to end.",
    impact: [
      { label: "Role scope", value: "Sole engineer" },
      { label: "Production", value: "10,000+ orders" },
      { label: "Performance", value: "~80% faster" },
      { label: "Largest gain", value: "10+ min → seconds" },
    ],
    tasks: [
      "Rebuilt the core Laravel and Vue.js platform with NestJS, Next.js, TypeScript, and PostgreSQL to improve maintainability, observability, testing, and future extensibility",
      "Designed a modular connector architecture for four external integrations—Galaxus, JTL Wawi, JTL Fulfillment Network, and Shopify—plus the company's custom B2B commerce platform",
      "Reworked the B2B platform used by more than 20 users into a faster, more responsive React experience focused on search and efficient ordering workflows",
      "Improved important workflows and database operations by approximately 80% on average, with the largest cases falling from more than ten minutes to seconds",
      "Supported reliable processing of more than 10,000 orders through platform improvements, analytics dashboards, automated testing, and operational ownership",
      "Owned infrastructure and production operations across Docker, GitHub Actions, DigitalOcean, Vercel, PostgreSQL, Sentry, backups, releases, and incident response",
      "Gathered requirements directly from employees, management, and B2B customers, then prioritized work by user value, business impact, complexity, and effort",
      "Built an internal LLM-assisted tool for drafting Shopify blog content and shipped adjacent client work using Symfony, PHP, and Vue.js",
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
      "During an accelerated 2.5-year apprenticeship, I contributed to production desktop software, modernized legacy C# and WPF areas, and completed an IHK final project focused on maintainable data access and responsive UX.",
    impact: [
      { label: "Program", value: "3 years → 2.5" },
      { label: "IHK result", value: "83 points · Good" },
      { label: "Final project", value: "62 hours" },
      { label: "Query work", value: "5 queries → 1" },
    ],
    tasks: [
      "Modernized established areas of the Qualli.life desktop product using C#, .NET Framework, WPF, XAML, MVVM, Entity Framework, and relational databases",
      "Refactored and migrated application areas from Visual Basic to C#, improved user interfaces, investigated production issues, tested changes, and shipped functionality used by customers",
      "Built an IntelliSense-like autocomplete and syntax-highlighting experience for domain-specific placeholders in document and print templates",
      "Worked on a separate medical data module and contributed to database-backed application logic in a mature production codebase",
      "Redesigned the foundation of the contact module for my IHK final project, including asynchronous loading, permissions, printing, multi-user scenarios, and centralized data access",
      "Reduced one final-project database operation from five queries to one while improving separation of responsibilities and avoiding unnecessary writes",
    ],
    skills: ["C#", "WPF", ".NET"],
    routeLabel: "Systems Leg",
    emphasis: "primary",
  },
  {
    id: "senvion",
    kind: "experience",
    title: "Embedded Software Developer",
    organization: "Senvion Deutschland",
    start: new Date(2019, 2, 1),
    end: new Date(2019, 2, 1),
    subTitle: "Internship",
    summary:
      "During this engineering internship, I developed microcontroller software, controlled motors, and processed sensor data, gaining an early foundation in hardware-adjacent engineering. The business later became part of Siemens Gamesa.",
    tasks: [
      "Development of microcontroller software",
      "Motor control and sensor-data processing",
    ],
    skills: ["Embedded Systems"],
    routeLabel: "First Departure",
    emphasis: "primary",
  },
  {
    id: "shiftiq",
    kind: "project",
    title: "ShiftIQ — Intelligent Workforce Scheduling Platform",
    start: new Date(2025, 11, 1),
    end: new Date(2026, 3, 30),
    subTitle: "Workforce Scheduling Product",
    summary:
      "Built around a real care-service scheduling process, ShiftIQ models contracts, absences, vacations, employee preferences, staffing requirements, and configurable hard and soft constraints. Its Python, FastAPI, and OR-Tools solver generates complete candidate schedules in minutes, replacing hours of manual construction with a review-and-adjustment workflow. The product reached post-MVP and near-pilot readiness before rollout was paused because replacing the intended customer's contracted software was not commercially viable.",
    tasks: [
      "Translated a care-service manager's real planning process into product requirements and human-centered scheduling workflows",
      "Built employee, contract, absence, vacation, preference, staffing, notification, printing, and schedule review capabilities",
      "Implemented a dedicated Python, FastAPI, and OR-Tools solver for configurable operational constraints and employee preferences",
      "Reached post-MVP and near-pilot readiness before commercial validation revealed that the intended customer's existing vendor contract made switching impractical",
    ],
    skills: ["Next.js", "NestJS", "PostgreSQL", "Python", "FastAPI", "OR-Tools"],
    routeLabel: "Product Build",
    emphasis: "primary",
  },
  {
    id: "rosterspec",
    kind: "project",
    title: "RosterSpec — Open-Source Scheduling Solver",
    link: "https://github.com/joschiservice/RosterSpec",
    start: new Date(2025, 10, 1),
    subTitle: "Open-Source Optimization System",
    summary:
      "RosterSpec began alongside ShiftIQ as its reusable solver foundation. It is now publicly available on GitHub as an open-source scheduling system for expressing domain requirements as explicit, testable hard and soft constraints, making the constraint-based approach available for others to inspect, use, and extend.",
    tasks: [
      "Developed the reusable solver foundation in parallel with ShiftIQ rather than treating optimization as product-specific application logic",
      "Generalized scheduling rules into structured, testable constraints suitable for reuse across workforce-planning scenarios",
      "Added an experimental LLM evaluation harness for exploring language models within structured and verifiable engineering workflows",
      "Published RosterSpec as an open-source project on GitHub",
    ],
    skills: ["Python", "OR-Tools", "Constraint Programming", "LLM Evaluation"],
    routeLabel: "Open-Source Release",
    emphasis: "primary",
  },
  {
    id: "ihk-qualification",
    kind: "certificate",
    title: "German IHK Qualification — Software Development",
    start: new Date(2024, 0, 1),
    end: new Date(2024, 0, 1),
    subTitle: "Recognized Vocational Qualification",
    summary:
      "Completed the standard three-year Fachinformatiker für Anwendungsentwicklung apprenticeship in 2.5 years with 83 points (Good); the qualification corresponds to German and European Qualifications Framework Level 4.",
    skills: ["EQF Level 4", "83 points · Good"],
    routeLabel: "Qualification Milestone",
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
  shiftiq: "independent-products",
  rosterspec: "independent-products",
  sparky: "elektrohub",
  ng001: "elektrohub",
  arcticwolf: "nistech",
  "ihk-qualification": "nistech",
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
  if (!a.end && b.end) return -1;
  if (a.end && !b.end) return 1;

  return getMilestoneSortTime(b) - getMilestoneSortTime(a);
}

function getMilestoneSortTime(milestone: CareerMilestone) {
  return (milestone.end ?? milestone.start).getTime();
}
