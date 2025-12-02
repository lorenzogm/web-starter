import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Alias logger package to resolve during tests
      "@repo/logger": path.resolve(
        __dirname,
        "../../packages/logger/src/index.ts"
      ),
    },
  },
});
