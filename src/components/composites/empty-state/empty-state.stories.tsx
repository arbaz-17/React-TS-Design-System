
import { useId, useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Bell,
  BookOpen,
  FolderOpen,
  Inbox,
  Plus,
  SearchX,
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

// -----------------------------------------
// Story-only section helper
// -----------------------------------------

function DemoSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="w-full">
      <h2 id={headingId} className="sr-only">
        {title}
      </h2>
      {children}
    </section>
  );
}

// -----------------------------------------
// Storybook metadata
// -----------------------------------------

const meta = {
  title: "Composites/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A presentation-only component family for empty content states. EmptyState, EmptyStateVisual, EmptyStateTitle, EmptyStateDescription, and EmptyStateActions are independently composable and optional. Consumers own data-state detection, illustrations, navigation, action handlers, accessible announcements, and focus behavior. EmptyState does not automatically assign ARIA roles or manage application state.",
      },
    },
  },

  args: {
    className:
      "max-w-xl rounded-surface border border-border bg-card",
  },

  argTypes: {
    className: {
      control: "text",
      description:
        "Additional classes for root spacing, width, alignment, and presentation.",
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

// -----------------------------------------
// 1. Default
// -----------------------------------------

export const Default: Story = {
  render: (args) => (
    <DemoSection title="Empty project collection">
      <EmptyState {...args}>
        <EmptyStateVisual>
          <FolderOpen
            aria-hidden="true"
            className="size-12"
          />
        </EmptyStateVisual>

        <EmptyStateTitle>
          No projects yet
        </EmptyStateTitle>

        <EmptyStateDescription>
          Projects you create will appear here.
          Get started by creating your first project.
        </EmptyStateDescription>
      </EmptyState>
    </DemoSection>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "A complete informational empty state with a decorative icon, title, and description. Experiment with the root className control. No action is provided in this introductory example.",
      },
    },
  },
};

// -----------------------------------------
// 2. With Visual
// -----------------------------------------

export const WithVisual: Story = {
  render: () => (
    <DemoSection title="Empty inbox example">
      <EmptyState>
        <EmptyStateVisual>
          <div className="flex size-16 items-center justify-center rounded-full bg-muted">
            <Inbox
              aria-hidden="true"
              className="size-8 text-muted-foreground"
            />
          </div>
        </EmptyStateVisual>

        <EmptyStateTitle>
          Your inbox is empty
        </EmptyStateTitle>

        <EmptyStateDescription>
          New messages will appear here when
          someone contacts you.
        </EmptyStateDescription>
      </EmptyState>
    </DemoSection>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "EmptyStateVisual accepts consumer-provided icons and styling. The decorative icon is hidden from assistive technology because the text conveys the same meaning.",
      },
    },
  },
};

// -----------------------------------------
// 3. Without Visual
// -----------------------------------------

export const WithoutVisual: Story = {
  render: () => (
    <DemoSection title="Empty notifications example">
      <EmptyState>
        <EmptyStateTitle>
          No notifications
        </EmptyStateTitle>

        <EmptyStateDescription>
          You're all caught up. New notifications
          will appear here when available.
        </EmptyStateDescription>
      </EmptyState>
    </DemoSection>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "The visual section is optional. A heading and short explanation are often sufficient for simple empty states.",
      },
    },
  },
};

// -----------------------------------------
// 4. Title Only
// -----------------------------------------

export const TitleOnly: Story = {
  render: () => (
    <DemoSection title="Minimal empty state example">
      <EmptyState className="py-8">
        <EmptyStateTitle>
          Nothing to display
        </EmptyStateTitle>
      </EmptyState>
    </DemoSection>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "The minimal supported composition. Every section except the root and the title is omitted. No child registration or Context is required.",
      },
    },
  },
};

// -----------------------------------------
// 5. No Search Results
// -----------------------------------------

const sampleProjects = [
  "Design System",
  "Accessibility Audit",
  "Frontend Dashboard",
] as const;

