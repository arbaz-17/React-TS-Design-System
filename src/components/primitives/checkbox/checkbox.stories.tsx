
import { useId, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Button,
  Checkbox,
  type CheckboxProps,
} from "../../index";

type LabeledCheckboxProps = CheckboxProps & {
  label: string;
  description?: string;
  error?: string;
};

function LabeledCheckbox({
  label,
  description,
  error,
  id,
  className,
  "aria-describedby": describedBy,
  ...props
}: LabeledCheckboxProps) {
  const generatedId = useId();

  const checkboxId = id ?? generatedId;
  const descriptionId = `${generatedId}-description`;
  const errorId = `${generatedId}-error`;

  const describedByIds =
    [
      describedBy,
      description ? descriptionId : undefined,
      error ? errorId : undefined,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className="flex max-w-md items-start gap-3">
      <Checkbox
        {...props}
        id={checkboxId}
        className={["mt-0.5", className]
          .filter(Boolean)
          .join(" ")}
        aria-describedby={describedByIds}
      />

      <div className="space-y-1">
        <label
          htmlFor={checkboxId}
          className="block cursor-pointer text-sm font-medium text-foreground"
        >
          {label}
        </label>

        {description && (
          <p
            id={descriptionId}
            className="text-sm text-muted-foreground"
          >
            {description}
          </p>
        )}

        {error && (
          <p
            id={errorId}
            className="text-sm text-destructive"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}


const meta = {
  title: "Primitives/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A native, accessible two-state checkbox with semantic styling, controlled and uncontrolled checked state, keyboard interaction, and form integration. Consumers supply labels, descriptions, and validation feedback.",
      },
    },
  },

  args: {
    defaultChecked: false,
    disabled: false,
    required: false,
    "aria-invalid": false,
    name: "updates",
    value: "yes",
  },

  argTypes: {
    checked: {
      control: false,
      description:
        "Controlled checked state. Use with onChange.",
    },

    defaultChecked: {
      control: "boolean",
      description:
        "Initial uncontrolled checked state. Storybook remounts the example when this control changes.",
    },

    onChange: {
      control: false,
      description:
        "Native change handler. Read event.currentTarget.checked.",
    },

    disabled: {
      control: "boolean",
      description:
        "Prevents activation and normal keyboard focus.",
    },

    required: {
      control: "boolean",
      description:
        "Requires the checkbox to be checked for native form validation.",
    },

    name: {
      control: "text",
      description: "Native form field name.",
    },

    value: {
      control: "text",
      description:
        'Submitted value when checked. Defaults to "on" if omitted.',
    },

    "aria-invalid": {
      control: "boolean",
      description:
        "Communicates an invalid state and applies a destructive ring.",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
  render: (args) => (
    <LabeledCheckbox
      key={String(args.defaultChecked)}
      {...args}
      label="Receive product updates"
      description="Choose whether to receive occasional product announcements."
      error={
        args["aria-invalid"]
          ? "Please review this selection."
          : undefined
      }
    />
  ),

  parameters: {
    docs: {
      description: {
        story:
          "Explore initial selection, disabled, required, and invalid states. This is an uncontrolled checkbox. Changing defaultChecked remounts the story example.",
      },
    },
  },
};


export const Checked: Story = {
  render: () => (
    <LabeledCheckbox
      label="Email notifications"
      defaultChecked
    />
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Starts checked using the native defaultChecked prop. Users can toggle it normally.",
      },
    },
  },
};



function ControlledExample() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="space-y-4">
      <LabeledCheckbox
        label="Enable email notifications"
        checked={checked}
        onChange={(event) => {
          setChecked(event.currentTarget.checked);
        }}
      />

      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        Notifications:{" "}
        <span className="font-medium text-foreground">
          {checked ? "Enabled" : "Disabled"}
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
          "React owns the checked state. The native onChange event updates state through event.currentTarget.checked.",
      },
    },
  },
};



