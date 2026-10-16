import type { ComponentPropsWithRef } from "react";

import { cn } from "../../../lib/utils";

export type FormFieldProps = ComponentPropsWithRef<"div">;

export type FormLabelProps = ComponentPropsWithRef<"label"> & {
  requiredIndicator?: boolean;
};

export type FormDescriptionProps = ComponentPropsWithRef<"p">;

export type FormMessageProps = ComponentPropsWithRef<"p">;

export function FormField({ className, ref, ...props }: FormFieldProps) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn("flex min-w-0 flex-col gap-2", "w-full", className)}
    />
  );
}

export function FormLabel({
  className,
  children,
  requiredIndicator = false,
  ref,
  ...props
}: FormLabelProps) {
  return (
    <label
      {...props}
      ref={ref}
      className={cn(
        "text-sm font-medium leading-5",
        "text-foreground",
        className,
      )}
    >
      {children}
      {requiredIndicator && (
        <span aria-hidden="true" className="ml-1 text-destructive">
          *
        </span>
      )}
    </label>
  );
}

export function FormDescription({
  className,
  ref,
  ...props
}: FormDescriptionProps) {
  return (
    <p
      {...props}
      ref={ref}
      className={cn("text-xs leading-5", "text-muted-foreground", className)}
    />
  );
}

export function FormMessage({ className, ref, ...props }: FormMessageProps) {
  return (
    <p
      {...props}
      ref={ref}
      className={cn(
        "text-xs font-medium leading-5",
        "text-destructive",
        className,
      )}
    />
  );
}
