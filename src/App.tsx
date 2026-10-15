import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useTheme } from "./theme/use-theme";
import {
  ArrowRight,
  Check,
  CircleHelp,
  Download,
  Inbox,
  Layers3,
  LayoutGrid,
  Menu,
  Moon,
  Plus,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import {
  // Primitives
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Switch,
  Badge,
  Skeleton,
  // Composites
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Alert,
  AlertTitle,
  AlertDescription,
  FormField,
  FormLabel,
  FormDescription,
  FormMessage,
  EmptyState,
  EmptyStateVisual,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
  TableContainer,
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  // Interactive
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./components";
/* =========================================================
   TYPES AND SHARED DATA
   ========================================================= */
type Project = {
  id: number;
  name: string;
  status: "Active" | "Review" | "Planned";
  tasks: number;
};
const initialProjects: Project[] = [
  {
    id: 1,
    name: "Core Primitives",
    status: "Active",
    tasks: 8,
  },
  {
    id: 2,
    name: "Shared Composites",
    status: "Review",
    tasks: 5,
  },
  {
    id: 3,
    name: "Interactive Components",
    status: "Planned",
    tasks: 4,
  },
];
const navigation = [
  {
    title: "Primitives",
    items: [
      "Button",
      "Input",
      "Textarea",
      "Select",
      "Checkbox",
      "Switch",
      "Badge",
      "Skeleton",
    ],
  },
  {
    title: "Composites",
    items: ["Card", "Alert", "FormField", "EmptyState", "Table"],
  },
  {
    title: "Interactive",
    items: ["Dialog", "Tabs", "Accordion", "Tooltip"],
  },
];
function toId(value: string) {
  return value.toLowerCase();
}
/* =========================================================
   SMALL INTERNAL SHOWCASE HELPERS
   ========================================================= */
function SectionHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-surface border border-border bg-card text-sm font-semibold text-primary">
        {number}
      </div>
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
function ShowcaseCard({
  title,
  description,
  children,
  wide = false,
}: {
  title: string;
  description: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <Card
      id={toId(title)}
      className={["min-w-0 scroll-mt-28", wide ? "xl:col-span-2" : ""].join(
        " ",
      )}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="min-w-0">{children}</CardContent>
    </Card>
  );
}
/* =========================================================
   THEME SWITCHER
   ========================================================= */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <Sun aria-hidden="true" className="size-4" />
      ) : (
        <Moon aria-hidden="true" className="size-4" />
      )}
      <span>{isDark ? "Light" : "Dark"}</span>
    </Button>
  );
}
/* =========================================================
   PHASE 4 — PRIMITIVE DEMONSTRATIONS
   ========================================================= */
