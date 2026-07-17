import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Navbar } from "./components/navbar";
import { SiteFooter } from "./components/system/SiteFooter";
import { siteConfig } from "./lib/site";
import { getRequestDictionary } from "./i18n/getDictionary";

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary } = await getRequestDictionary();

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dictionary.metadata.title,
      template: `%s · ${siteConfig.name}`,
    },
    description: dictionary.metadata.description,
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
    },
  };
}

export const viewport = {
  themeColor: "#050912",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale, dictionary } = await getRequestDictionary();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <a href="#main-content" className="skip-link">
          {dictionary.accessibility.skipToContent}
        </a>
        <Navbar locale={locale} copy={dictionary.nav} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter locale={locale} copy={dictionary.footer} />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
