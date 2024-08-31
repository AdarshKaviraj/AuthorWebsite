// vite.config.js
import { resolve } from 'path';
import { defineConfig } from '@playwright/experimental-ct-react';

export default defineConfig({
  use: {
    ctViteConfig: {
      resolve: {
        alias: {
          '@': resolve(__dirname, './src'),
        },
      },
    },
  },
});
