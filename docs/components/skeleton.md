# Skeleton Component

**Category:** Core Primitive  
**Implementation:** `src/components/primitives/skeleton.tsx`  
**Status:** Implemented and verified

## 1. Responsibility

Skeleton is a reusable, decorative loading placeholder for content that has not yet loaded.

It provides consistent placeholder appearance, theme-aware styling and reduced-motion support.

Consumers compose Skeleton elements into placeholders for text, images, avatars, cards, lists and other content.

Skeleton does not manage loading state, data fetching or announcements.

## 2. Public API

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `className` | `string` | — | Customize dimensions and appearance |
| `ref` | `Ref<HTMLDivElement>` | — | Access underlying DOM element |
| `data-*` | Native HTML attributes | — | Testing or additional metadata |
| `id` | `string` | — | Optional DOM identification |
| `style` | Native React style object | — | Optional inline styling |

**Public exports:**
- `Skeleton`
- `SkeletonProps`

The component intentionally excludes children, dangerouslySetInnerHTML, role, tabIndex and aria-hidden from its public TypeScript contract.

## 3. TypeScript Architecture

Skeleton uses `ComponentPropsWithRef<"div">` with selected properties omitted.

It forwards refs directly to its native `HTMLDivElement`.

The component contains no internal React state, effects or application-specific logic.

No CVA variants or external dependencies are required beyond React's types and the shared `cn()` utility.

## 4. Default Visual Design

Skeleton uses semantic Tailwind classes.

Defaults:

- Full width
- 16px height
- Shared control border radius
- Muted background
- Gentle pulse animation when motion is permitted
- Non-interactive visual behavior

Consumers configure shapes and dimensions through `className`.

The component does not introduce separate size or shape props.

## 5. Shape Composition

### Text Line

```tsx
<Skeleton className="h-4 w-full" />
```

### Short Text

```tsx
<Skeleton className="h-3 w-24" />
```

### Circular Avatar

```tsx
<Skeleton className="h-12 w-12 rounded-full" />
```

### Image Placeholder

```tsx
<Skeleton className="h-40 w-full rounded-surface" />
```

### Multiple Text Lines

```tsx
<div className="space-y-3">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-4/5" />
  <Skeleton className="h-4 w-2/3" />
</div>
```

## 6. Animation and Reduced Motion

Skeleton uses `motion-safe:animate-pulse`.

The pulse animation is applied only when the user's motion preference allows it.

When reduced motion is requested, the placeholder remains static and visible.

No JavaScript animation or motion-detection hook is necessary.

Consumers should avoid unnecessary complex loading animations.

## 7. Accessibility

Skeleton is decorative and uses `aria-hidden="true"`.

Accessibility requirements:

- Do not place meaningful content inside Skeleton.
- Do not make Skeleton keyboard-focusable.
- Do not use Skeleton as a button or other interactive control.
- Do not rely on Skeleton alone to communicate loading to assistive technology.
- Maintain the loading state on the relevant parent content region.
- Use an appropriate accessible status message when loading transitions require announcements.
- Remove placeholders when real content is available.
- Respect reduced-motion preferences.
- Maintain usable layouts at increased browser zoom.
- Verify appearance in light, dark and forced-colors modes.

For dynamic loading regions, consumers may use `aria-busy`.

A persistent live region can provide loading and completion announcements when needed.

Individual Skeleton elements should not automatically use `role="status"`, `role="progressbar"` or other non-decorative roles.

## 8. Loading-State Composition

Example:

```tsx
<section aria-busy={loading}>
  {loading ? (
    <div className="space-y-3">
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  ) : (
    <ProfileContent />
  )}
</section>
```

The consuming application controls `loading`.

Skeleton only provides the placeholder elements.

Where loading changes require explicit announcements, provide an accessible status message outside the busy region.

## 9. Theme Integration

Skeleton uses the semantic `muted` background token.

It automatically adapts to the current light or dark theme through the shared design system.

Forced-colors border styling helps preserve visible placeholder boundaries in high-contrast environments.

No component-specific theme hook is required.

## 10. Verification Criteria

- Strict TypeScript compilation
- Default dimensions
- Custom dimensions
- Circular and rectangular shapes
- Text-line composition
- Profile placeholder composition
- Card placeholder composition
- Consumer className merging
- HTMLDivElement ref forwarding
- Decorative aria-hidden semantics
- Keyboard navigation exclusion
- Loading-state transitions
- Parent aria-busy behavior
- Accessible status announcements
- Light and dark themes
- Reduced-motion behavior
- Responsive layout and browser zoom
- Forced-colors inspection
- Accessibility audit
- ESLint and production build

## 11. Verified Storybook Coverage — Phase 7

**Storybook navigation:** `Primitives/Skeleton`

**Story file:** [`src/components/primitives/skeleton.stories.tsx`](../../src/components/primitives/skeleton.stories.tsx)

**Coverage:** 9 locally verified stories.

| Story | Documented purpose |
|---|---|
| Default | Configurable placeholder dimensions |
| Text Lines | Variable-width text placeholders |
| Avatar | Circular placeholders |
| Image Placeholder | Aspect-ratio image placeholder |
| Profile Skeleton | Composite profile loading |
| Card Skeleton | Card composition |
| Responsive List | Responsive repeated skeletons |
| Loading To Loaded | Consumer-managed loading, busy state, and status message |
| Reduced Motion | Animation preference behavior |

**Storybook controls:** ClassName.

**Themes:** Use the global Storybook light/dark toolbar. There is no dedicated Dark Theme story; verify each story in both themes when relevant.

**Accessibility and behavior:** The examples demonstrate the component’s existing semantics and relevant keyboard, focus, responsive, and ARIA behavior. They do not add behavior to production components.

**Verification status:** Story rendering, manual checks, Storybook build, app build, lint, and the Storybook accessibility panel were reported as passing during Phases 7.2–7.4. This is user-reported verification; it does not constitute a completed automated interaction-test suite or full WCAG conformance audit.

**Synchronization note:** This section is based on the story implementation and verification results in the project conversation. The original repository ZIP did not contain the newly authored `.stories.tsx` files. Perform a final export-name and content comparison against the latest working tree during Phase 7.5.1-F.

## 12. Architectural Boundaries

Skeleton does not own:

- Data fetching
- Loading state
- Error handling
- Retry logic
- Automatic dimensions
- Status announcements
- Layout measurement
- Component-specific business logic
- Content rendering after loading
- Suspense boundaries

These concerns belong to consuming components and applications.

## 13. Known Considerations

**Accessibility:** Skeleton must remain decorative. Loading announcements belong to the surrounding experience.

**Dimensions:** Custom shapes are composed through Tailwind classes rather than dedicated props.

**Animation:** The pulse must not run when the user requests reduced motion.

**Layout stability:** Skeleton compositions should approximate the dimensions of the real content to minimize visual layout shifts.

**Final decision:** Keep Skeleton a lightweight, composable and accessible decorative placeholder with semantic styling and reduced-motion support.