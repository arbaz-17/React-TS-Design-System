
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Download,
  Info,
  Keyboard,
} from "lucide-react";

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../index";

// -----------------------------------------
// Storybook metadata
// -----------------------------------------

const meta = {
  title: "Interactive/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A Radix-backed tooltip family with TooltipProvider, Tooltip, TooltipTrigger, and TooltipContent. Tooltips provide short, noninteractive supplementary information on hover or keyboard focus. A shared TooltipProvider is already configured in the global Storybook decorator. The trigger must have its own meaningful accessible name. Radix manages visibility, descriptions, positioning, dismissal, and portal rendering.",
      },
    },
  },

  args: {
    delayDuration: 500,
  },

  argTypes: {
    delayDuration: {
      control: {
        type: "number",
        min: 0,
        step: 100,
      },
      description:
        "Opening delay for this individual Tooltip, in milliseconds. Overrides the provider default.",
    },

    open: {
      control: false,
      description:
        "Controlled visibility, used with onOpenChange.",
    },

    defaultOpen: {
      control: false,
      description:
        "Initial visibility for an uncontrolled Tooltip.",
    },

    onOpenChange: {
      control: false,
      description:
        "Callback for visibility changes.",
    },

    children: {
      control: false,
      description:
        "Composable TooltipTrigger and TooltipContent.",
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

// -----------------------------------------
// 1. Basic Tooltip
// -----------------------------------------

export const BasicTooltip: Story = {
  render: (args) => (
    <div className="flex min-h-28 items-center justify-center">
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="outline">
            Hover or focus for help
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          Tooltips provide supplementary information.
        </TooltipContent>
      </Tooltip>
    </div>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "Basic Tooltip composition. Hover over or keyboard-focus the trigger to show the explanation. The delayDuration control changes its opening delay. TooltipProvider is supplied by the global Storybook decorator.",
      },
    },
  },
};

// -----------------------------------------
// 2. Text Button Trigger
// -----------------------------------------

function TextButtonTriggerExample() {
  const [savedCount, setSavedCount] = useState(0);

  return (
    <div className="space-y-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            onClick={() => {
              setSavedCount((count) => count + 1);
            }}
          >
            Save a copy
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          Save a local demonstration copy.
        </TooltipContent>
      </Tooltip>

      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        {savedCount === 0
          ? "No copies saved yet."
          : `${savedCount} demonstration ${
              savedCount === 1 ? "copy" : "copies"
            } saved.`}
      </p>
    </div>
  );
}

export const TextButtonTrigger: Story = {
  render: () => <TextButtonTriggerExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Composes TooltipTrigger with the design-system Button using asChild. The Button retains its own click behavior, while Tooltip supplies supplementary information. The example uses local state rather than a backend.",
      },
    },
  },
};

// -----------------------------------------
// 3. Icon Only Button
// -----------------------------------------

function IconOnlyButtonExample() {
  const [downloads, setDownloads] = useState(0);

  return (
    <div className="space-y-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label="Download report"
            onClick={() => {
              setDownloads((count) => count + 1);
            }}
          >
            <Download
              aria-hidden="true"
              className="size-4"
            />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          Download the current project report.
        </TooltipContent>
      </Tooltip>

      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        {downloads === 0
          ? "No demo downloads requested."
          : `Demo download requested ${downloads} ${
              downloads === 1 ? "time" : "times"
            }.`}
      </p>
    </div>
  );
}

export const IconOnlyButton: Story = {
  render: () => <IconOnlyButtonExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "The icon-only Button has an independent accessible name, Download report. The SVG is decorative, and Tooltip provides an additional explanation. Clicking records a local demo action; it does not initiate a real file download.",
      },
    },
  },
};

// -----------------------------------------
// 4. Keyboard Focus
// -----------------------------------------

export const KeyboardFocus: Story = {
  render: () => (
    <div className="w-full max-w-lg space-y-4">
      <p className="text-sm text-muted-foreground">
        Use Tab to focus the help button without
        using the mouse. Focus should remain on
        the button when the tooltip appears.
      </p>

      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <Keyboard
              aria-hidden="true"
              className="size-4"
            />
            Keyboard help
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          Use the Tab key to move between controls.
        </TooltipContent>
      </Tooltip>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates keyboard-focus activation without an opening delay. Tooltip does not move focus into its content, create a focus trap, or add another Tab stop.",
      },
    },
  },
};