function UncontrolledExample() {
  const checkboxRef = useRef<HTMLInputElement>(null);

  const [submittedValue, setSubmittedValue] =
    useState<string | null>(null);

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const value = formData.get("updates");

        setSubmittedValue(
          typeof value === "string"
            ? value
            : "(not included)",
        );
      }}
    >
      <LabeledCheckbox
        label="Receive updates"
        name="updates"
        defaultChecked
        ref={checkboxRef}
      />

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => checkboxRef.current?.focus()}
        >
          Focus using ref
        </Button>

        <Button type="submit">
          Read form value
        </Button>
      </div>

      {submittedValue !== null && (
        <p
          role="status"
          className="text-sm text-muted-foreground"
        >
          FormData result:{" "}
          <span className="font-medium text-foreground">
            {submittedValue}
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
          'The browser manages checked state. When checked without an explicit value, FormData returns "on". When unchecked, the field is omitted. The forwarded ref allows programmatic focus.',
      },
    },
  },
};


export const Disabled: Story = {
  render: () => (
    <LabeledCheckbox
      label="Unavailable option"
      disabled
      description="This option cannot currently be selected."
    />
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A disabled checkbox cannot be toggled, is skipped during normal Tab navigation, and is excluded from FormData.",
      },
    },
  },
};


export const DisabledChecked: Story = {
  render: () => (
    <LabeledCheckbox
      label="Enabled by administrator"
      defaultChecked
      disabled
      description="The current selection is locked."
    />
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates an initially checked but disabled control. Its visual state remains checked, but it cannot be changed or submitted as a normal enabled form field.",
      },
    },
  },
};


function RequiredExample() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <LabeledCheckbox
        label="I accept the terms and conditions"
        name="terms"
        value="accepted"
        required
        onChange={() => setSubmitted(false)}
      />

      <Button type="submit">
        Continue
      </Button>

      {submitted && (
        <p
          role="status"
          className="text-sm text-success"
        >
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
          "A required checkbox must be checked before native form submission succeeds. Try submitting while unchecked, then check the control and submit again.",
      },
    },
  },
};


export const Invalid: Story = {
  render: () => (
    <LabeledCheckbox
      label="Accept the agreement"
      name="agreement"
      required
      aria-invalid="true"
      error="You must accept the agreement."
    />
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Fixed validation-error example. aria-invalid communicates the error state, while aria-describedby associates the message. Consumers manage validation and error state.",
      },
    },
  },
};


export const WithDescription: Story = {
  render: () => (
    <LabeledCheckbox
      label="Weekly activity summary"
      description="Receive one email each week summarizing your recent activity and important changes."
    />
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "The label supplies the accessible name. A unique description ID is connected through aria-describedby, giving assistive technologies supplementary context.",
      },
    },
  },
};


type PreferencesResult = {
  channels: string[];
  acceptedTerms: string;
};

function FormIntegrationExample() {
  const [result, setResult] =
    useState<PreferencesResult | null>(null);

  return (
    <form
      className="max-w-lg space-y-5"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        setResult({
          channels: formData
            .getAll("channels")
            .map((value) => String(value)),

          acceptedTerms: String(
            formData.get("terms") ?? "(not included)",
          ),
        });
      }}
    >
      <fieldset className="space-y-3">
        <legend className="mb-3 text-sm font-semibold text-foreground">
          Notification channels
        </legend>

        <LabeledCheckbox
          label="Email notifications"
          name="channels"
          value="email"
          defaultChecked
        />

        <LabeledCheckbox
          label="SMS notifications"
          name="channels"
          value="sms"
        />
      </fieldset>

      <div className="border-t border-border pt-4">
        <LabeledCheckbox
          label="I agree to the terms"
          name="terms"
          required
        />
      </div>

      <Button type="submit">
        Save preferences
      </Button>

      {result && (
        <div
          role="status"
          className="space-y-2 rounded-surface border border-border bg-card p-4 text-sm text-foreground"
        >
          <p className="font-semibold">
            Preferences saved locally
          </p>

          <p>
            Channels:{" "}
            {result.channels.length > 0
              ? result.channels.join(", ")
              : "None selected"}
          </p>

          <p>
            Terms value: {result.acceptedTerms}
          </p>
        </div>
      )}
    </form>
  );
}

export const FormIntegration: Story = {
  render: () => <FormIntegrationExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Demonstrates native checkbox grouping, FormData.getAll(), required validation, custom option values, and the default "on" value. Unchecked checkboxes are omitted from FormData. No backend is involved.',
      },
    },
  },
};
