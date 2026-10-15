
import { useId, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Button,
  Input,
  Select,
  type SelectProps,
} from "../../index";

// --------------------------------------------------
// Story-only helpers
// --------------------------------------------------

type LabeledSelectProps = SelectProps & {
  label: string;
  description?: string;
  error?: string;
};

function LabeledSelect({
  label,
  description,
  error,
  id,
  children,
  "aria-describedby": describedBy,
  ...props
}: LabeledSelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

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
    <div className="w-full max-w-sm space-y-2">
      <label
        htmlFor={selectId}
        className="block text-sm font-medium text-foreground"
      >
        {label}
      </label>

      <Select
        {...props}
        id={selectId}
        aria-describedby={describedByIds}
      >
        {children}
      </Select>

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
  );
}

function SpeciesOptions() {
  return (
    <>
      <option value="cow">Cow</option>
      <option value="buffalo">Buffalo</option>
      <option value="goat">Goat</option>
      <option value="sheep">Sheep</option>
    </>
  );
}

// --------------------------------------------------
// Storybook metadata
// --------------------------------------------------

const meta = {
  title: "Primitives/Select",
  component: Select,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A native, accessible single-selection dropdown. Supports controlled and uncontrolled selection, native options and option groups, form integration, and validation states. Consumers provide labels, options, and error feedback.",
      },
    },
  },

  args: {
    defaultValue: "cow",
    disabled: false,
    required: false,
    "aria-invalid": false,
  },

  argTypes: {
    defaultValue: {
      control: false,
      description:
        "Initial uncontrolled selection. Changing this after mounting does not reset the native select.",
    },

    value: {
      control: false,
      description:
        "Controlled selected value. Pair with onChange.",
    },

    onChange: {
      control: false,
      description: "Native selection change handler.",
    },

    children: {
      control: false,
      description:
        "Native option and optgroup elements.",
    },

    disabled: {
      control: "boolean",
      description:
        "Prevents selection, keyboard interaction, and normal form submission.",
    },

    required: {
      control: "boolean",
      description:
        "Enables native required-field validation.",
    },

    "aria-invalid": {
      control: "boolean",
      description:
        "Communicates an invalid state and applies destructive border styling.",
    },
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

// --------------------------------------------------
// 1. Default playground
// --------------------------------------------------

export const Default: Story = {
  render: (args) => (
    <LabeledSelect
      {...args}
      label="Animal species"
      error={
        args["aria-invalid"]
          ? "Please select a valid animal species."
          : undefined
      }
    >
      <option value="" disabled>
        Choose an animal
      </option>
      <SpeciesOptions />
    </LabeledSelect>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "Explore native selection, disabled, required, and invalid states. The options are supplied by the consumer.",
      },
    },
  },
};

// --------------------------------------------------
// 2. Controlled
// --------------------------------------------------

function ControlledExample() {
  const [species, setSpecies] = useState("cow");

  const labels: Record<string, string> = {
    cow: "Cow",
    buffalo: "Buffalo",
    goat: "Goat",
    sheep: "Sheep",
  };

  return (
    <div className="max-w-sm space-y-4">
      <LabeledSelect
        label="Animal species"
        name="species"
        value={species}
        onChange={(event) => {
          setSpecies(event.currentTarget.value);
        }}
      >
        <SpeciesOptions />
      </LabeledSelect>

      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        Selected species:{" "}
        <span className="font-medium text-foreground">
          {labels[species] ?? species}
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
          "React state owns the selected value. The native onChange event updates that state. Select does not manage selection internally.",
      },
    },
  },
};

// --------------------------------------------------
// 3. Uncontrolled
// --------------------------------------------------

function UncontrolledExample() {
  const selectRef = useRef<HTMLSelectElement>(null);

  const [submittedValue, setSubmittedValue] =
    useState<string | null>(null);

  return (
    <form
      className="max-w-sm space-y-4"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const value = formData.get("species");

        setSubmittedValue(
          typeof value === "string" ? value : "",
        );
      }}
    >
      <LabeledSelect
        label="Animal species"
        name="species"
        defaultValue="goat"
        ref={selectRef}
      >
        <SpeciesOptions />
      </LabeledSelect>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => selectRef.current?.focus()}
        >
          Focus using ref
        </Button>

        <Button type="submit">
          Read selection
        </Button>
      </div>

      {submittedValue !== null && (
        <p
          role="status"
          className="text-sm text-muted-foreground"
        >
          Submitted value:{" "}
          <span className="font-medium text-foreground">
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
          "The browser manages the selected value after defaultValue initialization. FormData reads the current selection, and the native ref provides programmatic focus.",
      },
    },
  },
};

