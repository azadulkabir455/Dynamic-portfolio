'use client'
import { cn } from "@/utilities/helpers/classMerge";
import { TextProps } from "./type";

export const Text = ({
  children,
  variant = "p",
  className,
  ...props }: TextProps) => { 
  const Component = variant;

  return (
    <Component className={cn(className)} {...props}>
      {children}
    </Component>
  );
};

export default Text;
