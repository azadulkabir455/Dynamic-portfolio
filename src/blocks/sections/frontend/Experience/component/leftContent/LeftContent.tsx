"use client";

import { AnimatePresence, motion } from "motion/react";
import Container from "@/blocks/elements/container/Container";
import Image from "@/blocks/elements/image/Image";
import Text from "@/blocks/elements/text/Text";
import { cn } from "@/utilities/helpers/classMerge";
import type { LeftContentProps } from "./type";

const stickyTopClass = "lg:top-[30px]";
const panelInitialOffsetPx = -10;

/** Crossfade when timeline step changes — long ease-out + light stagger reads smoother on the eye. */
const easeOutSoft = [0.22, 1, 0.36, 1] as const;

/** Parent only orchestrates stagger — opacity/y live on blocks so motion stays clean, not muddy. */
const panelVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.055,
      staggerDirection: -1,
    },
  },
} as const;

const blockVariants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: easeOutSoft },
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: { duration: 0.48, ease: easeOutSoft },
  },
} as const;

const LeftContent = ({
  heading,
  paragraph,
  imageSrc,
  imageAlt,
  activeIndex,
}: LeftContentProps) => {
  const panelInner = (
    <div
      className={cn(
        "relative grid w-full min-w-0 place-items-start sm:min-h-[min(520px,68vh)]",
        "[&>*]:col-start-1 [&>*]:row-start-1 [&>*]:min-w-0",
      )}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={activeIndex}
          className="relative z-10 w-full min-w-0"
          variants={panelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div variants={blockVariants} className="will-change-transform">
            <Text
              variant="h2"
              className={cn(
                "font-antonio capitalize leading-tight text-secondary",
                "text-[72px]",
              )}
            >
              {heading}
            </Text>
          </motion.div>
          <motion.div variants={blockVariants} className="will-change-transform">
            <Text
              variant="p"
              className={cn(
                "font-open-sans text-xl leading-relaxed text-secondary/90",
                "mt-3",
              )}
            >
              {paragraph}
            </Text>
          </motion.div>

          <motion.div variants={blockVariants} className="will-change-transform">
            <Container
              as="div"
              className={cn(
                "relative mt-10 w-full overflow-hidden rounded-xl",
                "border-2 border-white",
              )}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={480}
                height={320}
                className="h-auto w-full object-cover rounded-xl"
              />
            </Container>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return (
    <Container
      as="div"
      className={cn(
        "flex w-full min-h-0 flex-col",
        "lg:min-h-0 lg:max-w-[45%] lg:shrink-0 lg:basis-[45%] lg:flex-[0_0_45%] lg:self-stretch",
      )}
    >
      <Container
        as="div"
        className={cn(
          "relative z-10 w-full lg:h-min",
          "lg:sticky lg:self-start lg:z-30",
          stickyTopClass,
          panelInitialOffsetPx < 0 && "lg:-mt-[10px]",
        )}
      >
        {panelInner}
      </Container>
    </Container>
  );
};

export default LeftContent;