function NoSearchResultsExample() {
  const inputId = useId();
  const [query, setQuery] = useState("missing");

  const matchingProjects = sampleProjects.filter(
    (project) =>
      project.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <DemoSection title="Project search example">
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

        <p
          role="status"
          className="text-sm text-muted-foreground"
        >
          {matchingProjects.length} matching projects
        </p>

        {matchingProjects.length === 0 ? (
          <EmptyState className="rounded-surface border border-border bg-card">
            <EmptyStateVisual>
              <SearchX
                aria-hidden="true"
                className="size-11"
              />
            </EmptyStateVisual>

            <EmptyStateTitle>
              No matching projects
            </EmptyStateTitle>

            <EmptyStateDescription>
              Try another search term or clear the
              current search to see all projects.
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
                className="rounded-control border border-border bg-card p-3 text-sm"
              >
                {project}
              </li>
            ))}
          </ul>
        )}
      </div>
    </DemoSection>
  );
}

export const NoSearchResults: Story = {
  render: () => <NoSearchResultsExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates consumer-managed empty search results. The search input filters a fixed local collection, and Clear search restores matching content. EmptyState itself does not inspect arrays or manage search state.",
      },
    },
  },
};

// -----------------------------------------
// 6. No Records
// -----------------------------------------

export const NoRecords: Story = {
  render: () => (
    <DemoSection title="Empty records example">
      <EmptyState className="rounded-surface border border-dashed border-border bg-card">
        <EmptyStateVisual>
          <FolderOpen
            aria-hidden="true"
            className="size-11"
          />
        </EmptyStateVisual>

        <EmptyStateTitle>
          No records yet
        </EmptyStateTitle>

        <EmptyStateDescription>
          Your records will appear here after
          they have been added to the collection.
        </EmptyStateDescription>
      </EmptyState>
    </DemoSection>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A first-use empty collection without an action. Not every empty state needs a call to action, particularly when record creation is unavailable in the current context.",
      },
    },
  },
};

// -----------------------------------------
// 7. Primary Action
// -----------------------------------------

function PrimaryActionExample() {
  const [created, setCreated] = useState(false);

  return (
    <DemoSection title="Create a sample record">
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
            <p className="font-medium text-foreground">
              Sample record
            </p>

            <Button
              variant="outline"
              onClick={() => setCreated(false)}
            >
              Reset example
            </Button>
          </div>
        ) : (
          <EmptyState className="rounded-surface border border-border bg-card">
            <EmptyStateVisual>
              <Plus
                aria-hidden="true"
                className="size-11"
              />
            </EmptyStateVisual>

            <EmptyStateTitle>
              No records yet
            </EmptyStateTitle>

            <EmptyStateDescription>
              Create a sample record to populate
              this collection.
            </EmptyStateDescription>

            <EmptyStateActions>
              <Button onClick={() => setCreated(true)}>
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
    </DemoSection>
  );
}

export const PrimaryAction: Story = {
  render: () => <PrimaryActionExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates a functional primary action. React state belongs to the consuming example, and EmptyState is replaced by actual content after the sample record is created.",
      },
    },
  },
};

// -----------------------------------------
// 8. Multiple Actions
// -----------------------------------------

function MultipleActionsExample() {
  const tipsId = useId();

  const [created, setCreated] = useState(false);
  const [showTips, setShowTips] = useState(false);

  return (
    <DemoSection title="Empty workspace with actions">
      <div className="w-full max-w-lg space-y-4">
        {created ? (
          <div className="space-y-4 rounded-surface border border-border bg-card p-5">
            <h3 className="font-semibold">
              Starter workspace
            </h3>

            <p className="text-sm text-muted-foreground">
              Your sample workspace is ready.
            </p>

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
              <FolderOpen
                aria-hidden="true"
                className="size-11"
              />
            </EmptyStateVisual>

            <EmptyStateTitle>
              Your workspace is empty
            </EmptyStateTitle>

            <EmptyStateDescription>
              Create a starter workspace or review
              some guidance before getting started.
            </EmptyStateDescription>

            <EmptyStateActions>
              <Button
                onClick={() => setCreated(true)}
              >
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
              className="max-w-sm text-left"
            >
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Choose a descriptive workspace name.</li>
                <li>Organize related items together.</li>
                <li>Invite collaborators when needed.</li>
              </ul>
            </div>
          </EmptyState>
        )}
      </div>
    </DemoSection>
  );
}

export const MultipleActions: Story = {
  render: () => <MultipleActionsExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "EmptyStateActions supports multiple consumer-provided controls. The primary action creates sample content, and the secondary action expands local guidance with aria-expanded and aria-controls. Neither behavior exists inside EmptyState itself.",
      },
    },
  },
};

