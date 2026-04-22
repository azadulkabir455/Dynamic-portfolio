import Button from "@/blocks/elements/button/Button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn } from "@/utilities/helpers/classMerge";
import type { SliderArrowProps } from "./type";

export default function Arrow({
  className,
  onClick,
  direction,
}: SliderArrowProps) {
  return (
    <Button
      type="button"
      size="sm"
      className={cn(
        "cursor-target",
        "!h-12 !min-h-12 !w-12 !min-w-12 !max-w-12 !gap-0 !p-0 ",
        "skill-slider-arrow !rounded-full !border-primary !bg-secondary !text-primary !shadow-none hover:!bg-primary hover:!text-secondary ",
        className,
      )}
      onClick={onClick}
      aria-label={direction === "left" ? "Previous slide" : "Next slide"}
    >
      {direction === "left" ? (
        <FiChevronLeft
          aria-hidden
          className="text-[34px]"
          strokeWidth={3.4}
        />
      ) : (
        <FiChevronRight
          aria-hidden
          className="text-[34px]"
          strokeWidth={3.4}
        />
      )}
    </Button>
  );
}
