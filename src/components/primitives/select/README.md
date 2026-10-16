
# Select

## Overview

Select is a reusable and accessible single-selection dropdown component built on the native HTML `<select>` element, designed for choosing one option from a predefined list. It supports controlled and uncontrolled selection, native option grouping, disabled states, required validation, and integration with standard HTML forms.

## Architecture & Design Decisions

- **Pattern Used:** Native Select with Prop-Based Configuration. Uses a single component with native HTML attributes rather than CVA variants or compound sub-components. Options are supplied through standard `<option>` and `<optgroup>` elements, preserving native browser functionality.
- **TypeScript Design:** Extends `ComponentPropsWithRef<"select">` while omitting `multiple`, `size`, `value`, and `defaultValue`. Redefines `value` and `defaultValue` as optional strings to enforce a single-selection API, while supporting native attributes, event handlers, and refs.
- **Styling & Tokens:** Uses Tailwind CSS with semantic tokens including `background`, `foreground`, `input`, `muted`, `muted-foreground`, `ring`, and `destructive`. Applies consistent dimensions through `min-h-10`, border radius through `rounded-control`, and keyboard focus outlines using `focus-visible` utilities.
- **State Management:** Supports controlled selection through `value` and `onChange`, or uncontrolled selection through `defaultValue`. The component does not manage selection internally, leaving state management to React or the browser.
- **Option & Label Composition:** Accepts native `<option>` and `<optgroup>` elements through `children`. Labels, descriptions, and validation messages are provided externally and associated using native HTML attributes and ARIA references, as demonstrated through the Storybook-only `LabeledSelect` helper.

## Props / Component API

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `value` | `string` | — | No | Controls the selected option through React. |
| `defaultValue` | `string` | — | No | Sets the initial selected option for uncontrolled usage. |
| `onChange` | `React.ChangeEventHandler<HTMLSelectElement>` | — | No | Handles selection changes through the native change event. |
| `children` | `React.ReactNode` | — | No | Native `<option>` and `<optgroup>` elements defining available choices. |
| `disabled` | `boolean` | `false` | No | Prevents selection and applies disabled styling. |
| `required` | `boolean` | `false` | No | Enables native required-field validation. |
| `name` | `string` | — | No | Identifies the selected value during form submission. |
| `id` | `string` | — | No | Identifies the select for association with an external label. |
| `aria-invalid` | `boolean \| 'false' \| 'true' \| 'grammar' \| 'spelling'` | — | No | Communicates an invalid state and applies destructive border styling when true. |
| `aria-describedby` | `string` | — | No | Associates descriptions or validation messages with the select. |
| `aria-label` | `string` | — | No | Provides an accessible name when an external visible label is unavailable. |
| `className` | `string` | — | No | Additional CSS classes merged with the component styles. |
| `ref` | `React.Ref<HTMLSelectElement>` | — | No | Reference to the underlying select element. |

Also extends native `ComponentPropsWithRef<"select">`, excluding `multiple`, `size`, and the original `value` and `defaultValue` definitions. The component is designed specifically for single selection and preserves standard HTML select attributes, event handlers, and ARIA properties.

## Storybook Stories

### 1. Default
Provides an interactive playground using Storybook controls to explore native selection, disabled behavior, required validation, and invalid states. Demonstrates a labeled dropdown with a placeholder-like option and consumer-provided genre choices.

### 2. Controlled
Demonstrates React-managed selection using `value`, `onChange`, and `useState`. Displays the selected genre in an accessible status region, showing how selection changes synchronize with application state without internal component state management.

### 3. Uncontrolled
Demonstrates browser-managed selection initialized through `defaultValue`, with the current selection retrieved using `FormData` during submission. Also demonstrates forwarded ref support through a separate button that programmatically focuses the dropdown.

### 4. WithPlaceholder
Demonstrates a placeholder-like prompt using a disabled `<option>` with an empty value. Shows how native selects provide an initial selection prompt without supporting a dedicated `placeholder` attribute, while retaining an accessible visible label.

### 5. Required
Demonstrates native HTML form validation using the `required` attribute and an initially empty selection. The form prevents submission until a valid genre is selected, then displays an accessible success confirmation.

### 6. Disabled
Displays a disabled dropdown with a selected value and an explanatory description. Demonstrates that disabled selects cannot be modified, are skipped during normal keyboard navigation, and are excluded from native form submission.

### 7. Invalid
Demonstrates an invalid selection using `aria-invalid="true"` alongside a visible validation message. Shows how the destructive border communicates the error visually while `aria-describedby` associates the message with the dropdown for assistive technologies.

### 8. OptionGroups
Demonstrates organizing related choices using native `<optgroup>` elements with descriptive group labels. Also shows how individual `<option>` elements can be disabled without disabling the entire dropdown, preserving native grouping and selection behavior.

### 9. WithDescription
Displays a labeled dropdown with supplementary instructions explaining its purpose and expected selection. Demonstrates how `aria-describedby` connects descriptive text to the select, providing additional context for screen reader users.

### 10. FormIntegration
Demonstrates Select working alongside Input and Button within a native HTML form for saving game library preferences. Shows required-field validation, value extraction using `FormData`, and accessible submission feedback without requiring backend integration.

## Accessibility Notes

- **Semantic HTML:** Uses the native `<select>` element with standard `<option>` and `<optgroup>` children, providing built-in dropdown semantics and browser-supported single-selection behavior.

- **Keyboard Navigation:** Supports native keyboard interactions, including `Tab` for focus, arrow keys for navigating options, and platform-dependent keys such as `Enter` or `Space` for opening or confirming selections. Disabled selects are excluded from normal Tab navigation.

- **ARIA & Screen Readers:** Supports native accessibility attributes including `aria-invalid`, `aria-describedby`, and `aria-label`. Screen readers can identify the selected value, available options, and option groups through native HTML semantics.

- **Focus Management:** Applies a visible focus outline through `focus-visible:outline-2`, `focus-visible:outline-offset-2`, and the semantic `ring` token. Preserves native browser focus handling and supports refs for programmatic focus when necessary.

- **Disabled State:** Uses the native `disabled` attribute to prevent selection changes and keyboard interaction. Disabled selects receive muted styling and are excluded from native form submission.

- **Validation Accessibility:** Supports native `required` validation, including rejecting an empty selection when appropriate. The `aria-invalid="true"` state applies a destructive border, while consumers remain responsible for validation logic and meaningful error feedback.

- **Label & Description Association:** Supports external `<label>` elements linked through `htmlFor` and `id`. Supplementary instructions and validation messages can be associated using `aria-describedby`, providing accessible names and additional context.

- **Option Group Accessibility:** Supports native `<optgroup>` elements to organize related options under descriptive group labels. Individual options can be disabled while preserving the accessibility and functionality of the remaining choices.

- **Form Accessibility:** Preserves native HTML form behavior, including controlled and uncontrolled selection, required-field validation, and `FormData` integration. The component relies on standard browser selection interactions rather than implementing custom dropdown behavior.
