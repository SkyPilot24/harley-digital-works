// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { loadEnv } from "vite";

export default defineConfig({
  vite: {
    plugins: [
      {
        name: "local-server-environment",
        apply: "serve",
        configResolved(config) {
          // Vite exposes VITE_* to the browser, but server functions read process.env.
          // Load local server values without bundling them into client-side defines.
          const env = loadEnv(config.mode, config.envDir, "");
          for (const [key, value] of Object.entries(env)) {
            if (process.env[key] === undefined) process.env[key] = value;
          }
        },
      },
    ],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
