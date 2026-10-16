
import type { ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../../lib/utils";

const badgeVariants = cva(
  [
    "inline-flex min-w-0 max-w-full items-center justify-center",
    "gap-1.5 align-middle",
    "rounded-full border",
    "font-medium text-center",
    "whitespace-normal wrap-anywhere",
    "[&_svg]:size-3.5 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        neutral: [
          "border-border/70",
          "bg-muted",
          "text-foreground",
        ],
        primary: [
          "border-primary/20",
          "bg-primary/10",
          "text-primary",
        ],
        success: [
          "border-success/25",
          "bg-success/10",
          "text-success",
        ],
        warning: [
          "border-warning/30",
          "bg-warning/10",
          "text-warning",
        ],
        destructive: [
          "border-destructive/25",
          "bg-destructive/10",
          "text-destructive",
        ],
        outline: [
          "border-input",
          "bg-background",
          "text-foreground",
        ],
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs leading-4",
        md: "px-3 py-1 text-sm leading-5",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  },
);

export type BadgeProps =
  ComponentPropsWithRef<"span"> &
  VariantProps<typeof badgeVariants>;

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
