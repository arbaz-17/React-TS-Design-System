
import { useId, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

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

// -----------------------------------------
// Storybook metadata
// -----------------------------------------

const meta = {
  title: "Interactive/Dialog",
  component: Dialog,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A modal-only, Radix-backed Dialog family containing eight public components. Supports controlled and uncontrolled state, accessible titles and descriptions, keyboard interaction, focus containment and restoration, responsive scrolling, and portal rendering. Consumers own forms, validation, dismissal policies, and business operations.",
      },
    },
  },

  argTypes: {
    open: {
      control: false,
      description:
        "Controlled visibility. Use with onOpenChange.",
    },

    defaultOpen: {
      control: false,
      description:
        "Initial visibility for uncontrolled Dialog.",
    },

    onOpenChange: {
      control: false,
      description:
        "Callback invoked when Dialog requests a visibility change.",
    },

    children: {
      control: false,
      description:
        "Composable trigger, content, and supporting components.",
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

// -----------------------------------------
// 1. Basic Dialog
// -----------------------------------------

export const BasicDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Account information
          </DialogTitle>

          <DialogDescription>
            Review the information associated
            with your account.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 text-sm leading-6 text-foreground">
          This dialog demonstrates the complete
          eight-component composition using the
          existing public API.
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              Close dialog
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "Basic modal composition using all eight public Dialog components. Trigger and Close use asChild to compose the existing Button without nested native buttons.",
      },
    },
  },
};

// -----------------------------------------
// 2. With Description
// -----------------------------------------

export const WithDescription: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          View project details
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Project details
          </DialogTitle>

          <DialogDescription>
            Read the project information below.
            These details are provided for reference.
          </DialogDescription>
        </DialogHeader>

        <dl className="grid grid-cols-2 gap-4 py-4 text-sm">
          <div>
            <dt className="text-muted-foreground">
              Project
            </dt>
            <dd className="font-medium">
              Design System
            </dd>
          </div>

          <div>
            <dt className="text-muted-foreground">
              Status
            </dt>
            <dd className="font-medium">
              In progress
            </dd>
          </div>
        </dl>

        <DialogFooter>
          <DialogClose asChild>
            <Button>Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "DialogTitle supplies the accessible name, and DialogDescription supplies supplementary context through Radix-managed ARIA relationships.",
      },
    },
  },
};

// -----------------------------------------
// 3. Without Description
// -----------------------------------------

export const WithoutDescription: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Open simple dialog
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            Quick information
          </DialogTitle>
        </DialogHeader>

        <p className="py-4 text-sm leading-6">
          Not every dialog requires a separate
          accessible description.
        </p>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "DialogTitle is required for accessible naming. DialogDescription is optional; when omitted, aria-describedby is explicitly undefined to prevent a broken or unnecessary description reference.",
      },
    },
  },
};

// -----------------------------------------
// 4. Form Dialog
// -----------------------------------------

function FormDialogExample() {
  const formId = useId();
  const nameId = useId();
  const helpId = useId();
  const notesId = useId();

  const [open, setOpen] = useState(false);
  const [savedProject, setSavedProject] =
    useState<string | null>(null);

  return (
    <div className="space-y-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create project</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create a project
            </DialogTitle>

            <DialogDescription>
              Provide a project name and optional
              notes. This example saves data locally.
            </DialogDescription>
          </DialogHeader>

          <form
            id={formId}
            className="space-y-4 py-4"
            onSubmit={(event) => {
              event.preventDefault();

              const formData = new FormData(
                event.currentTarget,
              );

              const name = String(
                formData.get("projectName") ?? "",
              ).trim();

              if (!name) return;

              setSavedProject(name);
              setOpen(false);
            }}
          >
            <FormField>
              <FormLabel
                htmlFor={nameId}
                requiredIndicator
              >
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
              <FormLabel htmlFor={notesId}>
                Notes
              </FormLabel>

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
              <Button variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" form={formId}>
              Save project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        {savedProject
          ? `Project saved locally: ${savedProject}`
          : "No project saved yet."}
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
          "Demonstrates consumer-managed form submission in a controlled Dialog. Native validation runs before onSubmit. The Save button submits the form without automatically closing the modal; the consumer closes it after successful local processing. Cancel uses DialogClose.",
      },
    },
  },
};

