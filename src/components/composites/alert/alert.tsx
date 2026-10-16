import type { ComponentPropsWithRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../../lib/utils";

const alertVariants = cva(
  [
    "flex min-w-0 flex-col gap-1.5",

    "rounded-surface border",
    "px-4 py-3.5 sm:px-5 sm:py-4",

    "text-foreground",

    "[overflow-wrap:anywhere]",

    "forced-colors:border-[CanvasText]",
  ],
  {
    variants: {
      variant: {
        default: ["border-border", "bg-muted/60"],

        success: ["border-success/40", "bg-success/15"],

        warning: ["border-warning/40", "bg-warning/15"],

        destructive: ["border-destructive/40", "bg-destructive/15"],
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);

export type AlertProps = ComponentPropsWithRef<"div"> &
  VariantProps<typeof alertVariants>;

export type AlertTitleProps = ComponentPropsWithRef<"p">;

export type AlertDescriptionProps = ComponentPropsWithRef<"div">;

export function Alert({ variant, className, ref, ...props }: AlertProps) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(alertVariants({ variant }), className)}
    />
  );
}

export function AlertTitle({ className, ref, ...props }: AlertTitleProps) {
  return (
    <p
      {...props}
      ref={ref}
      className={cn(
        "min-w-0",
        "text-sm font-semibold leading-5",
        "tracking-tight text-foreground",
        className,
      )}
    />
  );
}

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
        "min-w-0",
        "text-sm leading-6",
        "text-muted-foreground",
        "[&_a]:font-medium",
        "[&_a]:underline",
        "[&_a]:underline-offset-4",
        className,
      )}
    />
  );
}
