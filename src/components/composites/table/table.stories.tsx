
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

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

// -----------------------------------------
// Stable, typed story data
// -----------------------------------------

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

// -----------------------------------------
// Storybook metadata
// -----------------------------------------

const meta = {
  title: "Composites/Table",
  component: Table,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A semantic, presentational table family containing nine native HTML components. Supports captions, column and row headers, body rows, footers, cell spans, native refs, and optional horizontal overflow. Consumers own data, actions, empty states, calculations, and accessibility relationships. Table does not implement sorting, filtering, pagination, selection, or data fetching.",
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
        "Additional classes for the native table element.",
    },

    children: {
      control: false,
      description:
        "Native table sections, captions, and rows.",
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

// -----------------------------------------
// 1. Basic Table
// -----------------------------------------

export const BasicTable: Story = {
  render: (args) => (
    <TableContainer className="max-w-xl">
      <Table {...args}>
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
              <TableHead scope="row">
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
          "Basic native table composition. TableHeader provides column headings, TableBody contains typed records, and scope=row identifies each project. Explore table-level className through controls.",
      },
    },
  },
};

// -----------------------------------------
// 2. Table With Caption
// -----------------------------------------

export const TableWithCaption: Story = {
  render: () => (
    <TableContainer className="max-w-xl">
      <Table>
        <TableCaption>
          Project records and their current task counts
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
              <TableHead scope="row">
                {project.name}
              </TableHead>

              <TableCell>
                {project.status}
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
    controls: { disable: true },
    docs: {
      description: {
        story:
          "TableCaption provides a native description identifying the table. It remains associated with the table in the accessibility tree, and its placement is controlled by the existing caption-top style.",
      },
    },
  },
};

// -----------------------------------------
// 3. Row Headers
// -----------------------------------------

export const RowHeaders: Story = {
  render: () => (
    <TableContainer className="max-w-xl">
      <Table>
        <TableCaption>
          Completion progress by project
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead scope="col">
              Project
            </TableHead>

            <TableHead
              scope="col"
              className="text-right"
            >
              Total tasks
            </TableHead>

            <TableHead
              scope="col"
              className="text-right"
            >
              Completed
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableHead scope="row">
                {project.name}
              </TableHead>

              <TableCell className="text-right tabular-nums">
                {project.tasks}
              </TableCell>

              <TableCell className="text-right tabular-nums">
                {project.completed}
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
          "Distinguishes column headers (scope=col) from row headers (scope=row). TableHead defaults to column scope, so the consumer explicitly sets row scope for project names.",
      },
    },
  },
};

// -----------------------------------------
// 4. Status Badges
// -----------------------------------------

export const StatusBadges: Story = {
  render: () => (
    <TableContainer className="max-w-xl">
      <Table>
        <TableCaption>
          Project names and current statuses
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
              <TableHead scope="row">
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
          "Composes the existing Badge primitive inside native data cells. Status meaning is conveyed by visible text as well as color. Table itself does not depend on Badge.",
      },
    },
  },
};

// -----------------------------------------
// 5. Row Actions
// -----------------------------------------

function RowActionsExample() {
  const [message, setMessage] = useState(
    "No project selected.",
  );

  return (
    <div className="w-full max-w-xl space-y-4">
      <TableContainer>
        <Table>
          <TableCaption>
            Project records with example actions
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
                <TableHead scope="row">
                  {project.name}
                </TableHead>

                <TableCell>
                  {project.status}
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    aria-label={`View ${project.name}`}
                    onClick={() => {
                      setMessage(
                        `Selected project: ${project.name}`,
                      );
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        {message}
      </p>
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
          "Places native Button actions inside cells. Each repeated View button receives a unique accessible name identifying its project. Clicking updates a local status message without navigation or modifying the Table implementation.",
      },
    },
  },
};

// -----------------------------------------
// 6. Footer Totals
// -----------------------------------------

export const FooterTotals: Story = {
  render: () => (
    <TableContainer className="max-w-xl">
      <Table>
        <TableCaption>
          Project task totals
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
          </TableRow>
        </TableHeader>

        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableHead scope="row">
                {project.name}
              </TableHead>

              <TableCell className="text-right tabular-nums">
                {project.tasks}
              </TableCell>

              <TableCell className="text-right tabular-nums">
                {project.completed}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableHead scope="row">
              Total
            </TableHead>

            <TableCell className="text-right tabular-nums">
              {totalTasks}
            </TableCell>

            <TableCell className="text-right tabular-nums">
              {totalCompleted}
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
          "Demonstrates native tfoot semantics. Totals are calculated from the stable typed story data, not by the Table component. The summary row uses a row heading and aligned numeric cells.",
      },
    },
  },
};

// -----------------------------------------
// 7. Empty Data
// -----------------------------------------