// --------------------------------------------------
// 4. Placeholder-like option
// --------------------------------------------------

export const WithPlaceholder: Story = {
  render: () => (
    <LabeledSelect
      label="Animal species"
      defaultValue=""
      description="Choose one of the available species."
    >
      <option value="" disabled>
        Select a species...
      </option>
      <SpeciesOptions />
    </LabeledSelect>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Native selects do not have a placeholder attribute. A disabled option with an empty value can act as a placeholder-like prompt. The visible label remains essential.",
      },
    },
  },
};

// --------------------------------------------------
// 5. Required
// --------------------------------------------------

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
      <LabeledSelect
        label="Animal species (required)"
        name="species"
        defaultValue=""
        required
        description="Choose a species before submitting."
        onChange={() => setSubmitted(false)}
      >
        <option value="" disabled>
          Choose a species
        </option>
        <SpeciesOptions />
      </LabeledSelect>

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
          "Native required validation rejects the initial empty value. Choose a valid option before submitting the form.",
      },
    },
  },
};

// --------------------------------------------------
// 6. Disabled
// --------------------------------------------------

export const Disabled: Story = {
  render: () => (
    <LabeledSelect
      label="Unavailable selection"
      defaultValue="buffalo"
      disabled
      description="This selection is currently unavailable."
    >
      <SpeciesOptions />
    </LabeledSelect>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A native disabled select cannot be changed, is skipped during normal Tab navigation, and is excluded from form submission.",
      },
    },
  },
};

// --------------------------------------------------
// 7. Invalid
// --------------------------------------------------

export const Invalid: Story = {
  render: () => (
    <LabeledSelect
      label="Animal species"
      defaultValue=""
      required
      aria-invalid="true"
      error="Please choose an animal species."
    >
      <option value="" disabled>
        Choose a species
      </option>
      <SpeciesOptions />
    </LabeledSelect>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates an invalid selection. aria-invalid communicates the error state, and aria-describedby connects the select to its visible error message. This is a fixed state; validation is owned by consumers.",
      },
    },
  },
};

// --------------------------------------------------
// 8. Native option groups
// --------------------------------------------------

export const OptionGroups: Story = {
  render: () => (
    <LabeledSelect
      label="Choose an animal"
      defaultValue="goat"
      description="Options are organized into native groups."
    >
      <optgroup label="Large livestock">
        <option value="cow">Cow</option>
        <option value="buffalo">Buffalo</option>
      </optgroup>

      <optgroup label="Small livestock">
        <option value="goat">Goat</option>
        <option value="sheep">Sheep</option>
      </optgroup>

      <optgroup label="Other">
        <option value="horse" disabled>
          Horse (unavailable)
        </option>
      </optgroup>
    </LabeledSelect>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Native optgroup elements organize related options, while individual option elements can be disabled without disabling the entire select.",
      },
    },
  },
};

// --------------------------------------------------
// 9. Accessible description
// --------------------------------------------------

export const WithDescription: Story = {
  render: () => (
    <LabeledSelect
      label="Preferred animal species"
      defaultValue="cow"
      description="Choose the main species managed by your farm. You can update this preference later."
    >
      <SpeciesOptions />
    </LabeledSelect>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A visible label supplies the accessible name. aria-describedby connects the supplementary instructions to the select.",
      },
    },
  },
};

// --------------------------------------------------
// 10. Native form integration
// --------------------------------------------------

function FormIntegrationExample() {
  const farmNameId = useId();

  const [result, setResult] = useState<{
    farmName: string;
    species: string;
  } | null>(null);

  return (
    <form
      className="max-w-sm space-y-4"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        setResult({
          farmName: String(formData.get("farmName") ?? ""),
          species: String(formData.get("species") ?? ""),
        });
      }}
    >
      <div className="space-y-2">
        <label
          htmlFor={farmNameId}
          className="block text-sm font-medium text-foreground"
        >
          Farm name
        </label>

        <Input
          id={farmNameId}
          name="farmName"
          defaultValue="Green Valley Farm"
          required
        />
      </div>

      <LabeledSelect
        label="Primary species"
        name="species"
        defaultValue=""
        required
      >
        <option value="" disabled>
          Select primary species
        </option>
        <SpeciesOptions />
      </LabeledSelect>

      <Button type="submit">
        Save details
      </Button>

      {result && (
        <div
          role="status"
          className="rounded-surface border border-border bg-card p-3 text-sm text-foreground"
        >
          <p className="font-medium">
            Form submitted successfully
          </p>

          <p>Farm: {result.farmName}</p>
          <p>Species: {result.species}</p>
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
          "Demonstrates Select alongside Input and Button using native form validation and FormData. No form-management library or backend is required.",
      },
    },
  },
};
