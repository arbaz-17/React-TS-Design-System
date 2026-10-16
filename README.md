# React + TypeScript Mini Design System

A reusable **React 19 + TypeScript** component library built with **Tailwind CSS v4** and documented in **Storybook**. This project is the Month 3 deliverable for the Frontend Development Internship at **OptimusFox**.

The design system is the main product: a set of typed, composable UI building blocks with shared visual tokens, light/dark themes, and accessibility-focused interaction patterns. The included Vite application is a component showcase—not a dashboard product or backend service.

## At a glance

| | |
|---|---|
| **55 public components** | 17 component families across three layers |
| **177 Storybook stories** | Component examples, states, interactions, and composition patterns |
| **17 component guides** | API and usage documentation in [`docs/components/`](docs/components/) |
| **Themes** | Semantic orange-accented light/dark palette; application supports system preference |
| **Implementation** | Native HTML where practical, React Context where needed, Radix for overlays |

## Technology stack

- **React 19** — component composition, state, Context, and refs.
- **TypeScript** — public component props, native element typings, and typed variants.
- **Vite** — local development and application builds.
- **Tailwind CSS v4** — utility-based styling and semantic theme tokens.
- **Storybook (React + Vite)** — isolated examples, Autodocs, controls, themes, and accessibility checks.
- **Radix UI** — accessible Dialog and Tooltip primitives.
- **class-variance-authority (CVA)** — typed visual variants for Button, Badge, and Alert.
- **clsx + tailwind-merge** — conditional class composition via `cn()`.
- **Lucide React** — icons used in examples and the showcase.

## Getting started

**Prerequisites:** Node.js and npm versions compatible with the dependencies in `package.json`; a recent supported Node.js LTS release is recommended.

```bash
# Install the project's locked dependencies
npm ci

# Run the Vite component showcase
npm run dev

# Run the component documentation explorer
npm run storybook
```

Open the local URLs printed in your terminal. The Vite app demonstrates composed UI patterns, while Storybook is the primary place to browse and inspect individual components.

### Available commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run storybook` | Start the Storybook development server |
| `npm run build` | Run the TypeScript build check and build the Vite app |
| `npm run build-storybook` | Produce a static Storybook build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the built Vite application |

> Automated Storybook/Vitest interaction tests are **not yet part of the completed verification gate**. Testing is deferred to final project QA; do not treat story rendering checks as a passing automated interaction-test suite.

## Component library

All public components and their public props types are exported from [`src/components/index.ts`](src/components/index.ts).

| Layer | Component families | Public components | Stories |
|---|---|---:|---:|
| **Primitives** | Button, Input, Textarea, Select, Checkbox, Switch, Badge, Skeleton | 8 | 79 |
| **Composites** | Card, Alert, FormField, EmptyState, Table | 27 | 53 |
| **Interactive** | Dialog, Tabs, Accordion, Tooltip | 20 | 45 |
| **Total** | **17 families** | **55** | **177** |

Composite and interactive families expose multiple public parts. For example, Card has six components, Table has nine, and Dialog has eight.

See the [Storybook coverage index](docs/storybook-coverage.md) for each family, its story file, and the corresponding documentation guide.

## Using the components

Components currently live in this repository and are consumed through its source barrel. **This project is not published as an npm package**; the examples below show imports from an application file inside `src/`.

### Button and Card composition

```tsx
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components";

export function ProjectSummary() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Design System</CardTitle>
        <CardDescription>Reusable frontend components</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="success">Active</Badge>
      </CardContent>
      <CardFooter>
        <Button onClick={() => console.log("Project viewed")}>
          View project
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Accessible field composition

```tsx
import { FormField, FormLabel, Input } from "./components";

export function EmailField() {
  return (
    <FormField>
      <FormLabel htmlFor="contact-email" requiredIndicator>
        Email address
      </FormLabel>
      <Input
        id="contact-email"
        name="email"
        type="email"
        autoComplete="email"
        required
      />
    </FormField>
  );
}
```

The label's asterisk is visual; the input's `required` attribute establishes the real native requirement. A consuming form owns validation and submission behavior.

### Modal composition

```tsx
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components";

export function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open help</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About this project</DialogTitle>
          <DialogDescription>
            Explore components and their accessibility contracts in Storybook.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

`asChild` allows the existing Button to be used as the actual trigger/close control without nesting buttons.

