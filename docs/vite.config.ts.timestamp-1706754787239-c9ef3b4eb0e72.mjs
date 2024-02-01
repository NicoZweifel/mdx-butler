// vite.config.ts
import { defineConfig } from "file:///C:/dev/mdxService/docs/node_modules/.pnpm/vite@5.0.12_@types+node@20.11.14/node_modules/vite/dist/node/index.js";
import preact from "file:///C:/dev/mdxService/docs/node_modules/.pnpm/@preact+preset-vite@2.8.1_@babel+core@7.23.9_preact@10.19.3_vite@5.0.12/node_modules/@preact/preset-vite/dist/esm/index.mjs";
import ssr from "file:///C:/dev/mdxService/docs/node_modules/.pnpm/vike@0.4.160_vite@5.0.12/node_modules/vike/dist/esm/node/plugin/index.js";
import FullReload from "file:///C:/dev/mdxService/docs/node_modules/.pnpm/vite-plugin-full-reload@1.1.0/node_modules/vite-plugin-full-reload/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    preact({
      reactAliasesEnabled: true
    }),
    ssr({ prerender: true }),
    FullReload(["docs/**/*"])
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxkZXZcXFxcbWR4U2VydmljZVxcXFxkb2NzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxkZXZcXFxcbWR4U2VydmljZVxcXFxkb2NzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9kZXYvbWR4U2VydmljZS9kb2NzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCBwcmVhY3QgZnJvbSAnQHByZWFjdC9wcmVzZXQtdml0ZSc7XHJcbmltcG9ydCBzc3IgZnJvbSAndmlrZS9wbHVnaW4nO1xyXG5pbXBvcnQgRnVsbFJlbG9hZCBmcm9tICd2aXRlLXBsdWdpbi1mdWxsLXJlbG9hZCc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHByZWFjdCh7XHJcbiAgICAgIHJlYWN0QWxpYXNlc0VuYWJsZWQ6IHRydWUsXHJcbiAgICB9KSxcclxuICAgIHNzcih7IHByZXJlbmRlcjogdHJ1ZSB9KSxcclxuICAgIEZ1bGxSZWxvYWQoWydkb2NzLyoqLyonXSksXHJcbiAgXSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFAsU0FBUyxvQkFBb0I7QUFDelIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUd2QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxxQkFBcUI7QUFBQSxJQUN2QixDQUFDO0FBQUEsSUFDRCxJQUFJLEVBQUUsV0FBVyxLQUFLLENBQUM7QUFBQSxJQUN2QixXQUFXLENBQUMsV0FBVyxDQUFDO0FBQUEsRUFDMUI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
