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
  /** An open invitation shown with a contact link, for work that is still looking for people. */
  invitation?: string;
  emphasis: MilestoneEmphasis;
}

export interface ExperienceStop {
  experience: CareerMilestone;
  attachedMilestones: CareerMilestone[];
}

export const timelineSectionContent = {
  title: "Where I’ve worked",
  description:
    "Jobs, side projects and a couple of certificates, newest first. I started out with microcontrollers and ended up building full-stack web apps.",
} as const;

const careerMilestones: CareerMilestone[] = [
  {
    id: "auren-labs",
    kind: "experience",
    title: "Founder & Software Engineer",
    organization: "Auren Labs",
    link: "https://www.auren.systems/",
    start: new Date(2026, 8, 1),
    subTitle: "Founder",
    summary:
      "I started Auren Labs to build Luma, one workspace for the work behind an online store: orders, stock, fulfillment and purchasing, across the tools a business already uses. Workflows take care of the repetitive steps, and people approve what matters. The idea came from my time at Elektrohub, working with the people who ran those systems every day.",
    tasks: [
      "Designing and building Luma, from product design to full-stack development and production operations",
      "Bringing orders, stock, fulfillment and purchasing from the systems a store already uses into one place",
      "Building Workflows that take on the repetitive steps, with people approving what matters",
    ],
    invitation:
      "Luma is still early. If you run operations for an online store, or build tools for people who do, I’d love to hear what takes more effort than it should, and maybe shape Luma with me in an early deployment.",
    skills: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    emphasis: "primary",
  },
  {
    id: "independent-products",
    kind: "experience",
    title: "Independent product engineer",
    organization: "ShiftIQ",
    start: new Date(2025, 11, 1),
    end: new Date(2026, 3, 30),
    subTitle: "Independent",
    summary:
      "From late 2025 to spring 2026 I worked on my own products. I built ShiftIQ together with a care-service manager, based on how shifts actually get planned there, and took it close to a pilot.",
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
      "I was Elektrohub’s only engineer. I rebuilt the platform that runs their online shop and day-to-day operations, and looked after everything around it: working out what people needed, architecture, integrations, releases, and keeping production healthy.",
    impact: [
      { label: "Engineering team", value: "Just me" },
      { label: "Orders processed", value: "10,000+" },
      { label: "Slowest job", value: "10+ min → seconds" },
    ],
    tasks: [
      "Rebuilt the core platform, moving from Laravel and Vue.js to NestJS, Next.js, TypeScript and PostgreSQL so it was easier to maintain, test, monitor and extend",
      "Designed a connector setup for four outside systems (Galaxus, JTL Wawi, JTL Fulfillment Network and Shopify) plus the company’s own B2B shop",
      "Rebuilt the B2B shop, used by more than 20 people, as a faster React app built around quick search and ordering",
      "Made important workflows and database jobs about 80% faster on average. The worst one went from over ten minutes to a few seconds",
      "Kept more than 10,000 orders flowing through platform fixes, analytics dashboards, automated tests and day-to-day operations",
      "Ran infrastructure and production: Docker, GitHub Actions, DigitalOcean, Vercel, PostgreSQL, Sentry, backups, releases and the occasional incident",
      "Talked directly with employees, management and B2B customers to decide what to build next, weighing value against effort",
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
      "My apprenticeship, finished in two and a half years instead of the usual three. I worked on desktop software that customers used every day, modernized older C# and WPF code, and wrote my IHK final project on cleaner data access and a more responsive UI.",
    impact: [
      { label: "Duration", value: "3 years → 2.5" },
      { label: "IHK result", value: "83 points (Good)" },
    ],
    tasks: [
      "Modernized parts of the Qualli.life desktop app using C#, .NET Framework, WPF, XAML, MVVM, Entity Framework and relational databases",
      "Migrated code from Visual Basic to C#, improved the UI, tracked down production bugs, tested changes and shipped features customers used",
      "Built IntelliSense-style autocomplete and syntax highlighting for the placeholders in document and print templates",
      "Worked on a separate medical data module and on database logic in a large, mature codebase",
      "Redesigned the foundation of the contacts module for my IHK final project: async loading, permissions, printing, multiple users and centralized data access",
      "Cut one database operation in that project from five queries to one, and stopped it from writing data it didn’t need to",
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
    title: "ShiftIQ: shift planning for care services",
    start: new Date(2025, 11, 1),
    end: new Date(2026, 3, 30),
    subTitle: "Workforce scheduling product",
    summary:
      "ShiftIQ started from a real care service’s scheduling process. It handles contracts, absences, vacations, staff preferences, staffing needs and a set of hard and soft rules. A solver built with Python, FastAPI and OR-Tools drafts a complete schedule in minutes, so planning becomes reviewing and adjusting instead of hours of puzzling. It got past the MVP and close to a pilot, but I paused the rollout: the customer was tied to a contract with their current vendor, so switching didn’t make sense for them.",
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
    id: "ihk-qualification",
    kind: "certificate",
    title: "IHK qualification in software development",
    start: new Date(2024, 0, 1),
    end: new Date(2024, 0, 1),
    subTitle: "German vocational qualification",
    summary:
      "The official German qualification as a Fachinformatiker für Anwendungsentwicklung (application developer). I finished in two and a half years instead of three, with 83 points (Good). It sits at level 4 of the German and European qualifications frameworks.",
    skills: ["EQF level 4", "83 points (Good)"],
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
    emphasis: "secondary",
  },
];

const attachedMilestones: Record<string, string> = {
  shiftiq: "independent-products",
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
