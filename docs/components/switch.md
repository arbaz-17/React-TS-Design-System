# Switch Component

**Category:** Core Primitive  
**Implementation:** `src/components/primitives/switch.tsx`  
**Status:** Ready for local verification and finalization

## 1. Responsibility

Switch is a reusable, accessible on/off control designed for application settings and preferences.

It uses a native HTML checkbox input with `role="switch"` and custom visual presentation.

Switch preserves native checked-state behavior, keyboard interaction and form integration without introducing internal React state.

Typical uses include notifications, automatic saving, feature preferences and display settings.

## 2. Public API

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `checked` | `boolean` | — | Controlled on/off state |
| `defaultChecked` | `boolean` | — | Uncontrolled initial state |
| `onChange` | Native React handler | — | Handle state changes |
| `disabled` | `boolean` | `false` | Disable interaction |
| `required` | `boolean` | `false` | Native required constraint |
| `name` | `string` | — | Native form field name |
| `value` | Native input value | `"on"` when omitted | Submitted value when checked |
| `id` | `string` | — | Associate an external label |
| `aria-invalid` | Native ARIA attribute | — | Communicate invalid state |
| `aria-describedby` | `string` | — | Associate descriptions/errors |
| `className` | `string` | — | Additional wrapper styling |
| `ref` | `Ref<HTMLInputElement>` | — | Access native input |

**Public exports:**
- `Switch`
- `SwitchProps`

## 3. TypeScript Architecture

Switch uses `ComponentPropsWithRef<"input">` with selected properties omitted.

Excluded properties:

- `type` — Always a native checkbox.
- `role` — Always `switch`.
- `aria-checked` — Checked state comes from native checkbox state.
- `children` — Labels are external.
- `defaultValue` — Initial selection uses `defaultChecked`.
- `readOnly` — Not supported in the public API.
- `size` — Fixed visual dimensions.

The native input is the ref target.

The `className` prop applies to the outer wrapper, not directly to the input.

## 4. Controlled and Uncontrolled Behavior

### Controlled

Consumers manage the on/off state through React.

```tsx
<Switch
  checked={enabled}
  onChange={(event) => {
    setEnabled(event.currentTarget.checked);
  }}
  aria-label="Notifications"
/>
```

### Uncontrolled

The browser manages the checked state.

```tsx
<Switch
  name="autoSave"
  defaultChecked
  aria-label="Automatic saving"
/>
```

The component contains no internal state management.

Consumers should not switch between controlled and uncontrolled modes during a component's lifetime.

## 5. DOM Structure

The component renders:

1. An outer positioning wrapper.
2. A native checkbox input with the switch role.
3. A decorative track.
4. A decorative thumb.

The input occupies the complete visible control area and remains keyboard focusable.

The track and thumb are hidden from assistive technology and do not receive pointer events.

## 6. Visual Design

**Dimensions:**
- Width: 44px
- Height: 24px
- Thumb diameter: 20px

**Off state:**
- Muted track
- Thumb positioned left

**On state:**
- Primary-colored track
- Thumb positioned right

**Focus state:**
- Visible semantic focus outline on the track

**Invalid state:**
- Destructive ring when `aria-invalid="true"`

**Disabled state:**
- Native disabled behavior
- Reduced visual emphasis
- No user activation

**Motion:**
- Short color and position transitions
- Transitions disabled when reduced motion is preferred

Semantic tokens support light and dark themes. Forced-colors styling provides additional support for Windows high-contrast environments.

## 7. Accessibility

Switch uses `role="switch"` on a native checkbox input.

Requirements:

- Every switch must have an accessible name.
- Prefer a visible associated label.
- Do not change the label when the state changes.
- Preserve Space-key toggling.
- Preserve normal Tab navigation.
- Maintain visible keyboard focus.
- Communicate on/off state through native checked state.
- Associate descriptions/errors through `aria-describedby`.
- Preserve disabled semantics.
- Do not rely solely on track color to communicate state.
- Verify usability at increased zoom and in forced-colors mode.

The native checkbox's `checked` state provides its accessibility state. No separate manually synchronized `aria-checked` attribute is needed.

## 8. Usage Examples

### Basic

```tsx
<label htmlFor="notifications">
  <Switch id="notifications" name="notifications" />
  Notifications
</label>
```

### Controlled

```tsx
<Switch
  checked={enabled}
  onChange={(event) => {
    setEnabled(event.currentTarget.checked);
  }}
  aria-label="Automatic saving"
/>
```

### Uncontrolled

```tsx
<Switch
  defaultChecked
  name="compactMode"
  aria-label="Compact mode"
/>
```

### Disabled

```tsx
<Switch
  disabled
  defaultChecked
  aria-label="Unavailable preference"
/>
```

### Invalid

```tsx
<Switch
  id="alerts"
  aria-invalid={true}
  aria-describedby="alerts-error"
/>
<label htmlFor="alerts">Email alerts</label>
<p id="alerts-error">This setting could not be saved.</p>
```

## 9. Native Form Behavior

Switch inherits checkbox form semantics.

- Checked switches contribute their name/value to FormData.
- Unchecked switches are omitted.
- Disabled switches are omitted.
- The default submitted value is `"on"` when no explicit value is provided.

Switch does not serialize unchecked values as `false`.

## 10. Switch Versus Checkbox

Use **Switch** for an on/off application setting.

Use **Checkbox** for selection within a form, agreement, or a list of choices.

Switches are generally best for independently toggled settings. A consumer may implement immediate persistence, confirmation or error handling externally.

## 11. Verification Criteria

- Strict TypeScript compilation
- Controlled and uncontrolled behavior
- Native checked-state handling
- Track and label activation
- Space-key toggling
- Keyboard focus visibility
- Ref forwarding and programmatic focus
- Native FormData behavior
- Required and disabled states
- Invalid styling and descriptions
- Light and dark themes
- Reduced-motion behavior
- Forced-colors compatibility
- Responsive layout and zoom
- Accessibility audit
- ESLint and production build

## 12. Storybook Requirements — Phase 7

Create stories for:

1. Default Off
2. Default On
3. Controlled
4. Uncontrolled
5. Disabled Off
6. Disabled On
7. Invalid
8. With Label
9. With Description
10. Form Integration
11. Dark Theme

Storybook documentation should explain the difference between Checkbox and Switch and demonstrate accessible labeling.

## 13. Architectural Boundaries

Switch does not own:

- Label rendering
- Validation rules
- Error-message generation
- API requests
- Persistence or auto-save logic
- Loading state
- Group state management
- Theme switching
- Confirmation dialogs

These belong to consuming applications or higher-level components.

Switch does not depend on Radix, CVA, form-management libraries or other primitives.

## 14. Known Considerations

**Native state:** An input-based switch uses `checked`, not a manually maintained `aria-checked` attribute.

**Label stability:** The accessible name should remain consistent when toggled.

**DOM composition:** `className` styles the wrapper; `ref` targets the input.

**Visual styling:** Track and thumb are decorative, but their position and colors must remain perceptible in accessibility modes.

**Form submission:** Unchecked switches are omitted from FormData.

**Final decision:** Switch is a native checkbox-based, semantically accessible on/off primitive with CSS-driven visual states and no internal React state.