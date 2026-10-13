
import { useEffect, useState } from "react";
export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "mini-design-system-theme";
const SYSTEM_THEME_QUERY = "(prefers-color-scheme: dark)";

function getStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    // Storage may be unavailable in some environments.
  }

  return "system";
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(SYSTEM_THEME_QUERY).matches
    ? "dark"
    : "light";
}

export function useTheme() {
  const [preference, setPreference] =
    useState<ThemePreference>(getStoredPreference);

  const [systemTheme, setSystemTheme] =
    useState<ResolvedTheme>(getSystemTheme);

  const resolvedTheme: ResolvedTheme =
    preference === "system" ? systemTheme : preference;

  // Listen for changes to the operating system theme.
  useEffect(() => {
    const mediaQuery = window.matchMedia(SYSTEM_THEME_QUERY);

    function handleSystemThemeChange(event: MediaQueryListEvent) {
      setSystemTheme(event.matches ? "dark" : "light");
    }

    mediaQuery.addEventListener(
      "change",
      handleSystemThemeChange,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleSystemThemeChange,
      );
    };
  }, []);

  // Apply and persist the selected theme.
  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;

    try {
      if (preference === "system") {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, preference);
      }
    } catch {
      // Theme changes still work without persistent storage.
    }
  }, [preference, resolvedTheme]);

  return {
    preference,
    setPreference,
    resolvedTheme,
  };
}
