
import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

// Replace with your deployed Storybook URL.
const STORYBOOK_URL = "";

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
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16 text-foreground">
      <div className="w-full max-w-2xl">
        <span className="mb-6 inline-block text-sm font-medium text-primary">
          React · TypeScript · Tailwind CSS
        </span>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Mini Design System
        </h1>

        <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
          A reusable React component library built with
          TypeScript, Tailwind CSS, and Storybook. Designed
          for consistency, accessibility, and composable
          interfaces.
        </p>

        <div className="mt-8">
          {STORYBOOK_URL ? (
            <a
              href={STORYBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-control bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Explore Storybook
              <ArrowUpRight
                aria-hidden="true"
                className="size-4"
              />
              <span className="sr-only">
                (opens in a new tab)
              </span>
            </a>
          ) : (
            <span className="inline-flex min-h-11 items-center rounded-control border border-border bg-card px-5 py-3 text-sm text-muted-foreground">
              Storybook link coming soon
            </span>
          )}
        </div>
      </div>
    </main>
  );
}
