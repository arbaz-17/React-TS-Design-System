
import {
  createContext,
  useContext,
  useId,
  useState,
  type ComponentPropsWithRef,
} from "react";

import { cn } from "../../lib/utils";

/* -------------------------------------------------------
 * Public Types
 * ----------------------------------------------------- */

export type AccordionProps =
  ComponentPropsWithRef<"div"> & {
    type?: "single" | "multiple";
  };

export type AccordionItemProps = Omit<
  ComponentPropsWithRef<"details">,
  "name" | "open"
> & {
  defaultOpen?: boolean;
};

export type AccordionTriggerProps =
  ComponentPropsWithRef<"summary">;

export type AccordionContentProps =
  ComponentPropsWithRef<"div">;

/* -------------------------------------------------------
 * Private Context
 * ----------------------------------------------------- */

type AccordionContextValue = {
  groupName: string | undefined;
};

const AccordionContext =
  createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error(
      "AccordionItem must be used inside <Accordion>.",
    );
  }

  return context;
}

/* -------------------------------------------------------
 * Accordion Root
 * ----------------------------------------------------- */

/**
 * Accordion
 *
 * Provides the shared visual container and
 * an optional native disclosure group.
 *
 * type="single":
 *   At most one item can be expanded.
 *
 * type="multiple":
 *   Items expand independently.
 */
export function Accordion({
  type = "multiple",
  className,
  ref,
  ...props
}: AccordionProps) {
  const id = useId();

  const groupName =
    type === "single" ? `accordion-${id}` : undefined;

  return (
    <AccordionContext.Provider value={{ groupName }}>
      <div
        {...props}
        ref={ref}
        className={cn(
          "w-full min-w-0",
          "rounded-surface",
          "border border-border",
          className,
        )}
      />
    </AccordionContext.Provider>
  );
}

/* -------------------------------------------------------
 * AccordionItem
 * ----------------------------------------------------- */

/**
 * AccordionItem
 *
 * Native <details> disclosure.
 *
 * The browser owns the current open state.
 * defaultOpen is captured on initial mount only.
 */

export function AccordionItem({
  defaultOpen = false,
  className,
  ref,
  ...props
}: AccordionItemProps) {
  const { groupName } = useAccordionContext();

  // Capture the initial open value once.
  // Subsequent disclosure changes remain native.
  const [initialOpen] = useState(defaultOpen);

  return (
    <details
      {...props}
      ref={ref}
      name={groupName}
      open={initialOpen}
      className={cn(
        "group min-w-0",
        "border-b border-border",
        "last:border-b-0",
        "bg-card text-card-foreground",
        className,
      )}
    />
  );
}


/* -------------------------------------------------------
 * AccordionTrigger
 * ----------------------------------------------------- */

/**
 * AccordionTrigger
 *
 * Native <summary> element.
 *
 * Must be the first child of AccordionItem.
 *
 * Browser owns Enter/Space activation.
 */
export function AccordionTrigger({
  className,
  ref,
  ...props
}: AccordionTriggerProps) {
  return (
    <summary
      {...props}
      ref={ref}
      className={cn(
        // Preserve native disclosure marker.
        "list-item list-inside",
        "cursor-pointer",

        // Spacing and typography.
        "px-4 py-3",
        "text-sm font-medium leading-6",
        "text-foreground",
        "marker:text-muted-foreground",

        // Native open-state styling.
        "group-open:bg-muted/40",

        // Keyboard accessibility.
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-inset",
        "focus-visible:ring-ring",

        className,
      )}
    />
  );
}

/* -------------------------------------------------------
 * AccordionContent
 * ----------------------------------------------------- */

/**
 * AccordionContent
 *
 * Content is revealed/hidden by the parent
 * native <details> element.
 *
 * No React state or custom visibility logic.
 */
export function AccordionContent({
  className,
  ref,
  ...props
}: AccordionContentProps) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "min-w-0 px-4 pb-4 pt-2",
        "text-sm leading-6",
        "text-muted-foreground",
        className,
      )}
    />
  );
}