## Design foundations and theming

The theme uses **semantic CSS variables**, not per-component hardcoded colors:

- [`src/styles/tokens.css`](src/styles/tokens.css) defines light/dark colors, radius/shadow tokens, and Tailwind v4 mappings.
- [`src/styles/global.css`](src/styles/global.css) imports Tailwind, establishes base styling, keyboard focus indicators, and reduced-motion support.
- [`src/theme/theme-provider.tsx`](src/theme/theme-provider.tsx) and [`src/theme/use-theme.ts`](src/theme/use-theme.ts) manage the application's `light`, `dark`, and `system` theme preferences.
- [`src/lib/utils.ts`](src/lib/utils.ts) provides `cn()` for composing class names and resolving recognized Tailwind conflicts.

The resolved app theme is applied to the document's `<html data-theme="...">` attribute. Storybook has its own global **light/dark toolbar** to verify component appearances in isolation. The design system's primary visual identity is orange, expressed via tokens such as `--primary`.

> **Final-QA follow-up:** The original repository's early theme initialization script and active React ThemeProvider use different localStorage keys. Their integration must be resolved and reverified separately; this README does not claim that issue is fixed.

## Architecture

```text
.storybook/                  Storybook setup and shared preview configuration
src/
  components/
    primitives/              8 primitive families and stories
    composites/              5 composite families and stories
    interactive/             4 interactive families and stories
    index.ts                 Public component and props-type exports
  lib/utils.ts               cn() helper
  styles/
    tokens.css               Semantic tokens and light/dark palettes
    global.css               Global Tailwind, focus, and motion styles
  theme/                     Theme context, provider, and hook
  App.tsx                    Component showcase
  main.tsx                   Application providers and entry point
docs/
  architecture.md            Architecture and dependency boundaries
  component-conventions.md   API and accessibility conventions
  storybook-coverage.md      All 17 families and 177 stories
  components/                17 component guides
```

The implementation deliberately uses different strategies according to the component's behavior:

- **Structural composition** for Card, Alert, FormField, EmptyState, and Table.
- **Browser-native semantics** for form controls, tables, and Accordion's `details`/`summary` disclosures.
- **React Context and coordinated state** for Tabs.
- **Radix** for Dialog and Tooltip's more involved overlay and focus behavior.

Component source stays independent from the showcase, Storybook stories, data fetching, and business-domain state.

## Storybook and documentation

Storybook is the primary component reference. Browse the sidebar sections **Primitives**, **Composites**, and **Interactive** to see:

- Live component examples and composition patterns.
- Meaningful controls for supported props.
- Autodocs, descriptions, and source examples.
- Light/dark theme previews.
- Accessibility-addon reports and manually verifiable keyboard interactions.

Related documentation:

- [Architecture](docs/architecture.md)
- [Component conventions](docs/component-conventions.md)
- [Storybook coverage index](docs/storybook-coverage.md)
- [Component guides](docs/components/)

## Accessibility and verification status

Accessibility is a design objective throughout the library: semantic elements, meaningful accessible names, focus-visible states, keyboard operation, label/error associations, reduced-motion handling, and appropriate native or Radix behavior.

**Completed and locally verified during component-story development:**

- All **177 stories** across **17 families** were reported to render and pass their story-specific verification checklists.
- Relevant keyboard interactions, responsive behaviors, theme modes, and accessibility-addon findings were manually reviewed during those phases.
- `npm run build`, `npm run build-storybook`, and `npm run lint` were reported passing.

**Still scheduled for final QA:**

- Automated interaction testing and final integration checks.
- Comprehensive manual assistive-technology review and broader accessibility checks.
- Verification of effective TypeScript compiler strictness.
- Theme-persistence initialization consistency.
- Final Storybook presentation polish and submission review.

Passing the Storybook accessibility addon does **not** establish full WCAG conformance. No published package or production deployment is claimed here.

## Project context

This library brings together the four areas covered in **Month 3 of the OptimusFox Frontend Development Internship**:

1. TypeScript for Frontend Development.
2. CSS, Tailwind CSS, and Material UI (the library itself uses Tailwind; Material UI is not a runtime dependency).
3. Accessibility Engineering.
4. Design Systems and Component Architecture.

**Deliverable:** A TypeScript + Tailwind CSS + Storybook design system with reusable components, documented architecture, and accessibility-focused examples.
