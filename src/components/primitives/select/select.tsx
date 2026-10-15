
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../../lib/utils";

/**
 * Single-selection native dropdown.
 *
 * Multiple selection, listbox sizing, and array
 * values are excluded from this component API.
 */
export type SelectProps = Omit<
  ComponentPropsWithRef<"select">,
  "multiple" | "size" | "value" | "defaultValue"
> & {
  value?: string;
  defaultValue?: string;
};

/**
 * Accessible native Select primitive.
 *
 * Consumers own the options, selected value,
 * accessible label, and validation messages.
 */
export function Select({
  className,
  ref,
  children,
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      ref={ref}
      className={cn(
        // Native dropdown layout
        "block min-h-10 w-full min-w-0",
        "cursor-pointer rounded-control",

        // Appearance
        "border border-input bg-background",
        "px-3 py-2 text-base text-foreground",

        // Focus
        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-ring",

        // Invalid state
        "aria-[invalid=true]:border-destructive",

        // Disabled state
        "disabled:cursor-not-allowed",
        "disabled:bg-muted",
        "disabled:text-muted-foreground",

        // Consumer overrides
        className,
      )}
    >
      {children}
    </select>
  );
}
