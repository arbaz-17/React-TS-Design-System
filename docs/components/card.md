# Card Component

**Category:** Shared Composite  
**Implementation:** `src/components/composites/card.tsx`  
**Status:** Implemented and verified

## 1. Responsibility

Card is a reusable, composable content container built with React, TypeScript and Tailwind CSS.

It provides a consistent visual surface and layout structure for related information, including project summaries, settings, forms, statistics, profiles and loading placeholders.

Card follows a composition-based architecture. Consumers assemble the sections they need instead of configuring a large collection of specialized props.

Card does not contain application-specific business logic, state management or built-in interaction behavior.

## 2. Component Architecture

Card provides six named components.

| Component | HTML Element | Responsibility |
|---|---|---|
| `Card` | `div` | Root visual surface and layout |
| `CardHeader` | `div` | Groups heading and description |
| `CardTitle` | `h3` | Semantic card heading |
| `CardDescription` | `p` | Supporting descriptive content |
| `CardContent` | `div` | Main content container |
| `CardFooter` | `div` | Actions or supplementary information |

Every section is optional.

Consumers may use the complete structure, omit sections or provide their own elements within the Card.

## 3. Public API

Each component inherits the native React props for its underlying HTML element.

**Public exports:**

- `Card`
- `CardHeader`
- `CardTitle`
- `CardDescription`
- `CardContent`
- `CardFooter`

**Public TypeScript types:**

- `CardProps`
- `CardHeaderProps`
- `CardTitleProps`
- `CardDescriptionProps`
- `CardContentProps`
- `CardFooterProps`

### Shared Props

| Prop | Type | Purpose |
|---|---|---|
| `children` | `ReactNode` | Nested content |
| `className` | `string` | Extend or override styling |
| `ref` | Element-specific React ref | Access native DOM element |
| `id` | `string` | Native element identification |
| `aria-*` | Native ARIA attributes | Accessible relationships and states |
| `data-*` | Native data attributes | Metadata and testing |
| `style` | React CSS properties | Optional inline styling |

Other valid native attributes are preserved.

The components do not introduce custom state, loading, action, status or variant props.

## 4. TypeScript Architecture

All components use `ComponentPropsWithRef` for their native HTML elements.

- `Card`, `CardHeader`, `CardContent` and `CardFooter` use `ComponentPropsWithRef<"div">`.
- `CardTitle` uses `ComponentPropsWithRef<"h3">`.
- `CardDescription` uses `ComponentPropsWithRef<"p">`.

React 19-compatible refs are forwarded directly to the underlying DOM elements.

No custom generics, React Context, CVA or internal state management are required.

Each component is a regular React function component with named exports.

## 5. Styling Architecture

Card uses Tailwind CSS and our shared semantic design tokens.

### Card

- `flex flex-col`
- `gap-5`
- `p-6`
- `min-w-0`
- `rounded-surface`
- `border border-border`
- `bg-card`
- `text-card-foreground`
- `shadow-surface`

The root provides 24px padding and 20px spacing between its direct child sections.

### CardHeader

- Vertical flex layout
- `gap-1.5`
- `min-w-0`

Groups heading and description with consistent spacing.

### CardTitle

- 18px typography
- Semibold font weight
- 28px line height
- Tight letter spacing

Renders an `h3` element.

### CardDescription

- 14px typography
- Muted foreground
- 20px line height

### CardContent

- Minimal layout styling
- `min-w-0`

Allows consumers to define their own grids, forms, charts and content arrangements.

### CardFooter

- Flexible row layout
- `flex-wrap`
- `items-center`
- `gap-3`

Supports multiple actions without forcing their alignment.

### Theme Support

All visual colors and shadows use existing semantic tokens and adapt automatically to the current theme.

No component-specific theme hook is required.

## 6. Composition Patterns

### Complete Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Project Overview</CardTitle>
    <CardDescription>
      Information about the current project.
    </CardDescription>
  </CardHeader>

  <CardContent>
    <Badge variant="success">Active</Badge>
  </CardContent>

  <CardFooter>
    <Button type="button">View Details</Button>
  </CardFooter>
</Card>
```

### Content-only Card

```tsx
<Card>
  <CardContent>
    <p>Simple content without a header or footer.</p>
  </CardContent>
</Card>
```

### Custom Styling

```tsx
<Card className="max-w-md p-4 shadow-none">
  <CardContent>
    Customized Card layout.
  </CardContent>
