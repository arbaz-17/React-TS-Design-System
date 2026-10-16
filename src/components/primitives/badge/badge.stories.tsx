
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckCircle2, Clock3, Info, XCircle } from "lucide-react";
import { Badge } from "../../index";

const meta = {
  title: "Primitives/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A noninteractive presentation primitive for compact labels, statuses, and metadata. Supports six semantic variants, two sizes, icon composition, and text wrapping.",
      },
    },
  },
  args: {
    children: "New release",
    variant: "neutral",
    size: "md",
  },
  argTypes: {
    children: {
      control: "text",
      description: "Visible content. Supports text and React nodes.",
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

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="neutral">Draft</Badge>
      <Badge variant="primary">New</Badge>
      <Badge variant="success">Completed</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="destructive">Failed</Badge>
      <Badge variant="outline">Archived</Badge>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Compares all six visual variants. Badge text should communicate meaning independently of color.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          Small
        </span>
        <Badge variant="primary" size="sm">
          New release
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          Medium
        </span>
        <Badge variant="primary" size="md">
          New release
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Compares typography and spacing in small and medium badges. Badges are noninteractive and do not have touch-target requirements.",
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="success">
        <CheckCircle2 aria-hidden="true" />
        Completed
      </Badge>

      <Badge variant="warning">
        <Clock3 aria-hidden="true" />
        Pending
      </Badge>

      <Badge variant="destructive">
        <XCircle aria-hidden="true" />
        Failed
      </Badge>

      <Badge variant="primary">
        <Info aria-hidden="true" />
        Update available
      </Badge>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Decorative icons can be composed with text. Icons are hidden from assistive technology because the labels already convey their meaning.",
      },
    },
  },
};

const taskStatuses = [
  {
    title: "Project setup",
    description: "Initial configuration completed",
    label: "Completed",
    variant: "success",
  },
  {
    title: "Design review",
    description: "Work is currently underway",
    label: "In progress",
    variant: "primary",
  },
  {
    title: "Documentation",
    description: "Not started yet",
    label: "To do",
    variant: "neutral",
  },
  {
    title: "Client approval",
    description: "Waiting for feedback",
    label: "Pending",
    variant: "warning",
  },
  {
    title: "File upload",
    description: "Upload could not be completed",
    label: "Failed",
    variant: "destructive",
  },
] as const;

export const StatusExamples: Story = {
  render: () => (
    <div className="w-full max-w-xl overflow-hidden rounded-surface border border-border bg-card">
      {taskStatuses.map((item, index) => (
        <div
          key={item.title}
          className={`flex flex-wrap items-center justify-between gap-3 p-4 ${
            index > 0 ? "border-t border-border" : ""
          }`}
        >
          <div className="min-w-0 space-y-0.5">
            <p className="text-sm font-medium text-foreground">
              {item.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {item.description}
            </p>
          </div>

          <Badge variant={item.variant} size="sm">
            {item.label}
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
          "Shows badges as compact status labels in a simple task list. Status text conveys meaning without relying solely on color.",
      },
    },
  },
};

export const LongContent: Story = {
  render: () => (
    <div className="space-y-5">
      <div className="max-w-48">
        <Badge variant="outline">
          Awaiting additional documentation and final approval
        </Badge>
      </div>

      <div className="max-w-48">
        <Badge variant="primary">
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
          "Demonstrates wrapping in constrained layouts, including an unbroken identifier. Prefer concise labels in actual interfaces.",
      },
    },
  },
};

export const InlineUsage: Story = {
  render: () => (
    <div className="max-w-lg space-y-4">
      <p className="text-sm leading-7 text-foreground">
        Task status:{" "}
        <Badge variant="success" size="sm">
          Completed
        </Badge>
      </p>

      <p className="text-sm leading-7 text-foreground">
        Priority:{" "}
        <Badge variant="primary" size="sm">
          High
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
          "Badges can sit alongside text as noninteractive metadata without behaving like links or buttons.",
      },
    },
  },
};
