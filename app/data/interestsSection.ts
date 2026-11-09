export interface InterestVideoTile {
  channel: string;
  topic: string;
  href: string;
  icon: "rocket" | "car" | "cog";
}

export interface Interest {
  title: string;
  description: string;
  /** Up to three photos. The first one lies on top of the stack. */
  images?: readonly string[];
  /** Designed channel tiles, used instead of photos. */
  videos?: readonly InterestVideoTile[];
}

export const interestsSectionContent = {
  title: "Things I’m into",
  items: [
    {
      title: "Taking things apart",
      description:
        "Most of my projects start with something that annoys me. My electric car was missing features, so I built it a better app and wired in a custom lighting system.",
      images: [
        "/img/interests/tinkering-workshop.jpg",
        "/img/interests/tinkering-car-app.jpg",
        "/img/interests/tinkering-3d-print.jpg",
      ],
    },
    {
      title: "Engineering rabbit holes",
      description:
        "I’ll happily lose an evening to Linus Tech Tips, BPS.space, Rich Rebuilds, Real Engineering or Billy Ellis. Rockets, EV repairs, iPhone exploits, it doesn’t really matter.",
      videos: [
        {
          channel: "BPS.space",
          topic: "Landing model rockets",
          href: "https://www.youtube.com/@BPSspace",
          icon: "rocket",
        },
        {
          channel: "Rich Rebuilds",
          topic: "Reviving wrecked EVs",
          href: "https://www.youtube.com/@RichRebuilds",
          icon: "car",
        },
        {
          channel: "Real Engineering",
          topic: "How things get built",
          href: "https://www.youtube.com/@RealEngineering",
          icon: "cog",
        },
      ],
    },
    {
      title: "Getting away",
      description:
        "Every now and then I go on a trip to clear my head. Japan went from a holiday to four months in Tokyo, and I’m still learning the language.",
      images: [
        "/img/interests/getting-away-japan.jpg",
        "/img/interests/getting-away-airport.jpg",
        "/img/interests/getting-away-greenhouse.jpg",
      ],
    },
  ] as const satisfies readonly Interest[],
} as const;
