import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Page } from "@playwright/test";

type Mermaid = (typeof import("mermaid"))["default"];

const DIAGRAMS_DIRECTORY = join("content", "diagrams");
const FONT_FILE = join(
  "node_modules",
  "@fontsource-variable",
  "jetbrains-mono",
  "files",
  "jetbrains-mono-latin-wght-normal.woff2",
);
const FONT_FAMILY = "JetBrains Mono Variable";

const MERMAID_CONFIG = {
  startOnLoad: false,
  securityLevel: "strict",
  theme: "base",
  themeVariables: {
    darkMode: true,
    background: "#08101d",
    primaryColor: "#10243d",
    primaryTextColor: "#f8fafc",
    primaryBorderColor: "#42a5f5",
    secondaryColor: "#251d3c",
    secondaryTextColor: "#f8fafc",
    secondaryBorderColor: "#ba68c8",
    tertiaryColor: "#0b1829",
    tertiaryTextColor: "#e2e8f0",
    tertiaryBorderColor: "#52657b",
    lineColor: "#8dd8ff",
    textColor: "#e2e8f0",
    noteBkgColor: "#251d3c",
    noteTextColor: "#f8fafc",
    noteBorderColor: "#ba68c8",
    edgeLabelBackground: "#0b1626",
    fontFamily: `${FONT_FAMILY}, ui-monospace, monospace`,
  },
} as const;

// The theme is part of the hash, so a theme change renders every diagram again.
function diagramHash(source: string) {
  return createHash("sha256")
    .update(JSON.stringify({ source, config: MERMAID_CONFIG }))
    .digest("hex")
    .slice(0, 16);
}

function diagramFile(hash: string) {
  return join(DIAGRAMS_DIRECTORY, `${hash}.svg`);
}

async function readDiagram(hash: string) {
  try {
    return await readFile(diagramFile(hash), "utf8");
  } catch {
    return undefined;
  }
}

async function openRenderer(page: Page) {
  const mermaidScript = join("node_modules", "mermaid", "dist", "mermaid.min.js");
  const font = await readFile(FONT_FILE, "base64");

  // Mermaid measures labels while rendering, so it needs the font the site displays them in.
  await page.setContent("<!doctype html><html><body></body></html>");
  await page.addStyleTag({
    content: `@font-face { font-family: "${FONT_FAMILY}"; font-weight: 100 800; src: url(data:font/woff2;base64,${font}) format("woff2"); }`,
  });
  await page.evaluate((family) => document.fonts.load(`500 16px "${family}"`), FONT_FAMILY);
  await page.addScriptTag({ path: mermaidScript });
  await page.evaluate((config) => {
    (window as unknown as { mermaid: Mermaid }).mermaid.initialize(config);
  }, MERMAID_CONFIG);
}

async function renderDiagrams(missing: Map<string, string>) {
  let chromium;
  let browser;
  try {
    ({ chromium } = await import("@playwright/test"));
    browser = await chromium.launch();
  } catch (error) {
    throw new Error(
      "Rendering Mermaid diagrams needs Playwright's Chromium. Run: pnpm exec playwright install chromium",
      { cause: error },
    );
  }

  try {
    const page = await browser.newPage();
    await openRenderer(page);
    await mkdir(DIAGRAMS_DIRECTORY, { recursive: true });

    const rendered = new Map<string, string>();
    for (const [hash, source] of missing) {
      const svg = await page
        .evaluate(
          async ({ id, source }) => {
            const { mermaid } = window as unknown as { mermaid: Mermaid };
            return (await mermaid.render(id, source)).svg;
          },
          { id: `mermaid-${hash}`, source },
        )
        .catch((error: Error) => {
          throw new Error(`Invalid Mermaid diagram:\n${source}\n\n${error.message}`, { cause: error });
        });

      await writeFile(diagramFile(hash), svg);
      rendered.set(hash, svg);
    }

    return rendered;
  } finally {
    await browser.close();
  }
}

/**
 * Returns the committed SVG for each Mermaid source, keyed by source. Diagrams without one are
 * rendered locally, while CI and Vercel fail so that an uncommitted diagram can't ship.
 */
export async function loadDiagrams(sources: Iterable<string>) {
  const hashes = new Map<string, string>();
  const svgByHash = new Map<string, string>();
  const missing = new Map<string, string>();

  for (const source of sources) {
    const hash = diagramHash(source);
    hashes.set(source, hash);

    const svg = await readDiagram(hash);
    if (svg === undefined) missing.set(hash, source);
    else svgByHash.set(hash, svg);
  }

  if (missing.size > 0) {
    if (process.env.CI || process.env.VERCEL) {
      const files = [...missing.keys()].map(diagramFile).join(", ");
      throw new Error(`Missing rendered diagrams: ${files}. Run pnpm diagrams locally and commit them.`);
    }

    for (const [hash, svg] of await renderDiagrams(missing)) svgByHash.set(hash, svg);
  }

  return new Map(
    [...hashes].map(([source, hash]) => [source, svgByHash.get(hash) as string]),
  );
}
