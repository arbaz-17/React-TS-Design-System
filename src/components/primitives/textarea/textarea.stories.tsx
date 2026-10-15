
import { useId, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Button,
  Textarea,
  type TextareaProps,
} from "../../index";

// -----------------------------------------
// Story-only helper
// -----------------------------------------

type LabeledTextareaProps = TextareaProps & {
  label: string;
  description?: string;
};

function LabeledTextarea({
  label,
  description,
  id,
  "aria-describedby": describedBy,
  ...props
}: LabeledTextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const descriptionId = `${generatedId}-description`;

  const descriptionIds =
    [
      describedBy,
      description ? descriptionId : undefined,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className="w-full max-w-lg space-y-2">
      <label
        htmlFor={textareaId}
        className="block text-sm font-medium text-foreground"
      >
        {label}
      </label>

      <Textarea
        {...props}
        id={textareaId}
        aria-describedby={descriptionIds}
      />

      {description && (
        <p
          id={descriptionId}
          className="text-sm text-muted-foreground"
        >
          {description}
        </p>
      )}
    </div>
  );
}

// -----------------------------------------
// Metadata
// -----------------------------------------

const meta = {
  title: "Primitives/Textarea",
  component: Textarea,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A native, type-safe multiline text-entry primitive. Supports controlled and uncontrolled values, vertical resizing, native validation attributes, and accessible states. Labels, descriptions, and validation feedback are managed by consumers.",
      },
    },
  },

  args: {
    rows: 4,
    placeholder: "Describe your project...",
    disabled: false,
    readOnly: false,
    required: false,
  },

  argTypes: {
    rows: {
      control: {
        type: "number",
        min: 1,
        max: 15,
        step: 1,
      },
      description:
        "Initial visible text rows. Defaults to four; minimum CSS height still applies.",
      table: {
        defaultValue: { summary: "4" },
      },
    },

    placeholder: {
      control: "text",
      description: "Supplementary hint, not an accessible label.",
    },

    disabled: {
      control: "boolean",
      description:
        "Prevents interaction and disables native resizing.",
    },

    readOnly: {
      control: "boolean",
      description:
        "Prevents editing while keeping content focusable and selectable.",
    },

    required: {
      control: "boolean",
      description: "Enables native required-field validation.",
    },

    maxLength: {
      control: {
        type: "number",
        min: 1,
      },
      description: "Native maximum text length.",
    },

    "aria-invalid": {
      control: "boolean",
      description:
        "Communicates an invalid state and applies error styling.",
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

// -----------------------------------------
// 1. Default
// -----------------------------------------

export const Default: Story = {
  render: (args) => (
    <LabeledTextarea
      {...args}
      label="Project description"
    />
  ),

  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground for rows, placeholder, required, disabled, read-only and invalid states.",
      },
    },
  },
};

// -----------------------------------------
// 2. Controlled
// -----------------------------------------

function ControlledExample() {
  const [value, setValue] = useState(
    "First line\nSecond line",
  );

  const characters = value.length;
  const lines = value.split(/\r?\n/).length;

  return (
    <div className="max-w-lg space-y-4">
      <LabeledTextarea
        label="Project description"
        name="description"
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value);
        }}
      />

      <p className="text-sm text-muted-foreground">
        Characters:{" "}
        <span className="font-medium text-foreground">
          {characters}
        </span>
        {" · "}
        Lines:{" "}
        <span className="font-medium text-foreground">
          {lines}
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
          "React state controls the textarea value. The character and line counts belong to the consuming example, not the Textarea primitive.",
      },
    },
  },
};

// -----------------------------------------
// 3. Uncontrolled
// -----------------------------------------

function UncontrolledExample() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [submittedValue, setSubmittedValue] =
    useState<string | null>(null);

  return (
    <form
      className="max-w-lg space-y-4"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const value = formData.get("notes");

        setSubmittedValue(
          typeof value === "string" ? value : "",
        );
      }}
    >
      <LabeledTextarea
        label="Notes"
        name="notes"
        defaultValue={"Initial note.\nSecond line."}
        ref={textareaRef}
      />

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            textareaRef.current?.focus();
          }}
        >
          Focus using ref
        </Button>

        <Button type="submit">
          Read using FormData
        </Button>
      </div>

      {submittedValue !== null && (
        <p
          role="status"
          className="whitespace-pre-wrap text-sm text-muted-foreground"
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
          "The browser owns the value after defaultValue initialization. FormData reads the current content, and the native textarea ref allows programmatic focus.",
      },
    },
  },
};

// -----------------------------------------
// 4. Custom Rows
// -----------------------------------------

export const CustomRows: Story = {
  render: () => (
    <div className="grid gap-5 md:grid-cols-2">
      <LabeledTextarea
        label="Four rows (default)"
        rows={4}
        defaultValue="A short description."
      />

      <LabeledTextarea
        label="Eight rows"
        rows={8}
        defaultValue="A longer description with more vertical space."
      />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "The rows attribute controls the initial native textarea height. The component also enforces a minimum CSS height of 96px.",
      },
    },
  },
};

// -----------------------------------------
// 5. Long Content
// -----------------------------------------

