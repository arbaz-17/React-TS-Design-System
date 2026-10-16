
# Tooltip

## Overview

Tooltip is a reusable and accessible informational overlay component designed to display brief supplementary information when users hover over or focus an interactive element. It follows a compound composition pattern with four components: `TooltipProvider`, `Tooltip`, `TooltipTrigger`, and `TooltipContent`, supporting configurable opening delays, controlled and uncontrolled visibility, flexible positioning, and portal rendering.

## Architecture & Design Decisions

- **Pattern Used:** Compound Composition / Sub-components. Uses four independently exported components to separate shared configuration, visibility management, interactive triggers, and tooltip content. Radix UI manages positioning, accessibility, and interaction behavior, while the design system provides consistent styling and default configurations.
- **TypeScript Design:** Uses `ComponentProps` for TooltipProvider and Tooltip, and `ComponentPropsWithRef` for TooltipTrigger and TooltipContent. TooltipContent excludes `asChild` and `forceMount`, while preserving supported Radix attributes, event handlers, and ref forwarding.
- **Styling & Tokens:** Uses Tailwind CSS with semantic tokens including `card`, `card-foreground`, `border`, `rounded-surface`, and `shadow-surface`. TooltipContent applies compact typography, responsive maximum width, text wrapping, and consistent padding. The `cn()` utility merges default styles with consumer-provided classes.
- **State Management:** Supports controlled visibility through `open` and `onOpenChange`, or uncontrolled visibility through Radix UI's internal state and `defaultOpen`. Consumers can override visibility programmatically without implementing their own tooltip interaction logic.
- **Provider Configuration:** TooltipProvider configures shared timing behavior with defaults of `delayDuration={500}`, `skipDelayDuration={300}`, and `disableHoverableContent={false}`. Individual Tooltip instances can override applicable timing settings.
- **Portal & Positioning:** TooltipContent renders through Radix UI Portal and uses floating-positioning behavior for collision detection and placement adjustment. Defaults to top placement, centered alignment, a 6px trigger offset, and 8px collision padding.
- **Accessibility Approach:** Relies on Radix UI for tooltip descriptions, keyboard-focus activation, Escape dismissal, and focus preservation. Tooltips remain supplementary and noninteractive; triggers must provide their own meaningful accessible names.

## Props / Component API

### TooltipProvider

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `delayDuration` | `number` | `500` | No | Delay in milliseconds before a tooltip opens. |
| `skipDelayDuration` | `number` | `300` | No | Time window in milliseconds during which subsequent tooltips can skip the normal opening delay. |
| `disableHoverableContent` | `boolean` | `false` | No | Controls whether tooltip content remains hoverable without immediately closing. |
| `children` | `React.ReactNode` | — | Yes | Tooltip components receiving the shared provider configuration. |

Extends Radix UI `TooltipPrimitive.Provider` props.

### Tooltip

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `open` | `boolean` | — | No | Controls tooltip visibility through React. |
| `defaultOpen` | `boolean` | `false` | No | Sets the initial visibility for uncontrolled usage. |
| `onOpenChange` | `(open: boolean) => void` | — | No | Called when the tooltip's visibility changes. |
| `delayDuration` | `number` | Provider setting | No | Overrides the provider's opening delay for this tooltip. |
| `disableHoverableContent` | `boolean` | Provider setting | No | Overrides whether tooltip content remains hoverable. |
| `children` | `React.ReactNode` | — | No | Composable TooltipTrigger and TooltipContent components. |

Extends Radix UI `TooltipPrimitive.Root` props. A TooltipProvider must exist above Tooltip in the component tree.

### TooltipTrigger

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | Interactive element that activates the tooltip. |
| `asChild` | `boolean` | `false` | No | Uses the supplied child as the trigger instead of rendering an additional button. |
| `disabled` | `boolean` | `false` | No | Disables the underlying trigger when supported. |
| `ref` | `React.Ref<HTMLButtonElement>` | — | No | Reference to the underlying button in the default rendering mode. |

Directly exposes `TooltipPrimitive.Trigger` and its supported Radix UI properties.

