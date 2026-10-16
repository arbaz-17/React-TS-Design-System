
# Accordion

## Overview

Accordion is a reusable and accessible disclosure component designed to organize related content into expandable and collapsible sections throughout the design system. It follows a compound composition pattern with four components: `Accordion`, `AccordionItem`, `AccordionTrigger`, and `AccordionContent`, supporting both single-open and multiple-open configurations. Built on native HTML `<details>` and `<summary>` elements.

## Architecture & Design Decisions

- **Pattern Used:** Compound Composition / Sub-components. Uses four independently exported components to separate the accordion container, disclosure items, interactive triggers, and expandable content. A lightweight React Context shares the native grouping name with AccordionItem components without managing their expansion state.
- **TypeScript Design:** Extends `ComponentPropsWithRef` for the corresponding native HTML elements: `div`, `details`, `summary`, and `div`. Accordion introduces a strict `type` union (`"single" | "multiple"`), while AccordionItem omits native `name` and `open` properties and provides `defaultOpen` for initial expansion. All components support appropriately typed refs.
- **Styling & Tokens:** Uses Tailwind CSS with semantic tokens including `card`, `card-foreground`, `foreground`, `muted`, `muted-foreground`, `border`, and `ring`. Applies `rounded-surface` to the container, consistent row separators, hover and expanded-state backgrounds, and visible keyboard focus indicators. The `cn()` utility merges default styles with consumer-provided classes.
- **Native Disclosure Behavior:** Uses `<details>` and `<summary>` instead of implementing custom disclosure logic. The browser manages opening, closing, keyboard activation, and native disclosure state, including the built-in summary marker.
- **Single & Multiple Modes:** Defaults to `type="multiple"`, allowing independent expansion. In single mode, `useId()` generates a unique shared `name` attribute for the group's native `<details>` elements, allowing at most one item to remain expanded.
- **Initial State & Refs:** AccordionItem initializes its native `open` property once through a callback ref using `defaultOpen`. A ref-assignment helper preserves consumer refs while preventing subsequent prop changes from automatically resetting expansion.
- **Accessibility Approach:** Relies on native disclosure semantics rather than implementing a custom WAI-ARIA accordion-header pattern. It does not introduce custom arrow-key navigation, manually controlled `aria-expanded` attributes, or React-managed expansion state.

## Props / Component API

### Accordion

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `type` | `'single' \| 'multiple'` | `'multiple'` | No | Controls whether items expand exclusively or independently. |
| `children` | `React.ReactNode` | — | No | Composable AccordionItem elements. |
| `className` | `string` | — | No | Additional CSS classes for container dimensions and styling. |
| `ref` | `React.Ref<HTMLDivElement>` | — | No | Reference to the root accordion container. |

Extends native `ComponentPropsWithRef<"div">`, supporting standard HTML div attributes and ARIA properties.

### Accordion Sub-components

| Component | HTML Element | Description |
| :--- | :--- | :--- |
| `AccordionItem` | `<details>` | Represents an individual native disclosure section and manages its initial open state. |
| `AccordionTrigger` | `<summary>` | Provides the interactive disclosure control and visible summary text. |
| `AccordionContent` | `<div>` | Contains the expandable content, including text, lists, forms, and interactive controls. |

### AccordionItem

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `defaultOpen` | `boolean` | `false` | No | Determines whether the item starts expanded when initialized. |
| `children` | `React.ReactNode` | — | No | AccordionTrigger and AccordionContent elements. |
| `onToggle` | `React.ToggleEventHandler<HTMLDetailsElement>` | — | No | Handles native disclosure toggle events. |
| `className` | `string` | — | No | Additional CSS classes for item styling. |
| `ref` | `React.Ref<HTMLDetailsElement>` | — | No | Reference to the underlying details element. |

Extends native `ComponentPropsWithRef<"details">`, excluding `name` and `open`. The grouping name is managed internally, while `defaultOpen` initializes the native disclosure state.

### AccordionTrigger & AccordionContent

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | Visible trigger text or expandable content. |
| `className` | `string` | — | No | Additional CSS classes for typography, spacing, and layout. |
| `ref` | `React.Ref<HTMLElement>` | — | No | Reference to the underlying element, typed specifically for each component. |

AccordionTrigger extends `ComponentPropsWithRef<"summary">`, while AccordionContent extends `ComponentPropsWithRef<"div">`.

**Composition Requirement:** AccordionItem must be rendered inside Accordion because it consumes the internal grouping context. The component throws an error if that context is unavailable.

## Storybook Stories

### 1. Default
Provides an interactive playground using Storybook controls to switch between single-open and multiple-open modes and customize container styling. Demonstrates the recommended composition with three disclosure sections, where the first item starts expanded through `defaultOpen`.

### 2. SingleOpen
Demonstrates exclusive disclosure behavior using `type="single"` and the native `<details name>` grouping mechanism. Opening another item automatically closes the previously expanded section, while users can also close all sections without keeping one permanently open.

### 3. RichContent
Demonstrates expandable sections containing structured lists, decorative icons, form inputs, and action buttons. Shows how interactive controls can be composed inside AccordionContent while native form validation, submission, and status feedback remain consumer responsibilities.

### 4. MultipleInstances
Displays two independent Accordion instances configured in single-open mode, each containing similarly named sections. Demonstrates how `useId()` generates separate native grouping names, ensuring expansion in one accordion does not affect the other.

### 5. InsideCard
Demonstrates Accordion composition within the existing Card, CardHeader, and CardContent components to create a frequently asked questions interface. Shows how Card provides the surrounding layout while Accordion preserves native disclosure behavior without requiring integration-specific props.

### 6. KeyboardInteraction
Provides a manual keyboard-testing example with multiple disclosure sections, an input field, and action buttons. Demonstrates native `Tab`, `Shift+Tab`, `Enter`, and `Space` behavior, visible focus indicators, and normal keyboard access to controls inside expanded sections.

## Accessibility Notes

- **Semantic HTML:** Uses native `<details>` and `<summary>` elements to provide built-in disclosure semantics. AccordionTrigger remains a semantic summary element, while AccordionContent contains the corresponding expandable content.

- **Keyboard Navigation:** Supports `Tab` and `Shift+Tab` to navigate between disclosure triggers and other interactive controls. `Enter` and `Space` toggle the focused summary through native browser behavior. Custom arrow-key navigation is not implemented.

- **ARIA & Screen Readers:** Relies on native disclosure semantics to communicate expanded and collapsed states to assistive technologies. The component does not manually assign `aria-expanded`, `aria-controls`, or custom accordion-header roles.

- **Focus Management:** Preserves native focus behavior without programmatically moving focus when sections expand or collapse. AccordionTrigger applies a visible focus ring through `focus-visible:ring-2`, `focus-visible:ring-inset`, and the semantic `ring` token.

- **Multiple-Open Accessibility:** Allows multiple disclosure sections to remain expanded independently when `type="multiple"` is selected. Expansion behavior is managed by the browser without additional JavaScript state synchronization.

- **Collapsed Content Behavior:** Content inside closed native `<details>` elements is not normally available through sequential keyboard navigation. Interactive controls become reachable through normal Tab navigation when their section is expanded.

- **Trigger Accessibility:** AccordionTrigger preserves the browser's native disclosure marker through `list-item` and `list-inside` styling. The summary text provides the accessible disclosure label, while the expanded state is derived from its parent details element.

- **Interactive Content:** Supports native interactive elements such as buttons, links, and form inputs inside AccordionContent. These elements retain their own keyboard, validation, and accessibility behavior without being managed by the Accordion component.

