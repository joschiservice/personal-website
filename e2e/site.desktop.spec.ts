import { expect, test, type Page } from "@playwright/test"
import en from "../app/i18n/dictionaries/en"

async function expectSectionInViewport(page: Page, selector: string) {
  await expect
    .poll(() =>
      page.locator(selector).evaluate((element) => {
        const rect = element.getBoundingClientRect()
        return rect.top < window.innerHeight && rect.bottom > 0
      })
    )
    .toBe(true)
}

test("renders the home page and primary actions", async ({ page }) => {
  await page.goto("/")

  await expect(page.getByRole("main")).toBeAttached()
  for (const heading of [
    en.about.statement,
    en.timeline.title,
    en.tools.title,
    en.interests.title,
    en.flightRadar.title,
  ]) {
    await expect(page.getByRole("heading", { name: heading })).toBeAttached()
  }

  await expect(page.getByRole("link", { name: en.footer.contact })).toHaveAttribute(
    "href",
    "/contact"
  )
  await expect(page.getByRole("link", { name: en.hero.secondaryActionLabel })).toHaveAttribute(
    "href",
    "/cv?lang=en"
  )
  await expect(page.getByRole("link", { name: en.hero.secondaryActionLabel })).toHaveAttribute(
    "target",
    "_blank"
  )
  await expect(page.getByRole("link", { name: en.hero.secondaryActionLabel })).toHaveAttribute(
    "rel",
    /noopener/
  )
  const heroSocials = page.getByRole("navigation", { name: en.hero.socialsLabel })
  await expect(heroSocials.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
    "href",
    "https://example.com/linkedin"
  )
  await expect(heroSocials.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
    "href",
    "https://example.com/github"
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.jhass.dev"
  )
})

test("sends Japanese URLs to English while Japanese is switched off", async ({ page }) => {
  await page.goto("/ja/contact")

  await expect(page).toHaveURL(/\/contact$/)
  await expect(page.locator("html")).toHaveAttribute("lang", "en")
  await expect(page.getByLabel(en.nav.languageLabel)).toHaveCount(0)
  await expect(page.locator('link[hreflang="ja"]')).toHaveCount(0)
})

test("renders the contact directory from environment links", async ({ page }) => {
  await page.goto("/contact")

  await expect(
    page.getByRole("heading", { name: `${en.contact.titleLead} ${en.contact.titleAccent}` })
  ).toBeVisible()
  await expect(page.getByRole("link", { name: "e2e@example.com" })).toHaveAttribute(
    "href",
    "mailto:e2e@example.com"
  )
  await expect(page.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
    "href",
    "https://example.com/linkedin"
  )
  await expect(page.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
    "href",
    "https://example.com/github"
  )
  await expect(page.getByRole("link", { name: /Instagram/ })).toHaveAttribute(
    "href",
    "https://example.com/instagram"
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.jhass.dev/contact"
  )
})

test("smoothly navigates to home page sections", async ({ page }) => {
  await page.goto("/")
  const desktopNavigation = page.getByRole("navigation", { name: "Primary" })

  await desktopNavigation.getByRole("link", { name: en.nav.about }).click()
  await expectSectionInViewport(page, "#about-me")

  await desktopNavigation.getByRole("link", { name: en.nav.work }).click()
  await expectSectionInViewport(page, "#experience")
})

test("collapses and reopens the full-name navigation mark", async ({ page }) => {
  await page.goto("/")
  const navigation = page.getByRole("navigation", { name: "Primary" })
  const fullName = navigation.getByText(en.nav.identity, { exact: true })
  const monogram = navigation.getByText(en.nav.monogram, { exact: true })

  await expect(navigation).toHaveAttribute("data-scrolled", "false")
  await expect(fullName).toHaveCSS("opacity", "1")
  await expect(monogram).toHaveCSS("opacity", "0")

  await page.locator("#about-me").scrollIntoViewIfNeeded()
  await page.mouse.move(0, 100)
  await expect(navigation).toHaveAttribute("data-scrolled", "true")
  await expect(monogram).toHaveCSS("opacity", "1")

  await navigation.hover()
  await expect(fullName).toHaveCSS("opacity", "1")
  await expect(monogram).toHaveCSS("opacity", "0")
})

