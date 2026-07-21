export interface Interest {
  title: string;
  description: string;
  image: string;
  color: string;
  icon?: string;
}

export const interestsSectionContent = {
  title: "Interests & Passions",
  items: [
    {
      title: "日本 (Japan)",
      description:
        "Japan began as a place I was curious about and, trip by trip, became somewhere I could imagine building a life. Returning several times allowed me to appreciate more than the obvious highlights: the contrast between Tokyo's energy and its quiet neighborhoods, the regional differences, the food, the design, and the care often visible in everyday experiences. I am now preparing to make Tokyo home and learning the language so I can participate in life there more fully, rather than experience it only as a visitor.",
      image: "/img/interests/Japan.png",
      color: "from-red-500/40 to-red-300/40",
      icon: "🗾",
    },
    {
      title: "Aviation",
      description:
        "Aviation has been a long-running and slightly expensive hobby. I spend a lot of time in Microsoft Flight Simulator, read far too much about aircraft, and can get unreasonably enthusiastic about cabin layouts, engine sounds, and why the A350 is excellent. My YouTube recommendations gave up on showing me unrelated content a long time ago.",
      image: "/img/interests/Aviation.png",
      color: "from-blue-500/40 to-blue-300/40",
      icon: "✈️",
    },
    {
      title: "Software Development",
      description:
        "Software development is the interest that keeps turning into side projects. I like building products that feel simple on the surface and solid underneath, whether that means a web app, mobile app, or a tool for some annoyingly specific problem. I also have a healthy respect for the industry's habit of declaring everything revolutionary right before replacing it six months later.",
      image: "/img/interests/Coding.png",
      color: "from-purple-500/40 to-purple-300/40",
      icon: "💻",
    },
  ] satisfies Interest[],
} as const;