function ButtonDemo() {
  const [message, setMessage] = useState("Click any enabled button.");
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          onClick={() => setMessage("Primary button activated.")}
        >
          Primary
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setMessage("Secondary button activated.")}
        >
          Secondary
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setMessage("Outline button activated.")}
        >
          Outline
        </Button>
        <Button type="button" disabled>
          Disabled
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setMessage("Small button activated.")}
        >
          Small button
        </Button>
        <Button
          type="button"
          aria-label="Create item"
          onClick={() => setMessage("Icon button activated.")}
        >
          <Plus aria-hidden="true" className="size-4" />
        </Button>
      </div>
      <p role="status" className="text-xs text-muted-foreground">
        {message}
      </p>
    </div>
  );
}
function InputDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="space-y-3">
      <label htmlFor="showcase-input" className="block text-sm font-medium">
        Search components
      </label>
      <Input
        id="showcase-input"
        placeholder="Search the design system..."
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <p role="status" className="text-xs text-muted-foreground">
        {value
          ? `Current value: ${value}`
          : "Start typing to see controlled input state."}
      </p>
      <Input
        type="email"
        aria-label="Example email address"
        placeholder="name@example.com"
      />
    </div>
  );
}
function TextareaDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="space-y-3">
      <label htmlFor="showcase-textarea" className="block text-sm font-medium">
        Project description
      </label>
      <Textarea
        id="showcase-textarea"
        rows={4}
        placeholder="Describe your project..."
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <p className="text-right text-xs text-muted-foreground">
        {value.length} characters
      </p>
    </div>
  );
}
function SelectDemo() {
  const [role, setRole] = useState("developer");
  return (
    <div className="space-y-3">
      <label htmlFor="showcase-select" className="block text-sm font-medium">
        Team role
      </label>
      <Select
        id="showcase-select"
        value={role}
        onChange={(event) => setRole(event.currentTarget.value)}
      >
        <option value="developer">Developer</option>
        <option value="designer">Designer</option>
        <option value="manager">Manager</option>
        <option value="reviewer">Reviewer</option>
      </Select>
      <p role="status" className="text-xs text-muted-foreground">
        Selected: {role}
      </p>
    </div>
  );
}
function CheckboxDemo() {
  return (
    <div className="space-y-4">
      <label
        htmlFor="showcase-checkbox-one"
        className="flex cursor-pointer items-start gap-3"
      >
        <Checkbox id="showcase-checkbox-one" defaultChecked />
        <span>
          <span className="block text-sm font-medium">
            Enable notifications
          </span>
          <span className="block text-xs text-muted-foreground">
            Receive important project updates.
          </span>
        </span>
      </label>
      <label
        htmlFor="showcase-checkbox-two"
        className="flex cursor-pointer items-start gap-3"
      >
        <Checkbox id="showcase-checkbox-two" />
        <span>
          <span className="block text-sm font-medium">Weekly summary</span>
          <span className="block text-xs text-muted-foreground">
            Receive a weekly activity digest.
          </span>
        </span>
      </label>
    </div>
  );
}
function SwitchDemo() {
  return (
    <div className="space-y-4">
      <label
        htmlFor="showcase-switch-one"
        className="flex cursor-pointer items-center justify-between gap-4"
      >
        <span>
          <span className="block text-sm font-medium">Feature previews</span>
          <span className="block text-xs text-muted-foreground">
            Access experimental features.
          </span>
        </span>
        <Switch id="showcase-switch-one" defaultChecked />
      </label>
      <label
        htmlFor="showcase-switch-two"
        className="flex cursor-pointer items-center justify-between gap-4"
      >
        <span>
          <span className="block text-sm font-medium">Daily digest</span>
          <span className="block text-xs text-muted-foreground">
            Summarize your daily activity.
          </span>
        </span>
        <Switch id="showcase-switch-two" />
      </label>
    </div>
  );
}
function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Default</Badge>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">In Review</Badge>
    </div>
  );
}
function SkeletonDemo() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium">Profile preview</span>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setLoading((current) => !current)}
        >
          {loading ? "Show content" : "Show loading"}
        </Button>
      </div>
      {loading ? (
        <div
          role="status"
          aria-label="Loading profile"
          className="flex items-center gap-4"
        >
          <Skeleton className="size-12 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
            DS
          </div>
          <div>
            <p className="text-sm font-semibold">Design System</p>
            <p className="text-xs text-muted-foreground">
              Your components are ready.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
/* =========================================================
   PHASE 5 — COMPOSITE DEMONSTRATIONS
   ========================================================= */
function CardDemo() {
  return (
    <Card className="bg-muted/20 shadow-none">
      <CardHeader>
        <CardTitle>Workspace Overview</CardTitle>
        <CardDescription>Summary of the current workspace.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="success">Healthy</Badge>
          <span className="text-sm text-muted-foreground">
            All components are available.
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <span className="text-xs text-muted-foreground">
          Composable content and footer.
        </span>
      </CardFooter>
    </Card>
  );
}
function AlertDemo() {
  return (
    <div className="space-y-3">
      <Alert variant="default">
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Components share a consistent visual system.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Operation successful</AlertTitle>
        <AlertDescription>Your changes have been saved.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Attention required</AlertTitle>
        <AlertDescription>
          Review these settings before continuing.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Validation failed</AlertTitle>
        <AlertDescription>
          Please correct the highlighted fields.
        </AlertDescription>
      </Alert>
    </div>
  );
}
function FormFieldDemo() {
  const emailId = useId();
  const descriptionId = useId();
  const errorId = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = email.trim();
    if (!normalized) {
      setError("Email address is required.");
      setResult("");
      return;
    }
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
    if (!valid) {
      setError("Enter a valid email address.");
      setResult("");
      return;
    }
    setError("");
    setResult(`Validated: ${normalized}`);
  }
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <FormField>
        <FormLabel htmlFor={emailId} requiredIndicator>
          Email address
        </FormLabel>
        <Input
          id={emailId}
          type="email"
          value={email}
          placeholder="you@example.com"
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${descriptionId} ${errorId}` : descriptionId
          }
          onChange={(event) => {
            setEmail(event.currentTarget.value);
            setError("");
          }}
        />
        <FormDescription id={descriptionId}>
          This is a local validation example.
        </FormDescription>
        {error && <FormMessage id={errorId}>{error}</FormMessage>}
      </FormField>
      <Button type="submit" size="sm">
        Validate email
      </Button>
      <p role="status" className="text-xs text-muted-foreground">
        {result}
      </p>
    </form>
  );
}
function EmptyStateDemo() {
  const [created, setCreated] = useState(false);
  if (created) {
    return (
      <div className="space-y-4 rounded-surface border border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Check aria-hidden="true" className="size-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">Project created</p>
            <p className="text-xs text-muted-foreground">
              Your first sample project is ready.
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setCreated(false)}
        >
          Reset example
        </Button>
      </div>
    );
  }
  return (
    <EmptyState className="rounded-surface border border-dashed border-border bg-muted/20 py-8">
      <EmptyStateVisual className="rounded-full bg-muted p-4">
        <Inbox aria-hidden="true" className="size-8" />
      </EmptyStateVisual>
      <EmptyStateTitle>No projects yet</EmptyStateTitle>
      <EmptyStateDescription>
        Create your first project to start organizing your work.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button type="button" onClick={() => setCreated(true)}>
          <Plus aria-hidden="true" className="size-4" />
          Create project
        </Button>
      </EmptyStateActions>
    </EmptyState>
  );
}
function TableDemo() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const totalTasks = projects.reduce(
    (total, project) => total + project.tasks,
    0,
  );
  function removeProject(id: number) {
    setProjects((current) => current.filter((project) => project.id !== id));
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {projects.length} project records
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setProjects([])}
          >
            Clear all
          </Button>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => setProjects([...initialProjects])}
          >
            Restore
          </Button>
        </div>
      </div>
      <TableContainer>
        <Table className="min-w-[620px]">
          <TableCaption>Sample workstreams and task counts</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Project</TableHead>
              <TableHead scope="col">Status</TableHead>
              <TableHead scope="col" className="text-right">
                Tasks
              </TableHead>
              <TableHead scope="col" className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableHead scope="row">{project.name}</TableHead>
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
                      aria-label={`Remove ${project.name}`}
                      onClick={() => removeProject(project.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="p-0">
                  <EmptyState className="py-8">
                    <EmptyStateTitle>No projects found</EmptyStateTitle>
                    <EmptyStateDescription>
                      Restore the sample records to populate the table.
                    </EmptyStateDescription>
                    <EmptyStateActions>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setProjects([...initialProjects])}
                      >
                        Restore records
                      </Button>
                    </EmptyStateActions>
                  </EmptyState>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {projects.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableHead scope="row" colSpan={2}>
                  Total tasks
                </TableHead>
                <TableCell className="text-right tabular-nums">
                  {totalTasks}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}
/* =========================================================
   PHASE 6 — INTERACTIVE DEMONSTRATIONS
   ========================================================= */
function DialogDemo() {
  const nameId = useId();
  const errorId = useId();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [createdProject, setCreatedProject] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = name.trim();
    if (normalized.length < 2) {
      setError("Project name must contain at least two characters.");
      return;
    }
    setCreatedProject(normalized);
    setName("");
    setError("");
    setOpen(false);
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button">
              <Plus aria-hidden="true" className="size-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Project</DialogTitle>
              <DialogDescription>
                Create a sample project using the Dialog and FormField
                components.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
              <FormField>
                <FormLabel htmlFor={nameId} requiredIndicator>
                  Project name
                </FormLabel>
                <Input
                  id={nameId}
                  value={name}
                  placeholder="My new project"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : undefined}
                  onChange={(event) => {
                    setName(event.currentTarget.value);
                    setError("");
                  }}
                />
                {error && <FormMessage id={errorId}>{error}</FormMessage>}
              </FormField>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Create Project</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="outline">
              About Dialog
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Accessible Modal Dialog</DialogTitle>
              <DialogDescription>
                Radix handles modal focus and keyboard interactions.
              </DialogDescription>
            </DialogHeader>
            <p className="py-4 text-sm text-muted-foreground">
              Press Escape to close, or use the Close button below.
            </p>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <p role="status" className="text-xs text-muted-foreground">
        {createdProject
          ? `Created project: ${createdProject}`
          : "No sample project created yet."}
      </p>
    </div>
  );
}
function CounterPanel() {
  const [count, setCount] = useState(0);
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Panel counter: {count}</p>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setCount((current) => current + 1)}
      >
        Increment
      </Button>
    </div>
  );
}
function TabsDemo() {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList aria-label="Project sections">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p className="text-sm text-muted-foreground">
            Our custom Tabs component supports accessible selection, keyboard
            navigation and multiple panels.
          </p>
        </TabsContent>
        <TabsContent value="activity">
          <CounterPanel />
        </TabsContent>
        <TabsContent value="settings">
          <p className="text-sm text-muted-foreground">
            Switch between panels without losing their local component state.
          </p>
        </TabsContent>
        <TabsContent value="reports">
          <p className="text-sm text-muted-foreground">
            This tab is currently disabled.
          </p>
        </TabsContent>
      </Tabs>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => setActiveTab("activity")}
      >
        Select Activity Programmatically
      </Button>
      <p className="text-xs text-muted-foreground">Selected tab: {activeTab}</p>
    </div>
  );
}
function AccordionDemo() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Single-open Accordion</h3>
        <Accordion type="single">
          <AccordionItem defaultOpen>
            <AccordionTrigger>What is a design system?</AccordionTrigger>
            <AccordionContent>
              A collection of reusable UI foundations, components, patterns and
              documentation.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>Why use reusable components?</AccordionTrigger>
            <AccordionContent>
              They help maintain consistency, improve accessibility and reduce
              duplicated development work.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>Which tools are used?</AccordionTrigger>
            <AccordionContent>
              React, TypeScript, Tailwind CSS and Radix Primitives where
              appropriate.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Multiple-open Accordion</h3>
        <Accordion type="multiple">
          <AccordionItem>
            <AccordionTrigger>Accessibility</AccordionTrigger>
            <AccordionContent>
              Native semantics, keyboard interaction and focus visibility.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>Component composition</AccordionTrigger>
            <AccordionContent>
              Flexible children and reusable component APIs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
function TooltipDemo() {
  const [message, setMessage] = useState("Hover or focus a trigger.");
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => setMessage("Text button activated.")}
            >
              Hover or Focus
            </Button>
          </TooltipTrigger>
          <TooltipContent>A short supplementary explanation.</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="secondary"
              aria-label="Download reference"
              onClick={() => setMessage("Download action triggered.")}
            >
              <Download aria-hidden="true" className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Download the component reference.
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              aria-label="Show design system help"
              onClick={() => setMessage("Help action triggered.")}
            >
              <CircleHelp aria-hidden="true" className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            Learn more about this design system.
          </TooltipContent>
        </Tooltip>
      </div>
      <p className="text-xs text-muted-foreground">
        Hover over a trigger or focus it using your keyboard. Press Escape to
        dismiss.
      </p>
      <p role="status" className="text-xs text-muted-foreground">
        {message}
      </p>
    </div>
  );
}
/* =========================================================
   APP SHELL
   ========================================================= */
type SidebarNavigationProps = {
  activeId: string;
  onNavigate?: () => void;
};

/**
 * Shared sidebar contents for desktop and the native mobile dialog.
 * Navigation state is presentation-only; the gallery demos stay independent.
 */
function SidebarNavigation({ activeId, onNavigate }: SidebarNavigationProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <a
        href="#top"
        onClick={onNavigate}
        className="flex shrink-0 items-center gap-3 rounded-control px-2 py-1 outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-surface bg-primary text-primary-foreground">
          <Layers3 aria-hidden="true" className="size-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-bold tracking-tight">
            Component Lab
          </span>
          <span className="block text-xs text-muted-foreground">
            React Design System
          </span>
        </span>
      </a>

      <nav
        aria-label="Component navigation"
        className="mt-8 min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]"
      >
        {navigation.map((group) => (
          <div key={group.title}>
            <h2 className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {group.title}
            </h2>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const id = toId(item);
                const active = activeId === id;
                return (
                  <a
                    key={item}
                    href={`#${id}`}
                    onClick={onNavigate}
                    aria-current={active ? "location" : undefined}
                    className={[
                      "flex min-h-9 items-center rounded-control px-3 py-2 text-sm transition-colors",
                      "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring",
                      active
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    ].join(" ")}
                  >
                    {item}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-5 shrink-0 rounded-surface border border-border bg-background/80 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles aria-hidden="true" className="size-4 text-primary" />
          Built for reusability
        </div>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          Semantic tokens, typed APIs and accessible component patterns.
        </p>
      </div>
    </div>
  );
}

