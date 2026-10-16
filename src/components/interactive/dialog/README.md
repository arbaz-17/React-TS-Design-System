
# Dialog

## Overview

Dialog is a reusable and accessible modal component designed to display focused content, forms, confirmations, and important interactions above the main application interface. It follows a compound composition pattern with eight components: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, and `DialogClose`, providing flexible content organization and interaction behavior.

## Architecture & Design Decisions

- **Pattern Used:** Compound Composition / Sub-components. Uses eight independently exported components to separate dialog state, triggers, modal content, headings, descriptions, footers, and closing actions. Radix UI manages accessibility and interaction behavior, while the design system provides consistent styling and composition.
- **TypeScript Design:** Extends Radix UI component props using `ComponentProps` and `ComponentPropsWithRef`. Dialog omits the `modal` property to enforce modal-only behavior, while DialogContent excludes `asChild` and `forceMount`. Other components preserve their corresponding native or Radix UI attributes and appropriately typed refs.
- **Styling & Tokens:** Uses Tailwind CSS with semantic tokens including `card`, `card-foreground`, `foreground`, `muted-foreground`, `border`, `rounded-overlay`, and `shadow-overlay`. DialogContent applies a centered modal layout, responsive viewport-relative dimensions, and internal scrolling. The `cn()` utility merges default styles with consumer-provided classes.
- **State Management:** Supports controlled visibility through `open` and `onOpenChange`, or uncontrolled visibility through `defaultOpen`. Radix UI manages dialog interaction behavior, while consumers control application state, form processing, and dismissal requirements.
- **Portal & Overlay:** DialogContent renders through `DialogPrimitive.Portal`, placing the modal content and a fixed semi-transparent overlay outside the normal component hierarchy. The overlay visually separates the dialog from the underlying interface.
- **Focus & Interaction:** Uses Radix UI's modal behavior for initial focus, focus containment, keyboard dismissal, and focus restoration. Consumers can customize dismissal behavior through supported Radix event handlers without implementing their own focus trap.
- **Modal-Only Design:** Forces `modal={true}` internally, preventing consumers from switching to non-modal behavior. The DialogContent API also prevents replacing the content element through `asChild` or forcing it to remain mounted through `forceMount`.

## Props / Component API

### Dialog

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `open` | `boolean` | — | No | Controls dialog visibility through React. |
| `defaultOpen` | `boolean` | `false` | No | Sets the initial visibility for uncontrolled usage. |
| `onOpenChange` | `(open: boolean) => void` | — | No | Called when the dialog requests a visibility change. |
| `children` | `React.ReactNode` | — | No | Composable dialog trigger, content, and supporting components. |

Extends Radix UI `DialogPrimitive.Root` props, excluding `modal`. Modal behavior is permanently enabled through `modal={true}`.

### Dialog Sub-components

| Component | Underlying Element / Primitive | Description |
| :--- | :--- | :--- |
| `DialogTrigger` | `DialogPrimitive.Trigger` | Opens the dialog through an interactive trigger. |
| `DialogContent` | `DialogPrimitive.Content` | Provides the modal content surface, portal, overlay, and responsive scrolling. |
| `DialogHeader` | `<div>` | Groups the dialog title and optional description. |
| `DialogTitle` | `DialogPrimitive.Title` | Provides the dialog's accessible title. |
| `DialogDescription` | `DialogPrimitive.Description` | Provides supplementary information associated with the dialog. |
| `DialogFooter` | `<div>` | Organizes action buttons in a responsive layout. |
| `DialogClose` | `DialogPrimitive.Close` | Closes the dialog through an interactive control. |

### DialogContent

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | Modal content, including headers, forms, information, and actions. |
| `className` | `string` | — | No | Customizes modal dimensions, spacing, and surface styling. |
| `onEscapeKeyDown` | Radix event handler | — | No | Handles Escape key dismissal and supports preventing the default behavior. |
| `onPointerDownOutside` | Radix event handler | — | No | Handles pointer interactions outside the modal. |
| `onInteractOutside` | Radix event handler | — | No | Handles supported outside interactions and allows dismissal prevention. |
| `onOpenAutoFocus` | Radix event handler | — | No | Customizes automatic focus behavior when the dialog opens. |
| `onCloseAutoFocus` | Radix event handler | — | No | Customizes focus restoration behavior when the dialog closes. |
| `aria-describedby` | `string` | Radix-managed when a description exists | No | Associates supplementary accessible description content with the dialog. |
| `ref` | `React.Ref<HTMLDivElement>` | — | No | Reference to the underlying Radix dialog content element. |

