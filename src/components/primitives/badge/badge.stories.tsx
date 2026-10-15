
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  CheckCircle2,
  Clock3,
  Info,
  XCircle,
} from "lucide-react";

import { Badge } from "../../index";

// -----------------------------------------
// Storybook metadata
// -----------------------------------------

const meta = {
  title: "Primitives/Badge",
  component: Badge,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A noninteractive, semantic presentation primitive for compact labels, statuses, and metadata. Badge provides six visual variants, two sizes, icon composition, and text wrapping. Its colors use the shared design tokens. Badge does not provide button behavior, live announcements, or an automatically assigned status role.",
      },
    },
  },

  args: {
    children: "Neutral badge",
    variant: "neutral",
    size: "md",
  },

  argTypes: {
    children: {
      control: "text",
      description:
        "Visible badge content. Supports text and React nodes.",
    },

    variant: {
      control: "select",
      options: [
        "neutral",
        "primary",
        "success",
        "warning",
        "destructive",
        "outline",
      ],
      description: "Semantic visual appearance.",
      table: {
        type: {
          summary:
            "neutral | primary | success | warning | destructive | outline",
        },
        defaultValue: { summary: "neutral" },
      },
    },

    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Badge typography and spacing.",
      table: {
        type: { summary: "sm | md" },
        defaultValue: { summary: "md" },
      },
    },

    className: {
      control: false,
      description:
        "Optional CSS classes for layout and styling extensions.",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

// -----------------------------------------
// 1. Default playground
// -----------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Explore the six semantic variants, two supported sizes, and badge text using Storybook controls.",
      },
    },
  },
};

// -----------------------------------------
// 2. Semantic variants
// -----------------------------------------

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Shows all six variants using semantic design tokens. Variants communicate visual intent; meaningful text must still convey the information.",
      },
    },
  },
};

// -----------------------------------------
// 3. Supported sizes
// -----------------------------------------

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge variant="primary" size="sm">
        Small
      </Badge>

      <Badge variant="primary" size="md">
        Medium
      </Badge>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Badge supports small and medium sizes. These control typography and spacing, not interaction or touch-target dimensions.",
      },
    },
  },
};

// -----------------------------------------
// 4. Icons with text
// -----------------------------------------

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="success">
        <CheckCircle2
          aria-hidden="true"
          className="size-3.5"
        />
        Completed
      </Badge>

      <Badge variant="warning">
        <Clock3
          aria-hidden="true"
          className="size-3.5"
        />
        Pending
      </Badge>

      <Badge variant="destructive">
        <XCircle
          aria-hidden="true"
          className="size-3.5"
        />
        Failed
      </Badge>

      <Badge variant="primary">
        <Info
          aria-hidden="true"
          className="size-3.5"
        />
        Information
      </Badge>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Badges accept icons through normal React composition. Decorative icons are hidden from assistive technology because the adjacent text already communicates their meaning.",
      },
    },
  },
};

// -----------------------------------------
// 5. Realistic status examples
// -----------------------------------------

const statusExamples = [
  {
    label: "Active",
    variant: "success",
    description: "A subscription currently in use.",
  },
  {
    label: "In Review",
    variant: "warning",
    description: "A request awaiting review.",
  },
  {
    label: "Overdue",
    variant: "destructive",
    description: "A task past its deadline.",
  },
  {
    label: "Draft",
    variant: "neutral",
    description: "An item not yet published.",
  },
  {
    label: "New",
    variant: "primary",
    description: "A recently added item.",
  },
] as const;

export const StatusExamples: Story = {
  render: () => (
    <div className="max-w-lg space-y-3">
      {statusExamples.map((status) => (
        <div
          key={status.label}
          className="flex flex-wrap items-center justify-between gap-3 rounded-surface border border-border bg-card p-3"
        >
          <p className="text-sm text-foreground">
            {status.description}
          </p>

          <Badge variant={status.variant}>
            {status.label}
          </Badge>
        </div>
      ))}
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Realistic examples of badges used for application statuses. Status text carries the meaning rather than relying solely on color.",
      },
    },
  },
};

// -----------------------------------------
// 6. Long content and wrapping
// -----------------------------------------

export const LongContent: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="max-w-48">
        <Badge
          variant="outline"
          className="max-w-full"
        >
          Awaiting additional documentation and final approval
        </Badge>
      </div>

      <div className="max-w-48">
        <Badge
          variant="primary"
          className="max-w-full"
        >
          VeryLongUnbrokenStatusIdentifierForTesting
        </Badge>
      </div>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates wrapping within a constrained width, including a long unbroken string. Badge supports whitespace wrapping and word breaking instead of always forcing a single line.",
      },
    },
  },
};

// -----------------------------------------
// 7. Inline usage
// -----------------------------------------

export const InlineUsage: Story = {
  render: () => (
    <div className="max-w-lg space-y-4">
      <p className="text-sm leading-7 text-foreground">
        Project status:{" "}
        <Badge variant="success" size="sm">
          Completed
        </Badge>
      </p>

      <p className="text-sm leading-7 text-foreground">
        Current plan:{" "}
        <Badge variant="primary" size="sm">
          Pro
        </Badge>
      </p>

      <p className="text-sm leading-7 text-foreground">
        Approval:{" "}
        <Badge variant="warning" size="sm">
          Pending
        </Badge>
      </p>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Badges can appear within ordinary text without becoming interactive elements. Their inline-flex layout and vertical alignment support compact metadata presentation.",
      },
    },
  },
};
