
# EmptyState

## Overview

EmptyState is a reusable, noninteractive component designed to communicate when a section, collection, or workspace has no content to display. It follows a compound composition pattern with five components: `EmptyState`, `EmptyStateVisual`, `EmptyStateTitle`, `EmptyStateDescription`, and `EmptyStateActions`, allowing developers to combine illustrations, messages, and optional actions into flexible layouts.

## Architecture & Design Decisions

- **Pattern Used:** Compound Composition / Sub-components. Uses five independently exported components to separate the container, visual, title, description, and actions. Each section is optional, allowing flexible composition without CVA variants, context providers, or complex configuration props.
- **TypeScript Design:** Uses `ComponentPropsWithRef` with the appropriate native HTML element for each component. EmptyState, EmptyStateVisual, and EmptyStateActions extend native `div` attributes; EmptyStateTitle extends `h3`, and EmptyStateDescription extends `p`. All components support native attributes, React children, and refs.
- **Styling & Tokens:** Uses Tailwind CSS with semantic tokens including `foreground` and `muted-foreground`. The root applies a centered flex-column layout, responsive padding, and consistent spacing. Consumers can add surface styling using tokens such as `card`, `border`, and `muted`, while `cn()` merges default and custom classes.
- **Content Composition:** EmptyState provides the outer layout, EmptyStateVisual holds optional icons or illustrations, EmptyStateTitle communicates the main message, EmptyStateDescription provides context, and EmptyStateActions organizes optional controls. The component does not require a specific combination or order through runtime enforcement.
- **State Management:** Does not manage data availability, search results, navigation, or user actions internally. Consumers determine when to display the empty state and handle transitions, form interactions, and other application behavior.
- **Accessibility Semantics:** Does not automatically assign ARIA roles, live regions, or focus behavior. Consumers manage accessible announcements and focus transitions when an empty state appears or is replaced dynamically.

## Props / Component API

### EmptyState

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | Composable visual, title, description, actions, and other React content. |
| `className` | `string` | — | No | Customizes container width, spacing, alignment, and presentation. |
| `role` | `React.AriaRole` | — | No | Optional accessibility role determined by the consuming application. |
| `aria-labelledby` | `string` | — | No | Associates the container with a suitable accessible label when needed. |
| `ref` | `React.Ref<HTMLDivElement>` | — | No | Reference to the root div element. |

Extends native `ComponentPropsWithRef<"div">`, supporting standard HTML div attributes and ARIA properties.

### EmptyState Sub-components

| Component | HTML Element | Description |
| :--- | :--- | :--- |
| `EmptyStateVisual` | `<div>` | Holds optional decorative icons, illustrations, or visual placeholders. |
| `EmptyStateTitle` | `<h3>` | Displays the primary empty-state message with emphasized typography. |
| `EmptyStateDescription` | `<p>` | Provides supplementary context or instructions about the empty state. |
| `EmptyStateActions` | `<div>` | Organizes optional buttons, links, and other actions in a responsive layout. |

Each sub-component supports the following native properties:

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | Content rendered inside the selected section. |
| `className` | `string` | — | No | Additional CSS classes for spacing, alignment, and presentation. |
| `ref` | `React.Ref<HTMLElement>` | — | No | Reference to the underlying HTML element, typed specifically for each component. |

## Storybook Stories

### 1. Default
Provides an interactive playground using Storybook controls to customize the EmptyState container's presentation through `className`. Demonstrates the recommended composition with a decorative folder icon, a descriptive heading, and supporting text without requiring an action button.

### 2. Minimal
Demonstrates two simplified compositions: one containing a title and description, and another containing only a title. Shows that visual elements and action controls are optional, allowing EmptyState to adapt to smaller or less complex content areas.

### 3. NoSearchResults
Demonstrates a functional project search where React state filters a local collection and displays an empty state when no matches are found. Includes a Clear Search action to restore results, while the consuming example manages filtering and polite announcements through `aria-live`.

### 4. PrimaryAction
Demonstrates an empty collection with a primary action for creating a sample record. Clicking the button replaces the empty state with populated content, updates an accessible status message, and programmatically moves focus to the newly available Reset button.

### 5. MultipleActions
Demonstrates an empty workspace with primary and secondary actions for creating content or viewing guidance. The secondary action controls a disclosure using `aria-expanded` and `aria-controls`, while the primary action transitions the interface to a populated state.

### 6. CustomVisual
Demonstrates a customized empty-state illustration using a Lucide upload icon inside a bordered, rounded visual container. Shows how consumers can adjust icon dimensions, semantic colors, and backgrounds without introducing dedicated visual variants.

### 7. InsideCard
Demonstrates EmptyState composed inside the existing Card, CardHeader, and CardContent components. Uses reduced padding and a smaller decorative icon to create a compact presentation suitable for dashboard widgets or other constrained surfaces.

## Accessibility Notes

- **Semantic HTML:** Uses native HTML elements appropriate to each section. EmptyStateTitle renders an `<h3>` heading, EmptyStateDescription renders a paragraph, and the remaining components use `<div>` elements without introducing unnecessary interactive semantics.

- **Keyboard Navigation:** EmptyState and its structural sub-components are noninteractive and do not implement custom keyboard behavior. Buttons and links supplied through EmptyStateActions retain their native keyboard interactions and focus handling.

- **ARIA & Screen Readers:** Does not automatically assign accessibility roles or live-region attributes. Consumers can provide appropriate ARIA properties based on the surrounding content and whether the empty state is static or dynamically updated.

- **Focus Management:** Does not automatically move or manage keyboard focus. When an interaction replaces the empty state, consumers can move focus to an appropriate destination, as demonstrated in the PrimaryAction story.

- **Heading Hierarchy:** EmptyStateTitle renders an `<h3>` element by default. Consumers should place the component within an appropriate document heading structure to maintain meaningful navigation for screen reader users.

- **Visual Accessibility:** EmptyStateVisual supports decorative icons or illustrations provided by consumers. Decorative visuals can use `aria-hidden="true"` when the title and description already communicate the relevant information.

- **Dynamic Content Announcements:** EmptyState does not implement automatic announcements when content becomes empty or populated. Consumers can provide live regions or status messages, as demonstrated in the NoSearchResults and PrimaryAction stories.

