"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/app/components/system/Container";
import { SectionIntro } from "@/app/components/system/SectionIntro";
import type { Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/getDictionary";
import { SpaceBackdrop } from "@/app/components/system/SpaceBackdrop";

type ToolCopy = Dictionary["tools"];
type Rarity = "Rare" | "Epic" | "Legendary";

const RARITY_ORDER: Rarity[] = ["Legendary", "Epic", "Rare"];
const RARITY_LEVELS: Record<Rarity, number> = {
  Rare: 1,
  Epic: 2,
  Legendary: 3,
};

const MAX_TILT_DEG = 7;
const HOVER_LIFT_PX = -6;
/** Share of the remaining distance covered per 60 Hz frame; lower is softer. */
const POINTER_EASE = 0.14;

interface CardMotion {
  x: number;
  y: number;
  lift: number;
  targetX: number;
  targetY: number;
  targetLift: number;
  frame: number;
  lastTime: number;
}

const CARD_TRANSITION = {
  type: "spring" as const,
  stiffness: 360,
  damping: 30,
  mass: 0.8,
};

export function ToolsSection({ copy, locale }: { copy: ToolCopy; locale: Locale }) {
  const prefersReducedMotion = useReducedMotion();
  const items = copy.items;

  const cardMotions = useRef(new Map<HTMLElement, CardMotion>());

  useEffect(() => {
    const motions = cardMotions.current;
    return () => motions.forEach((state) => cancelAnimationFrame(state.frame));
  }, []);

  // Eases the card toward the pointer every frame instead of jumping to it, so
  // fast or jittery mouse movement still produces a smooth tilt.
  const animateCard = (card: HTMLElement, state: CardMotion) => {
    const step = (time: number) => {
      const elapsed = state.lastTime ? Math.min(time - state.lastTime, 50) : 1000 / 60;
      state.lastTime = time;
      const ease = 1 - Math.pow(1 - POINTER_EASE, elapsed / (1000 / 60));

      state.x += (state.targetX - state.x) * ease;
      state.y += (state.targetY - state.y) * ease;
      state.lift += (state.targetLift - state.lift) * ease;

      const settled =
        Math.abs(state.targetX - state.x) < 0.0005 &&
        Math.abs(state.targetY - state.y) < 0.0005 &&
        Math.abs(state.targetLift - state.lift) < 0.02;

      if (settled) {
        state.x = state.targetX;
        state.y = state.targetY;
        state.lift = state.targetLift;
      }

      card.style.setProperty("--pointer-x", `${(state.x * 100).toFixed(2)}%`);
      card.style.setProperty("--pointer-y", `${(state.y * 100).toFixed(2)}%`);
      if (!prefersReducedMotion) {
        card.style.setProperty("--tilt-x", `${((0.5 - state.y) * MAX_TILT_DEG).toFixed(3)}deg`);
        card.style.setProperty("--tilt-y", `${((state.x - 0.5) * MAX_TILT_DEG).toFixed(3)}deg`);
        card.style.setProperty("--lift", `${state.lift.toFixed(2)}px`);
      }

      if (settled) {
        state.frame = 0;
        state.lastTime = 0;
        return;
      }
      state.frame = requestAnimationFrame(step);
    };

    if (!state.frame) state.frame = requestAnimationFrame(step);
  };

  const getCardMotion = (card: HTMLElement) => {
    let state = cardMotions.current.get(card);
    if (!state) {
      state = {
        x: 0.5,
        y: 0.5,
        lift: 0,
        targetX: 0.5,
        targetY: 0.5,
        targetLift: 0,
        frame: 0,
        lastTime: 0,
      };
      cardMotions.current.set(card, state);
    }
    return state;
  };

  const trackPointer = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;

    const card = event.currentTarget;
    // Measure the untransformed slot: the card's own box moves as it tilts,
    // which would feed back into the pointer position and make it jitter.
    const rect = (card.parentElement ?? card).getBoundingClientRect();
    const state = getCardMotion(card);

    state.targetX = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    state.targetY = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
    state.targetLift = prefersReducedMotion ? 0 : HOVER_LIFT_PX;
    animateCard(card, state);
  };

  const releasePointer = (event: PointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const state = getCardMotion(card);

    state.targetX = 0.5;
    state.targetY = 0.5;
    state.targetLift = 0;
    animateCard(card, state);
  };

  return (
    <section
      id="tools"
      className="editorial-section tools-section"
      aria-labelledby="tools-heading"
    >
      <SpaceBackdrop variant="tools" />
      <Container>
        <SectionIntro
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
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
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
                  onPointerEnter={trackPointer}
                  onPointerMove={trackPointer}
                  onPointerLeave={releasePointer}
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
