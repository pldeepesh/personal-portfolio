import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([
    '.next/**',
    'node_modules/**',
    'out/**',
    'output/**',
    '_next/**',
    'about/**',
    'blog/**',
    'contact/**',
    'products/**',
    'topics/**',
    'work/**',
    '_not-found/**'
  ])
]);
