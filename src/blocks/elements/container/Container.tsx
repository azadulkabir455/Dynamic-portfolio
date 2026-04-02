import { createElement, forwardRef } from "react";
import { cn } from "@/utilities/helpers/classMerge";
import { ContainerProps } from "./type";

const sizeClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "",
};

export const Container = forwardRef<HTMLElement, ContainerProps>(function Container(
  {
    children,
    className,
    size = "full",
    as: Component = "div",
    bg,
    bgClassName,
    style,
    ...props
  },
  ref,
) {
  const bgStyle = bg
    ? {
        backgroundImage: `url(${bg.image})`,
        backgroundSize: bg.size ?? "cover",
        backgroundPosition: bg.position ?? "center",
        backgroundRepeat: bg.repeat ?? "no-repeat",
        backgroundAttachment: bg.attachment,
      }
    : undefined;
  const mergedStyle = bgStyle || style ? { ...bgStyle, ...style } : undefined;

  return createElement(
    Component,
    {
      ref,
      className: cn(sizeClasses[size], bgClassName, className),
      style: mergedStyle,
      ...props,
    },
    children,
  );
});

export default Container;
