
# Switch

## Overview

Switch is a reusable and accessible on/off control built on a native HTML checkbox input with `role="switch"`, designed for enabling or disabling settings and preferences throughout the design system. It supports controlled and uncontrolled states, disabled behavior, validation feedback, native form integration, and a visually styled track and thumb.

## Architecture & Design Decisions

- **Pattern Used:** Native Input with Prop-Based Configuration. Uses a single component composed of a native checkbox input and two decorative spans representing the track and thumb. Tailwind `peer` utilities synchronize visual states with the native input without requiring custom JavaScript or CVA variants.
- **TypeScript Design:** Extends `ComponentPropsWithRef<"input">` while omitting `type`, `role`, `aria-checked`, `children`, `defaultValue`, `readOnly`, and `size`. This enforces a consistent switch API with fixed checkbox semantics, native input attributes, event handlers, and ref support.
- **Styling & Tokens:** Uses Tailwind CSS with semantic tokens including `primary`, `primary-foreground`, `background`, `muted`, `input`, `ring`, and `destructive`. The switch uses a rounded track and circular thumb, with `peer-checked`, `peer-focus-visible`, and `peer-disabled` utilities controlling visual states.
- **State Management:** Supports controlled state through `checked` and `onChange`, or uncontrolled state through `defaultChecked`. The browser or consuming application manages the actual checked state, while CSS peer selectors update the visual appearance.
- **Accessibility & Motion:** Uses the native input with `role="switch"` for accessible on/off semantics. Decorative elements are hidden from assistive technologies, while `motion-safe` transitions and forced-colors utilities accommodate accessibility preferences.
- **Label Composition:** Labels, descriptions, and validation messages are provided externally and associated with the native input using `id`, `htmlFor`, and `aria-describedby`, as demonstrated through the Storybook-only `LabeledSwitch` helper.

## Props / Component API

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `checked` | `boolean` | — | No | Controls the on/off state through React. |
| `defaultChecked` | `boolean` | `false` | No | Sets the initial state for uncontrolled usage. |
| `onChange` | `React.ChangeEventHandler<HTMLInputElement>` | — | No | Handles state changes through the native input event. |
| `disabled` | `boolean` | `false` | No | Prevents interaction and applies disabled styling. |
| `required` | `boolean` | `false` | No | Applies the native checkbox required constraint. |
| `name` | `string` | — | No | Identifies the switch during native form submission. |
| `value` | `string \| number \| readonly string[]` | `"on"` | No | Specifies the submitted value when the switch is checked. |
| `id` | `string` | — | No | Identifies the native input for association with an external label. |
| `aria-invalid` | `boolean \| 'false' \| 'true' \| 'grammar' \| 'spelling'` | — | No | Communicates an invalid state and applies destructive ring styling when true. |
| `aria-describedby` | `string` | — | No | Associates descriptions or validation messages with the switch. |
| `aria-label` | `string` | — | No | Provides an accessible name when no visible label is available. |
| `className` | `string` | — | No | Additional CSS classes applied to the outer switch wrapper. |
| `ref` | `React.Ref<HTMLInputElement>` | — | No | Reference to the underlying native checkbox input. |

Also extends native `ComponentPropsWithRef<"input">`, excluding `type`, `role`, `aria-checked`, `children`, `defaultValue`, `readOnly`, and `size`.

The underlying input is always rendered as `type="checkbox"` with `role="switch"`. The wrapper controls visual dimensions, while the native input manages selection, focus, and form behavior.

## Storybook Stories

### 1. DefaultOff
Provides an interactive playground with the switch initially disabled in appearance (off), allowing configuration of initial selection, disabled state, required validation, and invalid state through Storybook controls. Demonstrates the default switch presentation with an accessible label, description, and optional error feedback.

### 2. DefaultOn
Demonstrates a switch initialized in the on state using the native `defaultChecked` property. The browser manages subsequent changes, allowing users to toggle the setting without React-controlled state.

### 3. Controlled
Demonstrates React-managed switch state using `checked`, `onChange`, and `useState`. Displays an accessible status message reflecting whether desktop notifications are on or off, illustrating synchronization between the switch and application state.

### 4. Uncontrolled
Demonstrates browser-managed switch state initialized through `defaultChecked`, with its value retrieved during native form submission using `FormData`. Also shows ref forwarding by providing a separate button that programmatically focuses the native input.

### 5. DisabledOff
Displays a disabled switch in the off state with an explanatory description indicating that the feature is unavailable. Demonstrates that disabled switches cannot be toggled, are skipped during normal keyboard navigation, and receive reduced visual emphasis.

### 6. DisabledOn
Demonstrates a switch that remains visually enabled (on) while interaction is disabled, representing an administrator-enforced setting. The checked appearance remains visible, but users cannot change its state or submit it as an enabled form field.

### 7. Invalid
Demonstrates a switch with a fixed validation-error state using `aria-invalid="true"` and an associated error message. Shows how destructive styling communicates an invalid state visually while `aria-describedby` provides error context to assistive technologies.

### 8. WithDescription
Displays a switch with a visible label and additional explanatory text describing the automatic backup setting. Demonstrates how `aria-describedby` associates supplementary instructions with the native input to improve accessible context.

### 9. FormIntegration
Demonstrates multiple switches grouped within a native HTML form using `fieldset` and `legend`. Shows how checked and enabled switches contribute to `FormData`, while unchecked or disabled switches are excluded, with the submitted preferences displayed through an accessible status region.

## Accessibility Notes

- **Semantic HTML:** Uses a native `<input type="checkbox">` with `role="switch"` to expose on/off switch semantics to assistive technologies. The track and thumb are decorative spans rather than separate interactive elements.

- **Keyboard Navigation:** Supports `Tab` for keyboard focus and `Space` for toggling the switch through native checkbox behavior. Disabled switches are excluded from normal Tab navigation and cannot be activated.

- **ARIA & Screen Readers:** Uses `role="switch"` to expose the control as a switch, with its checked state derived from the native input. Supports attributes such as `aria-invalid`, `aria-describedby`, and `aria-label`, while decorative track and thumb elements use `aria-hidden="true"`.

- **Focus Management:** Applies a visible focus outline to the track through `peer-focus-visible:outline-2`, `peer-focus-visible:outline-offset-2`, and the semantic `ring` token. The native input remains focusable and supports forwarded refs for programmatic focus.

- **Disabled State:** Uses the native `disabled` attribute to prevent interaction and exclude the input from form submission. The track and thumb receive reduced opacity through `peer-disabled` utilities, while the input displays a non-interactive cursor.

- **Validation Accessibility:** Supports native checkbox validation through attributes such as `required`. When `aria-invalid="true"` is provided, the track receives a destructive ring; consumers remain responsible for validation logic and meaningful error feedback.

- **Label & Description Association:** Supports external `<label>` elements linked through `htmlFor` and `id`. Descriptions and validation messages can be associated through `aria-describedby`, providing an accessible name and additional context for screen reader users.

- **Reduced Motion:** Uses `motion-safe:transition-colors` and `motion-safe:transition-transform` to animate track colors and thumb movement only when motion preferences permit. The control remains functional without transitions.

- **Forced-Colors Support:** Applies system colors such as `ButtonText`, `Highlight`, and `Canvas` to maintain track and thumb visibility in forced-colors environments where custom background colors may be overridden.

- **Form Accessibility:** Preserves native checkbox form behavior, including controlled and uncontrolled states, required validation, and `FormData` integration. Checked and enabled switches contribute their configured values, while unchecked and disabled switches are omitted.
