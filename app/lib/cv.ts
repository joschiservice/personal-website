import { list } from "@vercel/blob";
import { unstable_cache } from "next/cache";

const CV_PATH_PATTERN = /_CV_([A-Z]{2})\.pdf$/i;
const LEGACY_ENGLISH_CV_PATTERN = /_CV\.pdf$/i;

export const ENGLISH_CV_LANGUAGE = "EN";

export function getCvLanguageCode(locale: string): string {
  const language = locale.split("-")[0]?.toLowerCase();
  return language?.toUpperCase() || ENGLISH_CV_LANGUAGE;
}

async function fetchCvUrlsInternal(): Promise<Record<string, string>> {
  const { blobs } = await list();
  const candidates = blobs
    .map((blob) => {
      const match = blob.pathname.match(CV_PATH_PATTERN);
      const language = match?.[1]?.toUpperCase()
        ?? (LEGACY_ENGLISH_CV_PATTERN.test(blob.pathname)
          ? ENGLISH_CV_LANGUAGE
          : null);

      return language ? { ...blob, language } : null;
    })
    .filter((blob): blob is NonNullable<typeof blob> => blob !== null)
    .sort(
      (left, right) =>
        new Date(right.uploadedAt).getTime() - new Date(left.uploadedAt).getTime()
    );

  return Object.fromEntries(
    candidates.map((blob) => [blob.language, blob.url]).reverse()
  );
}

export const getCachedCvUrls = unstable_cache(fetchCvUrlsInternal, ["cv-urls"], {
  revalidate: 60 * 60, // 1 hour
  tags: ["cv-urls"],
});

export async function hasCvForLocale(locale: string): Promise<boolean> {
  const urls = await getCachedCvUrls();
  return Boolean(urls[getCvLanguageCode(locale)]);
}

export async function getCvUrl(locale = "en"): Promise<string | null> {
  const urls = await getCachedCvUrls();
  return (
    urls[getCvLanguageCode(locale)]
    ?? urls[ENGLISH_CV_LANGUAGE]
    ?? null
  );
}
