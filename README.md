# Personal Website (Next.js)

This repository contains the source for my personal website. It is a server-first Next.js application with a small number of focused client components for navigation, filtering, disclosures, and image lightboxes.

### Tech stack
- **Framework**: Next.js, React (App Router under `app/`)
- **Styling**: Tailwind CSS v4 plus a token-based editorial design system
- **TypeScript**: Strict typing via `tsconfig.json`
- **Content**: Typed MDX through Content Collections
- **Motion**: Motion for interactive transitions, with reduced-motion support
- **Observability**: Sentry, Vercel Analytics, and Speed Insights
- **Testing**: Playwright across desktop and mobile Chromium profiles
- **Localization**: Request-aware dictionaries with locale-safe internal links

### Project structure (high level)
```text
app/
  components/               # Shared system, navigation, and blog UI
  data/                     # Portfolio content and structured timeline data
  i18n/                     # Locale configuration and typed dictionaries
  lib/                      # Blog, CV, RSS, date, and site helpers
  sections/                 # Homepage sections
  blog/                     # Blog index, article pages, and RSS route
  page.tsx                  # Homepage
  layout.tsx                # Root layout and shared chrome
  globals.css               # Tailwind entrypoint and design system
content/posts/              # Validated MDX articles
e2e/                        # Desktop and mobile Playwright coverage
public/
  img/                      # Optimized local image assets
```

### Getting started
Prerequisites:
- Node.js 20.9+ (Node.js 24 LTS recommended)

Install dependencies:
```bash
pnpm install
```

Run the development server:
```bash
pnpm dev
```
Open `http://localhost:3000`.

Contact and social links are configured with these optional variables:

```text
NEXT_PUBLIC_CONTACT_EMAIL
NEXT_PUBLIC_CONTACT_PHONE
NEXT_PUBLIC_SOCIAL_LINKEDIN
NEXT_PUBLIC_SOCIAL_GITHUB
NEXT_PUBLIC_SOCIAL_INSTAGRAM
```

The CV route reads the latest localized `*_CV_EN.pdf`, `*_CV_DE.pdf`, etc. file from Vercel Blob and therefore requires the standard Vercel Blob credentials outside the test suite. Requests use the site locale (`/cv?lang=de`, for example), match its uppercase language code, and fall back to English when that language is unavailable. Legacy `*_CV.pdf` uploads are treated as English.

Build for production:
```bash
pnpm build
```

Start the production server:
```bash
pnpm start
```

Lint:
```bash
pnpm lint
```

### End-to-end testing
Install the Chromium browser used by Playwright once:
```bash
pnpm exec playwright install chromium
```

Run the Playwright smoke suite:
```bash
pnpm test:e2e
```

To intentionally test an already-running local server, set `PLAYWRIGHT_REUSE_EXISTING_SERVER=true`. The default remains an isolated server with deterministic test environment values.

Open Playwright's interactive test runner:
```bash
pnpm test:e2e:ui
```

### Quality checks

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm test:e2e
```

### Deployment
The project is optimized for deployment on Vercel.
- Push to the default branch and connect the repo on Vercel
- Configure contact/social values and Vercel Blob access for the complete production experience

### License
All rights reserved. Feel free to reference the structure or ideas, but please do not reuse the content and branding as-is.
