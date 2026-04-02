"use client";

import clsx from "clsx";
import Button from "@/blocks/elements/button/Button";
import Container from "@/blocks/elements/container/Container";
import Icon from "@/blocks/elements/icon/Icon";
import { useToTopVisibility } from "./function";
import type { ToTopProps } from "./type";

export const ToTop = ({
  threshold = 200,
  positionClassName = "bottom-6 right-6",
  containerClassName,
  buttonClassName,
  iconName,
  iconSize = 18,
  iconClassName,
  ...props
}: ToTopProps) => {
  const { visible, scrollToTop } = useToTopVisibility(threshold);

  if (!visible) {
    return null;
  }

  return (
    <Container
      as="div"
      size="full"
      className={clsx(
        "pointer-events-none fixed z-40 flex !max-w-none flex justify-center items-center transition-all duration-300",
        positionClassName,
        containerClassName
      )}
      {...props}
    >
      <Button
        type="button"
        size="sm"
        onClick={scrollToTop}
        className={clsx(
          "pointer-events-auto ",
          buttonClassName
        )}
      >
        <Icon
          name={iconName ?? "ChevronUp"}
          size={iconSize}
          className={clsx("shrink-0", iconClassName)}
        />
      </Button>
    </Container>
  );
};

export default ToTop;
