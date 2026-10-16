
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


export const WithIcon: Story = {
  render: () => (
    <div className="w-full max-w-xl space-y-4">
      <Alert variant="default">
        <AlertTitle className="flex items-center gap-2">
          <Info
            aria-hidden="true"
            className="size-4 shrink-0 text-primary"
          />
          Information
        </AlertTitle>
        <AlertDescription>
          You can update your preferences at any time.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <AlertTitle className="flex items-center gap-2">
          <CheckCircle2
            aria-hidden="true"
            className="size-4 shrink-0 text-success"
          />
          Changes saved
        </AlertTitle>
        <AlertDescription>
          Your preferences have been updated successfully.
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTitle className="flex items-center gap-2">
          <AlertTriangle
            aria-hidden="true"
            className="size-4 shrink-0 text-warning"
          />
          Storage almost full
        </AlertTitle>
        <AlertDescription>
          Review unused files to free up storage space.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTitle className="flex items-center gap-2">
          <XCircle
            aria-hidden="true"
            className="size-4 shrink-0 text-destructive"
          />
          Unable to save changes
        </AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates decorative icon composition using semantic colors. Icons supplement visible text and remain hidden from assistive technology.",
      },
    },
  },
};


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

      {urgent && (
        <Alert
          variant="destructive"
          role="alert"
          aria-atomic="true"
        >
          <AlertTitle className="flex items-center gap-2">
            <XCircle
              aria-hidden="true"
              className="size-4 shrink-0 text-destructive"
            />
            Session expired
          </AlertTitle>

          <AlertDescription>
            Your session has expired. Unsaved changes
            may be lost. Please sign in again to continue.
          </AlertDescription>
        </Alert>
      )}
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
