import { expect, test } from "@playwright/test"
import { buildRssFeed } from "../app/lib/rss"

test("renders the public blog empty state and exposes RSS", async ({ page }) => {
  await page.goto("/blog")

  await expect(
    page.getByRole("heading", {
      name: "Ideas, tradeoffs, and things worth writing down.",
    })
  ).toBeVisible()
  await expect(page.locator(".blog-index-header .blog-back-link")).toHaveCount(0)
  await expect(page.getByRole("heading", { name: "The notebook is open." })).toBeVisible()
  await expect(page.getByRole("link", { name: "Follow via RSS" })).toHaveAttribute(
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
  expect(body).toContain("<rss version=\"2.0\">")
  expect(body).not.toContain("Building a Blog That Feels Like Home")

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
  await expect(page.getByText("This page could not be found.")).toBeVisible()
})

test.describe("local draft preview", () => {
  test.skip(!!process.env.CI, "Draft previews are deliberately absent from production builds")

  test("renders rich MDX and copies the article link", async ({ context, page }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"])
    await page.goto("/blog")

    await expect(page.getByRole("heading", { name: "Draft previews" })).toBeVisible()
    await page
      .getByRole("link", { name: "Read Building a Blog That Feels Like Home" })
      .click()

    await expect(page).toHaveURL(/\/blog\/building-the-blog$/)
    await expect(
      page.getByRole("heading", { name: "Building a Blog That Feels Like Home" })
    ).toBeVisible()
    await expect(page.locator(".blog-article-header .blog-back-link")).toHaveCSS(
      "margin-bottom",
      "40px"
    )
    await expect(page.getByText("Draft preview", { exact: true }).first()).toBeVisible()
    await expect(page.locator(".blog-toc-desktop").getByText("On this page", { exact: true })).toBeVisible()
    const table = page.getByRole("table")
    await expect(table).toBeVisible()
    await expect(page.locator(".blog-table-scroll")).toBeVisible()
    expect(
      await table.evaluate((element) => {
        const tableWidth = element.getBoundingClientRect().width
        const containerWidth = element.parentElement?.clientWidth ?? 0

        return Math.abs(tableWidth - containerWidth)
      })
    ).toBeLessThan(2)
    await expect(page.getByRole("img", { name: /Abstract streams of light/ })).toBeVisible()
    await expect(page.locator(".blog-diagram[data-status=\"ready\"] svg")).toBeVisible()
    await expect(page.locator(".blog-diagram")).toContainText("From draft to published post")

    await page
      .getByRole("button", { name: /Enlarge image: Luminous blue and violet/ })
      .click()
    await expect(
      page.getByRole("dialog", { name: /Fullscreen image: Luminous blue and violet/ })
    ).toBeVisible()
    await page.keyboard.press("Escape")
    await expect(page.getByRole("dialog", { name: /Fullscreen image/ })).toBeHidden()

    await page
      .getByRole("button", { name: /Enlarge image: Abstract streams of light/ })
      .click()
    await expect(
      page.getByRole("dialog", { name: /Fullscreen image: Abstract streams of light/ })
    ).toBeVisible()
    await page.getByRole("button", { name: "Close fullscreen image" }).click()
    await expect(page.getByRole("dialog", { name: /Fullscreen image/ })).toBeHidden()

    await page.getByRole("button", { name: "Copy link" }).click()
    await expect(page.getByRole("button", { name: "Copied" })).toBeVisible()
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/
    )
  })
})
