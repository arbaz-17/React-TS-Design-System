import { useId, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

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

// -----------------------------------------
// Storybook metadata
// -----------------------------------------

const meta = {
  title: "Interactive/Tabs",
  component: Tabs,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A custom React Context-based horizontal Tabs family containing Tabs, TabsList, TabsTrigger, and TabsContent. Supports controlled and uncontrolled selection, automatic activation during arrow-key navigation, roving tabIndex, disabled triggers, generated ARIA relationships, and persistent mounted panels. Consumers must provide matching values and an accessible tablist name.",
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
      options: ["overview", "activity", "settings"],
      description: "Initial selection for uncontrolled Tabs.",
    },

    value: {
      control: false,
      description: "Controlled selection. Requires onValueChange.",
    },

    onValueChange: {
      control: false,
      description: "Called when the selected value changes.",
    },

    className: {
      control: "text",
      description: "Additional classes for the root container.",
    },

    children: {
      control: false,
      description: "Composable tablist, triggers, and content panels.",
    },

    ref: {
      control: false,
      description: "Optional native HTMLDivElement ref.",
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

// -----------------------------------------
// 1. Default
// -----------------------------------------

export const Default: Story = {
  render: (args) => (
    <Tabs
      key={args.defaultValue ?? "overview"}
      defaultValue={args.defaultValue ?? "overview"}
      className={args.className}
    >
      <TabsList aria-label="Project sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>

        <TabsTrigger value="activity">Activity</TabsTrigger>

        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <p className="text-sm leading-6">
          View the project's general information.
        </p>
      </TabsContent>

      <TabsContent value="activity">
        <p className="text-sm leading-6">Review recent project activity.</p>
      </TabsContent>

      <TabsContent value="settings">
        <p className="text-sm leading-6">Configure project preferences.</p>
      </TabsContent>
    </Tabs>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "Basic three-tab composition. Use controls to explore the initial selected value and root styling. Changing defaultValue remounts the example because uncontrolled selection is initialized only once.",
      },
    },
  },
};

// -----------------------------------------
// 2. Controlled
// -----------------------------------------

function ControlledExample() {
  const [active, setActive] = useState("overview");

  return (
    <div className="w-full max-w-lg space-y-4">
      <Button variant="outline" onClick={() => setActive("settings")}>
        Select Settings externally
      </Button>

      <Tabs value={active} onValueChange={setActive}>
        <TabsList aria-label="Controlled project sections">
          <TabsTrigger value="overview">Overview</TabsTrigger>

          <TabsTrigger value="activity">Activity</TabsTrigger>

          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          Project overview information.
        </TabsContent>

        <TabsContent value="activity">Recent project activity.</TabsContent>

        <TabsContent value="settings">
          Project configuration settings.
        </TabsContent>
      </Tabs>

      <p role="status" className="text-sm text-muted-foreground">
        Selected value:{" "}
        <span className="font-medium text-foreground">{active}</span>
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
          "React owns the selected value through value and onValueChange. Selection can change through tab interaction or through an external control.",
      },
    },
  },
};

// -----------------------------------------
// 3. Uncontrolled
// -----------------------------------------

function UncontrolledExample() {
  const [lastChange, setLastChange] = useState("No selection change yet.");

  return (
    <div className="w-full max-w-lg space-y-4">
      <Tabs
        defaultValue="activity"
        onValueChange={(nextValue) => {
          setLastChange(`Selection changed to: ${nextValue}`);
        }}
      >
        <TabsList aria-label="Uncontrolled project sections">
          <TabsTrigger value="overview">Overview</TabsTrigger>

          <TabsTrigger value="activity">Activity</TabsTrigger>

          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">Project summary.</TabsContent>

        <TabsContent value="activity">
          Recent activity is shown initially.
        </TabsContent>

        <TabsContent value="settings">Project settings.</TabsContent>
      </Tabs>

      <p role="status" className="text-sm text-muted-foreground">
        {lastChange}
      </p>
    </div>
  );
}

export const Uncontrolled: Story = {
  render: () => <UncontrolledExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Tabs manages its own selection through defaultValue. The optional onValueChange callback observes changes without controlling the component.",
      },
    },
  },
};

