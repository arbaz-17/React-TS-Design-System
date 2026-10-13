
# Mini Design System — Architecture

## 1. Project Overview

A reusable React + TypeScript component library built
as the final project for Month 3 of the Frontend
Engineering Internship.

The project combines:

- TypeScript for Frontend Development
- CSS, Tailwind CSS & Material UI concepts
- Accessibility Engineering
- Design Systems & Component Architecture

The library is the primary deliverable.

## 2. Project Scope

### Included

- 12 reusable UI component families
- Strongly typed component APIs
- Tailwind CSS styling
- Semantic design tokens
- Light and dark themes
- Accessible interaction patterns
- Component composition
- Storybook documentation
- Small component showcase

### Excluded

- Backend and database
- Authentication
- Business-specific CRUD features
- Global application state management
- Complex routing
- Unnecessary generic abstractions

## 3. Technology Stack

- React
- TypeScript (strict mode)
- Vite
- Tailwind CSS v4
- CSS custom properties
- Class Variance Authority (CVA)
- clsx
- tailwind-merge
- ESLint

Planned for later phases:

- Radix UI primitives
- Storybook
- Component testing tools where appropriate

## 4. Component Architecture

### Foundations

Located in:
- src/styles/
- src/hooks/use-theme.ts

Responsibilities:
- Semantic design tokens
- Global styling
- Typography defaults
- Light/dark theme behavior
- Theme preference persistence
- Shared visual foundations

### Shared Utilities

Located in:
- src/lib/

Responsibilities:
- Conditional class composition
- Tailwind utility conflict resolution

Component-specific variants remain with components.

### Primitives

Located in:
- src/components/primitives/

Components:
- Button
- Input
- Textarea
- Checkbox
- Badge

Responsibilities:
- Basic reusable UI behavior
- Native HTML semantics
- Typed props and variants
- Accessible interaction states

### Composites

Located in:
- src/components/composites/

Components:
- Card
- Alert
- FormField
- EmptyState

Responsibilities:
- Composition of reusable UI elements
- Structured content presentation
- Shared accessibility relationships

### Advanced Interactive Components

Located in:
- src/components/interactive/

Components:
- Dialog
- Tabs
- Tooltip

Responsibilities:
- Advanced keyboard interactions
- Focus and state management
- Accessible compound component APIs

Mature headless primitives will be used where useful.

### Consumers

- Temporary development preview
- Storybook documentation
- Final showcase

Consumers use the component library.
The component library must not depend on consumers.

## 5. Dependency Boundaries

- Foundations do not depend on components.
- Shared utilities remain domain-independent.
- Primitives must not depend on composites.
- Composites may depend on primitives.
- Interactive components may use Radix primitives.
- Components must not import business logic.
- App.tsx must not define library-wide APIs.

Avoid circular dependencies.

## 6. Design Tokens & Theming

Design tokens are defined in:

src/styles/tokens.css

Global styles are defined in:

src/styles/globals.css

The palette uses orange as its primary identity.

Semantic tokens include:
- background / foreground
- card / card-foreground
- primary / primary-foreground
- secondary / secondary-foreground
- muted / muted-foreground
- accent / accent-foreground
- destructive / destructive-foreground
- success / success-foreground
- warning / warning-foreground
- border / input / ring

Radius and elevation tokens are also shared.

Themes:
- Light
- Dark
- System

Theme state is managed using useTheme().
The resolved theme is applied through data-theme
on the document root.

An initialization script prevents incorrect-theme
flashes before React renders.

Explicit theme preferences are persisted.

## 7. Styling Architecture

Styling pipeline:

CVA variants
→ cn() class composition
→ Tailwind CSS utilities
→ semantic CSS variables

Component styling consists of:

1. Base styles
2. Typed variants, where appropriate
3. Interaction states
4. Consumer className overrides

Use semantic tokens instead of hardcoded colors.

Custom radius and shadow tokens are registered
with tailwind-merge.

Consumer overrides must not silently undermine
the component's accessibility contract.

## 8. TypeScript & API Principles

Follow docs/component-conventions.md.

Key rules:

- Strict TypeScript
- Typed native HTML props
- Appropriate ref forwarding
- CVA VariantProps where useful
- Named component exports
- Colocated component-specific types
- Intent-based APIs
- Native controlled/uncontrolled behavior
- Composition over excessive configuration
- No unnecessary any or type assertions

## 9. Accessibility Strategy

Accessibility is part of component implementation.

Core expectations:

- Semantic HTML
- Accessible names
- Keyboard interaction
- Visible focus indicators
- Proper label and error associations
- Sufficient contrast
- Native disabled behavior
- Reduced-motion consideration
- Responsive reflow

Advanced widgets use accessible headless
primitives where appropriate.

Automated audits supplement manual testing.

## 10. Component Quality Requirements

Every component must be evaluated for:

- API clarity
- Correct TypeScript types
- Native HTML compatibility
- Appropriate variants and states
- Keyboard behavior
- Accessibility
- Light/dark theme consistency
- Responsive robustness
- Reusability
- Avoidable complexity

A component is not complete merely because it renders.

## 11. Implementation Plan

Completed:
- Phase 0: Requirements & Architecture
- Phase 1: Project Setup
- Phase 2: Design Foundations

Phase 3:
- Shared Utilities & Component Conventions
- Final validation pending

Next:
- Phase 4: Core Primitives
- Phase 5: Shared Composites

Second project half:
- Phase 6: Advanced Interactive Components
- Phase 7: Storybook
- Phase 8: Showcase
- Phase 9: Quality Review & Delivery

## 12. Architectural Principles

- Quality over component quantity
- Prefer native browser capabilities
- Prefer composition over giant prop APIs
- Keep styling decisions centralized
- Keep component APIs predictable
- Avoid premature abstractions
- Keep the system independent of business domains
- Introduce dependencies only when justified
