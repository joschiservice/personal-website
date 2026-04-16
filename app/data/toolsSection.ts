export const toolCategories = [
  "Frameworks & Libraries",
  "Backend & Platform",
  "Cloud & Operations",
  "Tools",
  "Other",
] as const;

export type ToolCategory = (typeof toolCategories)[number];

export interface ToolStat {
  label: string;
  value: string;
}

export interface Tool {
  name: string;
  imageName?: string;
  hideText?: boolean;
  category?: ToolCategory;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  title: string;
  flavor: string;
  stats: [ToolStat, ToolStat, ToolStat];
}

export const toolsSectionContent = {
  title: "Tools, Frameworks & Services",
  categories: toolCategories,
  items: [
    {
      name: "NestJS",
      imageName: "Nest.js",
      category: "Frameworks & Libraries",
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
      name: "Next.js",
      imageName: "Next.js",
      category: "Frameworks & Libraries",
      hideText: true,
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
      category: "Frameworks & Libraries",
      rarity: "Legendary",
      title: "State Tamer",
      flavor: "Interactive interfaces built from composable pieces that scale cleanly.",
      stats: [
        { label: "Components", value: "Reusable" },
        { label: "State Flow", value: "Clear" },
        { label: "UI Depth", value: "High" },
      ],
    },
    {
      name: "TanStack Query",
      imageName: "TanStack",
      category: "Frameworks & Libraries",
      rarity: "Epic",
      title: "Cache Strategist",
      flavor:
        "Server-state management that keeps fetching, caching, and sync under control.",
      stats: [
        { label: "Caching", value: "Smart" },
        { label: "Refetching", value: "Automatic" },
        { label: "Sync", value: "Reliable" },
      ],
    },
    {
      name: "GraphQL",
      imageName: "GraphQL",
      category: "Backend & Platform",
      rarity: "Epic",
      title: "Schema Broker",
      flavor: "Precise data contracts that keep frontend and backend aligned.",
      stats: [
        { label: "Queries", value: "Exact" },
        { label: "Schemas", value: "Shared" },
        { label: "Overfetch", value: "Low" },
      ],
    },
    {
      name: "Docker",
      imageName: "Docker",
      category: "Backend & Platform",
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
      name: "PostgreSQL",
      imageName: "PostgreSQL",
      category: "Backend & Platform",
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
      name: "DigitalOcean",
      imageName: "DigitalOcean",
      category: "Cloud & Operations",
      rarity: "Rare",
      title: "Droplet Wrangler",
      flavor: "Lean infrastructure with straightforward control and low friction.",
      stats: [
        { label: "Droplets", value: "Managed" },
        { label: "Ops Fuss", value: "Low" },
        { label: "Provisioning", value: "Direct" },
      ],
    },
    {
      name: "Vercel",
      imageName: "Vercel",
      category: "Cloud & Operations",
      hideText: true,
      rarity: "Legendary",
      title: "Deploy Alchemist",
      flavor:
        "Preview-driven shipping with minimal friction from commit to production.",
      stats: [
        { label: "Previews", value: "Instant" },
        { label: "Ship Time", value: "Minutes" },
        { label: "Rollback", value: "Easy" },
      ],
    },
    {
      name: "AWS",
      imageName: "AWS",
      hideText: true,
      category: "Cloud & Operations",
      rarity: "Epic",
      title: "Scale Arsenal",
      flavor: "Cloud primitives for systems that need breadth, control, and reach.",
      stats: [
        { label: "Services", value: "Broad" },
        { label: "Scale", value: "Elastic" },
        { label: "Infra Reach", value: "Global" },
      ],
    },
    {
      name: "Sentry",
      imageName: "Sentry",
      category: "Cloud & Operations",
      rarity: "Rare",
      title: "Stack Trace Detective",
      flavor: "Finds issues early and makes production behavior explainable.",
      stats: [
        { label: "Errors", value: "Tracked" },
        { label: "Signals", value: "Actionable" },
        { label: "Debug Time", value: "Reduced" },
      ],
    },
    {
      name: "GitHub",
      imageName: "GitHub",
      category: "Tools",
      rarity: "Epic",
      title: "Merge Guardian",
      flavor: "Version control, reviews, and collaboration in one stable center.",
      stats: [
        { label: "PR Flow", value: "Tight" },
        { label: "History", value: "Clean" },
        { label: "Automation", value: "Ready" },
      ],
    },
    {
      name: "Cursor",
      imageName: "Cursor",
      category: "Tools",
      rarity: "Legendary",
      title: "Autocomplete Gambler",
      flavor: "AI-assisted coding tuned for speed, context, and iteration.",
      stats: [
        { label: "Edits", value: "Accelerated" },
        { label: "Context", value: "Deep" },
        { label: "Iteration", value: "Fast" },
      ],
    },
    {
      name: "Codex App",
      imageName: "Codex",
      category: "Tools",
      rarity: "Epic",
      title: "Terminal Pair",
      flavor: "Agent-driven coding workflows that stay close to the actual codebase.",
      stats: [
        { label: "Execution", value: "Hands-on" },
        { label: "Workflow", value: "Direct" },
        { label: "Momentum", value: "High" },
      ],
    },
    {
      name: "T3 Code",
      imageName: "T3Code",
      category: "Tools",
      rarity: "Rare",
      title: "Starter Forge",
      flavor:
        "A pragmatic full-stack foundation for moving from idea to product quickly.",
      stats: [
        { label: "Scaffold", value: "Opinionated" },
        { label: "Stack Fit", value: "Modern" },
        { label: "Setup Time", value: "Short" },
      ],
    },
    {
      name: "Shopify",
      imageName: "Shopify",
      category: "Other",
      rarity: "Epic",
      title: "Commerce Engine",
      flavor: "E-commerce workflows, storefront logic, and merchant-facing product work.",
      stats: [
        { label: "Storefronts", value: "Shipped" },
        { label: "Integrations", value: "Custom" },
        { label: "Commerce", value: "Operational" },
      ],
    },
    {
      name: "Tailwind CSS",
      imageName: "TailwindCSS",
      category: "Other",
      rarity: "Epic",
      title: "Utility Wizard",
      flavor:
        "Fast UI implementation without losing control over polish or consistency.",
      stats: [
        { label: "Build Speed", value: "High" },
        { label: "Consistency", value: "Strong" },
        { label: "Polish", value: "Precise" },
      ],
    },
  ] satisfies Tool[],
} as const;
