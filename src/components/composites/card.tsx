
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../lib/utils";

/**
 * Public component prop types.
 *
 * Each component inherits the native props and
 * ref type of its underlying HTML element.
 */
export type CardProps = ComponentPropsWithRef<"div">;

export type CardHeaderProps =
  ComponentPropsWithRef<"div">;

export type CardTitleProps =
  ComponentPropsWithRef<"h3">;

export type CardDescriptionProps =
  ComponentPropsWithRef<"p">;

export type CardContentProps =
  ComponentPropsWithRef<"div">;

export type CardFooterProps =
  ComponentPropsWithRef<"div">;

/**
 * Card
 *
 * Root container providing the Card's surface,
 * spacing, border, background, and shadow.
 */
export function Card({
  className,
  ref,
  ...props
}: CardProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex min-w-0 flex-col gap-5",
        "rounded-surface border border-border",
        "bg-card p-6 text-card-foreground",
        "shadow-surface",
        className,
      )}
      {...props}
    />
  );
}

/**
 * CardHeader
 *
 * Groups a title and optional description.
 */
export function CardHeader({
  className,
  ref,
  ...props
}: CardHeaderProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex min-w-0 flex-col gap-1.5",
        className,
      )}
      {...props}
    />
  );
}

/**
 * CardTitle
 *
 * Renders an h3 heading.
 * Consumers must consider document heading hierarchy.
 */
export function CardTitle({
  className,
  ref,
  ...props
}: CardTitleProps) {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-7",
        "tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

/**
 * CardDescription
 *
 * Supporting text below the title.
 */
export function CardDescription({
  className,
  ref,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      ref={ref}
      className={cn(
        "text-sm leading-5 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

/**
 * CardContent
 *
 * Main content area with no forced internal layout.
 */
export function CardContent({
  className,
  ref,
  ...props
}: CardContentProps) {
  return (
    <div
      ref={ref}
      className={cn("min-w-0", className)}
      {...props}
    />
  );
}

/**
 * CardFooter
 *
 * Flexible container for actions or supplementary
 * content. Items can wrap when space is limited.
 */
export function CardFooter({
  className,
  ref,
  ...props
}: CardFooterProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-3",
        className,
      )}
      {...props}
    />
  );
}
