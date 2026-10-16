
# Badge

## Overview

Badge is a reusable, noninteractive UI component designed to display compact labels, statuses, categories, and supplementary information throughout the design system. It supports six semantic visual variants, two sizes, and optional icon composition to communicate information consistently across different interface contexts. 

## Architecture & Design Decisions

- **Pattern Used:** Prop Variants. Uses Class Variance Authority (CVA) to manage six semantic visual appearances and two sizes through a centralized configuration, keeping the component lightweight and reusable.
- **TypeScript Design:** Extends `ComponentPropsWithRef<"span">` to support native span attributes and refs. Uses CVA's `VariantProps` to provide type-safe variant and size selections without defining additional custom properties.
- **Styling & Tokens:** Uses Tailwind CSS with semantic tokens including `muted`, `foreground`, `primary`, `success`, `warning`, `destructive`, `border`, `input`, and `background`. Applies consistent pill-shaped styling using `rounded-full`, with transparency-based backgrounds and borders derived from semantic colors.
- **Content Composition:** Supports text, React nodes, and decorative icons through native `children`. Uses `max-w-full`, `whitespace-normal`, and `wrap-anywhere` to handle long labels and unbroken text within constrained layouts.

## Props / Component API

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `variant` | `'neutral' \| 'primary' \| 'success' \| 'warning' \| 'destructive' \| 'outline'` | `'neutral'` | No | Determines the semantic visual appearance of the badge. |
| `size` | `'sm' \| 'md'` | `'md'` | No | Controls badge padding, typography, and line height. |
| `children` | `React.ReactNode` | — | No | Content displayed inside the badge, including text and icons. |
| `className` | `string` | — | No | Additional CSS classes merged with the component's default styles. |
| `ref` | `React.Ref<HTMLSpanElement>` | — | No | Reference to the underlying span element. |
| `aria-label` | `string` | — | No | Provides an accessible label when additional context is necessary. |

Also extends native `ComponentPropsWithRef<"span">`, supporting standard HTML span attributes, event handlers, and ARIA properties.

## Storybook Stories

### 1. Default
Provides an interactive playground using Storybook controls to customize badge text, semantic variant, and size. Demonstrates the component's default neutral appearance and configurable properties.

### 2. Variants
Displays all six supported appearances: `neutral`, `primary`, `success`, `warning`, `destructive`, and `outline`. Demonstrates how semantic styling communicates different categories and statuses while ensuring visible text conveys meaning independently of color.

### 3. Sizes
Compares the two available dimensions, `sm` and `md`, highlighting differences in typography, padding, and spacing. Demonstrates how badges adapt to compact interfaces and layouts without requiring interactive touch-target dimensions.

### 4. WithIcons
Demonstrates badges combining descriptive text with decorative Lucide icons representing completion, pending states, failures, and updates. Icons are marked `aria-hidden="true"` because the accompanying text already communicates the intended meaning.

### 5. StatusExamples
Displays badges within a structured task list representing completed, in-progress, pending, failed, and not-started tasks. Demonstrates practical status communication using semantic variants, concise labels, and contextual descriptions.

### 6. LongContent
Tests badge behavior with lengthy descriptive text and an unbroken status identifier inside constrained containers. Demonstrates how responsive wrapping utilities prevent content from exceeding the available layout width.

### 7. InlineUsage
Demonstrates badges placed directly alongside paragraph text to display task status, priority, and approval information. Shows how badges behave as inline, noninteractive metadata without introducing button or link semantics.

## Accessibility Notes

- **Semantic HTML:** Uses the native `<span>` element, providing appropriate noninteractive text semantics without introducing unnecessary interactive roles.

- **Keyboard Navigation:** Badges are not keyboard-focusable by default because they are informational elements rather than interactive controls. No custom keyboard handlers or navigation behavior are implemented.

- **ARIA & Screen Readers:** Badge text remains available to assistive technologies through normal document reading. Decorative icons can be marked `aria-hidden="true"` to avoid redundant announcements, as demonstrated in the Storybook examples.

- **Focus Management:** Does not implement focus indicators or programmatic focus management because badges are noninteractive. Unlike buttons and links, they do not require keyboard focus in their default usage.

- **Semantic Status Communication:** Uses meaningful text labels such as "Completed", "Pending", and "Failed" alongside semantic colors, ensuring status information is not communicated through color alone.

- **Responsive Content:** Supports multiline labels and long unbroken strings through `whitespace-normal`, `wrap-anywhere`, and maximum-width constraints, helping preserve readability in narrow layouts.

- **Dynamic Status Updates:** Does not implement live regions or automatically announce status changes. Consuming applications must provide appropriate status announcements when dynamic updates need to be communicated to screen reader users.
