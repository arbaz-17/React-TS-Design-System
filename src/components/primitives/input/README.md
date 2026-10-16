
# Input

## Overview

Input is a reusable and accessible single-line form component built on the native HTML `<input>` element, designed for collecting user information consistently throughout the design system. It supports seven input types, controlled and uncontrolled values, disabled and read-only states, native form validation, and accessible error handling.

## Architecture & Design Decisions

- **Pattern Used:** Native Input with Prop-Based Configuration. Uses a single component with native HTML attributes rather than CVA variants or compound sub-components, keeping the API lightweight and consistent.
- **TypeScript Design:** Extends `ComponentPropsWithRef<"input">` while replacing the native `type` property with a restricted `InputType` union containing seven supported types. Supports native attributes, event handlers, and forwarded refs with type-safe input selection.
- **Styling & Tokens:** Uses Tailwind CSS with semantic tokens including `background`, `foreground`, `input`, `muted`, `muted-foreground`, `ring`, and `destructive`. Applies consistent dimensions through `min-h-10`, border radius through `rounded-control`, and visible focus outlines through `focus-visible` utilities.
- **State Management:** Supports controlled inputs through `value` and `onChange`, or uncontrolled inputs through `defaultValue`. The component does not maintain internal state, leaving value management and validation logic to React or the browser.
- **Label Composition:** Intentionally renders only the input element. Labels, descriptions, and validation messages are provided externally and associated through native HTML attributes and ARIA references, as demonstrated in Storybook.

## Props / Component API

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `type` | `'text' \| 'email' \| 'password' \| 'search' \| 'tel' \| 'url' \| 'number'` | `'text'` | No | Determines the native input type and associated browser behavior. |
| `value` | `string \| number \| readonly string[]` | — | No | Controls the input value through React. |
| `defaultValue` | `string \| number \| readonly string[]` | — | No | Sets the initial value for uncontrolled usage. |
| `onChange` | `React.ChangeEventHandler<HTMLInputElement>` | — | No | Handles value changes through the native input event. |
| `placeholder` | `string` | — | No | Displays supplementary guidance when the input is empty. |
| `disabled` | `boolean` | `false` | No | Prevents interaction and applies disabled styling. |
| `readOnly` | `boolean` | `false` | No | Prevents editing while preserving focusability and text selection. |
| `required` | `boolean` | `false` | No | Enables native required-field validation. |
| `name` | `string` | — | No | Identifies the input field during form submission. |
| `id` | `string` | — | No | Identifies the input for association with an external label. |
| `autoComplete` | `string` | — | No | Provides browser autocomplete guidance. |
| `aria-invalid` | `boolean \| 'false' \| 'true' \| 'grammar' \| 'spelling'` | — | No | Communicates validation errors and applies a destructive border when true. |
| `aria-describedby` | `string` | — | No | Associates descriptions or validation messages with the input. |
| `className` | `string` | — | No | Additional CSS classes merged with the component styles. |
| `ref` | `React.Ref<HTMLInputElement>` | — | No | Reference to the underlying input element. |

Also extends native `ComponentPropsWithRef<"input">`, supporting standard HTML input attributes, event handlers, and ARIA properties. The `type` attribute is restricted to the seven supported values through the `InputType` union.

## Storybook Stories

### 1. Default
Provides an interactive playground using Storybook controls to configure the input type, placeholder, disabled state, read-only behavior, required validation, and invalid state. Demonstrates the component's default appearance and native property configuration with an associated visible label.

### 2. SupportedTypes
Displays all seven supported input types: `text`, `email`, `password`, `search`, `tel`, `url`, and `number`. Demonstrates the native browser behavior of each type, including password masking, numeric entry, and type-specific input handling.

### 3. Controlled
Demonstrates React-managed input values using `value`, `onChange`, and `useState`. Displays the current value below the field, showing how updates are synchronized with application state without internal component state management.

### 4. Uncontrolled
Demonstrates browser-managed input values initialized through `defaultValue`. Uses a native HTML form and `FormData` to retrieve the current field value during submission, illustrating uncontrolled form integration.

### 5. Disabled
Displays an input with the native `disabled` attribute and corresponding muted styling. Demonstrates that disabled fields cannot be edited, are skipped during normal Tab navigation, and are excluded from form submission.

### 6. ReadOnly
Demonstrates a read-only input containing a reference identifier alongside explanatory text. Shows that read-only fields remain focusable and selectable while preventing modification, unlike disabled inputs.

### 7. Required
Demonstrates native required-field and email-format validation within an HTML form. Users can attempt submission with empty or malformed values to observe browser validation, followed by an accessible success message after valid submission.

### 8. WithDescription
Displays a URL input with a visible label, placeholder, and supplementary instructions. Demonstrates how `aria-describedby` associates descriptive text with the input, ensuring additional guidance is available to assistive technologies.

### 9. FocusState
Demonstrates keyboard focus behavior and the visible focus indicator applied through semantic ring tokens. Includes a Storybook interaction test using `userEvent.tab()` and `expect(...).toHaveFocus()` to verify keyboard focusability.

### 10. ValidationError
Demonstrates consumer-managed email validation using the browser's native `validity` API and React state. Shows how `aria-invalid` controls destructive border styling while `aria-describedby` associates guidance and error messages, with errors clearing after valid input.

## Accessibility Notes

- **Semantic HTML:** Uses the native `<input>` element with appropriate type attributes, providing built-in text-entry semantics and browser behavior for each supported input type.

- **Keyboard Navigation:** Supports native keyboard focus through `Tab` and text editing using standard keyboard interactions. Disabled inputs are excluded from normal Tab navigation, while read-only inputs remain focusable and selectable.

- **ARIA & Screen Readers:** Supports native accessibility attributes including `aria-invalid`, `aria-describedby`, and `aria-label`. Visible labels, descriptions, and validation feedback are associated externally, allowing assistive technologies to identify input purpose and supplementary information.

- **Focus Management:** Applies a visible focus outline using `focus-visible:outline-2`, `focus-visible:outline-offset-2`, and the semantic `ring` token. Preserves native browser focus behavior and supports refs for programmatic focus when needed.

- **Disabled & Read-Only States:** Uses native `disabled` and `readOnly` attributes to distinguish unavailable fields from non-editable values. Disabled inputs receive muted styling and are excluded from form submission, while read-only inputs retain focusability and can participate in submission.

- **Validation Accessibility:** Supports native validation through attributes such as `required` and type-specific constraints. When `aria-invalid="true"` is provided, the input applies a destructive border, while consumers remain responsible for validation logic and meaningful error messages.

- **Label & Description Association:** Supports external `<label>` elements connected through `htmlFor` and `id`. Supplementary descriptions and error messages can be associated through `aria-describedby`, ensuring the input has an accessible name and appropriate contextual information.

- **Form Accessibility:** Preserves native HTML form behavior, including controlled and uncontrolled values, browser validation, autocomplete attributes, and `FormData` integration. The component does not override standard browser input interactions.
