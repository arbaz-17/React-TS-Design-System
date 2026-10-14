# EmptyState Component

**Category:** Shared Composite  
**Implementation:** `src/components/composites/empty-state.tsx`  
**Status:** Implemented and verified

## 1. Overview

EmptyState is a reusable, composable component for presenting situations where no content is available.

Typical use cases include empty project collections, missing records, empty notifications, searches returning no results and newly created workspaces without data.

EmptyState communicates the absence of content and may provide explanatory text or actions to help users proceed.

It handles presentation only. Data retrieval, state detection, navigation and actions remain responsibilities of the consuming application.

## 2. Component Architecture

EmptyState provides five composable components.

| Component | Native element | Responsibility |
|---|---|---|
| `EmptyState` | `div` | Root layout and spacing |
| `EmptyStateVisual` | `div` | Optional illustration or icon |
| `EmptyStateTitle` | `h3` | Main heading |
| `EmptyStateDescription` | `p` | Supporting explanation |
| `EmptyStateActions` | `div` | Optional buttons or links |

All sections are optional.

Consumers can compose a complete empty state, omit the visual, omit actions or render a minimal message.

The components do not inspect or register their children.

## 3. Public API

Each component inherits the native React props for its HTML element using `ComponentPropsWithRef`.

### Public Components

- `EmptyState`
- `EmptyStateVisual`
- `EmptyStateTitle`
- `EmptyStateDescription`
- `EmptyStateActions`

### Public TypeScript Types

- `EmptyStateProps`
- `EmptyStateVisualProps`
- `EmptyStateTitleProps`
- `EmptyStateDescriptionProps`
- `EmptyStateActionsProps`

### Native Props

| Prop | Purpose |
|---|---|
| `children` | Composed content |
| `className` | Consumer styling overrides |
| `ref` | Access to the underlying native DOM element |
| `id` | Native identification |
| `title` | Native element attribute |
| `aria-*` | Consumer-provided accessibility semantics |
| `data-*` | Consumer metadata and testing attributes |

No custom appearance, icon, action or loading props are introduced.

## 4. TypeScript and Ref Architecture

| Component | Native prop type | Ref target |
|---|---|---|
| EmptyState | `ComponentPropsWithRef<"div">` | `HTMLDivElement` |
| EmptyStateVisual | `ComponentPropsWithRef<"div">` | `HTMLDivElement` |
| EmptyStateTitle | `ComponentPropsWithRef<"h3">` | `HTMLHeadingElement` |
| EmptyStateDescription | `ComponentPropsWithRef<"p">` | `HTMLParagraphElement` |
| EmptyStateActions | `ComponentPropsWithRef<"div">` | `HTMLDivElement` |

Refs use the React 19 ref-as-prop convention.

No `forwardRef`, Context, CVA, internal state or custom generic types are required.

## 5. Styling Architecture

The components use Tailwind CSS and the design system's existing semantic tokens.

### EmptyState

- `flex flex-col`
- `w-full min-w-0`
- `items-center`
- `gap-3`
- `px-6 py-12`
- `text-center`

The root provides centered content with consistent spacing.

It does not automatically apply a background, border, shadow or minimum height.

### EmptyStateVisual

- Centered flex layout
- `text-muted-foreground`
- Small bottom spacing

The container accepts consumer-provided icons, images and illustrations.

### EmptyStateTitle

- `text-lg`
- `font-semibold`
- `leading-7`
- `tracking-tight`
- `text-foreground`
- Maximum width and long-word wrapping

### EmptyStateDescription

- `text-sm`
- `leading-6`
- `text-muted-foreground`
- Maximum width and long-word wrapping

### EmptyStateActions

- Horizontal flex layout
- `flex-wrap`
- Centered alignment
- `gap-3`
- Small top spacing

Consumer classes may modify padding, alignment, widths and layout.

All semantic colors adapt to light and dark themes.

## 6. Composition Patterns

### Complete Empty State

```tsx
<EmptyState>
  <EmptyStateVisual>
    <FolderIcon aria-hidden="true" />
  </EmptyStateVisual>

  <EmptyStateTitle>
    No projects yet
  </EmptyStateTitle>

  <EmptyStateDescription>
    Create your first project to get started.
  </EmptyStateDescription>

  <EmptyStateActions>
    <Button type="button" onClick={handleCreate}>
      Create Project
    </Button>
  </EmptyStateActions>
</EmptyState>
```

The consumer supplies `FolderIcon` and `handleCreate`.

### No Search Results

```tsx
<EmptyState>
  <EmptyStateTitle>
    No matching results
  </EmptyStateTitle>

  <EmptyStateDescription>
    Try adjusting your search or filters.
  </EmptyStateDescription>

  <EmptyStateActions>
    <Button
      type="button"
      variant="outline"
      onClick={clearFilters}
    >
      Clear Filters
    </Button>
  </EmptyStateActions>
</EmptyState>
```

