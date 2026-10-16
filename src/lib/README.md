
# Utilities

This directory contains shared utility functions used throughout the design system.

## `cn()` — Class Name Utility

The `cn()` function combines conditional CSS classes and resolves conflicting Tailwind CSS utilities.

It uses two libraries:

| Library | Responsibility |
| :--- | :--- |
| `clsx` | Combines class names and supports conditional values, arrays, and objects. |
| `tailwind-merge` | Resolves conflicting Tailwind utility classes, keeping the appropriate override. |

## Custom Tailwind Configuration

The utility extends `tailwind-merge` to recognize the design system's custom semantic tokens.

| Token Type | Supported Values |
| :--- | :--- |
| Border Radius | `rounded-control`, `rounded-surface`, `rounded-overlay` |
| Shadow | `shadow-surface`, `shadow-overlay` |

This ensures custom radius and shadow utilities are correctly handled when merging conflicting classes.

## Purpose

The `cn()` utility is used across components to maintain consistent styling, support conditional classes, and allow consumers to override default Tailwind utilities through `className`.
