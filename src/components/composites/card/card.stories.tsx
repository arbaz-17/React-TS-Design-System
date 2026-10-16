import { useId, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckCircle2 } from "lucide-react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
  Input,
  Skeleton,
} from "../../index";

const meta = {
  title: "Composites/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A noninteractive, composition-based content surface. CardHeader, CardTitle, CardDescription, CardContent, CardFooter, and optional CardMedia can be combined as needed. CardTitle renders an h3; choose surrounding heading levels appropriately. Card has no built-in loading, image, or action state.",
      },
    },
  },
  args: { className: "w-full max-w-md" },
  argTypes: {
    className: {
      control: "text",
      description:
        "Additional classes for the Card root. Section spacing is controlled by each subcomponent.",
    },
    children: {
      control: false,
      description: "Composable Card sections and arbitrary React content.",
    },
    ref: {
      control: false,
      description: "Optional ref to the native root HTMLDivElement.",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Project overview</CardTitle>
        <CardDescription>A quick summary of the current work.</CardDescription>
      </CardHeader>
      <CardContent className="pt-3">
        <p className="text-sm leading-6 text-card-foreground">
          Keep project information, updates, and next steps together in one
          place.
        </p>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The simplest header-and-content composition. Use controls to adjust the root width or surface styling.",
      },
    },
  },
};

export const CompleteCard: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <CardTitle>Website refresh</CardTitle>
          <Badge variant="success" size="sm">
            Active
          </Badge>
        </div>
        <CardDescription>
          Design and development · Updated today
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <p className="text-sm leading-6 text-card-foreground">
          Refresh the site with clearer navigation, consistent components, and
          accessible patterns.
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>75%</span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-muted"
            aria-label="75% complete"
            role="img"
          >
            <div className="h-full w-3/4 rounded-full bg-primary" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t border-border pt-4">
        <span className="text-xs text-muted-foreground">
          18 of 24 tasks completed
        </span>
        <Badge variant="outline" size="sm">
          On track
        </Badge>
      </CardFooter>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A complete card with a clear heading, status, progress, and footer metadata. Progress is expressed in text as well as visually.",
      },
    },
  },
};

export const ContentOnly: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardContent>
        <p className="text-sm leading-6 text-card-foreground">
          Your workspace is ready. Add a project to start organizing your work.
        </p>
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A minimal surface using CardContent alone. All Card sections are optional.",
      },
    },
  },
};

export const HeaderAndContent: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Activity summary</CardTitle>
        <CardDescription>An overview of this week's work.</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <dl className="grid grid-cols-2 gap-4">
          <div className="rounded-control bg-muted/60 p-4">
            <dt className="text-xs text-muted-foreground">Completed</dt>
            <dd className="mt-1 text-2xl font-semibold tracking-tight">18</dd>
          </div>
          <div className="rounded-control bg-muted/60 p-4">
            <dt className="text-xs text-muted-foreground">In progress</dt>
            <dd className="mt-1 text-2xl font-semibold tracking-tight">6</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A simple summary card with native description-list semantics for related metrics.",
      },
    },
  },
};

function FooterActionsExample() {
  const detailsId = useId();
  const [expanded, setExpanded] = useState(false);
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Project details</CardTitle>
        <CardDescription>
          Review additional information about this project.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-3">
        <p className="text-sm leading-6">
          The project is ready for its next review.
        </p>
        <div id={detailsId} hidden={!expanded} className="mt-4">
          <p className="rounded-control bg-muted p-4 text-sm leading-6 text-muted-foreground">
            The next review covers accessibility, content clarity, and
            responsive layouts.
          </p>
        </div>
      </CardContent>
      <CardFooter className="border-t border-border pt-4">
        <Button
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Hide details" : "Show details"}
        </Button>
        <Button
          variant="outline"
          disabled={!expanded}
          onClick={() => setExpanded(false)}
        >
          Reset view
        </Button>
      </CardFooter>
    </Card>
  );
}

export const WithImage: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardMedia className="aspect-video">
        <img
          src="/f1.png"
          alt="Formula 1 cars racing on a circuit"
          loading="lazy"
          decoding="async"
        />
      </CardMedia>

      <CardHeader>
        <CardTitle>Formula 1 Grand Prix</CardTitle>
        <CardDescription>
          Experience the excitement of race weekend.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-3">
        <p className="text-sm leading-6">
          Discover the speed, strategy, and competition of Formula 1 as the
          world's top drivers compete for victory.
        </p>
      </CardContent>

      <CardFooter className="justify-between border-t border-border pt-4">
        <Badge variant="primary" size="sm">
          Motorsport
        </Badge>

        <span className="inline-flex items-center gap-1 text-sm font-medium">
          Featured
          <CheckCircle2 aria-hidden="true" className="size-4" />
        </span>
      </CardFooter>
    </Card>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates an image-led Card using a native img element, responsive image cropping, composed content sections.",
      },
    },
  },
};

export const WithFooterActions: Story = {
  render: () => <FooterActionsExample />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "CardFooter lays out actions without owning their state. The disclosure button exposes aria-expanded and aria-controls.",
      },
    },
  },
};