### Minimal Empty State

```tsx
<EmptyState>
  <EmptyStateTitle>
    No notifications
  </EmptyStateTitle>

  <EmptyStateDescription>
    You're all caught up.
  </EmptyStateDescription>
</EmptyState>
```

### Inside Card

```tsx
<Card>
  <CardContent>
    <EmptyState>
      <EmptyStateTitle>
        No records
      </EmptyStateTitle>
    </EmptyState>
  </CardContent>
</Card>
```

EmptyState remains independent of Card.

## 7. Accessibility

EmptyState uses native HTML semantics.

### Root Semantics

The root renders a generic `div`.

It does not automatically assign `role="status"`, `role="alert"` or another ARIA role.

It does not automatically receive keyboard focus.

### Heading Hierarchy

`EmptyStateTitle` renders an `h3` by default.

Consumers should ensure that this heading level fits the surrounding document hierarchy.

If a different heading level is necessary, consumers can provide an appropriately styled native heading directly inside EmptyState.

### Images and Illustrations

Decorative SVGs should use `aria-hidden="true"`.

Decorative images should use an empty alternative text value.

Meaningful illustrations should provide appropriate alternative text or another equivalent accessible description.

### Actions

Buttons and links must use their proper native elements and retain meaningful accessible names.

EmptyState does not generate actions or manage event handlers.

### Dynamic Updates

An EmptyState inserted after a search or data update might require an accessible announcement.

The consuming application determines whether an appropriate polite status announcement is needed.

Avoid automatically announcing every static EmptyState as an urgent alert.

### General Accessibility Requirements

- Meaning must not depend on an icon or color alone.
- Maintain readable text and adequate contrast.
- Preserve heading structure.
- Support keyboard access to consumer-provided actions.
- Support responsive reflow and browser zoom.
- Avoid unnecessary roles, focus stops and announcements.

## 8. Application State Boundaries

EmptyState should be displayed only when an application has determined that content is genuinely absent.

Different application states should remain distinct.

| Application state | Typical presentation |
|---|---|
| Loading | Skeleton or loading indicator |
| Error | Error feedback or recovery interface |
| Empty | EmptyState |
| Content available | Normal data presentation |

EmptyState does not perform data fetching, detect empty arrays, inspect API responses or distinguish loading from failure.

Consumers own these decisions.

## 9. Component Integration

EmptyState has been verified with:

- Card containers
- Existing Button variants
- Custom SVG illustrations
- Multiple actions
- Consumer styling overrides
- Narrow layout containers

EmptyState can also be composed inside a future Table's empty-row cell, provided valid native table markup is preserved.

## 10. Verification Completed

- Five component exports verified
- Strict TypeScript compilation
- Native props and React-compatible refs
- Complete component composition
- Title-only composition
- Minimal title-and-description composition
- Optional visuals and actions
- Consumer-provided decorative SVGs
- Multiple action handlers
- Card integration
- Custom styling overrides
- Correct underlying DOM elements
- No automatic ARIA role or tab index
- Keyboard behavior
- Heading hierarchy
- Responsive layouts and narrow containers
- Browser zoom
- Light and dark themes
- Accessibility review
- ESLint and production build

## 11. Storybook Requirements — Phase 7

Create stories for:

1. Default
2. With Visual
3. Without Visual
4. Title Only
5. No Search Results
6. No Records
7. Primary Action
8. Multiple Actions
9. Custom Illustration
10. Inside Card
11. Responsive Layout
12. Dark Theme

Document optional sections, composition patterns, accessibility expectations and appropriate application-state usage.

Do not introduce Storybook-specific behavior into the production component.

## 12. Architectural Boundaries

EmptyState does not own:

- Data fetching
- Empty-data detection
- Error handling
- Loading detection
- Automatic illustrations
- Automatic icon selection
- Button generation
- Navigation
- Search or filter state
- Focus management
- Automatic live-region announcements
- Internal React state
- Context
- CVA variants
- Business-specific messages

These responsibilities remain with the consuming application.

## 13. Known Considerations

**Heading levels:** The default `h3` may not suit every document structure.

**Visual semantics:** Consumers must distinguish decorative from meaningful imagery.

**Dynamic announcements:** Changes to empty-content state may require consumer-managed status updates.

**Layout:** Padding and centered alignment can be overridden for compact or specialized layouts.

**Actions:** EmptyState doesn't determine whether actions are required.

**Final decision:** EmptyState is a lightweight, presentation-only composite with five optional sections, native HTML props, React-compatible refs and semantic Tailwind styling.