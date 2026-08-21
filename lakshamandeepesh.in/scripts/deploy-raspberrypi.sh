#!/usr/bin/env bash

set -euo pipefail

SSH_HOST="${1:-raspberrypi.local}"
SERVICE_NAME="lakshamandeepesh-portfolio.service"
SERVICE_ROOT="/mnt/usbdrive/services/lakshamandeepesh.in"
APP_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(cd "$APP_ROOT/.." && pwd)"

if [[ -n "$(git -C "$REPO_ROOT" status --porcelain --untracked-files=normal)" ]]; then
  echo "Refusing to deploy a dirty worktree. Commit the production release first."
  exit 1
fi

COMMIT_SHA="$(git -C "$REPO_ROOT" rev-parse --short HEAD)"
RELEASE_ID="$(date -u +%Y%m%d%H%M%S)-${COMMIT_SHA}"
RELEASE_PATH="$SERVICE_ROOT/releases/$RELEASE_ID"
PREVIOUS_RELEASE="$(ssh "$SSH_HOST" "readlink -f '$SERVICE_ROOT/current' || true")"

SOURCE_ITEMS=(
  app
  components
  content
  docs
  lib
  public
  scripts
  eslint.config.mjs
  next-env.d.ts
  next.config.mjs
  package-lock.json
  package.json
  postcss.config.mjs
  tailwind.config.ts
  tsconfig.json
)

ssh "$SSH_HOST" "mkdir -p '$RELEASE_PATH'"

(
  cd "$APP_ROOT"
  rsync --archive --compress --delete-delay "${SOURCE_ITEMS[@]}" "$SSH_HOST:$RELEASE_PATH/"
)

ssh "$SSH_HOST" "set -e; cd '$RELEASE_PATH'; npm ci; node scripts/run-with-env.mjs '$SERVICE_ROOT/shared/.env.production' npm run build"

ssh "$SSH_HOST" "set -e; ln -s '$RELEASE_PATH' '$SERVICE_ROOT/current.next'; mv -Tf '$SERVICE_ROOT/current.next' '$SERVICE_ROOT/current'; sudo systemctl restart '$SERVICE_NAME'"

HEALTHY=false
for _ in {1..30}; do
  if ssh "$SSH_HOST" "curl --fail --silent --show-error http://127.0.0.1:3100/ >/dev/null"; then
    HEALTHY=true
    break
  fi
  sleep 2
done

if [[ "$HEALTHY" == "true" ]] && ! ssh "$SSH_HOST" "cd '$RELEASE_PATH' && node scripts/smoke-site.mjs http://127.0.0.1:3100 https://lakshmanadeepesh.in"; then
  HEALTHY=false
fi

if [[ "$HEALTHY" != "true" ]]; then
  echo "Health check failed. Restoring the previous release."
  if [[ -n "$PREVIOUS_RELEASE" ]]; then
    ssh "$SSH_HOST" "set -e; ln -s '$PREVIOUS_RELEASE' '$SERVICE_ROOT/current.rollback'; mv -Tf '$SERVICE_ROOT/current.rollback' '$SERVICE_ROOT/current'; sudo systemctl restart '$SERVICE_NAME'"
  fi
  exit 1
fi

echo "Deployed $RELEASE_ID successfully."