function EmptyDataExample() {
  const [showRecords, setShowRecords] = useState(false);

  return (
    <section className="w-full max-w-xl space-y-4">
      <h2 className="text-lg font-semibold text-foreground">
        Project records
      </h2>

      <Button
        variant="outline"
        onClick={() => {
          setShowRecords((current) => !current);
        }}
      >
        {showRecords
          ? "Show empty table"
          : "Restore project records"}
      </Button>

      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        {showRecords
          ? `${projects.length} records displayed.`
          : "No project records available."}
      </p>

      <TableContainer>
        <Table>
          <TableCaption>
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
                  <TableHead scope="row">
                    {project.name}
                  </TableHead>

                  <TableCell>
                    {project.status}
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
                  <EmptyState className="py-8">
                    <EmptyStateTitle>
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
    </section>
  );
}

export const EmptyData: Story = {
  render: () => <EmptyDataExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates valid EmptyState composition inside a native table cell spanning all three columns. The consumer handles the empty/filled state. The persistent toggle retains keyboard focus as table content changes.",
      },
    },
  },
};

// -----------------------------------------
// 8. Horizontal Overflow
// -----------------------------------------

export const HorizontalOverflow: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-3">
      <p className="text-sm text-muted-foreground">
        Focus the table region, then use the
        horizontal scrollbar or arrow keys to
        explore the wide table.
      </p>

      <TableContainer
        role="region"
        aria-label="Scrollable project report"
        tabIndex={0}
        className={[
          "focus-visible:outline-2",
          "focus-visible:outline-offset-2",
          "focus-visible:outline-ring",
        ].join(" ")}
      >
        <Table className="min-w-[780px]">
          <TableCaption>
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
                <TableHead scope="row" className="whitespace-nowrap">
                  {project.name}
                </TableHead>

                <TableCell>
                  {project.status}
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
                  ${project.budget.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Uses a narrow TableContainer and a wider Table to demonstrate horizontal scrolling. This deliberately scrollable region has an accessible label, keyboard focus stop, and visible focus outline. TableContainer does not supply those accessibility attributes automatically.",
      },
    },
  },
};

// -----------------------------------------
// 9. Numeric Alignment
// -----------------------------------------

export const NumericAlignment: Story = {
  render: () => (
    <TableContainer className="max-w-xl">
      <Table>
        <TableCaption>
          Project task counts and budgets
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
              <TableHead scope="row">
                {project.name}
              </TableHead>

              <TableCell className="text-right tabular-nums">
                {project.tasks}
              </TableCell>

              <TableCell className="text-right tabular-nums">
                {project.completed}
              </TableCell>

              <TableCell className="text-right tabular-nums">
                ${project.budget.toLocaleString("en-US")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableHead scope="row">
              Total
            </TableHead>

            <TableCell className="text-right tabular-nums">
              {totalTasks}
            </TableCell>

            <TableCell className="text-right tabular-nums">
              {totalCompleted}
            </TableCell>

            <TableCell className="text-right tabular-nums">
              ${totalBudget.toLocaleString("en-US")}
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
          "Demonstrates right-aligned numeric columns and tabular numerals for easier visual comparison. Column headings and values share alignment. The data and number formatting are consumer responsibilities.",
      },
    },
  },
};

// -----------------------------------------
// 10. Table Inside Card
// -----------------------------------------

export const TableInsideCard: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <h2 className="sr-only">
        Project summary card
      </h2>

      <Card>
        <CardHeader>
          <CardTitle>
            Project overview
          </CardTitle>

          <CardDescription>
            Current project statuses and task counts.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <TableContainer>
            <Table>
              <TableCaption className="sr-only">
                Project summary records
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
                    <TableHead scope="row">
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
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates Table inside the existing Card family. The Card provides surrounding context; the native table retains its own semantic structure and visually hidden caption. Neither component family requires integration-specific props.",
      },
    },
  },
};

// -----------------------------------------
// 11. Custom Styling
// -----------------------------------------

export const CustomStyling: Story = {
  render: () => (
    <TableContainer className="max-w-xl rounded-none border-primary/30">
      <Table>
        <TableCaption>
          Compact project summary
        </TableCaption>

        <TableHeader className="bg-secondary/50">
          <TableRow>
            <TableHead className="py-2 text-xs font-semibold uppercase tracking-wide">
              Project
            </TableHead>

            <TableHead className="py-2 text-xs font-semibold uppercase tracking-wide">
              Status
            </TableHead>

            <TableHead className="py-2 text-right text-xs font-semibold uppercase tracking-wide">
              Tasks
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              className="hover:bg-muted/30"
            >
              <TableHead scope="row" className="py-2">
                {project.name}
              </TableHead>

              <TableCell className="py-2">
                {project.status}
              </TableCell>

              <TableCell className="py-2 text-right tabular-nums">
                {project.tasks}
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
          "Demonstrates className customization of TableContainer, TableHeader, TableHead, TableRow, and TableCell. Styling uses existing semantic tokens. Hover styling remains purely visual and does not make rows interactive.",
      },
    },
  },
};
