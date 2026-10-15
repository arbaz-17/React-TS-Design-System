
import type {
  ComponentProps,
  ComponentPropsWithRef,
} from "react";

import { Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "../../lib/utils";

/**
 * Dialog is intentionally modal-only.
 *
 * Consumers can use controlled or uncontrolled
 * state, but cannot switch to non-modal behavior.
 */
export type DialogProps = Omit<
  ComponentProps<typeof DialogPrimitive.Root>,
  "modal"
>;

export type DialogTriggerProps =
  ComponentPropsWithRef<
    typeof DialogPrimitive.Trigger
  >;

export type DialogContentProps = Omit<
  ComponentPropsWithRef<
    typeof DialogPrimitive.Content
  >,
  "asChild" | "forceMount"
>;

export type DialogHeaderProps =
  ComponentPropsWithRef<"div">;

export type DialogTitleProps =
  ComponentPropsWithRef<
    typeof DialogPrimitive.Title
  >;

export type DialogDescriptionProps =
  ComponentPropsWithRef<
    typeof DialogPrimitive.Description
  >;

export type DialogFooterProps =
  ComponentPropsWithRef<"div">;

export type DialogCloseProps =
  ComponentPropsWithRef<
    typeof DialogPrimitive.Close
  >;

/**
 * Dialog
 *
 * Modal root with controlled and uncontrolled
 * state support.
 */
export function Dialog(props: DialogProps) {
  return (
    <DialogPrimitive.Root
      {...props}
      modal={true}
    />
  );
}

/**
 * DialogTrigger
 *
 * Use asChild when composing with our Button.
 */
export const DialogTrigger =
  DialogPrimitive.Trigger;

/**
 * DialogContent
 *
 * Composes the portal, backdrop and dialog
 * panel into one reusable public component.
 *
 * The consumer is responsible for supplying
 * an accessible DialogTitle.
 */
export function DialogContent({
  className,
  ref,
  children,
  ...props
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          "fixed inset-0 z-50",
          "bg-black/60",
        )}
      />

      <DialogPrimitive.Content
        {...props}
        ref={ref}
        className={cn(
          // Positioning
          "fixed left-1/2 top-1/2 z-50",
          "-translate-x-1/2 -translate-y-1/2",

          // Responsive sizing and scrolling
          "w-[calc(100vw-2rem)] max-w-lg",
          "max-h-[calc(100dvh-2rem)]",
          "overflow-y-auto",

          // Surface
          "rounded-overlay border border-border",
          "bg-card p-6 text-card-foreground",
          "shadow-overlay",

          // Focus is managed by Radix.
          // Individual controls retain focus styles.
          "outline-none",
          className,
        )}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

/**
 * DialogHeader
 *
 * Groups title and supporting description.
 */
export function DialogHeader({
  className,
  ref,
  ...props
}: DialogHeaderProps) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "flex min-w-0 flex-col gap-1.5",
        "text-left",
        className,
      )}
    />
  );
}

/**
 * DialogTitle
 *
 * Radix supplies accessible naming through
 * its Title primitive.
 */
export function DialogTitle({
  className,
  ref,
  ...props
}: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      {...props}
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-7",
        "tracking-tight text-foreground",
        className,
      )}
    />
  );
}

/**
 * DialogDescription
 *
 * Optional supporting description.
 */
export function DialogDescription({
  className,
  ref,
  ...props
}: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      {...props}
      ref={ref}
      className={cn(
        "text-sm leading-6",
        "text-muted-foreground",
        className,
      )}
    />
  );
}

/**
 * DialogFooter
 *
 * Consumer-owned action layout.
 *
 * DOM and visual order remain consistent
 * across mobile and desktop breakpoints.
 */
export function DialogFooter({
  className,
  ref,
  ...props
}: DialogFooterProps) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "flex flex-col gap-3",
        "sm:flex-row sm:items-center sm:justify-end",
        className,
      )}
    />
  );
}

/**
 * DialogClose
 *
 * Use asChild to compose an existing Button
 * without producing nested button elements.
 */
export const DialogClose =
  DialogPrimitive.Close;
