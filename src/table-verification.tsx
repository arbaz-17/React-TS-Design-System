
import { useRef, useState } from "react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  EmptyState,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
  Table,
  TableContainer,
  TableCaption,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "./components";

type Project = {
  id: number;
  name: string;
  status: "Active" | "Review" | "Planned";
  tasks: number;
};

const projects: Project[] = [
  {
    id: 1,
    name: "Design System",
    status: "Active",
    tasks: 24,
  },
  {
    id: 2,
    name: "Admin Dashboard",
    status: "Review",
    tasks: 18,
  },
  {
    id: 3,
    name: "Client Portal",
    status: "Planned",
    tasks: 9,
  },
];

const totalTasks = projects.reduce(
  (total, project) => total + project.tasks,
  0,
);

export function TableVerification() {
  const [showRows, setShowRows] = useState(true);

  const [actionMessage, setActionMessage] =
    useState("No action triggered.");

  const [refResult, setRefResult] =
    useState("Not tested");

  // Native DOM refs
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const captionRef =
    useRef<HTMLTableCaptionElement>(null);

  const headerRef =
    useRef<HTMLTableSectionElement>(null);

  const bodyRef =
    useRef<HTMLTableSectionElement>(null);

  const footerRef =
    useRef<HTMLTableSectionElement>(null);

  const rowRef =
    useRef<HTMLTableRowElement>(null);

  const headRef =
    useRef<HTMLTableCellElement>(null);

  const cellRef =
    useRef<HTMLTableCellElement>(null);

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold">
          Table Verification
        </h2>

        <p className="text-sm text-muted-foreground">
          Testing semantic structure, responsive
          overflow, empty rows, actions and refs.
        </p>
      </header>

      {/* 1. Complete table */}
      <div className="space-y-4">
        <h3 className="font-semibold">
          Complete Table
        </h3>

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setShowRows((current) => !current);
          }}
        >
          {showRows
            ? "Show Empty Table"
            : "Show Project Rows"}
        </Button>

        <TableContainer
          ref={containerRef}
          role="region"
          aria-label="Scrollable project records"
          tabIndex={0}
          className={[
            "max-w-xl",
            "focus-visible:outline-2",
            "focus-visible:outline-offset-2",
            "focus-visible:outline-ring",
          ].join(" ")}
        >
          <Table
            ref={tableRef}
            className="min-w-[720px]"
          >
            <TableCaption ref={captionRef}>
              Project records and task counts
            </TableCaption>

            <TableHeader ref={headerRef}>
              <TableRow ref={rowRef}>
                <TableHead
                  ref={headRef}
                  scope="col"
                >
                  Project
                </TableHead>

                <TableHead scope="col">
                  Status
                </TableHead>

                <TableHead
                  scope="col"
                  className="text-right"
                >
                  Tasks
                </TableHead>

                <TableHead
                  scope="col"
                  className="text-right"
                >
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody ref={bodyRef}>
              {showRows ? (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableHead scope="row">
                      {project.name}
                    </TableHead>

                    <TableCell>
                      <Badge
                        variant={
                          project.status === "Active"
                            ? "success"
                            : project.status === "Review"
                              ? "warning"
                              : "neutral"
                        }
                      >
                        {project.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right tabular-nums">
                      {project.tasks}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setActionMessage(
                            `View action: ${project.name}`,
                          );
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="p-0"
                  >
                    <EmptyState className="py-8">
                      <EmptyStateTitle>
                        No projects found
                      </EmptyStateTitle>

                      <EmptyStateDescription>
                        This demonstrates the
                        empty-row composition.
                      </EmptyStateDescription>

                      <EmptyStateActions>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setShowRows(true);
                          }}
                        >
                          Restore Project Rows
                        </Button>
                      </EmptyStateActions>
                    </EmptyState>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            {showRows && (
              <TableFooter ref={footerRef}>
                <TableRow>
                  <TableHead
                    scope="row"
                    colSpan={2}
                  >
                    Total tasks
                  </TableHead>

                  <TableCell
                    ref={cellRef}
                    className="text-right tabular-nums"
                  >
                    {totalTasks}
                  </TableCell>

                  <TableCell>
                    <span className="sr-only">
                      No additional action
                    </span>
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </TableContainer>

        <p className="text-xs text-muted-foreground">
          The example deliberately uses a wide table
          to verify horizontal scrolling.
        </p>
      </div>

      {/* 2. Table without the optional wrapper */}
      <Card>
        <CardContent>
          <Table>
            <TableCaption>
              Team member availability
            </TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead scope="col">
                  Member
                </TableHead>

                <TableHead scope="col">
                  Availability
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableHead scope="row">
                  Alex
                </TableHead>

                <TableCell>
                  Available
                </TableCell>
              </TableRow>

              <TableRow>
                <TableHead scope="row">
                  Sam
                </TableHead>

                <TableCell>
                  Busy
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 3. Consumer-owned action feedback */}
      <div className="space-y-2">
        <h3 className="font-semibold">
          Action Verification
        </h3>

        <p
          role="status"
          className="text-sm text-muted-foreground"
        >
          {actionMessage}
        </p>
      </div>

      {/* 4. Native ref verification */}
      <div className="space-y-3 border-t border-border pt-5">
        <h3 className="font-semibold">
          Native Ref Verification
        </h3>

        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            const valid =
              containerRef.current?.tagName === "DIV" &&
              tableRef.current?.tagName === "TABLE" &&
              captionRef.current?.tagName === "CAPTION" &&
              headerRef.current?.tagName === "THEAD" &&
              bodyRef.current?.tagName === "TBODY" &&
              footerRef.current?.tagName === "TFOOT" &&
              rowRef.current?.tagName === "TR" &&
              headRef.current?.tagName === "TH" &&
              cellRef.current?.tagName === "TD" &&
              headRef.current?.getAttribute("scope") === "col";

            setRefResult(
              valid
                ? "Passed: all nine DOM refs and header scope"
                : "Failed: unexpected DOM structure or a conditional section is hidden",
            );
          }}
        >
          Verify Table Refs
        </Button>

        <p
          role="status"
          className="text-sm text-muted-foreground"
        >
          {refResult}
        </p>

        <p className="text-xs text-muted-foreground">
          Restore the project rows before verifying
          refs so the footer and data cells exist.
        </p>
      </div>
    </section>
  );
}
