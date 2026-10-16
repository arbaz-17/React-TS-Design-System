
import type { ComponentPropsWithRef } from "react";

import { cn } from "../../../lib/utils";

export type CardProps = ComponentPropsWithRef<"div">;
export type CardHeaderProps = ComponentPropsWithRef<"div">;
export type CardTitleProps = ComponentPropsWithRef<"h3">;
export type CardDescriptionProps = ComponentPropsWithRef<"p">;
export type CardContentProps = ComponentPropsWithRef<"div">;
export type CardFooterProps = ComponentPropsWithRef<"div">;
export type CardMediaProps = ComponentPropsWithRef<"div">;

export function Card({
  className,
  ref,
  ...props
}: CardProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex min-w-0 flex-col",
        "overflow-hidden rounded-surface",
        "border border-border bg-card text-card-foreground",
        "shadow-surface",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ref,
  ...props
}: CardHeaderProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex min-w-0 flex-col gap-1.5",
        "px-5 pt-5 sm:px-6 sm:pt-6",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ref,
  ...props
}: CardTitleProps) {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-7 tracking-tight",
        "text-card-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ref,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      ref={ref}
      className={cn(
        "text-sm leading-6 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ref,
  ...props
}: CardContentProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "min-w-0 px-5 py-5 sm:px-6 sm:py-6",
        className,
      )}
      {...props}
    />
  );
}

export function CardFooter({
  className,
  ref,
  ...props
}: CardFooterProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-3",
        "px-5 pb-5 sm:px-6 sm:pb-6",
        className,
      )}
      {...props}
    />
  );
}

export function CardMedia({
  className,
  ref,
  ...props
}: CardMediaProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative min-w-0 overflow-hidden",
        "[&_img]:block [&_img]:h-full",
        "[&_img]:w-full [&_img]:object-cover",
        className,
      )}
      {...props}
    />
  );
}
