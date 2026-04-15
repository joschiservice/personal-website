import Image from "next/image";
import Link from "next/link";
import { FaPlane } from "react-icons/fa";
import { SectionHeading } from "@/app/components/SectionHeading";
import { flightRadarSectionContent } from "@/app/data/flightRadarSection";
import { SectionBodyText } from "../components/SectionBodyText";

export function FlightRadarSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <SectionHeading
          title={flightRadarSectionContent.title}
          icon={FaPlane}
          gradient="from-cyan-500/40 to-cyan-300/40"
        />
        <SectionBodyText className="mb-12">
          {flightRadarSectionContent.description}
        </SectionBodyText>
        <div className="flex justify-center w-full">
          <Link
            href={flightRadarSectionContent.href}
            className="block w-full max-w-[400px]"
          >
            <Image
              src={flightRadarSectionContent.imageSrc}
              alt={flightRadarSectionContent.imageAlt}
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
