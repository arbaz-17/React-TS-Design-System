
# Alert

## Overview

Alert is a reusable and accessible message container designed to communicate important information, success confirmations, warnings, and errors throughout the design system. It follows a compositional architecture with `Alert`, `AlertTitle`, and `AlertDescription`, allowing developers to create structured messages with flexible content, optional icons, and four semantic visual variants.

## Architecture & Design Decisions

- **Pattern Used:** Hybrid — Compound Composition with Prop Variants. Uses three independently exported components (`Alert`, `AlertTitle`, and `AlertDescription`) to provide flexible content composition, while Class Variance Authority (CVA) manages four semantic visual appearances on the root Alert component.
- **TypeScript Design:** Extends `ComponentPropsWithRef<"div">` for Alert and AlertDescription, and `ComponentPropsWithRef<"p">` for AlertTitle. Uses CVA's `VariantProps` for type-safe visual variant selection, while supporting native HTML attributes, accessibility roles, and refs.
- **Styling & Tokens:** Uses Tailwind CSS with semantic tokens including `foreground`, `muted`, `muted-foreground`, `border`, `success`, `warning`, and `destructive`. Applies `rounded-surface` for consistent corners, responsive padding, and transparency-based backgrounds and borders. The `cn()` utility merges default classes with consumer-provided styles.
- **Content Composition:** Alert acts as the outer message container, AlertTitle provides a prominent heading-like text element, and AlertDescription supports descriptive text, links, paragraphs, and lists. Both sub-components are optional and can be combined with decorative icons or other appropriate React content.
- **Accessibility Semantics:** Does not automatically assign an accessibility role. Consumers can use `role="status"` for polite updates or `role="alert"` for urgent announcements, independently of the chosen visual variant.

## Props / Component API

### Alert

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `variant` | `'default' \| 'success' \| 'warning' \| 'destructive'` | `'default'` | No | Determines the semantic background and border appearance. |
| `children` | `React.ReactNode` | — | No | Composable content, including AlertTitle, AlertDescription, and optional icons. |
| `role` | `React.AriaRole` | — | No | Defines optional accessibility semantics, such as `status` or `alert`. |
| `aria-atomic` | `boolean \| 'false' \| 'true'` | — | No | Controls whether assistive technologies should announce the entire updated live region. |
| `className` | `string` | — | No | Additional CSS classes for layout and styling customization. |
| `ref` | `React.Ref<HTMLDivElement>` | — | No | Reference to the root div element. |

Also extends native `ComponentPropsWithRef<"div">`, supporting standard HTML div attributes and ARIA properties.

### AlertTitle

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | Primary message text displayed with emphasized typography. |
| `className` | `string` | — | No | Additional CSS classes for typography, layout, or icon alignment. |
| `ref` | `React.Ref<HTMLParagraphElement>` | — | No | Reference to the underlying paragraph element. |

Extends native `ComponentPropsWithRef<"p">`. Uses a semantic paragraph element with medium-small, semibold typography rather than introducing a heading level automatically.

### AlertDescription

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | Supporting content, including text, links, paragraphs, and lists. |
| `className` | `string` | — | No | Additional CSS classes for content layout and spacing. |
| `ref` | `React.Ref<HTMLDivElement>` | — | No | Reference to the underlying description div element. |

Extends native `ComponentPropsWithRef<"div">`. Provides readable body typography and consistent styling for nested links.

## Storybook Stories

### 1. Default
Provides an interactive playground using Storybook controls to modify the Alert's visual variant and custom styling. Demonstrates a static informational message composed of AlertTitle and AlertDescription without assigning a live-region role.

### 2. Success
Displays a success message confirming that project preferences have been saved. Demonstrates the `success` variant's semantic background and border styling while keeping announcement behavior separate from visual presentation.

### 3. Warning
Demonstrates a cautionary message informing users that available storage is running low. Uses the `warning` variant to visually communicate attention requirements without automatically interrupting assistive technology users.

### 4. Destructive
Displays an error message indicating that an operation could not be completed. Demonstrates the `destructive` variant for visually communicating failures while leaving live-region semantics under consumer control.

### 5. AllVariants
Displays all four supported appearances: `default`, `success`, `warning`, and `destructive`. Demonstrates the differences in semantic background and border styling while using meaningful text to communicate each message independently of color.

### 6. TitleOnly
Demonstrates an Alert containing only AlertTitle without a supporting description. Shows how the compositional API supports short, self-contained messages without requiring every sub-component.

### 7. DescriptionOnly
Displays an informational notice containing only AlertDescription. Demonstrates how a message can be presented without a separate prominent title when the descriptive content is sufficient.

### 8. WithIcon
Demonstrates all four Alert variants with decorative Lucide icons placed alongside their titles. Shows how semantic icon colors reinforce message meaning while `aria-hidden="true"` prevents redundant screen reader announcements.

### 9. LongContent
Demonstrates an extended warning message containing multiple paragraphs and a structured list of requirements. Shows how AlertDescription supports rich HTML content, natural text wrapping, and readable layouts without horizontal overflow.

### 10. DynamicStatus
Provides an interactive example that switches between unsaved and saved states using React state. Demonstrates a persistent `role="status"` live region with `aria-atomic="true"` to request polite announcements of updated message content without moving keyboard focus.

### 11. UrgentAlert
Demonstrates an urgent session-expiry message that appears after user interaction. Uses `role="alert"` and `aria-atomic="true"` to request assertive announcement behavior, illustrating how urgent notifications differ from ordinary informational messages.

## Accessibility Notes

- **Semantic HTML:** Uses a native `<div>` element for the Alert container, a `<p>` element for AlertTitle, and a `<div>` element for AlertDescription. These elements provide structured message content without automatically introducing interactive behavior or live-region semantics.

- **Keyboard Navigation:** Alert and its sub-components are noninteractive and do not implement custom keyboard navigation. Static messages are not focusable by default, while any interactive elements supplied by consumers retain their native keyboard behavior.

- **ARIA & Screen Readers:** Does not automatically assign an accessibility role. Consumers can provide `role="status"` for polite notifications or `role="alert"` for urgent announcements, depending on message context and timing rather than visual severity alone.

- **Live-Region Announcements:** Supports consumer-defined announcement behavior through native ARIA attributes. The DynamicStatus story demonstrates a persistent polite live region, while UrgentAlert demonstrates an assertive announcement for newly displayed urgent content. Actual announcement behavior depends on assistive technology and should be manually verified.

- **Focus Management:** Does not implement automatic focus movement or focus indicators because the component itself is noninteractive. Dynamic messages can update without changing the user's current keyboard focus.

- **Semantic Status Communication:** Uses four visual variants to distinguish informational, successful, cautionary, and destructive messages. Meaningful titles and descriptions communicate the message independently of background or border colors.

- **Icon Accessibility:** Supports decorative icons composed within AlertTitle or other content areas. Icons can use `aria-hidden="true"` when the accompanying text already communicates their meaning, preventing unnecessary announcements.

- **Content Structure:** AlertDescription supports paragraphs, links, and lists through native HTML elements. AlertTitle uses a styled paragraph rather than an automatic heading element, avoiding unintended changes to the document heading hierarchy.

- **Responsive Layout:** Uses responsive padding, flexible column layout, and `[overflow-wrap:anywhere]` to support long messages and narrow containers. The layout adapts to smaller screens while maintaining readable content structure.

- **Forced-Colors Support:** Applies `forced-colors:border-[CanvasText]` to preserve container boundary visibility when custom colors are overridden by system accessibility settings.
