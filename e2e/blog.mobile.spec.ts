import { expect, test } from "@playwright/test"

test("navigates to the blog from the mobile menu", async ({ page }) => {
  await page.goto("/")

  await page.getByRole("button", { name: "Open menu" }).click()
  const mobileNavigation = page.getByRole("dialog", { name: "Mobile navigation" })
  await mobileNavigation.getByRole("link", { name: "Notes" }).click()

  await expect(page).toHaveURL(/\/blog$/)
  await expect(page.locator("#mobile-nav")).toHaveAttribute("data-open", "false")
  await expect(
    page.getByRole("heading", {
      name: "Ideas, tradeoffs, and things worth writing down.",
    })
  ).toBeVisible()
})

test.describe("local mobile draft reader", () => {
  test.skip(!!process.env.CI, "Draft previews are deliberately absent from production builds")

  test("uses the compact table of contents", async ({ page }) => {
    await page.goto("/blog/building-the-blog")

    await expect(page.locator(".blog-article-header .blog-back-link")).toHaveCSS(
      "margin-bottom",
      "28px"
    )
    const contents = page.locator("details.blog-toc-mobile")
    await expect(contents).toBeVisible()
    await contents.getByText("On this page", { exact: true }).click()
    await expect(contents.getByRole("link", { name: "Images are part of the story" })).toBeVisible()
  })
})
