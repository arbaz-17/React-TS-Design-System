
# Storybook Configuration

Storybook provides an interactive environment for developing, previewing, testing, and documenting reusable UI components. The configuration includes custom branding, light and dark themes, accessibility testing, responsive previews, and a consistent documentation layout.

## Storybook Features

| Feature | Description |
| :--- | :--- |
| Component Documentation | Automatically generates documentation using Storybook Docs and component stories. |
| Interactive Controls | Allows developers to explore component props and supported configurations. |
| Accessibility Testing | Integrates `@storybook/addon-a11y` for automated accessibility checks. |
| Theme Switching | Uses `@storybook/addon-themes` to preview components in light and dark modes. |
| Responsive Preview | Provides standard device viewports and a custom 1440px desktop viewport. |
| Custom Manager Theme | Applies a dark interface with orange branding and customized navigation styling. |
| Custom Docs Theme | Provides a light documentation interface with consistent typography and colors. |
| Shared Providers | Wraps stories in TooltipProvider to support Radix-based Tooltip components. |
| Story Organization | Groups components into Primitives, Composites, and Interactive categories. |

## Documentation Layout

The custom `DocsPage` provides a consistent structure for component documentation.

| Section | Purpose |
| :--- | :--- |
| Introduction | Displays the component title, subtitle, and description. |
| Preview | Displays the primary interactive component example. |
| Props and Controls | Documents available component properties and interactive controls. |
| Stories | Displays additional examples demonstrating component behavior and variations. |

## Theme Configuration

Two separate theme systems are configured:

- **Component Themes:** Light and dark themes controlled through the `data-theme` attribute on the HTML element.
- **Storybook Interface Themes:** A custom dark manager theme and a separate light documentation theme.

Component themes use the semantic design tokens defined in `src/styles/tokens.css`.

## Addons

| Addon | Purpose |
| :--- | :--- |
| `@storybook/addon-docs` | Generates component documentation and interactive API references. |
| `@storybook/addon-a11y` | Provides automated accessibility analysis and feedback. |
| `@storybook/addon-themes` | Enables switching between light and dark component themes. |

## Component Organization

Storybook organizes component stories into three main categories:

1. **Primitives:** Foundational components such as Button, Input, Checkbox, and Badge.
2. **Composites:** Structured components such as Card, Alert, FormField, EmptyState, and Table.
3. **Interactive:** Advanced components such as Dialog, Tabs, Accordion, and Tooltip.

The configuration automatically discovers `.stories.ts`, `.stories.tsx`, and `.mdx` files within the `src` directory.

## Purpose

This configuration ensures that every component can be developed, reviewed, tested, and documented in a consistent environment while supporting the design system's accessibility, responsiveness, and visual design standards.
