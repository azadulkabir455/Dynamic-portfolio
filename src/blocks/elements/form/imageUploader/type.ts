import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface ImageUploaderProps<TFieldValues extends FieldValues = FieldValues> {
  control?: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  labelClassName?: string;
  helperText?: string;
  helperTextClassName?: string;
  /** Passed to the hidden file input. Default `image/*`. */
  accept?: string;
  /** Max file size in bytes (default 5MB). */
  maxFileBytes?: number;
  /** Browser `confirm()` message before clearing the value. */
  confirmRemoveMessage?: string;
  disabled?: boolean;
  /** Root wrapper for the control area. */
  className?: string;
  /** Empty state (drop zone) surface. */
  dropzoneClassName?: string;
  /** Wrapper around the preview image. */
  previewClassName?: string;
  [key: string]: unknown;
}
