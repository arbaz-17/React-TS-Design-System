# React + TypeScript Mini Design System — Architecture

> **Documentation scope:** Architecture of the reusable design-system source, checked against the original uploaded repository. Storybook coverage and phase completion are additionally based on the verified local project results reported during Phases 7.1–7.5.1-C. The latest local Storybook configuration is not included in the original ZIP.

## 1. Purpose and boundaries

This project is the Month 3 Frontend Engineering Internship deliverable: a reusable **React + TypeScript + Tailwind CSS + Storybook** component library. The library—not a dashboard or backend—is the product. The application showcase and Storybook are consumers of its exported components.

The design system aims for composability, predictable typed APIs, semantic design tokens, accessible interactions, responsive layouts, and a developer-friendly documentation experience. Its orange visual identity is implemented through semantic CSS variables, not hardcoded per-component palettes.

**Included:** reusable components, design foundations, light/dark/system theme behavior, Storybook examples and documentation, accessibility-oriented implementation, and a small showcase.

**Intentionally excluded:** authentication, persistence services, CRUD/business modules, application routing, a general-purpose form engine, a full data-grid engine, and unrelated state-management abstractions.

## 2. Current component inventory

The public barrel [`src/components/index.ts`](../src/components/index.ts) exports **55 components across 17 families**, plus their public props types. Component family counts and names are sourced from the original repository; completed Storybook story counts are supported by the user's local verification.

| Layer | Family | Public components |
|---|---|---|
| Primitives (8) | Button | `Button` |
| | Input | `Input` |
| | Textarea | `Textarea` |
| | Select | `Select` |
| | Checkbox | `Checkbox` |
| | Switch | `Switch` |
| | Badge | `Badge` |
| | Skeleton | `Skeleton` |
| Composites (5) | Card | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| | Alert | `Alert`, `AlertTitle`, `AlertDescription` |
| | FormField | `FormField`, `FormLabel`, `FormDescription`, `FormMessage` |
| | EmptyState | `EmptyState`, `EmptyStateVisual`, `EmptyStateTitle`, `EmptyStateDescription`, `EmptyStateActions` |
| | Table | `TableContainer`, `Table`, `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell` |
| Interactive (4) | Dialog | `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose` |
| | Tabs | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| | Accordion | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` |
| | Tooltip | `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent` |

**Totals:** 8 primitive components + 27 composite components + 20 interactive components = **55**.

## 3. Technology choices

| Technology | Responsibility |
|---|---|
| React 19 | UI composition, refs as props, local state, and Context where needed |
| TypeScript | Public props, native prop preservation, finite unions, and typed callbacks |
| Vite | Application development and production build |
| Tailwind CSS v4 + `@tailwindcss/vite` | Utility styling and semantic token mapping |
| CSS custom properties | Theme-specific colors and shared design foundations |
| `class-variance-authority` | Visual variants where justified (Button, Badge, Alert) |
| `clsx` + `tailwind-merge` | Conditional class composition and conflict resolution via `cn()` |
| `radix-ui` | Accessible interaction primitives used by Dialog and Tooltip |
| `lucide-react` | Icons used by examples/consumers; not a required icon system for the library components |
| Storybook (`@storybook/react-vite`) | Isolated component examples, documentation, controls, themes, and accessibility panel (installed in the later local working tree) |
| ESLint | Static quality checks |

**Testing status:** local Storybook, app builds, lint, and story accessibility checks were reported passing. Automated interaction tests and comprehensive manual screen-reader verification are **deferred to final QA**; do not present them as completed.

**TypeScript caveat:** The original [`tsconfig.app.json`](../tsconfig.app.json) and [`tsconfig.node.json`](../tsconfig.node.json) do not explicitly set `strict: true`. Strongly typed public APIs are implemented, but strict compiler mode must be verified from the *effective current configuration* before claiming it is enabled. This remains a separate QA item; this documentation step does not modify compiler settings.

## 4. Source layout and responsibility boundaries

```text
src/
  components/
    primitives/          # 8 primitive component families
    composites/          # 5 structural/composite families
    interactive/         # 4 interaction-focused families
    index.ts             # sole public component barrel
  lib/
    utils.ts             # cn(): clsx + extended tailwind-merge
  styles/
    tokens.css           # semantic variables, light/dark palettes, Tailwind mappings
    global.css           # Tailwind import, base styles, focus, reduced motion
  theme/
    theme-context.ts     # Theme, ThemePreference, Context types
    theme-provider.tsx   # active React ThemeProvider
    use-theme.ts         # active useTheme hook
  main.tsx               # application bootstrapping/providers
  App.tsx                # development showcase/consumer
  hooks/useTheme.ts      # legacy duplicate hook in the original ZIP; not the active app import

