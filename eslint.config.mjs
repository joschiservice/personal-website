import nextCoreWebVitals from "eslint-config-next/core-web-vitals"

const config = [
  ...nextCoreWebVitals,
  {
    ignores: [
      ".content-collections/**",
      "playwright-report/**",
      "test-results/**",
      "blob-report/**",
    ],
  },
]

export default config