// -----------------------------------------
// 5. Escape Dismissal
// -----------------------------------------

export const EscapeDismissal: Story = {
  render: () => (
    <div className="w-full max-w-lg space-y-4">
      <p className="text-sm text-muted-foreground">
        Focus or hover over the trigger to open
        its tooltip. Press Escape to dismiss it
        without having to move keyboard focus.
      </p>

      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button variant="outline">
            Test Escape dismissal
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          Press Escape to dismiss this tooltip.
        </TooltipContent>
      </Tooltip>

      <label className="block space-y-2 text-sm">
        <span className="font-medium">
          Next keyboard focus target
        </span>

        <Input
          placeholder="Focus here after the trigger"
        />
      </label>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Verifies Escape dismissal and keyboard focus preservation. After dismissal, focus should remain on the trigger. Moving focus to the following input should also close the tooltip. Hover again after dismissal to verify normal reopening.",
      },
    },
  },
};

// -----------------------------------------
// 6. Controlled Tooltip
// -----------------------------------------

function ControlledTooltipExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-lg space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Tooltip
          open={open}
          onOpenChange={setOpen}
          delayDuration={0}
        >
          <TooltipTrigger asChild>
            <Button variant="outline">
              Controlled help trigger
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            React owns the visibility of this tooltip.
          </TooltipContent>
        </Tooltip>

        <Button
          variant="secondary"
          onClick={() => {
            setOpen((current) => !current);
          }}
        >
          {open
            ? "Close tooltip externally"
            : "Open tooltip externally"}
        </Button>
      </div>

      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        Controlled state: {open ? "Open" : "Closed"}
      </p>
    </div>
  );
}

export const ControlledTooltip: Story = {
  render: () => <ControlledTooltipExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates controlled Tooltip state using open and onOpenChange. React can change visibility through an external control, while Radix continues to report user-driven state changes. Programmatic opening without trigger focus is a specialized example, not the default recommendation for ordinary tooltips.",
      },
    },
  },
};

// -----------------------------------------
// 7. Custom Opening Delay
// -----------------------------------------

export const CustomOpeningDelay: Story = {
  render: () => (
    <TooltipProvider
      delayDuration={1200}
      skipDelayDuration={300}
    >
      <div className="w-full max-w-xl space-y-4">
        <p className="text-sm text-muted-foreground">
          This example deliberately uses a local
          provider boundary with a 1.2-second
          initial hover delay. The second tooltip
          overrides that delay.
        </p>

        <div className="flex flex-wrap gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">
                Provider delay (1200 ms)
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              Uses the scoped provider delay.
            </TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button variant="outline">
                Immediate (0 ms)
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              Overrides the provider opening delay.
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates an intentional nested TooltipProvider configuration boundary and a per-tooltip delayDuration override. Most applications need only the global provider. Move the pointer away and allow the skip-delay interval to expire when comparing fresh initial hover delays.",
      },
    },
  },
};

// -----------------------------------------
// 8. Multiple Tooltips
// -----------------------------------------

const helpTopics = [
  {
    label: "Overview help",
    description:
      "The overview summarizes your current project.",
  },
  {
    label: "Editor help",
    description:
      "Use the editor to update project information.",
  },
  {
    label: "Settings help",
    description:
      "Settings control project-level preferences.",
  },
] as const;