// -----------------------------------------
// 5. Controlled Dialog
// -----------------------------------------

function ControlledDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Manage preferences</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Application preferences
            </DialogTitle>

            <DialogDescription>
              This dialog is controlled by React
              state in its consuming component.
            </DialogDescription>
          </DialogHeader>

          <p className="py-4 text-sm">
            Closing through the button, Escape, or
            supported outside interactions updates
            the same React state.
          </p>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                Close preferences
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        Controlled state: {open ? "Open" : "Closed"}
      </p>
    </div>
  );
}

export const ControlledDialog: Story = {
  render: () => <ControlledDialogExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "React owns the open state using open and onOpenChange. Radix handles interaction mechanics while the consumer synchronizes visibility.",
      },
    },
  },
};

// -----------------------------------------
// 6. Uncontrolled Dialog
// -----------------------------------------

function UncontrolledDialogExample() {
  const [lastEvent, setLastEvent] = useState(
    "No visibility change yet.",
  );

  return (
    <div className="space-y-4">
      <Dialog
        defaultOpen={false}
        onOpenChange={(nextOpen) => {
          setLastEvent(
            nextOpen
              ? "Dialog was opened."
              : "Dialog was closed.",
          );
        }}
      >
        <DialogTrigger asChild>
          <Button variant="outline">
            Open uncontrolled dialog
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Uncontrolled state
            </DialogTitle>

            <DialogDescription>
              Radix manages visibility internally.
              React only observes state changes.
            </DialogDescription>
          </DialogHeader>

          <p className="py-4 text-sm">
            This example does not pass an open prop.
          </p>

          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        {lastEvent}
      </p>
    </div>
  );
}

export const UncontrolledDialog: Story = {
  render: () => <UncontrolledDialogExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Radix owns visibility using defaultOpen. The optional onOpenChange callback observes transitions but does not control the root.",
      },
    },
  },
};

// -----------------------------------------
// 7. Long Content
// -----------------------------------------

const longSections = [
  "Project overview",
  "Component architecture",
  "Design tokens",
  "TypeScript contracts",
  "Accessibility requirements",
  "Keyboard interactions",
  "Focus management",
  "Responsive behavior",
  "Theme compatibility",
  "Component documentation",
  "Testing strategy",
  "Submission checklist",
] as const;

export const LongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Open long dialog
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Project review checklist
          </DialogTitle>

          <DialogDescription>
            Review the following engineering
            topics before submitting the project.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {longSections.map((section, index) => (
            <section
              key={section}
              className="space-y-2"
            >
              <h3 className="text-sm font-semibold text-foreground">
                {index + 1}. {section}
              </h3>

              <p className="text-sm leading-6 text-muted-foreground">
                Verify that the implementation
                follows the intended architecture,
                remains accessible, and works
                correctly across supported screen
                sizes and interaction methods.
              </p>
            </section>
          ))}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button>
              Finish review
            </Button>
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
          "Tests viewport-constrained modal height and internal scrolling. Verify that the footer remains reachable at narrow widths and 200% browser zoom, without clipping or losing focus.",
      },
    },
  },
};

// -----------------------------------------
// 8. Custom Width
// -----------------------------------------

export const CustomWidth: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Open wide dialog
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Project summary
          </DialogTitle>

          <DialogDescription>
            A wider dialog using the existing
            className customization API.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 sm:grid-cols-2">
          <div className="rounded-surface border border-border p-4">
            <h3 className="font-semibold">
              Components
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Reusable primitives and composites.
            </p>
          </div>

          <div className="rounded-surface border border-border p-4">
            <h3 className="font-semibold">
              Accessibility
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Semantic HTML and keyboard behavior.
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              Close
            </Button>
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
          "Overrides DialogContent's default max-w-lg with max-w-2xl. The original viewport-relative width and maximum height remain in place, preserving responsiveness.",
      },
    },
  },
};

