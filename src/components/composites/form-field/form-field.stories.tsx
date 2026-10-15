
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

// -----------------------------------------
// Storybook metadata
// -----------------------------------------

const meta = {
  title: "Composites/FormField",
  component: FormField,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A lightweight, compositional form-field structure with FormField, FormLabel, FormDescription, and FormMessage. All four components preserve native HTML props and refs. Consumers own control values, validation, IDs, aria-describedby relationships, and submission behavior. FormField does not use internal state, Context, or automatic prop injection.",
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
        "Optional ref to the native root HTMLDivElement.",
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

// -----------------------------------------
// 1. Default Input Field
// -----------------------------------------

function DefaultInputExample({
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
        placeholder="Enter a project name"
      />
    </FormField>
  );
}

export const DefaultInputField: Story = {
  render: (args) => (
    <DefaultInputExample className={args.className} />
  ),

  parameters: {
    docs: {
      description: {
        story:
          "Basic composition using FormField, FormLabel, and Input. The label is explicitly associated with the input using htmlFor and id. Use the className control to explore root layout customization.",
      },
    },
  },
};

// -----------------------------------------
// 2. Required Field
// -----------------------------------------

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
          A valid email address is required.
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
          "FormLabel's requiredIndicator adds a decorative asterisk. The actual Input must independently receive required. Native validation blocks empty or malformed email submissions.",
      },
    },
  },
};

// -----------------------------------------
// 3. With Description
// -----------------------------------------

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
        Enter the public URL of your project.
        Include the https:// prefix.
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
          "FormDescription provides supplementary instructions. The input explicitly references the description ID through aria-describedby. The visible label supplies the accessible name.",
      },
    },
  },
};

// -----------------------------------------
// 4. Invalid Field With Error
// -----------------------------------------

function InvalidFieldExample() {
  const baseId = useId();

  const inputId = `${baseId}-email`;
  const descriptionId = `${baseId}-help`;
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

export const InvalidFieldWithError: Story = {
  render: () => <InvalidFieldExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates consumer-managed validation using native input validity. The error message is conditionally rendered, aria-invalid reflects the current state, and aria-describedby references both the description and error while invalid. Enter a browser-valid email address to clear the error.",
      },
    },
  },
};

// -----------------------------------------
// 5. Textarea Field
// -----------------------------------------

function TextareaFieldExample() {
  const textareaId = useId();
  const descriptionId = useId();

  return (
    <FormField className="w-full max-w-lg">
      <FormLabel htmlFor={textareaId}>
        Project description
      </FormLabel>

      <Textarea
        id={textareaId}
        name="description"
        rows={5}
        placeholder="Describe your project..."
        aria-describedby={descriptionId}
      />

      <FormDescription id={descriptionId}>
        Explain the main purpose, features, and
        expected behavior of your project.
      </FormDescription>
    </FormField>
  );
}

export const TextareaField: Story = {
  render: () => <TextareaFieldExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "FormField works with the native Textarea primitive. The multiline input receives its accessible label and supplementary description through explicit HTML relationships.",
      },
    },
  },
};

// -----------------------------------------
// 6. Select Field
// -----------------------------------------

function SelectFieldExample() {
  const selectId = useId();
  const descriptionId = useId();

  return (
    <FormField className="w-full max-w-sm">
      <FormLabel
        htmlFor={selectId}
        requiredIndicator
      >
        Project category
      </FormLabel>

      <Select
        id={selectId}
        name="category"
        defaultValue=""
        required
        aria-describedby={descriptionId}
      >
        <option value="" disabled>
          Choose a category
        </option>

        <option value="design-system">
          Design System
        </option>

        <option value="dashboard">
          Dashboard
        </option>

        <option value="website">
          Website
        </option>
      </Select>

      <FormDescription id={descriptionId}>
        Select the category that best describes
        the project.
      </FormDescription>
    </FormField>
  );
}

export const SelectField: Story = {
  render: () => <SelectFieldExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates FormField with a native single-select control. The consumer supplies the options, empty-value prompt, native required attribute, and accessible associations.",
      },
    },
  },
};

// -----------------------------------------
// 7. Checkbox Field
// -----------------------------------------

