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

/*
Import:
import Image from "@/blocks/elements/image/Image";

Props:
- src: image source path or url
- alt: alternative text for the image
- width: image width, default is 600
- height: image height, default is 600
- className: custom classes for styling
- priority: loads image with high priority
- ...props: extra next image attributes
*/
