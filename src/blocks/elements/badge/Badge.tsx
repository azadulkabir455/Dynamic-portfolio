
import Icon from "@/blocks/elements/icon/Icon";
import { BadgeProps } from "./type";
import Container from "@/blocks/elements/container/Container";
import { cn } from "@/utilities/helpers/classMerge";

const variantClasses = {
  default: "bg-slate-900 text-white",
  success: "bg-green-100 text-green-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
  outline: "border border-slate-300 text-slate-700",
};

export const Badge = ({
  children,
  variant = "default",
  leftIcon,
  rightIcon,
  iconSize = 14,
  iconClassName,
  leftIconClassName,
  rightIconClassName,
  className,
  ...props
}: BadgeProps) => {
  return (
    <Container
      as="span"
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {leftIcon ? (
        <span className={cn("shrink-0 inline-flex transition-transform duration-200 group-hover:-translate-x-0.5", iconClassName, leftIconClassName)}>
          <Icon name={leftIcon} size={iconSize} className="text-current" />
        </span>
      ) : null}
      {children}
      {rightIcon ? (
        <span className={cn("shrink-0 inline-flex transition-transform duration-200 group-hover:translate-x-0.5", iconClassName, rightIconClassName)}>
          <Icon name={rightIcon} size={iconSize} className="text-current" />
        </span>
      ) : null}
    </Container>
  );
};

export default Badge;

/*
Import:
import Badge from "@/blocks/elements/badge/Badge";

Props:
- children: content inside the badge
- variant: visual style of the badge
- leftIcon: lucide icon name for the left side
- rightIcon: lucide icon name for the right side
- iconSize: size of the badge icon
- iconClassName: shared classes for both icons
- leftIconClassName: classes only for the left icon (badge hover = group-hover: classes work)
- rightIconClassName: classes only for the right icon (badge hover = group-hover: classes work)
- className: custom classes for styling
- ...props: extra native span attributes

On badge hover: left icon moves slightly left, right icon moves slightly right (override with your leftIconClassName/rightIconClassName).
*/
