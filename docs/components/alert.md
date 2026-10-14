# Alert Component

**Category:** Shared Composite  
**Implementation:** `src/components/composites/alert.tsx`  
**Status:** Implemented and verified

## 1. Responsibility

Alert is a reusable component for presenting important information, success feedback, warnings and errors.

It provides consistent semantic visual variants and flexible content composition through three components.

Alert separates **visual appearance from accessibility announcement behavior**. The consuming application determines whether a message needs live-region semantics.

Alert does not own application state, message generation, dismissal or notification timing.

## 2. Component Architecture

Alert provides three named components.

| Component | HTML Element | Responsibility |
|---|---|---|
| `Alert` | `div` | Root container and semantic visual variant |
| `AlertTitle` | `p` | Prominent message title |
| `AlertDescription` | `div` | Supporting text and structured content |

All sections are composable.

A consumer can render an Alert with a title and description, only a title, only a description, or additional suitable content.

## 3. Public API

### Alert

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `variant` | `default`, `success`, `warning`, `destructive` | `default` | Visual appearance |
| `children` | React content | — | Composed Alert content |
| `className` | `string` | — | Additional styling |
| `role` | Native ARIA role | — | Consumer-controlled accessibility semantics |
| `ref` | React div ref | — | Access the root element |
| `id` | `string` | — | Native element identification |
| `aria-*` | Native ARIA attributes | — | Accessibility relationships |

### AlertTitle

Inherits `ComponentPropsWithRef<"p">`.

Provides native paragraph attributes, children, `className` and `HTMLParagraphElement` ref support.

### AlertDescription

Inherits `ComponentPropsWithRef<"div">`.

Provides native div attributes, children, `className` and `HTMLDivElement` ref support.

**Public exports:**
- `Alert`
- `AlertTitle`
- `AlertDescription`
- `AlertProps`
- `AlertTitleProps`
- `AlertDescriptionProps`

## 4. TypeScript Architecture

Alert uses `ComponentPropsWithRef<"div">` combined with CVA's `VariantProps`.

This provides type-safe visual variants and native HTML attributes.

The title and description components use their corresponding native React element prop types.

React 19-compatible refs are passed directly to the underlying DOM elements.

The CVA definition, `alertVariants`, remains private to the implementation.

There is no internal React state, Context, effect or custom event-management logic.

## 5. Visual Variants

Alert supports four variants.

| Variant | Purpose | Semantic styling |
|---|---|---|
| `default` | General information | Muted background, primary accent |
| `success` | Successful operations | Success background tint and border |
| `warning` | Caution or attention | Warning background tint and border |
| `destructive` | Errors and failures | Destructive background tint and border |

The default variant is `default`.

A variant communicates visual meaning but does not automatically assign an accessibility role.

## 6. Styling Architecture

Alert uses Tailwind CSS, Class Variance Authority and the shared `cn()` utility.

### Root Container

The root uses:

- Vertical flex layout
- Consistent spacing between children
- Shared surface border radius
- Standard border with a stronger left accent
- Subtle semantic background tint
- Horizontal padding of 16px
- Vertical padding of 12px
- Normal semantic foreground text color

### AlertTitle

Uses:

- 14px text
- Semibold weight
- 20px line height
- Normal foreground color

The title uses a paragraph element instead of introducing an automatic document heading.

### AlertDescription

Uses:

- 14px text
- 24px line height
- Normal foreground color
- Flexible div content composition

Consumers can add spacing and structured content through `className` and children.

### Theme Support

All colors are derived from the design system's semantic CSS variables.

The component adapts automatically to light and dark themes without a theme hook.

## 7. Composition Examples

### Default

`<Alert><AlertTitle>Account information</AlertTitle><AlertDescription>Your plan renews monthly.</AlertDescription></Alert>`

### Success

`<Alert variant="success"><AlertTitle>Changes saved</AlertTitle><AlertDescription>Your preferences were updated.</AlertDescription></Alert>`

### Warning

`<Alert variant="warning"><AlertTitle>Storage almost full</AlertTitle><AlertDescription>Review your available storage.</AlertDescription></Alert>`

### Destructive

`<Alert variant="destructive"><AlertTitle>Unable to save</AlertTitle><AlertDescription>Please try again.</AlertDescription></Alert>`

### Optional Sections

