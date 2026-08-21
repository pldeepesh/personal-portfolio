# lakshmanadeepesh.in

Editorial-first website focused on experimentation and growth analytics.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- MDX content in `content/posts`
- Server-rendered Next.js on a Raspberry Pi, published through a Cloudflare Tunnel

## Commands
- `npm install`
- `npm run validate:content`
- `npm run lint`
- `npm run build`
- `npm run start`
- `npm run smoke -- https://lakshmanadeepesh.in`

Use Node 22 for local tooling:

```bash
nvm use 22
```

`npm run build` generates the Atom feed first, then builds the Next.js app for server deployment.

## Environment Variables
- `RESEND_API_KEY`
- `LEAD_EMAIL_TO`
- `RESEND_FROM`
- `RESEND_NEWSLETTER_SEGMENT_ID`
- `NEXT_PUBLIC_CALENDAR_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_CLARITY_PROJECT_ID`

Contact, waitlist, and tool result forms submit to internal Next.js route handlers and send email through Resend. Newsletter requests use encrypted, expiring confirmation tokens and add confirmed subscribers to the configured Resend Segment; Resend is the subscriber source of truth, so no local subscriber database is required.

## Deploy (Raspberry Pi + Cloudflare Tunnel)

Production runs as `lakshamandeepesh-portfolio.service` on `127.0.0.1:3100`. The Cloudflare Tunnel service publishes the apex and `www` hostnames. Releases live under `/mnt/usbdrive/services/lakshamandeepesh.in/releases`, and `current` is an atomic symlink to the active release.

1. Commit the release on a non-default branch.
2. Run `npm run verify` locally.
3. Run `npm run deploy:pi` from a clean worktree, or execute `scripts/deploy-raspberrypi.sh` directly.
4. The deploy script uploads only runtime source/configuration, installs dependencies and builds on the Pi, switches the `current` symlink, restarts systemd, and runs route, canonical, indexing, sitemap, feed, and 404 smoke checks.
5. If any health or smoke check fails, the script restores the previous release and restarts it automatically.

Production secrets remain in `/mnt/usbdrive/services/lakshamandeepesh.in/shared/.env.production` and are never copied into a release.