function Sidebar({ activeId }: { activeId: string }) {
  return (
    <aside className="sticky top-0 hidden h-svh min-h-0 flex-col border-r border-border bg-card/55 px-4 py-6 lg:flex">
      <SidebarNavigation activeId={activeId} />
    </aside>
  );
}

function HeroSection() {
  const stats = [
    {
      value: "17",
      label: "Component Families",
      icon: LayoutGrid,
    },
    {
      value: "55",
      label: "React Components",
      icon: Layers3,
    },
    {
      value: "3",
      label: "Engineering Approaches",
      icon: Sparkles,
    },
  ];
  return (
    <section className="space-y-6">
      <div className="rounded-surface border border-border bg-gradient-to-br from-primary/10 via-card to-card p-6 sm:p-8 xl:p-10">
        <div className="max-w-3xl space-y-4">
          <Badge variant="success">Components Implemented</Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            One System.
            <span className="text-primary"> 55 Components.</span>
          </h1>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            A reusable React 19 + TypeScript + Tailwind CSS v4 design system
            with accessible primitives, composable components and advanced
            interaction patterns.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#primitives"
              className="inline-flex min-h-10 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Explore Components
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <a
              href="#interactive"
              className="inline-flex min-h-10 items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-ring"
            >
              Interactive Examples
            </a>
          </div>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4">
              <div className="rounded-surface bg-primary/10 p-3 text-primary">
                <stat.icon aria-hidden="true" className="size-5" />
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <nav
        aria-label="Showcase sections"
        className="flex gap-2 overflow-x-auto pb-1 lg:hidden"
      >
        <a
          href="#primitives"
          className="shrink-0 rounded-full border border-border px-4 py-2 text-sm"
        >
          Primitives
        </a>
        <a
          href="#composites"
          className="shrink-0 rounded-full border border-border px-4 py-2 text-sm"
        >
          Composites
        </a>
        <a
          href="#interactive"
          className="shrink-0 rounded-full border border-border px-4 py-2 text-sm"
        >
          Interactive
        </a>
      </nav>
    </section>
  );
}
/* =========================================================
   MAIN APP
   ========================================================= */
