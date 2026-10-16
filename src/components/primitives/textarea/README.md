
# Textarea

## Overview

Textarea is a reusable and accessible multiline text-entry component built on the native HTML `<textarea>` element, designed for collecting longer text content throughout the design system. It supports controlled and uncontrolled values, configurable rows, vertical resizing, disabled and read-only states, native form validation, and accessible error handling.

## Architecture & Design Decisions

- **Pattern Used:** Native Textarea with Prop-Based Configuration. Uses a single component with standard HTML attributes rather than CVA variants or compound sub-components, keeping the API lightweight and consistent with native browser behavior.
- **TypeScript Design:** Extends `ComponentPropsWithRef<"textarea">` while omitting `children` to encourage value management through `value` and `defaultValue`. Supports native textarea attributes, event handlers, validation constraints, and ref forwarding.
- **Styling & Tokens:** Uses Tailwind CSS with semantic tokens including `background`, `foreground`, `input`, `muted`, `muted-foreground`, `ring`, and `destructive`. Applies `rounded-control` for consistent corners, `min-h-24` for a minimum height, and `focus-visible` utilities for keyboard focus indicators.
- **State Management:** Supports controlled values through `value` and `onChange`, or uncontrolled values through `defaultValue`. The component does not manage internal state, leaving text updates, character counting, and validation logic to consumers.
- **Dimensions & Resizing:** Defaults to four visible rows through `rows={4}` and supports native vertical resizing using `resize-y`. The field maintains a minimum CSS height of 96px and allows scrolling when content exceeds the visible area.
- **Label Composition:** Renders only the native textarea element. Labels, descriptions, and validation messages are provided externally and associated through HTML attributes and ARIA references, as demonstrated through the Storybook-only `LabeledTextarea` helper.

## Props / Component API

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `rows` | `number` | `4` | No | Sets the initial number of visible text rows, subject to the minimum CSS height. |
| `value` | `string \| number \| readonly string[]` | — | No | Controls the textarea value through React. |
| `defaultValue` | `string \| number \| readonly string[]` | — | No | Sets the initial value for uncontrolled usage. |
| `onChange` | `React.ChangeEventHandler<HTMLTextAreaElement>` | — | No | Handles text changes through the native change event. |
| `placeholder` | `string` | — | No | Displays supplementary guidance when the textarea is empty. |
| `disabled` | `boolean` | `false` | No | Prevents interaction and resizing while applying disabled styling. |
| `readOnly` | `boolean` | `false` | No | Prevents editing while preserving focusability and text selection. |
| `required` | `boolean` | `false` | No | Enables native required-field validation. |
| `minLength` | `number` | — | No | Specifies the minimum permitted text length for native validation. |
| `maxLength` | `number` | — | No | Specifies the maximum permitted text length. |
| `name` | `string` | — | No | Identifies the textarea during native form submission. |
| `id` | `string` | — | No | Identifies the textarea for association with an external label. |
| `aria-invalid` | `boolean \| 'false' \| 'true' \| 'grammar' \| 'spelling'` | — | No | Communicates an invalid state and applies destructive border styling when true. |
| `aria-describedby` | `string` | — | No | Associates supplementary instructions or validation messages with the textarea. |
| `className` | `string` | — | No | Additional CSS classes merged with the component's default styles. |
| `ref` | `React.Ref<HTMLTextAreaElement>` | — | No | Reference to the underlying textarea element. |

Also extends native `ComponentPropsWithRef<"textarea">`, excluding `children`. Standard HTML textarea attributes, event handlers, and ARIA properties remain supported.

## Storybook Stories

### 1. Default
Provides an interactive playground using Storybook controls to configure visible rows, placeholder text, required validation, disabled behavior, read-only state, and invalid state. Demonstrates the component's default appearance with an associated visible label.

### 2. Controlled
Demonstrates React-managed textarea content using `value`, `onChange`, and `useState`. Displays character and line counts that update as the user types, illustrating how consumers can derive additional information from controlled state.

