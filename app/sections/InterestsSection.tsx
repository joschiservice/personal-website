"use client";

import Image from "next/image";
import { useState } from "react";
import { LuCar, LuCog, LuPlay, LuRocket } from "react-icons/lu";
import { Container } from "@/app/components/system/Container";
import { SectionIntro } from "@/app/components/system/SectionIntro";
import type { Interest, InterestVideoTile } from "@/app/data/interestsSection";
import type { Dictionary } from "@/app/i18n/getDictionary";
import { SpaceBackdrop } from "@/app/components/system/SpaceBackdrop";
import styles from "./InterestsSection.module.css";

const VIDEO_ICONS: Record<InterestVideoTile["icon"], typeof LuRocket> = {
  rocket: LuRocket,
  car: LuCar,
  cog: LuCog,
};

export function InterestsSection({
  copy,
  newTabLabel,
}: {
  copy: Dictionary["interests"];
  newTabLabel: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const items: readonly Interest[] = copy.items;

  return (
    <section
      id="interests"
      className={`editorial-section ${styles.section}`}
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

        <div className={`${styles.layout} motion-section-content`}>
          <div className={styles.copy}>
            <ul className={styles.picker} aria-label={copy.regionLabel}>
              {items.map((interest, index) => (
                <li key={interest.title}>
                  <h3>
                    <button
                      type="button"
                      aria-pressed={index === activeIndex}
                      onClick={() => setActiveIndex(index)}
                      onPointerEnter={(event) => {
                        if (event.pointerType === "mouse") setActiveIndex(index);
                      }}
                    >
                      <span>{interest.title}</span>
                    </button>
                  </h3>
                </li>
              ))}
            </ul>

            {/* Every description shares one grid cell, so the tallest reserves the space and the list never moves. */}
            <div className={styles.details}>
              {items.map((interest, index) => (
                <p key={interest.title} data-active={index === activeIndex} aria-hidden={index !== activeIndex}>
                  {interest.description}
                </p>
              ))}
            </div>
          </div>

          <div className={styles.stage}>
            {items.map((interest, index) => (
              <div
                className={styles.pile}
                data-active={index === activeIndex}
                inert={index !== activeIndex}
                key={interest.title}
              >
                {interest.videos?.map((video) => {
                  const Icon = VIDEO_ICONS[video.icon];

                  return (
                    <a
                      className={`${styles.photo} ${styles.video}`}
                      href={video.href}
                      target="_blank"
                      rel="noreferrer"
                      key={video.channel}
                    >
                      <span className={styles.videoScreen}>
                        <Icon aria-hidden="true" />
                        <span className={styles.videoPlay} aria-hidden="true">
                          <LuPlay />
                        </span>
                      </span>
                      <span className={styles.videoCaption}>
                        <strong>{video.channel}</strong>
                        <small>{video.topic}</small>
                      </span>
                      <span className="sr-only"> · {newTabLabel}</span>
                    </a>
                  );
                })}
                {interest.images?.map((image) => (
                  <div className={styles.photo} key={image}>
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(max-width: 900px) 58vw, 360px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