export default function App() {
  const mobileDialogRef = useRef<HTMLDialogElement>(null);
  const [activeId, setActiveId] = useState("button");

  // Highlight the demo currently nearest the top of the scroll viewport.
  useEffect(() => {
    let frame = 0;
    const updateActive = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const ids = navigation.flatMap((group) => group.items.map(toId));
        let current = ids[0];
        for (const id of ids) {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= 180) {
            current = id;
          }
        }
        setActiveId(current);
      });
    };
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      cancelAnimationFrame(frame);
    };
  }, []);

  // If the viewport becomes desktop-sized, release the mobile modal/top layer.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeMobileNav = () => {
      if (desktop.matches && mobileDialogRef.current?.open) {
        mobileDialogRef.current.close();
      }
    };
    desktop.addEventListener("change", closeMobileNav);
    return () => desktop.removeEventListener("change", closeMobileNav);
  }, []);

  return (
    <div className="min-h-svh w-full bg-background text-foreground lg:grid lg:grid-cols-[252px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)]">
      <Sidebar activeId={activeId} />

      {/* Native modal dialog provides focus containment, Escape, and restoration on mobile. */}
      <dialog
        ref={mobileDialogRef}
        aria-label="Component navigation"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            event.currentTarget.close();
          }
        }}
        className="fixed inset-y-0 left-0 z-50 m-0 h-dvh max-h-dvh w-80 max-w-[88vw] border-0 bg-card p-0 text-foreground shadow-overlay backdrop:bg-black/60 open:flex open:flex-col lg:hidden"
      >
        <div className="relative flex h-full min-h-0 w-full flex-col px-4 py-6">
          <button
            type="button"
            aria-label="Close component navigation"
            onClick={() => mobileDialogRef.current?.close()}
            className="absolute right-4 top-6 z-10 inline-flex size-9 items-center justify-center rounded-control border border-border bg-card text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
          <SidebarNavigation
            activeId={activeId}
            onNavigate={() => mobileDialogRef.current?.close()}
          />
        </div>
      </dialog>

      <main id="top" className="min-w-0">
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
          <div className="flex min-h-16 items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8 2xl:px-12">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                aria-label="Open component navigation"
                onClick={() => mobileDialogRef.current?.showModal()}
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-control border border-border bg-card text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring lg:hidden"
              >
                <Menu aria-hidden="true" className="size-5" />
              </button>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-primary sm:text-xs">
                  Frontend Engineering / Month 3
                </p>
                <p className="truncate text-sm font-semibold tracking-tight sm:text-base">
                  React + TypeScript Design System
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="w-full min-w-0 space-y-12 px-4 pb-10 pt-7 sm:px-6 sm:pt-9 lg:px-8 2xl:px-12">
          <HeroSection />
          {/* =====================================
                PRIMITIVES
               ===================================== */}
          <section id="primitives" className="scroll-mt-24">
            <SectionHeading
              number="01"
              title="Core Primitives"
              description="Small, typed and accessible building blocks used throughout the design system."
            />
            <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 2xl:gap-6">
              <ShowcaseCard
                title="Button"
                description="Variants, sizes and interactive actions."
              >
                <ButtonDemo />
              </ShowcaseCard>
              <ShowcaseCard
                title="Input"
                description="Native text inputs with controlled state."
              >
                <InputDemo />
              </ShowcaseCard>
              <ShowcaseCard
                title="Textarea"
                description="Multiline input and live feedback."
              >
                <TextareaDemo />
              </ShowcaseCard>
              <ShowcaseCard
                title="Select"
                description="Accessible native select element."
              >
                <SelectDemo />
              </ShowcaseCard>
              <ShowcaseCard
                title="Checkbox"
                description="Independent selectable options."
              >
                <CheckboxDemo />
              </ShowcaseCard>
              <ShowcaseCard
                title="Switch"
                description="Binary controls with switch semantics."
              >
                <SwitchDemo />
              </ShowcaseCard>
              <ShowcaseCard
                title="Badge"
                description="Compact status indicators."
              >
                <BadgeDemo />
              </ShowcaseCard>
              <ShowcaseCard
                title="Skeleton"
                description="Loading placeholders and content transitions."
              >
                <SkeletonDemo />
              </ShowcaseCard>
            </div>
          </section>
          {/* =====================================
                COMPOSITES
               ===================================== */}
          <section id="composites" className="scroll-mt-24">
            <SectionHeading
              number="02"
              title="Shared Composites"
              description="Reusable component compositions for content, feedback, forms and structured data."
            />
            <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 2xl:gap-6">
              <ShowcaseCard
                title="Card"
                description="Composable header, content and footer."
              >
                <CardDemo />
              </ShowcaseCard>
              <ShowcaseCard
                title="Alert"
                description="Information, success, warning and destructive feedback."
              >
                <AlertDemo />
              </ShowcaseCard>
              <ShowcaseCard
                title="FormField"
                description="Accessible form structure and validation."
              >
                <FormFieldDemo />
              </ShowcaseCard>
              <ShowcaseCard
                title="EmptyState"
                description="Flexible empty-data presentation with actions."
              >
                <EmptyStateDemo />
              </ShowcaseCard>
              <ShowcaseCard
                title="Table"
                description="Semantic table with row actions, totals and empty-data integration."
                wide
              >
                <TableDemo />
              </ShowcaseCard>
            </div>
          </section>
          {/* =====================================
                INTERACTIVE
               ===================================== */}
          <section id="interactive" className="scroll-mt-24">
            <SectionHeading
              number="03"
              title="Interactive Components"
              description="Accessible interactions powered by Radix, custom React and native browser behavior."
            />
            <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 2xl:gap-6">
              <ShowcaseCard
                title="Dialog"
                description="Accessible modal interactions and form composition."
              >
                <DialogDemo />
              </ShowcaseCard>
              <ShowcaseCard
                title="Tabs"
                description="Custom keyboard navigation and persistent panels."
              >
                <TabsDemo />
              </ShowcaseCard>
              <ShowcaseCard
                title="Accordion"
                description="Native single-open and multiple-open disclosure."
              >
                <AccordionDemo />
              </ShowcaseCard>
              <ShowcaseCard
                title="Tooltip"
                description="Hover/focus explanations and accessible triggers."
              >
                <TooltipDemo />
              </ShowcaseCard>
            </div>
          </section>
          {/* =====================================
                ENGINEERING PRINCIPLES
               ===================================== */}
          <section
            aria-labelledby="principles-title"
            className="rounded-surface border border-border bg-card p-6 sm:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <Sparkles aria-hidden="true" className="size-5 text-primary" />
              <h2 id="principles-title" className="text-lg font-semibold">
                Engineering Principles
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold">Accessibility First</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Native semantics, accessible interactions, keyboard navigation
                  and focus management.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">
                  Composition Over Complexity
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Flexible APIs, reusable children and separation of
                  presentation from business logic.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Strong Foundations</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  TypeScript, semantic design tokens, thoughtful dependencies
                  and consistent component architecture.
                </p>
              </div>
            </div>
          </section>
          {/* Footer */}
          <footer className="flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>React Design System — Component Showcase</span>
            <span>Built with React, TypeScript and Tailwind CSS</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