### 3. Uncontrolled
Demonstrates browser-managed multiline content initialized through `defaultValue`, with the current text retrieved during form submission using `FormData`. Also demonstrates ref forwarding through a separate button that programmatically focuses the textarea.

### 4. CustomRows
Compares textareas configured with four and eight visible rows using the native `rows` attribute. Demonstrates how the initial field height changes while respecting the component's minimum CSS height of 96px.

### 5. LongContent
Displays a textarea containing an extended multiline document with multiple paragraphs and section headings. Demonstrates native text wrapping, scrolling, and editing when the content exceeds the initially visible area.

### 6. VerticalResizing
Demonstrates native vertical resizing using Tailwind's `resize-y` utility and the browser's built-in resize handle. Shows how users can manually increase or decrease the field height without automatic content-based resizing.

### 7. Disabled
Displays a textarea with the native `disabled` attribute and muted visual styling. Demonstrates that disabled textareas cannot be edited, are excluded from normal Tab navigation and form submission, and do not allow manual resizing.

### 8. ReadOnly
Demonstrates a read-only textarea containing published text that users can select and copy but cannot modify. Shows how read-only behavior preserves keyboard focus and text selection, unlike the disabled state.

### 9. Required
Demonstrates native HTML form validation using `required`, `minLength`, and `maxLength` constraints. Users can test empty or insufficient feedback before submitting valid content and receiving an accessible success confirmation.

### 10. WithDescription
Displays a textarea with a visible label, placeholder, and supplementary instructions describing the expected project requirements. Demonstrates how `aria-describedby` connects contextual guidance to the field for assistive technologies.

### 11. WithErrorMessage
Demonstrates consumer-managed validation using React state and a minimum trimmed-text length requirement. Shows how `aria-invalid` applies destructive styling while `aria-describedby` associates instructions and conditional error messages, which disappear once the input becomes valid.

## Accessibility Notes

- **Semantic HTML:** Uses the native `<textarea>` element, providing built-in multiline text-entry semantics, browser-supported editing, text selection, and scrolling behavior.

- **Keyboard Navigation:** Supports `Tab` for keyboard focus, `Enter` for inserting line breaks, and standard keyboard interactions for text editing and selection. Disabled textareas are excluded from normal Tab navigation, while read-only textareas remain focusable.

- **ARIA & Screen Readers:** Supports native accessibility attributes including `aria-invalid`, `aria-describedby`, and `aria-label`. Visible labels and supplementary instructions are associated externally, allowing assistive technologies to identify the field and its purpose.

- **Focus Management:** Applies a visible focus outline through `focus-visible:outline-2`, `focus-visible:outline-offset-2`, and the semantic `ring` token. Preserves native browser focus behavior and supports forwarded refs for programmatic focus.

- **Disabled & Read-Only States:** Uses native `disabled` and `readOnly` attributes to distinguish unavailable fields from non-editable content. Disabled textareas receive muted styling, cannot be resized, and are excluded from form submission, while read-only fields remain focusable and selectable.

- **Validation Accessibility:** Supports native validation attributes such as `required`, `minLength`, and `maxLength`. When `aria-invalid="true"` is provided, a destructive border is applied, while consumers remain responsible for validation logic and meaningful error messages.

- **Label & Description Association:** Supports external `<label>` elements connected through `htmlFor` and `id`. Supplementary descriptions and validation messages can be associated through `aria-describedby`, ensuring relevant instructions and errors are available to screen reader users.

- **Resizing & Content Accessibility:** Supports native vertical resizing through `resize-y`, allowing users to adjust the visible text area according to their needs. Longer content remains accessible through native scrolling and keyboard navigation.

- **Form Accessibility:** Preserves native HTML form behavior, including controlled and uncontrolled values, browser validation, character-length constraints, and `FormData` integration. The component does not override standard browser text-entry interactions.
