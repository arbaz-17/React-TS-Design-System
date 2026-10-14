# Table Component

**Category:** Shared Composite  
**Implementation:** `src/components/composites/table.tsx`  
**Status:** Implemented and verified

## 1. Overview

Table is a reusable, accessible, presentational component family for displaying structured data in rows and columns.

It uses native HTML table elements, semantic Tailwind CSS styling, React 19-compatible refs and composable subcomponents.

The Table family provides presentation and semantic structure only. It does not manage records, column definitions, sorting, filtering, pagination, selection or data fetching.

A future DataTable abstraction may use these components as its presentation layer.

## 2. Component Architecture

Table provides nine components.

| Component | Native element | Responsibility |
|---|---|---|
| `TableContainer` | `div` | Optional bordered wrapper and horizontal overflow |
| `Table` | `table` | Semantic table root |
| `TableCaption` | `caption` | Description or title identifying the table |
| `TableHeader` | `thead` | Header row group |
| `TableBody` | `tbody` | Data row group |
| `TableFooter` | `tfoot` | Optional summary or totals |
| `TableRow` | `tr` | Native row |
| `TableHead` | `th` | Header cell with appropriate scope |
| `TableCell` | `td` | Data cell |

TableContainer, TableCaption and TableFooter are optional.

Consumers remain responsible for valid nesting of the native table elements.

## 3. Public API

Each component inherits its native React props using `ComponentPropsWithRef`.

### Public Components

- `TableContainer`
- `Table`
- `TableCaption`
- `TableHeader`
- `TableBody`
- `TableFooter`
- `TableRow`
- `TableHead`
- `TableCell`

### Public Types

- `TableContainerProps`
- `TableProps`
- `TableCaptionProps`
- `TableHeaderProps`
- `TableBodyProps`
- `TableFooterProps`
- `TableRowProps`
- `TableHeadProps`
- `TableCellProps`

### Native Props

All components support appropriate native attributes, including:

- `children`
- `className`
- `id`
- `title`
- `aria-*`
- `data-*`
- `ref`

Table-specific native props remain available where supported.

| Attribute | Relevant components | Purpose |
|---|---|---|
| `scope` | TableHead | Defines the header's column or row association |
| `colSpan` | TableHead, TableCell | Spans multiple columns |
| `rowSpan` | TableHead, TableCell | Spans multiple rows |
| `headers` | TableCell, TableHead | Explicit associations with header IDs |
| `aria-sort` | TableHead | May be supplied by a future sorting implementation |

TableHead defaults to `scope="col"` and allows consumers to override the value, including `scope="row"`.

No custom sorting, data or selection props are introduced.

## 4. TypeScript and Refs

| Component | Native prop type | Ref target |
|---|---|---|
| TableContainer | `ComponentPropsWithRef<"div">` | `HTMLDivElement` |
| Table | `ComponentPropsWithRef<"table">` | `HTMLTableElement` |
| TableCaption | `ComponentPropsWithRef<"caption">` | `HTMLTableCaptionElement` |
| TableHeader | `ComponentPropsWithRef<"thead">` | `HTMLTableSectionElement` |
| TableBody | `ComponentPropsWithRef<"tbody">` | `HTMLTableSectionElement` |
| TableFooter | `ComponentPropsWithRef<"tfoot">` | `HTMLTableSectionElement` |
| TableRow | `ComponentPropsWithRef<"tr">` | `HTMLTableRowElement` |
| TableHead | `ComponentPropsWithRef<"th">` | `HTMLTableCellElement` |
| TableCell | `ComponentPropsWithRef<"td">` | `HTMLTableCellElement` |

The components use React 19's ref-as-prop convention.

No data generics, Context, CVA variants, internal effects or state are required.

The public components accept JSX children. Record types and data transformations remain consumer responsibilities.

## 5. Styling Architecture

The Table family uses the existing semantic design tokens and shared `cn()` utility.

### TableContainer

