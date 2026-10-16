
import { create } from "storybook/theming";
export const docsTheme = create({
  base: "light",
  fontBase:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode:
    'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',

  colorPrimary: "#A53B0F",
  colorSecondary: "#A53B0F",

  appBg: "#F6F6F5",
  appContentBg: "#F6F6F5",
  appPreviewBg: "#FFFFFF",
  appBorderColor: "#E4E3E1",
  appBorderRadius: 10,

  textColor: "#1C1C1F",
  textInverseColor: "#FFFFFF",

  barBg: "#FFFFFF",
  barTextColor: "#59575B",
  barSelectedColor: "#A53B0F",
  barHoverColor: "#1C1C1F",

  inputBg: "#FFFFFF",
  inputBorder: "#D5D4D1",
  inputTextColor: "#1C1C1F",
  inputBorderRadius: 8,
});
