"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import Button from "@/blocks/elements/button/Button";
import { cn } from "@/utilities/helpers/classMerge";
import type { ProjectCardProps } from "./type";

const OPEN_EASE = [0.76, 0, 0.24, 1] as const;
const OPEN_DURATION = 0.58;
const PANEL_DELAY = OPEN_DURATION;

export const ProjectCard = ({
  scrollRootRef,
  imageSrc,
  imageAlt,
  category,
  title,
  features,
  liveLink,
  viewDetailsLink,
  liveButtonText = "Live",
  viewDetailsButtonText = "View details",
  liveIcon = "ExternalLink",
  viewDetailsIcon = "Eye",
  className,
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(cardRef, {
    root: scrollRootRef,
    once: true,
    amount: 0.35,
  });

  const openTransition = (delay: number) => ({
    duration: reduceMotion ? 0 : OPEN_DURATION,
    delay: reduceMotion ? 0 : delay,
    ease: OPEN_EASE,
  });

  return (
    <Container
      ref={cardRef}
      as="article"
      role="article"
      aria-label={imageAlt}
      className={cn(
        "relative flex w-full flex-col overflow-visible rounded-xl",
        "min-h-[min(520px,88vh)] shadow-[0_12px_40px_rgba(0,0,0,0.08)]",
        "md:block md:min-h-[480px]",
        className,
      )}
    >
      <motion.div
        className={cn(
          "relative z-10 order-2 w-full overflow-hidden rounded-xl",
          "md:absolute md:left-0 md:top-[20%] md:z-10 md:w-[54.5%] md:min-w-0",
        )}
        initial={{ height: 0 }}
        animate={isInView ? { height: "auto" } : { height: 0 }}
        transition={openTransition(PANEL_DELAY)}
      >
        <div
          className={cn(
            "flex h-full min-h-0 w-full flex-col justify-between gap-6 p-6 md:p-8",
            "border border-white/20 bg-[color-mix(in_srgb,var(--ternary)_52%,transparent)]",
            "backdrop-blur-xl backdrop-saturate-150",
            "h-[65%]",
          )}
        >
          <div className="flex flex-col">
            <Text
              variant="span"
              className={cn(
                "inline-flex w-fit items-center rounded-full",
                "border border-white/15 bg-white/10 backdrop-blur-sm",
                "px-3 py-1.5",
                "font-open-sans text-[10px] font-semibold uppercase tracking-[0.2em]",
                "text-secondary",
                "shadow-sm shadow-black/5",
              )}
            >
              {category}
            </Text>

            <Text
              variant="h3"
              className={cn(
                "mt-3 font-antonio text-[clamp(1.5rem,4vw,2.25rem)] font-bold capitalize leading-tight",
                "text-secondary",
                "line-clamp-2",
              )}
            >
              {title}
            </Text>

            <Text
              variant="p"
              className={cn(
                "mt-3 font-open-sans text-sm leading-snug sm:text-base",
                "text-secondary/90",
                "line-clamp-3",
              )}
            >
              {features}
            </Text>
          </div>

          <div
            className={cn(
              "grid w-full grid-cols-2 gap-3 border-t border-white/20 pt-5",
            )}
          >
            <Button
              href={liveLink}
              size="sm"
              leftIcon={liveIcon ?? "ExternalLink"}
              iconSize={14}
              iconClassName="text-white"
              className={cn(
                "cursor-target min-w-0 w-full !justify-start text-left",
                "border-2 border-white/35 bg-transparent font-open-sans",
                "h-8 min-h-8 rounded-full px-3 py-0 text-sm font-medium leading-none text-white",
                "hover:bg-white/15",
              )}
            >
              {liveButtonText}
            </Button>
            <Button
              href={viewDetailsLink}
              size="sm"
              leftIcon={viewDetailsIcon ?? "Eye"}
              iconSize={14}
              iconClassName="text-white"
              className={cn(
                "cursor-target min-w-0 w-full !justify-start text-left",
                "border-2 border-white/35 bg-transparent font-open-sans",
                "h-8 min-h-8 rounded-full px-3 py-0 text-sm font-medium leading-none text-white",
                "hover:bg-white/15",
              )}
            >
              {viewDetailsButtonText}
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={cn(
          "relative z-0 order-1 w-full shrink-0 overflow-hidden rounded-xl",
          "md:order-1 md:ml-auto md:h-full md:w-[65%] md:rounded-xl",
        )}
        initial={{ height: 0 }}
        animate={isInView ? { height: "auto" } : { height: 0 }}
        transition={openTransition(0)}
      >
        <div
          className={cn(
            "h-[min(260px,55vw)] w-full overflow-hidden rounded-xl",
            "md:h-full md:min-h-[480px]",
          )}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full min-h-[240px] w-full object-cover md:min-h-full"
            loading="lazy"
          />
        </div>
      </motion.div>
    </Container>
  );
};

export default ProjectCard;
