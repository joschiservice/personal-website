import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"
import tseslint from "typescript-eslint"

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    files: ["**/*.{ts,tsx,mts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { projectService: true },
    },
    rules: {
      // Catches a missing await, which can let a Playwright test pass without checking anything.
      "@typescript-eslint/no-floating-promises": "error",
    },
  },
  {
    ignores: [".content-collections/**", "playwright-report/**", "test-results/**"],
  },
]

export default config
