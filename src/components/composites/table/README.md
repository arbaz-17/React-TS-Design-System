
# Table

## Overview

Table is a reusable, accessible data-presentation component family built on native HTML table elements, designed to display structured information in rows and columns throughout the design system. It follows a compound composition pattern with nine components: `TableContainer`, `Table`, `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, and `TableCell`, allowing developers to create flexible tables with headings, captions, data cells, totals, and optional actions.

## Architecture & Design Decisions

- **Pattern Used:** Compound Composition / Sub-components. Uses nine independently exported components corresponding to native HTML table structures, along with an optional scroll container. Each component handles a specific structural responsibility without requiring CVA variants, React Context, or complex configuration.
- **TypeScript Design:** Uses `ComponentPropsWithRef` with the corresponding native HTML element for each component, including `table`, `caption`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`, and `div`. Supports native HTML attributes, event handlers, accessibility properties, and refs without introducing additional custom props.
- **Styling & Tokens:** Uses Tailwind CSS with semantic tokens including `foreground`, `muted`, `muted-foreground`, `card`, and `border`. TableContainer applies `rounded-surface`, borders, and horizontal scrolling, while individual components manage typography, spacing, row separators, and background colors. The `cn()` utility merges default styles with consumer-provided classes.
- **Content Composition:** Table defines the native table structure, TableCaption provides its description, TableHeader and TableBody organize rows, TableFooter displays supplementary rows or totals, and TableHead and TableCell represent header and data cells. TableContainer optionally provides a responsive scrolling surface.
- **State Management:** Does not manage data, sorting, filtering, pagination, selection, or asynchronous operations. Consumers are responsible for preparing data, calculating totals, handling row actions, and determining empty or loading states.
- **Accessibility Semantics:** Preserves native table semantics and relationships between rows, columns, and headers. TableHead defaults to `scope="col"` but supports `scope="row"` for row headers, while consumers can configure accessible captions and scrolling-region behavior.

## Props / Component API

### Table

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | Native table sections, captions, rows, and cells. |
| `className` | `string` | — | No | Additional CSS classes for table dimensions, typography, and layout. |
| `aria-label` | `string` | — | No | Provides an accessible name when appropriate to the table's context. |
| `aria-describedby` | `string` | — | No | Associates supplementary instructions or descriptions with the table. |
| `ref` | `React.Ref<HTMLTableElement>` | — | No | Reference to the native table element. |

Extends native `ComponentPropsWithRef<"table">`, supporting standard HTML table attributes and ARIA properties.

### Table Sub-components

| Component | HTML Element | Description |
| :--- | :--- | :--- |
| `TableContainer` | `<div>` | Optional bordered wrapper providing horizontal scrolling for wide tables. |
| `TableCaption` | `<caption>` | Provides a native caption describing the table's purpose or content. |
| `TableHeader` | `<thead>` | Groups column-header rows with a semantic muted background. |
| `TableBody` | `<tbody>` | Groups the primary data rows inside the table. |
| `TableFooter` | `<tfoot>` | Groups supplementary rows, summaries, or calculated totals. |
| `TableRow` | `<tr>` | Defines an individual row with consistent border styling. |
| `TableHead` | `<th>` | Defines a header cell, defaulting to column-header semantics. |
| `TableCell` | `<td>` | Defines a standard data cell with consistent spacing and alignment. |

Each sub-component supports the following native properties:

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | — | No | Content rendered inside the selected table element. |
| `className` | `string` | — | No | Additional CSS classes for layout, typography, spacing, and presentation. |
| `ref` | `React.Ref<HTMLElement>` | — | No | Reference to the underlying HTML element, typed specifically for each component. |


## Storybook Stories

### 1. Default
Provides an interactive playground using Storybook controls to customize the Table's root styling. Demonstrates a basic project table with a native caption, column headers, row headers using `scope="row"`, and right-aligned numeric data.

### 2. StatusBadges
Demonstrates composing the existing Badge component inside native table cells to display project statuses. Shows how semantic colors and visible labels communicate status information without introducing status-specific properties into the Table API.

### 3. RowActions
Demonstrates functional row-level View buttons with accessible names identifying their corresponding projects. Clicking a button updates a local status region, illustrating how interactive actions can be placed within table cells without making entire rows interactive.

### 4. FooterTotals
Demonstrates a table containing task counts, completed tasks, project budgets, and a summary row inside TableFooter. Shows native `<tfoot>` semantics, consumer-calculated totals, consistent numeric alignment, and tabular numerals for easier comparison.

### 5. EmptyData
Demonstrates an empty table using a TableCell spanning all three columns and containing the existing EmptyState component. An interactive toggle switches between empty and populated data, while an accessible status message communicates the current state without moving keyboard focus.

### 6. HorizontalOverflow
Demonstrates a wide table placed inside a narrow TableContainer with horizontal scrolling enabled. Shows how the consumer can provide `role="region"`, an accessible name, scrolling instructions, `tabIndex={0}`, and a visible focus indicator to support keyboard access to overflowed content.

### 7. InsideCard
Demonstrates Table composition within the existing Card component family, including a card heading, supporting description, project count, and status badges. Shows how native table semantics, captions, and scrollable layout remain intact without requiring integration-specific properties.

## Accessibility Notes

- **Semantic HTML:** Uses native `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, and `<td>` elements. These preserve built-in table semantics and allow assistive technologies to interpret rows, columns, headers, and data relationships.

- **Keyboard Navigation:** Table elements are primarily noninteractive and do not implement custom keyboard navigation. Buttons and other interactive controls inside cells retain their native keyboard behavior. Scrollable containers can be made focusable when necessary for keyboard access to horizontally overflowed content.

- **ARIA & Screen Readers:** Supports native HTML and ARIA attributes through inherited component props. Captions identify table content, header cells establish data relationships, and consumers can provide accessible names or descriptions for scrollable regions when appropriate.

- **Header Associations:** TableHead defaults to `scope="col"` for column headings and supports `scope="row"` for row headings. Explicit scope relationships help screen readers identify the corresponding headers when navigating table cells.

- **Table Captions:** TableCaption uses the native `<caption>` element to describe the table's purpose. Captions can remain visible or be visually hidden using `sr-only` while preserving their availability to assistive technologies.

- **Focus Management:** Does not automatically move focus or make the entire table interactive. Consumers can add appropriate keyboard focus handling to scrolling containers, while interactive elements inside cells manage their own focus behavior.

- **Horizontal Scrolling:** TableContainer uses `overflow-x-auto` to accommodate tables wider than their available viewport. Consumers can expose intentionally scrollable regions with an accessible name, keyboard focus stop, descriptive instructions, and visible focus styling.

- **Status Communication:** Supports composition with text-labeled Badge components and other semantic content. Status information can be communicated through visible labels alongside semantic colors, preventing reliance on color alone.

- **Empty-State Accessibility:** Allows consumers to render an EmptyState inside a cell spanning the table's columns through `colSpan`. Consumers manage empty-data detection and accessible announcements while preserving valid native table structure.
