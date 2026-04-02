import { cn } from "@/utilities/helpers/classMerge";
import NextLink from "next/link";
import Icon from "@/blocks/elements/icon/Icon";
import { ButtonProps } from "./type";


const sizeClasses = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-6 text-base",
};

export const Button = ({
  children,
  size = "md",
  href,
  leftIcon,
  rightIcon,
  iconSize = 16,
  iconClassName,
  leftIconClassName,
  rightIconClassName,
  loading = false,
  className,
  disabled = false,
  type = "button",
  ...props
}: ButtonProps) => {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    sizeClasses[size],
    (disabled || loading) && "pointer-events-none opacity-50",
    className
  );

  const content = (
    <>
      {leftIcon ? (
        <Icon name={leftIcon} size={iconSize} className={cn("shrink-0", iconClassName, leftIconClassName)} />
      ) : null}
      <span>{children}</span>
      {loading ? (
        <Icon name="LoaderCircle" size={iconSize} className={cn("shrink-0 animate-spin", iconClassName, rightIconClassName)} />
      ) : rightIcon ? (
        <Icon name={rightIcon} size={iconSize} className={cn("shrink-0", iconClassName, rightIconClassName)} />
      ) : null}
    </>
  );

  if (href) {
    return (
      <NextLink href={href} className={classes} aria-disabled={disabled || loading} {...props}>
        {content}
      </NextLink>
    );
  }

  return (
    <button type={type} disabled={disabled || loading} className={classes} {...props}>
      {content}
    </button>
  );
};

export default Button;
