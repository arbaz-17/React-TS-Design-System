# Input Component

**Category:** Core Primitive  
**Implementation:** `src/components/primitives/input.tsx`  
**Status:** Implemented and verified

## 1. Responsibility

Input is a reusable, accessible single-line form control built on the native HTML `<input>` element.

It provides consistent styling, TypeScript-safe native properties, form integration, and visual states while preserving the browser's built-in data-entry behavior.

Input does not own form validation, labels, error messages, or the consumer's input value.

## 2. Public API

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `type` | `InputType` | `text` | Supported HTML input type |
| `value` | Native input value | — | Controlled value |
| `defaultValue` | Native input value | — | Uncontrolled initial value |
| `onChange` | Native React event handler | — | Handle value changes |
| `disabled` | `boolean` | `false` | Native disabled state |
| `readOnly` | `boolean` | `false` | Prevent editing without disabling |
| `required` | `boolean` | `false` | Native required validation |
| `placeholder` | `string` | — | Supplementary input hint |
| `aria-invalid` | Native ARIA attribute | — | Communicate invalid state |
| `aria-describedby` | `string` | — | Associate descriptions and errors |
| `className` | `string` | — | Additional styling |
| `ref` | `Ref<HTMLInputElement>` | — | Access underlying input |

Additional native attributes include `id`, `name`, `autoComplete`, `inputMode`, `minLength`, `maxLength`, `pattern`, `min`, `max`, `step`, and native event handlers.

**Public exports:**
- `Input`
- `InputProps`
- `InputType`

## 3. Supported Input Types

- `text`
- `email`
- `password`
- `search`
- `tel`
- `url`
- `number`

Other input types, including checkbox, radio, file, date, and time, are deliberately excluded from this component's TypeScript API.

The `number` input uses browser-native numeric behavior, but its change-event value remains a string.

## 4. Controlled and Uncontrolled Usage

### Controlled

The consumer manages the value through React state.

```tsx
<Input
  id="name"
  value={name}
  onChange={(event) => {
    setName(event.currentTarget.value);
  }}
/>
```

### Uncontrolled

The browser manages the value, with an optional initial value.

```tsx
<Input
  id="name"
  name="name"
  defaultValue="Alex"
/>
```

Input does not maintain internal value state.

Consumers should not switch an input between controlled and uncontrolled modes during its lifetime.

## 5. Visual States

### Default

- Semantic background and foreground tokens.
- Visible input border.
- Shared control radius.
- Full-width layout and 40px minimum height.

### Focus

- Visible focus outline using the semantic ring token.
- Native keyboard focus behavior.

### Invalid

- Driven by `aria-invalid="true"`.
- Uses the destructive border token.
- Error content and validation logic remain external.

### Disabled

- Uses the native `disabled` attribute.
- Cannot be edited or normally receive focus.
- Uses muted styling.
- Excluded from native form submission.

### Read-only

- Uses the native `readOnly` attribute.
- Remains focusable and selectable.
- Included in native form submission when applicable.
- Retains readable text.

## 6. Accessibility

Input follows native browser form-control semantics.

Requirements:

- Every input must have an accessible name.
- Use an associated `<label>` or appropriate accessible naming.
- Do not use placeholder text as the only label.
- Preserve native keyboard interaction.
- Maintain visible focus indicators.
- Use `aria-invalid` when validation identifies an error.
- Use `aria-describedby` to associate relevant descriptions or error messages.
- Maintain readable text and sufficient visual contrast.
- Preserve disabled and read-only semantics.
- Support browser zoom and responsive reflow.

The future FormField composite will coordinate labels, descriptions, and errors.

## 7. Styling Architecture

Input uses:

- Tailwind CSS.
- Semantic design tokens.
- Shared `cn()` class-merging utility.
- Native attribute and ARIA state selectors.
- React-compatible ref forwarding.

Input deliberately does not use CVA because it has one core visual appearance and no custom visual variant API.

It does not import the theme hook. Light and dark colors resolve automatically through semantic CSS variables.

## 8. Usage Examples

### Basic

```tsx
<label htmlFor="username">Username</label>
<Input id="username" name="username" />
```

### Email

```tsx
<label htmlFor="email">Email address</label>
<Input
  id="email"
  type="email"
  autoComplete="email"
  required
/>
```

### Invalid

```tsx
<label htmlFor="invalid-email">Email address</label>
<Input
  id="invalid-email"
  type="email"
  aria-invalid={true}
  aria-describedby="email-error"
/>
<p id="email-error">Enter a valid email address.</p>
```

### Read-only

```tsx
<label htmlFor="account-id">Account ID</label>
<Input
  id="account-id"
  defaultValue="ACC-001"
  readOnly
/>
```

## 9. Verification Completed

- Strict TypeScript compilation.
- Supported input type restrictions.
- Native HTML attributes.
- Controlled and uncontrolled usage.
- Native browser form integration.
- Native email and required validation.
- Invalid styling and error associations.
- Disabled and read-only behavior.
- Ref forwarding and programmatic focus.
- Keyboard navigation and focus visibility.
- Light and dark themes.
- Responsive layout and browser zoom.
- Accessibility verification.
- ESLint and production build.

## 10. Storybook Requirements — Phase 7

Create stories demonstrating:

1. Default
2. Supported Input Types
3. Controlled
4. Uncontrolled
5. Disabled
6. Read-only
7. Required
8. Invalid
9. With Description
10. With Error Message

Include examples of accessible labels and appropriate ARIA associations.

Stories should demonstrate native capabilities without introducing application-specific form-management logic.

## 11. Architectural Boundaries

Input does not own:

- Form submission.
- Application validation rules.
- Error generation.
- Label rendering.
- Description rendering.
- Value state management.
- Icons or adornments.
- Password visibility controls.
- Character counters.
- API requests.

Higher-level form components or consuming applications own these responsibilities.

## 12. Known Considerations

- `aria-invalid` communicates invalid state but does not perform validation.
- Native browser validation and application validation are separate concerns.
- Numeric input values are represented as strings by native change events.
- Placeholder text is not a substitute for an accessible label.
- Custom visual modifications through `className` must preserve contrast, focus visibility, and usability.

**Final decision:** Keep Input minimal, predictable, accessible, and closely aligned with native HTML behavior.