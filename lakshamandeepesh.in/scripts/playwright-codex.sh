#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
ORIGINAL_HOME="${HOME:-}"
NODE_VERSION="${PLAYWRIGHT_NODE_VERSION:-$(<"${PROJECT_ROOT}/.nvmrc")}"

if [[ -z "${ORIGINAL_HOME}" ]]; then
  echo "Error: HOME is not set." >&2
  exit 1
fi

if [[ -f "${ORIGINAL_HOME}/.nvm/nvm.sh" ]]; then
  # Load nvm before overriding HOME for Playwright temp storage.
  unset npm_config_prefix NPM_CONFIG_PREFIX
  # shellcheck source=/dev/null
  source "${ORIGINAL_HOME}/.nvm/nvm.sh"
  nvm use "${NODE_VERSION}" >/dev/null
fi

if ! command -v node >/dev/null 2>&1; then
  echo "Error: node is not available on PATH." >&2
  exit 1
fi

NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
if [[ "${NODE_MAJOR}" -lt 18 ]]; then
  echo "Error: Playwright CLI requires Node 18+. Current version: $(node -v)" >&2
  echo "Install/use Node ${NODE_VERSION} or set PLAYWRIGHT_NODE_VERSION to another >=18 version." >&2
  exit 1
fi

CODEX_HOME="${CODEX_HOME:-${ORIGINAL_HOME}/.codex}"
PWCLI="${PWCLI:-${CODEX_HOME}/skills/playwright/scripts/playwright_cli.sh}"

if [[ ! -x "${PWCLI}" ]]; then
  echo "Error: Playwright skill wrapper not found at ${PWCLI}" >&2
  exit 1
fi

export HOME="${PLAYWRIGHT_TMP_HOME:-/private/tmp/codex-playwright-home}"
export XDG_CACHE_HOME="${PLAYWRIGHT_XDG_CACHE_HOME:-/private/tmp/codex-playwright-cache}"
export PLAYWRIGHT_BROWSERS_PATH="${PLAYWRIGHT_BROWSERS_PATH:-/private/tmp/codex-playwright-browsers}"
export PLAYWRIGHT_OUTPUT_DIR="${PLAYWRIGHT_OUTPUT_DIR:-${PROJECT_ROOT}/output/playwright}"

mkdir -p "${HOME}" "${XDG_CACHE_HOME}" "${PLAYWRIGHT_BROWSERS_PATH}" "${PLAYWRIGHT_OUTPUT_DIR}"

exec "${PWCLI}" "$@"
