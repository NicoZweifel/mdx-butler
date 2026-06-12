// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  vite: {
    ssr: {
      // This helps during development in a monorepo
      // You don't need this if you are not in a monorepo
      noExternal: ["mdx-butler"],
    },
  },
});
