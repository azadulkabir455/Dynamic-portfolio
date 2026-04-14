"use client";

import Container from "@/blocks/elements/container/Container";
import Icon from "@/blocks/elements/icon/Icon";
import { cn } from "@/utilities/helpers/classMerge";
import { getSafeLink, getWhatsAppHref } from "./function";
import type { AnimatedButtonProps } from "./type";

const defaultAnchor =
  "border-0 bg-primary text-secondary";
const defaultIconBg = "bg-amber-400";
const defaultGlyph = "text-primary";

const whatsAppAnchor =
  "border-0 bg-amber-400 text-primary hover:!bg-amber-400";
const whatsAppGlyph = "text-secondary";
const whatsAppLabel = "text-primary";

const labelTypography = cn(
  "font-open-sans font-bold text-[18px] leading-[18px]",
  "tracking-normal text-center capitalize",
  "inline-block align-middle self-center",
);

const iconLayerOut = cn(
  "absolute inset-0 flex items-center justify-center",
  "transition-all duration-300 ease-[cubic-bezier(0,0,0,1)]",
  "translate-y-0 opacity-100 group-hover:-translate-y-full group-hover:opacity-0",
);

const iconLayerIn = cn(
  "absolute inset-0 flex items-center justify-center",
  "transition-all duration-300 ease-[cubic-bezier(0,0,0,1)]",
  "translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
);

const whatsAppIconPx = 18;
const defaultIconPx = 22;

/**
 * WhatsApp-style bubble SVG (circle + tail). Sized by parent; use absolute + w-10 h-auto.
 */
function WhatsAppBubbleShape({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 48"
      className={cn(
        "pointer-events-none block h-auto w-full max-w-none",
        className,
      )}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <circle cx="22" cy="20" r="18" fill="currentColor" />
      <path fill="currentColor" d="M 6.41 29 L 5.25 37.9 L 14.39 36.31 Z" />
    </svg>
  );
}

const AnimatedButton = ({
  text,
  link,
  iconName,
  iconSize = 14,
  iconClassName,
  iconContainerClassName,
  buttonClassName,
  className,
  isWhatsApp = false,
  onClick,
  ...rest
}: AnimatedButtonProps) => {
  const href = isWhatsApp ? getWhatsAppHref(link) : getSafeLink(link);

  const anchorBase = cn(
    "group cursor-target relative z-10",
    "inline-flex items-center",
    "h-12 min-h-12 max-h-12 w-fit shrink-0 max-w-none",
    "rounded-full border-0 pl-6",
    isWhatsApp ? "transition-none" : "transition-colors duration-300",
  );

  const anchorLayout = cn(
    isWhatsApp
      ? "gap-4 overflow-visible py-[4px] pr-[4px]"
      : "justify-between gap-4 overflow-hidden py-[4px] pr-[4px]",
  );

  const anchorVariant = isWhatsApp ? whatsAppAnchor : defaultAnchor;

  const anchorClass = cn(
    anchorBase,
    anchorLayout,
    anchorVariant,
    buttonClassName,
    className,
  );

  const iconDiscBase = cn(
    "relative inline-flex items-center justify-center",
    "h-10 w-10 shrink-0",
    "overflow-hidden rounded-full",
    "py-1 px-[4px]",
  );

  const iconDiscClass = cn(iconDiscBase, defaultIconBg, iconContainerClassName);

  const resolvedIconName =
    iconName ?? (isWhatsApp ? "Phone" : "ArrowUpRight");

  const glyphClass = cn(
    isWhatsApp ? whatsAppGlyph : defaultGlyph,
    iconClassName,
  );

  const labelClass = cn(
    labelTypography,
    isWhatsApp ? whatsAppLabel : "text-inherit whitespace-nowrap",
    !isWhatsApp && "min-w-0 flex-1 text-left",
  );

  const strokeWidth = isWhatsApp ? 2.75 : 2;
  const resolvedIconSize = isWhatsApp ? whatsAppIconPx : defaultIconPx;

  const whatsAppBubbleWrap = cn(
    "pointer-events-none absolute z-0",
    "left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2",
  );

  const whatsAppIconSlot = cn(
    "absolute z-[2] flex",
    "left-[55%] top-1/2 size-9 -translate-x-1/2 -translate-y-1/2",
    "items-center justify-center overflow-hidden rounded-full",
  );

  return (
    <a href={href} className={anchorClass} onClick={onClick} {...rest}>
      <Container as="span" className={labelClass}>
        {text}
      </Container>
      {isWhatsApp ? (
        <span className="relative size-10 shrink-0 overflow-visible">
          <span className={whatsAppBubbleWrap}>
            <WhatsAppBubbleShape className="text-primary" />
          </span>
          <span className={whatsAppIconSlot}>
            <span className={iconLayerOut} aria-hidden>
              <Icon
                name={resolvedIconName}
                size={resolvedIconSize}
                strokeWidth={strokeWidth}
                className={glyphClass}
              />
            </span>
            <span className={iconLayerIn} aria-hidden>
              <Icon
                name={resolvedIconName}
                size={resolvedIconSize}
                strokeWidth={strokeWidth}
                className={glyphClass}
              />
            </span>
          </span>
        </span>
      ) : (
        <Container as="span" className={iconDiscClass}>
          <span className={iconLayerOut} aria-hidden>
            <Icon
              name={resolvedIconName}
              size={resolvedIconSize}
              strokeWidth={strokeWidth}
              className={glyphClass}
            />
          </span>
          <span className={iconLayerIn} aria-hidden>
            <Icon
              name={resolvedIconName}
              size={resolvedIconSize}
              strokeWidth={strokeWidth}
              className={glyphClass}
            />
          </span>
        </Container>
      )}
    </a>
  );
};

export default AnimatedButton;
