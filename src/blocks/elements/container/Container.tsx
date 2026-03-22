import { cn } from "@/utilities/helpers/classMerge";
import { ContainerProps } from "./type";

const sizeClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "",
};

export const Container = ({
  children,
  className,
  size = "full",
  as = "div",
  bg,
  bgClassName,
  style,
  ...props
}: ContainerProps) => {
  const Component = as;
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

  return (
    <Component
      className={cn(sizeClasses[size], bgClassName, className)}
      style={mergedStyle}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;

/*
Import:
import Container from "@/blocks/elements/container/Container";

Props:
- children: content inside the container
- size: controls max width of the layout
- as: chooses the HTML tag, "div" | "section" | "span"
- bg: background image and properties — { image, size?, position?, repeat?, attachment? }
- bgClassName: Tailwind classes for bg (e.g. "bg-cover bg-center bg-no-repeat")
- className: custom classes for styling
- ...props: extra native HTML attributes
*/
