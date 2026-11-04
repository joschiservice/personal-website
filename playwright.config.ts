import { defineConfig, devices } from "@playwright/test"

const isCI = !!process.env.CI
const baseURL = "http://localhost:3100"
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
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"]],
  use: {
    baseURL,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: isCI
      ? "pnpm start --hostname localhost --port 3100"
      : "pnpm dev --hostname localhost --port 3100",
    env: testEnv,
    url: baseURL,
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
