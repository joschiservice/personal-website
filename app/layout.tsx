import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { instrumentSans, jetbrainsMono, jetbrainsMonoNumero, onest } from "@/app/lib/fonts";

// Pages are static, so this keeps the footer's year from going stale between deploys.
export const revalidate = 86400;

export const viewport = {
  themeColor: "#050912",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${onest.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} ${jetbrainsMonoNumero.variable}`}
    >
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
