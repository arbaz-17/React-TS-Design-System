
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../lib/utils";

/**
 * A decorative loading placeholder.
 *
 * Excludes children and interactive semantics because
 * Skeleton should never contain meaningful content
 * or act as a user-interactive element.
 */
export type SkeletonProps = Omit<
  ComponentPropsWithRef<"div">,
  | "children"
  | "dangerouslySetInnerHTML"
  | "role"
  | "tabIndex"
  | "aria-hidden"
>;

/**
 * Reusable visual loading placeholder.
 *
 * Consumers provide dimensions and layout through
 * className. Loading semantics belong to the
 * surrounding content region.
 */
export function Skeleton({
  className,
  ref,
  ...props
}: SkeletonProps) {
  return (
    <div
      {...props}
      ref={ref}
      aria-hidden="true"
      className={cn(
        // Default geometry
        "h-4 w-full min-w-0 rounded-control",

        // Theme-aware appearance
        "bg-muted",

        // Animation only when motion is permitted
        "motion-safe:animate-pulse",

        // Clearly visible in forced-colors mode
        "forced-colors:border",
        "forced-colors:border-[CanvasText]",

        // Decorative, non-interactive behavior
        "pointer-events-none select-none",

        // Consumer overrides
        className,
      )}
    />
  );
}
