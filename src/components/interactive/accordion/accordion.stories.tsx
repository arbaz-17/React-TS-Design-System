
import { useId, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  CheckCircle2,
  FolderKanban,
  Keyboard,
  Mail,
  Settings2,
  ShieldCheck,
} from "lucide-react";

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


const meta = {
  title: "Interactive/Accordion",
  component: Accordion,
  tags: ["autodocs"],

  parameters: {
    layout: "padded",

    docs: {
      description: {
        component:
          "A native-first disclosure family built with HTML details and summary. Accordion supports single-open grouping through the native details name attribute and independent multiple-open disclosures. AccordionItem supports initial expansion with defaultOpen and native onToggle events. Expansion remains browser-managed rather than controlled by React. No custom arrow-key navigation or ARIA accordion-header pattern is implemented.",
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
        "Native grouping mode. Single allows at most one expanded item; multiple allows independent expansion.",
    },

    className: {
      control: "text",
      description:
        "Additional classes for the Accordion root.",
    },

    children: {
      control: false,
      description:
        "Composable AccordionItem elements.",
    },

    ref: {
      control: false,
      description:
        "Optional native HTMLDivElement ref.",
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;


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
          contracts and catch invalid prop
          usage during development.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger>
          Why document components?
        </AccordionTrigger>

        <AccordionContent>
          Documentation explains supported APIs,
          accessibility expectations, usage
          patterns, and composition boundaries.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "The recommended basic composition. Multiple mode allows independent expansion, and the first item starts open through defaultOpen. Use Storybook controls to switch grouping modes and customize the root. Changing type remounts the example to reset its initial disclosure configuration.",
      },
    },
  },
};

export const SingleOpen: Story = {
  render: () => (
    <div className="w-full max-w-xl space-y-3">
      <p className="text-sm leading-6 text-muted-foreground">
        Opening another section automatically
        closes the previously expanded one.
        You can also close every section.
      </p>

      <Accordion type="single">
        <AccordionItem defaultOpen>
          <AccordionTrigger>
            Project overview
          </AccordionTrigger>

          <AccordionContent>
            View general project information,
            ownership, progress, and current status.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionTrigger>
            Team members
          </AccordionTrigger>

          <AccordionContent>
            Review the people assigned to the
            project and their responsibilities.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionTrigger>
            Project settings
          </AccordionTrigger>

          <AccordionContent>
            Manage project preferences,
            configuration, and access.
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
          "Demonstrates native exclusive grouping using type='single'. Accordion generates a shared name for its details elements, allowing at most one expanded item. The group can also have zero expanded items; one item is not required to remain open.",
      },
    },
  },
};

