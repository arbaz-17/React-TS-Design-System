
# Components

This directory contains the reusable React and TypeScript components of the design system, organized into three categories based on their responsibilities and complexity.

All components use Tailwind CSS, semantic design tokens, and strongly typed APIs to support consistency, accessibility, and reusability.

## Component Categories

| Folder | Description | Components |
| :--- | :--- | :--- |
| **Primitives** | Foundational UI elements designed for simple, reusable interactions and presentation. | Button, Input, Textarea, Select, Checkbox, Switch, Badge, Skeleton |
| **Composites** | Components that combine multiple elements into structured, reusable UI patterns. | Card, Alert, FormField, EmptyState, Table |
| **Interactive** | Components with more advanced interaction, state management, keyboard navigation, or overlay behavior. | Accordion, Dialog, Tabs, Tooltip |

## Architecture

- **Native-first:** Prefer semantic HTML and built-in browser behavior where appropriate.
- **Type-safe:** Components expose TypeScript props based on native HTML or underlying library APIs.
- **Composable:** Complex interfaces are built by combining smaller, independently reusable components.
- **Accessible:** Keyboard navigation, focus visibility, ARIA relationships, and semantic markup are considered throughout.
- **Customizable:** Semantic Tailwind CSS tokens and `className` overrides support consistent styling.
- **Documented:** Each component includes its own README and Storybook stories demonstrating supported APIs and usage patterns.
