"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/app/components/system/Container";
import { SectionIntro } from "@/app/components/system/SectionIntro";
import type { Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/getDictionary";

type ToolCopy = Dictionary["tools"];
type Rarity = "Rare" | "Epic" | "Legendary";

const RARITY_ORDER: Rarity[] = ["Legendary", "Epic", "Rare"];
const RARITY_LEVELS: Record<Rarity, number> = {
  Rare: 1,
  Epic: 2,
  Legendary: 3,
};

const CARD_TRANSITION = {
  type: "spring" as const,
  stiffness: 360,
  damping: 30,
  mass: 0.8,
};

export function ToolsSection({ copy, locale }: { copy: ToolCopy; locale: Locale }) {
  const prefersReducedMotion = useReducedMotion();
  const items = copy.items;

  return (
    <section
      id="tools"
      className="editorial-section tools-section"
      aria-labelledby="tools-heading"
    >
      <Container>
        <SectionIntro
          number="04"
          label={copy.label}
          title={copy.title}
          description={copy.description}
          id="tools-heading"
          align="split"
        />

        <div className="tool-deck__register motion-section-content">
          <div className="tool-deck__edition">
            <span>{copy.deckLabel}</span>
            <strong>{copy.completeSet}</strong>
          </div>

          <div
            className="tool-deck__rarities"
            role="list"
            aria-label={copy.rarityGuideLabel}
          >
            {RARITY_ORDER.map((rarity) => {
              const count = items.filter((item) => item.rarity === rarity).length;

              return (
                <div
                  key={rarity}
                  role="listitem"
                  data-rarity={rarity.toLowerCase()}
                >
                  <span className="tool-deck__rarity-mark" aria-hidden="true">
                    {Array.from(
                      { length: RARITY_LEVELS[rarity] },
                      (_, index) => <i key={index} />,
                    )}
                  </span>
                  <span>
                    <strong>{copy.rarities[rarity]}</strong>
                    <small>{copy.rarityNotes[rarity]}</small>
                  </span>
                  <b>{String(count).padStart(2, "0")}</b>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="tool-card-grid motion-section-content"
          role="list"
          aria-label={copy.collectionLabel}
        >
          {items.map((item, index) => {
            const rarity = item.rarity as Rarity;
            const cardNumber = String(index + 1).padStart(2, "0");
            const total = String(items.length).padStart(2, "0");

            return (
              <motion.div
                key={item.name}
                className="tool-card-slot"
                role="listitem"
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 24, scale: 0.97 }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { ...CARD_TRANSITION, delay: (index % 4) * 0.055 }
                }
              >
                <article
                  className="tool-card"
                  data-rarity={rarity.toLowerCase()}
                  data-tool={item.name}
                >
                  <div className="tool-card__foil" aria-hidden="true" />
                  <div className="tool-card__frame">
                    <header className="tool-card__header">
                      <span className="tool-card__number">
                        № {cardNumber}<i>/</i>{total}
                      </span>
                      <span className="tool-card__rarity">
                        <span aria-hidden="true">
                          {Array.from(
                            { length: RARITY_LEVELS[rarity] },
                            (_, pipIndex) => <i key={pipIndex} />,
                          )}
                        </span>
                        {copy.rarities[rarity]}
                      </span>
                    </header>

                    <div className="tool-card__art" aria-hidden="true">
                      <span className="tool-card__art-grid" />
                      <span className="tool-card__glyph">
                        {item.name.slice(0, 2).toUpperCase()}
                      </span>
                      <span className="tool-card__orbit tool-card__orbit--outer" />
                      <span className="tool-card__orbit tool-card__orbit--inner" />
                      {item.imageName ? (
                        <span className="tool-card__logo">
                          <Image
                            src={`/img/tools/${item.imageName}.png`}
                            alt=""
                            width={112}
                            height={112}
                            sizes="112px"
                          />
                        </span>
                      ) : (
                        <span className="tool-card__monogram">
                          {item.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                      <span className="tool-card__category">{item.category}</span>
                    </div>

                    <div className="tool-card__identity">
                      <p>{item.title}</p>
                      <h3>{item.name}</h3>
                    </div>

                    <p className="tool-card__flavor">{item.flavor}</p>

                    <dl className="tool-card__traits" aria-label={copy.traitsLabel}>
                      {item.stats.map((stat) => (
                        <div key={stat.label}>
                          <dt>{stat.label}</dt>
                          <dd>{stat.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <footer className="tool-card__footer">
                      <span>{copy.editionLabel}</span>
                      <span>{locale === "ja" ? `JH・${cardNumber}` : `JH · ${cardNumber}`}</span>
                    </footer>
                  </div>
                </article>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
