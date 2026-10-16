
import { useId, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Eye, FolderOpen, RotateCcw } from "lucide-react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  EmptyStateDescription,
  EmptyStateTitle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../index";


type Project = {
  id: number;
  name: string;
  status: "Active" | "Review" | "Planned";
  owner: string;
  tasks: number;
  completed: number;
  budget: number;
};

const projects: Project[] = [
  {
    id: 1,
    name: "Design System",
    status: "Active",
    owner: "Alex Morgan",
    tasks: 24,
    completed: 18,
    budget: 4200,
  },
  {
    id: 2,
    name: "Admin Dashboard",
    status: "Review",
    owner: "Sam Wilson",
    tasks: 18,
    completed: 15,
    budget: 3100,
  },
  {
    id: 3,
    name: "Client Portal",
    status: "Planned",
    owner: "Jordan Lee",
    tasks: 9,
    completed: 0,
    budget: 1800,
  },
];

const statusVariants = {
  Active: "success",
  Review: "warning",
  Planned: "neutral",
} as const;

const totalTasks = projects.reduce(
  (total, project) => total + project.tasks,
  0,
);

const totalCompleted = projects.reduce(
  (total, project) => total + project.completed,
  0,
);

const totalBudget = projects.reduce(
  (total, project) => total + project.budget,
  0,
);

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);


const meta = {
  title: "Composites/Table",
  component: Table,
  tags: ["autodocs"],

  parameters: {
    layout: "centered",

    docs: {
      description: {
        component:
          "A compositional table family built on native HTML elements. TableContainer provides optional horizontal scrolling, while Table, TableCaption, TableHeader, TableBody, TableFooter, TableRow, TableHead, and TableCell preserve native semantics. Consumers manage data, calculations, actions, empty states, and accessibility relationships. Sorting, filtering, selection, pagination, and data fetching are outside the component's responsibilities.",
      },
    },
  },

  args: {
    className: "w-full",
  },

  argTypes: {
    className: {
      control: "text",
      description:
        "Additional CSS classes applied to the native table element.",
    },

    children: {
      control: false,
      description:
        "Native table captions, sections, rows, and cells.",
    },

    ref: {
      control: false,
      description:
        "Optional ref to the native HTMLTableElement.",
    },
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
  render: (args) => (
    <TableContainer className="max-w-2xl">
      <Table {...args}>
        <TableCaption>
          Project records and assigned task counts.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="text-right">
              Tasks
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableHead
                scope="row"
                className="text-sm font-medium text-foreground"
              >
                {project.name}
              </TableHead>

              <TableCell>
                {project.owner}
              </TableCell>

              <TableCell className="text-right tabular-nums">
                {project.tasks}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "The recommended basic composition. A native caption identifies the table, column headers describe the data, and project names use scope='row' to identify each record. Use the className control to customize the table.",
      },
    },
  },
};

export const StatusBadges: Story = {
  render: () => (
    <TableContainer className="max-w-2xl">
      <Table>
        <TableCaption>
          Current project statuses and ownership.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableHead
                scope="row"
                className="text-sm font-medium text-foreground"
              >
                {project.name}
              </TableHead>

              <TableCell>
                <Badge
                  variant={statusVariants[project.status]}
                >
                  {project.status}
                </Badge>
              </TableCell>

              <TableCell>
                {project.owner}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Demonstrates composing the existing Badge component inside table cells. Status is communicated through visible text as well as color. Table does not depend on Badge or interpret status values.",
      },
    },
  },
};


function RowActionsExample() {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  return (
    <div className="w-full max-w-2xl space-y-4">
      <TableContainer>
        <Table>
          <TableCaption>
            Project records with individual actions.
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableHead
                  scope="row"
                  className="text-sm font-medium text-foreground"
                >
                  {project.name}
                </TableHead>

                <TableCell>
                  <Badge
                    variant={
                      statusVariants[project.status]
                    }
                  >
                    {project.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    aria-label={`View ${project.name}`}
                    onClick={() =>
                      setSelectedProject(project)
                    }
                  >
                    <Eye
                      aria-hidden="true"
                      className="size-4"
                    />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div
        role="status"
        className="min-h-10 rounded-control border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground"
      >
        {selectedProject ? (
          <span>
            Selected project:{" "}
            <strong className="font-medium text-foreground">
              {selectedProject.name}
            </strong>
          </span>
        ) : (
          "Select View to inspect a project."
        )}
      </div>
    </div>
  );
}

export const RowActions: Story = {
  render: () => <RowActionsExample />,

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Demonstrates functional row-level buttons. Each View button has a unique accessible name identifying its project, and clicking updates a local status region. Actions remain inside native table cells rather than making entire rows interactive.",
      },
    },
  },
};


