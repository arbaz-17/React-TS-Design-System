
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../lib/utils";

/**
 * Native textarea props without children.
 *
 * Use value or defaultValue to provide content.
 */
export type TextareaProps = Omit<
  ComponentPropsWithRef<"textarea">,
  "children"
>;

/**
 * Reusable multiline text-entry primitive.
 *
 * Value management, validation, labels, and error
 * messages are owned by consuming components.
 */
export function Textarea({
  rows = 4,
  className,
  ref,
  ...props
}: TextareaProps) {
  return (
    <textarea
      {...props}
      ref={ref}
      rows={rows}
      className={cn(
        // Layout
        "block w-full min-w-0 min-h-24",
        "resize-y",

        // Appearance
        "rounded-control border border-input",
        "bg-background px-3 py-2",
        "text-base leading-6 text-foreground",
        "placeholder:text-muted-foreground",

        // Keyboard focus
        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-ring",

        // Invalid state
        "aria-[invalid=true]:border-destructive",

        // Disabled state
        "disabled:cursor-not-allowed",
        "disabled:bg-muted",
        "disabled:text-muted-foreground",
        "disabled:resize-none",

        // Read-only state
        "read-only:bg-muted",

        // Consumer overrides
        className,
      )}
    />
  );
}
