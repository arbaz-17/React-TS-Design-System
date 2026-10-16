# Dialog Component

**Category:** Advanced Interactive Component  
**Implementation:** `src/components/interactive/dialog.tsx`  
**Behavioral foundation:** Radix Primitives (`radix-ui`)  
**Status:** Implemented and verified

## 1. Overview

Dialog is a reusable modal component for presenting focused interactions, including forms, settings, detailed information and short application workflows.

It uses Radix Primitives for complex accessibility and interaction behavior while preserving our design system's TypeScript conventions, semantic Tailwind CSS tokens, layout and composition patterns.

Dialog is modal-only in this version.

The consuming application owns business logic, form values, validation, data mutations and decisions about when to close the Dialog.

## 2. Component Architecture

Dialog provides eight public components.

| Component | Responsibility |
|---|---|
| `Dialog` | Modal root and controlled/uncontrolled state |
| `DialogTrigger` | Opens the Dialog |
| `DialogContent` | Accessible modal panel with internal Portal and Overlay |
| `DialogHeader` | Groups title and description |
| `DialogTitle` | Accessible Dialog name |
| `DialogDescription` | Optional accessible description |
| `DialogFooter` | Layout for footer actions |
| `DialogClose` | Closes the Dialog |

Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription and DialogClose use Radix primitives.

DialogHeader and DialogFooter are native styled div elements.

## 3. Public API

### Dialog

Uses props derived from `DialogPrimitive.Root`, excluding `modal`.

| Prop | Purpose |
|---|---|
| `open` | Controlled open state |
| `defaultOpen` | Uncontrolled initial state |
| `onOpenChange` | Notifies consumers when open state changes |
| `children` | Dialog composition |

The implementation always passes `modal={true}` internally.

Non-modal Dialog behavior is deliberately excluded.

### DialogTrigger

Uses Radix Trigger props, including `asChild`.

For integration with our Button component, use `asChild` to avoid nested native buttons.

### DialogContent

Uses Radix Content props, excluding `asChild` and `forceMount`.

Supports:

- `children`
- `className`
- `ref`
- `aria-*`
- `onOpenAutoFocus`
- `onCloseAutoFocus`
- `onEscapeKeyDown`
- `onPointerDownOutside`
- `onInteractOutside`

DialogContent automatically renders the Radix Portal and Overlay.

Consumers do not need to construct these elements separately.

### DialogHeader and DialogFooter

Inherit `ComponentPropsWithRef<"div">`.

Support native div attributes, className, children and HTMLDivElement refs.

### DialogTitle and DialogDescription

Use their corresponding Radix primitive props and refs.

DialogTitle supplies the accessible name.

DialogDescription optionally supplies supplementary accessible description text.

### DialogClose

Uses Radix Close props, including `asChild`.

Consumers should provide a visible close or cancel control.

## 4. Public Exports

Components:

- `Dialog`
- `DialogTrigger`
- `DialogContent`
- `DialogHeader`
- `DialogTitle`
- `DialogDescription`
- `DialogFooter`
- `DialogClose`

Types:

- `DialogProps`
- `DialogTriggerProps`
- `DialogContentProps`
- `DialogHeaderProps`
- `DialogTitleProps`
- `DialogDescriptionProps`
- `DialogFooterProps`
- `DialogCloseProps`

All exports are exposed through `src/components/index.ts`.

## 5. Basic Usage

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button type="button">
      Open Dialog
    </Button>
  </DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        Account information
      </DialogTitle>

      <DialogDescription>
        Review your account details.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>
      <DialogClose asChild>
        <Button type="button" variant="outline">
          Close
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## 6. Controlled and Uncontrolled State

### Uncontrolled

Use Dialog without `open` or `onOpenChange` when Radix should manage the state.

`defaultOpen` can specify an initial state.

### Controlled

Use `open` and `onOpenChange` when the application needs to manage the Dialog state.

```tsx
const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  {/* Dialog content */}
</Dialog>
```

Controlled mode is appropriate when closing depends on form validation or an asynchronous operation.

Do not wrap a Save button in DialogClose if saving can fail.

Close the Dialog only after the operation succeeds.

## 7. Styling Architecture

Dialog uses the established Tailwind CSS v4 semantic tokens.

### Internal Overlay

- Fixed viewport positioning
- Dark translucent backdrop
- Appropriate stacking order

### DialogContent

- Centered fixed positioning
- Responsive viewport width
- Maximum width of approximately 512px
- Viewport-constrained maximum height
- Internal vertical scrolling
- `rounded-overlay`
- `border-border`
- `bg-card`
- `text-card-foreground`
- `shadow-overlay`

### DialogHeader

Vertical flex layout with consistent spacing and left-aligned text.

### DialogTitle

Semibold heading typography using the semantic foreground color.

### DialogDescription

Muted supporting text with readable line height.

### DialogFooter

Responsive action layout:

- Vertical stacking on smaller screens
- Horizontal action layout on larger screens
- Consistent spacing
- No automatic reversal of visual order

Consumers may customize compatible styling through className.

No CVA variants or animation dependencies are introduced.

## 8. Accessibility Behavior

Radix provides the Dialog's underlying modal interaction behavior.

### Accessible Naming

Every Dialog must have a meaningful accessible name.

Use DialogTitle for the recommended accessible naming pattern.

