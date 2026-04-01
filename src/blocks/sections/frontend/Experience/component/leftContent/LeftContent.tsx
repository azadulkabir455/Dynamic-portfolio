"use client";

import { AnimatePresence, motion } from "motion/react";
import Container from "@/blocks/elements/container/Container";
import Image from "@/blocks/elements/image/Image";
import Text from "@/blocks/elements/text/Text";
import { cn } from "@/utilities/helpers/classMerge";
import type { LeftContentProps } from "./type";

const stickyTopClass = "lg:top-[30px]";
const panelInitialOffsetPx = -10;

const LeftContent = ({
  heading,
  paragraph,
  imageSrc,
  imageAlt,
  activeIndex,
}: LeftContentProps) => {
  const panelInner = (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        <Text
          variant="h2"
          className={cn(
            "font-antonio capitalize leading-tight text-secondary",
            "text-[72px]",
          )}
        >
          {heading}
        </Text>
        <Text
          variant="p"
          className={cn(
            "font-open-sans text-xl leading-relaxed text-secondary/90",
            "mt-3",
          )}
        >
          {paragraph}
        </Text>

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
    </AnimatePresence>
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
