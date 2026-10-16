
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../../lib/utils";

export type EmptyStateProps =
  ComponentPropsWithRef<"div">;

export type EmptyStateVisualProps =
  ComponentPropsWithRef<"div">;

export type EmptyStateTitleProps =
  ComponentPropsWithRef<"h3">;

export type EmptyStateDescriptionProps =
  ComponentPropsWithRef<"p">;

export type EmptyStateActionsProps =
  ComponentPropsWithRef<"div">;

export function EmptyState({
  className,
  ref,
  ...props
}: EmptyStateProps) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "flex w-full min-w-0 flex-col",
        "items-center gap-3",
        "px-4 py-10 text-center",
        "sm:px-8 sm:py-12",
        className,
      )}
    />
  );
}

export function EmptyStateVisual({
  className,
  ref,
  ...props
}: EmptyStateVisualProps) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "mb-2 flex shrink-0",
        "items-center justify-center",
        "text-muted-foreground",
        className,
      )}
    />
  );
}

export function EmptyStateTitle({
  className,
  ref,
  ...props
}: EmptyStateTitleProps) {
  return (
    <h3
      {...props}
      ref={ref}
      className={cn(
        "max-w-lg min-w-0",
        "text-lg font-semibold leading-7",
        "tracking-tight text-foreground",
        "break-words",
        className,
      )}
    />
  );
}

export function EmptyStateDescription({
  className,
  ref,
  ...props
}: EmptyStateDescriptionProps) {
  return (
    <p
      {...props}
      ref={ref}
      className={cn(
        "max-w-sm min-w-0",
        "text-sm leading-6",
        "text-muted-foreground",
        "break-words",
        className,
      )}
    />
  );
}

export function EmptyStateActions({
  className,
  ref,
  ...props
}: EmptyStateActionsProps) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "mt-3 flex w-full max-w-full",
        "flex-wrap items-center justify-center",
        "gap-3 sm:w-auto",
        className,
      )}
    />
  );
}
