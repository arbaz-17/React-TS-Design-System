
import { useId, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Plus } from "lucide-react";

import { Button, Input } from "../../index";

const meta = {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A native, accessible action component with semantic variants, sizes, and a consumer-controlled loading state. Use a link for navigation rather than a button.",
      },
    },
  },

  args: {
    children: "Continue",
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
  },

  argTypes: {
    children: {
      control: "text",
      description: "Visible button content.",
    },

    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "outline",
        "ghost",
        "destructive",
      ],
      description: "Semantic visual intent.",
      table: {
        type: {
          summary:
            "primary | secondary | outline | ghost | destructive",
        },
        defaultValue: { summary: "primary" },
      },
    },

    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
      description: "Button dimensions.",
      table: {
        type: { summary: "sm | md | lg | icon" },
        defaultValue: { summary: "md" },
      },
    },

    loading: {
      control: "boolean",
      description:
        "Shows a spinner, sets aria-busy and disables activation.",
      table: {
        defaultValue: { summary: "false" },
      },
    },

    disabled: {
      control: "boolean",
      description: "Disables native button interaction.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Explore the supported variants, sizes, loading state, and disabled behavior using Storybook controls.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Five semantic appearances. Choose variants based on the importance and intent of an action, not arbitrary colors.",
      },
    },
  },
};


export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button
        size="icon"
        variant="outline"
        aria-label="Add item"
      >
        <Plus aria-hidden="true" className="size-4" />
      </Button>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Small, medium, large and square icon dimensions. All sizes preserve native button behavior.",
      },
    },
  },
};


export const WithIcon: Story = {
  args: {
    children: "Continue",
  },

  render: (args) => (
    <Button {...args}>
      {args.children}
      <ArrowRight aria-hidden="true" className="size-4" />
    </Button>
  ),

  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },

  parameters: {
    docs: {
      description: {
        story:
          "Icons complement visible text. Decorative icons are hidden from assistive technologies.",
      },
    },
  },
};



export const IconOnly: Story = {
  args: {
    size: "icon",
    variant: "outline",
    children: undefined,
    "aria-label": "Add item",
  },

  render: (args) => (
    <Button {...args}>
      <Plus aria-hidden="true" className="size-4" />
    </Button>
  ),

  argTypes: {
    children: { control: false },
    size: { control: false },
    "aria-label": {
      control: "text",
      description: "Accessible name for an icon-only button.",
    },
  },

  parameters: {
    docs: {
      description: {
        story:
          "Icon-only buttons require an accessible name. The icon is decorative; aria-label identifies the action.",
      },
    },
  },
};



export const Disabled: Story = {
  args: {
    children: "Unavailable",
    disabled: true,
  },

  parameters: {
    docs: {
      description: {
        story:
          "A disabled button cannot be activated or reached through normal Tab navigation. Consider focus management when disabling an active control.",
      },
    },
  },
};


export const Loading: Story = {
  args: {
    children: "Saving changes",
    loading: true,
  },

  parameters: {
    docs: {
      description: {
        story:
          "Loading displays a decorative spinner, sets aria-busy, and disables activation. The consuming application must manage progress and completion announcements.",
      },
    },
  },
};


function KeyboardFocusExample() {
  const [message, setMessage] = useState(
    "No action activated yet.",
  );

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Use Tab to focus a button, then Enter or Space to activate it.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={() => setMessage("First button activated.")}
        >
          First action
        </Button>

        <Button
          onClick={() => setMessage("Second button activated.")}
        >
          Second action
        </Button>
      </div>

      <p role="status" className="text-sm text-muted-foreground">
        {message}
      </p>
    </div>
  );
}

export const KeyboardFocus: Story = {
  render: () => <KeyboardFocusExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates native keyboard activation, visible focus indicators, and accessible feedback. Test in the Canvas view.",
      },
    },
  },
};



function FormSubmissionExample() {
  const inputId = useId();
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="max-w-sm space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium"
        >
          Project name
        </label>

        <Input
          id={inputId}
          name="projectName"
          defaultValue="Design System"
          required
        />
      </div>

      <Button type="submit">Create project</Button>

      <p role="status" className="text-sm text-muted-foreground">
        {submitted
          ? "Form submitted successfully."
          : "Submit the form to see confirmation."}
      </p>
    </form>
  );
}

export const FormSubmission: Story = {
  render: () => <FormSubmissionExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Buttons default to type="button". Set type="submit" when the button should submit a form. This example demonstrates native form submission without a backend.',
      },
    },
  },
};
