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
    "About Me",
    "Career Timeline",
    "Tools, Frameworks & Services",
    "Interests & Passions",
    "FlightRadar24 Flights Summary",
  ]) {
    await expect(page.getByRole("heading", { name: heading })).toBeAttached()
  }

  await expect(page.getByRole("link", { name: "Contact via email" })).toHaveAttribute(
    "href",
    "mailto:e2e@example.com"
  )
  await expect(page.getByRole("link", { name: "Download CV" })).toHaveAttribute(
    "href",
    "/cv"
  )
  await expect(page.getByRole("link", { name: "Download CV" })).toHaveAttribute(
    "target",
    "_blank"
  )
})

test("smoothly navigates to home page sections", async ({ page }) => {
  await page.goto("/")
  const desktopNavigation = page.locator("nav > div").first()

  await desktopNavigation.getByRole("button", { name: "About" }).click()
  await expectSectionInViewport(page, "#about-me")

  await desktopNavigation.getByRole("button", { name: "Timeline" }).click()
  await expectSectionInViewport(page, "#experience")
})

test("renders imprint contact links", async ({ page }) => {
  await page.goto("/imprint")

  await expect(
    page.getByRole("heading", { name: "Imprint/Legal Disclosure" })
  ).toBeVisible()
  await expect(page.getByRole("link", { name: "e2e@example.com" })).toHaveAttribute(
    "href",
    "mailto:e2e@example.com"
  )
  await expect(page.getByRole("link", { name: "+49 123 456789" })).toHaveAttribute(
    "href",
    "tel:+49123456789"
  )
})

test("opens the CV redirect in a new tab", async ({ context, page }) => {
  await context.route("**/cv", async (route) => {
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
