
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../../lib/utils";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "search"
  | "tel"
  | "url"
  | "number";

export type InputProps = Omit<
  ComponentPropsWithRef<"input">,
  "type"
> & {
  type?: InputType;
};

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

        "block w-full min-w-0 min-h-10",
        "rounded-control border border-input",
        "bg-background px-3 py-2",
        "text-base text-foreground",
        "placeholder:text-muted-foreground",

        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-ring",

        "aria-[invalid=true]:border-destructive",

        "disabled:cursor-not-allowed",
        "disabled:bg-muted",
        "disabled:text-muted-foreground",
        "read-only:bg-muted",

        className,
      )}
    />
  );
}
