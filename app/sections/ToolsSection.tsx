"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { Container } from "@/app/components/system/Container";
import { SectionIntro } from "@/app/components/system/SectionIntro";
import type { Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/getDictionary";

type ToolCopy = Dictionary["tools"];

const FEATURED_TOOLS = new Set([
  "TypeScript",
  "Node.js",
  "NestJS",
  "Next.js",
  "React",
  "PostgreSQL",
  "Docker",
  "Sentry",
]);

const SNAPPY_SPRING = {
  type: "spring" as const,
  stiffness: 520,
  damping: 38,
  mass: 0.72,
};

const CARD_TRANSITION = {
  layout: SNAPPY_SPRING,
  opacity: { duration: 0.14, ease: "easeOut" as const },
  y: SNAPPY_SPRING,
  scale: SNAPPY_SPRING,
};

export function ToolsSection({ copy, locale }: { copy: ToolCopy; locale: Locale }) {
  const [category, setCategory] = useState<string>(copy.featured);
  const prefersReducedMotion = useReducedMotion();
  const items = useMemo(() => {
    if (category === copy.featured) {
      return copy.items.filter((item) => FEATURED_TOOLS.has(item.name));
    }
    if (category === copy.all) return copy.items;
    return copy.items.filter((item) => item.category === category);
  }, [category, copy]);

  const filters = [copy.featured, ...copy.categories, copy.all];
  const resultsLabel = locale === "ja"
    ? `${items.length}${copy.resultsLabel}`
    : `${items.length} ${copy.resultsLabel}`;

  return (
    <section
      id="tools"
      className="editorial-section tools-section"
      aria-labelledby="tools-heading"
    >
      <Container>
        <SectionIntro
          label={copy.label}
          title={copy.title}
          description={copy.description}
          id="tools-heading"
          align="split"
        />

        <LayoutGroup id="tools-filter">
          <div className="tool-filter" role="group" aria-label={copy.filterLabel}>
            {filters.map((item) => {
              const isActive = category === item;

              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => setCategory(item)}
                  aria-pressed={isActive}
                >
                  {isActive ? (
                    <motion.span
                      className="tool-filter__selection"
                      layoutId="tool-filter-selection"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : SNAPPY_SPRING
                      }
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="tool-filter__label">{item}</span>
                </button>
              );
            })}
          </div>

          <motion.div
            className="tool-card-grid"
            layout={prefersReducedMotion ? false : true}
            transition={{ layout: SNAPPY_SPRING }}
          >
            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {resultsLabel}
            </p>
            <AnimatePresence mode="popLayout" initial={false}>
              {items.map((item) => (
                <motion.article
                  key={item.name}
                  className="tool-card"
                  data-rarity={item.rarity.toLowerCase()}
                  layout={prefersReducedMotion ? false : "position"}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 10, scale: 0.97 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 6, scale: 0.98 }
                  }
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: -5,
                          scale: 1.01,
                          transition: SNAPPY_SPRING,
                        }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : CARD_TRANSITION
                  }
                >
                  <div className="tool-card__shine" aria-hidden="true" />
                  <header className="tool-card__header">
                    <span>{item.category}</span>
                    <span>
                      {copy.rarities[
                        item.rarity as keyof typeof copy.rarities
                      ] ?? item.rarity}
                    </span>
                  </header>

                  <div className="tool-card__identity">
                    {item.imageName ? (
                      <span className="tool-card__logo" aria-hidden="true">
                        <Image
                          src={`/img/tools/${item.imageName}.png`}
                          alt=""
                          width={72}
                          height={72}
                          style={{ width: "auto", height: "auto" }}
                        />
                      </span>
                    ) : (
                      <span className="tool-card__monogram" aria-hidden="true">
                        {item.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.title}</p>
                    </div>
                  </div>

                  <p className="tool-card__flavor">{item.flavor}</p>

                  <dl className="tool-card__stats">
                    {item.stats.map((stat) => (
                      <div key={stat.label}>
                        <dt>{stat.label}</dt>
                        <dd>{stat.value}</dd>
                      </div>
                    ))}
                  </dl>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </Container>
    </section>
  );
}