// -----------------------------------------
// 9. Custom Illustration
// -----------------------------------------

export const CustomIllustration: Story = {
  render: () => (
    <DemoSection title="Custom empty-state illustration">
      <EmptyState className="rounded-surface border border-border bg-card">
        <EmptyStateVisual>
          <svg
            viewBox="0 0 120 100"
            fill="none"
            aria-hidden="true"
            focusable="false"
            className="h-28 w-32 text-primary"
          >
            <rect
              x="22"
              y="29"
              width="76"
              height="56"
              rx="9"
              fill="currentColor"
              fillOpacity="0.08"
              stroke="currentColor"
              strokeWidth="2"
            />

            <path
              d="M22 43H98"
              stroke="currentColor"
              strokeWidth="2"
            />

            <path
              d="M35 29V23C35 20 38 18 41 18H57L64 29"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            <path
              d="M49 63H71M60 52V74"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <circle
              cx="98"
              cy="21"
              r="7"
              fill="currentColor"
              fillOpacity="0.3"
            />

            <circle
              cx="16"
              cy="69"
              r="4"
              fill="currentColor"
              fillOpacity="0.2"
            />
          </svg>
        </EmptyStateVisual>

        <EmptyStateTitle>
          Nothing uploaded yet
        </EmptyStateTitle>

        <EmptyStateDescription>
          Files added to this collection will
          appear here.
        </EmptyStateDescription>
      </EmptyState>
    </DemoSection>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A consumer-provided decorative SVG illustration using currentColor and the existing primary design token. EmptyState does not generate illustrations. The text fully communicates the message without relying on the image.",
      },
    },
  },
};

// -----------------------------------------
// 10. Inside Card
// -----------------------------------------

export const InsideCard: Story = {
  render: () => (
    <DemoSection title="Empty activity card">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>
            Recent activity
          </CardTitle>
        </CardHeader>

        <CardContent>
          <EmptyState className="px-3 py-8">
            <EmptyStateVisual>
              <Bell
                aria-hidden="true"
                className="size-10"
              />
            </EmptyStateVisual>

            <EmptyStateTitle>
              No recent activity
            </EmptyStateTitle>

            <EmptyStateDescription>
              Updates and recent changes will
              appear here when available.
            </EmptyStateDescription>
          </EmptyState>
        </CardContent>
      </Card>
    </DemoSection>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates EmptyState inside the existing Card family. Compact root padding prevents excessive nested spacing. The two component families remain independent and require no special integration props.",
      },
    },
  },
};

// -----------------------------------------
// 11. Responsive Layout
// -----------------------------------------

export const ResponsiveLayout: Story = {
  render: () => (
    <DemoSection title="Responsive empty-state layouts">
      <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="min-w-0 rounded-surface border border-border bg-card">
          <EmptyState className="px-3 py-7">
            <EmptyStateVisual>
              <Inbox
                aria-hidden="true"
                className="size-8"
              />
            </EmptyStateVisual>

            <EmptyStateTitle>
              No messages
            </EmptyStateTitle>

            <EmptyStateDescription>
              Your inbox is empty.
            </EmptyStateDescription>
          </EmptyState>
        </div>

        <div className="min-w-0 rounded-surface border border-border bg-card">
          <EmptyState className="px-3 py-7">
            <EmptyStateVisual>
              <FolderOpen
                aria-hidden="true"
                className="size-8"
              />
            </EmptyStateVisual>

            <EmptyStateTitle>
              No project files
            </EmptyStateTitle>

            <EmptyStateDescription>
              Your uploaded files will appear
              here when available.
            </EmptyStateDescription>
          </EmptyState>
        </div>

        <div className="min-w-0 rounded-surface border border-border bg-card">
          <EmptyState className="px-3 py-7">
            <EmptyStateVisual>
              <Bell
                aria-hidden="true"
                className="size-8"
              />
            </EmptyStateVisual>

            <EmptyStateTitle>
              No notifications
            </EmptyStateTitle>

            <EmptyStateDescription>
              Important updates will appear here.
            </EmptyStateDescription>
          </EmptyState>
        </div>
      </div>
    </DemoSection>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates repeated EmptyState compositions in a responsive grid. Verify one, two, and three-column layouts as viewport width changes. Each instance preserves centered content, wrapping, and independent composition.",
      },
    },
  },
};
