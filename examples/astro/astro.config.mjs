// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  vite: {
    ssr: {
      // This helps during development in a monorepo
      noExternal: ['mdx-butler']
    }
  }
});

