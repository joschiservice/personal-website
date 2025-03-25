import {TextLink} from "@/app/components/TextLink";

export function AboutMeSection() {
  return (
    <section id="about-me" className="py-16 bg-linear-to-b from-[rgba(18,18,18,1)] via-[rgba(8,34,43,1)] to-[rgba(18,18,18,1)]">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-medium text-center mb-6">
          About Me
        </h2>
        <div className="text-gray-400">
          <p>
            Back in the days when I was 15 years old and still went to school, I was already very passionate about software engineering. As one of my favorite tools for collaborating with others in virtual trucking companies for the game &apos;Euro Truck Simulator 2&apos; decided to shut down its operations,
            I decided to build a replacement application for everyone who still wants to continue using such a tool.
          </p>
          <p className="mt-4">
            Currently, I am primarily working on full-stack web, iOS and C# WPF applications. In my free time, I sometimes work on small casual projects, but primarily on <TextLink href="https://www.nextgendrive.net/products/sparky" text="Sparky" />, a companion mobile app for Kia & Hyundai drivers.
          </p>
          <p className="mt-4">
            When I&apos;m not at the computer, I&apos;m usually traveling around, working on my own electric vehicle (a <TextLink text="Kia e-Soul SK3" href="https://www.nextgendrive.net/products/ng-one"/>), hanging out with friends, doing photography or playing around in virtual reality.
          </p>
        </div>
      </div>
    </section>
  )
}