"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";
import type { MotionValue } from "framer-motion";

const PRIMARY = "#C33F40";
const TERNARY = "#0F172B";

export interface ProjectTitleAnimationReturn {
  sectionRef: RefObject<HTMLElement | null>;
  fontSize: MotionValue<string>;
  lineHeight: MotionValue<string>;
  color: MotionValue<string>;
}

export function useProjectTitleAnimation(): ProjectTitleAnimationReturn {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const fontSize = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["64px", "114px"],
  );

  const lineHeight = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["70px", "140px"],
  );

  const color = useTransform(
    scrollYProgress,
    [0, 0.35],
    [PRIMARY, TERNARY],
  );

  return { sectionRef, fontSize, lineHeight, color };
}
