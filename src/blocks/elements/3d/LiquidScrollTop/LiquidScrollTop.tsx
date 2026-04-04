"use client";

import { motion } from "motion/react";
import { ChevronUp } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { cn } from "@/utilities/helpers/classMerge";
import type { LiquidScrollTopProps } from "./type";
import Container from "../../container/Container";

export default function LiquidScrollTop({
  className,
  size = 56,
  hideNearTopPx = 320,
}: LiquidScrollTopProps) {
  const reactId = useId().replace(/:/g, "");
  const clipId = `lst-clip-${reactId}`;

  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [dismissedAfterClick, setDismissedAfterClick] = useState(false);

  useEffect(() => {
    const update = () => {
      const root = document.documentElement;
      const y = root.scrollTop;
      const max = Math.max(1, root.scrollHeight - root.clientHeight);
      setScrollY(y);
      setProgress(Math.min(1, Math.max(0, y / max)));

      if (y <= hideNearTopPx) {
        setDismissedAfterClick(false);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [hideNearTopPx]);

  const handleClick = useCallback(() => {
    setDismissedAfterClick(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const isHidden = scrollY <= hideNearTopPx || dismissedAfterClick;

  const fillH = progress * 100;
  const surfaceY = 100 - fillH;
  const showLiquid = fillH > 0.12;

  return (
    <motion.button
      type="button"
      aria-label="Scroll to top"
      onClick={handleClick}
      className={cn(
        "cursor-target fixed bottom-6 right-8 z-40 rounded-full border-0 bg-transparent p-0 shadow-[0_8px_32px_rgba(0,0,0,0.18)] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
        isHidden ? "pointer-events-none" : "pointer-events-auto",
        className,
      )}
      style={{ width: size, height: size }}
      initial={false}
      animate={{
        opacity: isHidden ? 0 : 1,
        scale: isHidden ? 0.35 : 1,
        y: isHidden ? 28 : 0,
      }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      whileHover={isHidden ? undefined : { scale: 1.07 }}
      whileTap={isHidden ? undefined : { scale: 0.93 }}
    >
      <Container
        as="span"
        className="relative block h-full w-full overflow-hidden rounded-full border-2 border-secondary bg-[var(--ternary)]"
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <defs>
            <clipPath id={clipId}>
              <circle cx="50" cy="50" r="44" />
            </clipPath>
          </defs>

          <g clipPath={`url(#${clipId})`}>
            <rect x="0" y="0" width="100" height="100" fill="var(--ternary)" />

            {showLiquid ? (
              <>
                <motion.rect
                  x={0}
                  width={100}
                  fill="var(--primary)"
                  initial={false}
                  animate={{
                    y: surfaceY,
                    height: fillH,
                  }}
                  transition={{ type: "spring", stiffness: 78, damping: 16, mass: 0.85 }}
                />
                <motion.g
                  initial={false}
                  animate={{ y: surfaceY - 9 }}
                  transition={{ type: "spring", stiffness: 78, damping: 16, mass: 0.85 }}
                >
                  <motion.g
                    animate={{ x: [-18, 10, -18] }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.path
                      fill="var(--primary)"
                      initial={false}
                      animate={{
                        d: [
                          "M-40,6 C-10,-2 20,14 50,6 S110,-2 140,6 S200,14 220,6 L220,26 L-40,26 Z",
                          "M-40,6 C-10,14 20,-2 50,6 S110,14 140,6 S200,-2 220,6 L220,26 L-40,26 Z",
                          "M-40,6 C-10,-2 20,14 50,6 S110,-2 140,6 S200,14 220,6 L220,26 L-40,26 Z",
                        ],
                      }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.g>
                  <motion.g
                    animate={{ x: [14, -16, 14] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.15,
                    }}
                  >
                    <motion.path
                      fill="var(--primary)"
                      initial={false}
                      animate={{
                        d: [
                          "M-36,10 C-6,2 34,18 64,10 S124,2 154,10 S194,18 224,10 L224,28 L-36,28 Z",
                          "M-36,10 C-6,18 34,2 64,10 S124,18 154,10 S194,2 224,10 L224,28 L-36,28 Z",
                          "M-36,10 C-6,2 34,18 64,10 S124,2 154,10 S194,18 224,10 L224,28 L-36,28 Z",
                        ],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.35,
                      }}
                    />
                  </motion.g>
                  <motion.g
                    animate={{ x: [-6, 8, -6] }}
                    transition={{
                      duration: 1.85,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.45,
                    }}
                  >
                    <motion.path
                      fill="var(--primary)"
                      initial={false}
                      animate={{
                        d: [
                          "M-32,12 C2,6 48,20 78,12 S138,6 168,12 S208,20 232,12 L232,22 L-32,22 Z",
                          "M-32,12 C2,20 48,4 78,12 S138,20 168,12 S208,4 232,12 L232,22 L-32,22 Z",
                          "M-32,12 C2,6 48,20 78,12 S138,6 168,12 S208,20 232,12 L232,22 L-32,22 Z",
                        ],
                      }}
                      transition={{
                        duration: 1.75,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.g>
                </motion.g>
              </>
            ) : null}
          </g>
        </svg>

        <Container
          as="span"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <ChevronUp
            className="relative z-[1] drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
            size={Math.round(size * 0.52)}
            strokeWidth={2.6}
            color="var(--secondary)"
          />
        </Container>
      </Container>
    </motion.button>
  );
}
