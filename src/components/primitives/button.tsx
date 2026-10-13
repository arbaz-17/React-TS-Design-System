import type { ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

/**
 * Button visual variants and sizes.
 *
 * These classes consume our semantic design tokens.
 */
const buttonVariants = cva(
  [
    "relative inline-flex max-w-full items-center justify-center gap-2",
    "rounded-control font-medium text-center",
    "transition duration-150",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "[&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground",
          "enabled:hover:brightness-95",
          "enabled:active:brightness-90",
        ],

        secondary: [
          "bg-secondary text-secondary-foreground",
          "enabled:hover:brightness-95",
          "enabled:active:brightness-90",
        ],

        outline: [
          "border border-input bg-transparent text-foreground",
          "enabled:hover:bg-accent",
          "enabled:hover:text-accent-foreground",
        ],

        ghost: [
          "bg-transparent text-foreground",
          "enabled:hover:bg-accent",
          "enabled:hover:text-accent-foreground",
        ],

        destructive: [
          "bg-destructive text-destructive-foreground",
          "enabled:hover:brightness-95",
          "enabled:active:brightness-90",
        ],
      },

      size: {
        sm: "min-h-9 px-3 py-1.5 text-sm",
        md: "min-h-10 px-4 py-2 text-sm",
        lg: "min-h-11 px-5 py-2.5 text-base",
        icon: "size-10 p-2",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ComponentPropsWithRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    /**
     * Displays a loading spinner and prevents activation.
     * Loading state is controlled by the consumer.
     */
    loading?: boolean;
  };

export function Button({
  variant,
  size,
  loading = false,
  disabled = false,
  type = "button",
  className,
  children,
  ref,
  "aria-busy": ariaBusy,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading ? true : ariaBusy}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center gap-2",
          loading && "opacity-0",
        )}
      >
        {children}
      </span>

      {loading && (
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          fill="none"
          className="absolute size-4 motion-safe:animate-spin"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="3"
            opacity="0.25"
          />

          <path
            d="M21 12a9 9 0 0 0-9-9"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
