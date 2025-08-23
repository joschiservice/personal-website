import { list } from "@vercel/blob"
import { unstable_cache } from "next/cache"

async function fetchCvUrlInternal(): Promise<string | null> {
  const { blobs } = await list()
  const candidates = blobs.filter(b => b.pathname.endsWith("_CV.pdf"))
  if (candidates.length === 0) return null

  candidates.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
  return candidates[0].url
}

export const getCachedCvUrl = unstable_cache(fetchCvUrlInternal, ["cv-url"], {
  revalidate: 60 * 60, // 1 hour
  tags: ["cv-url"],
})


