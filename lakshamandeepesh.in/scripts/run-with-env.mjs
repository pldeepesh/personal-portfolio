#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const [environmentFile, command, ...args] = process.argv.slice(2);

if (!environmentFile || !command) {
  console.error('Usage: node scripts/run-with-env.mjs <environment-file> <command> [...args]');
  process.exit(2);
}

const parsedEnvironment = {};

for (const rawLine of readFileSync(environmentFile, 'utf8').split(/\r?\n/)) {
  const line = rawLine.trim();
  if (!line || line.startsWith('#') || line.startsWith(';')) continue;

  const separator = line.indexOf('=');
  if (separator <= 0) continue;

  const key = line.slice(0, separator).trim();
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) {
    throw new Error(`Invalid environment variable name: ${key}`);
  }

  let value = line.slice(separator + 1).trim();
  if (
    value.length >= 2 &&
    ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'")))
  ) {
    value = value.slice(1, -1);
  }

  parsedEnvironment[key] = value;
}

const result = spawnSync(command, args, {
  env: { ...process.env, ...parsedEnvironment },
  stdio: 'inherit'
});

if (result.error) throw result.error;
process.exit(result.status ?? 1);
