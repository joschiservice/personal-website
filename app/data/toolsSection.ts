export const toolCategories = [
  "IDE",
  "AI",
  "Framework",
  "Platform",
  "Service",
] as const;

export type ToolCategory = (typeof toolCategories)[number];

export interface Tool {
  name: string;
  hideText?: boolean;
  category?: ToolCategory;
}

export const toolsSectionContent = {
  title: "Tools, Frameworks & Services",
  categories: toolCategories,
  items: [
    {
      name: "React.js",
      category: "Framework",
    },
    {
      name: "Next.js",
      category: "Framework",
      hideText: true,
    },
    {
      name: "Nest.js",
      category: "Framework",
    },
    {
      name: "TailwindCSS",
      category: "Framework",
    },
    {
      name: "Laravel",
      category: "Framework",
    },
    {
      name: "WebStorm",
      category: "IDE",
    },
    {
      name: "Cursor",
      category: "IDE",
    },
    {
      name: "XCode",
      category: "IDE",
    },
    {
      name: "Vercel",
      category: "Platform",
      hideText: true,
    },
    {
      name: "GitHub",
      category: "Platform",
    },
    {
      name: "DigitalOcean",
      category: "Platform",
    },
    {
      name: "Shopify",
      category: "Platform",
    },
    {
      name: "Sentry",
      category: "Service",
    },
    {
      name: "ChatGPT",
      category: "AI",
    },
  ] satisfies Tool[],
} as const;
