
import type { ComponentPropsWithRef } from "react";

import {
  cva,
  type VariantProps,
} from "class-variance-authority";

import { cn } from "../../../lib/utils";

/**
 * Badge visual variants and sizes.
 *
 * Badge is a non-interactive presentation primitive.
 * Colors come from semantic design tokens.
 */
const badgeVariants = cva(
  [
    // Layout and alignment
    "inline-flex min-w-0 max-w-full items-center",
    "justify-center gap-1.5 align-middle",

    // Shape and typography
    "rounded-full border border-transparent",
    "font-medium text-center",
    "whitespace-normal wrap-anywhere",

    // Icon composition
    "[&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        neutral: [
          "bg-muted text-muted-foreground",
        ],

        primary: [
          "bg-primary text-primary-foreground",
        ],

        success: [
          "bg-success text-success-foreground",
        ],

        warning: [
          "bg-warning text-warning-foreground",
        ],

        destructive: [
          "bg-destructive text-destructive-foreground",
        ],

        outline: [
          "border-input bg-transparent text-foreground",
        ],
      },

      size: {
        sm: "px-2 py-0.5 text-xs leading-4",
        md: "px-2.5 py-1 text-sm leading-5",
      },
    },

    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  },
);

/**
 * Badge props:
 * Native span attributes plus typed visual variants.
 */
export type BadgeProps =
  ComponentPropsWithRef<"span"> &
  VariantProps<typeof badgeVariants>;

/**
 * Reusable non-interactive Badge component.
 */
export function Badge({
  variant,
  size,
  className,
  ref,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      ref={ref}
      className={cn(
        badgeVariants({ variant, size }),
        className,
      )}
    />
  );
}
