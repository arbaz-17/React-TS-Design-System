
import { useId, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Activity,
  ArrowRight,
  BarChart3,
  FolderKanban,
  Settings2,
  Users,
} from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../index";

const meta = {
  title: "Interactive/Tabs",
  component: Tabs,
  tags: ["autodocs"],

  parameters: {
    layout: "centered",

    docs: {
      description: {
        component:
          "A compositional, horizontal Tabs family built with React Context and native HTML elements. Supports controlled and uncontrolled selection, automatic activation during keyboard navigation, roving tabIndex, disabled triggers, generated ARIA relationships, and persistent mounted panels. Consumers provide matching trigger and panel values, an accessible tablist name, and an initially selected enabled tab.",
      },
    },
  },

  args: {
    defaultValue: "overview",
    className: "w-full max-w-2xl",
  },

  argTypes: {
    defaultValue: {
      control: "select",
      options: [
        "overview",
        "activity",
        "settings",
      ],
      description:
        "Initial selection for uncontrolled Tabs.",
    },

    value: {
      control: false,
      description:
        "Controlled selection. Requires onValueChange.",
    },

    onValueChange: {
      control: false,
      description:
        "Called when the selected value changes.",
    },

    className: {
      control: "text",
      description:
        "Additional classes for the root container.",
    },

    children: {
      control: false,
      description:
        "Composable tablist, triggers, and panels.",
    },

    ref: {
      control: false,
      description:
        "Optional native HTMLDivElement ref.",
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs
      key={args.defaultValue ?? "overview"}
      defaultValue={
        args.defaultValue ?? "overview"
      }
      className={args.className}
    >
      <TabsList aria-label="Project sections">
        <TabsTrigger value="overview">
          Overview
        </TabsTrigger>

        <TabsTrigger value="activity">
          Activity
        </TabsTrigger>

        <TabsTrigger value="settings">
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">
            Project overview
          </h3>

          <p className="text-sm leading-6 text-muted-foreground">
            View general project information,
            ownership, and current progress.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="activity">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">
            Recent activity
          </h3>

          <p className="text-sm leading-6 text-muted-foreground">
            Review recent changes and updates
            across the project.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="settings">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">
            Project settings
          </h3>

          <p className="text-sm leading-6 text-muted-foreground">
            Configure project preferences
            and related options.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "Basic uncontrolled Tabs composition. Use Storybook controls to change the initial selection and root classes. Changing defaultValue remounts the example because uncontrolled state is initialized only once.",
      },
    },
  },
};


function ControlledExample() {
  const [active, setActive] =
    useState("overview");

  return (
    <div className="w-full max-w-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Selection is managed by React state.
        </p>

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setActive("settings");
          }}
        >
          <Settings2
            aria-hidden="true"
            className="size-4"
          />
          Select Settings
        </Button>
      </div>

      <Tabs
        value={active}
        onValueChange={setActive}
      >
        <TabsList aria-label="Controlled project sections">
          <TabsTrigger value="overview">
            Overview
          </TabsTrigger>

          <TabsTrigger value="activity">
            Activity
          </TabsTrigger>

          <TabsTrigger value="settings">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <p className="text-sm leading-6 text-muted-foreground">
            General project information.
          </p>
        </TabsContent>

        <TabsContent value="activity">
          <p className="text-sm leading-6 text-muted-foreground">
            Recent project updates and changes.
          </p>
        </TabsContent>

        <TabsContent value="settings">
          <p className="text-sm leading-6 text-muted-foreground">
            Project configuration settings.
          </p>
        </TabsContent>
      </Tabs>

      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        Selected value:{" "}
        <span className="font-medium text-foreground">
          {active}
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
          "Demonstrates controlled selection using value and onValueChange. The selected tab can change through keyboard or pointer interaction, or through an external button.",
      },
    },
  },
};


