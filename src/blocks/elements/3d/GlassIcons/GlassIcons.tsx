"use client";

import { motion } from "motion/react";
import type { GlassIconsItem, GlassIconsProps } from "./type";
import Container from "@/blocks/elements/container/Container";
import { cn } from "@/utilities/helpers/classMerge";

const STAGGER_MOVE_S = 0.55;
const STAGGER_EASE = "easeOut" as const;

const GlassIcons = ({
  items,
  className = "",
  staggerSlideUp = false,
  staggerBaseDelay = 0,
  staggerStep = 0.12,
  loaderExited = true,
}: GlassIconsProps) => {
  const gridClassName = cn("grid grid-cols-3 gap-3  overflow-visible", className);
  const tileClassName = cn(
    "cursor-target relative h-[50px] w-[50px]",
    "bg-transparent outline-none border-none cursor-pointer",
    "[perspective:24em] [transform-style:preserve-3d]",
    "[-webkit-tap-highlight-color:transparent] group",
  );

  const shineLayerClassName = cn(
    "absolute top-0 left-0 w-full h-full rounded-full block",
    "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]",
    "origin-[100%_100%] rotate-[12deg]",
    "[will-change:transform] group-hover:[transform:rotate(18deg)_translate3d(-0.25em,-0.25em,0.25em)]",
  );

  const glassLayerClassName = cn(
    "absolute top-0 left-0 w-full h-full rounded-full",
    "bg-[hsla(0,0%,100%,0.15)]",
    "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]",
    "origin-[80%_50%] flex backdrop-blur-[0.75em]",
    "[-webkit-backdrop-filter:blur(0.75em)] [-moz-backdrop-filter:blur(0.75em)]",
    "[will-change:transform] transform",
    "group-hover:[transform:translate3d(0,0,1.1em)]",
  );

  const iconWrapClassName = cn(
    "m-auto flex shrink-0 items-center justify-center",
    "p-[0.14em] min-h-[1.45em] min-w-[1.45em] max-h-[1.75em] max-w-[1.75em]",
  );

  const labelClassName = cn(
    "absolute top-full left-0 right-0 text-center whitespace-nowrap",
    "leading-[2] text-base",
    "opacity-0 transition-[opacity,transform] duration-300",
    "ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0",
    "group-hover:opacity-100 group-hover:[transform:translateY(20%)]",
  );

  const tileContent = (item: GlassIconsItem) => (
    <>
      <Container
        as="span"
        className={cn(shineLayerClassName, "primaryBacgroundColor shadow-lg")}
      />

      <Container
        as="span"
        className={glassLayerClassName}
        style={{
          boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
        }}
      >
        <Container as="span" className={iconWrapClassName}>
          {item.icon}
        </Container>
      </Container>

      <Container as="span" className={labelClassName}>
        {item.label}
      </Container>
    </>
  );

  const tileNode = (item: GlassIconsItem) =>
    item.href ? (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.label}
        className={cn(tileClassName, "inline-flex")}
      >
        {tileContent(item)}
      </a>
    ) : (
      <button
        type="button"
        aria-label={item.label}
        className={cn(tileClassName, "inline-flex")}
      >
        {tileContent(item)}
      </button>
    );

  return (
    <Container as="div" className={cn(gridClassName, "gap-6 justify-items-center")}>
      {items.map((item: GlassIconsItem, index: number) => {
        if (!staggerSlideUp) {
          return item.href ? (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className={cn(tileClassName, "inline-flex")}
            >
              {tileContent(item)}
            </a>
          ) : (
            <button
              key={index}
              type="button"
              aria-label={item.label}
              className={cn(tileClassName, "inline-flex")}
            >
              {tileContent(item)}
            </button>
          );
        }
        const delay = staggerBaseDelay + index * staggerStep;
        return (
          <motion.div
            key={index}
            className="justify-self-center"
            initial={{ opacity: 0, y: "100%" }}
            animate={
              loaderExited
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: "100%" }
            }
            transition={{
              duration: STAGGER_MOVE_S,
              delay,
              ease: STAGGER_EASE,
            }}
          >
            {tileNode(item)}
          </motion.div>
        );
      })}
    </Container>
  );
};

export default GlassIcons;

