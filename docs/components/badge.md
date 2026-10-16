# Badge Component

**Category:** Core Primitive

**Implementation:** `src/components/primitives/badge.tsx`

**Status:** Implemented and verified

## 1. Responsibility

Badge is a reusable, **noninteractive** visual label for statuses, categories, counts, and other short metadata. It provides a consistent appearance across the design system through semantic color tokens, two sizes, and an optional decorative icon composed by the consumer.

Badge does not manage application state, change data, respond to clicks, or announce dynamic updates. Use Button or another semantic interactive element when an action is required.

## 2. Public API

`BadgeProps` combines `ComponentPropsWithRef<"span">` with CVA's `VariantProps<typeof badgeVariants>`.

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `variant` | `"neutral" \| "primary" \| "success" \| "warning" \| "destructive" \| "outline" \| null` | `"neutral"` | Semantic visual appearance |
| `size` | `"sm" \| "md" \| null` | `"md"` | Badge spacing and font size |
| `className` | `string` | — | Additional or overriding Tailwind classes |
| `children` | `ReactNode` | — | Visible label and optional decorative icon |
| `ref` | React ref to `HTMLSpanElement` | — | Access the underlying native span |
| Other props | Native span props | — | Appropriate `title`, `data-*`, `id`, etc. |

The CVA variant typings also permit `undefined`; `null` is a supported CVA variant value. Omitting the variant or size uses the defaults above.

**Public exports** from `src/components/index.ts`: `Badge` and `BadgeProps`.

## 3. Visual Variants

| Variant | Semantic tokens | Typical use |
|---|---|---|
| `neutral` | `bg-muted text-muted-foreground` | Generic metadata or category |
| `primary` | `bg-primary text-primary-foreground` | Highlighted or featured metadata |
| `success` | `bg-success text-success-foreground` | Completed or successful status |
| `warning` | `bg-warning text-warning-foreground` | Cautionary status |
| `destructive` | `bg-destructive text-destructive-foreground` | Error or failure status |
| `outline` | `border-input bg-transparent text-foreground` | Low-emphasis outlined label |

Variants control **visual presentation only**. They do not add `role="status"`, `role="alert"`, interactivity, or application behavior. For dynamically updated statuses, the consuming application owns the relevant accessible notification pattern.

## 4. Sizes and Layout

| Size | Classes | Intended use |
|---|---|---|
| `sm` | `px-2 py-0.5 text-xs leading-4` | Compact metadata |
| `md` | `px-2.5 py-1 text-sm leading-5` | Default labels |

The root is an inline-flex `<span>` with `rounded-full`, a transparent border by default, centered content, `gap-1.5`, and medium-weight text. It uses `min-w-0 max-w-full`, `whitespace-normal`, and `wrap-anywhere` to keep lengthy labels within their available width. Nested SVGs use `shrink-0` so icons retain their size.

Badge has no fixed minimum width and no separate shape or icon props.

## 5. Basic Usage

```tsx
import { Badge } from "../components";

<Badge>Draft</Badge>
<Badge variant="success">Completed</Badge>
<Badge variant="warning" size="sm">Pending review</Badge>
<Badge variant="outline">TypeScript</Badge>
```

The `Badge` component renders a native span and can appear in cards, tables, list items, headings, and other suitable text contexts.

## 6. Icon Composition

Badge doesn't import or manage an icon library. Consumers can compose a decorative icon using children:

```tsx
import { CheckCircle2 } from "lucide-react";
import { Badge } from "../components";

<Badge variant="success">
  <CheckCircle2 aria-hidden="true" className="size-3.5" />
  Completed
</Badge>
```

Use `aria-hidden="true"` when the visible text already conveys the icon's meaning. If an icon communicates unique information, provide an accessible text equivalent rather than relying on a visual symbol alone.

## 7. Status and Accessibility

