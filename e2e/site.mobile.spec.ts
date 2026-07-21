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
  const mobileMenu = page.locator("#mobile-nav")
  await expect(page.getByRole("navigation", { name: "Primary" })).toHaveAttribute(
    "data-scrolled",
    "true"
  )
  await expect(page.getByRole("dialog", { name: "Mobile navigation" })).toHaveCount(0)
  await expect(mobileMenu).toHaveAttribute("aria-hidden", "true")
  await openMenu.click()

  await expect(menuToggle).toHaveAttribute("aria-expanded", "true")
  await expect(page.getByRole("dialog", { name: "Mobile navigation" })).toHaveAttribute(
    "data-open",
    "true"
  )
  await expect(page.getByRole("dialog", { name: "Mobile navigation" }).getByRole("link", { name: "Work" })).toBeFocused()
  await expect
    .poll(() =>
      mobileMenu.evaluate((menu) => {
        const rect = menu.getBoundingClientRect()
        return {
          top: Math.round(rect.top),
          fillsViewport: Math.round(rect.bottom) === window.innerHeight,
        }
      })
    )
    .toEqual({ top: 64, fillsViewport: true })
  await expect.poll(() => bodyScrollStyles(page)).toEqual({
    overflow: "hidden",
    position: "",
    top: "",
    width: "",
  })

  await page.getByRole("button", { name: "Close menu" }).click()

  await expect.poll(() => bodyScrollStyles(page)).toEqual({
    overflow: "",
    position: "",
    top: "",
    width: "",
  })
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(initialScrollY)
  await expect(mobileMenu).toHaveAttribute("aria-hidden", "true")
})

test("exposes a single language toggle inside the mobile menu", async ({ page }) => {
  await page.goto("/ja")

  await page.getByRole("button", { name: "メニューを開く" }).click()
  const navigation = page.getByRole("dialog", { name: "モバイルナビゲーション" })

  await expect(navigation.getByRole("link", { name: "01 経歴" })).toBeFocused()
  await expect(navigation.getByRole("link", { name: "英語" })).toHaveAttribute(
    "href",
    "/"
  )
  await expect(navigation.locator(".site-language--mobile a")).toHaveCount(1)
})

test("keeps the hero actions clear of the continuation control and section edge", async ({ page }) => {
  await page.goto("/")

  const spacing = await page.locator(".hero").evaluate((hero) => {
    const actions = hero.querySelector(".hero__actions")
    const continuation = hero.querySelector(".hero__continuation")
    if (!actions || !continuation) return null

    const heroRect = hero.getBoundingClientRect()
    const actionsRect = actions.getBoundingClientRect()
    const continuationRect = continuation.getBoundingClientRect()

    return {
      actionToEdge: heroRect.bottom - actionsRect.bottom,
      actionsOverlapContinuation:
        actionsRect.left < continuationRect.right &&
        actionsRect.right > continuationRect.left &&
        actionsRect.top < continuationRect.bottom &&
        actionsRect.bottom > continuationRect.top,
    }
  })

  expect(spacing).not.toBeNull()
  expect(spacing?.actionToEdge).toBeGreaterThanOrEqual(96)
  expect(spacing?.actionsOverlapContinuation).toBe(false)
})

test("traps focus and closes the mobile menu with Escape", async ({ page }) => {
  await page.goto("/")

  const menuToggle = page.getByRole("button", { name: "Open menu" })
  await menuToggle.click()
  const mobileNavigation = page.getByRole("dialog", { name: "Mobile navigation" })
  await expect(mobileNavigation.getByRole("link", { name: "Work" })).toBeFocused()

  await page.keyboard.press("Shift+Tab")
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused()
  await page.keyboard.press("Shift+Tab")
  await expect(mobileNavigation.getByRole("link", { name: "Japanese" })).toBeFocused()

  await page.keyboard.press("Escape")
  await expect(page.locator("#mobile-nav")).toHaveAttribute("aria-hidden", "true")
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused()
})

test("navigates from the mobile menu and unlocks body scrolling", async ({ page }) => {
  await page.goto("/")

  await page.getByRole("button", { name: "Open menu" }).click()
  const mobileNavigation = page.getByRole("dialog", { name: "Mobile navigation" })
  await mobileNavigation.getByRole("link", { name: "About" }).click()

  await expect(page.locator("#mobile-nav")).toHaveAttribute("data-open", "false")
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

test("reflows the editorial profile into a single reading column", async ({ page }) => {
  await page.goto("/#about-me")
  const profile = page.locator("#about-me")
  const layout = await profile.evaluate((element) => {
    const narrative = element.querySelector(".about-section__narrative")
    const annotations = element.querySelector(".about-section__annotations")

    return {
      narrativeColumns: narrative ? getComputedStyle(narrative).gridTemplateColumns : "",
      annotationsPosition: annotations ? getComputedStyle(annotations).position : "",
      hasHorizontalOverflow: element.scrollWidth > element.clientWidth,
    }
  })

  expect(layout.annotationsPosition).toBe("static")
  expect(layout.narrativeColumns.split(" ")).toHaveLength(1)
  expect(layout.hasHorizontalOverflow).toBe(false)
})