function KeyboardNavigationExample() {
  const [selected, setSelected] =
    useState("overview");

  return (
    <div className="w-full max-w-xl space-y-4">
      <p className="text-sm leading-6 text-muted-foreground">
        Focus the active tab, then use ArrowLeft,
        ArrowRight, Home, and End. The disabled
        Billing tab is skipped. Press Tab to
        move into the active panel.
      </p>

      <Tabs
        value={selected}
        onValueChange={setSelected}
      >
        <TabsList aria-label="Keyboard navigation example">
          <TabsTrigger value="overview">
            Overview
          </TabsTrigger>

          <TabsTrigger value="activity">
            Activity
          </TabsTrigger>

          <TabsTrigger
            value="billing"
            disabled
          >
            Billing
          </TabsTrigger>

          <TabsTrigger value="settings">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <p className="text-sm leading-6 text-muted-foreground">
            Overview panel. This panel can
            receive keyboard focus.
          </p>
        </TabsContent>

        <TabsContent value="activity">
          <p className="text-sm leading-6 text-muted-foreground">
            Activity panel. Navigate back
            to Overview or forward to Settings.
          </p>
        </TabsContent>

        <TabsContent value="billing">
          <p className="text-sm leading-6 text-muted-foreground">
            Billing is currently unavailable.
          </p>
        </TabsContent>

        <TabsContent value="settings">
          <p className="text-sm leading-6 text-muted-foreground">
            Settings panel. Press ArrowRight
            to wrap back to Overview.
          </p>
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Active tab:{" "}
          <span className="font-medium text-foreground">
            {selected}
          </span>
        </p>

        <Button
          type="button"
          variant="outline"
          size="sm"
        >
          Next focusable control
          <ArrowRight
            aria-hidden="true"
            className="size-4"
          />
        </Button>
      </div>
    </div>
  );
}

export const KeyboardNavigation: Story = {
  render: () => (
    <KeyboardNavigationExample />
  ),

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Tests automatic activation, arrow-key wrapping, Home and End navigation, disabled-tab skipping, and roving tabIndex. The selected panel has tabIndex=0 and a visible keyboard focus indicator. Only the selected enabled tab participates in normal Tab navigation.",
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
            Project navigation
          </h3>
        </div>

        <Tabs defaultValue="overview">
          <TabsList aria-label="Project navigation">
            <TabsTrigger value="overview">
              Overview
            </TabsTrigger>

            <TabsTrigger value="settings">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <p className="text-sm text-muted-foreground">
              Project overview information.
            </p>
          </TabsContent>

          <TabsContent value="settings">
            <p className="text-sm text-muted-foreground">
              Project configuration settings.
            </p>
          </TabsContent>
        </Tabs>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Users
            aria-hidden="true"
            className="size-5 text-muted-foreground"
          />

          <h3 className="text-base font-semibold text-foreground">
            Account navigation
          </h3>
        </div>

        <Tabs defaultValue="settings">
          <TabsList aria-label="Account navigation">
            <TabsTrigger value="overview">
              Overview
            </TabsTrigger>

            <TabsTrigger value="settings">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <p className="text-sm text-muted-foreground">
              Account overview information.
            </p>
          </TabsContent>

          <TabsContent value="settings">
            <p className="text-sm text-muted-foreground">
              Account preferences and settings.
            </p>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  ),

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Two independent Tabs instances reuse the same selection values without sharing state or colliding ARIA IDs. Each Tabs root generates its own ID namespace through React useId.",
      },
    },
  },
};



function CounterPanel() {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Counter value:{" "}
        <span className="font-semibold text-foreground tabular-nums">
          {count}
        </span>
      </p>

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setCount((current) => current + 1);
        }}
      >
        Increment counter
      </Button>
    </div>
  );
}