Extends Radix UI `DialogPrimitive.Content` props, excluding `asChild` and `forceMount`.

### DialogTrigger & DialogClose

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | Interactive content used to open or close the dialog. |
| `asChild` | `boolean` | `false` | No | Uses the supplied child component as the interactive element instead of rendering an additional button. |
| `disabled` | `boolean` | `false` | No | Disables the underlying trigger or close control when supported. |
| `ref` | `React.Ref<HTMLButtonElement>` | — | No | Reference to the underlying button element in the default rendering mode. |

Both components directly expose their corresponding Radix UI primitive APIs.

### DialogHeader, DialogTitle, DialogDescription & DialogFooter

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | Content rendered inside the corresponding dialog section. |
| `className` | `string` | — | No | Additional CSS classes for spacing, typography, alignment, or layout. |
| `ref` | `React.Ref<HTMLElement>` | — | No | Reference to the underlying element, typed specifically for each component. |

DialogHeader and DialogFooter extend native `ComponentPropsWithRef<"div">`, while DialogTitle and DialogDescription extend their corresponding Radix UI primitive props.

## Storybook Stories

### 1. Default
Demonstrates the recommended modal composition using DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, and DialogClose. Uses uncontrolled visibility and `asChild` composition to integrate Button components without creating nested buttons.

### 2. WithoutDescription
Demonstrates a dialog containing an accessible title and body content without a separate DialogDescription component. Uses `aria-describedby={undefined}` to explicitly indicate that no supplementary accessible description is provided.

### 3. FormDialog
Demonstrates controlled dialog visibility using React state alongside FormField, Input, Textarea, and native form validation. The footer submit button references the form through its `form` attribute, while successful local processing closes the dialog and updates an external status message.

### 4. LongContent
Demonstrates a modal containing an extended engineering checklist with multiple structured sections and descriptions. Tests viewport-constrained dimensions and internal scrolling, ensuring long content and footer actions remain reachable on smaller screens and at increased browser zoom.

### 5. CustomWidth
Demonstrates overriding DialogContent's default maximum width using `max-w-2xl` while retaining viewport-relative sizing constraints. Displays a responsive two-column content layout that collapses into a single column on smaller screens.

### 6. DismissalPrevention
Demonstrates protecting unsaved form changes from accidental dismissal through Escape, outside interaction, or Cancel. Uses controlled state and Radix event handlers to prevent dismissal, displays an accessible warning, and provides explicit Save and Discard actions.

### 7. KeyboardAndFocus
Provides a manual keyboard-accessibility example for testing dialog opening, focus containment, dismissal, and focus restoration. Demonstrates opening through `Enter` or `Space`, navigating with `Tab` and `Shift+Tab`, closing with Escape, and returning focus to the original trigger.

## Accessibility Notes

- **Semantic HTML:** Uses Radix UI Dialog primitives to provide modal dialog semantics, including an accessible dialog container and appropriate relationships between the content, title, and description.

- **Keyboard Navigation:** Supports native trigger activation through `Enter` and `Space`, sequential navigation through `Tab` and `Shift+Tab`, and dismissal through `Escape`. Radix UI manages keyboard interactions while the modal is open.

- **ARIA & Screen Readers:** Radix UI supplies appropriate dialog semantics, including `role="dialog"` and modal accessibility behavior. DialogTitle and DialogDescription establish accessible naming and description relationships for assistive technologies.

- **Focus Management:** Radix UI automatically manages initial focus, focus containment within the modal, and focus restoration when the dialog closes. Consumers can customize this behavior through `onOpenAutoFocus` and `onCloseAutoFocus` when necessary.

- **Modal Accessibility:** Forces modal behavior through `modal={true}`, keeping focus within the dialog and restricting interaction with the underlying interface while it is open. Radix UI handles modal interaction semantics rather than requiring custom focus-trapping logic.

- **Trigger & Close Accessibility:** DialogTrigger and DialogClose support Radix UI's `asChild` composition to reuse accessible interactive components such as Button. This avoids unnecessary nested buttons and preserves the child control's accessible name and keyboard behavior.

- **Form Accessibility:** Supports native HTML forms and accessible form controls inside DialogContent. Consumers manage input labels, validation attributes, error messages, submission behavior, and whether successful operations should close the dialog.

