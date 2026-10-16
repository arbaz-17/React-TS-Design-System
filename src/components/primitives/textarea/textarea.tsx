
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../../lib/utils";

export type TextareaProps = Omit<
  ComponentPropsWithRef<"textarea">,
  "children"
>;

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
        "block w-full min-w-0 min-h-24",
        "resize-y",

        "rounded-control border border-input",
        "bg-background px-3 py-2",
        "text-base leading-6 text-foreground",
        "placeholder:text-muted-foreground",

        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-ring",

        "aria-[invalid=true]:border-destructive",

        // Disabled state
        "disabled:cursor-not-allowed",
        "disabled:bg-muted",
        "disabled:text-muted-foreground",
        "disabled:resize-none",

        "read-only:bg-muted",
        className,
      )}
    />
  );
}
