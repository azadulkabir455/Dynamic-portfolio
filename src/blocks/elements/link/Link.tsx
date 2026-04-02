import { cn } from "@/utilities/helpers/classMerge";
import NextLink from "next/link";
import Icon from "@/blocks/elements/icon/Icon";
import { LinkProps } from "./type";
import Container from "../container/Container";

const variantClasses = {
  default: "text-slate-900 hover:text-slate-700",
  muted: "text-slate-500 hover:text-slate-700",
  primary: "text-blue-600 hover:text-blue-500",
};

const linkClases = "inline-flex items-center gap-1.5 group transition-all duration-300 ease-in-out";

export const Link = ({
  children,
  href,
  variant = "default",
  leftIcon,
  rightIcon,
  iconSize = 16,
  iconClassName,
  leftIconClassName,
  rightIconClassName,
  className,
  ...props
}: LinkProps) => {
  return (
    <NextLink
      href={href}
      className={cn(variantClasses[variant], linkClases, className)}
      {...props}
    >
      {leftIcon ? (
        <Container as="span" className={cn("shrink-0 inline-flex", iconClassName, leftIconClassName)}>
          <Icon name={leftIcon} size={iconSize} className="text-current" />
        </Container>
      ) : null}
      <>{children}</>
      {rightIcon ? (
        <Container as="span" className={cn("shrink-0 inline-flex", iconClassName, rightIconClassName)}>
          <Icon name={rightIcon} size={iconSize} className="text-current" />
        </Container>
      ) : null}
    </NextLink>
  );
};

export default Link;
