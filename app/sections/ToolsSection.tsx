"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { Container } from "@/app/components/system/Container";
import { SectionIntro } from "@/app/components/system/SectionIntro";
import type { Dictionary } from "@/app/i18n/getDictionary";
import { SpaceBackdrop } from "@/app/components/system/SpaceBackdrop";
import { getToolStatIcon } from "./toolStatIcons";
import styles from "./ToolsSection.module.css";

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
const SHADOW_SHIFT_PX = 28;
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

/** Seconds between neighbouring cards being dealt, and between a card's sockets powering on. */
const DEAL_STAGGER = 0.09;
const SOCKET_STAGGER = 0.09;
/** How long after its deal starts a card has turned far enough to show its sockets. */
const SOCKETS_START = 0.7;

const DEAL_TRANSITION = {
  type: "spring" as const,
  stiffness: 90,
  damping: 16,
  mass: 0.9,
};

/**
 * Flips a card face-up as it's dealt. Which side shows follows the rotation itself:
 * Safari flattens this flip, so backface-visibility and depth can't be relied on.
 */
function DealtCard({
  column,
  delay,
  instant,
  children,
}: {
  column: number;
  delay: number;
  instant: boolean;
  children: ReactNode;
}) {
  const rotateY = useMotionValue(180);
  const backVisibility = useTransform(rotateY, (angle) => (angle > 90 ? "visible" : "hidden"));

  return (
    // Opacity would flatten the flip, so it stays on the slot around this.
    <motion.div
      className={styles.flipper}
      style={{ rotateY }}
      variants={{
        waiting: { rotateY: 180, rotateZ: (column - 1.5) * 3, y: -64, scale: 0.94 },
        dealt: {
          rotateY: 0,
          rotateZ: 0,
          y: 0,
          scale: 1,
          transition: instant ? { duration: 0 } : { ...DEAL_TRANSITION, delay },
        },
      }}
    >
      {children}
      <motion.div className={styles.cardBack} style={{ visibility: backVisibility }} aria-hidden="true">
        <span>JH</span>
      </motion.div>
    </motion.div>
  );
}

