const toolCategories = [
  "Languages",
  "Frameworks",
  "Libraries",
  "Platform",
  "Cloud & Ops",
] as const;

type ToolCategory = (typeof toolCategories)[number];

interface ToolStat {
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
        "JavaScript with a type system that points out your mistakes before your users do.",
      stats: [
        { label: "Since", value: "2012" },
        { label: "Designed by", value: "C#’s creator" },
        { label: "Go rewrite", value: "10x faster" },
      ],
    },
    {
      name: "Node.js",
      imageName: "NodeJS-light",
      category: "Platform",
      rarity: "Legendary",
      title: "Engine Room",
      flavor:
        "JavaScript that escaped the browser and now runs servers, scripts and half of your build tools.",
      stats: [
        { label: "Since", value: "2009" },
        { label: "Engine", value: "Chrome’s V8" },
        { label: "JS runs on", value: "1 thread" },
      ],
    },
    {
      name: "Next.js",
      imageName: "Next.js",
      category: "Frameworks",
      rarity: "Legendary",
      title: "Home Base",
      flavor:
        "A React framework that sorts out routing, rendering and bundling, then leaves you to debate what should be cached.",
      stats: [
        { label: "Since", value: "2016" },
        { label: "Routes are", value: "Folders" },
        { label: "Bundler", value: "Rust-based" },
      ],
    },
    {
      name: "React",
      imageName: "React.js",
      category: "Libraries",
      rarity: "Epic",
      title: "UI Wrangler",
      flavor:
        "Build interfaces from small components, describe how they should look and let it work out what to change.",
      stats: [
        { label: "Since", value: "2013" },
        { label: "Born at", value: "Facebook" },
        { label: "On mobile", value: "React Native" },
      ],
    },
    {
      name: "NestJS",
      imageName: "Nest.js",
      category: "Frameworks",
      rarity: "Epic",
      title: "Backend Architect",
      flavor:
        "A Node.js framework that brings modules and dependency injection to backends that would otherwise grow wild.",
      stats: [
        { label: "Since", value: "2017" },
        { label: "Inspired by", value: "Angular" },
        { label: "Runs on", value: "Express" },
      ],
    },
    {
      name: "PostgreSQL",
      imageName: "PostgreSQL",
      category: "Platform",
      rarity: "Epic",
      title: "Source of Truth",
      flavor:
        "The relational database that’s older than the web and still picks up new tricks every year.",
      stats: [
        { label: "Since", value: "1986" },
        { label: "Born at", value: "UC Berkeley" },
        { label: "Mascot", value: "Slonik" },
      ],
    },
    {
      name: "Docker",
      imageName: "Docker",
      category: "Platform",
      rarity: "Rare",
      title: "Shipping Crate",
      flavor:
        "Packs an app and everything it needs into a container, ending most “works on my machine” debates.",
      stats: [
        { label: "Since", value: "2013" },
        { label: "First demo", value: "5-min talk" },
        { label: "Mascot", value: "Moby Dock" },
      ],
    },
    {
      name: "Sentry",
      imageName: "Sentry",
      category: "Cloud & Ops",
      rarity: "Rare",
      title: "Bug Radar",
      flavor:
        "Error monitoring that turns production crashes into tidy stack traces. Bad news, neatly organized.",
      stats: [
        { label: "Since", value: "2008" },
        { label: "Started as", value: "Django app" },
        { label: "Replaced", value: "Error emails" },
      ],
    },
  ] satisfies Tool[],
} as const;
