import localFont from "next/font/local";

export const onest = localFont({
  src: "../../node_modules/@fontsource-variable/onest/files/onest-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-onest",
});

export const instrumentSans = localFont({
  src: "../../node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2",
  weight: "400 700",
  variable: "--font-instrument-sans",
});

export const jetbrainsMono = localFont({
  src: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  variable: "--font-jetbrains-mono",
  // Only used for small labels and code, so it isn't worth preloading on every page.
  preload: false,
  adjustFontFallback: false,
});

// The tool cards' "№" is in the Cyrillic subset. The browser only downloads this where it's used.
export const jetbrainsMonoNumero = localFont({
  src: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-cyrillic-wght-normal.woff2",
  weight: "100 800",
  variable: "--font-jetbrains-mono-numero",
  preload: false,
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+2116" }],
});
