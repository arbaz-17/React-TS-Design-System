
/**
 * Design System — Public Component API
 *
 * Only export components and types intended
 * for consumers of the design system.
 */

// Button
export { Button } from "./primitives/button/button";
export type { ButtonProps } from "./primitives/button/button";

// Input
export { Input } from "./primitives/input/input";
export type {
  InputProps,
  InputType,
} from "./primitives/input/input";

// Textarea
export { Textarea } from "./primitives/textarea/textarea";
export type { TextareaProps } from "./primitives/textarea/textarea";

// Checkbox
export { Checkbox } from "./primitives/checkbox/checkbox";
export type { CheckboxProps } from "./primitives/checkbox/checkbox";

// Badge
export { Badge } from "./primitives/badge/badge";
export type { BadgeProps } from "./primitives/badge/badge";


export { Select } from "./primitives/select/select";
export type { SelectProps } from "./primitives/select/select";

// Skeleton
export { Skeleton } from "./primitives/skeleton/skeleton";
export type { SkeletonProps } from "./primitives/skeleton/skeleton";

export { Switch } from "./primitives/switch/switch";
export type { SwitchProps } from "./primitives/switch/switch";


export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./composites/card/card";

export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from "./composites/card/card";



// Shared Composites — Alert

export {
  Alert,
  AlertTitle,
  AlertDescription,
} from "./composites/alert/alert";

export type {
  AlertProps,
  AlertTitleProps,
  AlertDescriptionProps,
} from "./composites/alert/alert";




// Shared Composites — FormField

export {
  FormField,
  FormLabel,
  FormDescription,
  FormMessage,
} from "./composites/form-field/form-field";

export type {
  FormFieldProps,
  FormLabelProps,
  FormDescriptionProps,
  FormMessageProps,
} from "./composites/form-field/form-field";




// Shared Composites — EmptyState

export {
  EmptyState,
  EmptyStateVisual,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
} from "./composites/empty-state/empty-state";

export type {
  EmptyStateProps,
  EmptyStateVisualProps,
  EmptyStateTitleProps,
  EmptyStateDescriptionProps,
  EmptyStateActionsProps,
} from "./composites/empty-state/empty-state";



// Shared Composites — Table

export {
  TableContainer,
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "./composites/table/table";

export type {
  TableContainerProps,
  TableProps,
  TableCaptionProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
} from "./composites/table/table";




// Advanced Interactive Components — Dialog

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./interactive/dialog/dialog";

export type {
  DialogProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogCloseProps,
} from "./interactive/dialog/dialog";




// Advanced Interactive Components — Tabs

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./interactive/tabs/tabs";

export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from "./interactive/tabs/tabs";




// Advanced Interactive Components — Accordion

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./interactive/accordion/accordion";

export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from "./interactive/accordion/accordion";




// Advanced Interactive Components — Tooltip

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./interactive/tooltip/tooltip";

export type {
  TooltipProviderProps,
  TooltipProps,
  TooltipTriggerProps,
  TooltipContentProps,
} from "./interactive/tooltip/tooltip";
