
# FormField

## Overview

FormField is a reusable, accessible form-layout component designed to organize labels, input controls, helper text, and validation messages consistently throughout the design system. It follows a compound composition pattern with four components: `FormField`, `FormLabel`, `FormDescription`, and `FormMessage`, allowing developers to create structured form fields using existing components such as Input, Textarea, Select, Checkbox, and Switch.

## Architecture & Design Decisions

- **Pattern Used:** Compound Composition / Sub-components. Uses four independently exported components to separate field layout, labels, descriptions, and validation messages. Each component can be composed with different native form controls without requiring CVA variants, context providers, or automatic child registration.
- **TypeScript Design:** Uses `ComponentPropsWithRef` with the appropriate native HTML element. FormField extends `div`, FormLabel extends `label`, and FormDescription and FormMessage extend `p`. FormLabel adds a custom `requiredIndicator` boolean property, while all components support native HTML attributes and refs.
- **Styling & Tokens:** Uses Tailwind CSS with semantic tokens including `foreground`, `muted-foreground`, and `destructive`. FormField applies a flexible vertical layout with consistent spacing, while the remaining components provide standardized label typography, supplementary text styling, and destructive validation feedback. The `cn()` utility merges default styles with consumer-provided classes.
- **Content Composition:** FormField provides the layout container, FormLabel identifies the control, FormDescription provides optional instructions, and FormMessage displays validation feedback. Components can be arranged differently to support text inputs and binary controls without introducing dedicated layout variants.
- **State Management:** Does not manage field values, validation state, errors, or form submission internally. Consumers handle these responsibilities through React state, native HTML form attributes, or external form-management libraries.
- **Accessibility Relationships:** Does not automatically generate IDs, associate labels, or inject ARIA attributes into controls. Consumers explicitly connect elements using `id`, `htmlFor`, `aria-describedby`, and `aria-invalid`, maintaining predictable native behavior.

## Props / Component API

### FormField

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | Composable labels, form controls, descriptions, and validation messages. |
| `className` | `string` | — | No | Additional CSS classes for field layout, spacing, and dimensions. |
| `ref` | `React.Ref<HTMLDivElement>` | — | No | Reference to the root div element. |

Extends native `ComponentPropsWithRef<"div">`, supporting standard HTML div attributes and ARIA properties.

### FormLabel

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | Visible label text identifying the associated form control. |
| `htmlFor` | `string` | — | No* | Associates the label with a control through its matching `id`. |
| `requiredIndicator` | `boolean` | `false` | No | Displays a decorative destructive-colored asterisk after the label text. |
| `className` | `string` | — | No | Additional CSS classes for label typography and layout. |
| `ref` | `React.Ref<HTMLLabelElement>` | — | No | Reference to the underlying label element. |

Extends native `ComponentPropsWithRef<"label">` with the additional `requiredIndicator` property.

*Use `htmlFor` when the labeled control is not nested inside the label. The visual required indicator does not automatically apply the native `required` attribute.*

### FormDescription

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | Supplementary instructions or contextual information for the field. |
| `id` | `string` | — | No* | Identifies the description for association through `aria-describedby`. |
| `className` | `string` | — | No | Additional CSS classes for supplementary text styling. |
| `ref` | `React.Ref<HTMLParagraphElement>` | — | No | Reference to the underlying paragraph element. |

Extends native `ComponentPropsWithRef<"p">`.

*An `id` is needed when the description must be explicitly associated with a form control through `aria-describedby`.*

### FormMessage

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | Validation feedback or error text displayed for the field. |
| `id` | `string` | — | No* | Identifies the message for association through `aria-describedby`. |
| `className` | `string` | — | No | Additional CSS classes for validation message styling. |
| `ref` | `React.Ref<HTMLParagraphElement>` | — | No | Reference to the underlying paragraph element. |


## Storybook Stories

### 1. Default
Provides an interactive playground using Storybook controls to customize the FormField container's layout and styling. Demonstrates the basic composition of FormLabel and Input, with the visible label associated through matching `htmlFor` and `id` attributes.

### 2. RequiredField
Demonstrates a required email field using FormLabel's `requiredIndicator` alongside the Input component's native `required` attribute. Shows how the decorative asterisk and actual validation requirement are configured independently, with browser validation and accessible submission feedback.

### 3. WithDescription
Displays a URL input with a visible label and supplementary instructions using FormDescription. Demonstrates how a unique description ID and `aria-describedby` connect helper text to the corresponding input for assistive technologies.

### 4. InvalidField
Demonstrates an invalid email field with consumer-managed validation using React state and the browser's native validity API. Shows how `aria-invalid` reflects the validation state while `aria-describedby` connects both FormDescription and FormMessage, with errors clearing when valid input is entered.

### 5. ControlTypes
Demonstrates FormField composition with Textarea, Select, Checkbox, and Switch components. Shows how text-based fields use vertical layouts while binary controls use horizontal arrangements, preserving appropriate label and description associations.

### 6. DisabledField
Displays a disabled Input wrapped within FormField, accompanied by a descriptive explanation. Demonstrates that disabled behavior belongs to the input itself rather than being automatically propagated by FormField, preserving native keyboard and submission behavior.

### 7. CompleteForm
Demonstrates a complete project-creation form composed of multiple independent FormField instances using Input, Select, Textarea, and Button. Shows required indicators, helper text, native form validation, reset behavior, and accessible submission feedback managed by the consuming application without a backend.

## Accessibility (a11y)

- **Semantic HTML:** Uses native HTML elements appropriate to each component. FormLabel renders a `<label>`, FormDescription and FormMessage render paragraphs, and FormField renders a structural `<div>` without introducing unnecessary interactive semantics.

- **Keyboard Navigation:** FormField and its supporting components are noninteractive and do not implement custom keyboard behavior. Composed form controls retain their native keyboard interactions, focus navigation, and activation behavior.

- **ARIA & Screen Readers:** Supports native accessibility attributes through inherited HTML props. Consumers explicitly associate labels, descriptions, and validation messages with form controls using `htmlFor`, `id`, `aria-describedby`, and `aria-invalid`.

- **Focus Management:** Does not implement automatic focus movement or keyboard focus indicators. Focus handling remains the responsibility of the underlying form controls, while the layout components preserve their native noninteractive behavior.

- **Label Association:** FormLabel uses the native `<label>` element, allowing an accessible name to be established through matching `htmlFor` and control `id` attributes. This association is configured by consumers rather than generated automatically.

- **Required Field Accessibility:** FormLabel can display a decorative asterisk through `requiredIndicator`, with the asterisk hidden from assistive technologies using `aria-hidden="true"`. Consumers must independently apply native `required` validation and communicate required-field expectations appropriately.

- **Description Association:** FormDescription provides supplementary instructions that can be connected to a form control through `aria-describedby`. The component does not generate IDs or automatically establish this relationship.

- **Validation Accessibility:** FormMessage displays error text using the semantic `destructive` token. Consumers control when messages appear, set `aria-invalid` on the relevant control, and associate errors through `aria-describedby` to provide meaningful feedback.

- **Dynamic Error Announcements:** FormMessage does not automatically create a live region or announce validation changes. Consuming applications must implement appropriate announcement behavior when dynamically displayed errors require screen reader notification.

- **Form Control Compatibility:** Supports composition with Input, Textarea, Select, Checkbox, Switch, and other compatible native form controls. Each control retains its own semantics, validation attributes, keyboard behavior, and submission functionality.

