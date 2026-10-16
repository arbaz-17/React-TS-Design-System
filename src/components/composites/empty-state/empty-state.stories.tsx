
import { useId, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Bell,
  BookOpen,
  FolderOpen,
  Inbox,
  Plus,
  SearchX,
  CloudUpload,
} from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  EmptyState,
  EmptyStateVisual,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
  Input,
} from "../../index";


const meta = {
  title: "Composites/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],

  parameters: {
    layout: "centered",

    docs: {
      description: {
        component:
          "A compositional component for presenting empty content states. EmptyStateVisual, EmptyStateTitle, EmptyStateDescription, and EmptyStateActions are optional. Consumers manage data-state detection, illustrations, navigation, actions, announcements, and focus behavior. EmptyState does not automatically assign accessibility roles or manage application state.",
      },
    },
  },

  args: {
    className:
      "w-full max-w-xl rounded-surface border border-border bg-card",
  },

  argTypes: {
    className: {
      control: "text",
      description:
        "Additional classes for width, spacing, alignment, and presentation.",
    },

    children: {
      control: false,
      description:
        "Composable visual, title, description, actions, and other React content.",
    },

    ref: {
      control: false,
      description:
        "Optional ref to the native HTMLDivElement.",
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <EmptyState {...args}>
      <EmptyStateVisual>
        <div className="flex size-16 items-center justify-center rounded-2xl border border-border bg-muted/60">
          <FolderOpen
            aria-hidden="true"
            className="size-8 text-muted-foreground"
          />
        </div>
      </EmptyStateVisual>

      <EmptyStateTitle>
        No projects yet
      </EmptyStateTitle>

      <EmptyStateDescription>
        Projects you create will appear here.
        Get started by creating your first project.
      </EmptyStateDescription>
    </EmptyState>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "The recommended default composition: a decorative visual, descriptive heading, and supporting text. Use the className control to explore different container presentations. An action is intentionally omitted because not every empty state requires one.",
      },
    },
  },
};


export const Minimal: Story = {
  render: () => (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <EmptyState className="rounded-surface border border-border bg-card px-4 py-10">
        <EmptyStateTitle>
          No notifications
        </EmptyStateTitle>

        <EmptyStateDescription>
          You're all caught up. New notifications
          will appear here when available.
        </EmptyStateDescription>
      </EmptyState>

      <EmptyState className="rounded-surface border border-border bg-card px-4 py-10">
        <EmptyStateTitle>
          Nothing to display
        </EmptyStateTitle>
      </EmptyState>
    </div>
  ),

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Demonstrates two minimal compositions: title with description, and title only. EmptyStateVisual and EmptyStateActions are optional, and no Context or child registration is required.",
      },
    },
  },
};


const sampleProjects = [
  "Design System",
  "Accessibility Audit",
  "Frontend Dashboard",
] as const;

function NoSearchResultsExample() {
  const inputId = useId();

  const [query, setQuery] = useState("missing");

  const normalizedQuery = query.trim().toLowerCase();

  const matchingProjects = sampleProjects.filter(
    (project) =>
      project.toLowerCase().includes(normalizedQuery),
  );

  return (
    <div className="w-full max-w-xl space-y-4">
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground"
        >
          Search projects
        </label>

        <Input
          id={inputId}
          type="search"
          value={query}
          placeholder="Search project names..."
          onChange={(event) =>
            setQuery(event.currentTarget.value)
          }
        />
      </div>

      <p className="text-sm text-muted-foreground">
        {matchingProjects.length} matching{" "}
        {matchingProjects.length === 1
          ? "project"
          : "projects"}
      </p>

      <div aria-live="polite" aria-atomic="true">
        {matchingProjects.length === 0 ? (
          <EmptyState className="rounded-surface border border-border bg-card">
            <EmptyStateVisual>
              <div className="flex size-16 items-center justify-center rounded-2xl bg-muted/60">
                <SearchX
                  aria-hidden="true"
                  className="size-8 text-muted-foreground"
                />
              </div>
            </EmptyStateVisual>

            <EmptyStateTitle>
              No matching projects
            </EmptyStateTitle>

            <EmptyStateDescription>
              Try a different search term or clear
              your search to see all projects.
            </EmptyStateDescription>

            <EmptyStateActions>
              <Button
                type="button"
                variant="outline"
                onClick={() => setQuery("")}
              >
                Clear search
              </Button>
            </EmptyStateActions>
          </EmptyState>
        ) : (
          <ul className="space-y-2">
            {matchingProjects.map((project) => (
              <li
                key={project}
                className="rounded-control border border-border bg-card px-4 py-3 text-sm text-foreground"
              >
                {project}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export const NoSearchResults: Story = {
  render: () => <NoSearchResultsExample />,

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "A functional empty-search example. Typing filters a local project collection, and clearing the query restores the results. The consumer owns filtering and announcements; EmptyState remains presentational.",
      },
    },
  },
};


function PrimaryActionExample() {
  const [created, setCreated] = useState(false);
  const resetButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="w-full max-w-lg space-y-4">
      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        {created
          ? "A sample record has been created."
          : "The collection has no records."}
      </p>

      {created ? (
        <div className="space-y-4 rounded-surface border border-border bg-card p-5">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">
              Sample record
            </h3>

            <p className="text-sm text-muted-foreground">
              Your collection now contains one record.
            </p>
          </div>

          <Button
            ref={resetButtonRef}
            variant="outline"
            onClick={() => setCreated(false)}
          >
            Reset example
          </Button>
        </div>
      ) : (
        <EmptyState className="rounded-surface border border-border bg-card">
          <EmptyStateVisual>
            <div className="flex size-16 items-center justify-center rounded-2xl bg-muted/60">
              <Inbox
                aria-hidden="true"
                className="size-8 text-muted-foreground"
              />
            </div>
          </EmptyStateVisual>

          <EmptyStateTitle>
            No records yet
          </EmptyStateTitle>

          <EmptyStateDescription>
            Create a sample record to populate
            your collection.
          </EmptyStateDescription>

          <EmptyStateActions>
            <Button
              onClick={() => {
                setCreated(true);

                requestAnimationFrame(() => {
                  resetButtonRef.current?.focus();
                });
              }}
            >
              <Plus
                aria-hidden="true"
                className="size-4"
              />
              Create sample record
            </Button>
          </EmptyStateActions>
        </EmptyState>
      )}
    </div>
  );
}

export const PrimaryAction: Story = {
  render: () => <PrimaryActionExample />,

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Demonstrates an empty-to-populated transition. The action creates local sample content, replacing the empty state with a record. The example moves focus to the newly available Reset button after creation; production applications should choose a focus target appropriate to their workflow.",
      },
    },
  },
};


