
# Skeleton

## Overview

Skeleton is a reusable, noninteractive loading placeholder component built on the native HTML `<div>` element, designed to represent content while data or interface elements are loading. It supports flexible dimensions, customizable shapes, subtle pulse animation, and responsive layouts through Tailwind CSS utilities.

## Architecture & Design Decisions

- **Pattern Used:** Prop-Based Composition. Uses a single lightweight component without CVA variants or compound sub-components. Dimensions, shapes, and layouts are customized through `className`, allowing multiple Skeleton elements to be composed into complex loading placeholders.
- **TypeScript Design:** Extends `ComponentPropsWithRef<"div">` while omitting `children`, `dangerouslySetInnerHTML`, `role`, `tabIndex`, and `aria-hidden`. This enforces a decorative-only API while preserving native div attributes, inline styles, and ref support.
- **Styling & Tokens:** Uses Tailwind CSS with the semantic `muted` background token and `rounded-control` border radius. Default dimensions are `h-4 w-full`, while consumers can customize geometry through Tailwind utilities. The `cn()` utility merges default styles with consumer-provided classes.
- **Animation & Accessibility:** Uses `motion-safe:animate-pulse` to respect reduced-motion preferences. Forced-colors utilities provide a visible border when system colors override backgrounds, while `aria-hidden="true"` removes decorative placeholders from the accessibility tree.
- **Loading State Management:** Does not manage loading state internally. Consumers conditionally render Skeleton placeholders and loaded content, while parent containers handle busy states and accessible loading announcements.

## Props / Component API

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `className` | `string` | — | No | Customizes dimensions, shape, spacing, and other visual styles through CSS classes. |
| `style` | `React.CSSProperties` | — | No | Applies native inline CSS styles when additional customization is needed. |
| `id` | `string` | — | No | Optional identifier for the underlying div element. |
| `ref` | `React.Ref<HTMLDivElement>` | — | No | Reference to the underlying div element. |

Also extends native `ComponentPropsWithRef<"div">`, excluding `children`, `dangerouslySetInnerHTML`, `role`, `tabIndex`, and `aria-hidden`.

The component renders an empty decorative `<div>` with `aria-hidden="true"`. Its default appearance is a full-width, 16px-high rounded placeholder with a semantic muted background.

## Storybook Stories

### 1. Default
Provides an interactive playground using Storybook controls to customize the Skeleton's dimensions and appearance through `className`. Demonstrates the default placeholder styling and how consumers can override width, height, and shape using Tailwind utilities.

### 2. TextLines
Displays multiple Skeleton elements arranged to represent paragraphs and text content with varying line lengths. Demonstrates how different widths and spacing create realistic text-loading layouts without exposing placeholder content to assistive technologies.

### 3. Avatar
Demonstrates circular Skeleton placeholders in three different sizes using `rounded-full` and dimension utilities. Shows how avatar-loading shapes can be created through CSS classes without requiring dedicated variants or size properties.

### 4. ImagePlaceholder
Displays a responsive image placeholder using a 16:9 aspect ratio, accompanied by supporting text placeholders. Demonstrates how reserving space for images and related information can reduce layout shifts when actual content becomes available.

### 5. ProfileSkeleton
Demonstrates a complete profile-loading layout composed of an avatar placeholder, identity information, and descriptive text lines. Shows how multiple Skeleton elements can be combined to represent structured content while preserving the expected layout.

### 6. CardSkeleton
Demonstrates Skeleton integration with the existing Card, CardHeader, and CardContent components. Shows how loading placeholders can be composed within established component APIs without requiring additional loading properties or specialized Card variants.

### 7. ResponsiveList
Displays a repeated list-loading layout containing avatar, text, and status placeholders across three items. Demonstrates responsive composition using Tailwind utilities, including hiding supplementary placeholder elements on smaller screens to preserve layout usability.

### 8. LoadingToLoaded
Provides an interactive example that switches between Skeleton placeholders and actual profile content using React state. Demonstrates consumer-managed loading behavior, with `aria-busy` identifying the loading region and a persistent live status element communicating loading and completion.

### 9. ReducedMotion
Demonstrates Skeleton placeholders using the `motion-safe:animate-pulse` utility for conditional animation. Shows how the placeholders remain visible without animation when reduced-motion preferences are enabled through browser or operating-system accessibility settings.

## Accessibility Notes

- **Semantic HTML:** Uses an empty native `<div>` element as a purely decorative loading placeholder. It does not introduce interactive semantics or represent actual content within the accessibility tree.

- **Keyboard Navigation:** Skeleton elements are noninteractive and excluded from normal keyboard navigation. The component prevents custom keyboard focus configuration by omitting `tabIndex` from its TypeScript API.

- **ARIA & Screen Readers:** Applies `aria-hidden="true"` directly to the rendered element, preventing decorative placeholders from being announced by screen readers. The property is intentionally excluded from the public API to preserve this behavior.

- **Focus Management:** Does not implement focus indicators or programmatic focus management because placeholders are not interactive controls. The component also disables pointer interactions through `pointer-events-none`.

- **Loading Announcements:** Does not automatically announce loading progress or completion. Consuming applications are responsible for applying `aria-busy` to relevant content regions and providing accessible status messages, as demonstrated in the LoadingToLoaded story.

- **Reduced Motion:** Uses `motion-safe:animate-pulse` so the pulse animation runs only when the user's motion preferences permit animation. When reduced motion is preferred, placeholders remain visible without the pulse effect.

- **Forced-Colors Support:** Applies `forced-colors:border` and `forced-colors:border-[CanvasText]` to preserve placeholder visibility in high-contrast or forced-colors environments where background colors may be overridden.

- **Responsive Layout:** Supports flexible dimensions and responsive Tailwind utilities, allowing placeholders to adapt to different screen sizes. Consumers can reserve appropriate content dimensions to minimize layout shifts during loading transitions.
