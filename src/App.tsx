
import { useState } from "react";
import { useTheme } from "./hooks/useTheme";
import {InputVerification} from "./input-verification";

import { cn } from "./lib/utils";

const testCases = [
  {
    name: "Padding conflict",
    actual: cn("px-4", "px-8"),
    expected: "px-8",
  },
  {
    name: "Background conflict",
    actual: cn("bg-primary", "bg-secondary"),
    expected: "bg-secondary",
  },
  {
    name: "Conditional classes",
    actual: cn("px-4", {
      "text-primary": true,
      "opacity-50": false,
    }),
    expected: "px-4 text-primary",
  },
  {
    name: "Custom radius conflict",
    actual: cn("rounded-control", "rounded-surface"),
    expected: "rounded-surface",
  },
  {
    name: "Custom radius override",
    actual: cn("rounded-control", "rounded-lg"),
    expected: "rounded-lg",
  },
  {
    name: "Custom shadow conflict",
    actual: cn("shadow-surface", "shadow-overlay"),
    expected: "shadow-overlay",
  },
  {
    name: "Variant preservation",
    actual: cn("bg-primary", "hover:bg-secondary"),
    expected: "bg-primary hover:bg-secondary",
  },
];

console.table(
  testCases.map(({ name, actual, expected }) => ({
    test: name,
    expected,
    actual,
    passed: actual === expected,
  })),
);


const colorSamples = [
  {
    name: "Background",
    tokens: "background / foreground",
    classes: "border border-border bg-background text-foreground",
  },
  {
    name: "Card",
    tokens: "card / card-foreground",
    classes: "border border-border bg-card text-card-foreground",
  },
  {
    name: "Primary",
    tokens: "primary / primary-foreground",
    classes: "bg-primary text-primary-foreground",
  },
  {
    name: "Secondary",
    tokens: "secondary / secondary-foreground",
    classes: "bg-secondary text-secondary-foreground",
  },
  {
    name: "Muted",
    tokens: "muted / muted-foreground",
    classes: "bg-muted text-muted-foreground",
  },
  {
    name: "Accent",
    tokens: "accent / accent-foreground",
    classes: "bg-accent text-accent-foreground",
  },
  {
    name: "Destructive",
    tokens: "destructive / destructive-foreground",
    classes: "bg-destructive text-destructive-foreground",
  },
  {
    name: "Success",
    tokens: "success / success-foreground",
    classes: "bg-success text-success-foreground",
  },
  {
    name: "Warning",
    tokens: "warning / warning-foreground",
    classes: "bg-warning text-warning-foreground",
  },
] as const;

