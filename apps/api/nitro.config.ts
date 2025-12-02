import { defineNitroConfig } from "nitropack/config";

// https://nitro.build/config
export default defineNitroConfig({
  compatibilityDate: "latest",
  srcDir: "server",
  experimental: {
    openAPI: true,
  },
  openAPI: {
    production: "runtime",
    meta: {
      title: "API",
      description: "Swagger API documentation for API",
      version: "1.0",
    },
  },
  ignore: ["**/*.test.*", "**/*.spec.*", "**/*.mocks.*", "**/*.schemas.*"],
});
