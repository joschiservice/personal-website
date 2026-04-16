export const toolCategories = [
  "IDE",
  "AI",
  "Framework",
  "Platform",
  "Service",
] as const;

export type ToolCategory = (typeof toolCategories)[number];

export interface ToolStat {
  label: string;
  value: string;
}

export interface Tool {
  name: string;
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
      name: "React.js",
      category: "Framework",
      rarity: "Legendary",
      title: "State Tamer",
      flavor: "Turns caffeine into component trees.",
      stats: [
        { label: "Hooks Cast", value: "9,001" },
        { label: "UI Combo", value: "+42" },
        { label: "Hydration Panic", value: "Low" },
      ],
    },
    {
      name: "Next.js",
      category: "Framework",
      hideText: true,
      rarity: "Epic",
      title: "Route Runner",
      flavor: "SSR before the coffee fully boots.",
      stats: [
        { label: "Deploy Tempo", value: "Warp" },
        { label: "SEO Aura", value: "+28" },
        { label: "Load Screens", value: "Skipped" },
      ],
    },
    {
      name: "Nest.js",
      category: "Framework",
      rarity: "Rare",
      title: "Backend Architect",
      flavor: "Dependency injection with cathedral energy.",
      stats: [
        { label: "Guards Raised", value: "12" },
        { label: "DTO Shield", value: "Solid" },
        { label: "Endpoint Drama", value: "Muted" },
      ],
    },
    {
      name: "TailwindCSS",
      category: "Framework",
      rarity: "Epic",
      title: "Utility Wizard",
      flavor: "Ships pixels before the meeting agenda lands.",
      stats: [
        { label: "Classes Stacked", value: "47" },
        { label: "Design Velocity", value: "Fast" },
        { label: "Margin Crimes", value: "0" },
      ],
    },
    {
      name: "Laravel",
      category: "Framework",
      rarity: "Rare",
      title: "PHP Paladin",
      flavor: "Elegant syntax, suspicious productivity.",
      stats: [
        { label: "Artisan Mana", value: "Full" },
        { label: "Blade Cuts", value: "Clean" },
        { label: "CRUD Speed", value: "Rapid" },
      ],
    },
    {
      name: "WebStorm",
      category: "IDE",
      rarity: "Rare",
      title: "JetBrains Bruiser",
      flavor: "Indexes the universe while you blink twice.",
      stats: [
        { label: "Refactors", value: "Instant" },
        { label: "Tabs Tamed", value: "34" },
        { label: "RAM Appetite", value: "Respectful" },
      ],
    },
    {
      name: "Cursor",
      category: "IDE",
      rarity: "Legendary",
      title: "Autocomplete Gambler",
      flavor: "Bold enough to finish the line before you do.",
      stats: [
        { label: "Tokens Burned", value: "Many" },
        { label: "Boilerplate", value: "Deleted" },
        { label: "Pairing Speed", value: "+37" },
      ],
    },
    {
      name: "XCode",
      category: "IDE",
      rarity: "Epic",
      title: "Provisioning Survivor",
      flavor: "Can smell a signing issue from three tabs away.",
      stats: [
        { label: "Build Patience", value: "Maxed" },
        { label: "Simulators", value: "5 Live" },
        { label: "Cert Anxiety", value: "Managed" },
      ],
    },
    {
      name: "Vercel",
      category: "Platform",
      hideText: true,
      rarity: "Legendary",
      title: "Deploy Alchemist",
      flavor: "Turns `git push` into a launch sequence.",
      stats: [
        { label: "Ship Time", value: "Minutes" },
        { label: "Preview Links", value: "Infinite-ish" },
        { label: "Rollback Grace", value: "High" },
      ],
    },
    {
      name: "GitHub",
      category: "Platform",
      rarity: "Epic",
      title: "Merge Guardian",
      flavor: "Keeps chaos reviewable and history blameable.",
      stats: [
        { label: "PR Shields", value: "On" },
        { label: "Branches", value: "Too Many" },
        { label: "Commit Lore", value: "Rich" },
      ],
    },
    {
      name: "DigitalOcean",
      category: "Platform",
      rarity: "Rare",
      title: "Droplet Wrangler",
      flavor: "Small cloud, large confidence.",
      stats: [
        { label: "Droplets", value: "Floating" },
        { label: "Infra Fuss", value: "Low" },
        { label: "SSH Swagger", value: "+18" },
      ],
    },
    {
      name: "Shopify",
      category: "Platform",
      rarity: "Epic",
      title: "Checkout Merchant",
      flavor: "Converts midnight ideas into receipts.",
      stats: [
        { label: "Cart Recovery", value: "+22%" },
        { label: "Theme Tweaks", value: "Precise" },
        { label: "Impulse Buys", value: "Encouraged" },
      ],
    },
    {
      name: "Sentry",
      category: "Service",
      rarity: "Rare",
      title: "Stack Trace Detective",
      flavor: "Finds bugs before users write essays.",
      stats: [
        { label: "Crashes Caught", value: "24/7" },
        { label: "Mysteries", value: "Fewer" },
        { label: "Debug Cooldown", value: "-35%" },
      ],
    },
    {
      name: "ChatGPT",
      category: "AI",
      rarity: "Legendary",
      title: "Token Oracle",
      flavor: "Answers first, overthinks later.",
      stats: [
        { label: "Ideas Spawned", value: "Constant" },
        { label: "Context Window", value: "Hungry" },
        { label: "Rubber Ducks", value: "Obsolete" },
      ],
    },
  ] satisfies Tool[],
} as const;
