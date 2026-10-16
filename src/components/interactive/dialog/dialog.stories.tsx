import { useId, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  FileText,
  Maximize2,
  Pencil,
  Plus,
  Settings2,
  ShieldCheck,
} from "lucide-react";

import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  FormField,
  FormLabel,
  FormDescription,
  Input,
  Textarea,
} from "../../index";



const meta = {
  title: "Interactive/Dialog",
  component: Dialog,
  tags: ["autodocs"],

  parameters: {

    docs: {
      description: {
        component:
          "A modal-only Dialog family built on Radix UI. Supports controlled and uncontrolled state, accessible titles and descriptions, keyboard interactions, focus containment and restoration, responsive scrolling, and portal rendering. Consumers manage forms, validation, business operations, and dismissal policies.",
      },
    },
  },

  argTypes: {
    open: {
      control: false,
      description: "Controlled visibility. Use together with onOpenChange.",
    },

    defaultOpen: {
      control: false,
      description: "Initial visibility for an uncontrolled Dialog.",
    },

    onOpenChange: {
      control: false,
      description: "Callback invoked when Dialog requests a visibility change.",
    },

    children: {
      control: false,
      description: "Composable trigger, content, and supporting components.",
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Settings2 aria-hidden="true" className="size-4" />
          Open dialog
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Account settings</DialogTitle>

          <DialogDescription>
            Review your account information and available preferences.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <div className="rounded-surface border border-border bg-muted/30 p-4">
            <p className="text-sm font-medium text-foreground">
              Personal workspace
            </p>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Your account is connected to the personal workspace.
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close dialog</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "The recommended basic composition. Dialog manages uncontrolled visibility, DialogTrigger opens the modal, DialogTitle and DialogDescription provide accessible labeling, and DialogClose closes it. Trigger and Close use asChild to avoid nested buttons.",
      },
    },
  },
};



export const WithoutDescription: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileText aria-hidden="true" className="size-4" />
          Quick information
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Quick information</DialogTitle>
        </DialogHeader>

        <p className="py-4 text-sm leading-6 text-foreground">
          This dialog contains a title and body content without a separate
          accessible description.
        </p>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Demonstrates a dialog without DialogDescription. DialogTitle still supplies the accessible name, while aria-describedby={undefined} explicitly indicates that no supplementary accessible description is provided.",
      },
    },
  },
};


function FormDialogExample() {
  const formId = useId();
  const nameId = useId();
  const helpId = useId();
  const notesId = useId();

  const [open, setOpen] = useState(false);

  const [savedProject, setSavedProject] = useState<string | null>(null);

  return (
    <div className="w-full max-w-lg space-y-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus aria-hidden="true" className="size-4" />
            Create project
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a project</DialogTitle>

            <DialogDescription>
              Add a project name and optional notes. This example saves data
              locally.
            </DialogDescription>
          </DialogHeader>

          <form
            id={formId}
            className="space-y-4 py-4"
            onSubmit={(event) => {
              event.preventDefault();

              const formData = new FormData(event.currentTarget);

              const name = String(formData.get("projectName") ?? "").trim();

              if (name.length < 3) return;

              setSavedProject(name);
              setOpen(false);
            }}
          >
            <FormField>
              <FormLabel htmlFor={nameId} requiredIndicator>
                Project name
              </FormLabel>

              <Input
                id={nameId}
                name="projectName"
                required
                minLength={3}
                placeholder="Design System"
                aria-describedby={helpId}
              />

              <FormDescription id={helpId}>
                Enter at least three characters.
              </FormDescription>
            </FormField>

            <FormField>
              <FormLabel htmlFor={notesId}>Notes</FormLabel>

              <Textarea
                id={notesId}
                name="notes"
                rows={3}
                placeholder="Optional project notes..."
              />
            </FormField>
          </form>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" form={formId}>
              Create project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <p role="status" className="text-sm text-muted-foreground">
        {savedProject
          ? `Project created: ${savedProject}`
          : "No project created yet."}
      </p>
    </div>
  );
}

