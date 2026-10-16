import { useId, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Input, Select, type SelectProps } from "../../index";

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
  const describedByIds = [
    describedBy,
    description ? descriptionId : undefined,
    error ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className="w-full max-w-sm space-y-2">
      <label htmlFor={selectId} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <Select {...props} id={selectId} aria-describedby={describedByIds}>
        {children}
      </Select>
      {description && (
        <p id={descriptionId} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

const genres = [
  { value: "action", label: "Action" },
  { value: "war", label: "War" },
  { value: "racing", label: "Racing" },
  { value: "simulation", label: "Simulation" },
] as const;

function GenreOptions() {
  return (
    <>
      {genres.map((genre) => (
        <option key={genre.value} value={genre.value}>
          {genre.label}
        </option>
      ))}
    </>
  );
}

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
    defaultValue: "action",
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
      description: "Controlled selected value. Pair with onChange.",
    },
    onChange: {
      control: false,
      description: "Native selection change handler.",
    },
    children: {
      control: false,
      description: "Native option and optgroup elements.",
    },
    disabled: {
      control: "boolean",
      description:
        "Prevents selection, keyboard interaction, and normal form submission.",
    },
    required: {
      control: "boolean",
      description: "Enables native required-field validation.",
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

export const Default: Story = {
  render: (args) => (
    <LabeledSelect
      {...args}
      label="Favorite Game Genre"
      error={args["aria-invalid"] ? "Please review your genre selection." : undefined}
    >
      <option value="" disabled>
        Choose a Genre
      </option>
      <GenreOptions />
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

function ControlledExample() {
  const [genre, setGenre] = useState("rpg");
  const selectedLabel = genres.find((item) => item.value === genre)?.label ?? genre;

  return (
    <div className="max-w-sm space-y-4">
      <LabeledSelect
        label="Favorite game genre"
        name="genre"
        value={genre}
        onChange={(event) => setGenre(event.currentTarget.value)}
      >
        <GenreOptions />
      </LabeledSelect>
      <p role="status" className="text-sm text-muted-foreground">
        Selected genre: <span className="font-medium text-foreground">{selectedLabel}</span>
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
          "React state owns the selected genre. The native onChange event updates that state. Select does not manage selection internally.",
      },
    },
  },
};

function UncontrolledExample() {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [submittedValue, setSubmittedValue] = useState<string | null>(null);

  return (
    <form
      className="max-w-sm space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const value = formData.get("genre");
        setSubmittedValue(typeof value === "string" ? value : "");
      }}
    >
      <LabeledSelect label="Favorite game genre" name="genre" defaultValue="strategy" ref={selectRef}>
        <GenreOptions />
      </LabeledSelect>
      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="outline" onClick={() => selectRef.current?.focus()}>
          Focus using ref
        </Button>
        <Button type="submit">Read selection</Button>
      </div>
      {submittedValue !== null && (
        <p role="status" className="text-sm text-muted-foreground">
          Submitted value: <span className="font-medium text-foreground">{submittedValue || "(empty)"}</span>
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

export const WithPlaceholder: Story = {
  render: () => (
    <LabeledSelect
      label="Favorite game genre"
      defaultValue=""
      description="Choose the genre you enjoy playing most."
    >
      <option value="" disabled>Select a genre...</option>
      <GenreOptions />
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
        label="Game genre (required)"
        name="genre"
        defaultValue=""
        required
        description="Choose a genre before submitting."
        onChange={() => setSubmitted(false)}
      >
        <option value="" disabled>Choose a genre</option>
        <GenreOptions />
      </LabeledSelect>
      <Button type="submit">Submit</Button>
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
          "Native required validation rejects the initial empty value. Choose a genre before submitting the form.",
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <LabeledSelect
      label="Locked game genre"
      defaultValue="simulation"
      disabled
      description="This preference cannot currently be changed."
    >
      <GenreOptions />
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

export const Invalid: Story = {
  render: () => (
    <LabeledSelect
      label="Favorite game genre"
      defaultValue=""
      required
      aria-invalid="true"
      error="Please choose a game genre."
    >
      <option value="" disabled>Choose a genre</option>
      <GenreOptions />
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

export const OptionGroups: Story = {
  render: () => (
    <LabeledSelect
      label="Choose a game"
      defaultValue="stardew-valley"
      description="Games are organized into native genre groups."
    >
      <optgroup label="Role-playing games">
        <option value="baldurs-gate-3">Baldur's Gate 3</option>
        <option value="skyrim">The Elder Scrolls V: Skyrim</option>
      </optgroup>
      <optgroup label="Simulation games">
        <option value="stardew-valley">Stardew Valley</option>
        <option value="the-sims-4">The Sims 4</option>
      </optgroup>
      <optgroup label="Upcoming additions">
        <option value="coming-soon" disabled>Coming soon (unavailable)</option>
      </optgroup>
    </LabeledSelect>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Native optgroup elements organize related games, while individual option elements can be disabled without disabling the entire select.",
      },
    },
  },
};

export const WithDescription: Story = {
  render: () => (
    <LabeledSelect
      label="Preferred game genre"
      defaultValue="action"
      description="Choose the genre you want to see first in your game library. You can update this later."
    >
      <GenreOptions />
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

function FormIntegrationExample() {
  const libraryNameId = useId();
  const [result, setResult] = useState<{ libraryName: string; genre: string } | null>(null);

  return (
    <form
      className="max-w-sm space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setResult({
          libraryName: String(formData.get("libraryName") ?? ""),
          genre: String(formData.get("genre") ?? ""),
        });
      }}
    >
      <div className="space-y-2">
        <label htmlFor={libraryNameId} className="block text-sm font-medium text-foreground">
          Game library name
        </label>
        <Input id={libraryNameId} name="libraryName" defaultValue="My Game Collection" required />
      </div>
      <LabeledSelect label="Favorite genre" name="genre" defaultValue="" required>
        <option value="" disabled>Select a genre</option>
        <GenreOptions />
      </LabeledSelect>
      <Button type="submit">Save preferences</Button>
      {result && (
        <div role="status" className="rounded-surface border border-border bg-card p-3 text-sm text-foreground">
          <p className="font-medium">Preferences saved locally</p>
          <p>Library: {result.libraryName}</p>
          <p>Genre: {genres.find((item) => item.value === result.genre)?.label ?? result.genre}</p>
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
          "Demonstrates Select alongside Input and Button using native form validation and FormData. The example displays submitted values locally; no backend is required.",
      },
    },
  },
};
