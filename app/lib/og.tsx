import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/app/lib/site";

/** Shared size for every generated social preview (OpenGraph and X). */
export const ogImageSize = { width: 1200, height: 630 };

const fontDirectory = join(process.cwd(), "assets/fonts");

async function loadFonts() {
  const [display, body, mono] = await Promise.all([
    readFile(join(fontDirectory, "Onest-SemiBold.woff")),
    readFile(join(fontDirectory, "InstrumentSans-Regular.woff")),
    readFile(join(fontDirectory, "JetBrainsMono-Medium.woff")),
  ]);

  return [
    { name: "Onest", data: display, weight: 600 as const, style: "normal" as const },
    { name: "Instrument Sans", data: body, weight: 400 as const, style: "normal" as const },
    { name: "JetBrains Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ];
}

function titleSize(title: string) {
  if (title.length > 90) return 52;
  if (title.length > 60) return 60;
  return 72;
}

/**
 * Renders a social preview in the site's look: dark page, soft blue and warm
 * light, the title set in the display face.
 */
export async function renderOgImage({
  eyebrow,
  title,
  description,
  meta,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  meta?: string;
}) {
  const host = new URL(siteConfig.url).host.replace(/^www\./, "");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#050912",
          backgroundImage: [
            "radial-gradient(circle at 92% 0%, rgba(36, 124, 255, 0.34), transparent 52%)",
            "radial-gradient(circle at 70% 100%, rgba(124, 98, 255, 0.18), transparent 46%)",
            "radial-gradient(circle at 100% 85%, rgba(255, 128, 84, 0.16), transparent 38%)",
          ].join(", "),
          color: "#f4f3ef",
          fontFamily: "Instrument Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              width: 52,
              height: 52,
              alignItems: "center",
              justifyContent: "center",
              border: "1.5px solid rgba(183, 202, 232, 0.35)",
              borderRadius: 999,
              fontFamily: "Onest",
              fontSize: 20,
            }}
          >
            JH
          </div>
          <div style={{ display: "flex", fontFamily: "Onest", fontSize: 24 }}>
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#6ba8ff",
              fontFamily: "JetBrains Mono",
              fontSize: 22,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 1000,
              marginTop: 22,
              fontFamily: "Onest",
              fontSize: titleSize(title),
              letterSpacing: -2,
              lineHeight: 1.06,
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                display: "flex",
                maxWidth: 880,
                marginTop: 24,
                color: "#bdc5d2",
                fontSize: 28,
                lineHeight: 1.4,
              }}
            >
              {description}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 26,
            borderTop: "1px solid rgba(183, 202, 232, 0.18)",
            color: "#8b97aa",
            fontFamily: "JetBrains Mono",
            fontSize: 20,
          }}
        >
          <div style={{ display: "flex" }}>{meta ?? ""}</div>
          <div style={{ display: "flex", color: "#bdc5d2" }}>{host}</div>
        </div>
      </div>
    ),
    { ...ogImageSize, fonts: await loadFonts() }
  );
}
