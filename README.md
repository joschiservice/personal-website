## Personal Website (Next.js)

This repository contains the source code for my personal website built with Next.js (App Router), TypeScript, and Tailwind CSS. It showcases my profile, projects, work experience, tools, and interests with subtle animations.

### Tech stack
- **Framework**: Next.js, React (App Router under `app/`)
- **Styling**: Tailwind CSS (see `app/globals.css`)
- **TypeScript**: Strict typing via `tsconfig.json`
- **Animations**: Framer Motion / `motion`
- **Utilities**: `dayjs`, `react-scroll`, `react-icons`
- **Analytics**: `@vercel/analytics`

### Project structure (high level)
```text
app/
  animations/               # Reusable animation components
  components/               # UI components (buttons, cards, navbar, etc.)
  sections/                 # Page sections (Hero, About, Projects, Tools, etc.)
  app/page.tsx              # Home page
  app/layout.tsx            # Root layout
  app/globals.css           # Global styles (Tailwind v4)
public/
  docs/                     # Public documents (e.g., CV PDF)
  img/                      # Various Images
helpers/                    # Helper utilities
```

### Getting started
Prerequisites:
- Node.js 18+ (recommended)

Install dependencies:
```bash
pnpm install
```

Run the development server:
```bash
pnpm dev
```
Open `http://localhost:3000`.

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

### Deployment
The project is optimized for deployment on Vercel.
- Push to the default branch and connect the repo on Vercel
- Environment variables are not required for a basic deploy

### License
All rights reserved. Feel free to reference the structure or ideas, but please do not reuse the content and branding as-is.
