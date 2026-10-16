
import { useId, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Button,
  Checkbox,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  Input,
  Select,
  Switch,
  Textarea,
} from "../../index";


const meta = {
  title: "Composites/FormField",
  component: FormField,
  tags: ["autodocs"],

  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A lightweight, compositional form-field structure with FormField, FormLabel, FormDescription, and FormMessage. Components preserve native HTML props and refs. Consumers manage control values, validation, IDs, accessibility relationships, and submission behavior. FormField does not use internal state, Context, or automatic prop injection.",
      },
    },
  },

  args: {
    className: "w-full max-w-sm",
  },

  argTypes: {
    className: {
      control: "text",
      description:
        "Additional CSS classes applied to the FormField root.",
    },

    children: {
      control: false,
      description:
        "Composable labels, controls, descriptions, and messages.",
    },

    ref: {
      control: false,
      description:
        "Optional ref to the native HTMLDivElement.",
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

function DefaultExample({
  className,
}: {
  className?: string;
}) {
  const inputId = useId();

  return (
    <FormField className={className}>
      <FormLabel htmlFor={inputId}>
        Project name
      </FormLabel>

      <Input
        id={inputId}
        name="projectName"
        placeholder="Enter project name"
      />
    </FormField>
  );
}

export const Default: Story = {
  render: (args) => (
    <DefaultExample className={args.className} />
  ),

  parameters: {
    docs: {
      description: {
        story:
          "Basic FormField composition using a label and input. The label is associated with the input through htmlFor and id. Use Storybook controls to customize the root layout.",
      },
    },
  },
};


function RequiredFieldExample() {
  const inputId = useId();
  const descriptionId = useId();

  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="w-full max-w-sm space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <p className="text-xs text-muted-foreground">
        Fields marked with * are required.
      </p>

      <FormField>
        <FormLabel
          htmlFor={inputId}
          requiredIndicator
        >
          Email address
        </FormLabel>

        <Input
          id={inputId}
          name="email"
          type="email"
          required
          placeholder="name@example.com"
          aria-describedby={descriptionId}
          onChange={() => setSubmitted(false)}
        />

        <FormDescription id={descriptionId}>
          Enter a valid email address.
        </FormDescription>
      </FormField>

      <Button type="submit">
        Submit
      </Button>

      <p
        role="status"
        className="text-sm text-success"
      >
        {submitted
          ? "Form submitted successfully."
          : ""}
      </p>
    </form>
  );
}

export const RequiredField: Story = {
  render: () => <RequiredFieldExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates a required field with a visible indicator and native HTML validation. The input receives the required attribute independently of FormLabel's decorative asterisk.",
      },
    },
  },
};



function WithDescriptionExample() {
  const inputId = useId();
  const descriptionId = useId();

  return (
    <FormField className="w-full max-w-sm">
      <FormLabel htmlFor={inputId}>
        Website URL
      </FormLabel>

      <Input
        id={inputId}
        name="website"
        type="url"
        placeholder="https://example.com"
        aria-describedby={descriptionId}
      />

      <FormDescription id={descriptionId}>
        Enter your website address, including
        the https:// prefix.
      </FormDescription>
    </FormField>
  );
}

export const WithDescription: Story = {
  render: () => <WithDescriptionExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates supplementary helper text. The input references FormDescription through aria-describedby, while FormLabel supplies its accessible name.",
      },
    },
  },
};



function InvalidFieldExample() {
  const baseId = useId();

  const inputId = `${baseId}-email`;
  const descriptionId = `${baseId}-description`;
  const errorId = `${baseId}-error`;

  const [email, setEmail] = useState("invalid-email");
  const [invalid, setInvalid] = useState(true);

  return (
    <FormField className="w-full max-w-sm">
      <FormLabel
        htmlFor={inputId}
        requiredIndicator
      >
        Email address
      </FormLabel>

      <Input
        id={inputId}
        name="email"
        type="email"
        required
        value={email}
        aria-invalid={invalid}
        aria-describedby={
          invalid
            ? `${descriptionId} ${errorId}`
            : descriptionId
        }
        onChange={(event) => {
          setEmail(event.currentTarget.value);
          setInvalid(
            !event.currentTarget.validity.valid,
          );
        }}
      />

      <FormDescription id={descriptionId}>
        Enter a valid email address.
      </FormDescription>

      {invalid && (
        <FormMessage id={errorId}>
          Please provide a valid email address.
        </FormMessage>
      )}
    </FormField>
  );
}

export const InvalidField: Story = {
  render: () => <InvalidFieldExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates an invalid input with consumer-managed validation. aria-invalid reflects the current validity state, and aria-describedby connects both helper text and the error message. Enter a valid email address to clear the error.",
      },
    },
  },
};



