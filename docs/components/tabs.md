# Tabs Component

**Category:** Advanced Interactive Component  
**Implementation:** `src/components/interactive/tabs.tsx`  
**Implementation approach:** Custom React 19 + TypeScript + Tailwind CSS v4  
**Status:** Implemented and verified

## 1. Overview

Tabs is a reusable, accessible component family for organizing related content into selectable panels.

It implements a horizontal tab interface using native buttons, private React Context, controlled/uncontrolled selection, automatic activation, roving `tabIndex`, keyboard navigation and accessible tab-panel relationships.

Unlike Dialog, Tabs is implemented without Radix Primitives or another third-party interaction dependency.

The component follows the WAI-ARIA Tabs pattern.

## 2. Component Architecture

| Component | Native element | Responsibility |
|---|---|---|
| `Tabs` | `div` | Selection state, unique ID namespace and private Context |
| `TabsList` | `div` | Tablist semantics and keyboard navigation |
| `TabsTrigger` | `button` | Tab activation, selected state and focus behavior |
| `TabsContent` | `div` | Associated content panel and visibility |

All four components support native React 19-compatible refs.

Tabs must wrap its related components. TabsList, TabsTrigger and TabsContent require the parent Tabs Context.

## 3. Public API

### Tabs

Supports two selection modes.

**Uncontrolled:**
- `defaultValue: string` — required initial selected value
- `onValueChange?: (value: string) => void` — optional selection notification

**Controlled:**
- `value: string` — selected value
- `onValueChange: (value: string) => void` — required selection callback

The public TypeScript union prevents combining controlled `value` with `defaultValue`.

Other native div props, `className`, children and refs remain supported.

### TabsList

Inherits native div props.

Provides:
- `role="tablist"`
- `aria-orientation="horizontal"`
- Keyboard-event handling
- Horizontal overflow
- Consumer-provided accessible labels

Use `aria-label` or `aria-labelledby` to identify the tablist.

### TabsTrigger

Requires `value: string`.

Supports native button attributes, including `disabled`, `className`, `onClick`, `onFocus` and React refs.

The component internally manages:
- `type="button"`
- `role="tab"`
- `id`
- `aria-selected`
- `aria-controls`
- `tabIndex`
- `data-state`
- Selection and focus behavior

These generated attributes are reserved by the API to protect accessibility relationships.

### TabsContent

Requires `value: string`.

Supports appropriate native div attributes, children, `className` and refs.

The component internally manages:
- `role="tabpanel"`
- `id`
- `aria-labelledby`
- `hidden`
- `tabIndex`
- `data-state`

These accessibility attributes are generated from the parent Tabs Context.

## 4. State Architecture

Tabs supports controlled and uncontrolled modes.

### Uncontrolled Mode

```tsx
<Tabs defaultValue="overview">
  {/* TabsList, triggers and panels */}
</Tabs>
```

The root owns the selected value.

### Controlled Mode

```tsx
const [active, setActive] = useState("overview");

<Tabs value={active} onValueChange={setActive}>
  {/* TabsList, triggers and panels */}
</Tabs>
```

The consuming application owns the selected value.

Selection changes may be initiated through pointer interaction, keyboard navigation or focus activation.

The implementation avoids duplicate selection requests when multiple event paths target the same value.

## 5. Private React Context

Tabs uses a private Context to share:
- Currently selected value
- Selection-change function
- Unique ID namespace

Context is necessary because triggers and panels coordinate shared interaction behavior.

It is not part of the public component API.

Components requiring this Context throw a descriptive error when used outside Tabs.

## 6. Keyboard Interaction

Tabs uses horizontal orientation with automatic activation.

| Key or interaction | Behavior |
|---|---|
| Tab | Enters the tablist at its selected enabled tab |
| ArrowRight | Focuses and selects the next enabled tab |
| ArrowLeft | Focuses and selects the previous enabled tab |
| Home | Focuses and selects the first enabled tab |
| End | Focuses and selects the last enabled tab |
| Enter / Space | Activates the native tab button |
| Tab from selected tab | Moves into the active panel or subsequent focusable content |
| Shift+Tab | Follows normal reverse focus order |
| ArrowUp / ArrowDown | No custom tab switching |

Arrow navigation wraps around and skips disabled triggers.

Keyboard handling is scoped to the current TabsList.

No document-level event listeners are required.

## 7. Roving tabIndex

Only the selected enabled trigger has `tabIndex={0}`.

Other enabled triggers have `tabIndex={-1}` but remain programmatically focusable.

Disabled triggers are excluded from normal keyboard navigation.

The tablist therefore behaves as a coordinated keyboard interface rather than presenting every tab as a separate stop in the page's normal Tab sequence.

## 8. Automatic Activation

Focus movement activates the focused enabled tab.

For example, pressing ArrowRight moves focus to the next enabled trigger and updates the selected panel.

TabsTrigger also handles focus activation, so appropriate programmatic focus can update selection.

Automatic activation is intended for panels whose content can be presented without noticeable latency.

