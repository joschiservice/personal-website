"use client"

import {useSpring, animated, easings} from '@react-spring/web'

interface Props {
  children: any;
  fromColor: string;
  toColor: string;
  toColorGlow: string;
}
export function ColorGlowTransitionAnimation({children, toColor, fromColor, toColorGlow}: Props) {
  const springs = useSpring({
    from: { color: fromColor, textShadow: '0 0 0px ' + fromColor },
    to: { color: toColor, textShadow: '0 0 15px ' + toColorGlow },
    config: {
      easing: easings.easeInOutExpo,
      duration: 1000
    }
  })

  return (
    <animated.span
      style={{ ...springs }}>
      {children}
    </animated.span>
  )
}