
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../lib/utils";

/**
 * Native checkbox props.
 *
 * Exclude attributes that do not belong
 * to our checkbox component contract.
 */
export type CheckboxProps = Omit<
  ComponentPropsWithRef<"input">,
  | "type"
  | "children"
  | "defaultValue"
  | "readOnly"
  | "size"
>;

/**
 * Accessible, reusable native checkbox.
 *
 * Checked state, labels, validation and
 * form handling are consumer responsibilities.
 */
export function Checkbox({
  className,
  ref,
  ...props
}: CheckboxProps) {
  return (
    <input
      {...props}
      ref={ref}
      type="checkbox"
      className={cn(
        // Native control and dimensions
        "size-5 shrink-0 cursor-pointer",
        "accent-primary",

        // Keyboard focus
        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-ring",

        // Invalid state
        "aria-invalid:ring-2",
        "aria-invalid:ring-destructive",

        // Disabled state
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",

        // Consumer styling
        className,
      )}
    />
  );
}