Manual activation is outside the version 1 API.

## 9. Accessible Relationships

Tabs uses React's `useId()` to generate a unique ID prefix for each Tabs instance.

Tab and panel IDs are derived from that prefix and their matching `value`.

Each TabsTrigger exposes:
- `role="tab"`
- `aria-selected`
- `aria-controls` referencing its panel
- An internally generated `id`

Each TabsContent exposes:
- `role="tabpanel"`
- `aria-labelledby` referencing its trigger
- An internally generated `id`

Consumers must provide matching values and unique trigger values within an instance.

Multiple Tabs instances generate independent ID namespaces.

## 10. Panel Mounting and Visibility

Inactive panels remain mounted in the React tree but are hidden from visual presentation and normal keyboard navigation.

The implementation uses the native `hidden` attribute and inactive-state styling.

This preserves local React state when switching between panels.

For example, a counter or form inside an inactive panel retains its value.

Because all panels remain mounted, consumers should avoid placing unnecessary expensive operations in every inactive panel.

Lazy mounting and asynchronous panel loading are not part of version 1.

## 11. Disabled Tabs

TabsTrigger supports the native `disabled` attribute.

Disabled tabs:
- Cannot be activated by pointer or keyboard
- Are skipped by ArrowLeft, ArrowRight, Home and End navigation
- Do not become the active tab through focus

**Selection invariant:** The selected value must correspond to an existing enabled trigger and matching content panel.

The consuming application is responsible for updating a controlled selection before disabling or removing the currently active tab.

Version 1 does not automatically choose a replacement tab.

## 12. Styling Architecture

Tabs uses Tailwind CSS and shared semantic design tokens.

### Tabs

- Full available width
- Minimum width protection
- No forced background, border or internal padding

### TabsList

- Horizontal flex layout
- Consistent spacing
- Bottom border
- Horizontal scrolling when necessary

### TabsTrigger

- Native button
- Minimum target height
- Horizontal padding
- Medium-weight typography
- Transparent inactive border
- Primary-colored active bottom border
- Muted inactive text
- Visible keyboard focus indicator
- Native disabled behavior

### TabsContent

- Content spacing
- Minimum width protection
- Visible focus indicator
- Hidden inactive state

No CVA variants are required.

All colors use semantic tokens and support light/dark themes.

## 13. Composition Example

```tsx
<Tabs defaultValue="overview">
  <TabsList aria-label="Project sections">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>

  <TabsContent value="overview">
    Project overview
  </TabsContent>

  <TabsContent value="activity">
    Recent activity
  </TabsContent>

  <TabsContent value="settings">
    Project settings
  </TabsContent>
</Tabs>
```

Consumers can place Cards, forms, charts, tables or other suitable content within TabsContent.

## 14. Verification Completed

- Four public components and prop types
- Strict TypeScript compilation
- Native React refs
- Controlled selection
- Uncontrolled selection
- Pointer activation
- Automatic focus activation
- ArrowLeft and ArrowRight navigation
- Home and End navigation
- Navigation wrapping
- Roving tabIndex
- Disabled trigger handling
- Unique generated IDs
- Valid tab/panel associations
- Multiple independent Tabs instances
- Persistent inactive panel state
- Hidden panel accessibility behavior
- Horizontal overflow
- Responsive layout and browser zoom
- Light and dark themes
- Accessibility tree inspection
- Automated accessibility checks
- ESLint and production build

## 15. Storybook Requirements — Phase 7

Create stories for:

1. Default
2. Controlled
3. Uncontrolled
4. Disabled Tab
5. Keyboard Navigation
6. Multiple Instances
7. Persistent Panel State
8. Long Labels
9. Horizontal Overflow
10. Tabs Inside Card
11. Focusable Panels
12. Dark Theme

Storybook interaction tests should cover ArrowLeft, ArrowRight, Home, End, focus movement, selection, and correct panel visibility.

## 16. Architectural Boundaries

Tabs does not own:
- Data fetching
- Application routing
- URL synchronization
- Lazy loading
- Async panel requests
- Drag-and-drop
- Removable tabs
- Vertical orientation
- Manual activation
- Complex visual variants
- Application-specific permissions
- Automatic replacement of disabled selected values

These responsibilities remain with consumers or future higher-level components.

## 17. Known Considerations

**Selection validity:** Consumers must maintain valid selections when tabs are dynamically removed or disabled.

**Automatic activation:** Expensive or slow panel updates may require a future manual-activation mode.

**Horizontal overflow:** Focused tabs must remain visible when the tablist scrolls.

**Focus management:** Keyboard navigation and focus behavior should be manually tested in supported browsers.

**Mounted panels:** Inactive content retains local state but also retains its mounted component cost.

**Layout:** Consumer-provided classes must not break selected-state styling or panel hiding.

**Final decision:** Tabs is a custom, accessible, horizontal tab system with four public components, private React Context, controlled/uncontrolled selection, automatic activation and no Radix Tabs dependency.