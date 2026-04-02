import { cn } from "@/utilities/helpers/classMerge";
import NextImage from "next/image";
import { ImageProps } from "./type";

export const Image = ({
  src,
  alt,
  width = 600,
  height = 600,
  className,
  priority = false,
  fill,
  ...props
}: ImageProps) => {
  return (
    <NextImage
      src={src}
      alt={alt}
      {...(fill
        ? { fill: true }
        : { width, height })}
      priority={priority}
      className={cn(className)}
      {...props}
    />
  );
};

export default Image;
