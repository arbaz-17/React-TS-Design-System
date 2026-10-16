
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../../lib/utils";

/**
 * Public component prop types.
 *
 * Every component preserves the native attributes
 * and ref type of its underlying HTML element.
 */

export type FormFieldProps =
  ComponentPropsWithRef<"div">;

export type FormLabelProps =
  ComponentPropsWithRef<"label"> & {
    /**
     * Displays a decorative required asterisk.
     *
     * The actual form control must independently
     * receive its native required attribute.
     */
    requiredIndicator?: boolean;
  };

export type FormDescriptionProps =
  ComponentPropsWithRef<"p">;

export type FormMessageProps =
  ComponentPropsWithRef<"p">;

/**
 * FormField
 *
 * A composable layout wrapper for one form control,
 * its label, description and validation message.
 */
export function FormField({
  className,
  ref,
  ...props
}: FormFieldProps) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "flex min-w-0 flex-col gap-2",
        className,
      )}
    />
  );
}

/**
 * FormLabel
 *
 * Native label with an optional visible asterisk.
 * Does not make the associated control required.
 */
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
        <span
          aria-hidden="true"
          className="ml-1 text-destructive"
        >
          *
        </span>
      )}
    </label>
  );
}

/**
 * FormDescription
 *
 * Supplementary information associated with a
 * control through its aria-describedby attribute.
 */
export function FormDescription({
  className,
  ref,
  ...props
}: FormDescriptionProps) {
  return (
    <p
      {...props}
      ref={ref}
      className={cn(
        "text-xs leading-5",
        "text-muted-foreground",
        className,
      )}
    />
  );
}

/**
 * FormMessage
 *
 * Presents validation feedback.
 *
 * Does not automatically create an ARIA live region
 * or generate validation errors.
 */
export function FormMessage({
  className,
  ref,
  ...props
}: FormMessageProps) {
  return (
    <p
      {...props}
      ref={ref}
      className={cn(
        "text-sm leading-5",
        "text-destructive",
        className,
      )}
    />
  );
}