export default function App() {
  const { preference, setPreference, resolvedTheme } = useTheme();
  const [actionCount, setActionCount] = useState(0);

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Page introduction */}
        <header className="space-y-3">
          <p className="text-sm font-semibold text-primary">
            FRONTEND INTERNSHIP · MONTH 3
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Design Foundations
          </h1>

          <p className="max-w-2xl text-base text-muted-foreground">
            A visual verification page for semantic colors,
            typography, surfaces, spacing, accessibility,
            and light/dark theming.
          </p>

          <p className="text-sm">
            Jump to the{" "}
            <a href="#focus-demo">
              keyboard focus demonstration
            </a>.
          </p>
        </header>

        {/* Theme control */}
        <section
          aria-labelledby="theme-heading"
          className="rounded-surface border border-border bg-card p-5 shadow-surface sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <h2
                id="theme-heading"
                className="text-xl font-semibold"
              >
                Theme Management
              </h2>

              <p className="text-sm text-muted-foreground">
                Change the preference to inspect all tokens.
              </p>
            </div>

            <div className="w-full space-y-2 sm:w-48">
              <label
                htmlFor="theme-preference"
                className="block text-sm font-medium"
              >
                Theme preference
              </label>

              <select
                id="theme-preference"
                value={preference}
                onChange={(event) => {
                  const value = event.currentTarget.value;

                  if (
                    value === "light" ||
                    value === "dark" ||
                    value === "system"
                  ) {
                    setPreference(value);
                  }
                }}
                className="w-full rounded-control border border-input bg-background px-3 py-2 text-foreground"
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Resolved theme:{" "}
            <output
              className="font-semibold text-foreground capitalize"
              aria-live="polite"
            >
              {resolvedTheme}
            </output>
          </p>
        </section>

        {/* Semantic colors */}
        <section
          aria-labelledby="colors-heading"
          className="space-y-4"
        >
          <div className="space-y-1">
            <h2
              id="colors-heading"
              className="text-xl font-semibold"
            >
              Semantic Colors
            </h2>

            <p className="text-sm text-muted-foreground">
              Each sample uses semantic background and
              foreground token pairs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {colorSamples.map((sample) => (
              <div
                key={sample.name}
                className={`flex min-h-28 flex-col justify-between gap-4 rounded-control p-4 ${sample.classes}`}
              >
                <span className="font-semibold">
                  {sample.name}
                </span>

                <span className="text-xs">
                  {sample.tokens}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section
          aria-labelledby="typography-heading"
          className="space-y-5 rounded-surface border border-border bg-card p-5 text-card-foreground shadow-surface sm:p-6"
        >
          <h2
            id="typography-heading"
            className="text-xl font-semibold"
          >
            Typography
          </h2>

          <div className="space-y-5">
            <div>
              <p className="text-xs text-muted-foreground">
                Large heading · 3xl
              </p>

              <p className="mt-1 text-3xl font-bold tracking-tight">
                Build better interfaces.
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Section heading · xl
              </p>

              <p className="mt-1 text-xl font-semibold">
                Consistency through design
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Body text · base
              </p>

              <p className="mt-1 text-base">
                A design system provides reusable visual
                foundations and predictable component APIs.
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Supporting text · sm
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Secondary information should remain readable
                in both color themes.
              </p>
            </div>
          </div>
        </section>

        {/* Radius and elevation */}
        <section
          aria-labelledby="surfaces-heading"
          className="space-y-5 rounded-surface border border-border bg-card p-5 text-card-foreground shadow-surface sm:p-6"
        >
          <div className="space-y-1">
            <h2
              id="surfaces-heading"
              className="text-xl font-semibold"
            >
              Shape & Elevation
            </h2>

            <p className="text-sm text-muted-foreground">
              Shared radius and shadow tokens establish
              consistent visual geometry.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-control border border-border bg-background p-6 text-center text-sm">
              <p className="font-medium">Control</p>
              <p className="mt-2 text-muted-foreground">
                rounded-control
              </p>
            </div>

            <div className="rounded-surface border border-border bg-background p-6 text-center text-sm shadow-surface">
              <p className="font-medium">Surface</p>
              <p className="mt-2 text-muted-foreground">
                rounded-surface
              </p>
            </div>

            <div className="rounded-overlay border border-border bg-background p-6 text-center text-sm shadow-overlay">
              <p className="font-medium">Overlay</p>
              <p className="mt-2 text-muted-foreground">
                rounded-overlay
              </p>
            </div>
          </div>
        </section>

        {/* Accessibility and focus */}
        <section
          id="focus-demo"
          aria-labelledby="focus-heading"
          className="space-y-5 rounded-surface border border-border bg-card p-5 text-card-foreground shadow-surface sm:p-6"
        >
          <div className="space-y-1">
            <h2
              id="focus-heading"
              className="text-xl font-semibold"
            >
              Keyboard & Focus
            </h2>

            <p className="text-sm text-muted-foreground">
              Navigate the controls using Tab and Shift+Tab.
              All interactive elements should show a
              visible keyboard focus indicator.
            </p>
          </div>

          <div className="max-w-md space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="preview-name"
                className="block text-sm font-medium"
              >
                Display name
              </label>

              <input
                id="preview-name"
                type="text"
                placeholder="Enter a name"
                className="w-full rounded-control border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" className="size-4" />
              Enable sample setting
            </label>

            <button
              type="button"
              onClick={() => {
                setActionCount((count) => count + 1);
              }}
              className="rounded-control bg-primary px-4 py-2 font-medium text-primary-foreground"
            >
              Test action
            </button>

            <p
              role="status"
              className="text-sm text-muted-foreground"
            >
              Actions completed: {actionCount}
            </p>
          </div>
        </section>

        <InputVerification />

        <footer className="border-t border-border pt-5 text-center text-sm text-muted-foreground">
          Mini Design System · Phase 2
        </footer>
      </div>
    </main>
  );
}
