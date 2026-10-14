
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../lib/utils";

/**
 * Public component prop types.
 *
 * Each component inherits the native attributes
 * and ref type of its underlying HTML element.
 */

export type TableContainerProps =
  ComponentPropsWithRef<"div">;

export type TableProps =
  ComponentPropsWithRef<"table">;

export type TableCaptionProps =
  ComponentPropsWithRef<"caption">;

export type TableHeaderProps =
  ComponentPropsWithRef<"thead">;

export type TableBodyProps =
  ComponentPropsWithRef<"tbody">;

export type TableFooterProps =
  ComponentPropsWithRef<"tfoot">;

export type TableRowProps =
  ComponentPropsWithRef<"tr">;

export type TableHeadProps =
  ComponentPropsWithRef<"th">;

export type TableCellProps =
  ComponentPropsWithRef<"td">;

/**
 * TableContainer
 *
 * Optional presentation wrapper providing
 * a bordered surface and horizontal overflow.
 *
 * Does not automatically add a role or tabIndex.
 */
export function TableContainer({
  className,
  ref,
  ...props
}: TableContainerProps) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "relative w-full min-w-0",
        "overflow-x-auto",
        "rounded-surface border border-border",
        className,
      )}
    />
  );
}

/**
 * Table
 *
 * Native semantic HTML table.
 */
export function Table({
  className,
  ref,
  ...props
}: TableProps) {
  return (
    <table
      {...props}
      ref={ref}
      className={cn(
        "w-full caption-top",
        "text-sm text-foreground",
        className,
      )}
    />
  );
}

/**
 * TableCaption
 *
 * Provides an accessible caption describing
 * the purpose or content of the table.
 */
export function TableCaption({
  className,
  ref,
  ...props
}: TableCaptionProps) {
  return (
    <caption
      {...props}
      ref={ref}
      className={cn(
        "px-4 py-3 text-left",
        "text-sm text-muted-foreground",
        className,
      )}
    />
  );
}

/**
 * TableHeader
 *
 * Native table column-header section.
 */
export function TableHeader({
  className,
  ref,
  ...props
}: TableHeaderProps) {
  return (
    <thead
      {...props}
      ref={ref}
      className={cn(
        "bg-muted/40",
        className,
      )}
    />
  );
}

/**
 * TableBody
 *
 * Native table body containing data rows.
 */
export function TableBody({
  className,
  ref,
  ...props
}: TableBodyProps) {
  return (
    <tbody
      {...props}
      ref={ref}
      className={cn(
        "bg-card",
        className,
      )}
    />
  );
}

/**
 * TableFooter
 *
 * Optional table section for totals
 * or other summary rows.
 */
export function TableFooter({
  className,
  ref,
  ...props
}: TableFooterProps) {
  return (
    <tfoot
      {...props}
      ref={ref}
      className={cn(
        "border-t border-border",
        "bg-muted/30 font-medium",
        className,
      )}
    />
  );
}

/**
 * TableRow
 *
 * Native table row with a subtle divider.
 * No automatic selection or click behavior.
 */
export function TableRow({
  className,
  ref,
  ...props
}: TableRowProps) {
  return (
    <tr
      {...props}
      ref={ref}
      className={cn(
        "border-b border-border",
        "last:border-b-0",
        className,
      )}
    />
  );
}

/**
 * TableHead
 *
 * Native th element, defaulting to a
 * column-header scope.
 *
 * Use scope="row" for a row heading.
 */
export function TableHead({
  className,
  scope = "col",
  ref,
  ...props
}: TableHeadProps) {
  return (
    <th
      {...props}
      ref={ref}
      scope={scope}
      className={cn(
        "px-4 py-3",
        "text-left align-middle",
        "font-medium text-foreground",
        className,
      )}
    />
  );
}

/**
 * TableCell
 *
 * Native data cell.
 *
 * Supports colSpan, rowSpan, headers,
 * and other standard td attributes.
 */
export function TableCell({
  className,
  ref,
  ...props
}: TableCellProps) {
  return (
    <td
      {...props}
      ref={ref}
      className={cn(
        "px-4 py-3",
        "align-middle text-foreground",
        className,
      )}
    />
  );
}
