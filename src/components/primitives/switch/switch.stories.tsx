
import { useId, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Button,
  Switch,
  type SwitchProps,
} from "../../index";

type LabeledSwitchProps = SwitchProps & {
  label: string;
  description?: string;
  error?: string;
};

function LabeledSwitch({
  label,
  description,
  error,
  id,
  "aria-describedby": describedBy,
  ...props
}: LabeledSwitchProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;
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
      <Switch
        {...props}
        id={switchId}
        aria-describedby={describedByIds}
      />

      <div className="space-y-1">
        <label
          htmlFor={switchId}
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
  title: "Primitives/Switch",
  component: Switch,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "An accessible on/off control built with a native checkbox and role=switch. Supports controlled and uncontrolled state, native forms, validation attributes, and keyboard operation. Use Switch for settings and Checkbox for selections or agreements.",
      },
    },
  },

  args: {
    defaultChecked: false,
    disabled: false,
    required: false,
    "aria-invalid": false,
    name: "automaticSaving",
    value: "enabled",
  },

  argTypes: {
    checked: {
      control: false,
      description:
        "Controlled on/off state. Pair with onChange.",
    },

    defaultChecked: {
      control: "boolean",
      description:
        "Initial uncontrolled state. Changing this control remounts the example.",
    },

    onChange: {
      control: false,
      description:
        "Native change event. Read event.currentTarget.checked.",
    },

    disabled: {
      control: "boolean",
      description: "Disables native interaction and focus.",
    },

    required: {
      control: "boolean",
      description:
        "Applies the native checkbox required constraint.",
    },

    name: {
      control: "text",
      description: "Native form field name.",
    },

    value: {
      control: "text",
      description:
        'Submitted value when on. Defaults to "on" if omitted.',
    },

    "aria-invalid": {
      control: "boolean",
      description:
        "Communicates an invalid state and adds destructive styling.",
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultOff: Story = {
  render: (args) => (
    <LabeledSwitch
      key={String(args.defaultChecked)}
      {...args}
      label="Automatic saving"
      description="Automatically save changes as you work."
      error={
        args["aria-invalid"]
          ? "This setting could not be saved."
          : undefined
      }
    />
  ),

  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground for the native switch. Explore initial state, disabled, required, and invalid properties.",
      },
    },
  },
};


export const DefaultOn: Story = {
  render: () => (
    <LabeledSwitch
      label="Automatic saving"
      defaultChecked
      description="Automatic saving is initially enabled."
    />
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Uses defaultChecked to start in the on state. The browser owns subsequent changes.",
      },
    },
  },
};


function ControlledExample() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="space-y-4">
      <LabeledSwitch
        label="Desktop notifications"
        checked={enabled}
        onChange={(event) => {
          setEnabled(event.currentTarget.checked);
        }}
        description="Enable or disable desktop notifications."
      />

      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        Notifications:{" "}
        <span className="font-medium text-foreground">
          {enabled ? "On" : "Off"}
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
          "React manages the switch state through checked and onChange. The status text demonstrates how consumers can respond to changes.",
      },
    },
  },
};


function UncontrolledExample() {
  const switchRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<string | null>(null);

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const value = formData.get("automaticSaving");

        setResult(
          typeof value === "string"
            ? value
            : "(not included)",
        );
      }}
    >
      <LabeledSwitch
        label="Automatic saving"
        name="automaticSaving"
        defaultChecked
        ref={switchRef}
      />

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => switchRef.current?.focus()}
        >
          Focus using ref
        </Button>

        <Button type="submit">
          Read setting
        </Button>
      </div>

      {result !== null && (
        <p
          role="status"
          className="text-sm text-muted-foreground"
        >
          FormData result:{" "}
          <span className="font-medium text-foreground">
            {result}
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
  'The browser manages the checked state. FormData includes "on" when the switch is checked and omits the field when unchecked. The forwarded ref targets the native input.',
      },
    },
  },
};



export const DisabledOff: Story = {
  render: () => (
    <LabeledSwitch
      label="Experimental features"
      disabled
      description="This feature is currently unavailable."
    />
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Disabled switch in the off state. It cannot be activated or reached through normal Tab navigation.",
      },
    },
  },
};


export const DisabledOn: Story = {
  render: () => (
    <LabeledSwitch
      label="Security monitoring"
      defaultChecked
      disabled
      description="This setting is enforced and cannot be changed."
    />
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Disabled switch in the on state. The visual track remains enabled in appearance but its interaction is disabled.",
      },
    },
  },
};



export const Invalid: Story = {
  render: () => (
    <LabeledSwitch
      label="Email notifications"
      defaultChecked
      aria-invalid="true"
      description="Receive updates about your account."
      error="The notification preference could not be saved."
    />
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A fixed validation-error example. aria-invalid communicates the invalid state, and aria-describedby associates the message with the switch.",
      },
    },
  },
};




export const WithDescription: Story = {
  render: () => (
    <LabeledSwitch
      label="Automatic backups"
      defaultChecked
      description="Keep automatic backups enabled to reduce the risk of losing recent changes."
    />
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "The visible label supplies the accessible name, while aria-describedby connects additional instructions to the native switch input.",
      },
    },
  },
};


type SettingsResult = {
  automaticSaving: boolean;
  emailNotifications: boolean;
  securityMonitoringIncluded: boolean;
};

function FormIntegrationExample() {
  const [result, setResult] =
    useState<SettingsResult | null>(null);

  return (
    <form
      className="max-w-lg space-y-5"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        setResult({
          automaticSaving: formData.has("automaticSaving"),
          emailNotifications: formData.has("emailNotifications"),
          securityMonitoringIncluded:
            formData.has("securityMonitoring"),
        });
      }}
    >
      <fieldset className="space-y-4">
        <legend className="mb-3 text-sm font-semibold text-foreground">
          Application preferences
        </legend>

        <LabeledSwitch
          label="Automatic saving"
          name="automaticSaving"
          value="enabled"
          defaultChecked
          description="Save changes automatically."
          onChange={() => setResult(null)}
        />

        <LabeledSwitch
          label="Email notifications"
          name="emailNotifications"
          value="enabled"
          description="Receive important updates by email."
          onChange={() => setResult(null)}
        />

        <LabeledSwitch
          label="Security monitoring"
          name="securityMonitoring"
          defaultChecked
          disabled
          description="Managed by your administrator."
        />
      </fieldset>

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
            Automatic saving:{" "}
            {result.automaticSaving ? "On" : "Off"}
          </p>

          <p>
            Email notifications:{" "}
            {result.emailNotifications ? "On" : "Off"}
          </p>

          <p>
            Disabled field included:{" "}
            {result.securityMonitoringIncluded
              ? "Yes"
              : "No"}
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
          "Demonstrates multiple switches in a native form. Enabled and checked switches contribute to FormData; unchecked and disabled switches are omitted. The result is shown locally without a backend.",
      },
    },
  },
};