// -----------------------------------------
// 9. Dismissal Prevention
// -----------------------------------------

function DismissalPreventionExample() {
  const formId = useId();
  const notesId = useId();

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useState<string | null>(null);

  const dirty = draft.length > 0;

  return (
    <div className="space-y-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            Edit draft
          </Button>
        </DialogTrigger>

        <DialogContent
          onEscapeKeyDown={(event) => {
            if (dirty) event.preventDefault();
          }}
          onPointerDownOutside={(event) => {
            if (dirty) event.preventDefault();
          }}
          onInteractOutside={(event) => {
            if (dirty) event.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>
              Edit project draft
            </DialogTitle>

            <DialogDescription>
              Unsaved changes are protected against
              Escape and outside dismissal. Use Save
              or Discard to finish editing.
            </DialogDescription>
          </DialogHeader>

          <form
            id={formId}
            className="py-4"
            onSubmit={(event) => {
              event.preventDefault();

              setSaved(draft);
              setDraft("");
              setOpen(false);
            }}
          >
            <FormField>
              <FormLabel htmlFor={notesId}>
                Draft notes
              </FormLabel>

              <Textarea
                id={notesId}
                name="notes"
                value={draft}
                rows={4}
                placeholder="Make a change..."
                onChange={(event) => {
                  setDraft(event.currentTarget.value);
                }}
              />

              <FormDescription>
                Type some text, then try Escape
                or clicking outside the dialog.
              </FormDescription>
            </FormField>
          </form>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => setDraft("")}
              >
                Discard changes
              </Button>
            </DialogClose>

            <Button
              type="submit"
              form={formId}
              disabled={!dirty}
            >
              Save draft
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        {saved !== null
          ? `Last saved draft: ${saved}`
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
          "Demonstrates consumer-controlled dismissal protection. Once the draft contains unsaved text, Escape and outside interaction are prevented through supported Radix callbacks. Save and Discard remain explicit ways to close the modal. This is a local example, not an asynchronous save workflow.",
      },
    },
  },
};

// -----------------------------------------
// 10. Keyboard And Focus
// -----------------------------------------

function KeyboardAndFocusExample() {
  const firstId = useId();
  const secondId = useId();

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Use the keyboard to open this dialog.
        Test Tab, Shift+Tab, Escape, and focus
        restoration.
      </p>

      <Dialog>
        <DialogTrigger asChild>
          <Button>
            Test keyboard focus
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Keyboard interaction test
            </DialogTitle>

            <DialogDescription>
              Focus should remain inside this modal
              while it is open.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <FormField>
              <FormLabel htmlFor={firstId}>
                First field
              </FormLabel>

              <Input
                id={firstId}
                placeholder="First input"
              />
            </FormField>

            <FormField>
              <FormLabel htmlFor={secondId}>
                Second field
              </FormLabel>

              <Input
                id={secondId}
                placeholder="Second input"
              />
            </FormField>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                Close and restore focus
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
          "A focused manual keyboard test. Open with Enter or Space, verify focus moves inside, cycle through controls with Tab and Shift+Tab, and close with Escape or the explicit button. Focus should return to the trigger. Radix owns focus management; the story does not implement its own focus trap.",
      },
    },
  },
};

// -----------------------------------------
// 11. Portal And Theme
// -----------------------------------------

export const PortalAndTheme: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Inspect portal theme
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Portal and theme verification
          </DialogTitle>

          <DialogDescription>
            This content renders through the
            internal Radix Portal.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <div className="rounded-surface border border-border bg-background p-4">
            <p className="font-medium text-foreground">
              Semantic surface
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Background, foreground, and border
              colors should follow the selected
              Storybook theme.
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            Close this dialog, switch between light
            and dark themes, and reopen it.
          </p>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button>Done</Button>
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
          "Checks that the Radix portal receives the existing document-root data-theme tokens. Verify both light and dark modes in Canvas and Docs views, including overlay, foreground, border, and focus colors.",
      },
    },
  },
};
