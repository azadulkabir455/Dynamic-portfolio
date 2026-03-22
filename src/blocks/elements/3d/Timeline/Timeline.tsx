"use client";

import { motion } from "motion/react";
import Text from "@/blocks/elements/text/Text";
import { cn } from "@/utilities/helpers/classMerge";
import { getTimelineKey } from "./functions";
import type { TimelineItem, TimelineProps } from "./type";

const lineGradient =
  "bg-gradient-to-b from-[var(--primary)] via-[var(--quaternary)] to-[color-mix(in_srgb,var(--primary)_45%,transparent)]";

const Timeline = ({
  items,
  className,
  showSpine = true,
}: TimelineProps) => {
  if (!items.length) return null;

  return (
    <div
      className={cn(
        "w-full",
        "[perspective:1200px]",
        className,
      )}
    >
      <ul className="m-0 flex list-none flex-col gap-0 p-0">
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1;
          const key = getTimelineKey(item, index);

          return (
            <li key={key} className="relative">
              <div
                className={cn(
                  "grid grid-cols-1 gap-6 lg:gap-10 lg:items-stretch",
                  showSpine &&
                    "lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]",
                )}
              >
                {/* Left: 3D spine segment */}
                <div
                  className={cn(
                    "relative flex justify-center lg:justify-end",
                    !showSpine && "hidden",
                  )}
                >
                  <div
                    className={cn(
                      "flex w-full max-w-[200px] flex-row items-stretch justify-end gap-0 lg:max-w-none",
                      "lg:flex-col lg:items-end lg:pr-6",
                    )}
                  >
                    {/* Mobile: compact left rail */}
                    <div className="flex flex-col items-center lg:hidden">
                      {!isFirst && (
                        <div
                          className={cn("min-h-8 w-px flex-1", lineGradient)}
                          aria-hidden
                        />
                      )}
                      <SpineOrb index={index} />
                      {!isLast && (
                        <div
                          className={cn("min-h-8 w-px flex-1", lineGradient)}
                          aria-hidden
                        />
                      )}
                    </div>

                    {/* Desktop: 3D column */}
                    <div
                      className={cn(
                        "relative hidden min-h-[120px] flex-1 flex-col items-center lg:flex",
                        "[transform-style:preserve-3d]",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-full w-full flex-col items-end",
                          "[transform:rotateY(-10deg)]",
                          "transition-transform duration-500 ease-out",
                        )}
                      >
                        {!isFirst && (
                          <div
                            className={cn(
                              "mr-[27px] min-h-10 w-px flex-1 origin-top",
                              lineGradient,
                              "shadow-[0_0_12px_rgba(195,63,64,0.35)]",
                            )}
                            aria-hidden
                          />
                        )}
                        <div className="flex w-full justify-end py-2">
                          <SpineOrb index={index} />
                        </div>
                        {!isLast && (
                          <div
                            className={cn(
                              "mr-[27px] min-h-10 w-px flex-1 origin-top",
                              lineGradient,
                              "shadow-[0_0_12px_rgba(247,127,0,0.25)]",
                            )}
                            aria-hidden
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: timeline copy */}
                <div className="min-w-0 pb-12 lg:pb-16">
                  <TimelineEntryCard item={item} index={index} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

function SpineOrb({ index }: { index: number }) {
  return (
    <motion.div
      className={cn(
        "relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full",
        "border-2 border-primary bg-secondary/25",
        "shadow-[0_0_0_1px_rgba(229,206,177,0.15),0_12px_40px_rgba(0,48,73,0.35),0_0_28px_rgba(195,63,64,0.35)]",
        "[transform-style:preserve-3d]",
      )}
      initial={false}
      whileHover={{
        rotateY: 18,
        rotateX: -10,
        scale: 1.06,
        transition: { type: "spring", stiffness: 320, damping: 22 },
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full",
          "bg-gradient-to-br from-primary/30 via-transparent to-quaternary/25",
        )}
        aria-hidden
      />
      <span
        className={cn(
          "font-antonio relative text-lg font-semibold tabular-nums",
          "text-secondary",
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
}: {
  item: TimelineItem;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 28, rotateX: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-secondary/25",
        "bg-[color-mix(in_srgb,var(--ternary)_88%,transparent)]",
        "p-6 shadow-[0_20px_50px_rgba(0,48,73,0.25)] backdrop-blur-md",
        "md:p-8",
        "[transform-style:preserve-3d]",
      )}
      whileHover={{
        y: -4,
        rotateX: 2,
        transition: { type: "spring", stiffness: 400, damping: 28 },
      }}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full",
          "bg-primary/15 blur-2xl",
        )}
        aria-hidden
      />
      <div
        className={cn(
          "pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full",
          "bg-quaternary/10 blur-2xl",
        )}
        aria-hidden
      />

      <Text
        variant="p"
        className={cn(
          "font-open-sans mb-2 text-sm font-medium uppercase tracking-widest",
          "text-[var(--quaternary)]",
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
            "mb-4 inline-block rounded-full border border-secondary/30",
            "bg-primary/20 px-3 py-1 text-xs font-medium text-secondary",
          )}
        >
          {item.tag}
        </span>
      ) : null}
      <Text variant="p" className="font-open-sans max-w-2xl leading-relaxed text-secondary/90">
        {item.description}
      </Text>
    </motion.article>
  );
}

export default Timeline;
export type { TimelineItem, TimelineProps } from "./type";
