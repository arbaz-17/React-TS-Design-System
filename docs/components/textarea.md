# Textarea Component

**Category:** Core Primitive  
**Implementation:** `src/components/primitives/textarea.tsx`  
**Status:** Implemented and verified

## 1. Responsibility

Textarea is a reusable, accessible multiline text-entry component built on the native HTML `<textarea>` element.

It provides consistent styling, vertical resizing, TypeScript-safe native attributes, and accessible interaction states.

The component preserves native browser behavior and remains independent of form-management libraries and application-specific logic.

## 2. Public API

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `rows` | `number` | `4` | Initial visible text rows |
| `value` | Native textarea value | — | Controlled value |
| `defaultValue` | Native textarea value | — | Uncontrolled initial value |
| `onChange` | Native React handler | — | Handle text changes |
| `placeholder` | `string` | — | Supplementary input hint |
| `disabled` | `boolean` | `false` | Native disabled state |
| `readOnly` | `boolean` | `false` | Non-editable, selectable content |
| `required` | `boolean` | `false` | Native required validation |
| `minLength` | `number` | — | Native minimum text length |
| `maxLength` | `number` | — | Native maximum text length |
| `aria-invalid` | Native ARIA attribute | — | Communicate invalid state |
| `aria-describedby` | `string` | — | Associate help and error text |
| `className` | `string` | — | Additional styling |
| `ref` | React textarea ref | — | Access underlying element |

Other supported native attributes include `id`, `name`, `cols`, `wrap`, `spellCheck`, `autoComplete`, `form`, and standard event handlers.

**Public exports:**
- `Textarea`
- `TextareaProps`

## 3. TypeScript Architecture

Textarea uses `ComponentPropsWithRef<"textarea">`, excluding `children`.

The initial content must be provided through `defaultValue` or `value`, rather than JSX children.

A React-compatible ref points directly to the underlying `HTMLTextAreaElement`.

The component does not introduce unnecessary generic types or custom value interfaces.

## 4. Controlled and Uncontrolled Usage

### Controlled

The consuming application manages the text through React state.

Example:

`<Textarea value={description} onChange={(event) => setDescription(event.currentTarget.value)} />`

### Uncontrolled

The browser manages the current value, with optional initial content.

Example:

`<Textarea name="notes" defaultValue="Initial notes" />`

Textarea does not maintain internal value state.

Consumers should not switch between controlled and uncontrolled behavior during the same component's lifetime.

## 5. Visual Design

The component uses semantic Tailwind utilities and shared design tokens.

**Default styling:**
- Full-width layout
- Four visible rows
- Minimum height of 96px
- Vertical resizing
- Shared control border radius
- Semantic background and foreground colors
- Consistent padding and line height
- Muted placeholder text

**Focus state:**
- Visible focus outline
- Semantic focus-ring color

**Invalid state:**
- Uses `aria-invalid="true"`
- Displays the semantic destructive border color

**Disabled state:**
- Native disabled behavior
- Muted appearance
- Resizing disabled

**Read-only state:**
- Text remains readable and selectable
- Editing is prevented
- Muted background styling

All visual states support light and dark themes through shared CSS variables.

## 6. Multiline and Resizing Behavior

Textarea preserves native text-editing behavior.

- Enter inserts a newline.
- Tab moves focus according to normal browser behavior.
- Long text wraps within the control.
- Text can be selected and copied.
- The component supports manual vertical resizing.
- Consumers may configure `rows`.
- No automatic height calculation is performed.
- No fixed maximum height is imposed by the component.

Native `required`, `minLength`, and `maxLength` attributes remain available.

## 7. Accessibility

Textarea follows native browser form-control semantics.

Requirements:

- Every textarea must have an accessible name.
- Associate a visible label wherever appropriate.
- Do not rely on placeholder text as the only label.
- Preserve normal keyboard text editing and focus navigation.
- Maintain visible focus indicators.
- Use `aria-invalid` when validation identifies an error.
- Associate descriptions or errors through `aria-describedby`.
- Maintain sufficient text and control contrast.
- Preserve disabled and read-only behavior.
- Support responsive reflow and browser zoom.
- Ensure manual resizing remains usable.

