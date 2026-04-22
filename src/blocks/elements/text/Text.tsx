'use client'
import { cn } from "@/utilities/helpers/classMerge";
import { TextProps } from "./type";

export const Text = ({
  children,
  variant = "p",
  className,
  dangerouslySetInnerHTML,
  ...props
}: TextProps) => {
  const Component = variant;

  if (dangerouslySetInnerHTML) {
    return (
      <Component
        className={cn(className)}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        {...props}
      />
    );
  }

  return (
    <Component className={cn(className)} {...props}>
      {children}
    </Component>
  );
};

export default Text;
