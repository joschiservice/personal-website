import { useState, ReactNode } from "react"

interface GlassButtonProps {
  href: string
  children: ReactNode
  icon?: ReactNode
  target?: string
  ariaLabel?: string
  color?: 'blue' | 'white'
  onClick?: () => void
}

export function GlassButton({
  href,
  children,
  icon,
  target,
  ariaLabel,
  color = 'blue',
  onClick
}: GlassButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  // Color variants
  const colorStyles = {
    blue: {
      base: "bg-blue-400/10 border-blue-300/30 text-blue-300",
      hover: "hover:bg-blue-400/15 hover:text-blue-200 hover:border-blue-300/40 hover:shadow-[0_8px_32px_rgba(59,130,246,0.2)]",
      focus: "focus:ring-blue-400/50",
      pressed: "bg-blue-400/20",
      glow: "bg-blue-400/5",
      reflection1: "bg-white/10",
      reflection2: "bg-blue-200/5",
      shimmer: "via-blue-400/10"
    },
    white: {
      base: "bg-blue-500/15 border-white/20 text-white",
      hover: "hover:bg-blue-500/25 hover:shadow-[0_8px_32px_rgba(59,130,246,0.3)]",
      focus: "focus:ring-white/50",
      pressed: "bg-blue-500/30",
      glow: "bg-white/5",
      reflection1: "bg-white/20",
      reflection2: "bg-white/10",
      shimmer: "via-white/10"
    }
  }

  const variant = colorStyles[color]

  return (
    <a
      href={href}
      target={target}
      className={`relative inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5
                 ${variant.base} backdrop-blur-md
                 border
                 text-xs sm:text-sm font-medium
                 rounded-xl
                 shadow-[0_8px_32px_rgba(0,0,0,0.1)]
                 overflow-hidden
                 transition-all duration-300
                 group
                 ${variant.hover}
                 focus:outline-none focus:ring-2 ${variant.focus} focus:ring-offset-2 focus:ring-offset-transparent
                 active:scale-95 active:${variant.pressed}
                 ${isPressed ? `scale-95 ${variant.pressed}` : ''}
                 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:${variant.shimmer} before:to-transparent before:opacity-0 before:hover:opacity-100 before:active:opacity-100 before:transition-opacity before:duration-700 before:animate-shimmer
                 touch-manipulation`}
      rel={target === "_blank" ? "noreferrer" : undefined}
      aria-describedby={target === "_blank" ? `${ariaLabel?.replace(/\s+/g, '-').toLowerCase() || 'link'}-new-tab` : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
    >
      {/* Glass reflection effect */}
      <span className="absolute inset-0 overflow-hidden rounded-xl">
        <span
          className={`absolute -top-10 -left-10 h-20 w-20
                     ${variant.reflection1} blur-lg transform rotate-45
                     group-hover:translate-x-2 group-hover:translate-y-2
                     transition-all duration-500`}
        ></span>
        {/* Additional reflection */}
        <span
          className={`absolute -bottom-10 -right-10 h-20 w-20
                     ${variant.reflection2} blur-lg transform rotate-45
                     group-hover:translate-x-2 group-hover:translate-y-2
                     transition-all duration-500 delay-100`}
        ></span>
      </span>

      {/* Subtle pulsing glow */}
      <span className={`absolute inset-0 rounded-xl ${variant.glow} blur-xl animate-pulse opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300`}></span>

      {icon && <span className="relative transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-100" aria-hidden="true">{icon}</span>}
      <span className="relative">{children}</span>
      {target === "_blank" && (
        <span id={`${ariaLabel?.replace(/\s+/g, '-').toLowerCase() || 'link'}-new-tab`} className="sr-only">(opens in a new tab)</span>
      )}
    </a>
  )
}