### TooltipContent

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | Short supplementary information displayed inside the tooltip. |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | No | Preferred placement relative to the trigger. |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | No | Alignment of the tooltip relative to its trigger. |
| `sideOffset` | `number` | `6` | No | Distance in pixels between the trigger and tooltip. |
| `collisionPadding` | `number \| object` | `8` | No | Padding used when avoiding viewport or boundary collisions. |
| `avoidCollisions` | `boolean` | `true` (Radix) | No | Allows Radix to adjust placement when space is insufficient. |
| `className` | `string` | — | No | Additional CSS classes for visual styling and dimensions. |
| `ref` | `React.Ref<HTMLDivElement>` | — | No | Reference to the underlying tooltip content element. |

Extends Radix UI `TooltipPrimitive.Content` props, excluding `asChild` and `forceMount`.

TooltipContent automatically renders inside a Radix UI Portal with responsive width constraints and semantic surface styling.

## Storybook Stories

### 1. Default
Provides an interactive playground using Storybook controls to configure the tooltip's opening delay through `delayDuration`. Demonstrates the recommended composition with TooltipTrigger using `asChild` to wrap the design system Button, displaying supplementary information on hover or keyboard focus.

### 2. IconOnlyButton
Demonstrates an icon-only Button with an independent accessible name provided through `aria-label="Download report"`. The tooltip supplies additional context about the action, while clicking the button updates a local status message without initiating a real download.

### 3. KeyboardInteraction
Demonstrates tooltip activation through keyboard focus, dismissal using Escape, and normal focus movement to the next form control. Shows that the tooltip does not steal focus, trap keyboard navigation, or introduce an additional Tab stop.

### 4. Controlled
Demonstrates React-managed tooltip visibility using `open`, `onOpenChange`, and `useState`. Includes an external button that programmatically opens or closes the tooltip and an accessible status region displaying the current visibility state.

### 5. OpeningDelay
Demonstrates a locally scoped TooltipProvider with a 1200ms opening delay and a 300ms skip-delay interval. Compares a tooltip inheriting provider settings with another using `delayDuration={0}` to open immediately, illustrating configuration inheritance and per-instance overrides.

### 6. Placements
Demonstrates tooltip positioning on all four sides of a trigger: top, right, bottom, and left. Shows how `side`, `align`, `sideOffset`, and `collisionPadding` configure preferred placement while Radix adjusts positioning when available viewport space is insufficient.

### 7. InsideDialog
Demonstrates Tooltip composition inside the existing Radix-backed Dialog component. Tests portal stacking, positioning, keyboard focus behavior, and tooltip dismissal within a modal environment, using a higher tooltip stacking layer to maintain visibility above the dialog.

## Accessibility Notes
- **Semantic HTML:** Uses Radix UI Tooltip primitives to provide accessible supplementary descriptions associated with interactive trigger elements. Tooltip content is informational rather than a separate interactive control.

- **Keyboard Navigation:** Supports opening tooltips when their triggers receive keyboard focus through `Tab` navigation. Pressing Escape dismisses an open tooltip, while moving focus away from the trigger follows Radix UI's normal dismissal behavior.

- **ARIA & Screen Readers:** Radix UI manages the accessible relationship between TooltipTrigger and TooltipContent so supplementary content can be exposed as a description of the trigger. The tooltip does not replace the trigger's own accessible name.

- **Accessible Trigger Naming:** TooltipTrigger must contain or reference an appropriately named interactive element. Icon-only controls require an independent accessible name, such as `aria-label`, rather than relying solely on tooltip content for identification.

- **Focus Management:** Does not automatically move keyboard focus into TooltipContent or trap focus while the tooltip is open. Focus remains on the trigger, allowing users to continue navigating through the interface normally.

- **Escape Dismissal:** Supports closing an open tooltip through the Escape key using Radix UI's built-in interaction behavior. Dismissal does not require activating the trigger or interacting with tooltip content.

- **Noninteractive Content:** Tooltips are intended for short informational text rather than buttons, links, forms, or other focusable content. Interactive overlays should use an appropriate component such as Dialog instead of Tooltip.

- **Hover Interaction:** Supports pointer hover activation with configurable opening delays. TooltipProvider allows hoverable content by default and supports skip-delay behavior when users move between multiple tooltip triggers.
