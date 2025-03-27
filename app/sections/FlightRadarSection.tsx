import Image from "next/image";
import Link from "next/link";
import { FaPlane } from "react-icons/fa";
import { SectionHeading } from "@/app/components/SectionHeading";
import { SectionBodyText } from "../components/SectionBodyText";

export function FlightRadarSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <SectionHeading
          title="FlightRadar24 Flights Summary"
          icon={FaPlane}
          gradient="from-cyan-500/40 to-cyan-300/40"
        />
        <SectionBodyText className="mb-12">
          I have a deep passion for flying and exploring the world. Through my travels, I&apos;ve had the opportunity to experience different cultures, meet amazing people, and create unforgettable memories. Here&apos;s a summary of my flight journeys:
        </SectionBodyText>
        <div className="flex justify-center w-full">
          <Link
            href="https://my.flightradar24.com/joschi_service"
            className="block w-full max-w-[400px]"
          >
            <Image
              src="https://banners-my.flightradar24.com/joschi_service.png"
              alt="FlightRadar24 Flights Summary"
              width={400}
              height={100}
              className="w-full h-auto filter invert hue-rotate-180"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
