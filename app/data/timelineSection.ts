type MilestoneKind = "experience" | "project" | "certificate";
type MilestoneEmphasis = "primary" | "secondary";

interface CareerImpact {
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
  /** Heading for this stop's attached milestones, in place of the default "Alongside". */
  attachedLabel?: string;
  /** Keeps the heading for screen readers only, when the attached items speak for themselves. */
  hideAttachedLabel?: boolean;
  emphasis: MilestoneEmphasis;
}

export interface ExperienceStop {
  experience: CareerMilestone;
  attachedMilestones: CareerMilestone[];
}

export const timelineSectionContent = {
  title: "Where I’ve worked",
  description:
    "Jobs, side projects and a couple of certificates. I started out with microcontrollers and ended up building full-stack web apps.",
} as const;

const careerMilestones: CareerMilestone[] = [
  {
    id: "independent-products",
    kind: "experience",
    title: "Independent Software Engineer",
    organization: "Personal Projects · Germany & Japan",
    start: new Date(2025, 11, 1),
    end: new Date(2026, 10, 30),
    subTitle: "Independent",
    summary:
      "After Elektrohub, I took time to build my own products and spent four months in Japan studying Japanese.\n\nI worked on two very different problems: scheduling shifts for care teams and coordinating day-to-day e-commerce operations. I built both end to end, from architecture and backend systems to interfaces, automation and deployment.",
    attachedLabel: "Selected projects",
    hideAttachedLabel: true,
    emphasis: "primary",
  },
  {
    id: "elektrohub",
    kind: "experience",
    title: "Full-stack engineer",
    organization: "Elektrohub",
    link: "https://www.elektrohub.de",
    start: new Date(2024, 1, 1),
    end: new Date(2026, 0, 9),
    subTitle: "Full-time",
    summary:
      "As Elektrohub’s only engineer, I rebuilt the platform that runs their online shop and day-to-day operations, and looked after everything around it: working out what people needed, architecture, integrations, releases, and keeping production healthy.",
    impact: [
      { label: "Systems connected", value: "4 + own B2B shop" },
      { label: "Average query speed-up", value: "~80%" },
      { label: "Slowest job", value: "10+ min → <10 sec" },
    ],
    tasks: [
      "Rebuilt the core platform, moving from Laravel and Vue.js to NestJS, Next.js, TypeScript and PostgreSQL, because the old code had become hard to maintain and production problems were often noticed too late",
      "Designed a connector setup for four outside systems (Galaxus, JTL Wawi, JTL Fulfillment Network and Shopify) plus the company’s own B2B shop",
      "Rebuilt the B2B shop as a much more responsive React app, so customers could search and order faster",
      "Made database queries across the platform about 80% faster on average, including product and variant search with inventory data",
      "Built analytics dashboards and automated tests, and handled day-to-day operations",
      "Ran infrastructure and production: Docker, GitHub Actions, DigitalOcean, Vercel, PostgreSQL, Sentry, backups, releases and the occasional incident",
      "Talked directly with employees, management and B2B customers to decide what to build next",
      "Built an internal LLM tool for drafting Shopify blog posts, and did some client work with Symfony, PHP and Vue.js",
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
    emphasis: "primary",
  },
  {
    id: "nistech",
    kind: "experience",
    title: "Software development apprentice",
    organization: "Nistech",
    link: "https://www.nistech.de",
    start: new Date(2021, 7, 1),
    end: new Date(2024, 0, 1),
    subTitle: "Apprenticeship",
    summary:
      "I learned the craft on Qualli.life, a long-running C# desktop product. I modernized older code, fixed production bugs and shipped new features. For my IHK final project, I rebuilt the foundation of the contacts module with cleaner data access and a more responsive UI.",
    impact: [
      { label: "Duration", value: "3 years → 2.5 years" },
      { label: "IHK result", value: "83 points (Good)" },
    ],
    tasks: [
      "Modernized parts of the app with C#, .NET Framework, WPF, XAML, MVVM and Entity Framework",
      "Migrated Visual Basic code to C# and improved the UI along the way",
      "Built IntelliSense-style autocomplete and syntax highlighting for placeholders in document and print templates",
      "Worked on a medical data module and on database logic in a large, mature codebase",
      "Redesigned the contacts module for my final project, covering async loading, permissions, printing, multi-user use and centralized data access",
      "Streamlined database operations to run fewer queries and avoid unnecessary writes",
    ],
    skills: ["C#", "WPF", ".NET"],
    emphasis: "primary",
  },
  {
    id: "senvion",
    kind: "experience",
    title: "Embedded software developer",
    organization: "Senvion Deutschland",
    start: new Date(2019, 2, 1),
    end: new Date(2019, 2, 1),
    subTitle: "Internship",
    summary:
      "My first taste of real engineering. I wrote microcontroller software, drove motors and processed sensor data. The company later became part of Siemens Gamesa.",
    tasks: [
      "Wrote software for microcontrollers",
      "Controlled motors and processed sensor data",
    ],
    skills: ["Embedded Systems"],
    emphasis: "primary",
  },
  {
    id: "shiftiq",
    kind: "project",
    title: "ShiftIQ",
    start: new Date(2025, 11, 1),
    end: new Date(2026, 3, 30),
    subTitle: "Workforce scheduling",
    summary:
      "Developed a scheduling platform for care services, using constraint optimization to account for staff availability, contracts, preferences and operational requirements. It reached near-pilot readiness with a care service that planned to adopt it, but they later had to back out because of existing vendor commitments.",
    tasks: [
      "Turned a care-service manager’s actual planning process into requirements and workflows that match how people plan shifts",
      "Built employees, contracts, absences, vacations, preferences, staffing, notifications, printing and schedule review",
      "Wrote a separate Python, FastAPI and OR-Tools solver for configurable rules and staff preferences",
      "Learned that a good product isn’t enough when the customer is locked into an existing vendor contract",
    ],
    skills: ["Next.js", "NestJS", "PostgreSQL", "Python", "FastAPI", "OR-Tools"],
    emphasis: "primary",
  },
  {
    id: "luma",
    kind: "project",
    title: "Luma",
    start: new Date(2026, 8, 1),
    end: new Date(2026, 10, 30),
    subTitle: "Technical project, not launched",
    summary:
      "A technical challenge I set myself: a unified workspace for e-commerce operations, connecting orders, inventory, fulfillment and purchasing through configurable workflows. I wanted to see how customizable and secure I could make it. It hasn’t launched and has no customers.",
    tasks: [
      "Designed and built it as a TypeScript modular monolith with a React web app, API, background workers and PostgreSQL",
      "Built connectors for Shopify, JTL, Cin7, Starshipit and Gmail, turning their data into one shared model of orders, stock, fulfillment and returns",
      "Built a workflow engine on Temporal, with versioned workflows and sandboxed TypeScript steps running in WebAssembly",
      "Made every change to an outside system pass policy checks and approvals, with an audit trail and a separate check that the change actually happened",
      "Isolated tenant data with PostgreSQL row-level security and tenant-scoped data access",
      "Built a simulator of the Shopify and JTL systems, so complete flows could be tested without real accounts",
      "Set up the delivery side: AWS infrastructure as code, CI quality gates, end-to-end and browser tests, and load testing",
    ],
    skills: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    emphasis: "primary",
  },
  {
    id: "ihk-qualification",
    kind: "certificate",
    title: "IHK qualification in software development",
    start: new Date(2024, 0, 1),
    end: new Date(2024, 0, 1),
    subTitle: "German vocational qualification",
    summary:
      "The official German qualification as a Fachinformatiker für Anwendungsentwicklung (application developer). I finished in two and a half years instead of three, with 83 points (Good). It sits at level 4 of the German and European qualifications frameworks.",
    skills: ["83 points (Good)"],
    emphasis: "secondary",
  },
  {
    id: "sparky",
    kind: "project",
    title: "Sparky: a better app for Kia & Hyundai EVs",
    link: "https://www.nextgendrive.net/products/sparky",
    start: new Date(2022, 10),
    end: new Date(2025, 4),
    subTitle: "Side project",
    summary:
      "I wanted more from my car’s app, so I built Sparky. It added Siri support, widgets, Live Activities, more detailed drive data and more flexible climate scheduling.",
    skills: ["SwiftUI", "XCode", "Next.js", "Vercel"],
    emphasis: "secondary",
  },
  {
    id: "ng001",
    kind: "project",
    title: "NG001: my upgraded Kia e-Soul",
    link: "https://www.nextgendrive.net/products/ng-one",
    start: new Date(2023, 7),
    end: new Date(2025, 4),
    subTitle: "Software & hardware",
    summary:
      "Alongside the app, I started working on the car itself: a custom ambient lighting system that hooks into the vehicle.",
    skills: ["Arduino", "C++", "CAD", "Electronics"],
    emphasis: "secondary",
  },
  {
    id: "arcticwolf",
    kind: "project",
    title: "ArcticWolf: bringing old Fortnite builds back",
    link: "https://github.com/joschiservice/ArcticWolf",
    start: new Date(2021, 11),
    end: new Date(2022, 5),
    subTitle: "Game modding",
    summary:
      "I adapted an existing mod so one specific older Fortnite build would run again, then added live event logging to spot interesting changes in the game.",
    skills: ["C++", "UnrealEngine", "C#"],
    emphasis: "secondary",
  },
  {
    id: "ibm-full-stack-certificate",
    kind: "certificate",
    title: "IBM Full Stack Software Developer",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/9X2DHARTH6D2",
    start: new Date(2023, 4),
    end: new Date(2023, 4),
    subTitle: "Professional certificate",
    summary:
      "An online specialization covering full-stack development, cloud basics, containers, deployment and application architecture.",
    skills: [
      "Full-Stack Development",
      "Cloud Computing",
      "CI/CD",
      "React.js",
      "Python",
      "GitHub",
      "Docker",
      "Databases",
    ],
    emphasis: "secondary",
  },
];

const attachedMilestones: Record<string, string> = {
  shiftiq: "independent-products",
  luma: "independent-products",
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

function sortNewestFirst(a: CareerMilestone, b: CareerMilestone) {
  if (!a.end && b.end) return -1;
  if (a.end && !b.end) return 1;

  return getMilestoneSortTime(b) - getMilestoneSortTime(a);
}

function getMilestoneSortTime(milestone: CareerMilestone) {
  return (milestone.end ?? milestone.start).getTime();
}