function ControlTypesExample() {
  const baseId = useId();

  const descriptionId = `${baseId}-description`;
  const categoryId = `${baseId}-category`;
  const categoryHelpId = `${baseId}-category-help`;
  const checkboxId = `${baseId}-checkbox`;
  const checkboxHelpId = `${baseId}-checkbox-help`;
  const switchId = `${baseId}-switch`;
  const switchHelpId = `${baseId}-switch-help`;

  return (
    <div className="w-full max-w-lg space-y-6">
      <FormField>
        <FormLabel htmlFor={descriptionId}>
          Project description
        </FormLabel>

        <Textarea
          id={descriptionId}
          name="description"
          rows={4}
          placeholder="Describe your project..."
        />
      </FormField>

      <FormField>
        <FormLabel htmlFor={categoryId}>
          Category
        </FormLabel>

        <Select
          id={categoryId}
          name="category"
          defaultValue=""
          aria-describedby={categoryHelpId}
        >
          <option value="" disabled>
            Select a category
          </option>

          <option value="website">
            Website
          </option>

          <option value="dashboard">
            Dashboard
          </option>

          <option value="application">
            Application
          </option>
        </Select>

        <FormDescription id={categoryHelpId}>
          Choose the category that best fits
          your project.
        </FormDescription>
      </FormField>

      <FormField>
        <div className="flex items-start gap-3">
          <Checkbox
            id={checkboxId}
            name="weeklyUpdates"
            defaultChecked
            className="mt-0.5"
            aria-describedby={checkboxHelpId}
          />

          <div className="space-y-1">
            <FormLabel htmlFor={checkboxId}>
              Weekly updates
            </FormLabel>

            <FormDescription id={checkboxHelpId}>
              Receive a weekly summary by email.
            </FormDescription>
          </div>
        </div>
      </FormField>

      <FormField>
        <div className="flex items-start gap-3">
          <Switch
            id={switchId}
            name="autoSave"
            defaultChecked
            aria-describedby={switchHelpId}
          />

          <div className="space-y-1">
            <FormLabel htmlFor={switchId}>
              Automatic saving
            </FormLabel>

            <FormDescription id={switchHelpId}>
              Save changes automatically while working.
            </FormDescription>
          </div>
        </div>
      </FormField>
    </div>
  );
}

export const ControlTypes: Story = {
  render: () => <ControlTypesExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates FormField composition with Textarea, Select, Checkbox, and Switch. Text-based controls use vertical layouts, while binary controls use horizontal label and description arrangements.",
      },
    },
  },
};


function DisabledFieldExample() {
  const inputId = useId();
  const descriptionId = useId();

  return (
    <FormField className="w-full max-w-sm">
      <FormLabel htmlFor={inputId}>
        Reference ID
      </FormLabel>

      <Input
        id={inputId}
        name="referenceId"
        defaultValue="PRJ-2026-014"
        disabled
        aria-describedby={descriptionId}
      />

      <FormDescription id={descriptionId}>
        This field is unavailable and cannot
        be edited.
      </FormDescription>
    </FormField>
  );
}

export const DisabledField: Story = {
  render: () => <DisabledFieldExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates a disabled input. The consumer controls the disabled attribute; FormField does not automatically propagate state. Native disabled inputs are excluded from form submission and normal keyboard tab navigation.",
      },
    },
  },
};


function CompleteFormExample() {
  const baseId = useId();

  const nameId = `${baseId}-name`;
  const categoryId = `${baseId}-category`;
  const categoryHelpId = `${baseId}-category-help`;
  const descriptionId = `${baseId}-description`;

  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="w-full max-w-lg space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      onReset={() => setSubmitted(false)}
    >
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-foreground">
          Create project
        </h3>

        <p className="text-sm text-muted-foreground">
          Enter the basic information for your
          new project.
        </p>
      </div>

      <p className="text-xs text-muted-foreground">
        Fields marked with * are required.
      </p>

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
          placeholder="Enter project name"
          required
          onChange={() => setSubmitted(false)}
        />
      </FormField>

      <FormField>
        <FormLabel
          htmlFor={categoryId}
          requiredIndicator
        >
          Category
        </FormLabel>

        <Select
          id={categoryId}
          name="category"
          defaultValue=""
          required
          aria-describedby={categoryHelpId}
          onChange={() => setSubmitted(false)}
        >
          <option value="" disabled>
            Select a category
          </option>

          <option value="website">
            Website
          </option>

          <option value="dashboard">
            Dashboard
          </option>

          <option value="application">
            Application
          </option>
        </Select>

        <FormDescription id={categoryHelpId}>
          Choose the category that best describes
          your project.
        </FormDescription>
      </FormField>

      <FormField>
        <FormLabel htmlFor={descriptionId}>
          Description
        </FormLabel>

        <Textarea
          id={descriptionId}
          name="description"
          rows={4}
          placeholder="Describe your project..."
          onChange={() => setSubmitted(false)}
        />

        <FormDescription>
          Optional. Provide a short project summary.
        </FormDescription>
      </FormField>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="submit">
          Create project
        </Button>

        <Button
          type="reset"
          variant="outline"
        >
          Reset
        </Button>
      </div>

      <p
        role="status"
        className="text-sm text-success"
      >
        {submitted
          ? "Project created successfully."
          : ""}
      </p>
    </form>
  );
}

export const CompleteForm: Story = {
  render: () => <CompleteFormExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A practical form composed from independent FormField instances. Demonstrates required inputs, helper text, native validation, and consumer-managed submission state. The form operates locally without a backend.",
      },
    },
  },
};
