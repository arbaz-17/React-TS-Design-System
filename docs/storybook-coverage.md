# Storybook Component Coverage

This index summarizes the Storybook coverage completed for the React + TypeScript Mini Design System. The component APIs and source files remain authoritative.

## Verified story counts

| Layer | Families | Public components | Stories |
|---|---:|---:|---:|
| Primitives | 8 | 8 | 79 |
| Composites | 5 | 27 | 53 |
| Interactive | 4 | 20 | 45 |
| **Total** | **17** | **55** | **177** |

## Component families

| Family | Storybook sidebar | Story file | Guide | Stories |
|---|---|---|---|---:|
| Button | `Primitives/Button` | [`src/components/primitives/button.stories.tsx`](../src/components/primitives/button.stories.tsx) | [`button.md`](components/button.md) | 9 |
| Input | `Primitives/Input` | [`src/components/primitives/input.stories.tsx`](../src/components/primitives/input.stories.tsx) | [`input.md`](components/input.md) | 9 |
| Textarea | `Primitives/Textarea` | [`src/components/primitives/textarea.stories.tsx`](../src/components/primitives/textarea.stories.tsx) | [`textarea.md`](components/textarea.md) | 12 |
| Select | `Primitives/Select` | [`src/components/primitives/select.stories.tsx`](../src/components/primitives/select.stories.tsx) | [`select.md`](components/select.md) | 10 |
| Checkbox | `Primitives/Checkbox` | [`src/components/primitives/checkbox.stories.tsx`](../src/components/primitives/checkbox.stories.tsx) | [`checkbox.md`](components/checkbox.md) | 12 |
| Switch | `Primitives/Switch` | [`src/components/primitives/switch.stories.tsx`](../src/components/primitives/switch.stories.tsx) | [`switch.md`](components/switch.md) | 11 |
| Badge | `Primitives/Badge` | [`src/components/primitives/badge.stories.tsx`](../src/components/primitives/badge.stories.tsx) | [`badge.md`](components/badge.md) | 7 |
| Skeleton | `Primitives/Skeleton` | [`src/components/primitives/skeleton.stories.tsx`](../src/components/primitives/skeleton.stories.tsx) | [`skeleton.md`](components/skeleton.md) | 9 |
| Card | `Composites/Card` | [`src/components/composites/card.stories.tsx`](../src/components/composites/card.stories.tsx) | [`card.md`](components/card.md) | 10 |
| Alert | `Composites/Alert` | [`src/components/composites/alert.stories.tsx`](../src/components/composites/alert.stories.tsx) | [`alert.md`](components/alert.md) | 11 |
| FormField | `Composites/FormField` | [`src/components/composites/form-field.stories.tsx`](../src/components/composites/form-field.stories.tsx) | [`form-field.md`](components/form-field.md) | 10 |
| EmptyState | `Composites/EmptyState` | [`src/components/composites/empty-state.stories.tsx`](../src/components/composites/empty-state.stories.tsx) | [`empty-state.md`](components/empty-state.md) | 11 |
| Table | `Composites/Table` | [`src/components/composites/table.stories.tsx`](../src/components/composites/table.stories.tsx) | [`table.md`](components/table.md) | 11 |
| Dialog | `Interactive/Dialog` | [`src/components/interactive/dialog.stories.tsx`](../src/components/interactive/dialog.stories.tsx) | [`dialog.md`](components/dialog.md) | 11 |
| Tabs | `Interactive/Tabs` | [`src/components/interactive/tabs.stories.tsx`](../src/components/interactive/tabs.stories.tsx) | [`tabs.md`](components/tabs.md) | 11 |
| Accordion | `Interactive/Accordion` | [`src/components/interactive/accordion.stories.tsx`](../src/components/interactive/accordion.stories.tsx) | [`accordion.md`](components/accordion.md) | 11 |
| Tooltip | `Interactive/Tooltip` | [`src/components/interactive/tooltip.stories.tsx`](../src/components/interactive/tooltip.stories.tsx) | [`tooltip.md`](components/tooltip.md) | 12 |

## Presentation and controls

- Global light/dark theme switching applies to all 177 stories; a dedicated Dark Theme story is not required for each component.
- Component controls expose meaningful public props only. Non-interactive composition examples may intentionally disable controls.
- Component stories use the real exported components; application state and behavior belong to consuming story examples.
- Prefer semantic tokens, valid HTML, appropriate labels, and accessibility associations.

## Verification status and limits

**Confirmed through user-reported local checks:** 177 stories rendered; component-story verification gates were passed in Phases 7.2, 7.3, and 7.4, including `npm run build-storybook`, `npm run build`, `npm run lint` and automated accessibility-panel review. Certain keyboard, focus and responsive behaviors were also checked manually.

**Not yet performed as a project-wide gate:** automated Storybook/Vitest interaction tests, comprehensive manual screen-reader review, and final integration audit of the latest working tree. These activities were deliberately deferred and must not be described as passed.

**Source limitation:** The original uploaded repository ZIP predates Storybook. This index uses the documented story implementations and reported verification results, not file-by-file inspection of the latest `.stories.tsx` files. Confirm exact story names against that version during documentation verification; Input and Switch are especially flagged in their guides.

## Related documentation

- Component guides: [`docs/components/`](components/)
- Architecture and conventions: updated separately in Phase 7.5.1-D
- README: updated separately in Phase 7.5.1-E

## Storybook UI polish

Manager branding, documentation styling, and welcome-page polish are planned after functional/documentation QA, before final submission. This should not change public component APIs.