export const FooterTotals: Story = {
  render: () => (
    <TableContainer className="max-w-3xl">
      <Table>
        <TableCaption>
          Project task progress and budget totals.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>

            <TableHead className="text-right">
              Tasks
            </TableHead>

            <TableHead className="text-right">
              Completed
            </TableHead>

            <TableHead className="text-right">
              Budget (USD)
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableHead
                scope="row"
                className="text-sm font-medium text-foreground"
              >
                {project.name}
              </TableHead>

              <TableCell className="text-right tabular-nums">
                {project.tasks}
              </TableCell>

              <TableCell className="text-right tabular-nums">
                {project.completed}
              </TableCell>

              <TableCell className="text-right tabular-nums">
                {formatCurrency(project.budget)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableHead
              scope="row"
              className="text-sm font-semibold text-foreground"
            >
              Total
            </TableHead>

            <TableCell className="text-right font-semibold tabular-nums">
              {totalTasks}
            </TableCell>

            <TableCell className="text-right font-semibold tabular-nums">
              {totalCompleted}
            </TableCell>

            <TableCell className="text-right font-semibold tabular-nums">
              {formatCurrency(totalBudget)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  ),

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Demonstrates native tfoot semantics, consumer-calculated totals, right-aligned numeric columns, and tabular numerals. Numeric headings and values share alignment for easier comparison.",
      },
    },
  },
};


function EmptyDataExample() {
  const [showRecords, setShowRecords] =
    useState(false);

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-foreground">
            Project records
          </h3>

          <p className="text-sm text-muted-foreground">
            Browse the projects in your collection.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setShowRecords((current) => !current)
          }
        >
          <RotateCcw
            aria-hidden="true"
            className="size-4"
          />

          {showRecords
            ? "Show empty state"
            : "Restore records"}
        </Button>
      </div>

      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        {showRecords
          ? `${projects.length} project records displayed.`
          : "No project records available."}
      </p>

      <TableContainer>
        <Table>
          <TableCaption className="sr-only">
            Project collection
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>

              <TableHead className="text-right">
                Tasks
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {showRecords ? (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableHead
                    scope="row"
                    className="text-sm font-medium text-foreground"
                  >
                    {project.name}
                  </TableHead>

                  <TableCell>
                    <Badge
                      variant={
                        statusVariants[project.status]
                      }
                    >
                      {project.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right tabular-nums">
                    {project.tasks}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="p-0"
                >
                  <EmptyState className="px-4 py-10">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-muted/60">
                      <FolderOpen
                        aria-hidden="true"
                        className="size-7 text-muted-foreground"
                      />
                    </div>

                    <EmptyStateTitle className="text-base">
                      No projects found
                    </EmptyStateTitle>

                    <EmptyStateDescription>
                      Project records will appear
                      here when available.
                    </EmptyStateDescription>
                  </EmptyState>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export const EmptyData: Story = {
  render: () => <EmptyDataExample />,

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Demonstrates a valid empty state inside a table cell spanning all three columns. The toggle switches between empty and populated data while preserving focus on the control. Empty-state detection and rendering remain consumer responsibilities.",
      },
    },
  },
};


function HorizontalOverflowExample() {
  const tableLabelId = useId();

  return (
    <div className="w-full max-w-md space-y-3">
      <p
        id={tableLabelId}
        className="text-sm text-muted-foreground"
      >
        Scroll horizontally to explore the full
        project report. You can also focus the
        table region and use the arrow keys.
      </p>

      <TableContainer
        role="region"
        aria-label="Scrollable project report"
        aria-describedby={tableLabelId}
        tabIndex={0}
        className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Table className="min-w-[800px]">
          <TableCaption className="sr-only">
            Wide project report
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Owner</TableHead>

              <TableHead className="text-right">
                Tasks
              </TableHead>

              <TableHead className="text-right">
                Completed
              </TableHead>

              <TableHead className="text-right">
                Budget
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableHead
                  scope="row"
                  className="whitespace-nowrap text-sm font-medium text-foreground"
                >
                  {project.name}
                </TableHead>

                <TableCell>
                  <Badge
                    variant={
                      statusVariants[project.status]
                    }
                  >
                    {project.status}
                  </Badge>
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {project.owner}
                </TableCell>

                <TableCell className="text-right tabular-nums">
                  {project.tasks}
                </TableCell>

                <TableCell className="text-right tabular-nums">
                  {project.completed}
                </TableCell>

                <TableCell className="text-right tabular-nums">
                  {formatCurrency(project.budget)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export const HorizontalOverflow: Story = {
  render: () => <HorizontalOverflowExample />,

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Demonstrates a wide table inside a narrow scrollable container. The intentionally scrollable region has an accessible name, descriptive instructions, a keyboard focus stop, and a visible focus outline. These attributes are consumer-managed rather than applied automatically to every TableContainer.",
      },
    },
  },
};


export const InsideCard: Story = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle>
              Project overview
            </CardTitle>

            <CardDescription>
              Current project statuses and task counts.
            </CardDescription>
          </div>

          <Badge variant="neutral">
            {projects.length} projects
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <TableContainer>
          <Table>
            <TableCaption className="sr-only">
              Project overview records
            </TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>

                <TableHead className="text-right">
                  Tasks
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableHead
                    scope="row"
                    className="text-sm font-medium text-foreground"
                  >
                    {project.name}
                  </TableHead>

                  <TableCell>
                    <Badge
                      variant={
                        statusVariants[project.status]
                      }
                    >
                      {project.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right tabular-nums">
                    {project.tasks}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  ),

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Demonstrates Table inside the existing Card family. Card provides the heading and supporting context, while Table retains its native semantics, scroll container, and visually hidden caption. No integration-specific component props are required.",
      },
    },
  },
};
