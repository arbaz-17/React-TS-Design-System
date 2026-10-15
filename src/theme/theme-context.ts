
import { createContext } from "react";

export type Theme = "light" | "dark";

export type ThemePreference = Theme | "system";

export type ThemeContextValue = {
  theme: Theme;
  preference: ThemePreference;
  setTheme: (preference: ThemePreference) => void;
  toggleTheme: () => void;
};

export const ThemeContext =
  createContext<ThemeContextValue | null>(null);
