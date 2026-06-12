import type { Config } from "@react-router/dev/config";
import { docs } from "./app/mdx-butler.server.js";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  async prerender() {
    const allDocs = await docs({
      cwd: "./docs",
      fields: { title: { required: true } },
    });
    return allDocs.map((doc) => `/docs/${doc.path}`);
  },
} satisfies Config;
