"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import NextImage from "next/image";
import { MapPin, CalendarDays, Building2, CheckCircle2 } from "lucide-react";
import { cn } from "@/utilities/helpers/classMerge";
import { getTimelineKey } from "./functions";
import type { TimelineItem, TimelineProps } from "./type";

const MotionContainer = motion(Container);

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
  const firstOrbRef = useRef<HTMLElement | null>(null);
  const lastOrbRef = useRef<HTMLElement | null>(null);
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
    <Container
      className={cn(
        "w-full",
        "[perspective:1200px]",
        className,
      )}
    >
      <Container ref={trackRef} className="relative">
        {showSpine &&
          spineLine &&
          spineLine.height > 0 && (
            <Container
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
              <Container className="h-full w-full bg-white" />
              <Container
                className="absolute left-0 top-0 w-full rounded-t-full bg-primary"
                style={{ height: spineFillHeight }}
              />
            </Container>
          )}

        <ul className="relative z-[1] m-0 flex list-none flex-col gap-8 p-0 lg:gap-10">
          {items.map((item, index) => {
            const key = getTimelineKey(item, index);
            const isFirst = index === 0;
            const isLast = index === items.length - 1;

            return (
              <li key={key}>
                <Container
                  className={cn(
                    "grid grid-cols-1 gap-6",
                    "lg:grid-cols-[88px_minmax(0,1fr)] lg:items-start lg:gap-x-4",
                  )}
                >
                  <Container
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
                  </Container>

                  <Container className="min-w-0">
                    <TimelineEntryCard
                      item={item}
                      index={index}
                      cardRef={(el: HTMLElement | null) => {
                        cardRefs.current[index] = el;
                      }}
                    />
                  </Container>
                </Container>
              </li>
            );
          })}
        </ul>
      </Container>
    </Container>
  );
};

function SpineOrb({ index }: { index: number }) {
  return (
    <MotionContainer
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
    </MotionContainer>
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
      initial={{ opacity: 0, x: 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative min-w-0 overflow-hidden rounded-2xl",
        "border border-secondary/30",
        "bg-transparent",
        "shadow-[0_12px_40px_rgba(0,0,0,0.12)]",
        "[transform-style:preserve-3d]",
      )}
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 400, damping: 28 },
      }}
    >
      <div className="p-6 md:p-8">
        {/* শীর্ষ সারি: লোগো + অফিসের নাম + ব্যাজ */}
        <div className="flex items-start gap-5">
          {item.logoSrc && (
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-secondary/20 bg-white/10 backdrop-blur-sm">
              <NextImage
                src={item.logoSrc}
                alt={item.logoAlt ?? ""}
                fill
                className="object-contain p-1.5"
                sizes="48px"
              />
            </div>
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            {item.officeName && (
              <Text
                variant="span"
                className="font-open-sans text-sm font-semibold text-secondary/70 truncate"
              >
                {item.officeName}
              </Text>
            )}
            <Text
              variant="h3"
              className="font-antonio text-2xl font-bold leading-tight text-secondary md:text-3xl"
            >
              {item.title}
            </Text>
          </div>
        </div>

        {/* মেটা: তারিখ + লোকেশন */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {item.period && (
            <span className="flex items-center gap-1.5 font-open-sans text-sm text-secondary/70">
              <CalendarDays size={14} className="shrink-0 text-secondary/50" />
              {item.period}
            </span>
          )}
          {item.location && (
            <span className="flex items-center gap-1.5 font-open-sans text-sm text-secondary/70">
              <MapPin size={14} className="shrink-0 text-secondary/50" />
              {item.location}
            </span>
          )}
        </div>

        {/* অফিস ইনফো */}
        {item.officeInfo && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-secondary/15 bg-secondary/5 px-4 py-3">
            <Building2 size={15} className="mt-0.5 shrink-0 text-secondary/50" />
            <Text
              variant="p"
              className="font-open-sans text-sm leading-relaxed text-secondary/70"
            >
              {item.officeInfo}
            </Text>
          </div>
        )}

        {/* জব ইনফো */}
        {item.description && (
          <Text
            variant="p"
            className="mt-4 font-open-sans leading-relaxed text-secondary/90"
          >
            {item.description}
          </Text>
        )}

        {/* অর্জনের তালিকা */}
        {item.achievements && item.achievements.length > 0 && (
          <ul className="mt-5 flex flex-col gap-2.5">
            {item.achievements.map((ach, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0 text-secondary/60"
                />
                <Text
                  variant="span"
                  className="font-open-sans text-sm leading-snug text-secondary/80"
                >
                  {ach}
                </Text>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
}

export default Timeline;
export type { TimelineItem, TimelineProps } from "./type";