test("presents the profile as an editorial spread", async ({ page }) => {
  await page.goto("/#about-me")
  const profile = page.locator("#about-me")

  await expect(
    profile.getByRole("complementary", {
      name: en.about.annotationsLabel,
    })
  ).toBeVisible()
  await expect(profile.getByTestId("about-lead-story")).toHaveCSS(
    "grid-column-start",
    "1"
  )
  await expect(profile.getByTestId("about-annotations")).toHaveCSS("position", "sticky")
  await expect(profile.getByTestId("about-facts").locator("> div")).toHaveCount(en.about.profileFacts.length)

  const hasHorizontalOverflow = await profile.evaluate(
    (element) => element.scrollWidth > element.clientWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})

test("keeps timeline geometry aligned and disclosure content clipped", async ({ page }) => {
  await page.goto("/#experience")
  const stop = page.locator("[data-timeline-stop]").first()
  const marker = stop.locator("[data-timeline-marker]")

  const alignmentDelta = await stop.evaluate((element, markerElement) => {
    const stopRect = element.getBoundingClientRect()
    const markerRect = (markerElement as HTMLElement).getBoundingClientRect()
    const rail = getComputedStyle(element, "::before")
    const railCenter =
      stopRect.left + Number.parseFloat(rail.left) + Number.parseFloat(rail.width) / 2
    return Math.abs(railCenter - (markerRect.left + markerRect.width / 2))
  }, await marker.elementHandle())
  expect(alignmentDelta).toBeLessThan(1)

  const toggle = page.getByRole("button", { name: en.timeline.readMore }).first()
  const panelId = await toggle.getAttribute("aria-controls")
  const firstTask = page.locator(`[id="${panelId}"] li`).first()
  await expect(firstTask).toBeHidden()
  await toggle.click()
  await expect(firstTask).toBeVisible()
})

test("renders the tools card deck", async ({ page }) => {
  await page.goto("/#tools")
  const collection = page.getByRole("list", {
    name: en.tools.collectionLabel,
  })

  const tools = en.tools.items
  await expect(collection.getByRole("listitem")).toHaveCount(tools.length)
  for (const tool of tools) {
    await expect(collection.locator(`[data-tool="${tool.name}"]`)).toContainText(
      tool.category
    )
  }
  const legendaryCount = tools.filter((tool) => tool.rarity === "Legendary").length
  await expect(
    page.getByRole("list", { name: en.tools.rarityGuideLabel }).locator('[data-rarity="legendary"]')
  ).toContainText(String(legendaryCount).padStart(2, "0"))
})

test("renders imprint contact links", async ({ page }) => {
  await page.goto("/imprint")

  await expect(
    page.getByRole("heading", { name: en.imprint.title })
  ).toBeVisible()
  await expect(page.getByRole("link", { name: "e2e@example.com" })).toHaveAttribute(
    "href",
    "mailto:e2e@example.com"
  )
  await expect(page.getByRole("link", { name: "+49 123 456789" })).toHaveAttribute(
    "href",
    "tel:+49123456789"
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.jhass.dev/imprint"
  )
})

test("opens the CV redirect in a new tab", async ({ context, page }) => {
  await context.route("**/cv?lang=en", async (route) => {
    await route.fulfill({
      status: 302,
      headers: { location: "/e2e-cv.pdf" },
    })
  })
  await context.route("**/e2e-cv.pdf", async (route) => {
    await route.fulfill({
      contentType: "application/pdf",
      body: "%PDF-1.4\n%%EOF",
    })
  })

  await page.goto("/")
  const newTabPromise = context.waitForEvent("page")
  await page.getByRole("link", { name: en.hero.secondaryActionLabel }).click()
  const newTab = await newTabPromise

  await newTab.waitForURL("**/e2e-cv.pdf")
  expect(newTab.url()).toContain("/e2e-cv.pdf")
})

test("serves files that sit outside the localized pages", async ({ request }) => {
  const response = await request.get("/.well-known/discord")

  expect(response.status()).toBe(200)
})

test("redirects locale prefixes on routes that aren't localized", async ({ request }) => {
  for (const path of ["/cv", "/blog/rss.xml", "/sitemap.xml"]) {
    const response = await request.get(`/en${path}`, { maxRedirects: 0 })

    expect(response.status()).toBe(308)
    expect(response.headers().location).toBe(path)
  }
})

test("includes the 404 page in the server's HTML", async ({ request }) => {
  for (const path of ["/missing-page", "/missing-file.png", "/blog/missing-post"]) {
    const response = await request.get(path)

    expect(response.status()).toBe(404)
    expect(await response.text()).toContain(`<h1>${en.notFound.title}</h1>`)
  }
})

test("shows the site's 404 page for a missing file", async ({ page }) => {
  const response = await page.goto("/missing-file.png")

  expect(response?.status()).toBe(404)
  await expect(page.getByRole("heading", { name: en.notFound.title })).toBeVisible()
  await expect(page.getByRole("navigation").first()).toBeVisible()
})