export function ToolsSection({ copy }: { copy: ToolCopy }) {
  const prefersReducedMotion = useReducedMotion();
  const items = copy.items;
  const [hoveredRarity, setHoveredRarity] = useState<Rarity | null>(null);
  const [pinnedRarity, setPinnedRarity] = useState<Rarity | null>(null);
  const spotlitRarity = hoveredRarity ?? pinnedRarity;

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
        // How far the card's layers have separated, and the shadow it casts away from the tilt.
        card.style.setProperty("--depth", (state.lift / HOVER_LIFT_PX).toFixed(3));
        card.style.setProperty("--shadow-x", `${((0.5 - state.x) * SHADOW_SHIFT_PX).toFixed(1)}px`);
        card.style.setProperty("--shadow-y", `${((0.5 - state.y) * SHADOW_SHIFT_PX).toFixed(1)}px`);
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

  // Pointer events land on the stationary slot, never on the moving card inside it.
  // A lifting card would otherwise slide out from under a still pointer and lose its hover.
  const trackPointer = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;

    const slot = event.currentTarget;
    const card = slot.querySelector<HTMLElement>("[data-tilt]");
    if (!card) return;

    const rect = slot.getBoundingClientRect();
    const state = getCardMotion(card);

    state.targetX = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    state.targetY = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
    state.targetLift = prefersReducedMotion ? 0 : HOVER_LIFT_PX;
    animateCard(card, state);
  };

  const releasePointer = (event: PointerEvent<HTMLElement>) => {
    const card = event.currentTarget.querySelector<HTMLElement>("[data-tilt]");
    if (!card) return;

    const state = getCardMotion(card);

    state.targetX = 0.5;
    state.targetY = 0.5;
    state.targetLift = 0;
    animateCard(card, state);
  };

  return (
    <section
      id="tools"
      className={`editorial-section ${styles.section}`}
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

        <div className={`${styles.register} motion-section-content`}>
          <div
            className={styles.rarities}
            role="list"
            aria-label={copy.rarityGuideLabel}
            // Cleared here, not per tile, so crossing the gap between tiles keeps the spotlight.
            onPointerLeave={() => setHoveredRarity(null)}
          >
            {RARITY_ORDER.map((rarity) => {
              const count = items.filter((item) => item.rarity === rarity).length;

              return (
                <div key={rarity} className={styles.raritySlot} role="listitem">
                  <button
                    type="button"
                    className={styles.rarityButton}
                    data-rarity={rarity.toLowerCase()}
                    aria-pressed={pinnedRarity === rarity}
                    onClick={() => setPinnedRarity((pinned) => (pinned === rarity ? null : rarity))}
                    onPointerEnter={(event) => {
                      trackPointer(event);
                      if (event.pointerType === "mouse") setHoveredRarity(rarity);
                    }}
                    onPointerMove={trackPointer}
                    onPointerLeave={releasePointer}
                  >
                    <span className={styles.rarityTile} data-tilt>
                    <span className={styles.foil} aria-hidden="true" />
                    {/* One miniature for each card of this rarity. */}
                    <span className={styles.stack} aria-hidden="true">
                      {Array.from({ length: count }, (_, cardIndex) => (
                        <span
                          key={cardIndex}
                          className={styles.miniCard}
                          style={
                            {
                              "--card-index": cardIndex,
                              "--card-offset": cardIndex - (count - 1) / 2,
                            } as React.CSSProperties
                          }
                        >
                          {cardIndex === count - 1 &&
                            Array.from(
                              { length: RARITY_LEVELS[rarity] },
                              (_, pipIndex) => <i key={pipIndex} />,
                            )}
                        </span>
                      ))}
                    </span>
                    <span className={styles.rarityText}>
                      <strong>{copy.rarities[rarity]}</strong>
                      <small>{copy.rarityNotes[rarity]}</small>
                    </span>
                    <b>{String(count).padStart(2, "0")}</b>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`${styles.grid} motion-section-content`}
          role="list"
          aria-label={copy.collectionLabel}
          data-spotlight={spotlitRarity?.toLowerCase()}
        >
          {items.map((item, index) => {
            const rarity = item.rarity as Rarity;
            const cardNumber = String(index + 1).padStart(2, "0");
            const total = String(items.length).padStart(2, "0");
            const column = index % 4;
            const dealDelay = prefersReducedMotion ? 0 : column * DEAL_STAGGER;

            return (
              <motion.div
                key={item.name}
                className={styles.slot}
                role="listitem"
                initial="waiting"
                whileInView="dealt"
                viewport={{ once: true, amount: 0.12 }}
                onPointerEnter={trackPointer}
                onPointerMove={trackPointer}
                onPointerLeave={releasePointer}
                variants={{
                  waiting: { opacity: 0 },
                  dealt: {
                    opacity: 1,
                    transition: { duration: prefersReducedMotion ? 0 : 0.18, delay: dealDelay },
                  },
                }}
              >
                <DealtCard column={column} delay={dealDelay} instant={prefersReducedMotion === true}>
                <article
                  className={styles.card}
                  data-rarity={rarity.toLowerCase()}
                  data-tool={item.name}
                  data-tilt
                >
                  <div className={styles.foil} aria-hidden="true" />
                  <div className={styles.dim} aria-hidden="true" />
                  <div className={styles.frame}>
                    <header className={styles.header}>
                      <span className={styles.number}>
                        № {cardNumber}<i>/</i>{total}
                      </span>
                      <span className={styles.rarity}>
                        <span aria-hidden="true">
                          {Array.from(
                            { length: RARITY_LEVELS[rarity] },
                            (_, pipIndex) => <i key={pipIndex} />,
                          )}
                        </span>
                        {copy.rarities[rarity]}
                      </span>
                    </header>

                    <div className={styles.art} aria-hidden="true">
                      {item.imageName ? (
                        <span className={styles.logo}>
                          <Image
                            src={`/img/tools/${item.imageName}.png`}
                            alt=""
                            width={112}
                            height={112}
                            sizes="112px"
                          />
                        </span>
                      ) : (
                        <span className={styles.monogram}>
                          {item.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div className={styles.identity}>
                      <p>{item.title}</p>
                      <h3>{item.name}</h3>
                    </div>

                    <p className={styles.flavor}>{item.flavor}</p>

                    <dl className={styles.traits} aria-label={copy.traitsLabel}>
                      {item.stats.map((stat, statIndex) => {
                        const icon = getToolStatIcon(item.name, statIndex);

                        return (
                          <motion.div
                            key={stat.label}
                            variants={{
                              waiting: { opacity: 0, scale: 0.8 },
                              dealt: {
                                opacity: 1,
                                scale: 1,
                                transition: prefersReducedMotion
                                  ? { duration: 0 }
                                  : {
                                      ...DEAL_TRANSITION,
                                      stiffness: 260,
                                      delay: dealDelay + SOCKETS_START + statIndex * SOCKET_STAGGER,
                                    },
                              },
                            }}
                          >
                            <dt>
                              {icon && (
                                <span
                                  className={styles.socket}
                                  data-animation={icon.animation}
                                  style={
                                    {
                                      "--stat-color": icon.color,
                                      "--stat-index": statIndex,
                                    } as React.CSSProperties
                                  }
                                  aria-hidden="true"
                                >
                                  <icon.Icon />
                                </span>
                              )}
                              {stat.label}
                            </dt>
                            <dd>{stat.value}</dd>
                          </motion.div>
                        );
                      })}
                    </dl>

                    <footer className={styles.footer}>
                      <span>{item.category}</span>
                    </footer>
                  </div>
                </article>
                </DealtCard>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
