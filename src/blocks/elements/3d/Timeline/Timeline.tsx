"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Text from "@/blocks/elements/text/Text";
import { cn } from "@/utilities/helpers/classMerge";
import { getTimelineKey } from "./functions";
import type { TimelineItem, TimelineProps } from "./type";

const SCROLL_OFFSET: ["start start", "end end"] = ["start start", "end end"];

const Timeline = ({
  items,
  className,
  showSpine = true,
  onActiveIndexChange,
  scrollTargetRef,
}: TimelineProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const firstOrbRef = useRef<HTMLDivElement | null>(null);
  const lastOrbRef = useRef<HTMLDivElement | null>(null);
  const [spineLine, setSpineLine] = useState<{
    top: number;
    height: number;
  } | null>(null);
  const [spineFillHeight, setSpineFillHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: SCROLL_OFFSET,
  });

  useLayoutEffect(() => {
    if (!showSpine || items.length < 2) {
      setSpineLine(null);
      return;
    }

    const update = () => {
      const track = trackRef.current;
      const first = firstOrbRef.current;
      const last = lastOrbRef.current;
      if (!track || !first || !last) {
        setSpineLine(null);
        return;
      }
      const tr = track.getBoundingClientRect();
      const fr = first.getBoundingClientRect();
      const lr = last.getBoundingClientRect();
      const top = fr.top + fr.height / 2 - tr.top;
      const endY = lr.top + lr.height / 2 - tr.top;
      const height = endY - top;
      setSpineLine({ top, height: Math.max(0, height) });
    };

    update();
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => {
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [items.length, showSpine]);

  const applyScrollProgress = useCallback(
    (p: number) => {
      const clamped = Math.min(1, Math.max(0, p));
      if (spineLine && spineLine.height > 0) {
        setSpineFillHeight(clamped * spineLine.height);
      } else {
        setSpineFillHeight(0);
      }
      if (onActiveIndexChange && items.length) {
        const idx = Math.min(
          items.length - 1,
          Math.floor(clamped * items.length - 1e-9),
        );
        onActiveIndexChange(idx);
      }
    },
    [spineLine, items.length, onActiveIndexChange],
  );

  useMotionValueEvent(scrollYProgress, "change", applyScrollProgress);

  useLayoutEffect(() => {
    applyScrollProgress(scrollYProgress.get());
  }, [scrollYProgress, applyScrollProgress]);

  if (!items.length) return null;

  return (
    <div
      className={cn(
        "w-full",
        "[perspective:1200px]",
        className,
      )}
    >
      <div ref={trackRef} className="relative">
        {showSpine &&
          spineLine &&
          spineLine.height > 0 && (
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute z-0 hidden -translate-x-1/2 lg:block",
                "left-[44px] w-[5px] overflow-hidden rounded-full",
              )}
              style={{
                top: spineLine.top,
                height: spineLine.height,
              }}
            >
              <div className="h-full w-full bg-white" />
              <div
                className="absolute left-0 top-0 w-full rounded-t-full bg-primary"
                style={{ height: spineFillHeight }}
              />
            </div>
          )}

        <ul className="relative z-[1] m-0 flex list-none flex-col gap-8 p-0 lg:gap-10">
          {items.map((item, index) => {
            const key = getTimelineKey(item, index);
            const isFirst = index === 0;
            const isLast = index === items.length - 1;

            return (
              <li key={key}>
                <div
                  className={cn(
                    "grid grid-cols-1 gap-6",
                    "lg:grid-cols-[88px_minmax(0,1fr)] lg:items-start lg:gap-x-4",
                  )}
                >
                  <div
                    ref={(el) => {
                      if (isFirst) firstOrbRef.current = el;
                      if (isLast) lastOrbRef.current = el;
                    }}
                    className={cn(
                      "flex justify-center lg:justify-center",
                      !showSpine && "hidden lg:hidden",
                    )}
                  >
                    <SpineOrb index={index} />
                  </div>

                  <div className="min-w-0">
                    <TimelineEntryCard
                      item={item}
                      index={index}
                      cardRef={(el: HTMLElement | null) => {
                        cardRefs.current[index] = el;
                      }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

function SpineOrb({ index }: { index: number }) {
  return (
    <motion.div
      className={cn(
        "relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full",
        "border-2 border-white bg-primary",
        "shadow-[0_0_12px_rgba(0,0,0,0.15)]",
        "[transform-style:preserve-3d]",
      )}
      initial={false}
      whileHover={{
        rotateY: 12,
        rotateX: -6,
        scale: 1.04,
        transition: { type: "spring", stiffness: 320, damping: 22 },
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <span
        className={cn(
          "font-antonio relative text-lg font-semibold tabular-nums text-white",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

function TimelineEntryCard({
  item,
  index,
  cardRef,
}: {
  item: TimelineItem;
  index: number;
  cardRef?: (el: HTMLElement | null) => void;
}) {
  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, x: 28, rotateX: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative flex min-h-[260px] h-full min-w-0 flex-col overflow-hidden rounded-2xl",
        "border border-secondary",
        "bg-transparent",
        "p-6 shadow-[0_12px_40px_rgba(0,0,0,0.12)]",
        "md:min-h-[280px] md:p-8",
        "[transform-style:preserve-3d]",
      )}
      whileHover={{
        y: -4,
        rotateX: 2,
        transition: { type: "spring", stiffness: 400, damping: 28 },
      }}
    >
      <Text
        variant="p"
        className={cn(
          "font-open-sans mb-2 text-sm font-medium uppercase tracking-widest",
          "text-secondary",
        )}
      >
        {item.period}
      </Text>
      <Text
        variant="h3"
        className={cn("font-antonio mb-3 text-2xl text-secondary md:text-3xl")}
      >
        {item.title}
      </Text>
      {item.tag ? (
        <span
          className={cn(
            "mb-4 inline-block self-start rounded-full border border-secondary",
            "bg-transparent px-3 py-1 text-xs font-medium text-secondary",
          )}
        >
          {item.tag}
        </span>
      ) : null}
      <Text
        variant="p"
        className={cn(
          "font-open-sans mt-auto max-w-2xl flex-1 leading-relaxed text-secondary",
        )}
      >
        {item.description}
      </Text>
    </motion.article>
  );
}

export default Timeline;
export type { TimelineItem, TimelineProps } from "./type";
