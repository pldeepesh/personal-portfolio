# lakshmanadeepesh.in (Next.js Static Export)

Editorial-first website focused on experimentation and growth analytics.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- MDX content in `content/posts`
- Static export for Nginx deployment (`output: 'export'`)

## Commands
- `npm install`
- `npm run validate:content`
- `npm run build`

`npm run build` generates Atom feed first, then creates static output in `out/`.

## Environment Variables
- `NEXT_PUBLIC_WAITLIST_FORM_ACTION`
- `NEXT_PUBLIC_NEWSLETTER_FORM_ACTION`

Set these to your external form endpoints (e.g., Formspree) to activate waitlist and newsletter forms.

## Deploy (DigitalOcean + Nginx)
1. Build locally or in CI: `npm run build`
2. Deploy contents of `out/` to the web root served by Nginx.
3. Keep existing host-level canonical redirects in Nginx (`http -> https`, non-www -> `www`).
