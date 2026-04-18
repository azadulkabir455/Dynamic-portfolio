import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface LucideIconPickerProps<TFieldValues extends FieldValues = FieldValues> {
  control?: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperText?: string;
  helperTextClassName?: string;
  disabled?: boolean;
  /** Max rows in the suggestion list. */
  suggestionLimit?: number;
  [key: string]: unknown;
}
