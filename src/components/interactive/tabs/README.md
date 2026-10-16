
# Tabs

## Overview

Tabs is a reusable and accessible navigation component designed to organize related content into separate panels within the same interface. It follows a compound composition pattern with four components: `Tabs`, `TabsList`, `TabsTrigger`, and `TabsContent`, supporting controlled and uncontrolled selection, automatic keyboard activation, disabled tabs, and persistent panel content.

## Architecture & Design Decisions

- **Pattern Used:** Compound Composition / Sub-components. Uses four independently exported components to separate selection management, tab navigation, triggers, and content panels. React Context shares the selected value, selection handler, and generated ID prefix without requiring prop drilling or an external component library.
- **TypeScript Design:** Uses `ComponentPropsWithRef` for native `div` and `button` elements. Tabs defines a discriminated union that supports either controlled selection (`value` with `onValueChange`) or uncontrolled selection (`defaultValue`), preventing conflicting configurations. TabsTrigger and TabsContent require a string `value` and omit internally managed HTML and ARIA attributes.
- **Styling & Tokens:** Uses Tailwind CSS with semantic tokens including `foreground`, `muted-foreground`, `primary`, `border`, and `ring`. The selected tab uses a primary-colored underline, while `data-state` attributes control active and inactive styling. The `cn()` utility merges default styles with consumer-provided classes.
- **State Management:** Supports controlled selection through `value` and `onValueChange`, or uncontrolled selection through `defaultValue` and internal `useState`. React Context distributes the current selection and selection function to child components.
- **Keyboard Navigation:** Implements automatic activation using `ArrowLeft`, `ArrowRight`, `Home`, and `End` keys. Navigation wraps between enabled tabs, skips disabled triggers, and uses roving `tabIndex` so only the selected enabled tab participates in normal Tab navigation.
- **ARIA Relationships:** Uses `useId()` to generate a unique identifier prefix for each Tabs instance. TabsTrigger and TabsContent generate matching IDs and connect through `aria-controls` and `aria-labelledby`, preventing collisions between independent instances.
- **Panel Persistence:** All TabsContent components remain mounted in the DOM, while inactive panels are hidden through native `hidden` attributes and Tailwind styling. This preserves child component state and uncontrolled form values when switching between tabs.

## Props / Component API

### Tabs

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `value` | `string` | — | Conditional | Selected tab value in controlled mode. Requires `onValueChange`. |
| `defaultValue` | `string` | — | Conditional | Initial selected tab value in uncontrolled mode. |
| `onValueChange` | `(value: string) => void` | — | Conditional | Called when the selected tab changes. Required in controlled mode. |
| `children` | `React.ReactNode` | — | No | Composable TabsList, TabsTrigger, and TabsContent elements. |
| `className` | `string` | — | No | Additional CSS classes for root dimensions and layout. |
| `ref` | `React.Ref<HTMLDivElement>` | — | No | Reference to the root div element. |

Extends native `ComponentPropsWithRef<"div">`, excluding the original `defaultValue` attribute.

**Selection Requirement:** Provide either `defaultValue` for uncontrolled selection or `value` together with `onValueChange` for controlled selection. The initial value should match an enabled TabsTrigger and its corresponding TabsContent.

### TabsList

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | TabsTrigger elements arranged in a horizontal navigation list. |
| `aria-label` | `string` | — | No* | Provides an accessible name identifying the tab group. |
| `onKeyDown` | `React.KeyboardEventHandler<HTMLDivElement>` | — | No | Optional keyboard handler called before the built-in navigation logic. |
| `className` | `string` | — | No | Additional CSS classes for spacing, layout, and presentation. |
| `ref` | `React.Ref<HTMLDivElement>` | — | No | Reference to the underlying tablist element. |

Extends native `ComponentPropsWithRef<"div">`. Automatically applies `role="tablist"` and `aria-orientation="horizontal"`.

### TabsTrigger

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `value` | `string` | — | Yes | Identifies the tab and connects it with a matching TabsContent panel. |
| `children` | `React.ReactNode` | — | No | Visible tab label, optionally combined with decorative icons. |
| `disabled` | `boolean` | `false` | No | Prevents activation and removes the tab from keyboard navigation. |
| `onClick` | `React.MouseEventHandler<HTMLButtonElement>` | — | No | Optional click handler called before the component's selection logic. |
| `className` | `string` | — | No | Additional CSS classes for tab styling and spacing. |
| `ref` | `React.Ref<HTMLButtonElement>` | — | No | Reference to the native button element. |

