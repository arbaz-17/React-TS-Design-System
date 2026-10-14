# Checkbox Component

**Category:** Core Primitive  
**Implementation:** `src/components/primitives/checkbox.tsx`  
**Status:** Implemented and verified

## 1. Responsibility

Checkbox is a reusable, accessible binary selection component built on the native HTML `<input type="checkbox">` element.

It provides consistent visual styling, native checked/unchecked behavior, TypeScript-safe properties, keyboard accessibility and form integration.

The component preserves native browser behavior instead of rebuilding checkbox interaction logic.

## 2. Public API

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | — | Uncontrolled initial selection |
| `onChange` | Native React handler | — | Handle checked-state changes |
| `disabled` | `boolean` | `false` | Prevent user interaction |
| `required` | `boolean` | `false` | Require selection for native validation |
| `name` | `string` | — | Native form field name |
| `value` | Native input value | `"on"` when omitted | Value submitted when checked |
| `id` | `string` | — | Associate an external label |
| `aria-invalid` | Native ARIA attribute | — | Communicate invalid state |
| `aria-describedby` | `string` | — | Associate descriptions and errors |
| `className` | `string` | — | Additional styling |
| `ref` | `Ref<HTMLInputElement>` | — | Access underlying checkbox |

Additional relevant native attributes, event handlers and ARIA attributes are supported.

**Public exports:**
- `Checkbox`
- `CheckboxProps`

## 3. TypeScript Architecture

Checkbox uses `ComponentPropsWithRef<"input">` with selected attributes omitted.

Excluded properties:

- `type` — The component always renders a native checkbox.
- `children` — Content and labels are external.
- `defaultValue` — Initial selection uses `defaultChecked`.
- `readOnly` — Not part of the supported Checkbox API.
- `size` — The component uses a consistent visual size.

The implementation forwards the React ref to the underlying `HTMLInputElement`.

Checkbox introduces no custom variant types, unnecessary generics or internal state management.

## 4. Controlled and Uncontrolled Usage

### Controlled

The consuming application manages the checked state through React.

```tsx
<Checkbox
  checked={enabled}
  onChange={(event) => {
    setEnabled(event.currentTarget.checked);
  }}
  aria-label="Enable notifications"
/>
```

### Uncontrolled

The browser manages the current checked state.

```tsx
<Checkbox
  name="updates"
  defaultChecked
  aria-label="Receive updates"
/>
```

The component does not maintain internal checked state.

Consumers should not switch between controlled and uncontrolled behavior during the same component's lifetime.

## 5. Visual Design

Checkbox uses a native browser-rendered control with semantic Tailwind styling.

**Default appearance:**
- 20 × 20px visual size
- Native checkbox appearance
- Semantic primary accent color
- Consistent cursor behavior
- No custom SVG checkmark

**Checked state:**
- Uses `accent-primary`.
- Automatically adapts to light and dark themes.

**Focus state:**
- Visible focus outline using the semantic ring token.

**Invalid state:**
- Uses `aria-invalid="true"`.
- Displays a destructive visual ring.

**Disabled state:**
- Preserves native disabled behavior.
- Applies reduced opacity.
- Prevents user interaction.

The visible checkbox is 20 × 20px. Consumers should provide a sufficiently large clickable region through associated labels and suitable layout spacing.

## 6. Native Form Behavior

Checkbox preserves native HTML form submission.

When a checkbox is checked, its name and value are included in FormData.

When unchecked, the field is normally omitted.

Example:

`<Checkbox name="newsletter" value="yes" />`

- Checked: `newsletter = "yes"`
- Unchecked: no `newsletter` entry

If no explicit value is supplied, a checked checkbox submits `"on"`.

The component does not automatically serialize unchecked values as `false` or introduce hidden fields.

## 7. Labels and Accessibility

Checkbox follows native checkbox accessibility semantics.

Requirements:

- Every checkbox must have an accessible name.
- Use an associated HTML label whenever appropriate.
- Clicking the label should toggle the checkbox.
- Space toggles the focused checkbox.
- Tab and Shift+Tab provide normal focus navigation.
- Disabled controls are excluded from normal keyboard interaction.
- Focus indicators must remain visible.
- Use `aria-invalid` when validation identifies an error.
- Associate help or error messages through `aria-describedby`.
- Preserve native required validation.
- Maintain sufficient contrast in both themes.
- Support responsive layouts and browser zoom.

Do not add redundant `role="checkbox"` or manually manage `aria-checked` for normal native usage.

Related checkboxes should be grouped through suitable form semantics, such as `fieldset` and `legend`, where appropriate.

## 8. Usage Examples

### Basic

```tsx
<label htmlFor="updates">
  <Checkbox id="updates" name="updates" />
  Receive updates
</label>
```

### Controlled

```tsx
<Checkbox
  checked={enabled}
  onChange={(event) => setEnabled(event.currentTarget.checked)}
  aria-label="Enable notifications"
/>
```

### Disabled

```tsx
<Checkbox
  disabled
  defaultChecked
  aria-label="Unavailable option"
/>
```

### Required

```tsx
<Checkbox
  id="terms"
  name="terms"
  required
/>
<label htmlFor="terms">
  Accept the terms
</label>
```

### Invalid

```tsx
<Checkbox
  id="agreement"
  aria-invalid={true}
  aria-describedby="agreement-error"
/>
<label htmlFor="agreement">
  Accept the agreement
</label>
<p id="agreement-error">
  You must accept the agreement.
</p>
```

Consumers are responsible for providing meaningful labels, descriptions and error messages.

## 9. Verification Completed

- Strict TypeScript compilation
- Native checked/unchecked behavior
- Controlled state
- Uncontrolled state
- Native onChange events
- External label activation
- Space-key toggling
- Keyboard navigation and focus
- Disabled behavior
- Native required validation
- Checked and unchecked FormData behavior
- Default `"on"` submission value
- Custom form values
- DOM ref access and programmatic focus
- Invalid styling and error association
- Light and dark themes
- Responsive layout and browser zoom
- Accessibility verification
- ESLint and production build

## 10. Storybook Requirements — Phase 7

Create stories demonstrating:

1. Default
2. Checked
3. Unchecked
4. Controlled
5. Uncontrolled
6. Disabled
7. Disabled Checked
8. Required
9. Invalid
10. With Label
11. With Description
12. Form Integration

Stories should demonstrate native state handling, keyboard interactions, accessible naming and form submission semantics.

## 11. Architectural Boundaries

Checkbox does not own:

- Label rendering
- Description rendering
- Validation logic
- Error generation
- Application-level checked state
- Checkbox group management
- Bulk selection behavior
- Permissions or business logic
- Custom form serialization
- API requests

Higher-level form components and consuming applications own these responsibilities.

Checkbox does not depend on Button, Input, Textarea, the theme hook or application-specific modules.

## 12. Known Considerations

**Indeterminate state:** Deliberately excluded from the current public API. It may be added later if group or bulk-selection requirements justify it.

**Native appearance:** Browser and operating-system rendering may vary slightly.

**Accessible targets:** Consumers must provide appropriate associated labels and comfortable interaction areas.

**Validation:** `aria-invalid` communicates an invalid state but does not perform validation.

**Native form values:** An unchecked checkbox does not automatically submit `false`.

**Final decision:** Keep Checkbox a focused, native two-state selection primitive with predictable TypeScript props, accessible behavior and semantic styling.