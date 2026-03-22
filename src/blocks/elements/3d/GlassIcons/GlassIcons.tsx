"use client";

import type { GlassIconsItem, GlassIconsProps } from "./type";
import { gradientMapping } from "./functions";
import Container from "@/blocks/elements/container/Container";
import Button from "@/blocks/elements/button/Button";
import { cn } from "@/utilities/helpers/classMerge";

const GlassIcons = ({ items, className = "" }: GlassIconsProps) => {
  const gridClassName = cn("grid grid-cols-3 gap-4 mx-auto overflow-visible", className);
  const tileClassName = cn(
    "cursor-target relative w-[3.5em] h-[3.5em]",
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
    "m-auto w-[1.5em] h-[1.5em]",
    "flex items-center justify-center",
  );

  const labelClassName = cn(
    "absolute top-full left-0 right-0 text-center whitespace-nowrap",
    "leading-[2] text-base",
    "opacity-0 transition-[opacity,transform] duration-300",
    "ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0",
    "group-hover:opacity-100 group-hover:[transform:translateY(20%)]",
  );

  return (
    <Container as="div" className={cn(gridClassName, "gap-6 justify-items-center")} >
      {items.map((item: GlassIconsItem, index: number) => (
        <Button
          key={index}
          type="button"
          aria-label={item.label}
          className={cn(tileClassName)}
        >
          <Container as="span"
            className={cn(shineLayerClassName, "primaryBacgroundColor shadow-lg")}
          />

          <Container
            as="span"
            className={glassLayerClassName}
            style={{
              boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
            }}
          >
            <Container
              as="span"
              className={iconWrapClassName}
            >
              {item.icon}
            </Container>
          </Container>

          <Container
            as="span"
            className={labelClassName}
          >
            {item.label}
          </Container>
        </Button>
      ))}
    </Container>
  );
};

export default GlassIcons;

