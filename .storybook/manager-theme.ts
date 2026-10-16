
import { create } from "storybook/theming";

export const managerTheme = create({
  base: "dark",
  brandTitle: "Design System - OptimusFox",

  fontBase:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode:
    'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',

  colorPrimary: "#FF6A2C",
  colorSecondary: "#FF6A2C",

  appBg: "#141416",
  appContentBg: "#1E1E21",
  appPreviewBg: "#141416",
  appBorderColor: "#343438",
  appBorderRadius: 10,

  textColor: "#F4F4F5",
  textInverseColor: "#1C1C1F",

  barBg: "#1C1C1F",
  barTextColor: "#B4B3B8",
  barSelectedColor: "#FF6A2C",
  barHoverColor: "#FFFFFF",

  inputBg: "#232326",
  inputBorder: "#3A3A3E",
  inputTextColor: "#F4F4F5",
  inputBorderRadius: 8,
});
