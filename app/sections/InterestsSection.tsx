"use client";

import { SectionHeading } from "@/app/components/SectionHeading";
import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { motion, type Transition, useDragControls } from "motion/react";
import { useState, useCallback, memo } from "react";

/**
 * Represents an interest item with its display properties
 */
interface Interest {
  title: string;
  description: string;
  image: string;
  color: string;
  icon?: string;
}

/**
 * Static data for personal interests
 */
const INTERESTS: Interest[] = [
  {
    title: "日本 (Japan)",
    description:
      "My bank account has a recurring 'Japan trip' category that's seen more action than my grocery budget. Four spontaneous trips last year (one because I literally changed flight plans mid-journey) and I'm now learning Japanese daily - though my vocabulary is suspiciously focused on food-ordering phrases. From getting lost in bamboo forests to accidentally ordering mysterious dishes that turned out delicious, I'm hopelessly addicted to Japan's culture, cuisine, and breathtaking landscapes. My friends now introduce me as 'our friend who will somehow relate this conversation to Japan in 3... 2... 1...'",
    image: "/img/interests/Japan.png",
    color: "from-red-500/40 to-red-300/40",
    icon: "🗾",
  },
  {
    title: "Aviation",
    description:
      "Obsessed with aviation to the point where my bank account files complaints about my flight sim addon purchases. Proud Lufthansa Group frequent flyer who can identify an A350 by its engine sound alone (the best aircraft ever built, obviously). My YouTube algorithm has given up suggesting anything non-aviation related. Whether I'm executing a perfect butter landing in the sim or watching yet another 'worst turbulence ever' video, my head is perpetually in the clouds.",
    image: "/img/interests/Aviation.png",
    color: "from-blue-500/40 to-blue-300/40",
    icon: "✈️",
  },
  {
    title: "Software Development",
    description:
      "Obviously, right? A deep passion for creating elegant solutions to complex problems. From web applications to mobile apps, I can get locked in for hours, forgetting that food and sleep exist. The thrill of building something from scratch and seeing it come to life is unmatched. I thrive on staying ahead of the curve - because who doesn't love spending weekends learning a framework that'll be obsolete next month?",
    image: "/img/interests/Coding.png",
    color: "from-purple-500/40 to-purple-300/40",
    icon: "💻",
  },
];

const SPRING_TRANSITION: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
};

const TAP_TRANSITION: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 17,
};

/**
 * InterestsSection component displays a carousel of personal interests
 * with interactive 3D card effects and swipe navigation
 */
export function InterestsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragControls = useDragControls();

  /**
   * Handles pagination through the carousel
   * @param newDirection - Direction to paginate (1 for next, -1 for previous)
   */
  const paginate = useCallback((newDirection: number) => {
    setCurrentIndex(
      (prev) => (prev + newDirection + INTERESTS.length) % INTERESTS.length
    );
  }, []);

  /**
   * Handles keyboard navigation for the carousel
   * @param event - Keyboard event
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      paginate(-1);
    } else if (event.key === 'ArrowRight') {
      paginate(1);
    }
  }, [paginate]);

  /**
   * Calculates the position for each card in the carousel
   * @param index - Index of the interest item
   * @returns Position value (-1, 0, or 1)
   */
  const getItemPosition = useCallback((index: number) => {
    const diff = index - currentIndex;
    if (diff === 0) return 0;
    if (diff === 1 || diff < -1) return 1;
    return -1;
  }, [currentIndex]);

  const handleDragEnd = useCallback((info: any) => {
    const threshold = 50; // Minimum distance to trigger swipe
    if (Math.abs(info.offset.x) > threshold) {
      paginate(info.offset.x > 0 ? -1 : 1);
    }
  }, [paginate]);

  const handleIndicatorClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <section
      className="py-12 sm:py-20 md:py-28 relative overflow-hidden"
      id="interests"
      aria-labelledby="interests-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <SectionHeading
          title="Interests & Passions"
          icon={FaHeart}
          gradient="from-pink-500/40 to-pink-300/40"
          id="interests-heading"
        />

        <div
          className="relative h-[500px] sm:h-[600px] md:h-[700px] mt-8 sm:mt-12 focus:outline-none"
          role="region"
          aria-roledescription="carousel"
          aria-label="Personal interests"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative h-full flex items-center justify-center">
            {INTERESTS.map((interest, index) => {
              const position = getItemPosition(index);
              return (
                <motion.div
                  key={index}
                  className="absolute w-full max-w-4xl h-[400px] sm:h-[500px] md:h-[600px]"
                  initial={false}
                  animate={{
                    x: `${position * 100}%`,
                    scale: position === 0 ? 1 : 0.8,
                    opacity: position === 0 ? 1 : 0.5,
                    zIndex: position === 0 ? 2 : 1,
                  }}
                  transition={SPRING_TRANSITION}
                  drag="x"
                  dragControls={dragControls}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => handleDragEnd(info)}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${INTERESTS.length}`}
                  aria-hidden={position !== 0}
                >
                  <InterestCard interest={interest} />
                </motion.div>
              );
            })}
          </div>

          {/* Navigation controls */}
          <motion.button
            onClick={() => paginate(-1)}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hidden sm:block"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            aria-label="Previous slide"
          >
            <motion.div
              whileTap={{ x: -5 }}
              transition={TAP_TRANSITION}
            >
              <FaChevronLeft className="text-white text-lg sm:text-xl" aria-hidden="true" />
            </motion.div>
          </motion.button>
          <motion.button
            onClick={() => paginate(1)}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hidden sm:block"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            aria-label="Next slide"
          >
            <motion.div
              whileTap={{ x: 5 }}
              transition={TAP_TRANSITION}
            >
              <FaChevronRight className="text-white text-lg sm:text-xl" aria-hidden="true" />
            </motion.div>
          </motion.button>

          {/* Pagination indicators */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex gap-2"
            role="tablist"
            aria-label="Slide indicators"
          >
            {INTERESTS.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * InterestCard component renders an individual interest with 3D effects
 *
 * @param interest - The interest data to display
 */
const InterestCard = memo(({ interest }: { interest: Interest }) => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden group h-full">
        {/* Hover-activated gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${interest.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          aria-hidden="true"
        ></div>

        {/* Background image with scaling effect on hover */}
        <div className="relative h-full overflow-hidden">
          <Image
            src={interest.image}
            alt={`Background image for ${interest.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 900px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={true}
            loading="eager"
            aria-hidden="true"
          />
          {/* Text readability gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" aria-hidden="true"></div>
          {/* Subtle depth gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" aria-hidden="true"></div>
        </div>

        {/* Card content */}
        <div className="absolute inset-0 p-4 sm:p-8 md:p-12 flex flex-col justify-end">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 mb-2 sm:mb-4">
            <span className="text-3xl sm:text-4xl" aria-hidden="true">{interest.icon}</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg text-center sm:text-left">
              {interest.title}
            </h3>
          </div>
          <div className="overflow-y-auto">
            <p className="text-white/95 text-base sm:text-lg md:text-md leading-relaxed max-w-2xl drop-shadow-lg">
              {interest.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

InterestCard.displayName = 'InterestCard';