export const FormDialog: Story = {
  render: () => <FormDialogExample />,

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Demonstrates controlled Dialog state, FormField composition, native form validation, and submission from a footer button using the form attribute. The consumer closes the modal after successful local processing; Dialog does not automatically submit or save data.",
      },
    },
  },
};


const checklistSections = [
  {
    title: "Component architecture",
    description:
      "Review the component structure, public API, and separation of responsibilities.",
  },
  {
    title: "TypeScript contracts",
    description:
      "Verify component props, native element support, and ref compatibility.",
  },
  {
    title: "Design tokens",
    description:
      "Confirm consistent colors, spacing, borders, typography, and surface styles.",
  },
  {
    title: "Accessibility",
    description:
      "Check semantic HTML, accessible names, descriptions, and keyboard interaction.",
  },
  {
    title: "Focus management",
    description:
      "Verify initial focus, focus containment, and restoration after dismissal.",
  },
  {
    title: "Responsive layout",
    description:
      "Test narrow viewports, browser zoom, and content that exceeds available height.",
  },
  {
    title: "Theme compatibility",
    description:
      "Review contrast, surface colors, and focus indicators in light and dark themes.",
  },
  {
    title: "Storybook coverage",
    description:
      "Confirm the stories demonstrate distinct, practical usage scenarios.",
  },
  {
    title: "Testing",
    description:
      "Run relevant unit, interaction, accessibility, and visual regression checks.",
  },
] as const;

export const LongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileText aria-hidden="true" className="size-4" />
          Review checklist
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Project review checklist</DialogTitle>

          <DialogDescription>
            Review these engineering topics before marking your project as
            complete.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {checklistSections.map((section, index) => (
            <section key={section.title} className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">
                {index + 1}. {section.title}
              </h3>

              <p className="text-sm leading-6 text-muted-foreground">
                {section.description}
              </p>
            </section>
          ))}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button>Finish review</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Tests viewport-constrained dialog height and internal scrolling. Verify that the content and footer remain reachable on small screens and at increased browser zoom. The default DialogContent scrolls as one region, so its footer scrolls with the content.",
      },
    },
  },
};


export const CustomWidth: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Maximize2 aria-hidden="true" className="size-4" />
          Open wide dialog
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Project overview</DialogTitle>

          <DialogDescription>
            A wider dialog for presenting related information side by side.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 sm:grid-cols-2">
          <div className="space-y-2 rounded-surface border border-border bg-muted/30 p-4">
            <div className="flex items-center gap-2">
              <Settings2
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />

              <h3 className="text-sm font-semibold text-foreground">
                Components
              </h3>
            </div>

            <p className="text-sm leading-6 text-muted-foreground">
              Reusable primitives, composites, and consistent design tokens.
            </p>
          </div>

          <div className="space-y-2 rounded-surface border border-border bg-muted/30 p-4">
            <div className="flex items-center gap-2">
              <ShieldCheck
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />

              <h3 className="text-sm font-semibold text-foreground">
                Accessibility
              </h3>
            </div>

            <p className="text-sm leading-6 text-muted-foreground">
              Semantic markup, keyboard support, and predictable focus behavior.
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Overrides DialogContent's default max-w-lg with max-w-2xl while retaining its viewport-relative width and maximum height. The internal grid switches from one column to two columns at the small breakpoint.",
      },
    },
  },
};