function RichContentExample() {
  const emailId = useId();

  const [savedEmail, setSavedEmail] =
    useState<string | null>(null);

  return (
    <div className="w-full max-w-xl space-y-4">
      <Accordion type="multiple">
        <AccordionItem defaultOpen>
          <AccordionTrigger>
            Publishing checklist
          </AccordionTrigger>

          <AccordionContent className="space-y-4">
            <p>
              Complete the following checks before
              publishing your component library.
            </p>

            <ul className="space-y-3">
              {[
                "Verify component API compatibility.",
                "Test keyboard interactions.",
                "Review responsive layouts.",
                "Confirm production builds pass.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-muted-foreground"
                  />

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionTrigger>
            Subscribe to project updates
          </AccordionTrigger>

          <AccordionContent>
            <form
              className="space-y-3"
              onSubmit={(event) => {
                event.preventDefault();

                const formData = new FormData(
                  event.currentTarget,
                );

                const email = String(
                  formData.get("email") ?? "",
                ).trim();

                if (!email) return;

                setSavedEmail(email);
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
                <Mail
                  aria-hidden="true"
                  className="size-4"
                />
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
          "Demonstrates rich content inside native disclosures, including lists, Lucide icons, form fields, and buttons. Interactive controls belong inside AccordionContent rather than AccordionTrigger. Form validation and submission remain consumer responsibilities.",
      },
    },
  },
};


export const MultipleInstances: Story = {
  render: () => (
    <div className="grid w-full max-w-2xl gap-8">
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <FolderKanban
            aria-hidden="true"
            className="size-5 text-muted-foreground"
          />

          <h3 className="text-base font-semibold text-foreground">
            Project settings
          </h3>
        </div>

        <Accordion type="single">
          <AccordionItem defaultOpen>
            <AccordionTrigger>
              General
            </AccordionTrigger>

            <AccordionContent>
              General project information
              and configuration.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            <AccordionTrigger>
              Access
            </AccordionTrigger>

            <AccordionContent>
              Project member access
              and permissions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Settings2
            aria-hidden="true"
            className="size-5 text-muted-foreground"
          />

          <h3 className="text-base font-semibold text-foreground">
            Account settings
          </h3>
        </div>

        <Accordion type="single">
          <AccordionItem defaultOpen>
            <AccordionTrigger>
              General
            </AccordionTrigger>

            <AccordionContent>
              Account profile information
              and preferences.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            <AccordionTrigger>
              Access
            </AccordionTrigger>

            <AccordionContent>
              Account security and
              access preferences.
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
          "Demonstrates two independent single-open Accordion instances. Each root generates its own native details group name with useId. Opening an item in one Accordion does not collapse items in the other, even when labels are identical.",
      },
    },
  },
};

export const InsideCard: Story = {
  render: () => (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>
          Frequently asked questions
        </CardTitle>

        <CardDescription>
          Learn more about the component
          library and its architecture.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Accordion type="single">
          <AccordionItem>
            <AccordionTrigger>
              Which technologies are used?
            </AccordionTrigger>

            <AccordionContent>
              The library uses React,
              TypeScript, Tailwind CSS,
              and Storybook.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            <AccordionTrigger>
              How are components documented?
            </AccordionTrigger>

            <AccordionContent>
              Each component family provides
              focused Storybook examples
              and usage guidance.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            <AccordionTrigger>
              How is accessibility reviewed?
            </AccordionTrigger>

            <AccordionContent>
              Through semantic HTML, keyboard
              testing, focus checks, and
              manual accessibility review.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            <AccordionTrigger>
              What about browser support?
            </AccordionTrigger>

            <AccordionContent>
              Native details and summary provide
              disclosure behavior. Single-open
              grouping additionally depends
              on browser support for the
              details name attribute.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  ),

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Demonstrates Accordion inside the existing Card family. Card provides the surrounding surface and heading, while Accordion manages native disclosures and exclusive grouping. No integration-specific props are required.",
      },
    },
  },
};


function KeyboardInteractionExample() {
  const noteId = useId();

  const [lastAction, setLastAction] =
    useState("No action performed.");

  return (
    <div className="w-full max-w-xl space-y-4">
      <div className="flex items-start gap-3">
        <Keyboard
          aria-hidden="true"
          className="mt-0.5 size-5 shrink-0 text-muted-foreground"
        />

        <p className="text-sm leading-6 text-muted-foreground">
          Use Tab and Shift+Tab to reach
          disclosure summaries. Press Enter
          or Space to toggle them, then use
          Tab to reach controls inside an
          expanded section.
        </p>
      </div>

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
                type="button"
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
            <div className="flex items-start gap-2">
              <ShieldCheck
                aria-hidden="true"
                className="mt-1 size-4 shrink-0"
              />

              <p>
                This section has no interactive
                content. Its summary remains
                keyboard accessible.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        type="button"
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
  render: () => (
    <KeyboardInteractionExample />
  ),

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Manual keyboard test for native details and summary. Verify Enter and Space activation, visible summary focus, and normal Tab order. Interactive controls inside an expanded panel should be reachable; collapsed panel controls should not be reachable through normal Tab navigation. Custom arrow-key behavior is not implemented or expected.",
      },
    },
  },
};
