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
- `npm run build:git-deploy`

`npm run build` generates Atom feed first, then creates static output in `out/`.
`npm run build:git-deploy` builds and syncs `out/` into the project web-root files (`index.html`, `_next/`, route folders) so deployment can be done via Git pull only.

## Environment Variables
- `NEXT_PUBLIC_WAITLIST_FORM_ACTION`
- `NEXT_PUBLIC_NEWSLETTER_FORM_ACTION`

Set these to your external form endpoints (e.g., Formspree) to activate waitlist and newsletter forms.

## Deploy (DigitalOcean + Nginx, Git Pull Only)
1. Build and sync static web-root files locally: `npm run build:git-deploy`
2. Commit and push the generated static files.
3. On droplet, run only:
   - `cd /var/www/html`
   - `git pull`
4. Keep existing host-level canonical redirects in Nginx (`http -> https`, non-www -> `www`).
