"use client";

import { useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "motion/react";
import { cn } from "@/utilities/helpers/classMerge";
import type { CircularTextProps } from "./type";
import { getTransition } from "./functions";

const CircularText = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
  textClassName = "text-xl text-white",
}: CircularTextProps) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [spinDuration, text, onHover, controls, rotation]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;

    let transitionConfig: ReturnType<typeof getTransition> | any;
    let scaleVal = 1;

    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case "pause":
        transitionConfig = {
          rotate: { type: "spring", damping: 20, stiffness: 300 },
          scale: { type: "spring", damping: 20, stiffness: 300 },
        };
        scaleVal = 1;
        break;
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig,
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  };

  return (
    <motion.div
      className={cn(
        "m-0 mx-auto relative h-[220px] w-[220px] rounded-full",
        "cursor-pointer select-none",
        "text-center",
        "origin-center",
        className,
      )}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

        return (
          <p
            key={i}
            className={cn(
              "absolute inline-block inset-0",
              "transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]",
              textClassName,
            )}
            style={{ transform, WebkitTransform: transform }}
          >
            {letter}
          </p>
        );
      })}
    </motion.div>
  );
};

export default CircularText;

