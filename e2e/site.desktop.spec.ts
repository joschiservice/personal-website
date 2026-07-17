import { expect, test, type Page } from "@playwright/test"

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
    "Product-minded engineering, from interface decisions to production ownership.",
    "Career Timeline",
    "Tools are means, not the story.",
    "Interests & Passions",
    "The route continues off-screen.",
  ]) {
    await expect(page.getByRole("heading", { name: heading })).toBeAttached()
  }

  await expect(page.getByRole("link", { name: "Start a conversation" })).toHaveAttribute(
    "href",
    "/contact"
  )
  await expect(page.getByRole("link", { name: "Download CV" })).toHaveAttribute(
    "href",
    "/cv?lang=en"
  )
  await expect(page.getByRole("link", { name: "Download CV" })).toHaveAttribute(
    "target",
    "_blank"
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.jhass.dev"
  )
})

test("renders Japanese content and preserves the current section when switching", async ({ page }) => {
  await page.goto("/#about-me")

  await page.getByRole("link", { name: "Japanese" }).click()

  await expect(page).toHaveURL(/\/ja#about-me$/)
  await expect(page.locator("html")).toHaveAttribute("lang", "ja")
  await expect(
    page.getByRole("heading", {
      name: "UIの判断から本番運用まで、プロダクトを考え抜くエンジニアリング。",
    })
  ).toBeVisible()
  await expect(page.getByRole("navigation", { name: "メインナビゲーション" })).toBeVisible()
  await expect(page.getByRole("link", { name: "英語", exact: true })).toHaveAttribute(
    "href",
    "/"
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.jhass.dev/ja"
  )
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
    "href",
    "https://www.jhass.dev"
  )
})

test("renders the contact directory from environment links", async ({ page }) => {
  await page.goto("/contact")

  await expect(
    page.getByRole("heading", { name: "Good work starts with a conversation." })
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

  await desktopNavigation.getByRole("link", { name: "About" }).click()
  await expectSectionInViewport(page, "#about-me")

  await desktopNavigation.getByRole("link", { name: "Work" }).click()
  await expectSectionInViewport(page, "#experience")
})

test("collapses and reopens the full-name navigation mark", async ({ page }) => {
  await page.goto("/")
  const navigation = page.getByRole("navigation", { name: "Primary" })
  const fullName = navigation.getByText("Joschua Haß", { exact: true })
  const monogram = navigation.getByText("JH", { exact: true })

  await expect(navigation).toHaveAttribute("data-scrolled", "false")
  await expect(fullName).toHaveCSS("opacity", "1")
  await expect(monogram).toHaveCSS("opacity", "0")

  await page.locator("#about-me").scrollIntoViewIfNeeded()
  await expect(navigation).toHaveAttribute("data-scrolled", "true")
  await expect(monogram).toHaveCSS("opacity", "1")

  await navigation.hover()
  await expect(fullName).toHaveCSS("opacity", "1")
  await expect(monogram).toHaveCSS("opacity", "0")
})

test("presents the profile as an editorial spread", async ({ page }) => {
  await page.goto("/#about-me")
  const profile = page.locator("#about-me")

  await expect(profile.getByRole("complementary", { name: "Operating principles" })).toBeVisible()
  await expect(profile.locator(".about-section__lead-story")).toHaveCSS(
    "grid-column-start",
    "1"
  )
  await expect(profile.locator(".about-section__annotations")).toHaveCSS("position", "sticky")
  await expect(profile.locator(".principle-list > div")).toHaveCount(3)

  const hasHorizontalOverflow = await profile.evaluate(
    (element) => element.scrollWidth > element.clientWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})

test("keeps timeline geometry aligned and disclosure content clipped", async ({ page }) => {
  await page.goto("/#experience")
  const route = page.locator("[data-timeline-route]").first()
  const marker = route.locator("[data-timeline-marker]")

  const alignmentDelta = await route.evaluate((element, markerElement) => {
    const routeRect = element.getBoundingClientRect()
    const markerRect = (markerElement as HTMLElement).getBoundingClientRect()
    const railLeft = Number.parseFloat(getComputedStyle(element, "::after").left)
    return Math.abs(routeRect.left + railLeft - (markerRect.left + markerRect.width / 2))
  }, await marker.elementHandle())
  expect(alignmentDelta).toBeLessThan(1)

  const firstTask = page.locator("#experience li").first()
  await expect(firstTask).toBeHidden()
  await page.getByRole("button", { name: "Read more" }).first().click()
  await expect(firstTask).toBeVisible()
})

test("filters the compact tools card grid", async ({ page }) => {
  await page.goto("/#tools")
  await expect(page.locator(".tool-card")).toHaveCount(8)

  await page.getByRole("button", { name: "Frameworks" }).click()
  await expect(page.getByRole("button", { name: "Frameworks" })).toHaveAttribute(
    "aria-pressed",
    "true"
  )
  await expect(page.locator(".tool-card")).toHaveCount(2)
})

test("renders imprint contact links", async ({ page }) => {
  await page.goto("/imprint")

  await expect(
    page.getByRole("heading", { name: "Imprint / Legal disclosure" })
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
  await page.getByRole("link", { name: "Download CV" }).click()
  const newTab = await newTabPromise

  await newTab.waitForURL("**/e2e-cv.pdf")
  expect(newTab.url()).toContain("/e2e-cv.pdf")
})
