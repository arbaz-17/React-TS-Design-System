
import type { ComponentPropsWithRef } from "react";

import {
  cva,
  type VariantProps,
} from "class-variance-authority";

import { cn } from "../../../lib/utils";

/**
 * Semantic visual variants for Alert.
 *
 * Appearance does not determine accessibility role.
 * Consumers choose role="status" or role="alert"
 * only when appropriate.
 */
const alertVariants = cva(
  [
    // Layout
    "flex min-w-0 flex-col gap-1.5",

    // Surface and spacing
    "rounded-surface border border-l-4",
    "px-4 py-3",

    // Typography
    "text-foreground",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border",
          "border-l-primary",
          "bg-muted/40",
        ],

        success: [
          "border-success/40",
          "border-l-success",
          "bg-success/10",
        ],

        warning: [
          "border-warning/40",
          "border-l-warning",
          "bg-warning/10",
        ],

        destructive: [
          "border-destructive/40",
          "border-l-destructive",
          "bg-destructive/10",
        ],
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Public prop types.
 */
export type AlertProps =
  ComponentPropsWithRef<"div"> &
  VariantProps<typeof alertVariants>;

export type AlertTitleProps =
  ComponentPropsWithRef<"p">;

export type AlertDescriptionProps =
  ComponentPropsWithRef<"div">;

/**
 * Alert
 *
 * Root presentation container.
 * Does not automatically assign an ARIA role.
 */
export function Alert({
  variant,
  className,
  ref,
  ...props
}: AlertProps) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        alertVariants({ variant }),
        className,
      )}
    />
  );
}

/**
 * AlertTitle
 *
 * Prominent text without introducing
 * an unnecessary document heading.
 */
export function AlertTitle({
  className,
  ref,
  ...props
}: AlertTitleProps) {
  return (
    <p
      {...props}
      ref={ref}
      className={cn(
        "min-w-0 text-sm font-semibold",
        "leading-5 text-foreground",
        className,
      )}
    />
  );
}

/**
 * AlertDescription
 *
 * Supports explanatory text, paragraphs,
 * lists, and other non-interactive content.
 */
export function AlertDescription({
  className,
  ref,
  ...props
}: AlertDescriptionProps) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "min-w-0 text-sm leading-6",
        "text-foreground",
        className,
      )}
    />
  );
}
