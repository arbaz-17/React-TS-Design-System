
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../lib/utils";

/**
 * Supported single-line input types.
 *
 * Complex input types such as checkbox, radio,
 * file, date, and time are intentionally excluded.
 */
export type InputType =
  | "text"
  | "email"
  | "password"
  | "search"
  | "tel"
  | "url"
  | "number";

/**
 * Preserve native input properties while restricting
 * the supported HTML input types.
 */
export type InputProps = Omit<
  ComponentPropsWithRef<"input">,
  "type"
> & {
  type?: InputType;
};

/**
 * Reusable single-line input primitive.
 *
 * Value management and validation are owned by
 * the consumer, not the component.
 */
export function Input({
  type = "text",
  className,
  ref,
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      ref={ref}
      type={type}
      className={cn(
        // Layout and appearance
        "block w-full min-w-0 min-h-10",
        "rounded-control border border-input",
        "bg-background px-3 py-2",
        "text-base text-foreground",
        "placeholder:text-muted-foreground",

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

        // Read-only state
        "read-only:bg-muted",

        // Consumer overrides
        className,
      )}
    />
  );
}
