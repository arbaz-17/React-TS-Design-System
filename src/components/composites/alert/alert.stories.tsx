
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
} from "lucide-react";

import {
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
} from "../../index";

// -----------------------------------------
// Storybook metadata
// -----------------------------------------

const meta = {
  title: "Composites/Alert",
  component: Alert,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A compositional message container with four semantic visual variants. Alert provides AlertTitle and AlertDescription, inherits native div props, and does not automatically assign an accessibility role. Consumers decide whether dynamically updated content requires polite (role=status) or assertive (role=alert) announcements. Visual severity and announcement urgency are separate concerns.",
      },
    },
  },

  args: {
    variant: "default",
    className: "w-full max-w-lg",
  },

  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "success",
        "warning",
        "destructive",
      ],
      description:
        "Semantic visual appearance. Does not determine live-region behavior.",
      table: {
        type: {
          summary:
            "default | success | warning | destructive",
        },
        defaultValue: {
          summary: "default",
        },
      },
    },

    className: {
      control: "text",
      description:
        "Additional CSS classes for presentation and layout.",
    },

    children: {
      control: false,
      description:
        "Composable AlertTitle, AlertDescription, and suitable React content.",
    },

    role: {
      control: false,
      description:
        "Optional consumer-controlled accessibility role. Static messages generally do not require a live-region role.",
    },

    ref: {
      control: false,
      description:
        "Optional ref to the native HTMLDivElement.",
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

// -----------------------------------------
// 1. Default
// -----------------------------------------

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>
        Account information
      </AlertTitle>

      <AlertDescription>
        Your account settings can be updated at
        any time from the preferences page.
      </AlertDescription>
    </Alert>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "A static informational message. Explore visual variants and custom styling using controls. No live-region role is assigned because the message is part of the initial content.",
      },
    },
  },
};

// -----------------------------------------
// 2. Success
// -----------------------------------------

export const Success: Story = {
  render: () => (
    <Alert
      variant="success"
      className="w-full max-w-lg"
    >
      <AlertTitle>
        Changes saved
      </AlertTitle>

      <AlertDescription>
        Your project preferences were saved
        successfully.
      </AlertDescription>
    </Alert>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A static success message. The success variant controls visual presentation only; it does not automatically establish a live region.",
      },
    },
  },
};

// -----------------------------------------
// 3. Warning
// -----------------------------------------

export const Warning: Story = {
  render: () => (
    <Alert
      variant="warning"
      className="w-full max-w-lg"
    >
      <AlertTitle>
        Storage almost full
      </AlertTitle>

      <AlertDescription>
        Your available storage is running low.
        Review unused files before uploading
        additional content.
      </AlertDescription>
    </Alert>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A cautionary message. Visual warning styling does not automatically imply that assistive technology should interrupt the user.",
      },
    },
  },
};

// -----------------------------------------
// 4. Destructive
// -----------------------------------------

export const Destructive: Story = {
  render: () => (
    <Alert
      variant="destructive"
      className="w-full max-w-lg"
    >
      <AlertTitle>
        Unable to save changes
      </AlertTitle>

      <AlertDescription>
        The operation could not be completed.
        Review the form and try again.
      </AlertDescription>
    </Alert>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A static error example. Destructive styling communicates severity visually, but announcement semantics depend on when and how the message appears.",
      },
    },
  },
};

// -----------------------------------------
// 5. All Variants
// -----------------------------------------

export const AllVariants: Story = {
  render: () => (
    <div className="w-full max-w-xl space-y-4">
      <Alert variant="default">
        <AlertTitle>
          General information
        </AlertTitle>
        <AlertDescription>
          Review your account details.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <AlertTitle>
          Operation completed
        </AlertTitle>
        <AlertDescription>
          Your changes have been saved.
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTitle>
          Attention required
        </AlertTitle>
        <AlertDescription>
          Your storage is approaching its limit.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTitle>
          Operation failed
        </AlertTitle>
        <AlertDescription>
          The requested action could not be completed.
        </AlertDescription>
      </Alert>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Compares all four variants. Each uses semantic background and border tokens, with meaningful message text. The examples remain ordinary static content.",
      },
    },
  },
};

// -----------------------------------------
// 6. Title Only
// -----------------------------------------

export const TitleOnly: Story = {
  render: () => (
    <Alert
      variant="success"
      className="w-full max-w-lg"
    >
      <AlertTitle>
        Your profile is up to date.
      </AlertTitle>
    </Alert>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "AlertDescription is optional. A concise message can be rendered using only AlertTitle.",
      },
    },
  },
};

// -----------------------------------------
// 7. Description Only
// -----------------------------------------