// -----------------------------------------
// 4. Disabled Tab
// -----------------------------------------

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-full max-w-lg">
      <TabsList aria-label="Workspace sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>

        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>

        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">General workspace information.</TabsContent>

      <TabsContent value="billing">
        Billing information is unavailable.
      </TabsContent>

      <TabsContent value="team">Manage workspace team members.</TabsContent>
    </Tabs>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "The disabled Billing tab cannot be activated and is skipped during arrow navigation. The initially selected value remains an existing enabled tab.",
      },
    },
  },
};

// -----------------------------------------
// 5. Keyboard Navigation
// -----------------------------------------

function KeyboardNavigationExample() {
  const [selected, setSelected] = useState("overview");

  return (
    <div className="w-full max-w-xl space-y-4">
      <p className="text-sm text-muted-foreground">
        Focus the selected tab. Use ArrowLeft, ArrowRight, Home, and End to
        navigate. The disabled tab is skipped.
      </p>

      <Tabs value={selected} onValueChange={setSelected}>
        <TabsList aria-label="Keyboard navigation example">
          <TabsTrigger value="overview">Overview</TabsTrigger>

          <TabsTrigger value="activity">Activity</TabsTrigger>

          <TabsTrigger value="billing" disabled>
            Billing
          </TabsTrigger>

          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">Overview panel.</TabsContent>

        <TabsContent value="activity">Activity panel.</TabsContent>

        <TabsContent value="billing">Unavailable billing panel.</TabsContent>

        <TabsContent value="settings">Settings panel.</TabsContent>
      </Tabs>

      <p className="text-sm text-muted-foreground">
        Active tab:{" "}
        <span className="font-medium text-foreground">{selected}</span>
      </p>
    </div>
  );
}

export const KeyboardNavigation: Story = {
  render: () => <KeyboardNavigationExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates horizontal keyboard navigation with automatic activation, wrapping, disabled-tab skipping, and roving tabIndex. ArrowUp and ArrowDown do not change selection. Only the selected enabled trigger participates in normal Tab navigation.",
      },
    },
  },
};

// -----------------------------------------
// 6. Multiple Instances
// -----------------------------------------

export const MultipleInstances: Story = {
  render: () => (
    <div className="grid w-full max-w-2xl gap-8">
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Project navigation</h2>

        <Tabs defaultValue="overview">
          <TabsList aria-label="Project navigation">
            <TabsTrigger value="overview">Overview</TabsTrigger>

            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">Project overview.</TabsContent>

          <TabsContent value="settings">Project settings.</TabsContent>
        </Tabs>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Account navigation</h2>

        <Tabs defaultValue="settings">
          <TabsList aria-label="Account navigation">
            <TabsTrigger value="overview">Overview</TabsTrigger>

            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">Account overview.</TabsContent>

          <TabsContent value="settings">Account settings.</TabsContent>
        </Tabs>
      </section>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Two independent Tabs instances reuse the same selection values. React useId generates separate ID namespaces, so aria-controls and aria-labelledby relationships do not collide.",
      },
    },
  },
};

// -----------------------------------------
// 7. Persistent Panel State
// -----------------------------------------

function CounterPanel() {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-3">
      <p className="text-sm">Counter: {count}</p>

      <Button onClick={() => setCount((n) => n + 1)}>Increment counter</Button>
    </div>
  );
}

function PersistentPanelExample() {
  const notesId = useId();

  return (
    <Tabs defaultValue="notes" className="w-full max-w-lg">
      <TabsList aria-label="Persistent panel examples">
        <TabsTrigger value="notes">Notes</TabsTrigger>

        <TabsTrigger value="counter">Counter</TabsTrigger>
      </TabsList>

      <TabsContent value="notes">
        <div className="space-y-2">
          <label htmlFor={notesId} className="block text-sm font-medium">
            Project notes
          </label>

          <Input id={notesId} defaultValue="Initial notes" />
        </div>
      </TabsContent>

      <TabsContent value="counter">
        <CounterPanel />
      </TabsContent>
    </Tabs>
  );
}

export const PersistentPanelState: Story = {
  render: () => <PersistentPanelExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Inactive panels remain mounted but hidden. Edit the Notes input, switch to Counter, increment it, and return to Notes. Both the browser-managed input value and React counter state should remain intact.",
      },
    },
  },
};

