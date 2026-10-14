# Tooltip Component

**Category:** Advanced Interactive Component  
**Implementation:** `src/components/interactive/tooltip.tsx`  
**Behavioral foundation:** Radix Primitives (`radix-ui`)  
**Technology:** React 19, TypeScript, Tailwind CSS v4  
**Status:** Implemented and verified

## 1. Overview

Tooltip is a reusable component for displaying short, supplementary information when a user hovers over or focuses an interactive element.

The component uses Radix Primitives for pointer and keyboard interactions, accessible descriptions, dismissal behavior, timing and floating-element positioning.

Our design system owns the public TypeScript API, component composition, semantic Tailwind styling and documentation.

Tooltip is intended for noninteractive explanatory content. It must not be the only source of essential information.

## 2. Component Architecture

Tooltip provides four public components.

| Component | Radix primitive | Responsibility |
|---|---|---|
| `TooltipProvider` | `Tooltip.Provider` | Shared timing and hover configuration |
| `Tooltip` | `Tooltip.Root` | Individual Tooltip state |
| `TooltipTrigger` | `Tooltip.Trigger` | Hover/focus target |
| `TooltipContent` | `Tooltip.Content` | Positioned, styled explanatory popup |

TooltipContent automatically renders an internal `Tooltip.Portal`.

TooltipTrigger and Tooltip are direct Radix primitive exports through our component wrapper module.

A shared TooltipProvider must exist above the Tooltip instances in the React tree.

## 3. Public API

### TooltipProvider

Type: `ComponentProps<typeof TooltipPrimitive.Provider>`

The wrapper supplies the following defaults:

| Prop | Default | Purpose |
|---|---|---|
| `delayDuration` | `500` | Initial hover opening delay in milliseconds |
| `skipDelayDuration` | `300` | Reduced delay when moving between tooltips |
| `disableHoverableContent` | `false` | Keeps hoverable Tooltip content enabled |

Consumers can override supported Radix provider settings.

TooltipProvider should normally be mounted once near the application root.

It does not render a styled DOM container.

### Tooltip

Type: `ComponentProps<typeof TooltipPrimitive.Root>`

Supports controlled and uncontrolled state.

| Prop | Purpose |
|---|---|
| `open` | Controlled visibility |
| `defaultOpen` | Initial uncontrolled visibility |
| `onOpenChange` | Visibility-change callback |
| `delayDuration` | Optional per-tooltip opening delay |
| `disableHoverableContent` | Optional per-tooltip hover configuration |

Tooltip does not introduce another React state-management layer.

### TooltipTrigger

Type: `ComponentPropsWithRef<typeof TooltipPrimitive.Trigger>`

Supports Radix Trigger props, including `asChild`.

Use `asChild` when composing with Button or another appropriate interactive element.

The trigger must remain keyboard-focusable and have a meaningful accessible name.

The trigger's underlying DOM ref remains available.

### TooltipContent

Type: `ComponentPropsWithRef<typeof TooltipPrimitive.Content>`, excluding `asChild` and `forceMount`.

Supports:

- `children`
- `className`
- `ref`
- `side`
- `align`
- `sideOffset`
- `alignOffset`
- `avoidCollisions`
- `collisionPadding`
- Other supported Radix Content attributes and callbacks

The design system supplies:

| Prop | Default |
|---|---|
| `side` | `"top"` |
| `align` | `"center"` |
| `sideOffset` | `6` |

Positioning and collision handling remain managed by Radix.

TooltipContent automatically renders through an internal Portal.

Its accessible descriptive text can be customized through supported Radix attributes when necessary.

## 4. Public Exports

Components:

- `TooltipProvider`
- `Tooltip`
- `TooltipTrigger`
- `TooltipContent`

Types:

- `TooltipProviderProps`
- `TooltipProps`
- `TooltipTriggerProps`
- `TooltipContentProps`

All public exports are available through `src/components/index.ts`.

The underlying Radix Portal and internal positioning details are not exposed as separate design-system components.

## 5. Provider Configuration

Mount TooltipProvider near the React application root.

```tsx
<TooltipProvider
  delayDuration={500}
  skipDelayDuration={300}
>
  <App />
</TooltipProvider>
```

A shared Provider allows multiple Tooltip instances to use consistent timing.

Avoid wrapping every individual Tooltip in a separate Provider unless deliberately creating an independent configuration boundary.

When using Storybook, mount TooltipProvider through a shared decorator.

