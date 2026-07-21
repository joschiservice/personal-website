export const toolCategories = [
  "Languages",
  "Frameworks",
  "Libraries",
  "Platform",
  "Cloud & Ops",
] as const;

export type ToolCategory = (typeof toolCategories)[number];

export interface ToolStat {
  label: string;
  value: string;
}

export interface Tool {
  name: string;
  imageName?: string;
  category: ToolCategory;
  rarity: "Rare" | "Epic" | "Legendary";
  title: string;
  flavor: string;
  stats: [ToolStat, ToolStat, ToolStat];
}

export const toolsSectionContent = {
  title: "Signature Technology Deck",
  categories: toolCategories,
  items: [
    {
      name: "TypeScript",
      imageName: "TypeScript",
      category: "Languages",
      rarity: "Legendary",
      title: "Type Smith",
      flavor:
        "The center of my stack, from product interfaces to services and shared contracts.",
      stats: [
        { label: "Contracts", value: "Explicit" },
        { label: "Refactors", value: "Confident" },
        { label: "Stack Reach", value: "End-to-End" },
      ],
    },
    {
      name: "Node.js",
      imageName: "NodeJS",
      category: "Platform",
      rarity: "Legendary",
      title: "Runtime Captain",
      flavor:
        "Production services, integrations, background work, and full-stack delivery in one ecosystem.",
      stats: [
        { label: "Services", value: "Operational" },
        { label: "Integrations", value: "Connected" },
        { label: "Runtime", value: "Proven" },
      ],
    },
    {
      name: "Next.js",
      imageName: "Next.js",
      category: "Frameworks",
      rarity: "Legendary",
      title: "Route Runner",
      flavor: "Full-stack React delivery with fast iteration and production focus.",
      stats: [
        { label: "Rendering", value: "Hybrid" },
        { label: "Ship Tempo", value: "Fast" },
        { label: "SEO", value: "Strong" },
      ],
    },
    {
      name: "React",
      imageName: "React.js",
      category: "Libraries",
      rarity: "Epic",
      title: "State Tamer",
      flavor: "Interactive interfaces built from composable pieces that scale cleanly.",
      stats: [
        { label: "Components", value: "Reusable" },
        { label: "State Flow", value: "Clear" },
        { label: "UI Depth", value: "High" },
      ],
    },
    {
      name: "NestJS",
      imageName: "Nest.js",
      category: "Frameworks",
      rarity: "Epic",
      title: "Service Architect",
      flavor:
        "Structured backend systems with proper boundaries and strong defaults.",
      stats: [
        { label: "Modules", value: "Composed" },
        { label: "Guards", value: "Active" },
        { label: "APIs", value: "Typed" },
      ],
    },
    {
      name: "PostgreSQL",
      imageName: "PostgreSQL",
      category: "Platform",
      rarity: "Epic",
      title: "Data Vault",
      flavor: "Reliable relational modeling for systems that need real structure.",
      stats: [
        { label: "Schemas", value: "Normalized" },
        { label: "Queries", value: "Tuned" },
        { label: "Integrity", value: "Strict" },
      ],
    },
    {
      name: "Docker",
      imageName: "Docker",
      category: "Platform",
      rarity: "Rare",
      title: "Container Pilot",
      flavor: "Consistent local and production environments without ritual.",
      stats: [
        { label: "Deploy Units", value: "Portable" },
        { label: "Setup Drift", value: "Low" },
        { label: "Stacks", value: "Reproducible" },
      ],
    },
    {
      name: "Sentry",
      imageName: "Sentry",
      category: "Cloud & Ops",
      rarity: "Rare",
      title: "Stack Trace Detective",
      flavor: "Finds issues early and makes production behavior explainable.",
      stats: [
        { label: "Errors", value: "Tracked" },
        { label: "Signals", value: "Actionable" },
        { label: "Debug Time", value: "Reduced" },
      ],
    },
  ] satisfies Tool[],
} as const;
