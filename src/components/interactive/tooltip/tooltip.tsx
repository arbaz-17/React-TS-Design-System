
import type {
  ComponentProps,
  ComponentPropsWithRef,
} from "react";

import { Tooltip as TooltipPrimitive } from "radix-ui";

import { cn } from "../../../lib/utils";

export type TooltipProviderProps =
  ComponentProps<typeof TooltipPrimitive.Provider>;

export type TooltipProps =
  ComponentProps<typeof TooltipPrimitive.Root>;

export type TooltipTriggerProps =
  ComponentPropsWithRef<typeof TooltipPrimitive.Trigger>;

export type TooltipContentProps = Omit<
  ComponentPropsWithRef<typeof TooltipPrimitive.Content>,
  "asChild" | "forceMount"
>;

export function TooltipProvider({
  delayDuration = 500,
  skipDelayDuration = 300,
  disableHoverableContent = false,
  ...props
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      {...props}
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      disableHoverableContent={disableHoverableContent}
    />
  );
}

export function Tooltip(props: TooltipProps) {
  return <TooltipPrimitive.Root {...props} />;
}

export const TooltipTrigger =
  TooltipPrimitive.Trigger;

export function TooltipContent({
  className,
  ref,
  children,
  side = "top",
  align = "center",
  sideOffset = 6,
  collisionPadding = 8,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        {...props}
        ref={ref}
        side={side}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          "z-[60]",
          "max-w-[min(18rem,calc(100vw-2rem))]",
          "rounded-surface",
          "border border-border",
          "bg-card text-card-foreground",
          "shadow-surface",
          "break-words px-3 py-2",
          "text-xs leading-5",
          className,
        )}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
