import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  accentColor?: "blue" | "purple" | "emerald" | "amber" | "teal";
  className?: string;
}

const accentColors = {
  blue: "from-blue-600/40 via-blue-400/60",
  purple: "from-purple-500/40 via-purple-400/30",
  emerald: "from-emerald-500/40 via-emerald-400/30",
  amber: "from-amber-500/40 via-amber-400/30",
  teal: "from-teal-500/40 via-teal-400/30",
};

export function GlassCard({
  children,
  accentColor = "blue",
  className = "",
}: GlassCardProps) {
  return (
    <div
      className={`group relative w-full overflow-hidden bg-gradient-to-br from-[#0f1a2e]/95 to-[#0a1524]/95 rounded-xl shadow-xl backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-300 ${className}`}
    >
      {/* Tech pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDA2OUUzIiBzdHJva2Utb3BhY2l0eT0iMC4xIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTAgMjBIMjBWME0yMCAyMEg0MFYwTTQwIDIwSDYwVjBNNjAgMjBIODBWME04MCAyMFY0MEg2ME00MCA0MEgyME0yMCA0MEgwTTAgNDBWMjBNMjAgNDBWNjBIME0yMCA2MEg0ME02MCA2MEg4ME04MCA2MFY0ME02MCA0MFY2ME00MCA0MFY2ME0wIDYwVjgwSDIwTTIwIDgwSDQwTTQwIDgwSDYwTTYwIDgwSDgwTTgwIDgwVjYwIi8+PC9zdmc+')] opacity-30 pointer-events-none bg-repeat"></div>

      {/* Accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accentColors[accentColor]} to-transparent`}
      ></div>

      <div className="p-4 sm:p-6 md:p-8">{children}</div>
    </div>
  );
}
