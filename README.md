# Consumer Data Readiness — Portfolio Site

A portfolio site presenting three connected learning projects, built on synthetic data:

1. **Consumer Data Readiness Analysis** (SQL + Excel)
2. **Automated Data Quality Monitor** (Python + pandas)
3. **Media Activation & Performance Dashboard** (Power BI + DAX)

Source of truth for all content: [paulard10/consumer-data-readiness-portfolio](https://github.com/paulard10/consumer-data-readiness-portfolio).

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui (Base UI, `lyra` style) · Motion

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build + typecheck
```

## Editing content

- `content/projects.ts`: every project's copy, findings, screenshots and GitHub links. Figures are quoted from the repository READMEs; keep them in sync when the repo changes.
- `content/site.ts`: your name, email, LinkedIn and the synthetic-data disclaimer.
- `public/screenshots/`: screenshots copied from the repository's `*/screenshots/` folders.

## Deploy

Push to GitHub and import the repository in Vercel. No environment variables are needed, and every page is statically generated.
