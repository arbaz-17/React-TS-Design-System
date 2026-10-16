
# Card

## Overview

Card is a reusable, noninteractive content container designed to organize related information into clearly defined sections throughout the design system. It follows a compound composition pattern with seven components: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, and `CardMedia`, allowing developers to build flexible layouts with optional sections, images, metadata, and actions.

## Architecture & Design Decisions

- **Pattern Used:** Compound Composition / Sub-components. Uses seven independently exported components to separate the card surface, header, title, description, main content, footer, and media areas. Each section is optional, allowing flexible composition without introducing complex prop variants or specialized card types.
- **TypeScript Design:** Uses `ComponentPropsWithRef` with the appropriate native HTML element for each component. Card, CardHeader, CardContent, CardFooter, and CardMedia extend native `div` attributes; CardTitle extends `h3`, and CardDescription extends `p`. All components support native attributes and refs.
- **Styling & Tokens:** Uses Tailwind CSS with semantic tokens including `card`, `card-foreground`, `border`, and `muted-foreground`. Applies `rounded-surface` for consistent corners and `shadow-surface` for subtle elevation. Responsive padding and flexible layouts are handled through Tailwind utilities, while `cn()` merges default and custom classes.
- **Content Composition:** Card provides the outer surface, while sub-components organize content into independent sections. CardMedia supports images through nested native `<img>` elements, and CardFooter provides a flexible layout for actions or metadata.
- **State Management:** Does not manage internal state, loading behavior, or user interactions. Consumers control interactive elements, form submissions, disclosure states, and loading placeholders through composition with existing components such as Button, Badge, Input, and Skeleton.
- **Semantic Structure:** CardTitle renders a native `<h3>` element, while other structural components primarily use `<div>` elements. Consumers are responsible for maintaining an appropriate heading hierarchy and introducing additional semantic landmarks when necessary.

## Props / Component API

### Card

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | Composable card sections and other React content. |
| `className` | `string` | — | No | Customizes the card surface, dimensions, border, shadow, or layout. |
| `aria-label` | `string` | — | No | Provides an accessible label when appropriate to the card's semantic context. |
| `aria-busy` | `boolean` | — | No | Indicates that the card's content is currently being updated or loaded. |
| `ref` | `React.Ref<HTMLDivElement>` | — | No | Reference to the root div element. |

Extends native `ComponentPropsWithRef<"div">`, supporting standard HTML div attributes and ARIA properties.

### Card Sub-components

| Component | HTML Element | Description |
| :--- | :--- | :--- |
| `CardHeader` | `<div>` | Groups introductory content such as the title, description, and status indicators. |
| `CardTitle` | `<h3>` | Provides the card heading with emphasized typography. |
| `CardDescription` | `<p>` | Displays supplementary information beneath or alongside the title. |
| `CardContent` | `<div>` | Contains the card's primary information, including text, forms, metrics, or other components. |
| `CardFooter` | `<div>` | Organizes actions, status information, or supplementary metadata. |
| `CardMedia` | `<div>` | Provides an overflow-controlled container for images or other visual media. |

Each sub-component supports the following native properties:

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | Content rendered inside the selected card section. |
| `className` | `string` | — | No | Additional CSS classes for section layout, spacing, and presentation. |
| `ref` | `React.Ref<HTMLElement>` | — | No | Reference to the underlying HTML element, typed specifically for each component. |

All sub-components extend `ComponentPropsWithRef` for their corresponding HTML elements. No additional custom props or built-in state management are introduced.

## Storybook Stories

### 1. Default
Provides an interactive playground using Storybook controls to customize the Card's root width and surface styling. Demonstrates a basic composition containing CardHeader, CardTitle, CardDescription, and CardContent for displaying a project overview.

### 2. CompleteCard
Demonstrates a fully composed card containing a title, status badge, description, progress indicator, main content, and footer metadata. Shows how multiple design system components can be combined while communicating progress through both visual representation and readable text.

