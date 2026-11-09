/* A quick fact beside the About text. It can link somewhere and carry an animated icon. */
export type ProfileFact = {
  label: string;
  value: string;
  href?: string;
  icon?: "rocket" | "coffee";
};

export const aboutMeSectionContent = {
  title: "About me",
  paragraphs: [
    "I started programming at 15. One of my first projects was a management tool for the virtual trucking company my friends and I ran in Euro Truck Simulator 2, after the one we used shut down. It was the first time other people used something I’d built, and seeing it actually help them is still my favorite part of the job.",
    "These days I mostly build web apps with Next.js and React, backed by NestJS and PostgreSQL. For two years I was the only engineer at an e-commerce company, so I owned all of it, from figuring out what people actually need to fixing production quickly when something breaks.",
    "The work I enjoy most is software that makes people’s everyday work easier. Often that means pulling scattered systems and integrations into one place. I take my time with design decisions, so I can still stand behind them later.",
    "I grew up in northern Germany and live in Munich, apart from four months in Tokyo. My side projects come from tinkering, like a better app for my electric car and a custom lighting system I built into it.",
  ],
} as const;
