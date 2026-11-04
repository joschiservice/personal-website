import type { Metadata } from "next";
import "@fontsource-variable/onest";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/jetbrains-mono";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Navbar } from "@/app/components/navbar";
import { SiteFooter } from "@/app/components/system/SiteFooter";
import { siteConfig } from "@/app/lib/site";
import { enabledLocales } from "@/app/i18n/config";
import { getLocaleDictionary, type LocaleParams } from "@/app/i18n/getDictionary";

// Pages are static, so this keeps the footer's year from going stale between deploys.
export const revalidate = 86400;

export function generateStaticParams() {
  return enabledLocales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: LocaleParams): Promise<Metadata> {
  const { dictionary } = await getLocaleDictionary(props);

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
    twitter: {
      card: "summary_large_image",
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
  ...props
}: LocaleParams & {
  children: React.ReactNode;
}) {
  const { locale, dictionary } = await getLocaleDictionary(props);

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
