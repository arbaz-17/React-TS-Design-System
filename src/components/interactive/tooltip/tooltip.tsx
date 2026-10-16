
import type {
  ComponentProps,
  ComponentPropsWithRef,
} from "react";

import { Tooltip as TooltipPrimitive } from "radix-ui";

import { cn } from "../../../lib/utils";

/* -------------------------------------------------------
 * Public Types
 * ----------------------------------------------------- */

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

/* -------------------------------------------------------
 * TooltipProvider
 * ----------------------------------------------------- */

/**
 * Provides shared timing and hover behavior.
 *
 * Mount once near the application root.
 */
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

/* -------------------------------------------------------
 * Tooltip
 * ----------------------------------------------------- */

/**
 * Individual tooltip state.
 *
 * Supports controlled and uncontrolled modes.
 * Requires TooltipProvider higher in the tree.
 */
export function Tooltip(props: TooltipProps) {
  return <TooltipPrimitive.Root {...props} />;
}

/* -------------------------------------------------------
 * TooltipTrigger
 * ----------------------------------------------------- */

/**
 * Focus/hover target.
 *
 * Use asChild when composing with Button
 * or another focusable interactive element.
 */
export const TooltipTrigger = TooltipPrimitive.Trigger;

/* -------------------------------------------------------
 * TooltipContent
 * ----------------------------------------------------- */

/**
 * Accessible supplementary explanation.
 *
 * Portal and positioning are handled internally.
 *
 * Content must remain noninteractive.
 */
export function TooltipContent({
  className,
  ref,
  children,
  side = "top",
  align = "center",
  sideOffset = 6,
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
        className={cn(
          // Layering above ordinary overlays
          "z-[60]",

          // Sizing
          "max-w-[min(18rem,calc(100vw-2rem))]",

          // Surface
          "rounded-surface",
          "border border-border",
          "bg-card text-card-foreground",
          "shadow-surface",

          // Text
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
