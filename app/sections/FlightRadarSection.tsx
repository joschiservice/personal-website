import Image from "next/image";
import { HiArrowUpRight } from "react-icons/hi2";
import { Container } from "@/app/components/system/Container";
import { SectionIntro } from "@/app/components/system/SectionIntro";
import type { Dictionary } from "@/app/i18n/getDictionary";

export function FlightRadarSection({
  copy,
  newTabLabel,
}: {
  copy: Dictionary["flightRadar"];
  newTabLabel: string;
}) {
  return (
    <section className="editorial-section travel-section" aria-labelledby="travel-log-heading">
      <Container>
        <SectionIntro
          number="06"
          label={copy.label}
          title={copy.title}
          description={copy.description}
          id="travel-log-heading"
          align="split"
        />
        <a
          href={copy.href}
          target="_blank"
          rel="noopener noreferrer"
          className="travel-log motion-section-content"
        >
          <div className="travel-log__line" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="travel-log__content">
            <Image
              src={copy.imageSrc}
              alt={copy.imageAlt}
              width={320}
              height={70}
              sizes="(max-width: 640px) 75vw, 320px"
            />
            <span>
              {copy.action}
              <HiArrowUpRight aria-hidden="true" />
            </span>
          </div>
          <span className="sr-only"> · {newTabLabel}</span>
        </a>
      </Container>
    </section>
  );
}