const longContent = [
  "Project Overview",
  "This design system provides reusable frontend components built with React, TypeScript, and Tailwind CSS.",
  "Architecture",
  "Components follow native HTML behavior where possible, use semantic design tokens, and expose strongly typed props.",
  "Accessibility",
  "Keyboard interaction, visible focus, accessible names, and validation relationships are important implementation considerations.",
  "Documentation",
  "Storybook demonstrates the supported component APIs, interaction states, and intended patterns of composition.",
].join("\n\n");

export const LongContent: Story = {
  render: () => (
    <LabeledTextarea
      label="Documentation notes"
      rows={4}
      defaultValue={longContent}
      description="Scroll through the text or resize the field vertically."
    />
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates multiline editing, text wrapping, scrolling, and content that exceeds the initial visible height.",
      },
    },
  },
};

// -----------------------------------------
// 6. Vertical Resizing
// -----------------------------------------

export const VerticalResizing: Story = {
  render: () => (
    <LabeledTextarea
      label="Additional details"
      rows={5}
      defaultValue="This field supports native vertical resizing."
      description="Drag the resize handle in the bottom-right corner to adjust the height."
    />
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Textarea uses the native browser resizing mechanism through Tailwind's resize-y utility. It does not automatically grow with its content.",
      },
    },
  },
};

// -----------------------------------------
// 7. Disabled
// -----------------------------------------

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "This description is unavailable for editing.",
    placeholder: undefined,
  },

  render: (args) => (
    <LabeledTextarea
      {...args}
      label="Disabled description"
    />
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Native disabled behavior prevents editing and normal Tab focus, excludes the value from form submission, and disables resizing.",
      },
    },
  },
};

// -----------------------------------------
// 8. Read Only
// -----------------------------------------

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue:
      "This text can be selected and copied, but not edited.",
    placeholder: undefined,
  },

  render: (args) => (
    <LabeledTextarea
      {...args}
      label="Published description"
    />
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Read-only textareas retain focus and text selection. Unlike disabled controls, their values may be included in native form submission.",
      },
    },
  },
};

// -----------------------------------------
// 9. Required
// -----------------------------------------

function RequiredExample() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="max-w-lg space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <LabeledTextarea
        label="Feedback (required)"
        name="feedback"
        required
        rows={4}
        minLength={10}
        maxLength={120}
        placeholder="Enter your feedback..."
        description="Enter between 10 and 120 characters."
        onChange={() => setSubmitted(false)}
      />

      <Button type="submit">
        Submit feedback
      </Button>

      {submitted && (
        <p role="status" className="text-sm text-success">
          Feedback submitted successfully.
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
          "Demonstrates native required, minLength and maxLength constraints. Try submitting an empty value or fewer than ten characters.",
      },
    },
  },
};

// -----------------------------------------
// 10. Invalid
// -----------------------------------------

function InvalidExample() {
  const textareaId = useId();
  const errorId = useId();

  return (
    <div className="max-w-lg space-y-2">
      <label
        htmlFor={textareaId}
        className="block text-sm font-medium"
      >
        Description
      </label>

      <Textarea
        id={textareaId}
        defaultValue="Incomplete description."
        aria-invalid="true"
        aria-describedby={errorId}
      />

      <p
        id={errorId}
        className="text-sm text-destructive"
      >
        The description needs more information.
      </p>
    </div>
  );
}

export const Invalid: Story = {
  render: () => <InvalidExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A fixed invalid-state demonstration. aria-invalid applies the destructive border styling, while aria-describedby associates the error message with the field.",
      },
    },
  },
};

// -----------------------------------------
// 11. With Description
// -----------------------------------------

export const WithDescription: Story = {
  render: () => (
    <LabeledTextarea
      label="Project requirements"
      rows={5}
      placeholder="Describe the required functionality..."
      description="Include expected features, user interactions, and any technical constraints."
    />
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates supplementary instructions connected through aria-describedby. The visible label provides the accessible name.",
      },
    },
  },
};

// -----------------------------------------
// 12. With Error Message
// -----------------------------------------

function ErrorMessageExample() {
  const textareaId = useId();
  const hintId = useId();
  const errorId = useId();

  const [value, setValue] = useState("Too short");

  const isInvalid = value.trim().length < 15;

  const describedBy = isInvalid
    ? `${hintId} ${errorId}`
    : hintId;

  return (
    <div className="max-w-lg space-y-2">
      <label
        htmlFor={textareaId}
        className="block text-sm font-medium text-foreground"
      >
        Project summary
      </label>

      <Textarea
        id={textareaId}
        name="summary"
        required
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value);
        }}
        aria-invalid={isInvalid}
        aria-describedby={describedBy}
      />

      <p
        id={hintId}
        className="text-sm text-muted-foreground"
      >
        Provide at least 15 non-whitespace characters.
      </p>

      {isInvalid && (
        <p
          id={errorId}
          className="text-sm text-destructive"
        >
          The summary must contain at least 15 characters
          after trimming surrounding whitespace.
        </p>
      )}
    </div>
  );
}

export const WithErrorMessage: Story = {
  render: () => <ErrorMessageExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates consumer-managed validation. The error is derived from React state, aria-invalid communicates the current state, and aria-describedby connects the field to its instructions and error. Enter sufficient text to clear the error.",
      },
    },
  },
};
