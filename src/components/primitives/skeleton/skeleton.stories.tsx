
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
} from "../../index";

// -----------------------------------------
// Storybook metadata
// -----------------------------------------

const meta = {
  title: "Primitives/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A lightweight, decorative loading placeholder with semantic styling, configurable dimensions, reduced-motion support, and forced-colors visibility.",
      },
    },
  },

  args: {
    className: "h-4 w-56",
  },

  argTypes: {
    className: {
      control: "text",
      description:
        "Tailwind classes for width, height, shape, and other visual customization.",
      table: {
        type: { summary: "string" },
      },
    },

    ref: {
      control: false,
      description:
        "Optional ref to the native HTMLDivElement.",
    },

    style: {
      control: false,
      description: "Optional native inline styles.",
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

// -----------------------------------------
// 1. Default
// -----------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Explore the Skeleton's dimensions and appearance through className. The default component uses a full-width, 16px-high placeholder, but consumers can override its geometry.",
      },
    },
  },
};

// -----------------------------------------
// 2. Text Lines
// -----------------------------------------

export const TextLines: Story = {
  render: () => (
    <div className="w-full max-w-lg space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Multiple Skeleton elements represent text lines. Varying widths create a natural content-placeholder layout without exposing fake text to assistive technology.",
      },
    },
  },
};

// -----------------------------------------
// 3. Avatar
// -----------------------------------------

export const Avatar: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <Skeleton className="size-12 shrink-0 rounded-full" />
      <Skeleton className="size-16 shrink-0 rounded-full" />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Circular avatar placeholders at different dimensions. Shape is composed through className rather than a separate variant or size API.",
      },
    },
  },
};

// -----------------------------------------
// 4. Image Placeholder
// -----------------------------------------

export const ImagePlaceholder: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-3">
      <Skeleton className="aspect-video h-auto w-full rounded-surface" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "An aspect-ratio-based image placeholder with supporting text lines. The reserved image area helps reduce layout shifts when content loads.",
      },
    },
  },
};

// -----------------------------------------
// 5. Profile Skeleton
// -----------------------------------------

export const ProfileSkeleton: Story = {
  render: () => (
    <div className="max-w-md rounded-surface border border-border bg-card p-5">
      <div className="flex items-center gap-4">
        <Skeleton className="size-14 shrink-0 rounded-full" />

        <div className="min-w-0 flex-1 space-y-3">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-3/5" />
      </div>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A realistic profile-loading composition built entirely from reusable Skeleton elements. Avatar, identity text, and description areas use different dimensions.",
      },
    },
  },
};

// -----------------------------------------
// 6. Card Skeleton
// -----------------------------------------

export const CardSkeleton: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-3 w-4/5" />
      </CardHeader>

      <CardContent className="space-y-4">
        <Skeleton className="h-36 w-full rounded-surface" />

        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </CardContent>
    </Card>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Skeleton works with the existing Card component without requiring special loading props. The consumer composes the placeholder layout using Card's public API.",
      },
    },
  },
};

// -----------------------------------------
// 7. Responsive List
// -----------------------------------------

export const ResponsiveList: Story = {
  render: () => (
    <div className="w-full max-w-xl divide-y divide-border rounded-surface border border-border bg-card">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex min-w-0 items-center gap-4 p-4"
        >
          <Skeleton className="size-12 shrink-0 rounded-full" />

          <div className="min-w-0 flex-1 space-y-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-full" />
          </div>

          <Skeleton className="hidden h-6 w-16 shrink-0 rounded-full sm:block" />
        </div>
      ))}
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A repeated list placeholder using responsive Tailwind utilities. The supplementary status shape is hidden on smaller viewports to preserve usable layout.",
      },
    },
  },
};

// -----------------------------------------
// 8. Loading to Loaded
// -----------------------------------------

function LoadingToLoadedExample() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full max-w-md space-y-4">
      <Button
        variant="outline"
        onClick={() => setLoading((current) => !current)}
      >
        {loading
          ? "Show loaded content"
          : "Show loading state"}
      </Button>

      <p
        role="status"
        aria-live="polite"
        className="text-sm text-muted-foreground"
      >
        {loading
          ? "Loading profile details."
          : "Profile details loaded."}
      </p>

      <section
        aria-label="Profile details"
        aria-busy={loading}
        className="min-h-40 rounded-surface border border-border bg-card p-5"
      >
        {loading ? (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Skeleton className="size-12 shrink-0 rounded-full" />

              <div className="min-w-0 flex-1 space-y-3">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>

            <div className="space-y-3">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Alex Morgan
              </h3>

              <p className="text-sm text-muted-foreground">
                Frontend Engineer
              </p>
            </div>

            <p className="text-sm leading-6 text-foreground">
              Building accessible, reusable frontend
              interfaces with React and TypeScript.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export const LoadingToLoaded: Story = {
  render: () => <LoadingToLoadedExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates consumer-managed loading state. Skeleton elements remain decorative, aria-busy describes the loading region, and a persistent status element outside that region communicates loading and completion. Toggle manually for deterministic testing.",
      },
    },
  },
};

// -----------------------------------------
// 9. Reduced Motion
// -----------------------------------------

export const ReducedMotion: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-5">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      <p className="text-sm text-muted-foreground">
        The pulse animation runs only when motion is
        permitted. Enable reduced motion in your browser
        or operating system to verify that these
        placeholders remain visible without animation.
      </p>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "The component uses motion-safe:animate-pulse. Test prefers-reduced-motion: reduce through browser emulation or operating-system accessibility settings. This story does not override the user's motion preference.",
      },
    },
  },
};
