export interface Interest {
  title: string;
  description: string;
  image: string;
  color: string;
  icon?: string;
}

export const interestsSectionContent = {
  title: "Things I’m into",
  items: [
    {
      title: "Japan",
      description:
        "Japan started as a holiday destination and, trip by trip, turned into the place I wanted to live. Now I do. I still love how a quiet side street can be two minutes from a packed station, and how much care goes into everyday things. I’m learning the language so I can be part of life here rather than just watching it.",
      image: "/img/interests/Japan.png",
      color: "from-red-500/40 to-red-300/40",
      icon: "🗾",
    },
    {
      title: "Aviation",
      description:
        "A hobby I’ve had for a long time. I spend a lot of time in Microsoft Flight Simulator, read a lot about aircraft, and could talk for hours about cabin layouts, engine sounds and why the A350 is my favorite plane.",
      image: "/img/interests/Aviation.png",
      color: "from-blue-500/40 to-blue-300/40",
      icon: "✈️",
    },
    {
      title: "Side projects",
      description:
        "Coding is my job, and it’s also what I do for fun. Most of my side projects start with an annoyingly specific problem, like a car app that’s missing a feature, and end up as a web app, a mobile app, or a small tool.",
      image: "/img/interests/Coding.png",
      color: "from-purple-500/40 to-purple-300/40",
      icon: "💻",
    },
  ] satisfies Interest[],
} as const;
