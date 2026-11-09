import type { IconType } from "react-icons";
import {
  LuAppWindow,
  LuAward,
  LuBoxes,
  LuCircuitBoard,
  LuCloud,
  LuCloudLightning,
  LuCpu,
  LuDatabase,
  LuDraftingCompass,
  LuGraduationCap,
  LuLayers,
  LuWorkflow,
} from "react-icons/lu";
import {
  SiArduino,
  SiCplusplus,
  SiDjango,
  SiDocker,
  SiDotnet,
  SiFastapi,
  SiGithub,
  SiGoogle,
  SiKubernetes,
  SiLaravel,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiShopify,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
  SiUnrealengine,
  SiVercel,
  SiVuedotjs,
  SiXcode,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

interface SkillIcon {
  Icon: IconType;
  color: string;
}

// Brand colours, lightened where the original is too dark to read on the page.
// Marks that are black in their branding use the page's light tone.
const LIGHT_MARK = "#e6edf3";
const GENERAL = "var(--accent-soft)";
const CREDENTIAL = "var(--warm)";

const react = { Icon: SiReact, color: "#61dafb" };
const node = { Icon: SiNodedotjs, color: "#7cc36b" };
const cloud = { Icon: LuCloud, color: GENERAL };
const serverless = { Icon: LuCloudLightning, color: GENERAL };
const databases = { Icon: LuDatabase, color: GENERAL };
const fullStack = { Icon: LuLayers, color: GENERAL };
const microservices = { Icon: LuBoxes, color: GENERAL };
const electronics = { Icon: LuCircuitBoard, color: GENERAL };
const embedded = { Icon: LuCpu, color: GENERAL };
const qualification = { Icon: LuGraduationCap, color: CREDENTIAL };
const grade = { Icon: LuAward, color: CREDENTIAL };

/** Badge labels exactly as written in the timeline data and its translations. */
const skillIcons = new Map<string, SkillIcon>([
  [".NET", { Icon: SiDotnet, color: "#9b7bff" }],
  ["83 points (Good)", grade],
  ["83点（良）", grade],
  ["Arduino", { Icon: SiArduino, color: "#2fc4ca" }],
  ["C#", { Icon: TbBrandCSharp, color: "#b57edc" }],
  ["C++", { Icon: SiCplusplus, color: "#6aa5ea" }],
  ["CAD", { Icon: LuDraftingCompass, color: GENERAL }],
  ["CI/CD", { Icon: LuWorkflow, color: GENERAL }],
  ["Cloud Computing", cloud],
  ["クラウドコンピューティング", cloud],
  ["Databases", databases],
  ["データベース", databases],
  ["Django", { Icon: SiDjango, color: "#44b78b" }],
  ["Docker", { Icon: SiDocker, color: "#4aa8f0" }],
  ["EQF level 4", qualification],
  ["EQFレベル4", qualification],
  ["Electronics", electronics],
  ["電子工作", electronics],
  ["Embedded Systems", embedded],
  ["組み込みシステム", embedded],
  ["FastAPI", { Icon: SiFastapi, color: "#2dbfae" }],
  ["Full-Stack Development", fullStack],
  ["フルスタック開発", fullStack],
  ["GitHub", { Icon: SiGithub, color: LIGHT_MARK }],
  ["Kubernetes", { Icon: SiKubernetes, color: "#6e95ee" }],
  ["Microservices", microservices],
  ["マイクロサービス", microservices],
  ["NestJS", { Icon: SiNestjs, color: "#ef5a7a" }],
  ["Next.js", { Icon: SiNextdotjs, color: LIGHT_MARK }],
  ["Node.js", node],
  ["Node.js (Nest.js)", node],
  ["OR-Tools", { Icon: SiGoogle, color: "#6ea3f7" }],
  ["PHP (Laravel)", { Icon: SiLaravel, color: "#ff6a5f" }],
  ["PostgreSQL", { Icon: SiPostgresql, color: "#7b9cf0" }],
  ["Python", { Icon: SiPython, color: "#f2cc55" }],
  ["React", react],
  ["React (Next.js)", react],
  ["React.js", react],
  ["Serverless Computing", serverless],
  ["サーバーレスコンピューティング", serverless],
  ["Shopify & Shopify Hydrogen", { Icon: SiShopify, color: "#95bf47" }],
  ["SwiftUI", { Icon: SiSwift, color: "#f7714f" }],
  ["TailwindCSS", { Icon: SiTailwindcss, color: "#38bdf8" }],
  ["TypeScript", { Icon: SiTypescript, color: "#6aa5ea" }],
  ["UnrealEngine", { Icon: SiUnrealengine, color: LIGHT_MARK }],
  ["Vercel", { Icon: SiVercel, color: LIGHT_MARK }],
  ["Vue.js", { Icon: SiVuedotjs, color: "#4fc08d" }],
  ["WPF", { Icon: LuAppWindow, color: GENERAL }],
  ["XCode", { Icon: SiXcode, color: "#5aa5fc" }],
]);

export function getSkillIcon(skill: string) {
  return skillIcons.get(skill);
}