docs/
  architecture.md
  component-conventions.md
  storybook-coverage.md  # added in 7.5.1-C
  components/           # 17 public family guides

.storybook/               # exists in the later local project, absent from original ZIP
```

Story files were added alongside component sources (`*.stories.tsx`) during Phases 7.2–7.4. Their names and coverage are indexed in [`docs/storybook-coverage.md`](storybook-coverage.md).

### Dependency direction

```text
Tokens / global CSS / utilities
         ↑
Primitive UI components
         ↑
Composites and interactive components
         ↑
Storybook stories and showcase application
```

This is a **conceptual dependency boundary**, not a requirement that every higher layer import a lower layer. In this repository, compositional families may not import any primitives at all. React state, Radix internals, CSS, and utility dependencies remain local to the relevant implementation.

Rules:

- Components do **not** import from `App.tsx`, Storybook stories, or business-domain modules.
- Public consumers import from `src/components/index.ts` (or an appropriate package barrel after packaging), not private implementation details.
- Primitives do not depend on composites or interactive families.
- Higher-level composites may compose primitives, but many intentionally expose plain HTML section wrappers.
- Interactive families use browser-native behavior, Context, or Radix according to their actual needs.
- Shared utilities must remain domain-neutral and must not depend on components.
- Avoid circular imports and leaking application-specific state into public APIs.

## 5. Design tokens and theme behavior

**Canonical token files:**

- [`src/styles/tokens.css`](../src/styles/tokens.css): light and dark semantic color variables; Tailwind v4 `@theme inline` mappings; radius and shadow tokens.
- [`src/styles/global.css`](../src/styles/global.css): Tailwind entry, base element styles, `data-theme`-based dark custom variant, shared `:focus-visible` outlines, and reduced-motion handling.
- [`src/lib/utils.ts`](../src/lib/utils.ts): `cn()` and custom tailwind-merge radius/shadow knowledge.

Semantic colors cover `background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `success`, `warning`, `border`, `input`, and `ring`, with appropriate foreground counterparts. Shape and elevation tokens include `radius-control`, `radius-surface`, `radius-overlay`, `shadow-surface`, and `shadow-overlay`.

The **active** application theme code is [`src/theme/theme-provider.tsx`](../src/theme/theme-provider.tsx) with [`src/theme/use-theme.ts`](../src/theme/use-theme.ts). It supports preferences `light`, `dark`, or `system`; resolves the actual theme and writes it to `document.documentElement.dataset.theme`. It listens for operating-system preference changes, and persists explicit choices.

**Known issue to resolve in final QA:** The original `index.html` early theme initialization script reads `mini-design-system-theme`, while the active ThemeProvider reads/writes `design-system-theme`. A separate legacy hook at `src/hooks/useTheme.ts` also uses the former key. This mismatch can cause an initial-theme flash or divergent persistence. The canonical choice and any code fix must be made in a dedicated technical QA step—not silently altered during documentation work.

The later Storybook project has global light/dark switching; its final provider/decorator setup must be verified against the latest `.storybook` files, which were not present in the original ZIP.

## 6. Styling and public component APIs

Most components use:

1. Base Tailwind utility classes tied to semantic tokens.
2. Variants only where they represent meaningful visual intent (`Button`, `Badge`, `Alert`).
3. Native states: `disabled`, `required`, `checked`, focus, `aria-invalid`, `hidden`, and browser disclosure state as appropriate.
4. Consumer-provided `className` passed through `cn()` for recognized utility overrides.

`cn()` combines `clsx` with extended `tailwind-merge`. It recognizes custom design-system radius and shadow utilities. It does not guarantee semantic conflict resolution for arbitrary user-defined CSS classes.

Native wrapper APIs primarily use `ComponentPropsWithRef<"element">`. Components preserve their native elements and refs, with documented restrictions when doing so prevents invalid states. React 19's ref-as-prop pattern is used for wrappers; Radix-backed aliases/wrappers retain their Radix types.

Use named exports and colocation; do not add a generic polymorphic API or CVA variants without demonstrated need.