function PersistentPanelExample() {
  const notesId = useId();

  return (
    <div className="w-full max-w-lg space-y-3">
      <p className="text-sm leading-6 text-muted-foreground">
        Edit the notes, switch to Counter,
        increment it, then switch back.
        Both values should be preserved.
      </p>

      <Tabs defaultValue="notes">
        <TabsList aria-label="Persistent panel state">
          <TabsTrigger value="notes">
            Notes
          </TabsTrigger>

          <TabsTrigger value="counter">
            Counter
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notes">
          <div className="space-y-2">
            <label
              htmlFor={notesId}
              className="block text-sm font-medium text-foreground"
            >
              Project notes
            </label>

            <Input
              id={notesId}
              defaultValue="Initial project notes"
              placeholder="Write some notes..."
            />

            <p className="text-xs text-muted-foreground">
              This input keeps its value
              when the panel is hidden.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="counter">
          <CounterPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export const PersistentPanelState: Story = {
  render: () => <PersistentPanelExample />,

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Inactive panels remain mounted but hidden. Switching tabs preserves both an uncontrolled input's browser-managed value and a child component's React state.",
      },
    },
  },
};

const reportSections = [
  {
    value: "overview",
    label: "Project overview",
  },
  {
    value: "activity",
    label: "Recent activity",
  },
  {
    value: "reports",
    label: "Performance reports",
  },
  {
    value: "inventory",
    label: "Asset inventory",
  },
  {
    value: "settings",
    label: "Workspace settings",
  },
  {
    value: "permissions",
    label: "Roles and permissions",
  },
  {
    value: "audit",
    label: "Audit history",
  },
] as const;

export const HorizontalOverflow: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <p className="text-sm leading-6 text-muted-foreground">
        This tablist is intentionally narrow.
        Use the arrow keys to navigate through
        the longer labels and confirm the
        focused tab remains visible.
      </p>

      <Tabs defaultValue="overview">
        <TabsList aria-label="Scrollable report sections">
          {reportSections.map((section) => (
            <TabsTrigger
              key={section.value}
              value={section.value}
            >
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {reportSections.map((section) => (
          <TabsContent
            key={section.value}
            value={section.value}
          >
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">
                {section.label}
              </h3>

              <p className="text-sm leading-6 text-muted-foreground">
                Content for the{" "}
                {section.label.toLowerCase()} section.
              </p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  ),

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "Combines long tab labels and horizontal overflow in a constrained container. Arrow-key navigation automatically activates the next enabled tab and scrolls it into view. The tablist does not introduce an additional keyboard Tab stop.",
      },
    },
  },
};


export const InsideCard: Story = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          Project dashboard
        </CardTitle>

        <CardDescription>
          Explore project information,
          activity, and team members.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList aria-label="Dashboard sections">
            <TabsTrigger value="overview">
              <BarChart3
                aria-hidden="true"
                className="mr-2 size-4"
              />
              Overview
            </TabsTrigger>

            <TabsTrigger value="activity">
              <Activity
                aria-hidden="true"
                className="mr-2 size-4"
              />
              Activity
            </TabsTrigger>

            <TabsTrigger value="team">
              <Users
                aria-hidden="true"
                className="mr-2 size-4"
              />
              Team
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-3 py-1 sm:grid-cols-2">
              <div className="rounded-surface border border-border bg-muted/30 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Total tasks
                </p>

                <p className="mt-2 text-2xl font-semibold text-foreground tabular-nums">
                  24
                </p>
              </div>

              <div className="rounded-surface border border-border bg-muted/30 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Completed tasks
                </p>

                <p className="mt-2 text-2xl font-semibold text-foreground tabular-nums">
                  18
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="space-y-3 py-1">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-control bg-muted/60">
                  <Activity
                    aria-hidden="true"
                    className="size-4 text-muted-foreground"
                  />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    Components updated
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Recent improvements were made
                    to the component library.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team">
            <div className="space-y-3 py-1">
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted/60 text-xs font-semibold text-foreground">
                  AM
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Alex Morgan
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Project owner
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted/60 text-xs font-semibold text-foreground">
                  SW
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Sam Wilson
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Contributor
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  ),

  parameters: {
    controls: { disable: true },

    docs: {
      description: {
        story:
          "A practical dashboard composition using Tabs inside Card. The Card provides the surrounding surface and context, while Tabs manages selection and accessibility. Lucide icons are decorative and do not replace visible tab labels.",
      },
    },
  },
};
