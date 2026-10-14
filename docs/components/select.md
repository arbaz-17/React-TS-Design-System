# Select Component

**Category:** Core Primitive  
**Implementation:** `src/components/primitives/select.tsx`  
**Status:** Ready for local verification and finalization

## 1. Responsibility

Select is a reusable, accessible single-selection dropdown built on the native HTML `<select>` element.

It provides consistent visual styling, keyboard interaction, controlled/uncontrolled usage and native form integration.

The component relies on browser-native selection behavior.

## 2. Public API

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `value` | `string` | — | Controlled selection |
| `defaultValue` | `string` | — | Initial uncontrolled selection |
| `onChange` | Native React handler | — | Selection changes |
| `children` | React content | — | Options and option groups |
| `name` | `string` | — | FormData field name |
| `required` | `boolean` | `false` | Native constraint validation |
| `disabled` | `boolean` | `false` | Disable interaction |
| `aria-invalid` | Native ARIA attribute | — | Invalid state |
| `aria-describedby` | `string` | — | Description/error association |
| `className` | `string` | — | Consumer styling |
| `ref` | React select ref | — | DOM access |

Other appropriate native select attributes and events remain supported.

**Exports:** `Select`, `SelectProps`.

## 3. TypeScript Architecture

Uses `ComponentPropsWithRef<"select">` with `multiple`, `size`, `value` and `defaultValue` omitted.

Reintroduces `value` and `defaultValue` as optional strings to enforce single-selection usage.

Array-based selections, multiple mode and listbox sizing are outside the component's supported API.

Refs target `HTMLSelectElement`.

## 4. Controlled and Uncontrolled Behavior

**Controlled:** Use `value` and `onChange`. React state determines which option is selected.

**Uncontrolled:** Use `defaultValue`. The browser manages selection.

Do not switch between controlled and uncontrolled modes during a component's lifetime.

Do not use `selected` on individual React option elements. Configure selection through the parent Select.

## 5. Visual Design

Uses existing semantic tokens:

- `background`, `foreground`
- `input`
- `ring`
- `muted`
- `muted-foreground`
- `destructive`

The component is full-width, has a 40px minimum height, uses the shared control radius and maintains a visible focus outline.

Invalid presentation uses `aria-invalid="true"`.

Disabled presentation uses native disabled behavior and muted styling.

The browser provides the native dropdown indicator and option-popup interaction.

## 6. Options and Placeholder

Consumers provide native `<option>` and optional `<optgroup>` elements.

A placeholder-like choice can be represented by a disabled option with an empty value.

Example: `<option value="" disabled>Choose a category</option>`.

For required selects, this empty value remains invalid until the user chooses a valid option.

## 7. Accessibility

- Use a properly associated accessible label.
- Preserve native keyboard selection.
- Maintain visible focus styling.
- Support disabled and required attributes.
- Communicate validation errors through `aria-invalid`.
- Associate explanatory text with `aria-describedby`.
- Do not rely on visual placeholder text as an accessible label.
- Preserve readability across light and dark themes.
- Support keyboard-only navigation, browser zoom and responsive reflow.

Do not introduce custom keyboard handling or redundant roles.

## 8. Native Form Behavior

A named, enabled Select contributes the selected option's value to native FormData.

A disabled Select is excluded from normal form submission.

Native required validation prevents submission when the selected value is empty.

## 9. Architectural Boundaries

Select does not own:

- Option data fetching
- Search or autocomplete
- Multi-selection
- Custom popup positioning
- Business-specific validation
- Error generation
- Label rendering
- Form submission
- Internal React state

These responsibilities belong to consumers or higher-level components.

## 10. Verification Criteria

- Strict TypeScript compilation
- Controlled and uncontrolled usage
- Native option selection
- Disabled options
- Option groups
- Required validation
- FormData submission
- Invalid state
- Ref forwarding
- Labels and descriptions
- Keyboard accessibility
- Light and dark themes
- Mobile and zoom behavior
- Accessibility audit
- ESLint and production build

## 11. Storybook Requirements — Phase 7

Create stories for:

1. Default
2. Controlled
3. Uncontrolled
4. With Placeholder
5. Required
6. Disabled
7. Invalid
8. Option Groups
9. With Description
10. Form Integration

Provide accessible labels in all stories.

## 12. Future Expansion

A searchable combobox, multi-select or custom dropdown would require separate accessibility and interaction decisions.

Those capabilities are intentionally excluded from this native Select primitive.

**Final decision:** Keep Select a lightweight, accessible, single-selection native dropdown with semantic styling and no unnecessary dependencies.