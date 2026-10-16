
/// <reference types="vite/client" />

import type { Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";

import { TooltipProvider } from "../src/components";

import { docsTheme } from "./docs-theme";
import { DocsPage } from "./docs-page";

import "../src/styles/global.css";
import "./docs-page.css";

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

  initialGlobals: {
    backgrounds: {
      value: "adaptive",
      grid: false,
    },
  },

  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
    },

    backgrounds: {
      options: {
        adaptive: {
          name: "Theme Surface",
          value: "var(--background)",
        },

        white: {
          name: "Pure White",
          value: "#FFFFFF",
        },

        neutral: {
          name: "Soft Neutral",
          value: "#F6F6F5",
        },

        charcoal: {
          name: "Charcoal",
          value: "#1C1C1F",
        },
      },

      grid: {
        cellSize: 20,
        cellAmount: 5,
        opacity: 0.25,
      },
    },

    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,

        wideDesktop: {
          name: "Wide Desktop (1440px)",
          styles: {
            width: "1440px",
            height: "900px",
          },
          type: "desktop",
        },
      },
    },

    options: {
      storySort: {
        order: [
          "Introduction",

          "Primitives",
          [
            "Button",
            "Input",
            "Textarea",
            "Select",
            "Checkbox",
            "Switch",
            "Badge",
            "Skeleton",
            "*",
          ],

          "Composites",
          [
            "Card",
            "Alert",
            "FormField",
            "EmptyState",
            "Table",
            "*",
          ],

          "Interactive",
          [
            "Dialog",
            "Tabs",
            "Accordion",
            "Tooltip",
            "*",
          ],

          "*",
        ],
      },
    },

    docs: {
      theme: docsTheme,
      page: DocsPage,
      toc: true,
    },
  },
};

export default preview;
