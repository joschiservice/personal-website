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
  title: "My starter deck",
  categories: toolCategories,
  items: [
    {
      name: "TypeScript",
      imageName: "TypeScript",
      category: "Languages",
      rarity: "Legendary",
      title: "The Main Character",
      flavor:
        "Front end, back end and the types in between. If I’m writing code, it’s probably this.",
      stats: [
        { label: "Used", value: "Daily" },
        { label: "Comfort", value: "Home turf" },
        { label: "Uses of any", value: "Very few" },
      ],
    },
    {
      name: "Node.js",
      imageName: "NodeJS-light",
      category: "Platform",
      rarity: "Legendary",
      title: "Engine Room",
      flavor:
        "Runs the APIs, integrations and background jobs nobody notices until they stop.",
      stats: [
        { label: "Used", value: "Daily" },
        { label: "Runs", value: "APIs & jobs" },
        { label: "Pairs with", value: "NestJS" },
      ],
    },
    {
      name: "Next.js",
      imageName: "Next.js",
      category: "Frameworks",
      rarity: "Legendary",
      title: "Home Base",
      flavor:
        "My default for anything with a UI. This site runs on it too.",
      stats: [
        { label: "Used", value: "Usually" },
        { label: "Powers", value: "This site" },
        { label: "Upgrades", value: "Frequent" },
      ],
    },
    {
      name: "React",
      imageName: "React.js",
      category: "Libraries",
      rarity: "Epic",
      title: "UI Wrangler",
      flavor:
        "How I think about interfaces: small pieces, clear state, no surprises.",
      stats: [
        { label: "Used", value: "Daily" },
        { label: "Best for", value: "Tricky UIs" },
        { label: "Rerenders", value: "Tamed" },
      ],
    },
    {
      name: "NestJS",
      imageName: "Nest.js",
      category: "Frameworks",
      rarity: "Epic",
      title: "Backend Architect",
      flavor:
        "Gives a growing backend some structure before it turns into spaghetti.",
      stats: [
        { label: "Used", value: "Backends" },
        { label: "Best for", value: "Structure" },
        { label: "Decorators", value: "Plenty" },
      ],
    },
    {
      name: "PostgreSQL",
      imageName: "PostgreSQL",
      category: "Platform",
      rarity: "Epic",
      title: "Source of Truth",
      flavor:
        "Where the real data lives. I’ve spent many happy hours with EXPLAIN ANALYZE.",
      stats: [
        { label: "Used", value: "Always" },
        { label: "Best for", value: "Real data" },
        { label: "Fav command", value: "EXPLAIN" },
      ],
    },
    {
      name: "Docker",
      imageName: "Docker",
      category: "Platform",
      rarity: "Rare",
      title: "Shipping Crate",
      flavor:
        "Same setup on my laptop and in production. Fewer “works on my machine” moments.",
      stats: [
        { label: "Used", value: "Everywhere" },
        { label: "Best for", value: "Same setup" },
        { label: "Surprises", value: "Fewer" },
      ],
    },
    {
      name: "Sentry",
      imageName: "Sentry",
      category: "Cloud & Ops",
      rarity: "Rare",
      title: "Bug Radar",
      flavor:
        "Tells me something broke before a customer has to.",
      stats: [
        { label: "Used", value: "Prod" },
        { label: "Catches", value: "Bugs early" },
        { label: "Sleep", value: "Improved" },
      ],
    },
  ] satisfies Tool[],
} as const;
