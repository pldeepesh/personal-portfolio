# lakshmanadeepesh.in

Editorial-first website focused on experimentation and growth analytics.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- MDX content in `content/posts`
- Server-rendered Next.js behind Nginx on a DigitalOcean droplet

## Commands
- `npm install`
- `npm run validate:content`
- `npm run lint`
- `npm run build`
- `npm run start`

Use Node 22 for local tooling:

```bash
nvm use 22
```

`npm run build` generates the Atom feed first, then builds the Next.js app for server deployment.

## Environment Variables
- `RESEND_API_KEY`
- `LEAD_EMAIL_TO`
- `RESEND_FROM`
- `NEXT_PUBLIC_CALENDAR_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_CLARITY_PROJECT_ID`

Contact, newsletter, waitlist, and tool result forms submit to internal Next.js route handlers and send lead emails through Resend.

## Deploy (DigitalOcean + Nginx)
1. Pull the branch on the droplet.
2. Run `nvm use 22`.
3. Run `npm ci`.
4. Run `npm run build`.
5. Start or reload the Next.js process with `npm run start` under a process manager such as PM2 or systemd.
6. Configure Nginx to proxy the site host to the local Next.js port.
