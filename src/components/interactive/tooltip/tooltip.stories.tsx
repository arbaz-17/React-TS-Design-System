
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Download,
  Info,
  Keyboard,
  Settings2,
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

const meta = {
  title: "Interactive/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],

  parameters: {
    layout: "centered",

    docs: {
      description: {
        component:
          "A Radix-backed tooltip family containing TooltipProvider, Tooltip, TooltipTrigger, and TooltipContent. Tooltips display short, noninteractive supplementary information on hover or keyboard focus. Radix manages visibility, positioning, dismissal, accessibility, and portal rendering. TooltipProvider is supplied by the global Storybook decorator. Triggers must have their own meaningful accessible names.",
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
        "Opening delay for this Tooltip in milliseconds. Overrides the provider default.",
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
        "Callback invoked when visibility changes.",
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

export const Default: Story = {
  render: (args) => (
    <div className="flex min-h-32 items-center justify-center">
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="outline"
          >
            <Info
              aria-hidden="true"
              className="size-4"
            />
            Hover or focus for help
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          Tooltips provide supplementary
          information about a control.
        </TooltipContent>
      </Tooltip>
    </div>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "Basic Tooltip composition using TooltipTrigger asChild with the design-system Button. Hover or keyboard-focus the trigger to display the tooltip. The delayDuration control adjusts the opening delay.",
      },
    },
  },
};

function IconOnlyButtonExample() {
  const [downloads, setDownloads] =
    useState(0);

  return (
    <div className="flex w-full max-w-md flex-col items-start gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label="Download report"
            onClick={() => {
              setDownloads(
                (count) => count + 1,
              );
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
              downloads === 1
                ? "time"
                : "times"
            }.`}
      </p>
    </div>
  );
}

export const IconOnlyButton: Story = {
  render: () => (
    <IconOnlyButtonExample />
  ),

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "An icon-only Button with an independent accessible name provided through aria-label. The Lucide icon is decorative, and the tooltip provides additional context. Clicking records a local demonstration action without initiating a real download.",
      },
    },
  },
};

export const KeyboardInteraction: Story = {
  render: () => (
    <div className="w-full max-w-lg space-y-5">
      <div className="flex items-start gap-3">
        <Keyboard
          aria-hidden="true"
          className="mt-0.5 size-5 shrink-0 text-muted-foreground"
        />

        <p className="text-sm leading-6 text-muted-foreground">
          Use Tab to focus the help button.
          The tooltip should appear without
          moving focus. Press Escape to dismiss
          it, then Tab to the next field.
        </p>
      </div>

      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="outline"
          >
            Keyboard help
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          Press Escape to dismiss this tooltip.
        </TooltipContent>
      </Tooltip>

      <div className="space-y-2">
        <label
          htmlFor="tooltip-keyboard-next"
          className="block text-sm font-medium text-foreground"
        >
          Next keyboard focus target
        </label>

        <Input
          id="tooltip-keyboard-next"
          placeholder="Focus here after the trigger"
        />
      </div>
    </div>
  ),

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Tests keyboard-focus activation, Escape dismissal, and focus preservation. The tooltip does not steal focus, trap focus, or introduce an additional Tab stop. Moving focus to the following input should dismiss the tooltip.",
      },
    },
  },
};

function ControlledExample() {
  const [open, setOpen] =
    useState(false);

  return (
    <div className="w-full max-w-lg space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <Tooltip
          open={open}
          onOpenChange={setOpen}
          delayDuration={0}
        >
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
            >
              <Info
                aria-hidden="true"
                className="size-4"
              />
              Controlled help
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            React manages this tooltip's
            visibility.
          </TooltipContent>
        </Tooltip>

        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setOpen((current) => !current);
          }}
        >
          {open
            ? "Close tooltip"
            : "Open tooltip"}
        </Button>
      </div>

      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        Controlled state:{" "}
        <span className="font-medium text-foreground">
          {open ? "Open" : "Closed"}
        </span>
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledExample />,

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Demonstrates controlled Tooltip visibility through open and onOpenChange. An external button can change visibility while Radix continues to report user-driven changes. Programmatic opening is a specialized use case rather than the default interaction pattern.",
      },
    },
  },
};

export const OpeningDelay: Story = {
  render: () => (
    <TooltipProvider
      delayDuration={1200}
      skipDelayDuration={300}
    >
      <div className="w-full max-w-xl space-y-5">
        <p className="text-sm leading-6 text-muted-foreground">
          The first tooltip uses a scoped
          provider delay of 1200 milliseconds.
          The second overrides the delay
          to open immediately.
        </p>

        <div className="flex flex-wrap gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
              >
                Provider delay (1200 ms)
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              Uses the local provider's
              opening delay.
            </TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
              >
                Immediate (0 ms)
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              Overrides the provider's
              opening delay.
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
          "Demonstrates a scoped TooltipProvider with a custom delayDuration and skipDelayDuration, alongside a per-tooltip override. The global provider remains sufficient for ordinary usage. Wait beyond the skip-delay interval when comparing fresh hover delays.",
      },
    },
  },
};

const placements = [
  {
    label: "Top",
    side: "top",
  },
  {
    label: "Right",
    side: "right",
  },
  {
    label: "Bottom",
    side: "bottom",
  },
  {
    label: "Left",
    side: "left",
  },
] as const;

export const Placements: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-5">
      <p className="text-sm leading-6 text-muted-foreground">
        Hover or focus each trigger to
        inspect its preferred placement.
        Reduce the Storybook viewport width
        to test collision avoidance.
      </p>

      <div className="flex min-h-64 flex-wrap items-center justify-center gap-6 rounded-surface border border-border bg-card px-8 py-12">
        {placements.map((placement) => (
          <Tooltip
            key={placement.side}
            delayDuration={0}
          >
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
              >
                {placement.label}
              </Button>
            </TooltipTrigger>

            <TooltipContent
              side={placement.side}
              align="center"
              sideOffset={10}
              collisionPadding={12}
            >
              Preferred placement:{" "}
              {placement.label}.
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
          "Demonstrates top, right, bottom, and left placement using TooltipContent side, align, and sideOffset. Radix can flip or shift the content when there is insufficient viewport space. collisionPadding adds space near viewport boundaries.",
      },
    },
  },
};

export const InsideDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
        >
          <Settings2
            aria-hidden="true"
            className="size-4"
          />
          Open project dialog
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Project information
          </DialogTitle>

          <DialogDescription>
            Test tooltip behavior inside
            a modal dialog.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm leading-6 text-foreground">
            Hover over or focus the help
            button to display its tooltip.
          </p>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
              >
                <Info
                  aria-hidden="true"
                  className="size-4"
                />
                Project help
              </Button>
            </TooltipTrigger>

            <TooltipContent side="top">
              This project uses reusable
              components and semantic
              design tokens.
            </TooltipContent>
          </Tooltip>

          <p className="text-sm leading-6 text-muted-foreground">
            Check positioning, overlay
            stacking, focus behavior,
            and theme colors.
          </p>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
            >
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
          "Tests Tooltip composition inside a Radix-backed Dialog. TooltipContent renders through its own portal with a higher stacking layer. Verify visibility above the modal, correct positioning, focus preservation, and dismissal when the Dialog closes.",
      },
    },
  },
};
