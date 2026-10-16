# FormField Component

**Category:** Shared Composite  
**Implementation:** `src/components/composites/form-field.tsx`  
**Status:** Implemented and verified

## 1. Responsibility

FormField is a reusable, composable structure for presenting form controls with consistent labels, descriptions, required indicators and validation messages.

It works with the design system's Input, Textarea, Select, Checkbox and Switch primitives.

FormField coordinates **presentation and structure**, while the consuming application owns field values, validation rules, unique accessibility IDs, form submission and error handling.

It uses native HTML associations without React Context, automatic prop injection or internal state management.

## 2. Component Architecture

FormField provides four named components.

| Component | HTML Element | Responsibility |
|---|---|---|
| `FormField` | `div` | Root field layout and spacing |
| `FormLabel` | `label` | Visible accessible label and optional required indicator |
| `FormDescription` | `p` | Supporting instructions or help text |
| `FormMessage` | `p` | Validation feedback or error text |

The components are designed for composition. Descriptions and messages are optional.

FormField does not require consumers to use a particular form library or control component.

## 3. Public API

### FormField

Inherits `ComponentPropsWithRef<"div">`.

Provides native div attributes, `children`, `className` and `HTMLDivElement` refs.

### FormLabel

Inherits `ComponentPropsWithRef<"label">` and introduces one custom prop.

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `requiredIndicator` | `boolean` | `false` | Displays a decorative required asterisk |
| `htmlFor` | `string` | — | Associates the label with a control |
| `children` | `ReactNode` | — | Label content |
| `className` | `string` | — | Consumer styling |
| `ref` | React label ref | — | Access native label |

The required indicator is purely visual. It does not automatically add the `required` attribute to any control.

### FormDescription

Inherits `ComponentPropsWithRef<"p">`.

Used for supporting instructions, help text and optional field explanations.

### FormMessage

Inherits `ComponentPropsWithRef<"p">`.

Used for validation feedback supplied by the consuming form.

FormMessage does not automatically assign `role="alert"` or manage announcements.

**Public exports:**

- `FormField`
- `FormLabel`
- `FormDescription`
- `FormMessage`
- `FormFieldProps`
- `FormLabelProps`
- `FormDescriptionProps`
- `FormMessageProps`

## 4. TypeScript Architecture

All components use native React element props through `ComponentPropsWithRef`.

- FormField: `ComponentPropsWithRef<"div">`
- FormLabel: `ComponentPropsWithRef<"label">` plus `requiredIndicator`
- FormDescription: `ComponentPropsWithRef<"p">`
- FormMessage: `ComponentPropsWithRef<"p">`

React 19-compatible refs are forwarded directly to their native elements.

No CVA variants, generics, React Context, effects or internal state are required.

FormField does not inspect or clone its children.

## 5. Styling Architecture

The components reuse semantic Tailwind design tokens.

| Component | Default styling |
|---|---|
| FormField | `flex flex-col gap-2 min-w-0` |
| FormLabel | `text-sm font-medium leading-5 text-foreground` |
| Required indicator | `ml-1 text-destructive` |
| FormDescription | `text-xs leading-5 text-muted-foreground` |
| FormMessage | `text-sm leading-5 text-destructive` |

No container border, background, shadow or fixed width is imposed.

FormField can be composed inside Cards, Dialogs, standard forms and other layouts.

All colors adapt automatically to light and dark themes through existing semantic tokens.

## 6. Accessibility Architecture

FormField relies on explicit native relationships.

### Accessible Label

A FormLabel's `htmlFor` must match the associated control's `id`.

This relationship provides an accessible name and enables native label activation.

### Supporting Description

Use `aria-describedby` on the control to reference the ID of the corresponding FormDescription.

### Validation Error

When validation fails:

- Render the appropriate FormMessage.
- Associate its ID with the control.
- Set `aria-invalid="true"` on the control.
- Preserve the association to any existing help text.

`aria-describedby` can reference multiple IDs separated by spaces.

### Unique Identifiers

Consumers should use stable unique IDs.

React's `useId()` is suitable for generating IDs used in labels, descriptions and error associations.

Hardcoded IDs are acceptable only when uniqueness is guaranteed.

### Required Fields

The `requiredIndicator` prop displays a visual asterisk.

The native control must independently receive `required` when the field is required.

The decorative asterisk uses `aria-hidden="true"` and is not a replacement for programmatic required-state semantics.

### Error Announcements

FormMessage does not automatically act as a live region.

The consuming form determines when and how errors are announced, including any focus management after unsuccessful submissions.

## 7. Composition Patterns

### Basic Input Field

```tsx
<FormField>
  <FormLabel htmlFor="name">Name</FormLabel>
  <Input id="name" name="name" />
</FormField>
```

### Required Field with Description

```tsx
<FormField>
  <FormLabel htmlFor="email" requiredIndicator>
    Email address
  </FormLabel>

  <Input
    id="email"
    name="email"
    type="email"
    required
    aria-describedby="email-help"
  />

  <FormDescription id="email-help">
    Enter your primary email address.
  </FormDescription>
</FormField>
```