Extends native `ComponentPropsWithRef<"button">`, excluding `value`, `type`, `id`, `role`, `tabIndex`, `aria-selected`, and `aria-controls`, which are managed internally.

### TabsContent

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `value` | `string` | — | Yes | Identifies the panel associated with a matching TabsTrigger. |
| `children` | `React.ReactNode` | — | No | Content displayed when the associated tab is selected. |
| `className` | `string` | — | No | Additional CSS classes for panel layout, spacing, and styling. |
| `ref` | `React.Ref<HTMLDivElement>` | — | No | Reference to the underlying panel div element. |


## Storybook Stories

### 1. Default
Provides an interactive playground using Storybook controls to change the initial selected tab and customize root styling. Demonstrates the recommended uncontrolled composition with Overview, Activity, and Settings sections, where each trigger corresponds to a matching content panel.

### 2. Controlled
Demonstrates React-managed tab selection using `value`, `onValueChange`, and `useState`. Shows how selection can change through pointer interactions, keyboard navigation, or an external button, with the current value displayed in an accessible status region.

### 3. KeyboardNavigation
Demonstrates automatic tab activation using `ArrowLeft`, `ArrowRight`, `Home`, and `End`, including wraparound navigation and skipping disabled tabs. Shows roving `tabIndex` behavior and keyboard focus movement from the active trigger into its corresponding panel.

### 4. MultipleInstances
Displays two independent Tabs instances representing project navigation and account navigation, both using overlapping selection values. Demonstrates how React Context isolates selection state and `useId()` generates unique ARIA relationships without identifier collisions.

### 5. PersistentPanelState
Demonstrates preserving content state when switching between tabs containing an uncontrolled input and a React-managed counter. Shows that inactive panels remain mounted but hidden, allowing form values and component state to persist across selection changes.

### 6. HorizontalOverflow
Demonstrates a horizontally scrollable tab list containing multiple tabs with longer labels inside a constrained container. Shows how arrow-key navigation automatically activates enabled tabs and uses `scrollIntoView()` to keep the focused trigger visible.

### 7. InsideCard
Demonstrates Tabs composed within the existing Card, CardHeader, and CardContent components to create a project dashboard interface. Includes decorative Lucide icons, project metrics, activity information, and team details while preserving accessible tab labels and panel relationships.

## Accessibility (a11y)

- **Semantic HTML:** Uses native `<div>` and `<button>` elements enhanced with appropriate ARIA roles. TabsList applies `role="tablist"`, TabsTrigger applies `role="tab"`, and TabsContent applies `role="tabpanel"`.

- **Keyboard Navigation:** Supports `ArrowRight` and `ArrowLeft` to navigate horizontally between enabled tabs, with wraparound behavior. `Home` moves to the first enabled tab, while `End` moves to the last enabled tab. `Tab` and `Shift+Tab` follow normal keyboard navigation.

- **ARIA & Screen Readers:** Uses `aria-selected` to communicate the active tab, `aria-controls` to reference the associated panel, and `aria-labelledby` to connect each panel to its trigger. TabsList identifies the collection through `role="tablist"` and a consumer-provided accessible name.

- **Unique ARIA Relationships:** Generates instance-specific identifiers through React's `useId()`. Trigger and panel IDs are derived from the shared prefix and tab value, preventing collisions when multiple independent Tabs components appear on the same page.

- **Focus Management:** Moves keyboard focus between enabled tab triggers during arrow-key navigation. Selected panels use `tabIndex={0}` and a visible focus outline, allowing users to navigate into panel content through normal keyboard interaction.

- **Focus Visibility:** Uses `focus-visible:ring-2`, `focus-visible:ring-inset`, and the semantic `ring` token for tab triggers. Content panels use `focus-visible:outline-2`, `focus-visible:outline-offset-2`, and `focus-visible:outline-ring` to maintain clear keyboard focus indicators.

- **Disabled State:** Uses the native `disabled` attribute to prevent activation and applies reduced opacity and noninteractive cursor styling. Disabled triggers are skipped by arrow-key navigation and excluded from normal Tab navigation.

- **Panel Visibility:** Inactive TabsContent elements remain mounted but are hidden using the native `hidden` attribute and corresponding Tailwind utilities. Hidden panels and their interactive descendants are excluded from normal keyboard navigation until selected.