The future FormField composite will coordinate labels, descriptions, and validation error relationships.

## 8. Usage Examples

### Basic

`<Textarea id="notes" name="notes" placeholder="Enter your notes" />`

### Custom Rows

`<Textarea id="description" rows={8} />`

### Controlled

`<Textarea value={description} onChange={(event) => setDescription(event.currentTarget.value)} />`

### Read-only

`<Textarea defaultValue="Read-only content" readOnly />`

### Required

`<Textarea id="feedback" name="feedback" required minLength={10} maxLength={500} />`

### Invalid

`<Textarea id="comments" aria-invalid={true} aria-describedby="comments-error" />`

The consuming form is responsible for rendering the associated label and error message.

## 9. Verification Completed

- Strict TypeScript compilation
- Native textarea attributes
- Four default rows
- Custom row configuration
- Controlled and uncontrolled values
- Multiline text editing
- Text wrapping
- Vertical resizing
- Native required and length constraints
- DOM ref forwarding and programmatic focus
- Disabled behavior
- Read-only behavior
- Invalid-state styling
- Error and description associations
- Keyboard navigation
- Light and dark themes
- Responsive behavior and browser zoom
- Accessibility checks
- ESLint and production build

## 10. Verified Storybook Coverage — Phase 7

**Storybook navigation:** `Primitives/Textarea`

**Story file:** [`src/components/primitives/textarea.stories.tsx`](../../src/components/primitives/textarea.stories.tsx)

**Coverage:** 12 locally verified stories.

| Story | Documented purpose |
|---|---|
| Default | Basic multiline control |
| Controlled | React-managed value |
| Uncontrolled | Native value |
| Custom Rows | Row count |
| Long Content | Content overflow and wrapping |
| Vertical Resizing | Native resizing |
| Disabled | Disabled state |
| Read-only | Read-only state |
| Required | Native required validation |
| Invalid | Error state |
| With Description | Described-by relationship |
| With Error Message | Error association |

**Storybook controls:** Rows, placeholder, disabled, readOnly, and required where applicable.

**Themes:** Use the global Storybook light/dark toolbar. There is no dedicated Dark Theme story; verify each story in both themes when relevant.

**Accessibility and behavior:** The examples demonstrate the component’s existing semantics and relevant keyboard, focus, responsive, and ARIA behavior. They do not add behavior to production components.

**Verification status:** Story rendering, manual checks, Storybook build, app build, lint, and the Storybook accessibility panel were reported as passing during Phases 7.2–7.4. This is user-reported verification; it does not constitute a completed automated interaction-test suite or full WCAG conformance audit.

**Synchronization note:** This section is based on the story implementation and verification results in the project conversation. The original repository ZIP did not contain the newly authored `.stories.tsx` files. Perform a final export-name and content comparison against the latest working tree during Phase 7.5.1-F.

## 11. Architectural Boundaries

Textarea does not own:

- Form submission
- Business validation rules
- Error message generation
- Label rendering
- Description rendering
- Automatic resizing
- Character-counter UI
- Markdown or rich-text editing
- Auto-save behavior
- API requests

Higher-level components and consuming applications own these responsibilities.

Textarea does not depend on Input, Button, FormField, the theme hook, or application-specific modules.

## 12. Known Considerations

- `aria-invalid` communicates an invalid state but does not perform validation.
- Native browser validation and application-level validation are separate concerns.
- Native length constraints have browser-specific details, particularly for programmatically populated values.
- The default minimum height is 96px, but the element can grow taller.
- Read-only fields remain selectable and focusable.
- Consumer styling overrides must preserve accessibility and usability.

**Final decision:** Keep Textarea a minimal native multiline primitive with consistent visual styling and no unnecessary behavioral abstractions.