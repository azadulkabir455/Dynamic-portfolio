"use client";

import { motion } from "motion/react";
import { Play } from "lucide-react";
import Container from "@/blocks/elements/container/Container";
import { cn } from "@/utilities/helpers/classMerge";
import type { PulseVideoButtonProps } from "./type";

const PulseVideoButton = ({
  onClick,
  className,
  ariaLabel = "Open video",
}: PulseVideoButtonProps) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "relative flex h-80 w-80 shrink-0 cursor-target cursor-pointer items-center justify-center outline-none",
        "focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ternary)]",
        className,
      )}
      style={{ perspective: 900, transformStyle: "preserve-3d" }}
      whileHover={{
        rotateY: -10,
        rotateX: 6,
        scale: 1.05,
        transition: { type: "spring", stiffness: 280, damping: 22 },
      }}
      whileTap={{ scale: 0.97 }}
    >
      <Container
        as="span"
        className={cn(
          "pointer-events-none absolute inset-0 animate-ping rounded-full",
          "bg-primary/40 [animation-duration:2.4s]",
        )}
        aria-hidden
      />
      <Container
        as="span"
        className={cn(
          "pointer-events-none absolute inset-4 animate-ping rounded-full",
          "border-2 border-white/55 [animation-delay:0.4s] [animation-duration:2.4s]",
        )}
        aria-hidden
      />
      <Container
        as="span"
        className={cn(
          "pointer-events-none absolute inset-12 rounded-full",
          "border border-white/45",
        )}
        aria-hidden
      />
      <motion.span
        className={cn(
          "relative z-10 flex h-36 w-36 items-center justify-center rounded-full",
          "border-2 border-white bg-primary/50",
          "shadow-[0_12px_48px_rgba(255,255,255,0.22)]",
        )}
        animate={{
          boxShadow: [
            "0 12px 48px rgba(255,255,255,0.18)",
            "0 22px 56px rgba(255,255,255,0.32)",
            "0 12px 48px rgba(255,255,255,0.18)",
          ],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Play
          className="ml-1.5 h-12 w-12 text-white drop-shadow-md"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          aria-hidden
        />
      </motion.span>
    </motion.button>
  );
};

export default PulseVideoButton;
