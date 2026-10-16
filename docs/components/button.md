# Button Component

**Category:** Core Primitive  
**Implementation:** `src/components/primitives/button.tsx`  
**Status:** Implemented and verified

## 1. Responsibility

Button is a reusable, accessible action component built on the native HTML `<button>` element.

It provides consistent visual variants, sizes, interaction states, loading behavior, and TypeScript-safe native HTML properties.

It is independent of application-specific business logic.

## 2. Public API

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `variant` | `primary`, `secondary`, `outline`, `ghost`, `destructive` | `primary` | Visual intent |
| `size` | `sm`, `md`, `lg`, `icon` | `md` | Control dimensions |
| `loading` | `boolean` | `false` | Displays a spinner and prevents activation |
| `disabled` | `boolean` | `false` | Native disabled behavior |
| `type` | `button`, `submit`, `reset` | `button` | Native button type |
| `children` | React content | — | Visible content or icons |
| `className` | `string` | — | Additional styling |
| `ref` | React button ref | — | Access to underlying button |

Button also supports standard HTML button attributes, React event handlers, ARIA attributes, and data attributes.

The public props type is `ButtonProps`.

## 3. Variants

- **Primary:** Main application actions.
- **Secondary:** Supporting actions.
- **Outline:** Alternative actions with visible borders.
- **Ghost:** Low-emphasis actions.
- **Destructive:** Potentially destructive operations.

Variant styles use semantic CSS tokens rather than hardcoded colors.

## 4. Sizes

- **Small:** Minimum height of 36px.
- **Medium:** Minimum height of 40px.
- **Large:** Minimum height of 44px.
- **Icon:** Square 40px control.

Text-based sizes use minimum heights so content can grow when necessary.

## 5. Behavior

### Native semantics

- Renders a native `<button>`.
- Defaults to `type="button"`.
- Supports Enter and Space activation.
- Preserves native form integration and events.
- Forwards a ref to the actual HTML button element.

### Disabled state

- Uses the native `disabled` attribute.
- Prevents activation and form submission.
- Applies a visually disabled appearance.

### Loading state

- Controlled externally through the `loading` prop.
- Displays a decorative centered spinner.
- Preserves the original content's layout dimensions.
- Prevents activation through the native disabled attribute.
- Sets `aria-busy` while loading.
- Respects reduced-motion preferences.

The consuming application remains responsible for announcing meaningful operation results, errors, or progress.

## 6. Accessibility

- Native button semantics.
- Keyboard-operable when enabled.
- Visible focus indicators.
- Semantic foreground/background color pairs.
- Decorative spinner excluded from the accessibility tree.
- Icon-only buttons require an accessible name, such as `aria-label`.
- Decorative icons should use `aria-hidden="true"`.

**Known consideration:** Native disabled buttons cannot retain keyboard focus. Consumers should manage focus appropriately when loading or disabling an actively focused button.

## 7. Styling Architecture

Button uses:

- CVA for typed appearance variants.
- `VariantProps` for inferred TypeScript options.
- Tailwind CSS for styling.
- Semantic design tokens for theme-independent colors.
- The shared `cn()` utility for class composition.
- React 19-compatible ref forwarding.

Consumer `className` overrides should be used carefully to preserve the component's accessibility and visual contracts.

## 8. Usage Examples

- Primary action: `<Button>Save changes</Button>`
- Secondary action: `<Button variant="secondary">Cancel</Button>`
- Destructive action: `<Button variant="destructive">Delete</Button>`
- Small button: `<Button size="sm">Edit</Button>`
- Loading button: `<Button loading>Saving</Button>`
- Submit button: `<Button type="submit">Submit</Button>`
- Icon-only button: `<Button size="icon" aria-label="Close">...</Button>`

Use semantic links rather than buttons for navigation.

## 9. Verification Completed

- All five visual variants.
- All four sizes.
- Light and dark themes.
- Hover, active and focus-visible states.
- Disabled and loading behavior.
- Native button and form semantics.
- Keyboard interaction.
- Icon-only accessible naming.
- Ref forwarding.
- TypeScript variant validation.
- Responsive behavior and zoom.
- Accessibility checks.
- ESLint and production build.

## 10. Verified Storybook Coverage — Phase 7

**Storybook navigation:** `Primitives/Button`

**Story file:** [`src/components/primitives/button.stories.tsx`](../../src/components/primitives/button.stories.tsx)

**Coverage:** 9 locally verified stories.

| Story | Documented purpose |
|---|---|
| Default | Default configuration and prop controls |
| All Variants | Visual variants |
| All Sizes | Size options |
| With Icons | Text and icon composition |
| Icon Only | Accessible icon-only action |
| Disabled | Disabled state |
| Loading | Loading-state behavior |
| Keyboard Focus | Focus visibility and keyboard interaction |
| Form Submission | Native form integration |

**Storybook controls:** Variant, size, disabled, and loading where applicable.

**Themes:** Use the global Storybook light/dark toolbar. There is no dedicated Dark Theme story; verify each story in both themes when relevant.

**Accessibility and behavior:** The examples demonstrate the component’s existing semantics and relevant keyboard, focus, responsive, and ARIA behavior. They do not add behavior to production components.

**Verification status:** Story rendering, manual checks, Storybook build, app build, lint, and the Storybook accessibility panel were reported as passing during Phases 7.2–7.4. This is user-reported verification; it does not constitute a completed automated interaction-test suite or full WCAG conformance audit.

**Synchronization note:** This section is based on the story implementation and verification results in the project conversation. The original repository ZIP did not contain the newly authored `.stories.tsx` files. Perform a final export-name and content comparison against the latest working tree during Phase 7.5.1-F.

## 11. Architectural Boundaries

Button does not manage:

- API requests
- Business workflows
- Navigation
- External loading state
- Form validation
- Application notifications

These remain the responsibility of consuming applications or higher-level components.