## 6. Basic Usage

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button type="button" variant="outline">
      Export
    </Button>
  </TooltipTrigger>

  <TooltipContent>
    Export the current records as CSV.
  </TooltipContent>
</Tooltip>
```

TooltipTrigger uses `asChild` so Button becomes the actual trigger element.

This prevents invalid nested buttons and retains Button's native behavior.

The Button remains responsible for its own action.

Tooltip provides supplementary information only.

## 7. Icon-only Trigger

Icon-only triggers must have an accessible name independent of the Tooltip.

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button
      type="button"
      aria-label="Download report"
    >
      <DownloadIcon aria-hidden="true" />
    </Button>
  </TooltipTrigger>

  <TooltipContent>
    Download the current report as CSV.
  </TooltipContent>
</Tooltip>
```

`DownloadIcon` is supplied by the consuming application.

The Button's accessible name is "Download report".

The Tooltip provides an additional explanation.

Do not rely exclusively on visible Tooltip content to name an otherwise unnamed interactive control.

## 8. Controlled and Uncontrolled State

### Uncontrolled

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Help</Button>
  </TooltipTrigger>

  <TooltipContent>
    Additional information.
  </TooltipContent>
</Tooltip>
```

Radix manages Tooltip visibility.

### Controlled

```tsx
const [open, setOpen] = useState(false);

<Tooltip open={open} onOpenChange={setOpen}>
  <TooltipTrigger asChild>
    <Button>Help</Button>
  </TooltipTrigger>

  <TooltipContent>
    Additional information.
  </TooltipContent>
