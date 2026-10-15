
import { useId, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Skeleton,
} from "../../index";

// -----------------------------------------
// Storybook metadata
// -----------------------------------------

const meta = {
  title: "Composites/Card",
  component: Card,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A composition-based content container consisting of Card, CardHeader, CardTitle, CardDescription, CardContent, and CardFooter. Every section is optional. Components inherit their native HTML props and refs, use semantic design tokens, and contain no internal state or business logic. CardTitle renders h3, so consumers must consider document heading hierarchy. Card itself is noninteractive.",
      },
    },
  },

  args: {
    className: "w-full max-w-md",
  },

  argTypes: {
    className: {
      control: "text",
      description:
        "Additional Tailwind classes for root layout and visual customization.",
    },

    children: {
      control: false,
      description:
        "Composable Card sections and arbitrary React content.",
    },

    ref: {
      control: false,
      description:
        "Optional ref to the native root HTMLDivElement.",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

// -----------------------------------------
// 1. Default
// -----------------------------------------

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Project overview</CardTitle>
        <CardDescription>
          Summary of your current project.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-6 text-card-foreground">
          Build a reusable design system using React,
          TypeScript, Tailwind CSS, and Storybook.
        </p>
      </CardContent>
    </Card>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "A basic composition using Card, CardHeader, CardTitle, CardDescription, and CardContent. Experiment with the root className to change width, padding, or shadow.",
      },
    },
  },
};

// -----------------------------------------
// 2. Complete Card
// -----------------------------------------

export const CompleteCard: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Design System</CardTitle>
        <CardDescription>
          Frontend Engineering — Month 3
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm leading-6">
          A reusable component library with semantic
          design tokens, accessible components, and
          documented composition patterns.
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="primary">React</Badge>
          <Badge variant="outline">TypeScript</Badge>
          <Badge variant="outline">Tailwind CSS</Badge>
        </div>
      </CardContent>

      <CardFooter className="justify-between">
        <Badge variant="success">
          Active
        </Badge>

        <span className="text-xs text-muted-foreground">
          Internship project
        </span>
      </CardFooter>
    </Card>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates all six public Card components. Header, content, and footer are composed independently. CardFooter can contain metadata without interactive controls.",
      },
    },
  },
};

// -----------------------------------------
// 3. Content Only
// -----------------------------------------

export const ContentOnly: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardContent>
        <p className="text-sm leading-6">
          A Card does not require a header, title,
          description, or footer. Consumers can render
          only the sections needed for their content.
        </p>
      </CardContent>
    </Card>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A minimal Card demonstrates that its sections are optional. No Context, required nesting, or child registration is involved.",
      },
    },
  },
};

// -----------------------------------------
// 4. Header and Content
// -----------------------------------------

export const HeaderAndContent: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Component inventory</CardTitle>
        <CardDescription>
          Current design-system implementation.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <dl className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <dt className="text-sm text-muted-foreground">
              Families
            </dt>
            <dd className="text-2xl font-semibold">
              17
            </dd>
          </div>

          <div className="space-y-1">
            <dt className="text-sm text-muted-foreground">
              Components
            </dt>
            <dd className="text-2xl font-semibold">
              55
            </dd>
          </div>

          <div className="col-span-2">
            <Badge variant="success">
              Implementation complete
            </Badge>
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
          "Demonstrates a Card without a footer and uses native description-list semantics for related metrics. Internal content layout is controlled by consumers.",
      },
    },
  },
};

// -----------------------------------------
// 5. With Footer Actions
// -----------------------------------------

function FooterActionsExample() {
  const detailsId = useId();
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Project details</CardTitle>
        <CardDescription>
          Explore additional project information.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm leading-6">
          This example demonstrates functional actions
          placed in CardFooter.
        </p>

        <div id={detailsId} hidden={!expanded}>
          <p className="rounded-control bg-muted p-3 text-sm text-muted-foreground">
            The project uses a composition-first
            architecture with strongly typed public
            component APIs.
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={() => {
            setExpanded((current) => !current);
          }}
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

export const WithFooterActions: Story = {
  render: () => <FooterActionsExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "CardFooter provides layout for actions but does not manage their behavior. Buttons retain native keyboard interactions. This example uses consumer-owned React state and aria-expanded to disclose details.",
      },
    },
  },
};

// -----------------------------------------
// 6. With Status Badge
// -----------------------------------------

export const WithStatusBadge: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <CardTitle>Frontend project</CardTitle>

          <Badge variant="success" size="sm">
            Completed
          </Badge>
        </div>

        <CardDescription>
          Reusable UI component implementation.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-6">
          This Card uses Badge composition to
          communicate project status without adding
          status-specific props to Card.
        </p>
      </CardContent>
    </Card>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Status information is composed using Badge rather than a special Card variant. The status is communicated through visible text, not color alone.",
      },
    },
  },
};

