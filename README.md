
# Design System Storybook — Month 3 Project

A **React + TypeScript Design System** built with **Tailwind CSS v4 and Storybook** as the project for Month 3 of the Frontend Internship at **OptimusFox**.

## Overview

This project focuses on building a small, professional component library with reusable UI elements, consistent visual styling, accessible interactions, and well-defined TypeScript APIs.

Rather than developing a complete application, the goal was to establish the foundations of a design system that can be reused across different frontend projects.

Storybook serves as the primary environment for exploring, testing, and documenting components independently.

## What Was Created

Developed **17 component families**, organized into three categories.

| Category | Components | Description |
| :--- | :--- | :--- |
| **Primitives** | Button, Input, Textarea, Select, Checkbox, Switch, Badge, Skeleton | Foundational UI components for common interactions and presentation. |
| **Composites** | Card, Alert, FormField, EmptyState, Table | Reusable structures for organizing content, displaying information, and building forms. |
| **Interactive** | Dialog, Tabs, Accordion, Tooltip | Advanced components supporting state management, keyboard interactions, overlays, and accessible navigation. |

Each component includes TypeScript definitions, reusable styling, Storybook examples, and individual documentation.

## Key Features

- **Reusable Component Architecture:** Modular components with typed props and flexible composition patterns.
- **Design Tokens:** Centralized semantic colors, border radii, and shadows for consistent styling.
- **Light & Dark Themes:** Theme switching through CSS variables and the `data-theme` attribute.
- **Accessibility:** Semantic HTML, keyboard navigation, focus indicators, ARIA relationships, and accessible component states.
- **Storybook Documentation:** Interactive stories, configurable controls, automatic API documentation, and practical usage examples.
- **Responsive Design:** Flexible layouts and components that adapt to different screen sizes.
- **Custom Storybook UI:** Branded manager theme, documentation layout, responsive viewports, and accessibility tooling.
- **Native-First Approach:** Uses browser-native behavior where practical and Radix UI for more complex accessible interactions.

## Technologies Used

| Technology | Purpose |
| :--- | :--- |
| React | Component development and composition |
| TypeScript | Type-safe component APIs |
| Vite | Development and build tooling |
| Tailwind CSS v4 | Utility-first styling and design tokens |
| Storybook | Component development, previews, and documentation |
| Radix UI | Accessible Dialog and Tooltip primitives |
| Class Variance Authority | Type-safe component variants |
| clsx + tailwind-merge | Conditional classes and Tailwind class conflict resolution |
| Lucide React | Icons in component examples |
| Storybook Accessibility Addon | Automated accessibility checks |

## Concepts Used

The project applies concepts covered throughout Month 3 of the internship.

| Concept | Application |
| :--- | :--- |
| **TypeScript** | Strongly typed props, union types, generics from React utility types, and ref compatibility. |
| **Component Architecture** | Reusable primitives, compound components, composition, and separation of responsibilities. |
| **Tailwind CSS** | Semantic design tokens, responsive utilities, reusable styling, and theme support. |
| **State Management** | Controlled and uncontrolled components, React state, and Context API. |
| **Accessibility Engineering** | Semantic HTML, ARIA attributes, keyboard navigation, focus management, and accessible feedback. |
| **Design Systems** | Consistent visual foundations, component APIs, styling conventions, and documentation. |
| **Storybook** | Interactive stories, controls, documentation, theme previews, and accessibility testing. |
| **Testing & Verification** | Component behavior checks, accessibility reviews, and production build verification. |

## Project Structure

```text
.storybook/           # Storybook configuration 
src/
├── components/
│   ├── primitives/   # Foundational UI components
│   ├── composites/   # Structured component families
│   └── interactive/  # Advanced interactive components
├── lib/
│   └── utils.ts      # Shared class name utility
└── styles/
    ├── global.css    # Global styles and accessibility defaults
    └── tokens.css    # Design tokens and theme definitions
```

## Live Demo

**Demo:** [View Live Demo](https://arbaz-17.github.io/React-TS-Design-System/storybook/)

