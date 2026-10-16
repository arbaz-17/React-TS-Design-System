
# Styles

This directory contains the global styles and design tokens used throughout the design system.

It provides consistent colors, typography, spacing conventions, focus indicators, and theme support using Tailwind CSS v4.

## Global Styles (`global.css`)

| Feature | Description |
| :--- | :--- |
| Tailwind CSS | Imports Tailwind CSS and the design system tokens. |
| Base Styles | Establishes default typography, backgrounds, text colors, and page dimensions. |
| Dark Mode | Configures dark-mode styling using the `data-theme="dark"` attribute. |
| Focus Indicators | Provides visible keyboard focus outlines using the semantic `ring` token. |
| Link Styling | Styles unclassed links using the primary color and underlines. |
| Text Selection | Applies semantic accent colors to selected text. |
| Reduced Motion | Reduces animations, transitions, and smooth scrolling when requested by the user's system preferences. |

## Design Tokens (`tokens.css`)

| Token Category | Examples | Purpose |
| :--- | :--- | :--- |
| Brand | `--brand-orange`, `--brand-orange-deep` | Defines the primary brand identity colors. |
| Surfaces | `--background`, `--card` | Defines page and elevated surface colors. |
| Text | `--foreground`, `--muted-foreground` | Defines primary and supporting text colors. |
| Actions | `--primary`, `--secondary` | Defines primary and secondary UI colors. |
| Feedback | `--success`, `--warning`, `--destructive` | Defines semantic status colors. |
| Borders & Focus | `--border`, `--input`, `--ring` | Defines borders, input outlines, and keyboard focus colors. |
| Border Radius | `--radius-control`, `--radius-surface`, `--radius-overlay` | Provides consistent corner rounding across components. |
| Shadows | `--shadow-surface`, `--shadow-overlay` | Provides consistent elevation for surfaces and overlays. |


## Design Principles

- **Semantic Tokens:** Components use purpose-based colors rather than hardcoded color values.
- **Theme Consistency:** The same utility classes adapt to light and dark themes.
- **Reusable Foundations:** Shared radius and shadow tokens keep component styling consistent.
- **Accessibility:** Global focus indicators and reduced-motion support improve usability.
- **Maintainability:** Centralized tokens make visual changes easier without modifying individual components.
