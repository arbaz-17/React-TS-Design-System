
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  ThemeContext,
  type Theme,
  type ThemePreference,
} from "./theme-context";

const STORAGE_KEY = "design-system-theme";

type ThemeProviderProps = {
  children: ReactNode;
};

/**
 * Read the user's saved preference.
 * Use "system" when no preference has been saved.
 */
function getInitialPreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    // Storage may be unavailable in restricted browsers.
  }

  return "system";
}

/**
 * Resolve the operating system's color preference.
 */
function getSystemTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches
    ? "dark"
    : "light";
}

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [preference, setPreference] =
    useState<ThemePreference>(getInitialPreference);

  const [systemTheme, setSystemTheme] =
    useState<Theme>(getSystemTheme);

  // Resolve the final visual theme.
  const theme: Theme =
    preference === "system"
      ? systemTheme
      : preference;

  /*
   * Listen to operating system theme changes.
   * This matters when preference is "system".
   */
  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    function handleSystemThemeChange(
      event: MediaQueryListEvent,
    ) {
      setSystemTheme(
        event.matches ? "dark" : "light",
      );
    }

    media.addEventListener(
      "change",
      handleSystemThemeChange,
    );

    return () => {
      media.removeEventListener(
        "change",
        handleSystemThemeChange,
      );
    };
  }, []);

  /*
   * Apply the resolved theme globally.
   *
   * CSS selectors and semantic design tokens
   * depend on the data-theme attribute.
   */
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  /*
   * Persist explicit user preferences.
   *
   * "system" removes the override so the
   * operating system remains the default.
   */
  useEffect(() => {
    try {
      if (preference === "system") {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(
          STORAGE_KEY,
          preference,
        );
      }
    } catch {
      // Continue working even if storage is blocked.
    }
  }, [preference]);

  const setTheme = useCallback(
    (nextPreference: ThemePreference) => {
      setPreference(nextPreference);
    },
    [],
  );

  const toggleTheme = useCallback(() => {
    setPreference((current) => {
      const currentTheme =
        current === "system"
          ? systemTheme
          : current;

      return currentTheme === "dark"
        ? "light"
        : "dark";
    });
  }, [systemTheme]);

  const contextValue = useMemo(
    () => ({
      theme,
      preference,
      setTheme,
      toggleTheme,
    }),
    [theme, preference, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
