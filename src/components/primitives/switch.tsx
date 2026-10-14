
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../lib/utils";

/**
 * A native checkbox presented as an on/off switch.
 *
 * The following props are intentionally excluded:
 * - type: always checkbox
 * - role: always switch
 * - aria-checked: native checked state is authoritative
 * - defaultValue: use defaultChecked
 * - readOnly: unsupported interaction pattern
 * - size: fixed visual dimensions
 * - children: labels are external
 */
export type SwitchProps = Omit<
  ComponentPropsWithRef<"input">,
  | "type"
  | "role"
  | "aria-checked"
  | "children"
  | "defaultValue"
  | "readOnly"
  | "size"
>;

/**
 * Native switch with an accessible input and
 * decorative track/thumb.
 *
 * className applies to the outer wrapper.
 * ref points to the underlying HTMLInputElement.
 */
export function Switch({
  className,
  ref,
  ...props
}: SwitchProps) {
  return (
    <span
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 align-middle",
        className,
      )}
    >
      <input
        {...props}
        ref={ref}
        type="checkbox"
        role="switch"
        className={cn(
          "peer absolute inset-0 z-10 m-0 h-full w-full",
          "cursor-pointer opacity-0",
          "disabled:cursor-not-allowed",
        )}
      />

      {/* Decorative track */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full",
          "border border-input bg-muted",
          "motion-safe:transition-colors",
          "motion-safe:duration-200",

          // On state
          "peer-checked:border-primary",
          "peer-checked:bg-primary",

          // Keyboard focus
          "peer-focus-visible:outline-2",
          "peer-focus-visible:outline-offset-2",
          "peer-focus-visible:outline-ring",

          // Invalid state
          "peer-aria-[invalid=true]:ring-2",
          "peer-aria-[invalid=true]:ring-destructive",

          // Disabled state
          "peer-disabled:opacity-50",

          // Windows forced-colors support
          "forced-colors:border-[ButtonText]",
          "peer-checked:forced-colors:border-[Highlight]",
          "peer-checked:forced-colors:bg-[Highlight]",
        )}
      />

      {/* Decorative thumb */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-0.5 top-0.5",
          "size-5 rounded-full border border-input",
          "bg-background shadow-sm",
          "motion-safe:transition-transform",
          "motion-safe:duration-200",

          // Move 20px to the right when checked
          "peer-checked:translate-x-5",
          "peer-checked:border-primary-foreground",
          "peer-checked:bg-primary-foreground",

          // Disabled state
          "peer-disabled:opacity-50",

          // Forced-colors support
          "forced-colors:bg-[Canvas]",
        )}
      />
    </span>
  );
}
