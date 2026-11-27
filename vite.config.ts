/// <reference types="vitest" />

import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import analog from '@analogjs/platform';
import angular from '@analogjs/vite-plugin-angular';
import nitro from '@analogjs/vite-plugin-nitro';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = Number(env['PORT']) || 5000;

  return {
    server: {
      port,
      host: true,
    },
    preview: {
      port,
      host: true,
    },
    build: {
      target: ['es2020'],
    },
    resolve: {
      mainFields: ['module'],
      alias: {
        '@': fileURLToPath(new URL('./src/app', import.meta.url)),
      },
    },
    ssr: {
      noExternal: ['lucide-angular'],
    },
    plugins: [analog(), angular(), nitro(), tailwindcss()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
    },
  };
});
