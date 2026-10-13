
# Component Development Conventions

## Purpose

Establish consistent TypeScript, styling, API,
composition, accessibility, and export conventions
for the Mini Design System.

These rules apply to all reusable components.

## 1. Naming and Files

- Components use PascalCase.
- Component files use kebab-case.
- Public props use ComponentNameProps.
- Use named exports for components and public types.
- Colocate variant definitions and component-specific types.
- Keep domain-specific logic outside the UI library.

Examples:
- button.tsx → Button, ButtonProps
- form-field.tsx → FormField, FormFieldProps
- empty-state.tsx → EmptyState, EmptyStateProps

## 2. TypeScript

- Use strict TypeScript.
- Avoid any and unnecessary assertions.
- Prefer inference for implementation details.
- Use explicit types for public component APIs.
- Extend native React element props when appropriate.
- Use literal unions for finite options.
- Use generics only for genuine reusable relationships.
- Use discriminated unions only when they prevent invalid states.
- Prefer type aliases for unions and prop intersections.
- Do not require React.FC for ordinary components.

## 3. Native Props and Refs

- Use ComponentPropsWithRef<"element"> for native wrappers.
- Preserve native events and HTML attributes.
- Forward refs to meaningful DOM elements.
- Use React 19 ref-as-prop when supported by installed versions.
- Do not silently discard aria-*, data-*, or native props.
- Avoid redefining native props unnecessarily.
- Resolve conflicting prop names intentionally.

## 4. Variants

- Use CVA for meaningful visual variants.
- Derive variant types through VariantProps.
- Define sensible default variants.
- Use variant props to describe intent, not CSS values.
- Do not create conflicting boolean appearance props.
- Do not require CVA for components with one stable style.
- Keep variant definitions close to their components.

## 5. Styling

- Use semantic design tokens from tokens.css.
- Respect light and dark theme values.
- Use Tailwind utility classes.
- Use cn() to combine and merge classes.
- Place component base styles before consumer className.
- Treat className as an escape hatch.
- Avoid hardcoded colors and arbitrary values without reason.
- Use shared radius and elevation tokens.
- Preserve visible focus and meaningful interaction states.
- Do not assume arbitrary custom CSS classes can be
  conflict-resolved by tailwind-merge.

## 6. Component State

- Preserve native controlled/uncontrolled behavior.
- Avoid duplicating authoritative state.
- Use React state only when the component needs it.
- Do not switch native inputs between controlled and
  uncontrolled during their lifetime.
- Preserve native event callback signatures.
- Document custom callbacks when introduced.

## 7. Accessibility

- Prefer native semantic HTML.
- Ensure interactive controls have accessible names.
- Maintain keyboard operation.
- Maintain visible focus indicators.
- Use semantic tokens with appropriate contrast.
- Preserve disabled and invalid behavior.
- Associate labels, descriptions, and errors correctly.
- Use ARIA only when necessary.
- Do not rely on color alone to communicate state.
- Respect reduced-motion preferences.
- Test relevant keyboard and screen-reader behavior.

## 8. Composition

- Use children and compound components where appropriate.
- Avoid excessive configuration through props.
- Keep business logic outside components.
- Use shared context only where related components need
  to coordinate state.
- Prefer simple APIs over premature abstractions.
- Avoid polymorphism and asChild unless justified.

## 9. Public API Expectations

Each component should document:

1. Responsibility
2. Public props and types
3. Variants and defaults
4. Controlled/uncontrolled behavior, if applicable
5. Native HTML element and ref target
6. Accessibility requirements
7. Supported interaction states
8. Styling and token usage
9. Edge cases
10. Required Storybook stories

## 10. Component Completion Criteria

A component is complete only when:

- TypeScript passes.
- Production build passes.
- Public API is clear and reusable.
- Relevant variants work.
- Native props and events work.
- Refs work when exposed.
- Accessibility requirements are verified.
- Light and dark themes work.
- Keyboard behavior works.
- Responsive layout remains usable.
- No unnecessary complexity is introduced.

## 11. Architectural Boundaries

Foundations:
Design tokens, typography, themes, global CSS.

Primitives:
Button, Input, Textarea, Checkbox, Badge.

Composites:
Card, Alert, FormField, EmptyState.

Advanced interactive components:
Dialog, Tabs, Tooltip.

Consumers:
Storybook and showcase examples.

Dependencies should flow from higher-level components
toward lower-level foundations, not the reverse.