export const WithStatusBadge: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <CardTitle>Content review</CardTitle>
          <Badge variant="warning" size="sm">
            Pending
          </Badge>
        </div>
        <CardDescription>Awaiting final approval.</CardDescription>
      </CardHeader>
      <CardContent className="pt-3">
        <p className="text-sm leading-6">
          The latest changes have been submitted for review.
        </p>
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A text-labeled status is composed with Badge instead of adding status props to Card.",
      },
    },
  },
};

function FormCardExample() {
  const formId = useId();
  const inputId = useId();
  const [savedName, setSavedName] = useState("");
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Project settings</CardTitle>
        <CardDescription>
          Update the name displayed in your workspace.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <form
          id={formId}
          className="space-y-2"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            setSavedName(String(data.get("projectName") ?? ""));
          }}
          onReset={() => setSavedName("")}
        >
          <label htmlFor={inputId} className="block text-sm font-medium">
            Project name
          </label>
          <Input
            id={inputId}
            name="projectName"
            defaultValue="Website refresh"
            required
          />
        </form>
        <p role="status" className="mt-3 min-h-5 text-sm text-muted-foreground">
          {savedName ? `Saved locally: ${savedName}` : ""}
        </p>
      </CardContent>
      <CardFooter className="border-t border-border pt-4">
        <Button type="submit" form={formId}>
          Save changes
        </Button>
        <Button type="reset" form={formId} variant="outline">
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}

export const FormCard: Story = {
  render: () => <FormCardExample />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A native form inside CardContent with submit and reset buttons in CardFooter. Saving is simulated locally, without a server request.",
      },
    },
  },
};


function LoadingCardExample() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p role="status" className="text-sm text-muted-foreground">
          {loading
            ? "Loading project information..."
            : "Project information loaded."}
        </p>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setLoading((current) => !current)}
        >
          {loading ? "Show content" : "Show loading"}
        </Button>
      </div>

      <Card
        aria-busy={loading}
        aria-label="Project information"
        className="w-full"
      >
        {loading ? (
          <>
            <CardHeader className="gap-3">
              <Skeleton className="h-5 w-2/5" />
              <Skeleton className="h-3 w-3/5" />
            </CardHeader>

            <CardContent className="space-y-3 pt-4">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[90%]" />
              <Skeleton className="h-3 w-3/4" />
            </CardContent>

            <CardFooter className="border-t border-border pt-4">
              <Skeleton className="h-6 w-24 rounded-full" />
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>Design System</CardTitle>
              <CardDescription>
                Project information and current status.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4">
              <p className="text-sm leading-6 text-muted-foreground">
                A reusable component library built with
                React, TypeScript, and accessible design
                patterns for consistent user interfaces.
              </p>
            </CardContent>

            <CardFooter className="border-t border-border pt-4">
              <Badge variant="success" size="sm">
                Available
              </Badge>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}

export const LoadingCard: Story = {
  render: () => <LoadingCardExample />,
  parameters: {
    layout: "padded",
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates a responsive Card loading state using decorative Skeleton placeholders. The Card fills its container, aria-busy identifies the loading region, and an external status message announces state changes.",
      },
    },
  },
};


export const CustomStyling: Story = {
  render: () => (
    <div className="w-full max-w-lg space-y-4">
      <Card className="shadow-none">
        <CardHeader className="px-4 pt-4">
          <CardTitle className="text-base">Compact card</CardTitle>
          <CardDescription>
            Reduced section padding and no shadow.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-2">
          <p className="text-sm">
            Section-level classes keep spacing consistent.
          </p>
        </CardContent>
      </Card>
      <Card className="border-primary/40 shadow-none">
        <CardHeader>
          <CardTitle>Highlighted card</CardTitle>
          <CardDescription>
            Subtle border emphasis using a semantic token.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-3">
          <p className="text-sm">
            Surface customization does not imply interactivity.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Root classes customize the surface; section classes customize spacing. Neither example suggests the card is clickable.",
      },
    },
  },
};

const projects = [
  {
    name: "Website refresh",
    description: "Improve navigation and page layouts.",
    status: "Completed",
    variant: "success",
  },
  {
    name: "Content updates",
    description: "Review and update key pages.",
    status: "In progress",
    variant: "primary",
  },
  {
    name: "Quality review",
    description: "Check accessibility and responsive behavior.",
    status: "Planned",
    variant: "neutral",
  },
] as const;

export const ResponsiveCardGrid: Story = {
  render: () => (
    <section aria-labelledby="projects-heading" className="w-full">
      <h2
        id="projects-heading"
        className="mb-5 text-xl font-semibold tracking-tight"
      >
        Current projects
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.name} className="h-full">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pt-4">
              <p className="text-sm text-muted-foreground">Project status</p>
            </CardContent>
            <CardFooter className="border-t border-border pt-4">
              <Badge variant={project.variant} size="sm">
                {project.status}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  ),
  parameters: {
    layout: "padded",
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Three cards in a responsive grid, with an h2 section heading above their h3 titles and aligned footers.",
      },
    },
  },
};
