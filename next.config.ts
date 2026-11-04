import { withContentCollections } from "@content-collections/next";
import { withSentryConfig } from "@sentry/nextjs/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Restarting next dev on a warm cache can make a page reload forever (seen on 16.4.4 and 16.4.5).
    // Remove this once https://github.com/vercel/next.js/issues/100251 is fixed.
    turbopackFileSystemCacheForDev: false,
  },
  turbopack: {
    // Stops Next from treating a lockfile in a parent folder as the project root.
    // Not __dirname: Node's native TypeScript resolver loads this file as ESM, where it is undefined.
    root: process.cwd(),
  },
  // Lets phones on the local network load the dev server, whatever IP the Mac has
  // (by address on any 192.168.x.x network, or by its Bonjour name).
  allowedDevOrigins: ["192.168.*.*", "*.local"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "banners-my.flightradar24.com",
        pathname: "/joschi_service.png",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

const sentryConfig = withSentryConfig(nextConfig, {
  org: "the-visualcable-collective",
  project: "personal-website",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // The matcher in proxy.ts must exclude this route, or client-side error reporting fails.
  tunnelRoute: "/monitoring",
});

export default withContentCollections(sentryConfig);
