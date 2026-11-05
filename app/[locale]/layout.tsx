import type { Metadata } from "next";

import { Navbar } from "@/app/components/navbar";
import { SiteFooter } from "@/app/components/system/SiteFooter";
import { siteConfig } from "@/app/lib/site";
import { localeStaticParams } from "@/app/i18n/config";
import { getLocaleDictionary, type LocaleParams } from "@/app/i18n/getDictionary";

export const generateStaticParams = localeStaticParams;

// Anything else falls through to app/not-found.tsx, which is prerendered with its content.
export const dynamicParams = false;

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

export default async function LocaleLayout({
  children,
  ...props
}: LocaleParams & {
  children: React.ReactNode;
}) {
  const { locale, dictionary } = await getLocaleDictionary(props);

  return (
    <>
      <a href="#main-content" className="skip-link">
        {dictionary.accessibility.skipToContent}
      </a>
      <Navbar locale={locale} copy={dictionary.nav} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter locale={locale} copy={dictionary.footer} />
    </>
  );
}
