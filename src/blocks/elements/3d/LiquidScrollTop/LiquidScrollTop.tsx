"use client";

import { motion } from "motion/react";
import { ChevronUp } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { cn } from "@/utilities/helpers/classMerge";
import type { LiquidScrollTopProps } from "./type";

export default function LiquidScrollTop({
  className,
  size = 56,
  reappearScroll = 100,
}: LiquidScrollTopProps) {
  const reactId = useId().replace(/:/g, "");
  const clipId = `lst-clip-${reactId}`;
  const gradId = `lst-grad-${reactId}`;

  const [progress, setProgress] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [awaitingReappear, setAwaitingReappear] = useState(false);

  useEffect(() => {
    const update = () => {
      const root = document.documentElement;
      const y = root.scrollTop;
      const max = Math.max(1, root.scrollHeight - root.clientHeight);
      setProgress(Math.min(1, Math.max(0, y / max)));

      if (awaitingReappear && y < 48) {
        setAwaitingReappear(false);
      }
      if (!awaitingReappear && dismissed && y > reappearScroll) {
        setDismissed(false);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [awaitingReappear, dismissed, reappearScroll]);

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setDismissed(true);
    setAwaitingReappear(true);
  }, []);

  const fillH = progress * 100;
  const surfaceY = 100 - fillH;
  const showLiquid = fillH > 0.35;

  return (
    <motion.button
      type="button"
      aria-label="Scroll to top"
      onClick={handleClick}
      className={cn(
        "fixed bottom-6 right-6 z-40 rounded-full border-0 bg-transparent p-0 shadow-[0_8px_32px_rgba(0,0,0,0.18)] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
        dismissed ? "pointer-events-none" : "pointer-events-auto",
        className,
      )}
      style={{ width: size, height: size }}
      initial={false}
      animate={{
        opacity: dismissed ? 0 : 1,
        scale: dismissed ? 0.35 : 1,
        y: dismissed ? 28 : 0,
      }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      whileHover={dismissed ? undefined : { scale: 1.07 }}
      whileTap={dismissed ? undefined : { scale: 0.93 }}
    >
      <span className="relative block h-full w-full overflow-hidden rounded-full bg-secondary ring-2 ring-primary/40">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <defs>
            <clipPath id={clipId}>
              <circle cx="50" cy="50" r="44" />
            </clipPath>
            <linearGradient id={gradId} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.92" />
              <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.82" />
              <stop offset="100%" stopColor="var(--quaternary)" stopOpacity="0.72" />
            </linearGradient>
          </defs>

          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="var(--primary)"
            strokeOpacity={0.28}
            strokeWidth="2"
          />

          <g clipPath={`url(#${clipId})`}>
            <rect x="0" y="0" width="100" height="100" fill="var(--secondary)" />

            {showLiquid ? (
              <>
                <motion.rect
                  x={0}
                  width={100}
                  fill={`url(#${gradId})`}
                  initial={false}
                  animate={{
                    y: surfaceY,
                    height: fillH,
                  }}
                  transition={{ type: "spring", stiffness: 95, damping: 19 }}
                />
                <motion.g
                  initial={false}
                  animate={{ y: surfaceY - 7 }}
                  transition={{ type: "spring", stiffness: 95, damping: 19 }}
                >
                  <motion.g
                    animate={{ x: [-12, 4, -12] }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.path
                      fill="var(--primary)"
                      fillOpacity={0.38}
                      initial={false}
                      animate={{
                        d: [
                          "M-24,10 Q6,2 36,10 T96,10 T156,10 L156,22 L-24,22 Z",
                          "M-24,10 Q6,16 36,10 T96,10 T156,10 L156,22 L-24,22 Z",
                          "M-24,10 Q6,2 36,10 T96,10 T156,10 L156,22 L-24,22 Z",
                        ],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.g>
                  <motion.g
                    animate={{ x: [6, -10, 6] }}
                    transition={{
                      duration: 2.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                  >
                    <motion.path
                      fill="var(--secondary)"
                      fillOpacity={0.4}
                      initial={false}
                      animate={{
                        d: [
                          "M-28,12 Q2,4 38,12 T98,12 T158,12 L158,24 L-28,24 Z",
                          "M-28,12 Q2,18 38,12 T98,12 T158,12 L158,24 L-28,24 Z",
                          "M-28,12 Q2,4 38,12 T98,12 T158,12 L158,24 L-28,24 Z",
                        ],
                      }}
                      transition={{
                        duration: 1.9,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4,
                      }}
                    />
                  </motion.g>
                </motion.g>
              </>
            ) : null}
          </g>
        </svg>

        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <ChevronUp
            className="relative z-[1] drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]"
            size={Math.round(size * 0.36)}
            strokeWidth={2.25}
            color="var(--ternary)"
          />
        </span>
      </span>
    </motion.button>
  );
}