</Tooltip>
```

The application owns the open state.

Controlled mode can support specialized application workflows or testing.

Ordinary Tooltips should respond naturally to user hover and keyboard focus rather than remain persistently open without a clear purpose.

## 9. Positioning and Portal Behavior

TooltipContent uses Radix positioning.

Supported placements include:

- Top
- Bottom
- Left
- Right

Consumers may modify alignment, offsets and collision settings.

The design system defaults to top-centered placement with a six-pixel offset.

Radix handles placement relative to the trigger and can adjust the final position when viewport space is insufficient.

TooltipContent renders through a Portal, which prevents clipping by many ordinary parent containers.

The design system controls popup layering with its own z-index styling.

Consumers should verify portal stacking when Tooltips appear within other layered interfaces such as Dialog.

## 10. Styling Architecture

Tooltip uses semantic design-system tokens and Tailwind CSS v4.

### TooltipProvider and Tooltip

No additional DOM styling.

### TooltipTrigger

Styling comes from the consumer-provided interactive component.

When used with Button, the existing Button styles and variants apply.

### TooltipContent

Default styles include:

- `z-[60]`
- Viewport-constrained maximum width
- `rounded-surface`
- `border border-border`
- `bg-card`
- `text-card-foreground`
- `shadow-surface`
- `break-words`
- `px-3 py-2`
- `text-xs leading-5`

Content is designed for short explanations.

The styling uses semantic tokens so Tooltip adapts to the active light or dark theme.

No CVA variants, animated transitions or separate positioning library are introduced.

## 11. Accessibility Architecture

### Accessible Description

Tooltip supplements its trigger with additional explanatory content.

The trigger must already have a meaningful accessible name.

Radix supplies the underlying accessible relationship between the trigger and its Tooltip content.

Verify the resulting accessible name and description through the browser's accessibility tree.

### Keyboard Behavior

| Interaction | Expected behavior |
|---|---|
| Tab to trigger | Tooltip opens on keyboard focus |
| Escape | Dismisses the Tooltip |
| Activate trigger | Performs its normal action; Tooltip closes as appropriate |
| Move focus away | Tooltip closes |
| Tooltip opens | Keyboard focus remains on the trigger |

Tooltip does not introduce a separate keyboard Tab stop or focus trap.

### Pointer Behavior

Hovering the trigger opens the Tooltip after the configured delay.

Moving the pointer onto its content should not immediately dismiss it when hoverable content is enabled.

The Tooltip closes when the relevant hover/focus condition ends, when dismissed, or when its information is no longer applicable.

### WCAG Content on Hover or Focus

WCAG 2.2 Success Criterion 1.4.13 identifies three important conditions for hover/focus-triggered content.

| Requirement | Expected behavior |
|---|---|
| Dismissible | Escape can dismiss the Tooltip without requiring pointer or focus movement |
| Hoverable | Pointer can move onto the Tooltip without it disappearing |
| Persistent | Tooltip remains available while appropriate hover/focus conditions continue |

These properties must be verified in the application rather than assumed solely because Radix is installed.

### Noninteractive Content

TooltipContent must not contain interactive controls.

Do not place buttons, links, inputs or forms inside TooltipContent.

Use a suitable Popover or Dialog pattern when interaction is required.

### Touch Devices

Touch devices do not provide the same persistent hover interaction as desktop pointers.

Tooltip must not be the only way to discover essential instructions, required fields, validation errors or critical actions.

### Disabled Controls

Disabled native Buttons generally cannot receive keyboard focus.

Do not depend on a Tooltip attached directly to a disabled Button to communicate essential information.

Use a visible explanation or a separately accessible help control where necessary.

## 12. Integration with Dialog

Tooltip has been verified inside the existing Radix-backed Dialog.

Important integration requirements:

- Tooltip appears above the Dialog when appropriate.
- Portaled content is not clipped by the Dialog panel.
- Focus remains with the Tooltip trigger.
- Tooltip dismissal does not unexpectedly break modal interactions.
- Closing the Dialog removes the Tooltip appropriately.
- Portal theme tokens remain available.
- Layering must remain consistent with other overlays.

Tooltip does not manage Dialog state or modal focus behavior.

## 13. Theme and Portal Integration

TooltipContent is rendered through a Portal.

Theme variables must be available at the Tooltip's actual DOM location.

Applying the theme class or semantic tokens at the document root is a suitable strategy.

The Tooltip wrapper does not maintain an independent theme state.

Verify both light and dark themes, including Tooltips rendered inside Dialog.

## 14. Verification Completed

- Four public components and prop types
- Strict TypeScript compilation
- Shared Provider configuration
- Controlled Tooltip state
- Uncontrolled Tooltip state
- Native Button composition through `asChild`
- Native/Radix-compatible refs
- Pointer-hover opening
- Keyboard-focus opening
- Escape dismissal
- Trigger activation behavior
- Hoverable and persistent content
- Shared opening delays
- Top, right, bottom and left positioning
- Viewport-edge collision handling
- Long-text wrapping
- Accessible trigger names
- Accessible supplementary descriptions
- Tooltip inside Dialog
- Portal stacking behavior
- Light and dark themes
- Mobile viewport testing
- 200% browser zoom
- Accessibility inspection
- ESLint and production build

## 15. Storybook Requirements — Phase 7

Create stories for:

1. Basic Tooltip
2. Text Button Trigger
3. Icon-only Button
4. Keyboard Focus
5. Escape Dismissal
6. Controlled Tooltip
7. Custom Opening Delay
8. Multiple Tooltips
9. Different Placements
10. Long Content
11. Viewport Edge Collision
12. Tooltip Inside Dialog
13. Dark Theme

Storybook interaction tests should verify opening, dismissal, accessible description behavior, focus preservation and relevant positioning.

TooltipProvider should be configured as a global Storybook decorator.

## 16. Architectural Boundaries

Tooltip does not implement:

- Business logic
- Trigger actions
- Application navigation
- Data fetching
- Form interactions
- Custom positioning calculations
- Custom keyboard-event engines
- Custom hover-state machinery
- Interactive popup content
- Focus trapping
- Modal behavior
- CVA variants
- Animation dependencies
- A dedicated React Context beyond Radix's internal mechanisms

Radix owns the interaction and positioning foundation.

The design system owns styling, public API, component composition and usage conventions.

## 17. Known Considerations

**Provider requirement:** TooltipProvider must wrap Tooltip instances.

**Accessible naming:** Trigger controls require their own meaningful accessible names.

**Portal behavior:** Theme inheritance and stacking must be verified when Tooltip is combined with Dialog or other overlays.

**Content restrictions:** Tooltips are for noninteractive supporting information.

**Touch behavior:** Tooltip is not a dependable sole channel for essential information on touch devices.

**Disabled triggers:** Native disabled controls require alternative approaches when explanatory text is necessary.

**Hover/focus behavior:** Verify WCAG hoverable, persistent and dismissible behavior in supported browsers.

**Controlled visibility:** The application is responsible for meaningful behavior when overriding Tooltip's natural visibility state.

## 18. References

- Radix Tooltip documentation: https://www.radix-ui.com/primitives/docs/components/tooltip
- Radix composition guide: https://www.radix-ui.com/primitives/docs/guides/composition
- WCAG 2.2 Content on Hover or Focus: https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html

**Final decision:** Tooltip is a lightweight, Radix-backed component family with four public components, shared provider configuration, accessible hover/focus behavior, automatic positioning and custom semantic Tailwind styling.