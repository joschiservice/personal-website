"use client"

import React from 'react'

interface Props {
  children: any;
  fromColor: string;
  toColor: string;
  toColorGlow: string;
}
export function ColorGlowTransitionAnimation({children, toColor, fromColor, toColorGlow}: Props) {
  return (
    <span
      className="glow-transition"
      style={{
        ['--from-color' as any]: fromColor,
        ['--to-color' as any]: toColor,
        ['--to-color-glow' as any]: toColorGlow,
      } as React.CSSProperties}
    >
      {children}
    </span>
  )
}