// -----------------------------------------
// 7. Form Card
// -----------------------------------------

function FormCardExample() {
  const formId = useId();
  const inputId = useId();

  const [savedName, setSavedName] = useState("");

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Project settings</CardTitle>

        <CardDescription>
          Update the project display name.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form
          id={formId}
          className="space-y-2"
          onSubmit={(event) => {
            event.preventDefault();

            const formData = new FormData(
              event.currentTarget,
            );

            setSavedName(
              String(formData.get("projectName") ?? ""),
            );
          }}
          onReset={() => setSavedName("")}
        >
          <label
            htmlFor={inputId}
            className="block text-sm font-medium"
          >
            Project name
          </label>

          <Input
            id={inputId}
            name="projectName"
            defaultValue="Design System"
            required
          />
        </form>

        <p
          role="status"
          className="text-sm text-muted-foreground"
        >
          {savedName
            ? `Saved locally: ${savedName}`
            : ""}
        </p>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          form={formId}
        >
          Save project
        </Button>

        <Button
          type="reset"
          form={formId}
          variant="outline"
        >
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
          "Demonstrates native form integration. The form lives inside CardContent, while CardFooter buttons use the HTML form attribute to submit or reset it. Input validation and submission state belong to the consumer.",
      },
    },
  },
};

// -----------------------------------------
// 8. Loading Card with Skeleton
// -----------------------------------------

function LoadingCardExample() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full max-w-md space-y-4">
      <Button
        variant="outline"
        onClick={() => {
          setLoading((current) => !current);
        }}
      >
        {loading
          ? "Show loaded content"
          : "Show loading placeholders"}
      </Button>

      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        {loading
          ? "Loading project information."
          : "Project information loaded."}
      </p>

      <Card aria-busy={loading}>
        {loading ? (
          <>
            <CardHeader className="space-y-2">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3 w-4/5" />
            </CardHeader>

            <CardContent className="space-y-3">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-2/3" />
            </CardContent>

            <CardFooter>
              <Skeleton className="h-9 w-28" />
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>Design System</CardTitle>

              <CardDescription>
                Project information
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-sm leading-6">
                A reusable component library with
                accessible and strongly typed APIs.
              </p>
            </CardContent>

            <CardFooter>
              <Badge variant="success">
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
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates Card with decorative Skeleton placeholders. aria-busy identifies the loading region, while a persistent status message outside the busy Card communicates state changes. The loading toggle is consumer-managed and deterministic.",
      },
    },
  },
};

// -----------------------------------------
// 9. Custom Styling
// -----------------------------------------

export const CustomStyling: Story = {
  render: () => (
    <div className="w-full max-w-lg space-y-5">
      <Card className="p-4 shadow-none">
        <CardHeader>
          <CardTitle>Compact Card</CardTitle>

          <CardDescription>
            Reduced padding and no shadow.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm">
            Uses className to customize the existing
            root styles.
          </p>
        </CardContent>
      </Card>

      <Card className="border-primary/40 shadow-none">
        <CardHeader>
          <CardTitle>Highlighted Card</CardTitle>

          <CardDescription>
            Customized border emphasis.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm">
            Styling remains based on semantic tokens.
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
          "Consumers can extend or override Card styles through className. No separate appearance variants are required. Customization should preserve readable contrast and consistent spacing.",
      },
    },
  },
};

// -----------------------------------------
// 10. Responsive Card Grid
// -----------------------------------------

const projects = [
  {
    name: "Component Library",
    description:
      "Reusable accessible React components.",
    status: "Completed",
    variant: "success",
  },
  {
    name: "Storybook Documentation",
    description:
      "Interactive examples and component guidance.",
    status: "In Progress",
    variant: "warning",
  },
  {
    name: "Accessibility Review",
    description:
      "Keyboard, semantics, and visual checks.",
    status: "Planned",
    variant: "neutral",
  },
] as const;

function ResponsiveCardGridExample() {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className="w-full"
    >
      <h2
        id={headingId}
        className="mb-4 text-xl font-semibold"
      >
        Project workstreams
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.name}
            className="h-full"
          >
            <CardHeader>
              <CardTitle>
                {project.name}
              </CardTitle>

              <CardDescription>
                {project.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">
                Frontend Engineering Internship
              </p>
            </CardContent>

            <CardFooter>
              <Badge variant={project.variant}>
                {project.status}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

export const ResponsiveCardGrid: Story = {
  render: () => <ResponsiveCardGridExample />,

  parameters: {
    layout: "padded",
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Multiple Cards arranged in a responsive CSS grid. The layout changes from one to two to three columns as available width increases. The h2 section heading establishes context for CardTitle's h3 elements.",
      },
    },
  },
};
