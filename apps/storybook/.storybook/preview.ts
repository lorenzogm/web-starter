import type { Preview } from "@storybook/react";

// Import the built CSS file from the UI package dist folder
import "./styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    brand: {
      description: "Brand theme",
      defaultValue: "main",
      toolbar: {
        title: "Brand",
        icon: "paintbrush",
        items: [
          { value: "main", title: "Main" },
          { value: "alt", title: "Alt" },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: "Global theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const brand = context.globals.brand || "main";
      const theme = context.globals.theme || "light";

      // Remove all brand classes
      document.documentElement.classList.remove("brand-alt");

      // Add the selected brand class
      if (brand !== "main") {
        document.documentElement.classList.add(`brand-${brand}`);
      }

      // Apply theme class
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return Story();
    },
  ],
};

// eslint-disable-next-line import/no-default-export
export default preview;
