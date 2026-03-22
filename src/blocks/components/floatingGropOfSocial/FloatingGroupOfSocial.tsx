"use client";

import clsx from "clsx";
import Icon from "@/blocks/elements/icon/Icon";
import NextLink from "next/link";
import { useRef } from "react";
import Button from "@/blocks/elements/button/Button";
import Container from "@/blocks/elements/container/Container";
import type { FloatingGroupOfSocialProps } from "./type";
import { useFloatingSocial, useFloatingSocialClickOutside } from "./function";

export const FloatingGroupOfSocial = ({
  items,
  centerIconName,
  centerIconSize = 32,
  centerIconClassName,
  centerIconContainerClassName,
  positionClassName,
  containerClassName,
  socialIconClassName,
  socialLinkClassName,
  ...props
}: FloatingGroupOfSocialProps) => {
  const count = items.length || 0;
  const baseRadius = 36;
  const effectiveRadius = Math.max(baseRadius, centerIconSize / 2 + 60);
  const containerRef = useRef<HTMLElement | null>(null);

  // Infer logical placement from Tailwind position classes so icons always expand inward
  const placement = (() => {
    const pos = positionClassName ?? "";
    const hasTop = pos.includes("top-");
    const hasBottom = pos.includes("bottom-");
    const hasLeft = pos.includes("left-") && !pos.includes("left-1/2");
    const hasRight = pos.includes("right-");
    const hasCenterX = pos.includes("left-1/2");
    const hasCenterY = pos.includes("top-1/2") || pos.includes("bottom-1/2");

    if (hasCenterX && hasCenterY) return "center" as const;
    if (hasCenterX && hasTop) return "top-center" as const;
    if (hasTop && hasLeft) return "top-left" as const;
    if (hasTop && hasRight) return "top-right" as const;
    if (hasBottom && hasLeft) return "bottom-left" as const;
    if (hasBottom && hasRight) return "bottom-right" as const;
    return "bottom-right" as const;
  })();

  const { isOpen, toggle, close, getIconStyle, getLineStyle } = useFloatingSocial({
    radius: effectiveRadius,
    count,
    placement,
  });
  useFloatingSocialClickOutside(containerRef as any, isOpen, close);

  return (
    <Container
      ref={containerRef as any}
      as="div"
      size="full"
      className={clsx(
        "pointer-events-none fixed z-40 !max-w-none",
        positionClassName,
        containerClassName
      )}
      {...props}
    >
      <Container as="div" size="full" className={clsx("relative h-16 w-16 !max-w-none")}>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggle}
          className={clsx(
            "cursor-pointer pointer-events-auto absolute inset-0 z-20 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-all duration-300",
            isOpen ? "scale-100" : "scale-95",
            centerIconContainerClassName
          )}
        >
          <Icon
            name={centerIconName}
            size={centerIconSize}
            className={clsx("text-white", centerIconClassName)}
          />
        </Button>

        {items.map((item, index) => {
          const iconStyle = getIconStyle(index);
          return (
            <NextLink
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label ?? item.icon}
              className={clsx(
                "pointer-events-auto absolute z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-md transition-all duration-200 hover:scale-105 hover:text-slate-900",
                socialLinkClassName
              )}
              style={iconStyle}
            >
              <Icon
                name={item.icon}
                size={18}
                title={item.label ?? item.icon}
                className={clsx("text-current", socialIconClassName)}
              />
            </NextLink>
          );
        })}
      </Container>
    </Container>
  );
};

export default FloatingGroupOfSocial;

/*
Import:
import FloatingGroupOfSocial from "@/blocks/componets/floatingGropOfSocial/FloatingGroupOfSocial";

Props:
- items: social link list — each item: { href, icon (Lucide name), label? }
- centerIconName: Lucide icon name for the main floating button (e.g. "Share2")
- centerIconSize: size of the center icon in px (default 32)
- centerIconClassName: extra classes for the center icon
- positionClassName: Tailwind classes to position the fixed container (e.g. "bottom-6 right-6")
- containerClassName: extra classes for the outer fixed container (merged with positionClassName)
- socialIconSize: size of the social icons in px (currently 18 inside the component)
- socialIconClassName: extra classes for each social icon
- socialLinkClassName: extra classes for each social icon wrapper link
- ...props: extra native div attributes for the outer fixed container
*/