
# Checkbox

## Overview

Checkbox is a reusable and accessible form component built on the native HTML `<input type="checkbox">` element, designed for selecting or deselecting individual options within the design system. It supports controlled and uncontrolled states, native form validation, disabled behavior, and integration with standard HTML forms.

## Architecture & Design Decisions

- **Pattern Used:** Native Input with Prop-Based Configuration. Uses a single checkbox component rather than compound sub-components or CVA variants, relying on standard HTML attributes for state and behavior.
- **TypeScript Design:** Extends `ComponentPropsWithRef<"input">` while omitting `type`, `children`, `defaultValue`, `readOnly`, and `size` to enforce a focused checkbox API. Supports native refs, event handlers, and controlled or uncontrolled checked states.
- **Styling & Tokens:** Uses Tailwind CSS with semantic tokens including `primary`, `ring`, and `destructive`. The `accent-primary` utility styles the native checkbox indicator, while `focus-visible` and `aria-invalid` utilities provide accessible focus and error states.
- **State Management:** Supports controlled state through `checked` and `onChange`, or uncontrolled state through `defaultChecked`. The component delegates state management to React or the browser without introducing internal state.
- **Label Composition:** Intentionally renders only the checkbox input. Labels, descriptions, validation messages, and their accessibility associations are managed by consuming components, as demonstrated through the Storybook-only `LabeledCheckbox` helper.

## Props / Component API

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `checked` | `boolean` | — | No | Controls the checked state through React. |
| `defaultChecked` | `boolean` | `false` | No | Sets the initial checked state for uncontrolled usage. |
| `onChange` | `React.ChangeEventHandler<HTMLInputElement>` | — | No | Handles selection changes through the native input event. |
| `disabled` | `boolean` | `false` | No | Prevents interaction and applies disabled styling. |
| `required` | `boolean` | `false` | No | Requires selection before native form submission succeeds. |
| `name` | `string` | — | No | Identifies the field during form submission. |
| `value` | `string \| number \| readonly string[]` | `"on"` | No | Specifies the submitted value when checked. |
| `id` | `string` | — | No | Identifies the checkbox for association with an external label. |
| `aria-invalid` | `boolean \| 'false' \| 'true' \| 'grammar' \| 'spelling'` | — | No | Communicates invalid state and applies destructive ring styling when set to `true`. |
| `aria-describedby` | `string` | — | No | Associates descriptions or validation messages with the checkbox. |
| `aria-label` | `string` | — | No | Provides an accessible name when no visible label is available. |
| `className` | `string` | — | No | Additional CSS classes merged with the default styles. |
| `ref` | `React.Ref<HTMLInputElement>` | — | No | Reference to the underlying input element. |

Also extends native `ComponentPropsWithRef<"input">`, excluding `type`, `children`, `defaultValue`, `readOnly`, and `size`. The input type is fixed to `"checkbox"`.

## Storybook Stories

### 1. Default
Provides an interactive playground using Storybook controls to configure the initial checked state, disabled behavior, required validation, and invalid state. Demonstrates a labeled, uncontrolled checkbox with descriptive text and optional validation feedback.

### 2. Checked
Demonstrates a checkbox that starts selected through the native `defaultChecked` property. The browser manages subsequent changes, allowing users to toggle the selection without React-controlled state.

### 3. Controlled
Demonstrates React-managed checkbox state using `checked`, `onChange`, and `useState`. Includes an accessible status message that updates when notifications are enabled or disabled, illustrating controlled form behavior.

### 4. Uncontrolled
Demonstrates browser-managed checkbox state using `defaultChecked`, native form submission, and `FormData`. Also shows forwarded ref support through a separate button that programmatically focuses the checkbox.

### 5. Disabled
Displays a disabled checkbox with an associated label and explanatory description. Demonstrates that disabled inputs cannot be toggled, are skipped during normal keyboard navigation, and are excluded from form submission data.

### 6. DisabledChecked
Demonstrates a checkbox that is initially selected but disabled, representing a locked preference or administrator-controlled setting. The selection remains visually checked while interaction and normal form submission are prevented.

### 7. Required
Demonstrates native HTML form validation using the `required` attribute on an agreement checkbox. The form cannot submit until the checkbox is selected, after which an accessible success message is displayed.

### 8. Invalid
Demonstrates an invalid checkbox with `aria-invalid="true"` and a descriptive validation message. Shows how an error is visually highlighted using the destructive token and associated with the input through `aria-describedby`.

### 9. WithDescription
Displays a checkbox with a visible label and supplementary explanatory text. Demonstrates how unique element IDs and `aria-describedby` provide additional context to assistive technologies without changing the checkbox's native behavior.

### 10. FormIntegration
Demonstrates multiple checkboxes grouped within a semantic `fieldset` and `legend`, alongside a required agreement checkbox. Shows native form submission using `FormData.getAll()`, custom field values, default checkbox values, and the exclusion of unchecked fields.

## Accessibility Notes

- **Semantic HTML:** Uses the native `<input type="checkbox">` element, providing built-in checkbox semantics and checked-state communication to assistive technologies.

- **Keyboard Navigation:** Supports `Tab` for keyboard focus and `Space` for toggling the checked state. Disabled checkboxes are excluded from normal Tab navigation and cannot be activated.

- **ARIA & Screen Readers:** Supports native accessibility attributes including `aria-invalid`, `aria-describedby`, and `aria-label`. Labels and descriptive messages must be associated externally, as demonstrated in the Storybook examples.

- **Focus Management:** Applies a visible focus outline using `focus-visible:outline-2`, `focus-visible:outline-offset-2`, and the semantic `ring` token. Supports forwarded refs for programmatic focus without overriding native browser behavior.

- **Disabled State:** Uses the native `disabled` attribute to prevent interaction and exclude the checkbox from form submission. Disabled styling applies reduced opacity and a non-interactive cursor.

- **Validation Accessibility:** Supports native `required` validation and uses `aria-invalid="true"` to communicate invalid states. The `aria-invalid` styling applies a destructive ring, while consumers are responsible for providing and associating meaningful error messages.

- **Label & Description Association:** Supports external `<label>` elements linked through `htmlFor` and `id`. Descriptions and validation messages can be connected through `aria-describedby`, ensuring additional context is available to screen reader users.

- **Form Accessibility:** Preserves native checkbox behavior for form submission, including custom values and omission of unchecked inputs. Related checkboxes can be grouped using `<fieldset>` and `<legend>` to provide accessible group context.
