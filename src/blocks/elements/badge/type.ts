export type BadgeVariant = "default" | "success" | "warning" | "danger" | "outline";

export interface BadgeProps {
  children?: any;
  variant?: BadgeVariant;
  leftIcon?: string;
  rightIcon?: string;
  iconSize?: number;
  iconClassName?: string;
  leftIconClassName?: string;
  rightIconClassName?: string;
  className?: string;
  [key: string]: any;
}
