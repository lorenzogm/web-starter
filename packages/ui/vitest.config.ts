import { join } from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": join(import.meta.dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
      include: ["src/components/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.stories.tsx",
        "src/**/*.mocks.ts",
        "src/**/index.ts",
        "src/test-setup.d.ts",
        "src/index.css",
      ],
    },
  },
});