function MultipleActionsExample() {
  const tipsId = useId();

  const [created, setCreated] = useState(false);
  const [showTips, setShowTips] = useState(false);

  return (
    <div className="w-full max-w-lg">
      {created ? (
        <div className="space-y-4 rounded-surface border border-border bg-card p-5">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">
              Starter workspace
            </h3>

            <p className="text-sm text-muted-foreground">
              Your sample workspace is ready.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => {
              setCreated(false);
              setShowTips(false);
            }}
          >
            Reset example
          </Button>
        </div>
      ) : (
        <EmptyState className="rounded-surface border border-border bg-card">
          <EmptyStateVisual>
            <div className="flex size-16 items-center justify-center rounded-2xl bg-muted/60">
              <FolderOpen
                aria-hidden="true"
                className="size-8 text-muted-foreground"
              />
            </div>
          </EmptyStateVisual>

          <EmptyStateTitle>
            Your workspace is empty
          </EmptyStateTitle>

          <EmptyStateDescription>
            Create a workspace or review a few
            tips before getting started.
          </EmptyStateDescription>

          <EmptyStateActions>
            <Button
              onClick={() => setCreated(true)}
            >
              <Plus
                aria-hidden="true"
                className="size-4"
              />
              Create workspace
            </Button>

            <Button
              variant="outline"
              aria-expanded={showTips}
              aria-controls={tipsId}
              onClick={() =>
                setShowTips((current) => !current)
              }
            >
              <BookOpen
                aria-hidden="true"
                className="size-4"
              />
              {showTips ? "Hide tips" : "Show tips"}
            </Button>
          </EmptyStateActions>

          <div
            id={tipsId}
            hidden={!showTips}
            className="w-full max-w-sm text-left"
          >
            <div className="rounded-control border border-border bg-muted/40 p-4">
              <p className="mb-2 text-sm font-medium text-foreground">
                Getting started
              </p>

              <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-muted-foreground">
                <li>
                  Choose a descriptive workspace name.
                </li>
                <li>
                  Organize related items together.
                </li>
                <li>
                  Invite collaborators when needed.
                </li>
              </ul>
            </div>
          </div>
        </EmptyState>
      )}
    </div>
  );
}

export const MultipleActions: Story = {
  render: () => <MultipleActionsExample />,

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Demonstrates multiple actions and an accessible disclosure. The primary action creates sample content, while the secondary action reveals guidance using aria-expanded and aria-controls. The consuming application owns both behaviors.",
      },
    },
  },
};

export const CustomVisual: Story = {
  render: () => (
    <EmptyState className="w-full max-w-xl rounded-surface border border-border bg-card">
      <EmptyStateVisual>
        <div className="flex size-20 items-center justify-center rounded-2xl border border-border bg-muted/60">
          <CloudUpload
            aria-hidden="true"
            className="size-10 text-primary"
            strokeWidth={1.5}
          />
        </div>
      </EmptyStateVisual>

      <EmptyStateTitle>
        Nothing uploaded yet
      </EmptyStateTitle>

      <EmptyStateDescription>
        Files you upload will appear here.
        Start by adding your first file.
      </EmptyStateDescription>
    </EmptyState>
  ),

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Demonstrates a custom visual treatment using a Lucide icon, a subtle background, and a bordered icon container. The icon is decorative because the title and description already communicate the message.",
      },
    },
  },
};


export const InsideCard: Story = {
  render: () => (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>
          Recent activity
        </CardTitle>
      </CardHeader>

      <CardContent>
        <EmptyState className="px-3 py-8">
          <EmptyStateVisual>
            <div className="flex size-14 items-center justify-center rounded-2xl bg-muted/60">
              <Bell
                aria-hidden="true"
                className="size-7 text-muted-foreground"
              />
            </div>
          </EmptyStateVisual>

          <EmptyStateTitle className="text-base leading-6">
            No recent activity
          </EmptyStateTitle>

          <EmptyStateDescription>
            Updates and recent changes will
            appear here when available.
          </EmptyStateDescription>
        </EmptyState>
      </CardContent>
    </Card>
  ),

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Demonstrates a compact EmptyState inside a Card. Reduced padding and a smaller visual prevent excessive whitespace when the component is nested inside another surface.",
      },
    },
  },
};