export const MultipleTooltips: Story = {
  render: () => (
    <div className="w-full max-w-xl space-y-4">
      <p className="text-sm text-muted-foreground">
        Move between the help buttons to observe
        shared provider timing. You can also use
        Tab to focus each trigger.
      </p>

      <div className="flex flex-wrap gap-3">
        {helpTopics.map((topic) => (
          <Tooltip key={topic.label}>
            <TooltipTrigger asChild>
              <Button variant="outline">
                <Info
                  aria-hidden="true"
                  className="size-4"
                />
                {topic.label}
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              {topic.description}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Multiple independent Tooltip roots reuse the global Storybook TooltipProvider. Test each trigger separately, then move between triggers to inspect provider-managed timing and dismissal. Every trigger retains its own accessible name and description.",
      },
    },
  },
};

// -----------------------------------------
// 9. Different Placements
// -----------------------------------------

const placements = [
  { label: "Top", side: "top" },
  { label: "Right", side: "right" },
  { label: "Bottom", side: "bottom" },
  { label: "Left", side: "left" },
] as const;

export const DifferentPlacements: Story = {
  render: () => (
    <div className="flex min-h-56 w-full flex-wrap items-center justify-center gap-6 px-8 py-12">
      {placements.map((placement) => (
        <Tooltip
          key={placement.side}
          delayDuration={0}
        >
          <TooltipTrigger asChild>
            <Button variant="outline">
              {placement.label}
            </Button>
          </TooltipTrigger>

          <TooltipContent
            side={placement.side}
            align="center"
            sideOffset={10}
          >
            Preferred placement: {placement.label}.
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates top, right, bottom, and left placements through supported TooltipContent props. side is a preferred placement; Radix may adjust it when available viewport space is insufficient.",
      },
    },
  },
};

// -----------------------------------------
// 10. Long Content
// -----------------------------------------

export const LongContent: Story = {
  render: () => (
    <div className="flex min-h-36 w-full max-w-lg items-center justify-center">
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button variant="outline">
            View detailed explanation
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          This setting controls how often the
          application refreshes project information.
          It may affect how quickly recent changes
          become visible. Longer explanatory text
          should wrap naturally and remain readable
          on narrow screens without horizontal
          overflow.
        </TooltipContent>
      </Tooltip>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Checks the existing TooltipContent maximum width, break-words styling, and viewport constraints. Verify at narrow widths and 200% zoom. Tooltip descriptions should normally remain short; extensive content belongs in a more suitable interface.",
      },
    },
  },
};

// -----------------------------------------
// 11. Viewport Edge Collision
// -----------------------------------------

export const ViewportEdgeCollision: Story = {
  render: () => (
    <div className="w-full max-w-xl space-y-4">
      <p className="text-sm text-muted-foreground">
        Use a narrow Storybook viewport and open
        the tooltips at opposite edges. Radix
        should keep their content visible.
      </p>

      <div className="flex min-h-44 w-full items-center justify-between gap-3 rounded-surface border border-border bg-card p-2">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button size="sm" variant="outline">
              Left edge
            </Button>
          </TooltipTrigger>

          <TooltipContent
            side="left"
            collisionPadding={12}
          >
            This content should stay within
            the visible viewport.
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button size="sm" variant="outline">
              Right edge
            </Button>
          </TooltipTrigger>

          <TooltipContent
            side="right"
            collisionPadding={12}
          >
            This content should not be clipped
            against the viewport edge.
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Tests Radix collision avoidance with preferred placements pointing toward viewport edges. Placement may flip or shift automatically. Inspect the actual position rather than assuming the requested side is always preserved.",
      },
    },
  },
};

// -----------------------------------------
// 12. Tooltip Inside Dialog
// -----------------------------------------

export const TooltipInsideDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Open dialog with tooltip
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Project information
          </DialogTitle>

          <DialogDescription>
            This example verifies Tooltip
            composition inside a modal dialog.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm leading-6">
            Focus or hover over the help control
            to display a portaled Tooltip.
          </p>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button variant="outline">
                <Info
                  aria-hidden="true"
                  className="size-4"
                />
                Project help
              </Button>
            </TooltipTrigger>

            <TooltipContent side="top">
              This project uses reusable components
              and semantic design tokens.
            </TooltipContent>
          </Tooltip>

          <p className="text-sm text-muted-foreground">
            Check focus, overlay stacking,
            clipping, and theme colors.
          </p>
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
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Checks Tooltip inside the existing Radix-backed Dialog. TooltipContent uses its own Portal and z-index layer. Verify that the Tooltip is visible above the modal, remains noninteractive, does not steal focus, and inherits semantic colors in both themes. Closing the Dialog must also remove the Tooltip.",
      },
    },
  },
};
