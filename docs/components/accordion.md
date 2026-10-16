# Accordion Component

**Category:** Advanced Interactive Component  
**Implementation:** `src/components/interactive/accordion.tsx`  
**Technology:** React 19, TypeScript, Tailwind CSS v4, native HTML  
**Status:** Implemented and verified

## 1. Overview

Accordion is a reusable, native-first component family for displaying expandable and collapsible content sections.

It uses the HTML `details` and `summary` elements for disclosure behavior, keyboard activation, expanded state and native toggle events.

Accordion supports single-open and multiple-open modes without implementing a custom disclosure state machine.

The design system provides component composition, TypeScript interfaces, semantic styling and optional grouping.

## 2. Component Architecture

| Component | HTML element | Responsibility |
|---|---|---|
| `Accordion` | `div` | Root styling and grouping configuration |
| `AccordionItem` | `details` | Native disclosure and initial expansion |
| `AccordionTrigger` | `summary` | Native disclosure control |
| `AccordionContent` | `div` | Expandable content |

All four components preserve their corresponding native HTML props and React 19-compatible refs.

`AccordionItem` must be rendered within `Accordion` because it receives grouping information from private Context.

`AccordionTrigger` must be the first child of `AccordionItem` to preserve the intended native disclosure structure.

## 3. Public API

### Accordion

Extends `ComponentPropsWithRef<"div">`.

Additional prop:

| Prop | Type | Default |
|---|---|---|
| `type` | `"single" \| "multiple"` | `"multiple"` |

The root controls the native grouping strategy. It does not manage expansion state.

### AccordionItem

Extends `ComponentPropsWithRef<"details">`, excluding native `name` and `open`.

Additional prop:

| Prop | Type | Default |
|---|---|---|
| `defaultOpen` | `boolean` | `false` |

Supports native details attributes, event handlers such as `onToggle`, styling overrides and an `HTMLDetailsElement` ref.

The public `name` property is reserved because Accordion manages exclusive grouping.

The public `open` property is excluded to avoid exposing a controlled-state contract that version 1 does not implement.

### AccordionTrigger

Extends `ComponentPropsWithRef<"summary">`.

Supports native summary attributes, children, `className`, native event handlers and an `HTMLElement` ref.

### AccordionContent

Extends `ComponentPropsWithRef<"div">`.

Supports native div props, children, `className` and an `HTMLDivElement` ref.

## 4. Public Exports

Components:

- `Accordion`
- `AccordionItem`
- `AccordionTrigger`
- `AccordionContent`

Types:

- `AccordionProps`
- `AccordionItemProps`
- `AccordionTriggerProps`
- `AccordionContentProps`

All public exports are available through `src/components/index.ts`.

Private Context, ID generation and internal helpers remain unexported.

## 5. Single and Multiple Modes

### Multiple Mode

```tsx
<Accordion type="multiple">
  <AccordionItem>
    <AccordionTrigger>First</AccordionTrigger>
    <AccordionContent>First content</AccordionContent>
  </AccordionItem>

  <AccordionItem>
    <AccordionTrigger>Second</AccordionTrigger>
    <AccordionContent>Second content</AccordionContent>
  </AccordionItem>
</Accordion>
```

Items behave as independent native disclosure elements. Multiple sections can be expanded simultaneously.

This is the default behavior.

### Single Mode

```tsx
<Accordion type="single">
  <AccordionItem defaultOpen>
    <AccordionTrigger>First</AccordionTrigger>
    <AccordionContent>First content</AccordionContent>
  </AccordionItem>

  <AccordionItem>
    <AccordionTrigger>Second</AccordionTrigger>
    <AccordionContent>Second content</AccordionContent>
  </AccordionItem>
</Accordion>
```

Accordion supplies the same generated `name` attribute to related details elements.

The browser enforces exclusive expansion within that group.

Single mode allows at most one expanded item, including the possibility that all items are collapsed.

Separate Accordion instances use unique group names and do not interfere with one another.

## 6. Initial State and Native State Ownership

AccordionItem accepts `defaultOpen` as an initial value.

The implementation captures this initial value once using React's `useState(defaultOpen)` without using a state setter to manage disclosure changes.

Subsequent expansion and collapse remain browser-managed.

The component does not call React state setters when its disclosure is toggled.

Ordinary parent rerenders must not reset the user-selected open state.

Changes to `defaultOpen` after mounting are not a supported way to programmatically open or close an item.

Consumers can remount an item with a different React key if a new initial state is required.

Fully controlled expansion is outside the version 1 API.

## 7. Native Toggle Events

Consumers can observe disclosure changes using the native `onToggle` event.

```tsx
<AccordionItem
  onToggle={(event) => {
    const isExpanded = event.currentTarget.open;

    console.log(isExpanded);
  }}
>
  <AccordionTrigger>Details</AccordionTrigger>
  <AccordionContent>Content</AccordionContent>
</AccordionItem>
```

The callback reports the current browser-managed state.

Toggle notifications are not a substitute for a controlled-state API. Browser toggle events may be coalesced when multiple changes occur close together.

## 8. Accessibility

### Native Semantics

AccordionItem renders `details`, and AccordionTrigger renders `summary`.

The browser provides native disclosure interaction and expanded/collapsed semantics.

The components do not introduce redundant `role="button"` or `aria-expanded` attributes.

### Keyboard Interaction

| Interaction | Behavior |
|---|---|
| Tab | Moves through native focus order |
| Shift+Tab | Moves backward |
| Enter | Toggles a focused summary |
| Space | Toggles a focused summary |
| Pointer click | Toggles the disclosure |
| Collapse | Removes collapsed content from normal focus navigation |

