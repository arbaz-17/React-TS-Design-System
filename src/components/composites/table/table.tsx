
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../../lib/utils";

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
        "w-full caption-top border-collapse",
        "text-sm text-foreground",
        className,
      )}
    />
  );
}

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
        "bg-muted/60",
        className,
      )}
    />
  );
}

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
        "border-b border-border/70",
        "last:border-b-0",
        className,
      )}
    />
  );
}

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
        "text-xs font-semibold",
        "text-muted-foreground",
        className,
      )}
    />
  );
}

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
        "px-4 py-3.5",
        "align-middle text-foreground",
        className,
      )}
    />
  );
}
