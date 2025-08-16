"use client"

import {motion} from 'framer-motion'

interface Props {
  children: any;
  fromColor: string;
  toColor: string;
  toColorGlow: string;
}
export function ColorGlowTransitionAnimation({children, toColor, fromColor, toColorGlow}: Props) {
  return (
    <motion.span
      initial={{ color: fromColor, textShadow: `0 0 0px ${fromColor}` }}
      animate={{ color: toColor, textShadow: `0 0 15px ${toColorGlow}` }}
      transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
    >
      {children}
    </motion.span>
  )
}