export const DescriptionOnly: Story = {
  render: () => (
    <Alert className="w-full max-w-lg">
      <AlertDescription>
        Scheduled maintenance is planned for
        Sunday. Some features may be temporarily
        unavailable.
      </AlertDescription>
    </Alert>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "AlertTitle is optional. AlertDescription can stand alone when a separate prominent title is unnecessary.",
      },
    },
  },
};

// -----------------------------------------
// 8. With Icon
// -----------------------------------------

export const WithIcon: Story = {
  render: () => (
    <div className="w-full max-w-xl space-y-4">
      <Alert variant="default">
        <AlertTitle className="flex items-center gap-2">
          <Info
            aria-hidden="true"
            className="size-4 shrink-0"
          />
          Information
        </AlertTitle>

        <AlertDescription>
          You can update your settings later.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <AlertTitle className="flex items-center gap-2">
          <CheckCircle2
            aria-hidden="true"
            className="size-4 shrink-0"
          />
          Completed
        </AlertTitle>

        <AlertDescription>
          The operation finished successfully.
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTitle className="flex items-center gap-2">
          <AlertTriangle
            aria-hidden="true"
            className="size-4 shrink-0"
          />
          Warning
        </AlertTitle>

        <AlertDescription>
          Please review the information before continuing.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTitle className="flex items-center gap-2">
          <XCircle
            aria-hidden="true"
            className="size-4 shrink-0"
          />
          Error
        </AlertTitle>

        <AlertDescription>
          The operation could not be completed.
        </AlertDescription>
      </Alert>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Decorative icons can be composed inside AlertTitle. The icons use aria-hidden because the adjacent text already conveys the meaning. Alert does not depend on an icon library.",
      },
    },
  },
};

// -----------------------------------------
// 9. Long Content
// -----------------------------------------

export const LongContent: Story = {
  render: () => (
    <Alert
      variant="warning"
      className="w-full max-w-xl"
    >
      <AlertTitle>
        Review required before publishing
      </AlertTitle>

      <AlertDescription className="space-y-3">
        <p>
          Several items in your project need
          attention before the next release.
          Review the following requirements:
        </p>

        <ul className="list-disc space-y-1 pl-5">
          <li>
            Confirm that all required fields
            have valid values.
          </li>

          <li>
            Review accessibility and keyboard
            interaction requirements.
          </li>

          <li>
            Check responsive layouts at
            smaller viewport widths.
          </li>

          <li>
            Confirm that the production
            build completes successfully.
          </li>
        </ul>

        <p>
          Complete these checks before
          submitting the project for review.
        </p>
      </AlertDescription>
    </Alert>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates structured AlertDescription content, including paragraphs and lists. Long text should wrap naturally, preserve readability, and avoid horizontal overflow.",
      },
    },
  },
};

// -----------------------------------------
// 10. Dynamic Status — polite announcement
// -----------------------------------------

function DynamicStatusExample() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="w-full max-w-lg space-y-4">
      <Button
        onClick={() => setSaved((current) => !current)}
      >
        {saved
          ? "Make unsaved changes"
          : "Save changes"}
      </Button>

      <Alert
        role="status"
        aria-atomic="true"
        variant={saved ? "success" : "default"}
      >
        <AlertTitle>
          {saved
            ? "Changes saved"
            : "Unsaved changes"}
        </AlertTitle>

        <AlertDescription>
          {saved
            ? "Your project preferences have been saved locally."
            : "You have changes that have not been saved yet."}
        </AlertDescription>
      </Alert>
    </div>
  );
}

export const DynamicStatus: Story = {
  render: () => <DynamicStatusExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates polite live-region feedback through a persistent Alert with role=status. Clicking the button updates its text without moving focus. aria-atomic requests that the complete message be announced. Actual screen-reader behavior should be manually verified.",
      },
    },
  },
};

// -----------------------------------------
// 11. Urgent Alert — assertive announcement
// -----------------------------------------

function UrgentAlertExample() {
  const [urgent, setUrgent] = useState(false);

  return (
    <div className="w-full max-w-lg space-y-4">
      <Button
        variant="outline"
        onClick={() => setUrgent((current) => !current)}
      >
        {urgent
          ? "Clear urgent warning"
          : "Simulate session expiry"}
      </Button>

      <div
        role="alert"
        aria-atomic="true"
      >
        {urgent && (
          <Alert variant="destructive">
            <AlertTitle>
              Session expired
            </AlertTitle>

            <AlertDescription>
              Your session has expired and unsaved
              changes may be lost. Save a copy of
              your work before leaving this page.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}

export const UrgentAlert: Story = {
  render: () => <UrgentAlertExample />,

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates an urgent announcement. The role=alert live region exists before its content is inserted, and the simulated session-expiry message appears only after user interaction. Assertive announcements should be reserved for genuinely urgent information. This example does not change keyboard focus or manage real sessions.",
      },
    },
  },
};
