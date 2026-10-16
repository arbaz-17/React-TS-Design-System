
import { useEffect } from "react";
import {
  ArrowUpRight,
  Blocks,
  BookOpen,
  Layers3,
  Accessibility,
} from "lucide-react";

const STORYBOOK_URL =
  "https://arbaz-17.github.io/React-TS-Design-System/storybook/";

const features = [
  {
    icon: Blocks,
    label: "17 Component Families",
  },
  {
    icon: Layers3,
    label: "3 Component Categories",
  },
  {
    icon: Accessibility,
    label: "Accessibility Focused",
  },
  {
    icon: BookOpen,
    label: "Storybook Documentation",
  },
];

export default function App() {
  useEffect(() => {
    const root = document.documentElement;
    const previousTheme = root.getAttribute("data-theme");

    root.setAttribute("data-theme", "dark");

    return () => {
      if (previousTheme === null) {
        root.removeAttribute("data-theme");
      } else {
        root.setAttribute("data-theme", previousTheme);
      }
    };
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16 text-center text-foreground sm:px-10">

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[600px] max-w-full -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
      />

      <div className="relative flex w-full max-w-3xl flex-col items-center">

        <div className="mb-7 flex items-center justify-center gap-3">

          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
            Month 3 Project — OptimusFox
          </span>
        </div>


        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Design System
          <span className="block text-primary">
            Storybook
          </span>
        </h1>


        <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          A reusable React and TypeScript component
          library developed as part of my Frontend
          Engineering Internship at OptimusFox.
          Built with Tailwind CSS v4 and Storybook,
          focusing on component architecture,
          consistency, accessibility, and
          developer experience.
        </p>


        <div className="mt-9 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
          {features.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-3 rounded-surface border border-border bg-card/70 p-4 text-center"
            >
              <Icon
                aria-hidden="true"
                className="size-5 text-primary"
              />

              <span className="text-sm font-medium leading-5 text-card-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center">
          <a
            href={STORYBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-control bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Explore Storybook

            <ArrowUpRight
              aria-hidden="true"
              className="size-4"
            />
          </a>

          <p className="mt-3 text-xs text-muted-foreground">
            Explore components, interactive examples,
            and documentation.
          </p>
        </div>

      </div>
    </main>
  );
}