## 7. Interaction models are deliberately different

| Family | State / interaction strategy | Important contract |
|---|---|---|
| Button, Input, Select, Checkbox, Switch | Native control behavior | Consumer owns values/validation; Button's `loading` is consumer-controlled |
| Skeleton | Decorative placeholder | Always hidden from assistive technology; consumer announces loading |
| Alert, FormField, EmptyState, Card, Table | Presentation/composition | Consumer supplies semantics, relationships, actions and data as appropriate |
| Dialog | Radix modal-only Root + Portal/Overlay/Content | Controlled or uncontrolled; focus and dismissal handled by Radix; accessible title required |
| Tabs | Custom React Context, `useId`, selected value | Controlled/uncontrolled; automatic activation on ArrowLeft/ArrowRight/Home/End, not arbitrary programmatic `.focus()` |
| Accordion | Native `<details>` / `<summary>` | `defaultOpen` initializes native state; `type="single"` uses native grouping; no controlled `open` prop |
| Tooltip | Radix Provider/Root/Trigger/Content + Portal | Trigger must have its own accessible name; tooltip content is noninteractive |

Don't replace native Accordion with a custom keyboard engine, or replace custom Tabs with Radix merely for architectural uniformity. Changes require an identified functional/accessibility problem and a separate review.

## 8. Accessibility strategy and verification levels

Component design responsibilities:

- Semantic native elements and meaningful accessible names.
- Visible keyboard focus, pointer and keyboard operability.
- Correct associations between labels, descriptions, errors, tabs/panels, and tables/headers.
- Explicit consumer-managed loading and notification semantics where appropriate.
- Sufficient contrast in both themes, robust text wrapping and zoom behavior.
- Reduced-motion support and suitable forced-colors behavior where implemented.
- No invented ARIA widget roles when native HTML already supplies semantics.

**Reported verified so far:** relevant stories render, light/dark modes, lint/build checks, accessibility addon scans, and story-specific manual keyboard/focus/zoom checks.

**Still required before final quality claim:** automated browser interaction tests, comprehensive manual assistive-technology testing (as available), current-tree-wide integration review, and final documentation verification. Passing an accessibility addon scan is not a full WCAG conformance certification.

## 9. Documentation, Storybook, and application consumers

- **17 component Markdown guides:** `docs/components/*.md`—public APIs, usage, behavior, accessibility and verified story coverage.
- **Coverage index:** [`docs/storybook-coverage.md`](storybook-coverage.md)—all 177 reported stories across 17 families, grouped by layer.
- **Storybook:** isolated examples, Autodocs, controls, theme switching, accessibility panels. Source story files are in the later working tree.
- **Showcase:** `src/App.tsx` consumes the public barrel to demonstrate integration, but does not define library APIs.

The README is updated separately in Phase 7.5.1-E; Storybook interface branding/polish is scheduled for the end of the project before final submission.

## 10. Implementation and quality status

| Workstream | Status |
|---|---|
| Project setup, foundations, utilities, and 55 component implementations | Completed in earlier phases |
| Phase 7.1 — Storybook configuration | Completed (local verification) |
| Phase 7.2 — Primitive stories, 79 | Completed (local verification) |
| Phase 7.3 — Composite stories, 53 | Completed (local verification) |
| Phase 7.4 — Interactive stories, 45 | Completed (local verification) |
| Phase 7.5.1-A–C — Audit, component guide corrections, story synchronization | Completed (local verification) |
| Phase 7.5.1-D — Architecture / conventions | Current documentation step |
| Phase 7.5.1-E–F — README and documentation QA | Remaining |
| Automated interaction testing, comprehensive accessibility QA | Deferred to final QA by project decision |
| Final Storybook verification, visual polish, submission | Remaining |

Documented counts are supported by the project's reported local checks; the original source ZIP predates the later Storybook work. Do not infer that deferred tests or final release validation have already passed.

## 11. Guiding principles

- Prefer native browser capabilities whenever sufficient.
- Use headless primitives when interaction complexity justifies them.
- Choose composition instead of oversized prop contracts.
- Introduce shared Context only for genuinely coordinated state.
- Keep the library independent of consumers and business domains.
- Make source implementation and public export types the final authority.
- Preserve accessibility contracts while allowing controlled customization.
- Document verified behavior; distinguish deferred checks from passed checks.

See [`component-conventions.md`](component-conventions.md) for day-to-day implementation requirements.
