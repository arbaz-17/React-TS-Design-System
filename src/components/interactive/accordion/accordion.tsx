
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  type ComponentPropsWithRef,
  type Ref,
} from "react";

import { cn } from "../../../lib/utils";

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


function assignRef<T>(
  ref: Ref<T> | undefined,
  value: T | null,
) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}


export function Accordion({
  type = "multiple",
  className,
  ref,
  ...props
}: AccordionProps) {
  const id = useId();

  const groupName =
    type === "single"
      ? `accordion-${id}`
      : undefined;

  return (
    <AccordionContext.Provider
      value={{ groupName }}
    >
      <div
        {...props}
        ref={ref}
        className={cn(
          "w-full min-w-0",
          "overflow-hidden rounded-surface",
          "border border-border",
          className,
        )}
      />
    </AccordionContext.Provider>
  );
}


export function AccordionItem({
  defaultOpen = false,
  className,
  ref,
  ...props
}: AccordionItemProps) {
  const { groupName } = useAccordionContext();

  const initializedRef = useRef(false);
  const initialOpenRef = useRef(defaultOpen);

  const setDetailsRef = useCallback(
    (node: HTMLDetailsElement | null) => {
      if (node && !initializedRef.current) {
        node.open = initialOpenRef.current;
        initializedRef.current = true;
      }

      assignRef(ref, node);
    },
    [ref],
  );

  return (
    <details
      {...props}
      ref={setDetailsRef}
      name={groupName}
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
        // Preserve native disclosure marker
        "list-item list-inside",
        "cursor-pointer",

        // Spacing and typography
        "px-4 py-3",
        "text-sm font-medium leading-6",
        "text-foreground",
        "marker:text-muted-foreground",

        // Interaction
        "hover:bg-muted/30",
        "group-open:bg-muted/40",

        // Keyboard focus
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-inset",
        "focus-visible:ring-ring",

        className,
      )}
    />
  );
}


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
