
import { useId, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
} from "../../index";

// -----------------------------------------
// Storybook metadata
// -----------------------------------------

const meta = {
  title: "Interactive/Accordion",
  component: Accordion,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A native-first disclosure family built with details and summary. The four public components are Accordion, AccordionItem, AccordionTrigger, and AccordionContent. Supports single-open grouping through the native details name attribute, independent multiple-open disclosures, initial expansion with defaultOpen, and native onToggle events. Expansion is browser-managed rather than controlled through React. No custom arrow-key navigation or ARIA accordion-header pattern is implemented.",
      },
    },
  },

  args: {
    type: "multiple",
    className: "w-full max-w-xl",
  },

  argTypes: {
    type: {
      control: "inline-radio",
      options: ["single", "multiple"],
      description:
        "Native disclosure grouping. Single allows at most one expanded item; multiple allows independent expansion.",
    },

    className: {
      control: "text",
      description:
        "Additional styling for the Accordion root.",
    },

    children: {
      control: false,
      description:
        "Composable AccordionItem elements.",
    },

    ref: {
      control: false,
      description:
        "Optional ref to the root HTMLDivElement.",
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

// -----------------------------------------
// 1. Default
// -----------------------------------------

export const Default: Story = {
  render: (args) => (
    <Accordion
      key={args.type}
      type={args.type}
      className={args.className}
    >
      <AccordionItem defaultOpen>
        <AccordionTrigger>
          What is a design system?
        </AccordionTrigger>

        <AccordionContent>
          A design system is a collection of
          reusable components, design tokens,
          patterns, and documentation that helps
          teams build consistent interfaces.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger>
          Why use TypeScript?
        </AccordionTrigger>

        <AccordionContent>
          TypeScript helps enforce component
          contracts and detect incorrect prop
          usage during development.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger>
          Why document components?
        </AccordionTrigger>

        <AccordionContent>
          Documentation explains supported APIs,
          usage patterns, accessibility expectations,
          and composition boundaries.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "The default Accordion starts in multiple mode, with the first item expanded. Use controls to switch between single and multiple grouping and customize the root className. The example remounts when type changes so the initial disclosure configuration remains predictable.",
      },
    },
  },
};

// -----------------------------------------
// 2. Single Open
// -----------------------------------------

export const SingleOpen: Story = {
  render: () => (
    <Accordion
      type="single"
      className="w-full max-w-xl"
    >
      <AccordionItem defaultOpen>
        <AccordionTrigger>
          Project overview
        </AccordionTrigger>

        <AccordionContent>
          View general project details and
          its current status.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger>
          Team members
        </AccordionTrigger>

        <AccordionContent>
          View team members and their
          responsibilities.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger>
          Project settings
        </AccordionTrigger>

        <AccordionContent>
          Review project configuration
          and preferences.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Uses type=single to give related native details elements a shared generated name. Opening another section closes the previously expanded one. Closing the selected section leaves every item collapsed; there is no mandatory-one-open rule.",
      },
    },
  },
};

// -----------------------------------------
// 3. Multiple Open
// -----------------------------------------

export const MultipleOpen: Story = {
  render: () => (
    <Accordion
      type="multiple"
      className="w-full max-w-xl"
    >
      <AccordionItem defaultOpen>
        <AccordionTrigger>
          TypeScript
        </AccordionTrigger>

        <AccordionContent>
          Defines strongly typed component
          properties and public interfaces.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger>
          Tailwind CSS
        </AccordionTrigger>

        <AccordionContent>
          Provides utility classes and semantic
          design-token integration.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger>
          Storybook
        </AccordionTrigger>

        <AccordionContent>
          Documents and demonstrates components
          independently from application pages.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Items expand independently when type=multiple. Open all three and close them in any order. The browser owns every item's disclosure state.",
      },
    },
  },
};

// -----------------------------------------
// 4. Initially Expanded
// -----------------------------------------

export const InitiallyExpanded: Story = {
  render: () => (
    <Accordion className="w-full max-w-xl">
      <AccordionItem defaultOpen>
        <AccordionTrigger>
          Getting started
        </AccordionTrigger>

        <AccordionContent>
          This item starts expanded because
          defaultOpen is true. You can close
          it using its native summary control.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem defaultOpen={false}>
        <AccordionTrigger>
          Additional guidance
        </AccordionTrigger>

        <AccordionContent>
          This item starts collapsed. Its
          content becomes available after
          opening the disclosure.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates defaultOpen as an initialization prop, not a controlled value. The first item starts open; the second starts closed. Subsequent toggles remain browser-managed.",
      },
    },
  },
};

// -----------------------------------------
// 5. All Collapsed
// -----------------------------------------

export const AllCollapsed: Story = {
  render: () => (
    <Accordion
      type="single"
      className="w-full max-w-xl"
    >
      <AccordionItem>
        <AccordionTrigger>
          Account
        </AccordionTrigger>

        <AccordionContent>
          Account information and preferences.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger>
          Notifications
        </AccordionTrigger>

        <AccordionContent>
          Notification preferences and delivery.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger>
          Privacy
        </AccordionTrigger>

        <AccordionContent>
          Privacy preferences and account controls.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "All items start collapsed. Even in single mode, the native grouping permits zero expanded items. Users can open an item and close it again without opening another.",
      },
    },
  },
};

