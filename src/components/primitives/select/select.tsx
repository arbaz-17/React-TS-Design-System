
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../../lib/utils";

export type SelectProps = Omit<
  ComponentPropsWithRef<"select">,
  "multiple" | "size" | "value" | "defaultValue"
> & {
  value?: string;
  defaultValue?: string;
};

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
        "block min-h-10 w-full min-w-0",
        "cursor-pointer rounded-control",
        "border border-input bg-background",
        "px-3 py-2 text-base text-foreground",


        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-ring",

        "aria-[invalid=true]:border-destructive",

        "disabled:cursor-not-allowed",
        "disabled:bg-muted",
        "disabled:text-muted-foreground",

        className,
      )}
    >
      {children}
    </select>
  );
}
