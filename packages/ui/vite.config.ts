// eslint-disable-next-line import/no-unresolved

import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// Plugin to preserve "use client" directive
function preserveUseClient() {
  return {
    name: "preserve-use-client",
    enforce: "post" as const,
    generateBundle(
      _options: unknown,
      bundle: Record<string, { type: string; code?: string }>
    ) {
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (
          chunk.type === "chunk" &&
          chunk.code &&
          fileName.includes("client")
        ) {
          chunk.code = `"use client";\n${chunk.code}`;
        }
      }
    },
  };
}

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      exclude: [
        "src/**/*.stories.ts",
        "src/**/*.stories.tsx",
        "src/**/*.stories.mdx",
      ],
    }),
    preserveUseClient(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"), // Server-safe exports
        client: resolve(__dirname, "src/client.ts"), // Client-only exports
        "styles/globals": resolve(__dirname, "src/styles/globals.css"),
        "styles/brand-main": resolve(__dirname, "src/styles/brand-main.css"),
      },
      name: "UI",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      output: [
        {
          format: "es",
          entryFileNames: "[name].js",
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith(".css")) {
              return "[name].[ext]";
            }

            return "[name].[ext]";
          },
        },
      ],
    },
    cssCodeSplit: true,
  },

  css: {
    postcss: "./postcss.config.cjs",
  },
});
