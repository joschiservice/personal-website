import { expect, test, type Page } from "@playwright/test"

async function bodyScrollStyles(page: Page) {
  return page.locator("body").evaluate((body) => ({
    overflow: body.style.overflow,
    position: body.style.position,
    top: body.style.top,
    width: body.style.width,
  }))
}

test("locks and restores body scrolling when the menu toggles", async ({ page }) => {
  await page.goto("/")
  await page.locator("#about-me").scrollIntoViewIfNeeded()
  const initialScrollY = await page.evaluate(() => window.scrollY)

  const openMenu = page.getByRole("button", { name: "Open menu" })
  const menuToggle = page.locator('button[aria-controls="mobile-nav"]')
  await openMenu.click()

  await expect(menuToggle).toHaveAttribute("aria-expanded", "true")
  await expect(page.getByRole("dialog", { name: "Mobile navigation" })).toHaveClass(
    /opacity-100 pointer-events-auto/
  )
  await expect.poll(() => bodyScrollStyles(page)).toEqual({
    overflow: "hidden",
    position: "fixed",
    top: `-${initialScrollY}px`,
    width: "100%",
  })

  await page
    .getByRole("dialog", { name: "Mobile navigation" })
    .getByRole("button", { name: "Close menu" })
    .click()

  await expect.poll(() => bodyScrollStyles(page)).toEqual({
    overflow: "",
    position: "",
    top: "",
    width: "",
  })
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(initialScrollY)
})

test("navigates from the mobile menu and unlocks body scrolling", async ({ page }) => {
  await page.goto("/")

  await page.getByRole("button", { name: "Open menu" }).click()
  const mobileNavigation = page.getByRole("dialog", { name: "Mobile navigation" })
  await mobileNavigation.getByRole("button", { name: "About" }).click()

  await expect(mobileNavigation).toHaveClass(/opacity-0 pointer-events-none/)
  await expect.poll(() => bodyScrollStyles(page)).toEqual({
    overflow: "",
    position: "",
    top: "",
    width: "",
  })
  await expect
    .poll(() =>
      page.locator("#about-me").evaluate((element) => {
        const rect = element.getBoundingClientRect()
        return rect.top < window.innerHeight && rect.bottom > 0
      })
    )
    .toBe(true)
})