No custom arrow-key navigation or roving `tabIndex` is implemented.

### Focus Visibility

AccordionTrigger uses a visible keyboard focus indicator.

Consumers must not remove focus styling without providing an accessible replacement.

### Content Semantics

Place meaningful text, lists, forms and controls inside AccordionContent.

Avoid nesting interactive controls inside AccordionTrigger.

Keep the trigger label clear and descriptive.

Provide a suitable surrounding heading hierarchy when the Accordion is used as a page section or FAQ.

### Native Disclosure Versus ARIA Accordion Pattern

This implementation uses a group of native disclosure widgets.

It does not recreate the complete custom WAI-ARIA accordion-header structure or optional header-navigation keys.

This distinction should be preserved in documentation and accessibility evaluations.

### Hidden Content

When a native details element is collapsed, its normal content is not available for ordinary keyboard navigation or visual interaction.

Do not override native disclosure visibility with CSS that exposes collapsed interactive content.

## 9. Styling Architecture

Accordion uses Tailwind CSS v4 and the design system's semantic tokens.

### Accordion

- `w-full min-w-0`
- `rounded-surface`
- `border border-border`

### AccordionItem

- `group`
- `min-w-0`
- `border-b border-border`
- `last:border-b-0`
- `bg-card`
- `text-card-foreground`

### AccordionTrigger

- Native disclosure marker preserved
- Pointer cursor
- Horizontal and vertical padding
- Medium typography
- `text-foreground`
- Open-state background styling
- Visible keyboard focus indicator

### AccordionContent

- Consistent horizontal padding
- Bottom padding and readable line height
- `text-muted-foreground`
- Minimum-width protection

All components support consumer `className` overrides.

No CVA variants, custom animations or icon dependencies are introduced.

## 10. Composition

Accordion is presentation-oriented and may be composed with existing components.

Verified examples include:

- Accordion inside Card
- AccordionContent containing Input
- AccordionContent containing Button
- Rich text and multiple paragraphs
- Consumer-managed form values
- Native toggle-event reporting

Accordion does not import these components internally.

## 11. Verification Completed

- Four components and public types
- Correct native element structure
- React 19-compatible refs
- Single-open native grouping
- Multiple-open independent disclosures
- Independent Accordion instances
- Initial expansion through `defaultOpen`
- Preservation of disclosure state across parent rerenders
- Native `onToggle` events
- Composition with Card, Input and Button
- Keyboard activation
- Focus visibility
- Correct expanded/collapsed accessibility behavior
- Mobile layouts
- Browser zoom
- Light and dark themes
- Accessibility inspection
- ESLint and production build

## 12. Verified Storybook Coverage — Phase 7

**Storybook navigation:** `Interactive/Accordion`

**Story file:** [`src/components/interactive/accordion.stories.tsx`](../../src/components/interactive/accordion.stories.tsx)

**Coverage:** 11 locally verified stories.

| Story | Documented purpose |
|---|---|
| Default | type/className controls |
| Single Open | Native single-open grouping |
| Multiple Open | Independent expansion |
| Initially Expanded | defaultOpen behavior |
| All Collapsed | Zero-open state |
| Rich Content | Forms and lists in content |
| Native Toggle Events | onToggle observation and rerenders |
| Multiple Independent Accordions | Unique native grouping |
| Accordion Inside Card | Card integration |
| Long Content | Content reflow and zoom |
| Keyboard Interaction | Native Enter/Space and Tab behavior |

**Storybook controls:** Type and className.

**Themes:** Use the global Storybook light/dark toolbar. There is no dedicated Dark Theme story; verify each story in both themes when relevant.

**Accessibility and behavior:** The examples demonstrate the component’s existing semantics and relevant keyboard, focus, responsive, and ARIA behavior. They do not add behavior to production components.

**Verification status:** Story rendering, manual checks, Storybook build, app build, lint, and the Storybook accessibility panel were reported as passing during Phases 7.2–7.4. This is user-reported verification; it does not constitute a completed automated interaction-test suite or full WCAG conformance audit.

**Synchronization note:** This section is based on the story implementation and verification results in the project conversation. The original repository ZIP did not contain the newly authored `.stories.tsx` files. Perform a final export-name and content comparison against the latest working tree during Phase 7.5.1-F.

## 13. Architectural Boundaries

Accordion does not implement:

- React-managed disclosure selection
- A controlled `open` prop
- Automatic data fetching
- Lazy content loading
- Custom keyboard navigation
- Arrow-key navigation between triggers
- Roving `tabIndex`
- Automatic heading insertion
- A mandatory-one-open invariant
- Animations
- CVA variants
- Radix dependencies
- Business-specific behavior

The browser owns the disclosure mechanism.

React provides composition, initial configuration and unique group-name coordination.

## 14. Known Considerations

**Browser support:** Native exclusive grouping relies on support for the `details` `name` attribute in target browsers.

**Initial state:** `defaultOpen` is an initialization value, not a controlled prop.

**Heading structure:** Consumers should maintain meaningful document headings independently of native summary semantics.

**Styling:** Preserve the disclosure marker, visible focus indicators and native collapsed-content behavior.

**Animations:** Animated content height and coordinated mount/unmount lifecycles are outside version 1.

**Final decision:** Accordion is a lightweight, accessible native disclosure system with four public components, optional single-open grouping, React 19 refs, semantic Tailwind styling and browser-owned interaction behavior.