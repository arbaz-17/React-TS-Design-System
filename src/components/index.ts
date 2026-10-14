
/**
 * Design System — Public Component API
 *
 * Only export components and types intended
 * for consumers of the design system.
 */

// Button
export { Button } from "./primitives/button";
export type { ButtonProps } from "./primitives/button";

// Input
export { Input } from "./primitives/input";
export type {
  InputProps,
  InputType,
} from "./primitives/input";

// Textarea
export { Textarea } from "./primitives/textarea";
export type { TextareaProps } from "./primitives/textarea";

// Checkbox
export { Checkbox } from "./primitives/checkbox";
export type { CheckboxProps } from "./primitives/checkbox";

// Badge
export { Badge } from "./primitives/badge";
export type { BadgeProps } from "./primitives/badge";


export { Select } from "./primitives/select";
export type { SelectProps } from "./primitives/select";

// Skeleton
export { Skeleton } from "./primitives/skeleton";
export type { SkeletonProps } from "./primitives/skeleton";

export { Switch } from "./primitives/switch";
export type { SwitchProps } from "./primitives/switch";


export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./composites/card";

export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from "./composites/card";



// Shared Composites — Alert

export {
  Alert,
  AlertTitle,
  AlertDescription,
} from "./composites/alert";

export type {
  AlertProps,
  AlertTitleProps,
  AlertDescriptionProps,
} from "./composites/alert";




// Shared Composites — FormField

export {
  FormField,
  FormLabel,
  FormDescription,
  FormMessage,
} from "./composites/form-field";

export type {
  FormFieldProps,
  FormLabelProps,
  FormDescriptionProps,
  FormMessageProps,
} from "./composites/form-field";




// Shared Composites — EmptyState

export {
  EmptyState,
  EmptyStateVisual,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
} from "./composites/empty-state";

export type {
  EmptyStateProps,
  EmptyStateVisualProps,
  EmptyStateTitleProps,
  EmptyStateDescriptionProps,
  EmptyStateActionsProps,
} from "./composites/empty-state";



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
} from "./composites/table";

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
} from "./composites/table";
