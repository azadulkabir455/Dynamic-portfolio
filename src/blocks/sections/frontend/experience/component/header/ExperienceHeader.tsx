"use client";

import { motion } from "framer-motion";
import NextImage from "next/image";
import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import { cn } from "@/utilities/helpers/classMerge";
import { ExperienceHeaderProps } from "./type";
import {
  useFootstepAnimation,
  getStepOpacity,
  FOOTSTEP_PATHS,
  FOOTSTEP_FILL,
} from "@/hooks/footstep";

const ExperienceHeader = ({ title, paragraph }: ExperienceHeaderProps) => {
  const { containerRef, visibleCount } = useFootstepAnimation();

  return (
    <Container as="div" className="relative flex flex-col items-center text-center">
      <Text
        variant="h2"
        className={cn(
          "font-antonio font-bold capitalize tracking-[0%] text-primary",
          "text-[64px] leading-[70px]",
        )}
      >
        {title}
      </Text>

      <Container as="div" className="mt-6">
        <NextImage
          src="/images/head.png"
          alt="Profile"
          width={100}
          height={0}
          style={{ height: "auto" }}
          className="w-[100px]"
        />
      </Container>

      <Text
        variant="p"
        className={cn(
          "font-open-sans font-normal tracking-[0%]",
          "text-[20px] leading-[36px]",
          "text-center align-middle text-text",
          "mx-auto mt-5 max-w-[750px]",
        )}
      >
        {paragraph}
      </Text>

      <Container as="div" ref={containerRef} className="relative w-full max-w-[450px]">
        <svg
          viewBox="0 195 433 1195"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full"
          aria-hidden
        >
          {FOOTSTEP_PATHS.map((d, index) => (
            <motion.path
              key={index}
              d={d}
              fill={FOOTSTEP_FILL}
              initial={{ opacity: 0, x: index % 2 === 0 ? -8 : 8 }}
              animate={{
                opacity: getStepOpacity(index, visibleCount),
                x: index < visibleCount ? 0 : index % 2 === 0 ? -8 : 8,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          ))}
        </svg>
      </Container>
    </Container>
  );
};

export default ExperienceHeader;