// -----------------------------------------
// 8. Long Labels
// -----------------------------------------

export const LongLabels: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-full max-w-sm">
      <TabsList aria-label="Long project section labels">
        <TabsTrigger value="overview">General project overview</TabsTrigger>

        <TabsTrigger value="permissions">Roles and permissions</TabsTrigger>

        <TabsTrigger value="configuration">Advanced configuration</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">General project information.</TabsContent>

      <TabsContent value="permissions">
        Role and permission settings.
      </TabsContent>

      <TabsContent value="configuration">
        Advanced project configuration.
      </TabsContent>
    </Tabs>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Tests descriptive tab labels within a constrained width. TabsList supports horizontal overflow instead of squeezing or wrapping tab buttons. Verify label readability and focus visibility.",
      },
    },
  },
};

// -----------------------------------------
// 9. Horizontal Overflow
// -----------------------------------------

const reportSections = [
  { value: "overview", label: "Overview" },
  { value: "activity", label: "Activity" },
  { value: "reports", label: "Reports" },
  { value: "inventory", label: "Inventory" },
  { value: "settings", label: "Settings" },
  { value: "permissions", label: "Permissions" },
  { value: "audit", label: "Audit history" },
] as const;

export const HorizontalOverflow: Story = {
  render: () => (
    <div className="w-full max-w-xs space-y-4">
      <p className="text-sm text-muted-foreground">
        Focus Overview and use the arrow keys to navigate across all seven tabs.
      </p>

      <Tabs defaultValue="overview">
        <TabsList aria-label="Scrollable report sections">
          {reportSections.map((section) => (
            <TabsTrigger key={section.value} value={section.value}>
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {reportSections.map((section) => (
          <TabsContent key={section.value} value={section.value}>
            <p className="text-sm">Content for {section.label}.</p>
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
          "Demonstrates horizontal tablist scrolling with seven tabs in a narrow container. Keyboard focus should remain visible as ArrowRight, ArrowLeft, Home, and End move between tabs. The tablist itself is not an additional Tab stop.",
      },
    },
  },
};

// -----------------------------------------
// 10. Tabs Inside Card
// -----------------------------------------

export const TabsInsideCard: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <h2 className="sr-only">Project details example</h2>

      <Card>
        <CardHeader>
          <CardTitle>Project details</CardTitle>

          <CardDescription>
            View the project's summary and settings.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="summary">
            <TabsList aria-label="Project detail sections">
              <TabsTrigger value="summary">Summary</TabsTrigger>

              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="summary">
              <p className="text-sm leading-6">
                This project contains reusable UI components with strongly typed
                APIs.
              </p>
            </TabsContent>

            <TabsContent value="settings">
              <p className="text-sm leading-6">
                Project configuration is managed separately from the Tabs
                component.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates Tabs inside CardContent. Both component families retain their independent responsibilities. Card supplies the content surface, while Tabs manages panel selection and keyboard interaction.",
      },
    },
  },
};

// -----------------------------------------
// 11. Focusable Panels
// -----------------------------------------

export const FocusablePanels: Story = {
  render: () => (
    <div className="w-full max-w-lg space-y-4">
      <p className="text-sm text-muted-foreground">
        Press Tab from the active tab to focus its content panel. The panel has
        its own visible focus indicator.
      </p>

      <Tabs defaultValue="summary">
        <TabsList aria-label="Focusable documentation panels">
          <TabsTrigger value="summary">Summary</TabsTrigger>

          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <p className="text-sm leading-6">
            This panel has no interactive child controls. The panel itself is
            focusable.
          </p>
        </TabsContent>

        <TabsContent value="details">
          <p className="text-sm leading-6">
            Hidden panels are not available in the normal keyboard focus
            sequence.
          </p>
        </TabsContent>
      </Tabs>

      <Button variant="outline">Next focusable control</Button>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "TabsContent has tabIndex=0, allowing keyboard users to focus panels even when they contain no interactive children. Test the Tab sequence from the selected trigger to its panel, then to the next button. Inactive panels must remain hidden and unfocusable through normal keyboard navigation.",
      },
    },
  },
};
