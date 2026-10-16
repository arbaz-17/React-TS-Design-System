
import { useId, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within, expect } from "storybook/test";
import {
  Button,
  Input,
  type InputProps,
  type InputType,
} from "../../index";


type LabeledInputProps = InputProps & {
  label: string;
  description?: string;
};

function LabeledInput({
  label,
  description,
  id,
  "aria-describedby": describedBy,
  ...inputProps
}: LabeledInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${generatedId}-description`;

  const descriptionIds = [
    describedBy,
    description ? descriptionId : undefined,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className="max-w-sm space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-foreground"
      >
        {label}
      </label>

      <Input
        {...inputProps}
        id={inputId}
        aria-describedby={descriptionIds}
      />

      {description && (
        <p
          id={descriptionId}
          className="text-xs text-muted-foreground"
        >
          {description}
        </p>
      )}
    </div>
  );
}


const meta = {
  title: "Primitives/Input",
  component: Input,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A native, type-safe single-line input primitive. Supports seven input types, controlled and uncontrolled values, and native form attributes.",
      },
    },
  },

  args: {
    type: "text",
    placeholder: "Enter a value",
    disabled: false,
    readOnly: false,
    required: false,
  },

  argTypes: {
    type: {
      control: "select",
      options: [
        "text",
        "email",
        "password",
        "search",
        "tel",
        "url",
        "number",
      ],
      description: "Supported native input type.",
      table: {
        type: {
          summary:
            "text | email | password | search | tel | url | number",
        },
        defaultValue: { summary: "text" },
      },
    },

    placeholder: {
      control: "text",
      description: "Supplementary input hint, not a label.",
    },

    disabled: {
      control: "boolean",
      description: "Disables native input interaction.",
    },

    readOnly: {
      control: "boolean",
      description: "Prevents editing while retaining focusability.",
    },

    required: {
      control: "boolean",
      description: "Enables native required-field validation.",
    },

    "aria-invalid": {
      control: "boolean",
      description: "Indicates a validation error to assistive technology.",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
  render: (args) => (
    <LabeledInput
      {...args}
      label="Value"
    />
  ),

  parameters: {
    docs: {
      description: {
        story:
          "Explore the supported input types and native state properties using Storybook controls.",
      },
    },
  },
};


const inputExamples: {
  type: InputType;
  label: string;
  defaultValue: string;
}[] = [
  {
    type: "text",
    label: "Full name",
    defaultValue: "Arbaz Ahmad",
  },
  {
    type: "email",
    label: "Email address",
    defaultValue: "arbaz@example.com",
  },
  {
    type: "password",
    label: "Password",
    defaultValue: "ExamplePassword123",
  },
  {
    type: "search",
    label: "Search projects",
    defaultValue: "Dashboard",
  },
  {
    type: "tel",
    label: "Phone number",
    defaultValue: "+92 300 1234567",
  },
  {
    type: "url",
    label: "Website",
    defaultValue: "https://example.com",
  },
  {
    type: "number",
    label: "Amount",
    defaultValue: "25",
  },
];

export const SupportedTypes: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-5 sm:grid-cols-2">
      {inputExamples.map((example) => (
        <LabeledInput
          key={example.type}
          type={example.type}
          label={example.label}
          defaultValue={example.defaultValue}
        />
      ))}
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "All seven supported native input types.",
      },
    },
  },
};


function ControlledExample() {
  const [value, setValue] = useState("TrackDairy");

  return (
    <div className="max-w-sm space-y-4">
      <LabeledInput
        label="Project name"
        name="projectName"
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value);
        }}
      />

      <p className="text-sm text-muted-foreground">
        Current value:{" "}
        <span className="font-medium text-foreground">
          {value || "(empty)"}
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
          "React state owns the current value. Input forwards the native onChange event without managing state internally.",
      },
    },
  },
};

function UncontrolledExample() {
  const [submittedValue, setSubmittedValue] =
    useState<string | null>(null);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const value = formData.get("projectName");

    setSubmittedValue(
      typeof value === "string" ? value : "",
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm space-y-4"
    >
      <LabeledInput
        label="Project name"
        name="projectName"
        defaultValue="Design System"
      />

      <Button type="submit" variant="outline">
        Read current value
      </Button>

      {submittedValue !== null && (
        <p
          role="status"
          className="text-sm text-muted-foreground"
        >
          Submitted value:{" "}
          <span className="text-foreground">
            {submittedValue || "(empty)"}
          </span>
        </p>
      )}
    </form>
  );
}

export const Uncontrolled: Story = {
  render: () => <UncontrolledExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "The browser manages the value after initialization with defaultValue. FormData reads the value at submission time.",
      },
    },
  },
};


export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Unavailable value",
    placeholder: undefined,
  },

  render: (args) => (
    <LabeledInput
      {...args}
      label="Disabled field"
    />
  ),

  parameters: {
    docs: {
      description: {
        story:
          "Native disabled inputs cannot be edited, are skipped during Tab navigation, and are excluded from native form submission.",
      },
    },
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: "DS-2048",
    placeholder: undefined,
  },

  render: (args) => (
    <LabeledInput
      {...args}
      label="Reference ID"
      description="This value can be selected and copied but not edited."
    />
  ),

  parameters: {
    docs: {
      description: {
        story:
          "Read-only inputs remain focusable and selectable. Unlike disabled inputs, they may participate in native form submission.",
      },
    },
  },
};

function RequiredExample() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="max-w-sm space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <LabeledInput
        label="Email address (required)"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="arbaz@example.com"
        onChange={() => setSubmitted(false)}
      />

      <Button type="submit">
        Submit
      </Button>

      {submitted && (
        <p role="status" className="text-sm text-success">
          Form submitted successfully.
        </p>
      )}
    </form>
  );
}

export const Required: Story = {
  render: () => <RequiredExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates native required and email validation. Submit an empty or malformed value to observe the browser's built-in validation behavior.",
      },
    },
  },
};

export const WithDescription: Story = {
  render: () => (
    <LabeledInput
      label="Website URL"
      type="url"
      placeholder="https://example.com"
      description="Enter a complete URL beginning with https://."
    />
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "The supplementary instruction is associated with the input through aria-describedby. Placeholder text does not replace a visible label.",
      },
    },
  },
};


export const FocusState: Story = {
  render: () => (
    <LabeledInput
      label="Project name"
      placeholder="Enter project name"
    />
  ),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole("textbox", {
      name: "Project name",
    });

    await userEvent.tab();

    await expect(input).toHaveFocus();
  },

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates keyboard focus and the visible focus indicator. Press Tab to navigate to the input. The focus ring is applied using focus-visible styles.",
      },
    },
  },
};


function ValidationErrorExample() {
  const inputId = useId();
  const hintId = useId();
  const errorId = useId();

  const [email, setEmail] = useState("not-an-email");
  const [invalid, setInvalid] = useState(true);

  return (
    <div className="max-w-sm space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-foreground"
      >
        Email address
      </label>

      <Input
        id={inputId}
        type="email"
        required
        value={email}
        aria-invalid={invalid}
        aria-describedby={
          invalid
            ? `${hintId} ${errorId}`
            : hintId
        }
        onChange={(event) => {
          setEmail(event.currentTarget.value);
          setInvalid(!event.currentTarget.validity.valid);
        }}
      />

      <p
        id={hintId}
        className="text-xs text-muted-foreground"
      >
        Enter a valid email address.
      </p>

      {invalid && (
        <p
          id={errorId}
          className="text-sm text-destructive"
        >
          Please provide a valid email address.
        </p>
      )}
    </div>
  );
}

export const ValidationError: Story = {
  render: () => <ValidationErrorExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates consumer-managed validation using the browser's native validity state. The error border is driven by aria-invalid, and aria-describedby links the error message to the field. Enter a valid email address to clear the error.",
      },
    },
  },
};
