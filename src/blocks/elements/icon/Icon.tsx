
import * as LucideIcons from "lucide-react";
import { IconProps } from "./type";
import { cn } from "@/utilities/helpers/classMerge";

export const Icon = ({
  name = "Package",
  size = 20,
  color,
  hoverColor,
  className,
  strokeWidth = 2,
  ...props
}: IconProps) => {
  const LucideIcon = (LucideIcons as Record<string, any>)[name] || LucideIcons.Circle;

  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      className={cn(color, hoverColor, className)}  
      {...props}
    />
  );
};

export default Icon;

/*
Import:
import Icon from "@/blocks/elements/icon/Icon";

Props:
- name: lucide icon name, example "ShoppingCart" or "Heart"
- size: icon size in px
- color: text color class for the icon
- hoverColor: hover color class for the icon
- className: custom classes for styling
- strokeWidth: line thickness of the icon
- ...props: extra native svg attributes
*/
