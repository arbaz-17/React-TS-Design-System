import type { ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { cn } from "../../../lib/utils";

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
        <LoaderCircle
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute inset-0 m-auto size-4 motion-safe:animate-spin"
        />
      )}
    </button>
  );
}