DialogDescription is optional. When omitted, set `aria-describedby={undefined}` on DialogContent.

A title may be visually hidden when necessary, but its accessible name must remain available.

### Focus Management

When a Dialog opens, focus moves into the modal.

While the modal is open, keyboard focus remains contained.

When the Dialog closes, focus normally returns to the trigger.

The application may override automatic focus behavior when the workflow requires a different logical destination.

### Keyboard Interactions

| Key | Expected behavior |
|---|---|
| Enter/Space | Activates the trigger |
| Tab | Moves forward within the Dialog |
| Shift+Tab | Moves backward within the Dialog |
| Escape | Closes the Dialog by default |

DialogClose provides an explicit close mechanism.

### Background Interaction

The background is treated as inert while the modal is active.

Users should not be able to interact with background controls during an open modal Dialog.

### Dismissal Behavior

Escape and outside interaction can dismiss the Dialog by default.

Consumers may prevent dismissal through the supported Radix callbacks when an application workflow requires protection against losing unsaved work.

Blocking dismissal must not leave users without a clear way to close the Dialog.

### Responsive Accessibility

Long content must remain scrollable within the available viewport.

Verify usability at narrow screen widths and 200% browser zoom.

Keyboard controls, visible focus and readable text must remain available.

## 9. Composition with Existing Components

Dialog has been verified with:

- Button as Trigger
- Button as Close
- Input
- FormField and FormLabel
- FormDescription
- Consumer-managed validation
- Accessible descriptions
- Responsive footer actions

The Dialog component does not directly depend on these UI components.

Consumers compose them into DialogContent as needed.

## 10. Portal and Theme Integration

DialogContent renders through a Radix Portal.

The modal panel may therefore exist outside the React application's normal DOM container.

Theme variables must remain available to the portaled content.

Applying theme classes or semantic tokens at the document root is a suitable approach.

The Dialog does not manage independent theme state.

## 11. Verification Completed

- Eight public components
- Native and Radix-derived TypeScript props
- React 19-compatible refs
- Modal-only root behavior
- Controlled state
- Uncontrolled state
- Button integration through asChild
- Accessible Dialog name
- Optional accessible description
- Keyboard opening and closing
- Focus containment
- Focus restoration
- Escape dismissal
- Outside-pointer dismissal
- Explicit dismissal prevention
- Form integration
- Consumer-controlled validation
- Long-content scrolling
- Mobile responsiveness
- 200% browser zoom
- Light and dark themes
- Accessibility tree inspection
- Accessibility testing
- ESLint and production build

## 12. Verified Storybook Coverage — Phase 7

**Storybook navigation:** `Interactive/Dialog`

**Story file:** [`src/components/interactive/dialog.stories.tsx`](../../src/components/interactive/dialog.stories.tsx)

**Coverage:** 11 locally verified stories.

| Story | Documented purpose |
|---|---|
| Basic Dialog | Complete eight-part composition |
| With Description | Accessible description |
| Without Description | Title-only semantics |
| Form Dialog | Native validation and programmatic close |
| Controlled Dialog | React-managed open state |
| Uncontrolled Dialog | Radix-managed open state |
| Long Content | Scrollable and constrained modal |
| Custom Width | Width customization |
| Dismissal Prevention | Unsaved-change protection |
| Keyboard And Focus | Focus and keyboard behavior |
| Portal And Theme | Portal theme inheritance |

**Storybook controls:** Interactive props are demonstrated in examples rather than exposing modal state as generic controls.

**Themes:** Use the global Storybook light/dark toolbar. There is no dedicated Dark Theme story; verify each story in both themes when relevant.

**Accessibility and behavior:** The examples demonstrate the component’s existing semantics and relevant keyboard, focus, responsive, and ARIA behavior. They do not add behavior to production components.

**Verification status:** Story rendering, manual checks, Storybook build, app build, lint, and the Storybook accessibility panel were reported as passing during Phases 7.2–7.4. This is user-reported verification; it does not constitute a completed automated interaction-test suite or full WCAG conformance audit.

**Synchronization note:** This section is based on the story implementation and verification results in the project conversation. The original repository ZIP did not contain the newly authored `.stories.tsx` files. Perform a final export-name and content comparison against the latest working tree during Phase 7.5.1-F.

## 13. Architectural Boundaries

Dialog does not own:

- Application business logic
- Data fetching
- Form values
- Form validation
- Async mutation results
- Notification state
- Automatically generated actions
- Automatic close icons
- Non-modal behavior
- AlertDialog behavior
- Custom focus-trap implementation
- Custom keyboard-navigation engines

Radix owns the complex interaction mechanics.

Our design system owns presentation, public API, styling, composition and usage conventions.

## 14. Known Considerations

**Accessible title:** Every Dialog requires a meaningful accessible name.

**Optional description:** Consumers must handle omitted descriptions correctly.

**Focus restoration:** Some workflows may require application-specific focus destinations.

**Unsaved changes:** Consumers should prevent accidental dismissal when appropriate.

**Async submissions:** Do not close before a mutation succeeds.

**Portals:** Ensure theme tokens apply to content rendered outside the main application root.

**Destructive confirmation:** Use a dedicated AlertDialog pattern for high-impact confirmations rather than treating every Dialog as one.

**Final decision:** Dialog is a modal-only, Radix-backed component family with eight public components, accessible interaction behavior and custom semantic Tailwind styling.