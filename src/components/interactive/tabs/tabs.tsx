
import {
  createContext,
  useContext,
  useId,
  useState,
  type ComponentPropsWithRef,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

import { cn } from "../../../lib/utils";

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



function getTabId(
  prefix: string,
  value: string,
) {
  return `${prefix}-tab-${encodeURIComponent(value)}`;
}

function getPanelId(
  prefix: string,
  value: string,
) {
  return `${prefix}-panel-${encodeURIComponent(value)}`;
}


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
    useState(defaultValue ?? "");

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

    if (
      event.key !== "ArrowRight" &&
      event.key !== "ArrowLeft" &&
      event.key !== "Home" &&
      event.key !== "End"
    ) {
      return;
    }

    const target = event.target;

    if (
      !(target instanceof HTMLButtonElement) ||
      target.getAttribute("role") !== "tab" ||
      target.parentElement !== event.currentTarget
    ) {
      return;
    }

    const enabledTabs = Array.from(
      event.currentTarget.children,
    ).filter(
      (
        element,
      ): element is HTMLButtonElement =>
        element instanceof HTMLButtonElement &&
        element.getAttribute("role") === "tab" &&
        !element.disabled,
    );

    const currentIndex =
      enabledTabs.indexOf(target);

    if (
      currentIndex === -1 ||
      enabledTabs.length === 0
    ) {
      return;
    }

    const lastIndex =
      enabledTabs.length - 1;

    let nextIndex = currentIndex;

    switch (event.key) {
      case "ArrowRight":
        nextIndex =
          (currentIndex + 1) %
          enabledTabs.length;
        break;

      case "ArrowLeft":
        nextIndex =
          (currentIndex - 1 +
            enabledTabs.length) %
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

    nextTab.focus();

    // Keep keyboard-focused tabs visible in
    // horizontally scrollable tab lists.
    nextTab.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    });

    const nextValue =
      nextTab.getAttribute("data-tabs-value");

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

  const isSelected =
    selectedValue === value;

  function handleClick(
    event: MouseEvent<HTMLButtonElement>,
  ) {
    onClick?.(event);

    if (
      !event.defaultPrevented &&
      !disabled
    ) {
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
      aria-controls={getPanelId(
        idPrefix,
        value,
      )}
      aria-selected={isSelected}
      tabIndex={
        isSelected && !disabled ? 0 : -1
      }
      data-tabs-value={value}
      data-state={
        isSelected ? "active" : "inactive"
      }
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        // Layout
        "relative inline-flex shrink-0",
        "min-h-11 items-center justify-center",
        "whitespace-nowrap px-4 py-2",

        // Typography and border
        "border-b-2 border-transparent",
        "text-sm font-medium",
        "text-muted-foreground",

        // Hover
        "hover:text-foreground",

        // Selected
        "data-[state=active]:border-primary",
        "data-[state=active]:text-foreground",

        // Keyboard focus
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-inset",
        "focus-visible:ring-ring",

        // Disabled
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        "disabled:hover:text-muted-foreground",

        className,
      )}
    />
  );
}


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

  const isSelected =
    selectedValue === value;

  return (
    <div
      {...props}
      ref={ref}
      role="tabpanel"
      id={getPanelId(idPrefix, value)}
      aria-labelledby={getTabId(
        idPrefix,
        value,
      )}
      hidden={!isSelected}
      tabIndex={0}
      data-state={
        isSelected ? "active" : "inactive"
      }
      className={cn(
        "min-w-0 py-4",
        "outline-none",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-ring",
        "data-[state=inactive]:hidden",
        className,
      )}
    />
  );
}
