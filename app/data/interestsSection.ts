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
        "I keep telling myself each Japan trip will be the last one for a while, and then I somehow book another. I went four times last year, changed flights mid-trip once, and now study Japanese daily with a vocabulary that is still disproportionately useful in restaurants. The mix of culture, food, and scenery has fully won me over, and my friends can usually tell when I am about to bring Japan into the conversation again.",
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
