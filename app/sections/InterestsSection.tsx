"use client";

import { SectionHeading } from "@/app/components/SectionHeading";
import {
  interestsSectionContent,
  type Interest,
} from "@/app/data/interestsSection";
import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { motion, type Transition } from "motion/react";
import { useState, useCallback, memo } from "react";

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

  /**
   * Handles pagination through the carousel
   * @param newDirection - Direction to paginate (1 for next, -1 for previous)
   */
  const paginate = useCallback((newDirection: number) => {
    setCurrentIndex(
      (prev) =>
        (prev + newDirection + interestsSectionContent.items.length) %
        interestsSectionContent.items.length
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
      className="relative overflow-x-hidden py-12 sm:py-20 md:py-28"
      id="interests"
      aria-labelledby="interests-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <SectionHeading
          title={interestsSectionContent.title}
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
            {interestsSectionContent.items.map((interest, index) => {
              const position = getItemPosition(index);
              const isActive = position === 0;

              return (
                <motion.div
                  key={index}
                  className="absolute h-[400px] w-full max-w-4xl transform-gpu [backface-visibility:hidden] [will-change:transform,opacity] sm:h-[500px] md:h-[600px]"
                  initial={false}
                  animate={{
                    x: `${position * 100}%`,
                    scale: position === 0 ? 1 : 0.8,
                    opacity: position === 0 ? 1 : 0.5,
                    zIndex: position === 0 ? 2 : 1,
                  }}
                  transition={SPRING_TRANSITION}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${interestsSectionContent.items.length}`}
                  aria-hidden={position !== 0}
                >
                  <motion.div
                    className="h-full w-full transform-gpu [backface-visibility:hidden] [will-change:transform]"
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    dragMomentum={false}
                    onDragEnd={(_, info) => handleDragEnd(info)}
                  >
                    <InterestCard interest={interest} isActive={isActive} />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation controls */}
          <motion.button
            onClick={() => paginate(-1)}
            className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 transform-gpu rounded-full border border-white/20 bg-white/10 p-2 transition-all duration-300 [backface-visibility:hidden] [will-change:transform,opacity] hover:bg-white/20 sm:left-4 sm:block sm:p-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            aria-label="Previous slide"
          >
            <motion.div
              whileTap={{ x: -5 }}
              tabIndex={-1}
              transition={TAP_TRANSITION}
            >
              <FaChevronLeft className="text-white text-lg sm:text-xl" aria-hidden="true" />
            </motion.div>
          </motion.button>
          <motion.button
            onClick={() => paginate(1)}
            className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 transform-gpu rounded-full border border-white/20 bg-white/10 p-2 transition-all duration-300 [backface-visibility:hidden] [will-change:transform,opacity] hover:bg-white/20 sm:right-4 sm:block sm:p-3"
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
              tabIndex={-1}
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
            {interestsSectionContent.items.map((_, index) => (
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
const InterestCard = memo(({
  interest,
  isActive,
}: {
  interest: Interest;
  isActive: boolean;
}) => {
  return (
    <div className="relative h-full w-full [contain:paint]">
      <div className="group absolute inset-0 h-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:rounded-3xl">
        <div
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent"
          aria-hidden="true"
        ></div>
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
            className="object-cover transform-gpu transition-transform duration-700 [backface-visibility:hidden] [will-change:transform] group-hover:scale-110"
            priority={isActive}
            loading={isActive ? "eager" : "lazy"}
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