</Card>
```

### Card with Skeleton

```tsx
<Card aria-busy={loading}>
  <CardHeader>
    <CardTitle>Profile</CardTitle>
  </CardHeader>

  <CardContent>
    {loading ? (
      <Skeleton className="h-16 w-full" />
    ) : (
      <ProfileDetails />
    )}
  </CardContent>
</Card>
```

Consumers manage loading state and any required accessible status announcements.

## 7. Component Composition Principles

Card is based on flexible composition rather than configuration-heavy component APIs.

Key principles:

- Subcomponents remain independently reusable within the Card structure.
- No section is mandatory.
- Content and layout responsibilities remain separate.
- Actions are supplied through real interactive controls.
- Nested primitives do not need knowledge of Card.
- Consumers can customize layout through native children and `className`.
- Card does not inspect or modify its children.
- No React Context is required.

Card provides visual structure, not business behavior.

## 8. Accessibility

Card uses native HTML semantics.

Requirements:

- Preserve logical heading structure.
- Use meaningful headings when content requires them.
- Maintain readable text and sufficient contrast.
- Preserve keyboard behavior of nested interactive components.
- Avoid unnecessary roles and focusable containers.
- Support responsive reflow and browser zoom.
- Maintain accessible form labels, descriptions and errors within Card content.
- Ensure loading states are communicated by the consuming application.

### Heading Levels

`CardTitle` renders `h3` by default.

This is appropriate when the Card is nested under a section heading at level 2.

Consumers requiring another heading level should render an appropriate native heading within `CardHeader`.

A polymorphic heading API is intentionally excluded from the initial implementation.

### Interactive Content

Card itself is not interactive.

A Card containing actions should use appropriate Button or link elements.

Do not make the entire Card clickable by attaching mouse handlers to its generic root without providing equivalent semantic keyboard interaction.

### Loading States

Card supports native attributes such as `aria-busy`.

Individual Skeleton elements remain decorative.

Accessible loading announcements are owned by the surrounding application.

## 9. Native Form Integration

Forms can be composed inside `CardContent`.

Actions may appear within the form or in `CardFooter`.

A submit button outside the form can reference it using the native HTML `form` attribute.

For example, `<Button type="submit" form="feedback-form">Submit</Button>` can submit a form whose `id` is `feedback-form`.

Card does not manage form submission, validation or field values.

## 10. Verification Completed

- All six components compile with strict TypeScript.
- Named public exports work.
- Native attributes and element-specific refs work.
- Complete Card composition renders correctly.
- Content-only Card works without required sections.
- Consumer `className` overrides work.
- Buttons and Badges compose correctly.
- Input and Checkbox integrate with native forms.
- Footer submit buttons work with form association.
- Skeleton loading compositions work.
- Loading-to-loaded transitions work.
- Semantic heading structure was reviewed.
- Keyboard behavior of nested controls remains intact.
- Light and dark themes were verified.
- Responsive layouts and 200% zoom were verified.
- Accessibility testing completed.
- ESLint and production build passed.

## 11. Storybook Requirements — Phase 7

Create stories for:

1. Default
2. Complete Card
3. Content Only
4. Header and Content
5. With Footer Actions
6. With Status Badge
7. Form Card
8. Loading Card with Skeleton
9. Custom Styling
10. Responsive Card Grid

Document the responsibilities of each subcomponent and demonstrate how composition can be used to build different Card layouts.

Stories should also explain heading hierarchy and why Card itself is non-interactive.

## 12. Architectural Boundaries

Card does not own:

- Application state
- Data fetching
- Business validation
- Form submission
- Button event handling
- Status calculations
- Loading logic
- Drag-and-drop
- Routing
- Interactive Card behavior
- Automatic child registration
- React Context
- Complex appearance variants

Consumers and other components own these responsibilities.

Card does not depend on Button, Input, Badge, Skeleton or other design-system primitives.

## 13. Known Considerations

**Heading hierarchy:** The default `h3` title may not match every document structure.

**Composition:** Card sections are optional and do not enforce a mandatory nesting hierarchy.

**Layout:** Consumers control widths and specialized internal layouts.

**Interactive Cards:** A clickable or selectable Card requires a separate accessibility and interaction design.

**Custom styling:** Consumer overrides must preserve contrast, readability and layout stability.

**Final decision:** Card is a lightweight composition-based composite with six semantic building blocks, native HTML props, React-compatible refs and no unnecessary state or abstraction.