- `relative`
- `w-full min-w-0`
- `overflow-x-auto`
- `rounded-surface`
- `border border-border`

It provides optional responsive horizontal scrolling and a bordered surface.

### Table

- `w-full`
- `caption-top`
- `text-sm`
- `text-foreground`

It remains a native table element with no automatic sorting, fixed column sizes or minimum width.

### TableCaption

- `px-4 py-3`
- `text-left`
- `text-sm`
- `text-muted-foreground`

### TableHeader

- `bg-muted/40`

### TableBody

- `bg-card`

### TableFooter

- `border-t border-border`
- `bg-muted/30`
- `font-medium`

### TableRow

- `border-b border-border`
- `last:border-b-0`

Rows do not automatically receive hover, selected or clickable styling.

### TableHead

- `px-4 py-3`
- `text-left`
- `align-middle`
- `font-medium`
- `text-foreground`

### TableCell

- `px-4 py-3`
- `align-middle`
- `text-foreground`

Consumers may extend or override styling through `className`.

All colors adapt to light and dark themes using semantic tokens.

## 6. Basic Usage

```tsx
<TableContainer>
  <Table>
    <TableCaption>
      Current project records
    </TableCaption>

    <TableHeader>
      <TableRow>
        <TableHead scope="col">Project</TableHead>
        <TableHead scope="col">Status</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow>
        <TableHead scope="row">
          Design System
        </TableHead>
        <TableCell>Active</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>
```

TableContainer is optional. Table can also be rendered directly inside a suitable parent container.

## 7. Rendering Typed Data

Consumers own the record type and mapping logic.

```tsx
type Project = {
  id: number;
  name: string;
  tasks: number;
};

function ProjectRows({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <TableBody>
      {projects.map((project) => (
        <TableRow key={project.id}>
          <TableHead scope="row">
            {project.name}
          </TableHead>

          <TableCell className="text-right tabular-nums">
            {project.tasks}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
```

Table does not require a data prop, column schema or generic type argument.

This separation allows the same structural components to work with static JSX, locally typed arrays or a higher-level data-table engine.

## 8. Accessibility Architecture

Table uses native HTML semantics rather than recreating table behavior with generic div elements and ARIA roles.

### Captions

Use TableCaption when the table needs an explicit name or description.

A caption helps users identify the table's purpose.

Captions can remain visible or use an appropriate visually hidden styling strategy where justified.

### Column Headers

Use `<th scope="col">` to identify column headings.

TableHead supplies `scope="col"` by default.

### Row Headers

Use `<th scope="row">` to identify the heading for a row.

Consumers override TableHead's default scope when rendering row headings.

### Complex Tables

For tables with multiple heading levels, grouped columns or spanning cells, consumers may need additional native header relationships.

Use `id`, `headers`, `scope`, `colSpan` and `rowSpan` correctly.

The Table components preserve these attributes but do not calculate associations automatically.

### Keyboard Behavior

The native table does not implement custom arrow-key cell navigation.

Only interactive elements, such as buttons or links inside cells, participate in normal keyboard navigation.

Rows are not automatically focusable or clickable.

Do not assign `role="grid"` unless building a genuinely interactive grid with the corresponding keyboard behavior.

### Accessible Actions

Actions inside cells must use accessible interactive components with meaningful names.

Repeated buttons labeled "View" should identify their associated record, such as through an appropriate accessible name.

### Responsive Overflow

A wide Table may be placed in TableContainer with a consumer-supplied minimum table width.

Consumers should verify that horizontal scrolling is accessible by keyboard and assistive technology.

Where a keyboard-focusable scroll region is needed, it should have an appropriate accessible label, visible focus indicator and a justified focus stop.

TableContainer does not automatically add `role="region"` or `tabIndex`.

### General Requirements

- Preserve native HTML nesting.
- Use meaningful table headings.
- Maintain readable text and contrast.
- Preserve keyboard access to cell actions.
- Avoid unnecessary focus stops.
- Support mobile layouts and 200% zoom.
- Test screen-reader table navigation.
- Avoid using table elements for general-purpose page layout.