Consumers may use only `AlertTitle` or only `AlertDescription`.

### Icon Composition

Decorative icons may be placed alongside text through children.

For example, a warning icon can be rendered inside `AlertTitle` using a flex layout.

Decorative icons should use `aria-hidden="true"`.

No icon props or icon-library dependencies are required.

## 8. Accessibility

Alert uses native HTML semantics and consumer-controlled live-region behavior.

**The visual variant does not determine the accessibility role.**

### Static Information

Use an Alert without a live-region role when the message is part of the initial page content or does not need an announcement.

Examples include subscription details, explanatory warnings and general account information.

### Dynamic Non-Urgent Feedback

Use an appropriate polite live region, such as `role="status"`, for updates that users should hear without interrupting their current task.

For reliable announcements, establish the live region before dynamically updating its contents.

### Dynamic Urgent Feedback

Use `role="alert"` when a message requires immediate attention, such as a critical interruption or potentially lost work.

Do not use assertive announcements for routine success messages or general information.

### General Requirements

- Every Alert must communicate meaning through text, not color alone.
- Maintain sufficient foreground/background contrast.
- Preserve readable text in both themes.
- Do not automatically move keyboard focus.
- Do not automatically make Alert focusable.
- Decorative icons must not be the sole source of meaning.
- Preserve appropriate keyboard behavior for consumer-provided links or actions.
- Support responsive layouts and browser zoom.
- Avoid unnecessary live-region announcements.

Alert itself is not a modal dialog, toast manager or focus-management component.

## 9. Dynamic Announcements

The consuming application may render Alert content inside a persistent live region.

**Non-urgent update:**

A container with `role="status"` can announce dynamically updated success content.

**Urgent update:**

A container with `role="alert"` can announce dynamically inserted urgent content.

Avoid assigning duplicate live-region roles to nested containers.

Some screen-reader and browser combinations vary in their announcement behavior; manual assistive-technology testing is recommended.

## 10. Icon and Content Composition

Alert does not automatically select icons for variants.

Consumers may compose SVG icons or other appropriate presentational elements into an Alert.

`AlertDescription` supports paragraphs, lists and other suitable explanatory content.

No fixed message length is enforced, but messages should remain concise and actionable where appropriate.

## 11. Verification Completed

- Strict TypeScript compilation
- All three component exports
- Four CVA visual variants
- Default variant behavior
- Title-only composition
- Description-only composition
- Optional decorative icons
- Long content and list rendering
- Consumer className overrides
- Native element refs
- Correct div/p/div structure
- No automatic accessibility role
- Consumer-controlled live-region semantics
- Dynamic polite status updates
- Dynamic urgent announcements
- Semantic text and contrast verification
- Light and dark themes
- Responsive layout and browser zoom
- Accessibility checks
- ESLint and production build

## 12. Storybook Requirements — Phase 7

Create stories for:

1. Default
2. Success
3. Warning
4. Destructive
5. All Variants
6. Title Only
7. Description Only
8. With Icon
9. Long Content
10. Dynamic Status
11. Urgent Alert
12. Dark Theme

Storybook controls should expose the `variant` prop.

Documentation should distinguish static informational content from dynamically announced feedback.

Accessibility stories should demonstrate appropriate usage of `role="status"` and `role="alert"`.

## 13. Architectural Boundaries

Alert does not own:

- Message generation
- Application validation rules
- API error handling
- Notification queues
- Toast behavior
- Auto-dismissal
- Dismiss buttons
- Retry operations
- Loading states
- Focus management
- Automatic role assignment
- Icon selection
- Business-specific status mapping

Consuming applications determine when messages appear, how they change and whether they require assistive-technology announcements.

Alert does not depend on Card, Button, Badge or other UI primitives.

## 14. Known Considerations

**Accessibility roles:** Consumers must select appropriate semantics based on the message's urgency and lifecycle.

**Static content:** Alerts displayed as part of the page generally do not need automatic live announcements.

**Dynamic content:** Live-region containers should ideally exist before their content changes.

**Custom styling:** Consumer overrides must preserve readability and contrast.

**Interactive actions:** Links and buttons can be composed where appropriate, but Alert itself remains a non-interactive container.

**Final decision:** Keep Alert a lightweight, composable, semantic presentation component with four CVA variants and consumer-controlled accessibility behavior.