### 3. ContentOnly
Displays a minimal card containing only CardContent with a short informational message. Demonstrates that all structural sections are optional and that the component can serve as a simple content surface without a header or footer.

### 4. HeaderAndContent
Demonstrates a summary card containing a heading, description, and related numerical metrics. Uses native `<dl>`, `<dt>`, and `<dd>` elements to associate metric labels with their values while preserving meaningful document semantics.

### 5. WithImage
Demonstrates an image-led card using CardMedia with a native `<img>` element, followed by descriptive content and footer metadata. Shows responsive image cropping, accessible alternative text, and composition with decorative icons and status badges.

### 6. WithFooterActions
Demonstrates interactive controls placed inside CardFooter without making the entire card interactive. Uses React state and a disclosure button with `aria-expanded` and `aria-controls` to reveal additional information, alongside a conditional reset action.

### 7. WithStatusBadge
Displays a project review card with a text-labeled Badge positioned beside the card title. Demonstrates how status information can be added through component composition rather than introducing dedicated status properties into the Card API.

### 8. FormCard
Demonstrates a native HTML form embedded within CardContent, with submit and reset buttons positioned inside CardFooter. Shows form association through the `form` attribute, native validation, and locally managed submission feedback using an accessible status region.

### 9. LoadingCard
Demonstrates a responsive card that switches between decorative Skeleton placeholders and actual project information using React state. Uses `aria-busy` to identify the loading container and an external status message to communicate loading and completion without introducing built-in loading behavior.

### 10. CustomStyling
Displays compact and highlighted card variations using custom Tailwind classes on the root and individual sections. Demonstrates how surface borders, shadows, typography, and padding can be customized independently without implying that the cards are interactive.

### 11. ResponsiveCardGrid
Demonstrates three project cards arranged in a responsive grid that adapts from one column to multiple columns at larger viewport widths. Uses an `<h2>` section heading above the individual `<h3>` card titles, with consistent content organization and aligned footer sections.

## Accessibility Notes

- **Semantic HTML:** Uses native HTML elements appropriate to each component's purpose. CardTitle renders an `<h3>` heading, CardDescription renders a paragraph, and the remaining structural components use `<div>` elements without introducing unnecessary interactive roles.

- **Keyboard Navigation:** Card and its structural sub-components are noninteractive and do not implement custom keyboard behavior. Interactive elements composed inside cards, such as buttons and form inputs, retain their own native keyboard interactions and focus handling.

- **ARIA & Screen Readers:** Supports native ARIA attributes through inherited HTML properties. Consumers can apply attributes such as `aria-busy`, `aria-label`, `aria-labelledby`, and `aria-expanded` where appropriate, depending on the content and interaction requirements.

- **Focus Management:** Does not automatically manage keyboard focus or make the entire card focusable. Focus remains on interactive elements placed inside the card, and disclosure or form interactions are managed by their consuming components.

- **Heading Hierarchy:** CardTitle renders an `<h3>` element by default. Consumers should place cards within an appropriate document heading structure or use a suitable alternative heading arrangement when the surrounding page hierarchy requires it.

- **Media Accessibility:** CardMedia supports native image elements, allowing consumers to provide meaningful `alt` text for informative images. The media container manages layout and cropping but does not automatically generate image descriptions or accessibility attributes.

- **Status Communication:** Supports composition with text-labeled Badge components and other semantic content. Status and progress information can be communicated through readable text alongside visual indicators, avoiding reliance on color alone.

- **Form Accessibility:** Supports native forms and interactive controls inside CardContent and CardFooter. Labels, validation behavior, keyboard navigation, and submission feedback are managed by the respective form elements and consuming application.

- **Loading Accessibility:** Does not implement an internal loading state. Consumers can compose decorative Skeleton placeholders, apply `aria-busy` to the card, and provide separate status announcements when loading or completion information must be communicated to assistive technologies.
