"use client";

import { useEffect, useMemo } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

/**
 * HeroBackgroundAnimation component creates an animated background with dynamic lighting effects.
 * It uses Framer Motion for smooth animations and hardware-accelerated transforms.
 */
export function HeroBackgroundAnimation({ children }: Props) {
  // Core animation values
  const colorPhase = useMotionValue(0);
  const rotation = useMotionValue(0);
  const glow = useMotionValue(0);

  // Ambient lighting animation values
  const gradientPosY = useMotionValue(10);
  const intensity1 = useMotionValue(0.4);
  const intensity2 = useMotionValue(0.5);
  const intensity3 = useMotionValue(0.4);

  // Secondary lighting animation values
  const x1 = useMotionValue(30);
  const y1 = useMotionValue(20);
  const x2 = useMotionValue(70);
  const y2 = useMotionValue(40);
  const size1 = useMotionValue(25);
  const size2 = useMotionValue(35);
  const opacity1 = useMotionValue(0.35);
  const opacity2 = useMotionValue(0.3);

  // Initialize color phase animation
  useEffect(() => {
    const animation = animate(colorPhase, 1, {
      duration: 20,
      repeat: Infinity,
      repeatType: "loop",
    });
    return animation.stop;
  }, [colorPhase]);

  // Initialize ambient lighting animations
  useEffect(() => {
    const animations = [
      animate(gradientPosY, [10, 30, 10], {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
      }),
      animate(intensity1, [0.4, 0.6, 0.4], {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
      }),
      animate(intensity2, [0.5, 0.7, 0.5], {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
      }),
      animate(intensity3, [0.4, 0.6, 0.4], {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
      }),
      animate(glow, [0, 15, 0], {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
      }),
    ];
    return () => animations.forEach((animation) => animation.stop());
  }, [gradientPosY, intensity1, intensity2, intensity3, glow]);

  // Initialize light rays rotation
  useEffect(() => {
    const animation = animate(rotation, 360, {
      duration: 45,
      repeat: Infinity,
      repeatType: "loop",
    });
    return animation.stop;
  }, [rotation]);

  // Initialize secondary lighting animations
  useEffect(() => {
    const animations = [
      animate(y1, [20, 30, 20], {
        duration: 12,
        repeat: Infinity,
        repeatType: "reverse",
      }),
      animate(y2, [40, 50, 40], {
        duration: 12,
        repeat: Infinity,
        repeatType: "reverse",
      }),
      animate(size1, [25, 40, 25], {
        duration: 12,
        repeat: Infinity,
        repeatType: "reverse",
      }),
      animate(size2, [35, 30, 35], {
        duration: 12,
        repeat: Infinity,
        repeatType: "reverse",
      }),
      animate(opacity1, [0.35, 0.5, 0.35], {
        duration: 12,
        repeat: Infinity,
        repeatType: "reverse",
      }),
      animate(opacity2, [0.3, 0.45, 0.3], {
        duration: 12,
        repeat: Infinity,
        repeatType: "reverse",
      }),
    ];
    return () => animations.forEach((animation) => animation.stop());
  }, [y1, y2, size1, size2, opacity1, opacity2]);

  // Color palette configuration
  const colorSets = useMemo(
    () => ({
      primary: {
        base: [33, 150, 243], // Blue
        mid: [156, 39, 176], // Purple
        end: [233, 30, 99], // Pink
      },
      secondary: {
        base: [25, 118, 210], // Darker blue
        mid: [123, 31, 162], // Darker purple
        end: [194, 24, 91], // Darker pink
      },
      tertiary: {
        base: [13, 71, 161], // Even darker blue
        mid: [74, 20, 140], // Even darker purple
        end: [136, 14, 79], // Even darker pink
      },
      spot1: {
        base: [66, 165, 245], // Light blue
        mid: [186, 104, 200], // Light purple
        end: [240, 98, 146], // Light pink
      },
      spot2: {
        base: [121, 134, 203], // Light indigo
        mid: [186, 104, 200], // Light purple
        end: [240, 98, 146], // Light pink
      },
    }),
    []
  );

  // Dynamic gradient transformations
  const mainGradientBackground = useTransform(
    [gradientPosY, intensity1, intensity2, intensity3, colorPhase],
    ([posY, int1, int2, int3, phase]) => {
      const color1 = colorInterpolation(
        colorSets.primary.base,
        colorSets.primary.mid,
        colorSets.primary.end,
        phase as number
      );

      const color2 = colorInterpolation(
        colorSets.secondary.base,
        colorSets.secondary.mid,
        colorSets.secondary.end,
        phase as number
      );

      const color3 = colorInterpolation(
        colorSets.tertiary.base,
        colorSets.tertiary.mid,
        colorSets.tertiary.end,
        phase as number
      );

      return `radial-gradient(ellipse at 50% ${posY}%,
        rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, ${int1}) 0%,
        rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, ${int2}) 30%,
        rgba(${color3[0]}, ${color3[1]}, ${color3[2]}, ${int3}) 50%,
        rgba(18, 18, 18, 0) 75%)`;
    }
  );

  const lightRaysBackground = useTransform(
    colorPhase,
    (phase) => `conic-gradient(
      rgba(33, 150, 243, 0.15) 0deg,
      rgba(18, 18, 18, 0) 60deg,
      rgba(156, 39, 176, 0.15) 120deg,
      rgba(18, 18, 18, 0) 180deg,
      rgba(233, 30, 99, 0.15) 240deg,
      rgba(18, 18, 18, 0) 300deg,
      rgba(33, 150, 243, 0.15) 360deg
    )`
  );

  const spot1Background = useTransform(colorPhase, (phase) => {
    const color1 = colorInterpolation(
      colorSets.spot1.base,
      colorSets.spot1.mid,
      colorSets.spot1.end,
      phase
    );

    const color2 = colorInterpolation(
      colorSets.secondary.base,
      colorSets.secondary.mid,
      colorSets.secondary.end,
      phase
    );

    return `radial-gradient(ellipse,
        rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 0.4) 0%,
        rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.2) 50%,
        rgba(18, 18, 18, 0) 80%)`;
  });

  const spot2Background = useTransform(colorPhase, (phase) => {
    const color1 = colorInterpolation(
      colorSets.spot2.base,
      colorSets.spot2.mid,
      colorSets.spot2.end,
      phase
    );

    const color2 = colorInterpolation(
      colorSets.secondary.base,
      colorSets.secondary.mid,
      colorSets.secondary.end,
      phase
    );

    return `radial-gradient(ellipse,
        rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 0.4) 0%,
        rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.2) 50%,
        rgba(18, 18, 18, 0) 80%)`;
  });

  // Size transformations for lighting spots
  const size1Transform = useTransform(size1, (s) => `${Math.min(s, 40)}vw`);
  const size1HeightTransform = useTransform(
    size1,
    (s) => `${Math.min(s, 40)}vh`
  );
  const size2Transform = useTransform(size2, (s) => `${Math.min(s, 40)}vw`);
  const size2HeightTransform = useTransform(
    size2,
    (s) => `${Math.min(s, 40)}vh`
  );

  // Static background styles
  const baseBackgroundStyle = useMemo(
    () => ({
      background:
        "linear-gradient(to bottom, rgba(18, 18, 18, 0.4) 0%, #121212 95%)",
    }),
    []
  );

  const verticalGradientStyle = useMemo(
    () => ({
      background:
        "linear-gradient(to bottom, rgba(18, 18, 18, 0) 0%, rgba(18, 18, 18, 0.8) 70%, #121212 100%)",
    }),
    []
  );

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 -z-30" style={baseBackgroundStyle} />

      {/* Rotating light rays effect */}
      <motion.div
        style={{
          position: "absolute",
          top: "0%",
          left: "50%",
          width: "200%",
          height: "200%",
          opacity: 0.15,
          background: lightRaysBackground,
          rotate: rotation,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        className="-z-25"
      />

      {/* Main ambient lighting effect */}
      <motion.div
        style={{
          background: mainGradientBackground,
          backgroundSize: "100% 100%",
          filter: "drop-shadow(0 0 15vw rgba(33, 150, 243, 0.15))",
          willChange: "filter",
        }}
        className="absolute inset-0 -z-20"
      />

      {/* Vertical gradient overlay */}
      <div style={verticalGradientStyle} className="absolute inset-0 -z-15" />

      {/* Secondary lighting spots */}
      <motion.div
        style={{
          left: x1,
          top: y1,
          width: size1Transform,
          height: size1HeightTransform,
          opacity: opacity1,
          background: spot1Background,
          filter: "blur(70px)",
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform, filter",
        }}
        className="absolute -z-10"
      />

      <motion.div
        style={{
          left: x2,
          top: y2,
          width: size2Transform,
          height: size2HeightTransform,
          opacity: opacity2,
          background: spot2Background,
          filter: "blur(70px)",
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform, filter",
        }}
        className="absolute -z-10"
      />

      {/* Main content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

/**
 * Interpolates between three colors based on a phase value
 * @param color1 - First color in RGB array format
 * @param color2 - Second color in RGB array format
 * @param color3 - Third color in RGB array format
 * @param phase - Phase value between 0 and 1
 * @returns Interpolated color in RGB array format
 */
function colorInterpolation(
  color1: number[],
  color2: number[],
  color3: number[],
  phase: number
): number[] {
  const phase3 = phase * 3;
  let t;
  let currentColor, nextColor;

  if (phase3 < 1) {
    t = phase3;
    currentColor = color1;
    nextColor = color2;
  } else if (phase3 < 2) {
    t = phase3 - 1;
    currentColor = color2;
    nextColor = color3;
  } else {
    t = phase3 - 2;
    currentColor = color3;
    nextColor = color1;
  }

  return [
    Math.round(currentColor[0] * (1 - t) + nextColor[0] * t),
    Math.round(currentColor[1] * (1 - t) + nextColor[1] * t),
    Math.round(currentColor[2] * (1 - t) + nextColor[2] * t),
  ];
}
