export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  children?: any;
  size?: ButtonSize;
  href?: string;
  leftIcon?: string;
  rightIcon?: string;
  iconSize?: number;
  iconClassName?: string;
  leftIconClassName?: string;
  rightIconClassName?: string;
  /** Wraps the right icon (e.g. circular frosted bg). */
  rightIconWrapperClassName?: string;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  [key: string]: any;
}