function CheckboxFieldExample() {
  const checkboxId = useId();
  const descriptionId = useId();

  return (
    <FormField className="w-full max-w-md">
      <div className="flex items-start gap-3">
        <Checkbox
          id={checkboxId}
          name="weeklyUpdates"
          defaultChecked
          className="mt-0.5"
          aria-describedby={descriptionId}
        />

        <div className="space-y-1">
          <FormLabel htmlFor={checkboxId}>
            Weekly project updates
          </FormLabel>

          <FormDescription id={descriptionId}>
            Receive a weekly email with
            important project activity.
          </FormDescription>
        </div>
      </div>
    </FormField>
  );
}

export const CheckboxField: Story = {
  render: () => <CheckboxFieldExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "FormField can arrange a Checkbox and its label horizontally using ordinary Tailwind layout classes. Clicking the label toggles the native checkbox. The description is linked through aria-describedby.",
      },
    },
  },
};

// -----------------------------------------
// 8. Switch Field
// -----------------------------------------

function SwitchFieldExample() {
  const switchId = useId();
  const descriptionId = useId();

  return (
    <FormField className="w-full max-w-md">
      <div className="flex items-start gap-3">
        <Switch
          id={switchId}
          name="automaticSaving"
          defaultChecked
          aria-describedby={descriptionId}
        />

        <div className="space-y-1">
          <FormLabel htmlFor={switchId}>
            Automatic saving
          </FormLabel>

          <FormDescription id={descriptionId}>
            Automatically save changes while
            working on your project.
          </FormDescription>
        </div>
      </div>
    </FormField>
  );
}

export const SwitchField: Story = {
  render: () => <SwitchFieldExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates an on/off setting using the existing native-checkbox-backed Switch. FormField provides layout and labeling without changing Switch semantics or managing its state.",
      },
    },
  },
};

// -----------------------------------------
// 9. Disabled Control
// -----------------------------------------

function DisabledControlExample() {
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

export const DisabledControl: Story = {
  render: () => <DisabledControlExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Disabling the control is the consumer's responsibility. FormField does not automatically propagate disabled state. Native disabled inputs cannot be edited or reached through normal Tab navigation and are excluded from FormData.",
      },
    },
  },
};

// -----------------------------------------
// 10. Multiple Independent Fields
// -----------------------------------------

type ProjectFormResult = {
  projectName: string;
  category: string;
  notes: string;
};

function MultipleFieldsExample() {
  const baseId = useId();

  const nameId = `${baseId}-name`;
  const categoryId = `${baseId}-category`;
  const categoryHelpId = `${baseId}-category-help`;
  const notesId = `${baseId}-notes`;
  const notesHelpId = `${baseId}-notes-help`;

  const [result, setResult] =
    useState<ProjectFormResult | null>(null);

  return (
    <form
      className="w-full max-w-lg space-y-5"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(
          event.currentTarget,
        );

        setResult({
          projectName: String(
            formData.get("projectName") ?? "",
          ),
          category: String(
            formData.get("category") ?? "",
          ),
          notes: String(
            formData.get("notes") ?? "",
          ),
        });
      }}
      onReset={() => setResult(null)}
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
          placeholder="My new project"
          required
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
        >
          <option value="" disabled>
            Select a category
          </option>

          <option value="component-library">
            Component Library
          </option>

          <option value="website">
            Website
          </option>

          <option value="dashboard">
            Dashboard
          </option>
        </Select>

        <FormDescription id={categoryHelpId}>
          Choose the project's primary category.
        </FormDescription>
      </FormField>

      <FormField>
        <FormLabel htmlFor={notesId}>
          Additional notes
        </FormLabel>

        <Textarea
          id={notesId}
          name="notes"
          rows={4}
          placeholder="Optional information..."
          aria-describedby={notesHelpId}
        />

        <FormDescription id={notesHelpId}>
          This field is optional.
        </FormDescription>
      </FormField>

      <div className="flex flex-wrap gap-3">
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

      <div
        role="status"
        className="text-sm text-foreground"
      >
        {result && (
          <div className="space-y-2 rounded-surface border border-border bg-card p-4">
            <p className="font-semibold">
              Project submitted locally
            </p>

            <p>Name: {result.projectName}</p>
            <p>Category: {result.category}</p>
            <p>
              Notes: {result.notes || "None provided"}
            </p>
          </div>
        )}
      </div>
    </form>
  );
}

export const MultipleIndependentFields: Story = {
  render: () => <MultipleFieldsExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A realistic form composed from independent FormField instances. Every field receives stable unique IDs and appropriate native attributes. HTML constraint validation runs before submission, and FormData reads the values. The result is displayed locally without a backend or external form library.",
      },
    },
  },
};