## 9. Empty Data Integration

Table supports composition with the existing EmptyState component.

EmptyState must be placed within a valid table cell.

```tsx
<TableBody>
  {projects.length === 0 ? (
    <TableRow>
      <TableCell colSpan={3}>
        <EmptyState>
          <EmptyStateTitle>
            No projects found
          </EmptyStateTitle>

          <EmptyStateDescription>
            Create a project to get started.
          </EmptyStateDescription>
        </EmptyState>
      </TableCell>
    </TableRow>
  ) : (
    projects.map((project) => (
      <TableRow key={project.id}>
        {/* Render the table's cells here */}
      </TableRow>
    ))
  )}
</TableBody>
```

The consumer determines the correct number of columns for `colSpan`.

Do not render EmptyState directly as a child of `tbody` or `tr`.

Table does not automatically detect empty arrays or insert an empty row.

## 10. Footer and Summary Rows

TableFooter uses the native `tfoot` element.

Consumers may render totals or other summary values inside footer rows.

Use an appropriate row heading for the summary label, and use `colSpan` when necessary.

Table itself does not calculate totals or summaries.

## 11. Composition with Other Components

Table has been verified with:

- Badge inside data cells
- Button actions inside rows
- Card as a parent container
- EmptyState for empty table bodies
- Custom numeric alignment
- Native captions and headers
- Footer summary rows

No internal imports or coupling with these components are required.

## 12. Verification Completed

- Nine component exports
- Strict TypeScript compilation
- Native HTML elements and attributes
- React 19-compatible refs
- Proper table structure
- Column and row header scopes
- Accessible caption rendering
- Dynamic data rows
- Badge composition
- Accessible Button actions
- Footer totals
- `colSpan` support
- EmptyState integration
- Table inside Card
- Optional TableContainer
- Responsive horizontal scrolling
- Keyboard navigation
- Focus behavior
- Light and dark theme appearance
- Mobile viewport checks
- 200% browser zoom
- Accessibility review
- ESLint and production build

## 13. Storybook Requirements — Phase 7

Create stories for:

1. Basic Table
2. Table With Caption
3. Row Headers
4. Status Badges
5. Row Actions
6. Footer Totals
7. Empty Data
8. Horizontal Overflow
9. Numeric Alignment
10. Table Inside Card
11. Custom Styling
12. Dark Theme

Storybook documentation should explain valid table nesting, captions, scope associations, responsive scrolling and the distinction between a presentational Table and a DataTable.

## 14. Architectural Boundaries

Table does not own:

- Data fetching
- Record state
- Column definitions
- Sorting
- Filtering
- Pagination
- Row selection
- Virtualization
- Search
- Data export
- Data mutations
- Automatic empty-state detection
- Interactive grid navigation
- Business-specific calculations
- TanStack Table integration

These may be implemented in higher-level components or consuming applications.

## 15. Future DataTable Integration

A future DataTable may use Table's components for its presentation layer.

For example, a TanStack Table adapter could manage row models, sorting and pagination while rendering the resulting structure through Table, TableHeader, TableBody, TableRow and related components.

Interactive sorting would require appropriate controls inside header cells and accurate `aria-sort` semantics on the sorted column heading.

No such behavior is required in the current component.

## 16. Known Considerations

**Responsive width:** Consumers determine when a table needs a minimum width and horizontal scrolling.

**Scrollable regions:** Focusable scroll containers require appropriate accessible labeling and keyboard verification.

**Complex headers:** Tables with grouped or spanning headers may require additional explicit associations.

**Empty data:** The consumer owns empty-state rendering and the correct column span.

**Interactive behavior:** Sorting, filtering, pagination and selection are deliberately outside the base Table API.

**Final decision:** Table is a lightweight semantic presentation system with nine composable native HTML components, explicit accessibility behavior and no unnecessary data-management abstractions.