### Invalid Field

```tsx
<FormField>
  <FormLabel htmlFor="username">
    Username
  </FormLabel>

  <Input
    id="username"
    aria-invalid={true}
    aria-describedby="username-error"
  />

  <FormMessage id="username-error">
    This username is unavailable.
  </FormMessage>
</FormField>
```

### Checkbox and Switch Fields

For Checkbox and Switch, a consumer can arrange the control and label in a horizontal flex row.

The description or validation message can remain below that row.

A separate FormField layout variant is not required.

## 8. Integration with Existing Primitives

FormField has been verified with:

| Primitive | Supported composition |
|---|---|
| Input | Label, description, required indicator, error |
| Textarea | Multiline control with instructions and error |
| Select | Labeled dropdown and validation |
| Checkbox | Horizontal label, required state, error |
| Switch | Horizontal label and description |

Each primitive continues to manage its own native interaction behavior.

FormField does not depend directly on any individual control implementation.

## 9. Validation Responsibilities

FormField does not validate user input.

**The consuming form owns:**

- Controlled and uncontrolled values
- Validation rules
- Validation timing
- Error generation
- `aria-invalid`
- Description and error ID associations
- Submission handling
- Error focus management
- Accessible validation announcements

FormField only provides reusable elements for displaying the resulting field interface.

The design can be used with native HTML validation, custom React validation or an external form library.

## 10. Disabled and Read-only States

The native control determines its disabled or read-only behavior.

FormField does not automatically propagate these states or inspect child controls.

Consumers may apply suitable label or description styling when a control is disabled.

Disabled and read-only semantics must remain correctly represented on the underlying control.

## 11. Multiple Related Controls

FormField is intended to describe an individual form control.

For a group of related Checkbox or Radio controls representing one question, consumers should use appropriate grouping semantics such as `fieldset` and `legend`.

A future field-group abstraction may be added if necessary.

## 12. Verification Completed

- Strict TypeScript compilation
- All four component exports
- Native props and React-compatible refs
- Label association and activation
- Required visual indicator
- Input composition
- Textarea composition
- Select composition
- Checkbox composition
- Switch composition
- Stable unique IDs
- Accessible descriptions
- Multiple `aria-describedby` references
- Consumer-controlled validation messages
- Correct `aria-invalid` states
- Dynamic error appearance and removal
- Keyboard navigation
- Accessible focus behavior
- Light and dark themes
- Responsive layout and browser zoom
- Accessibility testing
- ESLint and production build

## 13. Verified Storybook Coverage — Phase 7

**Storybook navigation:** `Composites/FormField`

**Story file:** [`src/components/composites/form-field.stories.tsx`](../../src/components/composites/form-field.stories.tsx)

**Coverage:** 10 locally verified stories.

| Story | Documented purpose |
|---|---|
| Default Input Field | Accessible input label |
| Required Field | Native required validation |
| With Description | aria-describedby association |
| Invalid Field With Error | Error message and aria-invalid |
| Textarea Field | Textarea composition |
| Select Field | Select composition |
| Checkbox Field | Checkbox composition |
| Switch Field | Switch composition |
| Disabled Control | Disabled-state behavior |
| Multiple Independent Fields | Multifield form submission |

**Storybook controls:** ClassName on the FormField root.

**Themes:** Use the global Storybook light/dark toolbar. There is no dedicated Dark Theme story; verify each story in both themes when relevant.

**Accessibility and behavior:** The examples demonstrate the component’s existing semantics and relevant keyboard, focus, responsive, and ARIA behavior. They do not add behavior to production components.

**Verification status:** Story rendering, manual checks, Storybook build, app build, lint, and the Storybook accessibility panel were reported as passing during Phases 7.2–7.4. This is user-reported verification; it does not constitute a completed automated interaction-test suite or full WCAG conformance audit.

**Synchronization note:** This section is based on the story implementation and verification results in the project conversation. The original repository ZIP did not contain the newly authored `.stories.tsx` files. Perform a final export-name and content comparison against the latest working tree during Phase 7.5.1-F.

## 14. Architectural Boundaries

FormField does not own:

- Input values
- Validation schemas
- Form state
- API requests
- Form submission
- React Hook Form integration
- Zod schemas
- Error generation
- Automatic IDs
- Automatic prop injection
- React Context
- `cloneElement`
- Error announcements
- Focus management

These may be handled by consumers or introduced through separate higher-level abstractions if justified.

## 15. Known Considerations

**Explicit associations:** Consumers must correctly connect labels, descriptions and error messages through matching IDs.

**Required indicator:** A visual asterisk does not make a field programmatically required.

**Error display:** FormMessage presents errors but does not generate or automatically announce them.

**Control independence:** Existing primitives remain reusable both inside and outside FormField.

**Future expansion:** An optional hook or integrated field-control abstraction may be considered later if repeated accessibility wiring becomes difficult to maintain.

**Final decision:** FormField remains a lightweight composition-based form-field structure with explicit accessible relationships, native HTML semantics and no unnecessary state or dependencies.