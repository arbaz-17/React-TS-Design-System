
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../../lib/utils";

export type CheckboxProps = Omit<
  ComponentPropsWithRef<"input">,
  | "type"
  | "children"
  | "defaultValue"
  | "readOnly"
  | "size"
>;


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

        "size-5 shrink-0 cursor-pointer",
        "accent-primary",

        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-ring",

        "aria-invalid:ring-2",
        "aria-invalid:ring-destructive",

        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        
        className,
      )}
    />
  );
}
