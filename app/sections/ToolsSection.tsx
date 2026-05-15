"use client";

import Image from "next/image";
import { SectionHeading } from "@/app/components/SectionHeading";
import {
  toolsSectionContent,
  type Tool,
  type ToolCategory,
} from "@/app/data/toolsSection";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import {
  useState,
  useEffect,
  useRef,
  useMemo,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { FaTools } from "react-icons/fa";

const TOOL_CARD_SPRING = {
  stiffness: 180,
  damping: 18,
  mass: 0.7,
};

const toolCategoryStyles: Record<
  ToolCategory,
  {
    badge: string;
    borderGlow: string;
    halo: string;
    glow: string;
    statValue: string;
  }
> = {
  Frameworks: {
    badge: "border-sky-300/25 bg-sky-400/10 text-sky-100",
    borderGlow: "from-sky-300/25 via-white/5 to-cyan-300/20",
    halo: "from-sky-400/22 via-cyan-300/10 to-transparent",
    glow: "rgba(56, 189, 248, 0.34)",
    statValue: "text-sky-100",
  },
  Libraries: {
    badge: "border-amber-300/30 bg-amber-300/10 text-amber-100",
    borderGlow: "from-amber-300/25 via-orange-300/10 to-rose-300/20",
    halo: "from-amber-300/24 via-orange-300/12 to-transparent",
    glow: "rgba(251, 191, 36, 0.34)",
    statValue: "text-amber-100",
  },
  Platform: {
    badge: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
    borderGlow: "from-emerald-300/25 via-cyan-300/10 to-blue-300/20",
    halo: "from-emerald-300/24 via-cyan-300/10 to-transparent",
    glow: "rgba(52, 211, 153, 0.32)",
    statValue: "text-emerald-100",
  },
  "Cloud & Ops": {
    badge: "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
    borderGlow: "from-cyan-300/25 via-sky-300/10 to-blue-300/20",
    halo: "from-cyan-300/24 via-sky-300/10 to-transparent",
    glow: "rgba(34, 211, 238, 0.32)",
    statValue: "text-cyan-100",
  },
  Tools: {
    badge: "border-indigo-300/25 bg-indigo-400/10 text-indigo-100",
    borderGlow: "from-indigo-300/25 via-slate-200/8 to-sky-300/20",
    halo: "from-indigo-300/24 via-sky-300/10 to-transparent",
    glow: "rgba(129, 140, 248, 0.34)",
    statValue: "text-indigo-100",
  },
  Other: {
    badge: "border-rose-300/25 bg-rose-400/10 text-rose-100",
    borderGlow: "from-rose-300/25 via-orange-300/10 to-yellow-200/20",
    halo: "from-rose-300/24 via-orange-300/12 to-transparent",
    glow: "rgba(251, 113, 133, 0.32)",
    statValue: "text-rose-100",
  },
};

const rarityStyles = {
  Common: "border-white/15 bg-white/8 text-white/75",
  Rare: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  Epic: "border-sky-300/25 bg-sky-300/10 text-sky-100",
  Legendary: "border-amber-300/30 bg-amber-300/10 text-amber-100",
} as const;

export function ToolsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | null>(null);
  const [activeToolName, setActiveToolName] = useState<string | null>(null);
  const [isTouchMode, setIsTouchMode] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridHeight, setGridHeight] = useState(0);
  const stableToolIndexes = useMemo(
    () =>
      new Map(
        toolsSectionContent.items.map((tool, index) => [tool.name, index + 1])
      ),
    []
  );
  /**
   * Memoized grid height calculation function to prevent unnecessary recalculations
   * when component re-renders. Only recreates when selectedCategory changes.
   */
  const calculateGridHeight = useMemo(() => {
    return () => {
      if (!gridRef.current) return;

      const items = toolsSectionContent.items.filter(
        (tool) => !selectedCategory || tool.category === selectedCategory
      );
      const columns =
        window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 3 : 2;
      const rows = Math.ceil(items.length / columns);

      // Calculate height based on 155px per row (including gap)
      const calculatedHeight = rows * 170;
      setGridHeight(Math.max(calculatedHeight, 400)); // Enforce minimum height of 400px
    };
  }, [selectedCategory]);

  /**
   * Effect hook to handle grid height calculations and window resize events.
   * Ensures the grid maintains proper dimensions based on content and viewport.
   */
  useEffect(() => {
    calculateGridHeight();

    window.addEventListener("resize", calculateGridHeight);

    return () => {
      window.removeEventListener("resize", calculateGridHeight);
    };
  }, [calculateGridHeight]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");

    const syncTouchMode = (event?: MediaQueryListEvent) => {
      const nextIsTouchMode = event?.matches ?? mediaQuery.matches;
      setIsTouchMode(nextIsTouchMode);

      if (!nextIsTouchMode) {
        setActiveToolName(null);
      }
    };

    syncTouchMode();
    mediaQuery.addEventListener("change", syncTouchMode);

    return () => {
      mediaQuery.removeEventListener("change", syncTouchMode);
    };
  }, []);

  useEffect(() => {
    setActiveToolName(null);
  }, [selectedCategory]);

  return (
    <section
      className="py-16 sm:py-20 md:py-28 relative overflow-hidden"
      id="tools"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#121212]/90 via-[#0a2535]/85 to-[#121212]/90 backdrop-blur-md -z-10"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <SectionHeading
          title={toolsSectionContent.title}
          icon={FaTools}
          gradient="from-orange-500/40 to-orange-300/40"
        />

        {/* Category selector */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {toolsSectionContent.categories.map((category) => (
            <motion.button
              key={category}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category ? null : category
                )
              }
              className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
                ${
                  selectedCategory === category
                    ? "bg-blue-500/20 text-blue-200 border border-blue-500/30"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white/90 border border-white/10"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Tools grid */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 auto-rows-[140px] sm:auto-rows-[160px]"
          animate={{ height: gridHeight }}
          transition={{ duration: 0.4 }}
        >
          <LayoutGroup>
            <AnimatePresence mode="popLayout">
              {toolsSectionContent.items.filter(
                (tool) =>
                  !selectedCategory || tool.category === selectedCategory
              ).map((tool) => (
                <motion.div
                  key={tool.name}
                  layout="position"
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.7,
                    y: -20,
                  }}
                  transition={{
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.4, type: "spring", bounce: 0.3 },
                    y: { duration: 0.4, type: "spring", bounce: 0.3 },
                    layout: {
                      type: "spring",
                      damping: 20,
                      stiffness: 200,
                    },
                  }}
                  className={tool.hideText ? "row-span-1.5" : ""}
                >
                  <ToolItem
                    item={tool}
                    stableIndex={stableToolIndexes.get(tool.name) ?? 0}
                    isPinned={activeToolName === tool.name}
                    isTouchMode={isTouchMode}
                    onTogglePinned={() =>
                      setActiveToolName((current) =>
                        current === tool.name ? null : tool.name
                      )
                    }
                    onClose={() =>
                      setActiveToolName((current) =>
                        current === tool.name ? null : current
                      )
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </LayoutGroup>
        </motion.div>
      </div>
    </section>
  );
}

function ToolItem({
  item,
  stableIndex,
  isPinned,
  isTouchMode,
  onTogglePinned,
  onClose,
}: {
  item: Tool;
  stableIndex: number;
  isPinned: boolean;
  isTouchMode: boolean;
  onTogglePinned: () => void;
  onClose: () => void;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [viewportOffset, setViewportOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const expandedShellRef = useRef<HTMLDivElement>(null);
  const viewportOffsetRef = useRef(viewportOffset);
  const rotateX = useSpring(0, TOOL_CARD_SPRING);
  const rotateY = useSpring(0, TOOL_CARD_SPRING);
  const shineOpacity = useSpring(0, {
    stiffness: 200,
    damping: 24,
    mass: 0.8,
  });
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);

  const accent = toolCategoryStyles[item.category ?? "Frameworks"];
  const isExpanded = isHovering || isPinned;
  const foilBackground = useMotionTemplate`
    radial-gradient(circle at ${pointerX}% ${pointerY}%, ${accent.glow} 0%, rgba(255,255,255,0.12) 14%, transparent 42%),
    linear-gradient(140deg, rgba(255,255,255,0.16), rgba(255,255,255,0.02) 34%, transparent 70%)
  `;

  const updateViewportOffset = (nextOffset: { x: number; y: number }) => {
    viewportOffsetRef.current = nextOffset;
    setViewportOffset(nextOffset);
  };

  const resetCard = () => {
    setIsHovering(false);
    rotateX.set(0);
    rotateY.set(0);
    pointerX.set(50);
    pointerY.set(50);
    shineOpacity.set(0);
  };

  const centerExpandedCard = () => {
    if (!isTouchMode || !isExpanded) {
      updateViewportOffset({ x: 0, y: 0 });
      return;
    }

    if (prefersReducedMotion) {
      updateViewportOffset({ x: 0, y: 0 });
      return;
    }

    const shell = expandedShellRef.current;
    if (!shell) return;

    const rect = shell.getBoundingClientRect();
    const viewport = window.visualViewport;
    const viewportCenterX =
      (viewport?.offsetLeft ?? 0) + (viewport?.width ?? window.innerWidth) / 2;
    const viewportCenterY =
      (viewport?.offsetTop ?? 0) + (viewport?.height ?? window.innerHeight) / 2;
    const cardCenterX = rect.left + rect.width / 2 - viewportOffsetRef.current.x;
    const cardCenterY = rect.top + rect.height / 2 - viewportOffsetRef.current.y;

    updateViewportOffset({
      x: viewportCenterX - cardCenterX,
      y: viewportCenterY - cardCenterY,
    });
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (isTouchMode) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    const centeredX = x - 50;
    const centeredY = y - 50;

    pointerX.set(x);
    pointerY.set(y);

    if (prefersReducedMotion) {
      rotateX.set(0);
      rotateY.set(0);
      shineOpacity.set(0);
      return;
    }

    rotateY.set(centeredX / 4.2);
    rotateX.set(-centeredY / 3.8);
    shineOpacity.set(1);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncReducedMotion = (event?: MediaQueryListEvent) => {
      setPrefersReducedMotion(event?.matches ?? mediaQuery.matches);
    };

    syncReducedMotion();
    mediaQuery.addEventListener("change", syncReducedMotion);

    return () => {
      mediaQuery.removeEventListener("change", syncReducedMotion);
    };
  }, []);

  useEffect(() => {
    centerExpandedCard();

    if (!isTouchMode || !isExpanded) {
      return;
    }

    const rafId = window.requestAnimationFrame(centerExpandedCard);
    window.addEventListener("resize", centerExpandedCard);
    window.visualViewport?.addEventListener("resize", centerExpandedCard);
    window.visualViewport?.addEventListener("scroll", centerExpandedCard);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", centerExpandedCard);
      window.visualViewport?.removeEventListener("resize", centerExpandedCard);
      window.visualViewport?.removeEventListener("scroll", centerExpandedCard);
    };
  }, [isExpanded, isTouchMode, prefersReducedMotion]);

  useEffect(() => {
    if (!isTouchMode || !isPinned) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!cardRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isPinned, isTouchMode, onClose]);

  return (
    <motion.div
      ref={cardRef}
      className={`group relative h-full overflow-visible [perspective:1400px] ${
        isExpanded ? "z-30" : "hover:z-30"
      }`}
      whileTap={{ scale: isTouchMode ? 0.98 : 0.95 }}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onClick={onTogglePinned}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onTogglePinned();
        }
      }}
    >
      <motion.div
        className="relative h-full overflow-visible will-change-transform"
        onHoverStart={() => {
          if (!isTouchMode) {
            setIsHovering(true);
          }
        }}
        onHoverEnd={() => {
          if (!isTouchMode) {
            resetCard();
          }
        }}
        onPointerLeave={() => {
          if (!isTouchMode) {
            resetCard();
          }
        }}
        onPointerMove={handlePointerMove}
        animate={{
          x: isTouchMode ? viewportOffset.x : 0,
          y: isTouchMode ? viewportOffset.y : isExpanded ? -18 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br ${accent.halo} blur-2xl transition-all duration-300 ${
            isExpanded
              ? "h-[calc(100%+8.5rem)] w-[calc(100%+5.5rem)] rounded-[1.85rem] opacity-100"
              : "h-[calc(100%+1rem)] w-[calc(100%+1rem)] rounded-[1rem] opacity-0"
          }`}
          aria-hidden="true"
        />

        <div
          ref={expandedShellRef}
          className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white/10 transition-all duration-300 ${
            isExpanded
              ? "h-[calc(100%+7rem)] w-[min(calc(100vw-1.5rem),calc(100%+4rem))] rounded-[1.6rem] bg-white/[0.08] p-5 shadow-[0_34px_90px_rgba(0,0,0,0.48)] sm:h-[calc(100%+8rem)] sm:w-[calc(100%+4.5rem)] sm:p-6"
              : "h-full w-full rounded-[1rem] bg-white/5 p-4 sm:p-6"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className={`pointer-events-none absolute inset-0 rounded-[inherit] bg-slate-950/35 backdrop-blur-xl transition-opacity duration-300 ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          />

          <div
            className={`pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br ${accent.borderGlow} transition-opacity duration-300 ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          />

          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-screen"
            style={{
              opacity: shineOpacity,
              backgroundImage: foilBackground,
            }}
            aria-hidden="true"
          />

          <div
            className={`pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          >
            <div className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_35%,rgba(255,255,255,0.06))]" />
            <div className="absolute inset-0 rounded-[inherit] bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.06)_0,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_12px)] opacity-30" />
          </div>

          <div
            className="relative z-10 h-full w-full rounded-[inherit]"
            style={{ transform: "translateZ(44px)" }}
          >
            <motion.div
              className="relative flex h-full flex-col items-center justify-center space-y-2 sm:space-y-4"
              animate={
                isExpanded
                  ? { opacity: 0.12, scale: 0.82, y: -24 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="relative">
                {item.imageName ? (
                  <Image
                    width={item.hideText ? 80 : 60}
                    height={item.hideText ? 80 : 60}
                    className={`${
                      item.hideText
                        ? "h-[100px] w-[100px] sm:h-[120px] sm:w-[120px]"
                        : "h-[60px] w-[60px] sm:h-[80px] sm:w-[80px]"
                    } rounded-2xl object-contain transition-transform duration-300 ${
                      isExpanded ? "scale-110" : "scale-100"
                    }`}
                    src={"/img/tools/" + item.imageName + ".png"}
                    alt={item.name}
                  />
                ) : (
                  <div
                    className={`flex items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-center font-semibold uppercase tracking-[0.18em] text-white/80 transition-transform duration-300 ${
                      item.hideText
                        ? "h-[100px] w-[100px] text-2xl sm:h-[120px] sm:w-[120px] sm:text-3xl"
                        : "h-[60px] w-[60px] text-base sm:h-[80px] sm:w-[80px] sm:text-xl"
                    } ${isExpanded ? "scale-110" : "scale-100"}`}
                    aria-label={item.name}
                  >
                    {getToolMonogram(item.name)}
                  </div>
                )}
                <div
                  className={`absolute inset-0 bg-blue-500/20 blur-xl transition-opacity duration-300 ${
                    isExpanded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              {!item.hideText && (
                <span
                  className={`text-center text-sm font-medium transition-colors sm:text-lg ${
                    isExpanded ? "text-blue-200/90" : "text-white/90"
                  }`}
                >
                  {item.name}
                </span>
              )}
            </motion.div>
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]"
            style={{ transform: "translateZ(72px)" }}
          >
            <div className="flex h-full items-center justify-center">
              <motion.div
                className="flex h-62 w-59 flex-col justify-between p-4 sm:h-70 sm:w-68 sm:p-5"
                initial={false}
                animate={
                  isExpanded
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.96, y: 18 }
                }
                transition={{
                  duration: isExpanded ? 0.22 : 0.16,
                  delay: isExpanded ? 0.14 : 0,
                  ease: "easeOut",
                }}
              >
                <div className="min-w-0 space-y-2">
                    <div className="flex flex-nowrap gap-2">
                      <span
                        className={`whitespace-nowrap rounded-full border px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.24em] ${accent.badge}`}
                      >
                        {item.category}
                      </span>
                      <span
                        className={`whitespace-nowrap rounded-full border px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.24em] ${rarityStyles[item.rarity]}`}
                      >
                        {item.rarity}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <p className="truncate whitespace-nowrap text-sm font-semibold text-white sm:text-base">
                        {item.name}
                      </p>
                      <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.28em] text-white/55 sm:text-[11px]">
                        {item.title}
                      </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {item.stats.map((stat, statIndex) => (
                    <div
                      key={stat.label}
                      className={`rounded-lg border border-white/10 bg-black/20 px-2.5 py-2 ${
                        statIndex === 2 ? "col-span-2" : ""
                      }`}
                    >
                      <p className="text-[8px] uppercase tracking-[0.24em] text-white/45 sm:text-[9px]">
                        {stat.label}
                      </p>
                      <p
                        className={`mt-1 text-xs font-semibold sm:text-sm ${accent.statValue}`}
                      >
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <p className="max-w-[75%] text-[10px] leading-snug text-white/66 sm:text-[11px]">
                    {item.flavor}
                  </p>
                  <span className="rounded-full border border-white/10 bg-white/6 px-2 py-1 text-[9px] font-medium text-white/45 sm:text-[10px]">
                    #{String(stableIndex).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function getToolMonogram(name: string) {
  return name
    .split(/[\s./-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
