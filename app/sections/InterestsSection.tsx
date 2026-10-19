import Image from "next/image";
import { Container } from "@/app/components/system/Container";
import { SectionIntro } from "@/app/components/system/SectionIntro";
import type { Dictionary } from "@/app/i18n/getDictionary";
import { SpaceBackdrop } from "@/app/components/system/SpaceBackdrop";

export function InterestsSection({
  copy,
}: {
  copy: Dictionary["interests"];
}) {
  return (
    <section
      id="interests"
      className="editorial-section interests-section"
      aria-labelledby="interests-heading"
    >
      <SpaceBackdrop variant="interests" />
      <Container>
        <SectionIntro
          label={copy.label}
          title={copy.title}
          description={copy.description}
          id="interests-heading"
          align="split"
        />

        <div
          className="interests-grid motion-section-content"
          role="list"
          aria-label={copy.regionLabel}
        >
          {copy.items.map((interest) => (
            <article className="interest-story" role="listitem" key={interest.title}>
              <div className="interest-story__image">
                <Image
                  src={interest.image}
                  alt=""
                  fill
                  sizes="(max-width: 980px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="interest-story__content">
                <h3>{interest.title}</h3>
                <p>{interest.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
