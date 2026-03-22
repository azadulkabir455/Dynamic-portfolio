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

/*
Import:
import Text from "@/blocks/elements/text/Text";

Props:
- children: content to render inside the element
- variant: HTML tag to render, default is "p"
- className: custom classes for styling
- ...props: extra native HTML attributes
*/
