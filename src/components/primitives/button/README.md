
# Button

## Overview

Button is a reusable action component built on the native HTML `<button>` element. It provides semantic visual variants, consistent sizes, icon support, disabled behavior, and a loading state. Use it for actions such as form submissions and user interactions; use links instead when navigating between pages.

## Architecture & Design Decisions

- **Pattern Used:** Prop Variants. Uses Class Variance Authority (CVA) to define five semantic appearances and four sizes through a centralized variant configuration, keeping the component API simple and consistent.
- **TypeScript Design:** Extends `ComponentPropsWithRef<"button">` to support native button attributes and refs. Uses CVA's `VariantProps` for type-safe variant and size selections, alongside a custom `loading` property.
- **Styling & Tokens:** Uses Tailwind CSS with semantic tokens including `primary`, `secondary`, `destructive`, `foreground`, `accent`, `input`, and `ring`. The `rounded-control` utility ensures consistent border radius, while `cn()` merges component styles with custom classes.
- **State Management:** Loading is externally controlled through the `loading` prop. When active, the component displays a centered spinner, visually hides the original content, and disables interaction without managing asynchronous operations internally.

## Props / Component API

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive'` | `'primary'` | No | Determines the semantic visual appearance. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon'` | `'md'` | No | Controls button dimensions, spacing, and typography. |
| `loading` | `boolean` | `false` | No | Displays a spinner, sets `aria-busy`, and disables interaction. |
| `disabled` | `boolean` | `false` | No | Disables the button using native HTML behavior. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | No | Specifies the native button behavior. |
| `children` | `React.ReactNode` | — | No | Content displayed inside the button, including text or icons. |
| `className` | `string` | — | No | Additional Tailwind or CSS classes. |
| `ref` | `React.Ref<HTMLButtonElement>` | — | No | Reference to the underlying button element. |
| `aria-label` | `string` | — | No* | Provides an accessible name, particularly for icon-only buttons. |
| `aria-busy` | `boolean` | — | No | Indicates an ongoing operation; automatically set to `true` during loading. |

*Icon-only buttons require an accessible name, which can be provided through `aria-label` or another valid labeling mechanism.*

Also extends native `ComponentPropsWithRef<"button">`, supporting standard HTML button attributes, event handlers, and ARIA properties.

## Storybook Stories

### 1. Default
Provides an interactive playground using Storybook controls to modify the button's variant, size, loading state, and disabled state. Demonstrates the component's default appearance and configurable API.

### 2. Variants
Displays all five semantic appearances: `primary`, `secondary`, `outline`, `ghost`, and `destructive`. Demonstrates how visual hierarchy and action intent are communicated through the design system's semantic colors.

### 3. Sizes
Demonstrates the four supported dimensions: `sm`, `md`, `lg`, and `icon`. Shows how spacing, typography, and button dimensions adapt while maintaining consistent alignment and native interaction behavior.

### 4. WithIcon
Demonstrates a button combining visible text with a decorative Lucide icon. Shows how icons can reinforce an action without replacing its accessible text label.

### 5. IconOnly
Displays a square button containing only an icon, with an `aria-label` providing its accessible name. Demonstrates the labeling requirements for icon-only controls and the dedicated `icon` size.

### 6. Disabled
Demonstrates the native disabled state, including reduced visual emphasis and blocked interaction. Shows that disabled buttons cannot be activated or reached through normal Tab navigation.

### 7. Loading
Demonstrates the externally controlled loading state with a centered spinner and visually hidden button content. Shows how `aria-busy="true"` and native disabling prevent repeated activation while an operation is in progress.

### 8. KeyboardFocus
Provides two interactive buttons to demonstrate native keyboard navigation and activation using `Tab`, `Enter`, and `Space`. Includes a live status region that announces which action was activated and allows inspection of visible keyboard focus indicators.

### 9. FormSubmission
Demonstrates the Button component inside a native HTML form alongside a labeled input. Shows the importance of explicitly setting `type="submit"`, with submission confirmation displayed through an accessible status region without requiring a backend.

## Accessibility Notes

- **Semantic HTML:** Uses the native `<button>` element, providing built-in button semantics and standard browser interaction behavior.

- **Keyboard Navigation:** Supports `Tab` for focus and `Enter` or `Space` for activation. Disabled and loading buttons are excluded from normal Tab navigation.

- **ARIA & Screen Readers:** Supports native ARIA attributes, including `aria-label` for icon-only buttons and `aria-busy` for loading states. The loading spinner is marked `aria-hidden="true"` and `focusable="false"` to prevent unnecessary announcements.

- **Focus Management:** Applies a visible focus outline through `focus-visible:outline-2`, `focus-visible:outline-offset-2`, and the semantic `ring` token. Focus behavior relies on native browser handling rather than custom JavaScript.

- **Disabled State:** Uses the native `disabled` attribute when either `disabled` or `loading` is true. The disabled appearance uses reduced opacity and a non-interactive cursor.

- **Loading Accessibility:** Preserves the original button content in the accessibility tree while visually hiding it during loading. The component exposes its busy state but does not automatically announce operation completion; feedback must be provided by the consuming application.

- **Reduced Motion:** Uses `motion-safe:animate-spin` to animate the loading indicator only when the user's motion preferences permit animation.
