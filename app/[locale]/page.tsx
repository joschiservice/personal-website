import type { Metadata } from "next";
import { HomePageHeroSection } from "@/app/sections/HomePageHeroSection";
import { AboutMeSection } from "@/app/sections/AboutMeSection";
import { TimelineSection } from "@/app/sections/timeline/TimelineSection";
import { ToolsSection } from "@/app/sections/ToolsSection";
import { FlightRadarSection } from "@/app/sections/FlightRadarSection";
import { InterestsSection } from "@/app/sections/InterestsSection";
import { LatestPostsSection } from "@/app/sections/LatestPostsSection";
import { siteConfig } from "@/app/lib/site";
import { getLocaleDictionary, type LocaleParams } from "@/app/i18n/getDictionary";
import { defaultLocale, localeAlternates, localeHref } from "@/app/i18n/config";
import { hasCvForLocale } from "@/app/lib/cv";
import { HomeMotionRuntime } from "@/app/components/system/HomeMotionRuntime";

export async function generateMetadata(props: LocaleParams): Promise<Metadata> {
  const { locale, dictionary } = await getLocaleDictionary(props);
  const canonical = localeHref(locale, "/");

  return {
    alternates: { canonical, languages: localeAlternates("/") },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      url: canonical,
    },
  };
}

export default async function Home(props: LocaleParams) {
  const { locale, dictionary } = await getLocaleDictionary(props);
  const localizedCvAvailable = locale === defaultLocale
    ? false
    : await hasCvForLocale(locale).catch(() => false);

  return (
    <div className="site-shell">
      <HomeMotionRuntime />
      <HomePageHeroSection
        copy={dictionary.hero}
        locale={locale}
        localizedCvAvailable={localizedCvAvailable}
        newTabLabel={dictionary.accessibility.opensNewTab}
      />
      <AboutMeSection copy={dictionary.about} newTabLabel={dictionary.accessibility.opensNewTab} />
      <LatestPostsSection
        copy={dictionary.writing}
        blogCopy={dictionary.blog}
        locale={locale}
      />
      <TimelineSection copy={dictionary.timeline} locale={locale} />
      <ToolsSection copy={dictionary.tools} />
      <InterestsSection copy={dictionary.interests} newTabLabel={dictionary.accessibility.opensNewTab} />
      <FlightRadarSection
        copy={dictionary.flightRadar}
        newTabLabel={dictionary.accessibility.opensNewTab}
      />
    </div>
  );
}