// -----------------------------------------
// 6. Rich Content
// -----------------------------------------

function RichContentExample() {
  const emailId = useId();
  const [savedEmail, setSavedEmail] =
    useState<string | null>(null);

  return (
    <div className="w-full max-w-xl space-y-4">
      <Accordion type="multiple">
        <AccordionItem defaultOpen>
          <AccordionTrigger>
            Project requirements
          </AccordionTrigger>

          <AccordionContent className="space-y-3">
            <p>
              Before publishing your project,
              complete the following checks:
            </p>

            <ul className="list-disc space-y-2 pl-5">
              <li>
                Verify component API compatibility.
              </li>
              <li>
                Test keyboard interactions.
              </li>
              <li>
                Review responsive layouts.
              </li>
              <li>
                Confirm that production builds pass.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionTrigger>
            Subscribe to updates
          </AccordionTrigger>

          <AccordionContent>
            <form
              className="space-y-3"
              onSubmit={(event) => {
                event.preventDefault();

                const formData = new FormData(
                  event.currentTarget,
                );

                setSavedEmail(
                  String(formData.get("email") ?? ""),
                );
              }}
            >
              <label
                htmlFor={emailId}
                className="block text-sm font-medium text-foreground"
              >
                Email address
              </label>

              <Input
                id={emailId}
                name="email"
                type="email"
                placeholder="name@example.com"
                required
              />

              <Button type="submit">
                Save email locally
              </Button>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        {savedEmail
          ? `Email saved locally: ${savedEmail}`
          : "No email saved yet."}
      </p>
    </div>
  );
}

export const RichContent: Story = {
  render: () => <RichContentExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "AccordionContent supports paragraphs, lists, labels, form inputs, and buttons. Native form validation is preserved. Interactive controls belong inside AccordionContent, never inside AccordionTrigger. Form state and submission are consumer responsibilities.",
      },
    },
  },
};

// -----------------------------------------
// 7. Native Toggle Events
// -----------------------------------------

function NativeToggleEventsExample() {
  const [expanded, setExpanded] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);
  const [unrelatedUpdates, setUnrelatedUpdates] =
    useState(0);

  return (
    <div className="w-full max-w-xl space-y-4">
      <Accordion>
        <AccordionItem
          onToggle={(event) => {
            setExpanded(event.currentTarget.open);
            setToggleCount((count) => count + 1);
          }}
        >
          <AccordionTrigger>
            Native disclosure details
          </AccordionTrigger>

          <AccordionContent>
            The browser manages whether this
            section is open or closed.

            React receives native toggle
            notifications, but does not control
            the expansion state.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="space-y-2 rounded-surface border border-border bg-card p-4">
        <p
          role="status"
          className="text-sm text-foreground"
        >
          Last observed state:{" "}
          <span className="font-semibold">
            {expanded ? "Expanded" : "Collapsed"}
          </span>
        </p>

        <p className="text-sm text-muted-foreground">
          Toggle events observed: {toggleCount}
        </p>

        <p className="text-sm text-muted-foreground">
          Unrelated state updates: {unrelatedUpdates}
        </p>

        <Button
          variant="outline"
          onClick={() => {
            setUnrelatedUpdates((count) => count + 1);
          }}
        >
          Update unrelated React state
        </Button>
      </div>
    </div>
  );
}

export const NativeToggleEvents: Story = {
  render: () => <NativeToggleEventsExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Observes native details toggle events through onToggle and event.currentTarget.open. The displayed state is observational, not a controlled prop. Toggle the disclosure, then update unrelated React state and confirm it stays in its chosen state. Rapid browser toggle events may be coalesced.",
      },
    },
  },
};

// -----------------------------------------
// 8. Multiple Independent Accordions
// -----------------------------------------

export const MultipleIndependentAccordions: Story = {
  render: () => (
    <div className="grid w-full max-w-2xl gap-8">
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">
          Project settings
        </h2>

        <Accordion type="single">
          <AccordionItem defaultOpen>
            <AccordionTrigger>
              General
            </AccordionTrigger>

            <AccordionContent>
              General project settings.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            <AccordionTrigger>
              Access
            </AccordionTrigger>

            <AccordionContent>
              Project access settings.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">
          Account settings
        </h2>

        <Accordion type="single">
          <AccordionItem defaultOpen>
            <AccordionTrigger>
              General
            </AccordionTrigger>

            <AccordionContent>
              General account settings.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            <AccordionTrigger>
              Access
            </AccordionTrigger>

            <AccordionContent>
              Account access settings.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Two independent single-open Accordion instances. Each root generates a unique native grouping name with useId. Opening an item in one instance must not collapse the selected item in the other, even when trigger labels match.",
      },
    },
  },
};

