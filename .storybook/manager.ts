
import { addons } from "storybook/manager-api";
import { managerTheme } from "./manager-theme";

addons.setConfig({
  theme: managerTheme,
  navSize: 280,

  sidebar: {
    showRoots: true,
  },
});