- Always include meaningful visible text for status labels; color must not be the only cue.
- Badge is **not interactive**. Do not use a span Badge as a button or add `tabIndex` merely to make it focusable.
- Badge has no automatic live-region role; static badges should remain ordinary content.
- If a status changes dynamically and requires an announcement, manage `role="status"`, `aria-live`, or other suitable semantics in the consuming application.
- Keep text readable and verify contrast for semantic variants in light, dark, and high-contrast contexts.
- Keep decorative SVGs out of the accessibility tree.
- Do not assign `role="button"` or other widget behavior to Badge.

Badge uses the surrounding document's normal text semantics; it isn't a semantic replacement for an interactive control or notification component.

## 8. Long Labels and Responsive Use

```tsx
<div className="max-w-48">
  <Badge variant="outline">
    Waiting for additional documentation and review
  </Badge>
</div>
```

The component allows words and long labels to wrap rather than forcing `white-space: nowrap`. Consumers should still prefer short, understandable labels where possible. Test badge placement in narrow table cells, cards, and responsive containers.

## 9. Theme and Styling Architecture

Badge uses Tailwind v4 classes and semantic tokens supplied by the global design-system theme. It does not read theme state or manage light/dark switching itself.

`className` is merged through the project's shared `cn()` utility. CVA is used to generate the supported variant and size classes. Consumers can apply additional layout classes without adding custom Badge variant props.

The component does not have dependencies on Tooltip, Table, Card, or any composite family.

## 10. TypeScript and Ref Architecture

- Uses `ComponentPropsWithRef<"span">`, preserving native span attribute typing and React 19 ref behavior.
- Uses `VariantProps<typeof badgeVariants>` for the six variants and two sizes.
- Renders exactly one native `<span>` and forwards its ref directly.
- Has no hooks, React Context, side effects, event handlers, or internal state.
- Relies on `cn()` and `class-variance-authority`; no additional component dependencies.

## 11. Verified Storybook Coverage — Phase 7

**Storybook navigation:** `Primitives/Badge`

**Story file:** [`src/components/primitives/badge.stories.tsx`](../../src/components/primitives/badge.stories.tsx)

**Coverage:** 7 locally verified stories.

| Story | Documented purpose |
|---|---|
| Default | Editable text and visual controls |
| Variants | All six semantic visual variants |
| Sizes | Small and medium sizes |
| With Icons | Decorative icons and alignment |
| Status Examples | Meaningful text status labels |
| Long Content | Wrapping and overflow |
| Inline Usage | Inline content composition |

**Storybook controls:** Children, variant, size and className.

**Themes:** Use the global Storybook light/dark toolbar. There is no dedicated Dark Theme story; verify each story in both themes when relevant.

**Accessibility and behavior:** The examples demonstrate the component’s existing semantics and relevant keyboard, focus, responsive, and ARIA behavior. They do not add behavior to production components.

**Verification status:** Story rendering, manual checks, Storybook build, app build, lint, and the Storybook accessibility panel were reported as passing during Phases 7.2–7.4. This is user-reported verification; it does not constitute a completed automated interaction-test suite or full WCAG conformance audit.

**Synchronization note:** This section is based on the story implementation and verification results in the project conversation. The original repository ZIP did not contain the newly authored `.stories.tsx` files. Perform a final export-name and content comparison against the latest working tree during Phase 7.5.1-F.

## 12. Architectural Boundaries

Badge **does**:

- Present short metadata or status text consistently.
- Supply six semantic visual variants and two sizes.
- Compose with consumer-provided children and decorative SVGs.
- Inherit the global theme through semantic CSS tokens.

Badge **does not**:

- Generate status text or determine application status.
- Provide click actions or keyboard widget behavior.
- Automatically announce live updates.
- Enforce business rules, fetch data, or manage application state.
- Require a global provider or React Context.

## 13. Known Considerations

- Very long status labels may wrap onto multiple lines; compact label wording is preferable.
- The initial source ZIP lacked this Markdown file; it was added during Phase 7.5.1 documentation corrections.
- This guide describes the implementation and the user-verified Storybook stories; validate against the latest local repository during final QA.
