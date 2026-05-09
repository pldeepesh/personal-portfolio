# Playwright in Codex

This repo uses the Codex Playwright skill through a local launcher:

```bash
npm run playwright:help
npm run playwright -- open https://example.com
```

The launcher standardizes three things:

- Node runtime: uses `.nvmrc` and expects Node `22.14.0`
- Temp runtime paths:
  - `HOME=/private/tmp/codex-playwright-home`
  - `XDG_CACHE_HOME=/private/tmp/codex-playwright-cache`
  - `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/codex-playwright-browsers`
- Output directory: `output/playwright/`

## Expected execution model

Some Playwright commands can run inside the default Codex sandbox:

- `npm run playwright:help`
- static inspection commands such as `list`

Browser-launching and browser-session commands should be run with escalation in Codex for this machine:

- `open`
- `snapshot`
- `click`
- `fill`
- `screenshot`
- `install-browser`
- other commands that start or interact with a live browser session

Without escalation, this environment currently fails with sandbox errors such as:

- cache/session writes under `~/Library/Caches/ms-playwright/...`
- `listen EPERM: operation not permitted 0.0.0.0`

## Examples

```bash
# Safe sandboxed check
npm run playwright:help

# Browser session commands: run with escalation in Codex
npm run playwright -- --session audit open https://www.lakshmanadeepesh.in/products/
npm run playwright -- --session audit snapshot
npm run playwright -- --session audit screenshot --filename=output/playwright/products-page.png
npm run playwright -- --session audit close
```

## Notes

- `output/playwright/` is ignored by Git.
- The local launcher does not bypass Codex sandboxing; it just makes the Playwright runtime consistent once the command is allowed to run.
