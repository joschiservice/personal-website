"use client";

import Image from "next/image";
import { SectionHeading } from "@/app/components/SectionHeading";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { useState, useEffect, useRef, useMemo } from "react";
import { FaTools } from "react-icons/fa";

interface Tool {
  name: string;
  hideText?: boolean;
  category?: "IDE" | "AI" | "Framework" | "Platform" | "Service";
}

const TOOLS: Tool[] = [
  // Frameworks
  {
    name: "React.js",
    category: "Framework",
  },
  {
    name: "Next.js",
    category: "Framework",
    hideText: true,
  },
  {
    name: "Nest.js",
    category: "Framework",
  },
  {
    name: "TailwindCSS",
    category: "Framework",
  },
  {
    name: "Laravel",
    category: "Framework",
  },

  // IDEs - Development environments
  {
    name: "WebStorm",
    category: "IDE",
  },
  {
    name: "Cursor",
    category: "IDE",
  },
  {
    name: "XCode",
    category: "IDE",
  },

  // Platforms - Deployment and hosting
  {
    name: "Vercel",
    category: "Platform",
    hideText: true,
  },
  {
    name: "GitHub",
    category: "Platform",
  },
  {
    name: "DigitalOcean",
    category: "Platform",
  },
  {
    name: "Shopify",
    category: "Platform",
  },

  // Services and AI tools
  {
    name: "Sentry",
    category: "Service",
  },
  {
    name: "ChatGPT",
    category: "AI",
  },
];

const categories = ["IDE", "AI", "Framework", "Platform", "Service"];

export function ToolsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridHeight, setGridHeight] = useState(0);
  /**
   * Memoized grid height calculation function to prevent unnecessary recalculations
   * when component re-renders. Only recreates when selectedCategory changes.
   */
  const calculateGridHeight = useMemo(() => {
    return () => {
      if (!gridRef.current) return;

      const items = TOOLS.filter(
        (tool) => !selectedCategory || tool.category === selectedCategory
      );
      const columns =
        window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 2;
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
          title="Tools, Frameworks & Services"
          icon={FaTools}
          gradient="from-orange-500/40 to-orange-300/40"
        />

        {/* Category selector */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {categories.map((category) => (
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
              {TOOLS.filter(
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
                  <ToolItem item={tool} />
                </motion.div>
              ))}
            </AnimatePresence>
          </LayoutGroup>
        </motion.div>
      </div>
    </section>
  );
}

function ToolItem({ item }: { item: Tool }) {
  return (
    <motion.div
      className="group relative h-full"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-4 sm:p-6 h-full flex items-center justify-center">
        {/* Hover effects */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0
          group-hover:from-blue-500/5 group-hover:via-blue-500/5 group-hover:to-blue-500/5
          transition-all duration-500"
        ></div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-out"
          ></div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center space-y-2 sm:space-y-4">
          <div className="relative">
            <Image
              width={item.hideText ? 80 : 60}
              height={item.hideText ? 80 : 60}
              className={`${
                item.hideText
                  ? "w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]"
                  : "w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]"
              } object-contain transition-transform duration-300 group-hover:scale-110 rounded-2xl`}
              src={"/img/tools/" + item.name + ".png"}
              alt={item.name}
            />
            {/* Glow effect */}
            <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {!item.hideText && (
            <span className="text-sm sm:text-lg font-medium text-white/90 group-hover:text-blue-200/90 transition-colors text-center">
              {item.name}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
