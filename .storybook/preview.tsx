/// <reference types="vite/client" />

import type { Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

import { TooltipProvider } from "../src/components";
import "../src/styles/global.css";

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
      parentSelector: "html",
    }),

    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],

  parameters: {
    layout: "padded",

    controls: {
      expanded: true,
    },
  },
};

export default preview;
