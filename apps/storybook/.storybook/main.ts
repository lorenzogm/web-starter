import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const NODE_MODULES_REGEX = /node_modules/;

const config: StorybookConfig = {
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: [
    {
      directory: "../../../packages/ui/src",
      titlePrefix: "UI Library",
      files: "**/*.stories.@(js|jsx|ts|tsx)",
    },
  ],
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !NODE_MODULES_REGEX.test(prop.parent.fileName) : true,
    },
  },
  viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      plugins: [
        tailwindcss(),
        tsconfigPaths({
          projects: [resolve(__dirname, "../../../packages/ui/tsconfig.json")],
        }),
      ],
      publicDir: false,
      server: {
        fs: {
          allow: [
            resolve(__dirname, "../../../packages/ui/dist"),
            resolve(__dirname, "../../.."),
          ],
        },
      },
    });
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
