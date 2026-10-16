
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../../lib/utils";

export type SkeletonProps = Omit<
  ComponentPropsWithRef<"div">,
  | "children"
  | "dangerouslySetInnerHTML"
  | "role"
  | "tabIndex"
  | "aria-hidden"
>;


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
