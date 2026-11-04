import { expect, test } from "@playwright/test"
import { allPosts } from "content-collections"
import en from "../app/i18n/dictionaries/en"
import { getPublishedPosts } from "../app/lib/blog"
import { buildRssFeed } from "../app/lib/rss"

const publishedPosts = getPublishedPosts()
const draftPosts = allPosts.filter((post) => post.draft)

test("lists published posts and exposes RSS", async ({ page }) => {
  await page.goto("/blog")

  await expect(
    page.getByRole("heading", { level: 1, name: en.blog.title, exact: true })
  ).toBeVisible()
  await expect(page.getByRole("link", { name: en.blog.allWriting })).toHaveCount(0)
  for (const post of publishedPosts) {
    await expect(page.getByRole("link", { name: en.blog.readArticle(post.title) })).toBeVisible()
  }
  await expect(page.getByRole("heading", { name: en.blog.emptyTitle })).toHaveCount(
    publishedPosts.length > 0 ? 0 : 1
  )
  await expect(page.getByRole("link", { name: en.blog.rss })).toHaveAttribute(
    "href",
    "/blog/rss.xml"
  )
  await expect(
    page.locator('link[rel="alternate"][type="application/rss+xml"]')
  ).toHaveAttribute("href", "https://www.jhass.dev/blog/rss.xml")
  await expect(page.locator('nav a[href="/blog"]').first()).toHaveAttribute(
    "aria-current",
    "page"
  )
})

test("serves a cacheable, valid RSS feed without draft entries", async ({ page, request }) => {
  const response = await request.get("/blog/rss.xml")
  const body = await response.text()

  expect(response.ok()).toBe(true)
  expect(response.headers()["content-type"]).toContain("application/rss+xml")
  expect(response.headers()["cache-control"]).toBe(
    "public, max-age=3600, s-maxage=86400"
  )
  expect(body).toContain("<rss version=\"2.0\"")
  expect(body).toContain('<atom:link href="https://www.jhass.dev/blog/rss.xml" rel="self"')
  for (const post of publishedPosts) {
    expect(body).toContain(`https://www.jhass.dev${post.url}`)
  }
  expect(draftPosts.length).toBeGreaterThan(0)
  for (const post of draftPosts) {
    expect(body).not.toContain(post.url)
  }

  const parsedFeed = await page.evaluate((xml) => {
    const document = new DOMParser().parseFromString(xml, "application/xml")

    return {
      parseError: document.querySelector("parsererror")?.textContent ?? null,
      channelTitle: document.querySelector("channel > title")?.textContent,
      channelLink: document.querySelector("channel > link")?.textContent,
      language: document.querySelector("channel > language")?.textContent,
    }
  }, body)

  expect(parsedFeed).toEqual({
    parseError: null,
    channelTitle: "Joschua Haß — Blog",
    channelLink: "https://www.jhass.dev/blog",
    language: "en",
  })
})

test("serializes RSS items safely in newest-first order", () => {
  const xml = buildRssFeed([
    {
      title: "Older post",
      description: "An earlier dispatch",
      publishedAt: "2026-06-10",
      tags: ["Engineering"],
      url: "/blog/older-post",
    },
    {
      title: 'APIs & architecture <deep dive> "part one"',
      description: "What works, what doesn't & why",
      publishedAt: "2026-07-05",
      tags: ["R&D", "Systems > software"],
      url: "/blog/apis-and-architecture",
    },
  ])

  expect(xml).toContain(
    "<title>APIs &amp; architecture &lt;deep dive&gt; &quot;part one&quot;</title>"
  )
  expect(xml).toContain(
    "<description>What works, what doesn&apos;t &amp; why</description>"
  )
  expect(xml).toContain("<category>R&amp;D</category>")
  expect(xml).toContain("<category>Systems &gt; software</category>")
  expect(xml).toContain("<pubDate>Sun, 05 Jul 2026 00:00:00 GMT</pubDate>")
  expect(xml).toContain(
    '<guid isPermaLink="true">https://www.jhass.dev/blog/apis-and-architecture</guid>'
  )
  expect(xml.indexOf("apis-and-architecture")).toBeLessThan(
    xml.indexOf("older-post")
  )
})

test("returns not found for an unknown article", async ({ page }) => {
  const response = await page.goto("/blog/does-not-exist")

  expect(response?.status()).toBe(404)
  await expect(page.getByRole("heading", { name: en.notFound.title })).toBeVisible()
  await expect(page.getByRole("link", { name: en.notFound.action })).toHaveAttribute("href", "/")
})

test.describe("local draft preview", () => {
  test.skip(!!process.env.CI, "Draft previews are deliberately absent from production builds")

  test("renders rich MDX and copies the article link", async ({ context, page }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"])
    await page.goto("/blog")

    await expect(page.getByRole("heading", { name: en.blog.drafts })).toBeVisible()
    await page
      .getByRole("link", { name: en.blog.readArticle("E2E fixture post") })
      .click()

    // This test only runs against the dev server, where the first visit compiles the post route on demand.
    await expect(page).toHaveURL(/\/blog\/e2e-fixture$/, { timeout: 15_000 })
    await expect(
      page.getByRole("heading", { name: "E2E fixture post" })
    ).toBeVisible()
    await expect(page.getByTestId("blog-back-link")).toHaveCSS(
      "margin-bottom",
      "40px"
    )
    await expect(page.getByText(en.blog.draftPreview, { exact: true }).first()).toBeVisible()
    await expect(page.getByTestId("toc-desktop").getByText(en.blog.onThisPage, { exact: true })).toBeVisible()
    const table = page.getByRole("table")
    await expect(table).toBeVisible()
    await expect(page.getByTestId("blog-table-scroll")).toBeVisible()
    expect(
      await table.evaluate((element) => {
        const tableWidth = element.getBoundingClientRect().width
        const containerWidth = element.parentElement?.clientWidth ?? 0

        return Math.abs(tableWidth - containerWidth)
      })
    ).toBeLessThan(2)
    await expect(page.getByRole("img", { name: "E2E inline image" })).toBeVisible()
    await expect(page.getByTestId("blog-diagram").locator("svg")).toBeVisible()
    await expect(page.getByTestId("blog-diagram")).toContainText("E2E diagram")
    const articleHtml = await (await page.request.get("/blog/e2e-fixture")).text()
    expect(articleHtml).toMatch(/data-testid="blog-diagram"[^>]*><div[^>]*><svg/)

    await page
      .getByRole("button", { name: `${en.blog.enlargeImage}: E2E cover image` })
      .click()
    await expect(
      page.getByRole("dialog", { name: `${en.blog.fullscreenImage}: E2E cover image` })
    ).toBeVisible()
    await page.keyboard.press("Escape")
    await expect(page.getByRole("dialog", { name: en.blog.fullscreenImage })).toBeHidden()

    await page
      .getByRole("button", { name: `${en.blog.enlargeImage}: E2E inline image` })
      .click()
    await expect(
      page.getByRole("dialog", { name: `${en.blog.fullscreenImage}: E2E inline image` })
    ).toBeVisible()
    await page.getByRole("button", { name: en.blog.closeFullscreenImage }).click()
    await expect(page.getByRole("dialog", { name: en.blog.fullscreenImage })).toBeHidden()

    await page.getByRole("button", { name: en.blog.copyLink }).click()
    await expect(page.getByRole("button", { name: en.blog.copied })).toBeVisible()
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/
    )
  })
})
