
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../../lib/utils";

/**
 * Public component prop types.
 *
 * Each component preserves the native props
 * and ref type of its underlying HTML element.
 */

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

/**
 * EmptyState
 *
 * Root presentation container for an empty
 * content state.
 *
 * Does not automatically assign an ARIA role,
 * manage focus, or determine application state.
 */
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
        "px-6 py-12 text-center",
        className,
      )}
    />
  );
}

/**
 * EmptyStateVisual
 *
 * Optional container for icons, illustrations,
 * or other visual content.
 *
 * Consumers decide whether the visual is
 * decorative or informative.
 */
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
        "mb-1 flex items-center justify-center",
        "text-muted-foreground",
        className,
      )}
    />
  );
}

/**
 * EmptyStateTitle
 *
 * Semantic heading for the empty content state.
 *
 * Renders h3 by default. Consumers must consider
 * the heading hierarchy of their page.
 */
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

/**
 * EmptyStateDescription
 *
 * Supporting explanation or guidance.
 */
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
        "max-w-md min-w-0",
        "text-sm leading-6 text-muted-foreground",
        "break-words",
        className,
      )}
    />
  );
}

/**
 * EmptyStateActions
 *
 * Optional container for consumer-provided
 * buttons or links.
 *
 * Does not generate or manage actions.
 */
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
        "mt-2 flex max-w-full flex-wrap",
        "items-center justify-center gap-3",
        className,
      )}
    />
  );
}
