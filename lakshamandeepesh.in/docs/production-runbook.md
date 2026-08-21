# Production runbook

## Architecture

Traffic reaches `lakshmanadeepesh.in` through Cloudflare Tunnel. The tunnel forwards the apex and `www` hostnames to the Next.js service bound to `127.0.0.1:3100` on the Raspberry Pi. The Next.js origin permanently redirects HTTP and `www` requests to the canonical apex HTTPS origin while preserving the requested path and query string.

The systemd unit is `lakshamandeepesh-portfolio.service`. Releases are stored under `/mnt/usbdrive/services/lakshamandeepesh.in/releases`, and the `current` symlink selects the active release. Secrets live in `shared/.env.production` outside release directories. Confirmed newsletter subscribers are stored in the Resend Segment configured by `RESEND_NEWSLETTER_SEGMENT_ID`; encrypted confirmation tokens expire after 24 hours, so the site does not maintain a subscriber database.

## Release gates

1. Work on a non-default branch and commit every release file.
2. Confirm the worktree is clean and the branch is pushed.
3. Run `npm run verify` locally.
4. Run `npm audit` and require zero known advisories.
5. Run `npm run deploy:pi`.
6. The deploy must pass its local Pi smoke suite before it is accepted.
7. Run `npm run smoke -- https://lakshmanadeepesh.in` against Cloudflare after deployment.
8. Verify one controlled submission for each production form using an owner-controlled email address.

The smoke suite checks homepage and blog canonicals, HTTP and `www` redirects, live-tool indexing, unfinished-tool exclusion from the sitemap, 404 indexing behavior, canonical sitemap/feed hostnames, and the robots sitemap declaration.

## Rollback

The deployment script records the previous `current` target. If startup or smoke verification fails, it atomically restores that target and restarts the service.

For a manual rollback, resolve the intended release first, point a temporary symlink at its absolute path, atomically replace `current`, restart `lakshamandeepesh-portfolio.service`, and run the smoke suite against `127.0.0.1:3100`.

## Decisions requiring owner approval

- HSTS, Content Security Policy, browser security headers, and public rate limits.
- Core design-system or conversion-flow changes.
- Production calendar URL and any paid scheduling integration.

## Content and growth operations

- Publish from MDX with validated frontmatter and intentional internal links.
- Keep unfinished tools out of the sitemap and marked `noindex` until they deliver a real result.
- Review Search Console, GA4 acquisition, tool completion, lead conversion, and booked-call conversion at least monthly.
- Never claim a subscriber confirmation, emailed result, or form success unless the downstream provider confirms delivery.
