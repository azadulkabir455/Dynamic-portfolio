"use client";

import { ArrowDown } from "lucide-react";
import { useCallback } from "react";
import Container from "@/blocks/elements/container/Container";
import { Button } from "@/blocks/elements/button/Button";
import type { ScrollDownButtonProps } from "./type";
import { getScrollTargetY } from "./functions";
import { cn } from "@/utilities/helpers/classMerge";

const ScrollDownButton = ({
  parentClassName = "",
  buttonClassName = "",
  scrollByPx,
}: ScrollDownButtonProps) => {
  const handleClick = useCallback(() => {
    const y = getScrollTargetY(scrollByPx);
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [scrollByPx]);

  return (
    <Container as="div" className={cn("inline-flex", parentClassName)}>
      <Button
        type="button"
        onClick={handleClick}
        aria-label="Scroll down"
        className={cn(
          "group relative inline-flex h-16 w-7 items-center justify-center rounded-full",
          "border border-white/60 bg-white/10 backdrop-blur-sm",
          "transition hover:bg-white/15",
          buttonClassName,
        )}
      >
        <Container as="span"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-full",
            "opacity-0 ring-1 ring-white/50",
            "transition group-hover:opacity-100",
          )}
        />
        <ArrowDown className="h-4 w-4 text-white/95 animate-[scrollDownBounce_1.2s_ease-in-out_infinite]" />

        <style jsx>{`
          @keyframes scrollDownBounce {
            0%,
            100% {
              transform: translateY(-2px);
              opacity: 0.85;
            }
            50% {
              transform: translateY(4px);
              opacity: 1;
            }
          }
        `}</style>
      </Button>
    </Container>
  );
};

export default ScrollDownButton;

