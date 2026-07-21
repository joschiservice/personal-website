import { aboutMeSectionContent } from "@/app/data/aboutMeSection";
import { flightRadarSectionContent } from "@/app/data/flightRadarSection";
import { interestsSectionContent } from "@/app/data/interestsSection";
import {
  EXPERIENCE_STOPS,
  timelineSectionContent,
} from "@/app/data/timelineSection";
import { toolsSectionContent } from "@/app/data/toolsSection";

const en = {
  metadata: {
    title: "Joschua Haß",
    description:
      "Product-minded full-stack engineer specializing in TypeScript, React, Next.js, NestJS, Node.js, and PostgreSQL.",
  },
  accessibility: {
    skipToContent: "Skip to main content",
    opensNewTab: "opens in a new tab",
  },
  nav: {
    identity: "Joschua Haß",
    monogram: "JH",
    label: "Primary",
    home: "Home",
    work: "Work",
    about: "About",
    notes: "Notes",
    contact: "Contact",
    imprint: "Imprint",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mobileLabel: "Mobile navigation",
    languageLabel: "Language",
    languages: {
      en: "English",
      ja: "Japanese",
    },
  },
  hero: {
    label: "Full-stack product engineer / TypeScript · React · Node.js",
    headlineLead: "I turn operational complexity",
    headlineAccent: "into reliable products",
    description:
      "Product-minded full-stack engineer with end-to-end experience across interfaces, backend services, integrations, databases, infrastructure, and production operations.",
    primaryAction: "Explore my experience",
    secondaryAction: "Download CV",
    primaryActionLabel: "Explore my experience",
    secondaryActionLabel: "Download CV",
    cvLanguageMenuLabel: "Choose CV language",
    socialsLabel: "Elsewhere",
    nextSectionLabel: "Continue to profile",
  },
  about: {
    label: "01 / Profile",
    title: aboutMeSectionContent.title,
    statement: "Product-minded engineering, from interface decisions to production ownership.",
    annotationsLabel: "Profile facts and operating principles",
    profileFactsLabel: "Profile facts",
    profileFacts: [
      ["Location", "Relocating to Tokyo · End of July"],
      ["German", "Native"],
      ["English", "C2"],
      ["Japanese", "Beginner · Approx. JLPT N5 level"],
    ],
    principlesLabel: "Operating principles",
    paragraphs: aboutMeSectionContent.paragraphs,
    principles: [
      ["Design", "Make complexity feel considered and easy to use."],
      ["Systems", "Build reliable foundations that survive real operations."],
      ["Ownership", "Stay close to outcomes from architecture through delivery."],
    ],
  },
  writing: {
    label: "02 / Field notes",
    title: "Latest writing",
    intro:
      "Notes on thoughtful products, technical tradeoffs, and the rabbit holes worth sharing.",
    allWriting: "Explore all writing",
  },
  timeline: {
    label: "03 / Journey",
    title: timelineSectionContent.title,
    description: timelineSectionContent.description,
    newer: "Show newer career stop",
    older: "Show older career stop",
    readMore: "Read more",
    present: "Present",
    kinds: {
      experience: "Experience",
      project: "Project",
      certificate: "Credential",
    },
    impactLabel: "impact",
    stops: EXPERIENCE_STOPS,
  },
  tools: {
    label: "04 / Working set",
    title: "Tools are means, not the story.",
    description:
      "A personal, slightly game-like view of the tools I use to shape interfaces, product services, integrations, and production infrastructure.",
    all: "All",
    featured: "Featured",
    filterLabel: "Filter tools by category",
    resultsLabel: "tools shown",
    categories: toolsSectionContent.categories,
    rarities: {
      Common: "Common",
      Rare: "Rare",
      Epic: "Epic",
      Legendary: "Legendary",
    },
    items: toolsSectionContent.items,
  },
  interests: {
    label: "05 / Outside the editor",
    title: interestsSectionContent.title,
    description:
      "Travel, aviation, and curiosity keep the work grounded in a much wider world.",
    items: interestsSectionContent.items,
    previous: "Previous interest",
    next: "Next interest",
    regionLabel: "Personal interests",
  },
  flightRadar: {
    label: "06 / Travel log",
    title: "The route continues off-screen.",
    description: flightRadarSectionContent.description,
    href: flightRadarSectionContent.href,
    imageSrc: flightRadarSectionContent.imageSrc,
    imageAlt: flightRadarSectionContent.imageAlt,
    action: "Open my FlightRadar24 summary",
  },
  footer: {
    label: "Have a complex product problem?",
    title: "Let’s make it feel simple.",
    contact: "Start a conversation",
    copyright: "All rights reserved.",
    imprint: "Imprint",
  },
  contact: {
    metadataTitle: "Contact",
    metadataDescription:
      "Get in touch with Joschua Haß by email, LinkedIn, GitHub, or Instagram.",
    label: "Contact / Open channel",
    titleLead: "Good work starts",
    titleAccent: "with a conversation.",
    intro:
      "Have a product problem, an opportunity, or simply something interesting to share? Pick the channel that fits and say hello.",
    directoryLabel: "Direct lines",
    directoryTitle: "Choose your channel.",
    emailLabel: "Email",
    emailIntro:
      "Best for opportunities, collaborations, and conversations that deserve a little more room.",
    socialsLabel: "Social profiles",
    socials: {
      linkedin: "Work, experience, and professional updates",
      github: "Projects, experiments, and source code",
      instagram: "Places, planes, and life outside the editor",
    },
    unavailable: "This channel is temporarily unavailable.",
    note: "No forms, no ticket numbers — your message lands directly with me.",
  },
  blog: {
    metadataTitle: "Blog",
    metadataDescription:
      "Notes from Joschua Haß on software engineering, product craft, and building reliable systems.",
    label: "Field notes",
    title: "Ideas, tradeoffs, and things worth writing down.",
    intro:
      "Notes on building thoughtful products, untangling technical systems, and what I learn along the way.",
    rss: "Follow via RSS",
    emptyLabel: "First dispatch pending",
    emptyTitle: "The notebook is open.",
    emptyBody:
      "I am shaping the first few pieces now. In the meantime, the rest of the site has plenty of projects and stories to explore.",
    exploreWork: "Explore my work",
    localOnly: "Local development only",
    drafts: "Draft previews",
    draftsBody: "These entries are never included in a production build.",
    allWriting: "All writing",
    draftPreview: "Draft preview",
    tags: "Tags",
    read: "Read",
    minRead: "min read",
    readingTime: (minutes: number) => `${minutes} min read`,
    readArticle: (title: string) => `Read ${title}`,
    copyLink: "Copy link",
    copied: "Copied",
    copyFailed: "Copy failed",
    moreArticles: "More articles",
    enlargeImage: "Enlarge image",
    fullscreenImage: "Fullscreen image",
    closeFullscreenImage: "Close fullscreen image",
    onThisPage: "On this page",
    tableOfContents: "Table of contents",
    newer: "Newer",
    older: "Older",
    keepReading: "Keep reading",
    related: "Related writing",
  },
  imprint: {
    label: "Legal / DE",
    title: "Imprint / Legal disclosure",
    metadataDescription: "Legal disclosure and contact details for jhass.dev.",
    intro: "Information in accordance with Section 5 DDG.",
    operator: "Website operator",
    contactTitle: "Contact information",
    phone: "Phone",
    email: "Email",
    addressLines: ["To Westen 5", "25770 Hemmingstedt, Germany"],
    copyrightTitle: "Copyright",
    copyrightBody:
      "These pages and their contents are subject to German copyright law. Unless expressly permitted by law, using, reproducing, or processing protected works requires the prior consent of the respective rights holder. Individual reproductions are permitted only for private use. Unauthorized use may violate copyright law.",
  },
} as const;

export default en;