function DismissalPreventionExample() {
  const formId = useId();
  const notesId = useId();

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [savedDraft, setSavedDraft] = useState<string | null>(null);

  const [showWarning, setShowWarning] = useState(false);

  const dirty = draft.trim().length > 0;

  const discardChanges = () => {
    setDraft("");
    setShowWarning(false);
    setOpen(false);
  };

  const requestClose = () => {
    if (dirty) {
      setShowWarning(true);
      return;
    }

    setShowWarning(false);
    setOpen(false);
  };

  return (
    <div className="w-full max-w-lg space-y-4">
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (nextOpen) {
            setShowWarning(false);
            setOpen(true);
          } else {
            requestClose();
          }
        }}
      >
        <DialogTrigger asChild>
          <Button variant="outline">
            <Pencil aria-hidden="true" className="size-4" />
            Edit draft
          </Button>
        </DialogTrigger>

        <DialogContent
          onEscapeKeyDown={(event) => {
            if (dirty) {
              event.preventDefault();
              setShowWarning(true);
            }
          }}
          onInteractOutside={(event) => {
            if (dirty) {
              event.preventDefault();
              setShowWarning(true);
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit project draft</DialogTitle>

            <DialogDescription>
              Changes are kept locally until you save or discard them.
            </DialogDescription>
          </DialogHeader>

          <form
            id={formId}
            className="space-y-4 py-4"
            onSubmit={(event) => {
              event.preventDefault();

              setSavedDraft(draft);
              setDraft("");
              setShowWarning(false);
              setOpen(false);
            }}
          >
            <FormField>
              <FormLabel htmlFor={notesId}>Draft notes</FormLabel>

              <Textarea
                id={notesId}
                name="notes"
                rows={4}
                value={draft}
                placeholder="Write your draft..."
                onChange={(event) => {
                  setDraft(event.currentTarget.value);

                  if (showWarning) {
                    setShowWarning(false);
                  }
                }}
              />

              <FormDescription>
                Enter text, then try Escape, clicking outside, or Cancel.
              </FormDescription>
            </FormField>

            {showWarning && (
              <p
                role="alert"
                className="rounded-control border border-border bg-muted/40 px-3 py-2 text-sm text-foreground"
              >
                You have unsaved changes. Save your draft or discard your
                changes to close.
              </p>
            )}
          </form>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={requestClose}>
              Cancel
            </Button>

            {dirty && (
              <Button type="button" variant="outline" onClick={discardChanges}>
                Discard
              </Button>
            )}

            <Button type="submit" form={formId} disabled={!dirty}>
              Save draft
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <p role="status" className="text-sm text-muted-foreground">
        {savedDraft !== null
          ? `Last saved draft: ${savedDraft}`
          : "No draft saved yet."}
      </p>
    </div>
  );
}

export const DismissalPrevention: Story = {
  render: () => <DismissalPreventionExample />,

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Demonstrates protection against accidental dismissal while changes are unsaved. Escape, outside interaction, and Cancel cannot silently discard a dirty draft. An inline warning explains the available Save and Discard actions. This example uses local state rather than an asynchronous persistence workflow.",
      },
    },
  },
};



function KeyboardAndFocusExample() {
  const firstId = useId();
  const secondId = useId();

  return (
    <div className="w-full max-w-lg space-y-4">
      <p className="text-sm leading-6 text-muted-foreground">
        Use the keyboard to open the dialog. Test Tab, Shift+Tab, Escape, and
        focus restoration after closing.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline">Before trigger</Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Test keyboard focus</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Keyboard interaction test</DialogTitle>

              <DialogDescription>
                Focus should remain inside this modal until it closes.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <FormField>
                <FormLabel htmlFor={firstId}>First field</FormLabel>

                <Input id={firstId} placeholder="First input" />
              </FormField>

              <FormField>
                <FormLabel htmlFor={secondId}>Second field</FormLabel>

                <Input id={secondId} placeholder="Second input" />
              </FormField>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close and restore focus</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button variant="outline">After trigger</Button>
      </div>
    </div>
  );
}

export const KeyboardAndFocus: Story = {
  render: () => <KeyboardAndFocusExample />,

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "A manual keyboard-accessibility test. Open the dialog with Enter or Space, verify that focus moves inside, use Tab and Shift+Tab to test focus containment, and close with Escape or the explicit Close button. Focus should return to the trigger rather than moving to the surrounding buttons. Radix owns the focus behavior.",
      },
    },
  },
};
