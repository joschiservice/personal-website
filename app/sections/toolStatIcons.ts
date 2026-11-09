import type { IconType } from "react-icons";
import {
  LuCpu,
  LuFolder,
  LuGraduationCap,
  LuHourglass,
  LuMail,
  LuPresentation,
} from "react-icons/lu";
import {
  SiAngular,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFacebook,
  SiGo,
  SiGooglechrome,
  SiPostgresql,
  SiReact,
  SiRust,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

/** The hover animation each icon plays, defined in ToolsSection.module.css. */
type StatAnimation =
  | "dash"
  | "flip"
  | "open"
  | "pop"
  | "pulse"
  | "send"
  | "spin"
  | "stomp"
  | "swim"
  | "toss";

interface ToolStatIcon {
  Icon: IconType;
  color: string;
  animation: StatAnimation;
}

// Brand colours, lightened where the original is too dark to read on a card.
const GENERAL = "var(--accent-soft)";

const YEAR: ToolStatIcon = { Icon: LuHourglass, color: "var(--rarity-color)", animation: "flip" };

/**
 * Each tool's facts, in the order of its stats. Lives apart from the tool data
 * because the dictionary crosses from server to client and can't carry icons.
 */
const toolStatIcons: Record<string, readonly ToolStatIcon[]> = {
  TypeScript: [
    YEAR,
    { Icon: TbBrandCSharp, color: "#b57edc", animation: "pop" },
    { Icon: SiGo, color: "#38c4e4", animation: "dash" },
  ],
  "Node.js": [
    YEAR,
    { Icon: SiGooglechrome, color: "#6ea3f7", animation: "spin" },
    { Icon: LuCpu, color: GENERAL, animation: "pulse" },
  ],
  "Next.js": [
    YEAR,
    { Icon: LuFolder, color: GENERAL, animation: "open" },
    { Icon: SiRust, color: "#dea584", animation: "spin" },
  ],
  React: [
    YEAR,
    { Icon: SiFacebook, color: "#5b9bff", animation: "pop" },
    { Icon: SiReact, color: "#61dafb", animation: "spin" },
  ],
  NestJS: [
    YEAR,
    { Icon: SiAngular, color: "#f0566f", animation: "pop" },
    { Icon: SiExpress, color: "#e6edf3", animation: "dash" },
  ],
  PostgreSQL: [
    YEAR,
    { Icon: LuGraduationCap, color: "#f2cc55", animation: "toss" },
    { Icon: SiPostgresql, color: "#7b9cf0", animation: "stomp" },
  ],
  Docker: [
    YEAR,
    { Icon: LuPresentation, color: GENERAL, animation: "pop" },
    { Icon: SiDocker, color: "#4aa8f0", animation: "swim" },
  ],
  Sentry: [
    YEAR,
    { Icon: SiDjango, color: "#44b78b", animation: "pop" },
    { Icon: LuMail, color: GENERAL, animation: "send" },
  ],
};

export function getToolStatIcon(toolName: string, statIndex: number) {
  return toolStatIcons[toolName]?.[statIndex];
}
