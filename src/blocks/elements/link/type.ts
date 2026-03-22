export type LinkVariant = "default" | "muted" | "primary";

export interface LinkProps {
  children?: React.ReactNode;
  href: string;
  variant?: LinkVariant;
  leftIcon?: string;
  rightIcon?: string;
  iconSize?: number;
  iconClassName?: string;
  leftIconClassName?: string;
  rightIconClassName?: string;
  className?: string;
  [key: string]: any;
}
