# React + TypeScript Mini Design System — Component Conventions

> **Scope:** Source-grounded conventions for the existing 55 exported components in 17 families. These describe actual design decisions and extension expectations—not a requirement to rewrite working components. For architecture and theme details, see [`architecture.md`](architecture.md).

## 1. Naming, location, and public exports

- Use **PascalCase** for components and public prop types (`Button`, `ButtonProps`).
- Use **kebab-case** component files (`form-field.tsx`, `empty-state.tsx`).
- Maintain one family per implementation file where composition logically belongs together.
- Export public components and public prop types **by name** through [`src/components/index.ts`](../src/components/index.ts).
- Keep helpers, private Contexts, variant definitions, and internal IDs private unless deliberately part of the public API.
- Place accompanying Storybook files alongside their component implementation (`*.stories.tsx`).
- Keep application business logic, sample data, and story-only helpers out of the public component source.

### Current boundaries

| Layer | Families |
|---|---|
| Primitives (8) | Button, Input, Textarea, Select, Checkbox, Switch, Badge, Skeleton |
| Composites (5) | Card, Alert, FormField, EmptyState, Table |
| Interactive (4) | Dialog, Tabs, Accordion, Tooltip |

The public barrel includes **55 components**. Component consumers must not depend on `src/App.tsx`, test utilities, or Storybook examples.

## 2. TypeScript contract rules

- Define accurate public prop types and preserve native HTML attributes where possible.
- Prefer `ComponentPropsWithRef<"button">`, `<"input">`, `<"div">`, and other matching native element types for wrappers.
- Use React 19 ref-as-prop forwarding to the meaningful underlying DOM node, matching each component's published contract.
- For Radix-backed components, derive public props from Radix primitives and explicitly omit unsupported props.
- Use typed literal unions for finite variants and valid state combinations; avoid `any` and unnecessary type assertions.
- Prefer TypeScript inference for private implementation details. Generics and discriminated unions are justified only when they express real relationships or exclude invalid states.
- Use named component exports; do not require `React.FC`.
- Preserve native events, `aria-*`/`data-*` attributes, `id`, and `ref` unless intentionally excluded by the component API.

**Specific restrictions already implemented:** Select excludes multi-select and native sizing; Switch fixes checkbox type and switch role; Skeleton excludes children and interactive semantics; Dialog is modal-only; Tabs' controlled/uncontrolled prop union prevents mixing `value` with `defaultValue`; AccordionItem exposes `defaultOpen` instead of native controlled `open`.

**Strict compiler mode:** The original TypeScript configs do not explicitly contain `strict: true`. Strictness should be assessed through the effective local TS configuration during technical QA before stating it is enabled. This documentation update does not modify compiler settings.

## 3. Styling and variants

- Consume semantic variables from [`src/styles/tokens.css`](../src/styles/tokens.css), and base styles from [`src/styles/global.css`](../src/styles/global.css).
- Use Tailwind v4 utility classes and the shared [`cn()`](../src/lib/utils.ts) for conditional class composition and known utility conflict resolution.
- Place the consumer's `className` after base and variant classes so recognized overrides can apply.
- Use CVA **only** when meaningful visual variants merit a typed API. Current CVA families: **Button, Badge, Alert**.
- Preserve theme-consistent surface/text/border colors, focus indication, reduced-motion behavior, and accessible control states.
- Avoid unnecessary hardcoded colors, animation, bespoke sizes, or new CSS variables. Explain intentional exceptions.
- `className` is a styling extension, **not a promise that arbitrary custom CSS classes will be intelligently merged**.

Consumers should not need a separate variant for ordinary width, spacing, grid, or border adjustments.

## 4. Native semantics and accessibility

- Prefer the correct native element rather than inventing ARIA roles: `button`, `input`, `select`, `textarea`, `label`, `table`, `details`, and `summary`.
- Preserve accessible names. Icon-only controls need a name independent of the tooltip or decorative image.
- Preserve focus-visible indicators and native keyboard behavior, including disabled behavior.
- Connect form labels to controls using `htmlFor` and `id`, help/error text using `aria-describedby`, and invalid state using `aria-invalid`.
- A visual asterisk from `FormLabel.requiredIndicator` does not replace the control's native `required` attribute.
- `Alert` variant determines **appearance**, not automatic live-announcement role; consumers select `role="status"` or `role="alert"` only when applicable.
- `Skeleton` is decorative (`aria-hidden="true"`); its consumer owns loading announcements and `aria-busy` regions.
- Data tables should use native `caption`, column/row `th` scopes, and valid structure; put an EmptyState in a spanning `td`, not directly in `tbody`.
- Always provide a meaningful heading for a Dialog and appropriate focus exit paths. A Tooltip describes a focusable trigger; its content should remain noninteractive.
- Test responsive reflow, zoom, reduced motion, and high contrast when relevant.

Automated a11y reports supplement—not replace—manual keyboard and assistive-technology testing.

