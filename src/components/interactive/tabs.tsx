
import {
  createContext,
  useContext,
  useId,
  useState,
  type ComponentPropsWithRef,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

import { cn } from "../../lib/utils";

/* -------------------------------------------------------
 * Public Types
 * ----------------------------------------------------- */

type TabsSelectionProps =
  | {
      value: string;
      onValueChange: (value: string) => void;
      defaultValue?: never;
    }
  | {
      defaultValue: string;
      value?: never;
      onValueChange?: (value: string) => void;
    };

export type TabsProps = Omit<
  ComponentPropsWithRef<"div">,
  "defaultValue"
> &
  TabsSelectionProps;

export type TabsListProps =
  ComponentPropsWithRef<"div">;

export type TabsTriggerProps = Omit<
  ComponentPropsWithRef<"button">,
  | "value"
  | "type"
  | "id"
  | "role"
  | "tabIndex"
  | "aria-selected"
  | "aria-controls"
> & {
  value: string;
};

export type TabsContentProps = Omit<
  ComponentPropsWithRef<"div">,
  "id" | "role" | "hidden" | "aria-labelledby"
> & {
  value: string;
};

/* -------------------------------------------------------
 * Private Context
 * ----------------------------------------------------- */

type TabsContextValue = {
  selectedValue: string;
  selectTab: (value: string) => void;
  idPrefix: string;
};

const TabsContext =
  createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(
      "Tabs components must be used inside <Tabs>.",
    );
  }

  return context;
}

/* -------------------------------------------------------
 * Private ID Helpers
 * ----------------------------------------------------- */

function getTabId(prefix: string, value: string) {
  return `${prefix}-tab-${encodeURIComponent(value)}`;
}

function getPanelId(prefix: string, value: string) {
  return `${prefix}-panel-${encodeURIComponent(value)}`;
}

/* -------------------------------------------------------
 * Tabs Root
 * ----------------------------------------------------- */

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  className,
  ref,
  ...props
}: TabsProps) {
  const idPrefix = useId();

  const [internalValue, setInternalValue] =
    useState(defaultValue ?? value ?? "");

  const isControlled = value !== undefined;

  const selectedValue = isControlled
    ? value
    : internalValue;

  function selectTab(nextValue: string) {
    if (nextValue === selectedValue) {
      return;
    }

    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  }

  return (
    <TabsContext.Provider
      value={{
        selectedValue,
        selectTab,
        idPrefix,
      }}
    >
      <div
        {...props}
        ref={ref}
        className={cn(
          "w-full min-w-0",
          className,
        )}
      />
    </TabsContext.Provider>
  );
}

/* -------------------------------------------------------
 * TabsList
 * ----------------------------------------------------- */

export function TabsList({
  className,
  onKeyDown,
  ref,
  ...props
}: TabsListProps) {
  const { selectTab } = useTabsContext();

  function handleKeyDown(
    event: KeyboardEvent<HTMLDivElement>,
  ) {
    onKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    const keys = [
      "ArrowRight",
      "ArrowLeft",
      "Home",
      "End",
    ];

    if (!keys.includes(event.key)) {
      return;
    }

    // Only handle keyboard events originating
    // from an actual tab button.
    if (
      !(event.target instanceof HTMLButtonElement) ||
      event.target.getAttribute("role") !== "tab"
    ) {
      return;
    }

    // Scoped to this tablist, not the whole document.
    // Native disabled buttons are excluded.
    const enabledTabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        'button[role="tab"]:not(:disabled)',
      ),
    );

    const currentIndex = enabledTabs.indexOf(
      event.target,
    );

    if (currentIndex === -1) {
      return;
    }

    const lastIndex = enabledTabs.length - 1;

    let nextIndex = currentIndex;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) %
          enabledTabs.length;
        break;

      case "ArrowLeft":
        nextIndex =
          (currentIndex - 1 + enabledTabs.length) %
          enabledTabs.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = lastIndex;
        break;
    }

    const nextTab = enabledTabs[nextIndex];

    if (!nextTab) {
      return;
    }

    event.preventDefault();

    // Move keyboard focus to the next enabled tab.
    nextTab.focus();

    // Automatic activation:
    // focused tab becomes the selected tab.
    const nextValue = nextTab.getAttribute(
      "data-tabs-value",
    );

    if (nextValue !== null) {
      selectTab(nextValue);
    }
  }

  return (
    <div
      {...props}
      ref={ref}
      role="tablist"
      aria-orientation="horizontal"
      onKeyDown={handleKeyDown}
      className={cn(
        "flex w-full min-w-0 items-center",
        "gap-1 overflow-x-auto",
        "border-b border-border",
        className,
      )}
    />
  );
}

/* -------------------------------------------------------
 * TabsTrigger
 * ----------------------------------------------------- */

export function TabsTrigger({
  value,
  disabled = false,
  className,
  onClick,
  ref,
  ...props
}: TabsTriggerProps) {
  const {
    selectedValue,
    selectTab,
    idPrefix,
  } = useTabsContext();

  const isSelected = selectedValue === value;

function handleClick(
  event: MouseEvent<HTMLButtonElement>,
) {
  onClick?.(event);

  if (!event.defaultPrevented && !disabled) {
    selectTab(value);
  }
}

  return (
    <button
      {...props}
      ref={ref}
      type="button"
      role="tab"
      id={getTabId(idPrefix, value)}
      aria-controls={getPanelId(idPrefix, value)}
      aria-selected={isSelected}
      tabIndex={isSelected && !disabled ? 0 : -1}
      data-tabs-value={value}
      data-state={isSelected ? "active" : "inactive"}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        // Base layout
        "relative inline-flex shrink-0",
        "min-h-11 items-center justify-center",
        "whitespace-nowrap px-4 py-2",

        // Typography and appearance
        "border-b-2 border-transparent",
        "text-sm font-medium",
        "text-muted-foreground",

        // Selected state
        "data-[state=active]:border-primary",
        "data-[state=active]:text-foreground",

        // Keyboard focus
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-inset",
        "focus-visible:ring-ring",

        // Disabled state
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",

        className,
      )}
    />
  );
}

/* -------------------------------------------------------
 * TabsContent
 * ----------------------------------------------------- */

export function TabsContent({
  value,
  className,
  ref,
  ...props
}: TabsContentProps) {
  const {
    selectedValue,
    idPrefix,
  } = useTabsContext();

  const isSelected = selectedValue === value;

  return (
    <div
      {...props}
      ref={ref}
      role="tabpanel"
      id={getPanelId(idPrefix, value)}
      aria-labelledby={getTabId(idPrefix, value)}
      hidden={!isSelected}
      tabIndex={0}
      data-state={isSelected ? "active" : "inactive"}
      className={cn(
        "min-w-0 py-4",
        "outline-none",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-ring",

        // Keeps inactive panels hidden even when
        // consumer classes include display utilities.
        "data-[state=inactive]:hidden",

        className,
      )}
    />
  );
}