// -----------------------------------------
// 9. Accordion Inside Card
// -----------------------------------------

export const AccordionInsideCard: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <h2 className="sr-only">
        Project information example
      </h2>

      <Card>
        <CardHeader>
          <CardTitle>
            Project questions
          </CardTitle>

          <CardDescription>
            Frequently asked questions about
            this design-system project.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Accordion type="single">
            <AccordionItem>
              <AccordionTrigger>
                What technologies are used?
              </AccordionTrigger>

              <AccordionContent>
                React, TypeScript, Tailwind CSS,
                and Storybook.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem>
              <AccordionTrigger>
                How are components documented?
              </AccordionTrigger>

              <AccordionContent>
                Each family provides interactive
                Storybook examples and usage guidance.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem>
              <AccordionTrigger>
                How is accessibility verified?
              </AccordionTrigger>

              <AccordionContent>
                Through semantic markup, keyboard
                testing, accessibility checks,
                and focused manual review.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates Accordion inside CardContent. Card provides surrounding presentation, while Accordion manages native disclosures and grouping. Both component families remain independent.",
      },
    },
  },
};

// -----------------------------------------
// 10. Long Content
// -----------------------------------------

const reviewTopics = [
  {
    title: "Component architecture",
    description:
      "Review the public props, native element semantics, composition boundaries, and responsibilities of each reusable component.",
  },
  {
    title: "TypeScript",
    description:
      "Verify that public types represent supported behavior and reject unsupported combinations of props.",
  },
  {
    title: "Accessibility",
    description:
      "Check meaningful labels, keyboard access, visible focus, appropriate reading order, and behavior at high browser zoom.",
  },
  {
    title: "Responsive design",
    description:
      "Verify readable layouts across narrow and wide viewports without unnecessary horizontal scrolling.",
  },
  {
    title: "Documentation",
    description:
      "Ensure examples describe actual implemented behavior and avoid promising functionality outside the public API.",
  },
  {
    title: "Quality assurance",
    description:
      "Confirm Storybook rendering, application compilation, linting, and interaction testing before submission.",
  },
] as const;


export const LongContent: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <Accordion>
        <AccordionItem>
          <AccordionTrigger>
            Full project review checklist
          </AccordionTrigger>

          <AccordionContent className="space-y-5">
            <p>
              Review these topics before submitting
              the component library.
            </p>

            {reviewTopics.map((topic, index) => (
              <div
                key={topic.title}
                className="space-y-2"
              >
                <p className="font-semibold text-foreground">
                  {index + 1}. {topic.title}
                </p>

                <p>{topic.description}</p>
              </div>
            ))}

            <p className="break-words">
              Long accordion panels should remain
              readable at 200% browser zoom and on
              small screens. Content must wrap
              naturally without clipping.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionTrigger>
            Additional notes
          </AccordionTrigger>

          <AccordionContent>
            The Accordion does not introduce an
            artificial content-height limit.
            Long content follows normal document
            flow and page scrolling.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Tests long content, wrapping, natural document height, and readability at narrow viewport widths and 200% zoom. This Accordion does not implement custom animated height or its own scroll container.",
      },
    },
  },
};


// -----------------------------------------
// 11. Keyboard Interaction
// -----------------------------------------

function KeyboardInteractionExample() {
  const noteId = useId();

  const [lastAction, setLastAction] = useState(
    "No action performed.",
  );

  return (
    <div className="w-full max-w-xl space-y-4">
      <p className="text-sm text-muted-foreground">
        Use Tab and Shift+Tab to reach the
        disclosure summaries. Press Enter or
        Space to toggle them. Expanded content
        participates in normal Tab navigation.
      </p>

      <Accordion type="multiple">
        <AccordionItem>
          <AccordionTrigger>
            Keyboard-accessible form
          </AccordionTrigger>

          <AccordionContent>
            <div className="space-y-3">
              <label
                htmlFor={noteId}
                className="block text-sm font-medium text-foreground"
              >
                Test note
              </label>

              <Input
                id={noteId}
                placeholder="Enter a short note"
              />

              <Button
                onClick={() => {
                  setLastAction(
                    "Action inside the expanded panel activated.",
                  );
                }}
              >
                Test inner action
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionTrigger>
            Secondary disclosure
          </AccordionTrigger>

          <AccordionContent>
            This section has no interactive
            content. Its summary should still
            be keyboard accessible.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        variant="outline"
        onClick={() => {
          setLastAction(
            "Action after the Accordion activated.",
          );
        }}
      >
        Button after Accordion
      </Button>

      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        {lastAction}
      </p>
    </div>
  );
}

export const KeyboardInteraction: Story = {
  render: () => <KeyboardInteractionExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Manual keyboard test for native details/summary. Verify Enter and Space activation, visible summary focus, and normal Tab order. When the first disclosure is expanded, its Input and Button are keyboard reachable; after collapsing it, those controls are no longer in the normal Tab sequence. No custom arrow-key behavior is expected.",
      },
    },
  },
};
