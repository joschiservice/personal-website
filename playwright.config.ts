import { defineConfig, devices } from "@playwright/test"

const baseURL = "http://127.0.0.1:3000"
const testEnv = {
  NEXT_PUBLIC_CONTACT_EMAIL: "e2e@example.com",
  NEXT_PUBLIC_CONTACT_PHONE: "+49 123 456789",
  NEXT_PUBLIC_SOCIAL_LINKEDIN: "https://example.com/linkedin",
  NEXT_PUBLIC_SOCIAL_GITHUB: "https://example.com/github",
  NEXT_PUBLIC_SOCIAL_INSTAGRAM: "https://example.com/instagram",
}

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"]],
  use: {
    baseURL,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    video: "retain-on-failure",
  },
  webServer: {
    command: process.env.CI ? "pnpm start" : "pnpm dev --hostname 127.0.0.1",
    env: {
      ...process.env,
      ...testEnv,
    },
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    {
      name: "desktop-chromium",
      testMatch: "**/*.desktop.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chromium",
      testMatch: "**/*.mobile.spec.ts",
      use: { ...devices["Pixel 7"] },
    },
  ],
})
