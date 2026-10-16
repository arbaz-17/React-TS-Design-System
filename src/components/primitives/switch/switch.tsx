import type { ComponentPropsWithRef } from "react";

import { cn } from "../../../lib/utils";

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

export function Switch({ className, ref, ...props }: SwitchProps) {
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

          "forced-colors:border-[ButtonText]",
          "peer-checked:forced-colors:border-[Highlight]",
          "peer-checked:forced-colors:bg-[Highlight]",
        )}
      />

      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-0.5 top-0.5",
          "size-5 rounded-full border border-input",
          "bg-background shadow-sm",
          "motion-safe:transition-transform",
          "motion-safe:duration-200",
          "peer-checked:translate-x-5",
          "peer-checked:border-primary-foreground",
          "peer-checked:bg-primary-foreground",
          "peer-disabled:opacity-50",
          "forced-colors:bg-[Canvas]",
        )}
      />
    </span>
  );
}
