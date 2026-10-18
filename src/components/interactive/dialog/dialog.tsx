
import type {
  ComponentProps,
  ComponentPropsWithRef,
} from "react";

import { Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "../../../lib/utils";

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


export function Dialog(props: DialogProps) {
  return (
    <DialogPrimitive.Root
      {...props}
      modal={true}
    />
  );
}


export const DialogTrigger =
  DialogPrimitive.Trigger;

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

          "outline-none",
          className,
        )}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}


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

export const DialogClose =
  DialogPrimitive.Close;