## 5. State ownership by family

| Family / category | State contract |
|---|---|
| Native controls | Values, validity, loading, and operations owned by consumer or native HTML as applicable |
| Card, Alert, FormField, EmptyState, Table | Mostly presentational; no hidden application state or data-fetching |
| Dialog | Radix-controlled or `open` + `onOpenChange`; modal only; consumer owns form submissions and dismissal policies |
| Tabs | Custom Context; controlled `value` + `onValueChange`, or uncontrolled `defaultValue` |
| Accordion | Native `details` state; `defaultOpen` initializes, `onToggle` observes; single group via native `name` |
| Tooltip | Radix Root state and Provider timing; controlled/uncontrolled supported |

Do not add state libraries or synchronization machinery where native HTML or an existing headless primitive already provides the behavior.

### Important behavioral boundaries

- **Tabs:** ArrowLeft/ArrowRight/Home/End select and focus enabled tabs. Programmatically focusing a trigger alone does **not** select it. Inactive panels remain mounted but hidden.
- **Accordion:** No synthetic arrow-key navigation; use native Enter/Space for summary. `defaultOpen` is not controlled state.
- **Dialog:** Do not circumvent Radix's modal focus containment or `asChild` trigger semantics. A submit button should close after successful work, not merely because it was clicked.
- **Tooltip:** Do not use tooltip content for buttons, forms, or links. Give its trigger an independent accessible name and retain Escape dismissal.

## 6. Composition rules

- Prefer composition through `children` and small section elements over giant option/boolean prop sets.
- Use Context only for coordinated component state (e.g., Tabs). Accordion's Context is limited to native-group configuration; Card/Alert/FormField/Table/EmptyState don't require shared state.
- Use `asChild` when needed to avoid nested interactive elements in Radix Trigger/Close composition.
- Do not add application navigation, network calls, list filtering, form controllers, or CRUD operations to general-purpose components.
- Preserve meaningful HTML heading hierarchy. `CardTitle` and `EmptyStateTitle` are `h3` in the source; consumers must provide suitable surrounding headings.
- Avoid extra DOM wrappers or nested buttons that interfere with semantics.

## 7. Documentation and Storybook conventions

Each family guide should explain:

1. Purpose and layer in the design system.
2. Exported members and public props/types.
3. Native element and ref target where relevant.
4. Variants, defaults, and intentional prop exclusions.
5. Controlled/uncontrolled or native behavior.
6. Accessibility expectations and **consumer** responsibilities.
7. Composition, theme tokens, and any performance/interaction considerations.
8. Usage examples grounded in actual exports.
9. Verified Storybook stories and what they demonstrate.
10. Known limitations or deferred tests—without falsely claiming completion.

The 17 completed family guides and story inventory are indexed in [`storybook-coverage.md`](storybook-coverage.md). Storybook uses Autodocs, controls where they are meaningful, global light/dark switching, and the a11y panel. Do not require a separate Dark Theme story per family.

**Stories are consumers of the component library.** Store local demo state and mock data in stories, not production components. Functionality shown by stories (e.g., search, save, reset) must not be mislabeled as a public component feature.

## 8. Verification and release criteria

For new or changed components, verify as applicable:

- Component/API compatibility; TypeScript and native prop correctness.
- Relevant states, variants, and theme consistency.
- Keyboard navigation, focus, labels, descriptions, form/error semantics.
- Responsive rendering, zoom, content wrapping, reduced-motion considerations.
- Storybook rendering, visual clarity, and documented behavior.
- `npm run build`, `npm run build-storybook`, and `npm run lint` in the latest local project.
- Automated interaction tests and manual assistive-technology review when scheduled.

**Current project evidence:** user-reported local checks passed for all 177 stories across 17 families, including builds and accessibility-addon scans. **Automated interaction testing is deliberately deferred**, and final comprehensive accessibility/release QA is pending. Do not claim full WCAG conformance or fully tested delivery yet.

## 9. Change management

1. Inspect actual source and public exports before proposing an API or documentation change.
2. Classify the issue: documentation drift, story-only correction, integration issue, or verified component defect.
3. Favor a documentation/story fix when source behavior is already correct.
4. Modify production components only to resolve a demonstrated issue or explicitly approved requirement.
5. Re-verify impacted stories, builds, lint and accessibility after any source change.
6. Keep deferred technical issues in a separate QA register; do not silently change runtime configuration during a documentation task.

**Known technical QA follow-ups from the original ZIP:** effective TypeScript strictness; divergent theme localStorage keys (`index.html` vs active ThemeProvider and legacy hook); confirm whether the old `src/hooks/useTheme.ts` should be retired. The README is addressed separately in Phase 7.5.1-E, and final Storybook UI polish remains a later step.

---

These conventions describe the verified component architecture and the expectations for extensions. They do **not** authorize bypassing the project's phase-by-phase verification gates.
