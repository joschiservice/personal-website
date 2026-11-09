import { expect, test } from "@playwright/test"
import en from "../app/i18n/dictionaries/en"

test("navigates to the blog from the mobile menu", async ({ page }) => {
  await page.goto("/")

  await page.getByRole("button", { name: "Open menu" }).click()
  const mobileNavigation = page.getByRole("dialog", { name: "Mobile navigation" })
  await mobileNavigation.getByRole("link", { name: en.nav.notes }).click()

  await expect(page).toHaveURL(/\/blog$/)
  await expect(page.locator("#mobile-nav")).toHaveAttribute("data-open", "false")
  await expect(
    page.getByRole("heading", { level: 1, name: en.blog.title, exact: true })
  ).toBeVisible()
})

test.describe("local mobile draft reader", () => {
  test.skip(!!process.env.CI, "Draft previews are deliberately absent from production builds")

  test("uses the compact table of contents", async ({ page }) => {
    await page.goto("/blog/e2e-fixture")

    await expect(page.getByTestId("blog-back-link")).toHaveCSS(
      "margin-bottom",
      "28px"
    )
    const contents = page.getByTestId("toc-mobile")
    await expect(contents).toBeVisible()
    await contents.getByText(en.blog.onThisPage, { exact: true }).click()
    await expect(contents.getByRole("link", { name: "E2E image section" })).toBeVisible()
  })
})
