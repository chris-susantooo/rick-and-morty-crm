/// <reference types="vitest" />

import { execSync } from 'child_process';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

function getNodeEnv(command: 'build' | 'serve') {
  return command === 'build' ? 'production' : 'development';
}

function git(command: string) {
  return execSync(`git ${command}`, { encoding: 'utf8' }).trim();
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    svgr(),
    tsconfigPaths(),
    checker({
      typescript: {
        tsconfigPath: './tsconfig.json',
      },
      eslint: {
        lintCommand: 'eslint ./src/**/*.{ts,tsx}"',
        dev: { logLevel: ['error'] },
      },
      enableBuild: false,
    }),
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(getNodeEnv(command)),
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(
      process.env.npm_package_version
    ),
    'import.meta.env.VITE_COMMIT_HASH': JSON.stringify(
      git('rev-parse --short HEAD')
    ),
  },
  build: {
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['vitest.setup.ts'],
  },
}));
