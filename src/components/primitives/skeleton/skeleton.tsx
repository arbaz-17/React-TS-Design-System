
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
        "h-4 w-full min-w-0 rounded-control",

        "bg-muted",

        "motion-safe:animate-pulse",

        "forced-colors:border",
        "forced-colors:border-[CanvasText]",
        "pointer-events-none select-none",

        className,
      )}
    />
  );
}
