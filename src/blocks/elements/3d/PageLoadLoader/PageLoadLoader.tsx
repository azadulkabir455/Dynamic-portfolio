"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import Container from "@/blocks/elements/container/Container";
import { cn } from "@/utilities/helpers/classMerge";
import {
  documentSettleDelayMs,
  runAfterDocumentSettled,
  usePageLoadLoader,
} from "./functions";
import type { PageLoadLoaderProps } from "./type";

type LoaderPhase = "counting" | "exiting" | "done";

/** Visual ramp toward ~95% while waiting; no fixed minimum exit time — exit follows `contentReady`. */
const countRampMs = 12000;
const exitDuration = 0.72;

const ringView = 200;
const ringR = 82;
const ringC = 2 * Math.PI * ringR;

const PageLoadLoader = ({ className }: PageLoadLoaderProps) => {
  const gate = usePageLoadLoader();
  const contentReady = gate?.contentReady ?? true;
  const markLoaderExited = gate?.markLoaderExited ?? (() => {});

  const [phase, setPhase] = useState<LoaderPhase>("counting");
  const [count, setCount] = useState(1);
  const [documentSettled, setDocumentSettled] = useState(false);

  const progress = useMemo(() => count / 100, [count]);

  const loaderActive = phase !== "done";

  useEffect(() => {
    if (!loaderActive) return;
    const prevOverflow = document.body.style.overflow;
    const prevCursor = document.body.style.cursor;
    document.body.dataset.pageLoader = "active";
    document.body.style.overflow = "hidden";
    document.body.style.cursor = "auto";

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.cursor = prevCursor;
      delete document.body.dataset.pageLoader;
    };
  }, [loaderActive]);

  useEffect(() => {
    return runAfterDocumentSettled(() => setDocumentSettled(true), documentSettleDelayMs);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const start = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;
      if (contentReady) {
        setCount(100);
        return;
      }
      const t = Math.min(1, (now - start) / countRampMs);
      const next = Math.min(95, Math.round(t * 94) + 1);
      setCount(next);
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => {
      cancelled = true;
    };
  }, [contentReady]);

  useEffect(() => {
    if (phase !== "counting") return;
    if (!documentSettled || !contentReady) return;
    setPhase("exiting");
  }, [phase, documentSettled, contentReady]);

  useEffect(() => {
    if (phase === "done") {
      markLoaderExited();
    }
  }, [phase, markLoaderExited]);

  if (phase === "done") return null;

  const isExiting = phase === "exiting";

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Page loading"
      className={cn(
        "fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-primary",
        className,
      )}
      initial={false}
      animate={{
        y: isExiting ? "100%" : 0,
        opacity: 1,
      }}
      transition={{
        y: {
          duration: isExiting ? exitDuration : 0,
          ease: [0.76, 0, 0.24, 1],
        },
        opacity: { duration: 0 },
      }}
      onAnimationComplete={() => {
        setPhase((p) => (p === "exiting" ? "done" : p));
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-[20%] top-1/4 size-[55vmin] rounded-full bg-secondary/25 blur-[80px]"
        animate={{
          x: [0, 28, -12, 0],
          y: [0, -20, 14, 0],
          scale: [1, 1.12, 0.96, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-[15%] bottom-[15%] size-[48vmin] rounded-full bg-secondary/20 blur-[70px]"
        animate={{
          x: [0, -24, 16, 0],
          y: [0, 22, -10, 0],
          scale: [1.05, 0.94, 1.08, 1.05],
        }}
        transition={{
          duration: 9.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[35vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color-mix(in_srgb,var(--ternary)_32%,transparent)] blur-[90px]"
        animate={{
          opacity: [0.35, 0.65, 0.4, 0.35],
          scale: [1, 1.18, 1.05, 1],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Container
        as="div"
        className={cn(
          "relative flex items-center justify-center",
          "[perspective:1000px] [transform-style:preserve-3d]",
        )}
      >
        <svg
          className="pointer-events-none absolute size-[min(78vw,24rem)] -rotate-90"
          viewBox={`0 0 ${ringView} ${ringView}`}
          aria-hidden
        >
          <circle
            cx={ringView / 2}
            cy={ringView / 2}
            r={ringR}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            className="text-secondary/20"
          />
          <circle
            cx={ringView / 2}
            cy={ringView / 2}
            r={ringR}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={ringC}
            strokeDashoffset={ringC * (1 - progress)}
            className="text-secondary"
          />
        </svg>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 scale-150 rounded-full bg-secondary/15 blur-3xl"
          animate={
            isExiting
              ? { scale: 1.2, opacity: 0.5 }
              : { scale: [1.4, 1.65, 1.45], opacity: [0.35, 0.55, 0.4] }
          }
          transition={
            isExiting
              ? { duration: 0.35 }
              : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          }
        />

        <motion.span
          className={cn(
            "font-antonio relative z-[1] block text-[clamp(4rem,18vw,10rem)] font-normal leading-none",
            "text-secondary tabular-nums tracking-tight",
            "drop-shadow-[0_8px_40px_rgba(0,0,0,0.35)]",
          )}
          style={{ transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.82, rotateX: 18, filter: "blur(10px)" }}
          animate={
            isExiting
              ? {
                  opacity: 0.85,
                  scale: 0.96,
                  rotateX: 4,
                  y: 12,
                  filter: "blur(0px)",
                }
              : {
                  opacity: 1,
                  scale: 1,
                  rotateX: [6, -4, 6],
                  y: [0, -6, 0],
                  rotateZ: [-0.8, 0.8, -0.8],
                  filter: "blur(0px)",
                }
          }
          transition={
            isExiting
              ? { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
              : {
                  opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                  rotateX: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
                  rotateZ: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }
          }
        >
          {count}
        </motion.span>
      </Container>
    </motion.div>
  );
};

export default PageLoadLoader;
