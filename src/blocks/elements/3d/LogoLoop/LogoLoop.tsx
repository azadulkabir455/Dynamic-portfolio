"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import NextImage from "next/image";
import { ANIMATION_CONFIG, cx, toCssLength } from "./functions";
import type { LogoLoopItem, LogoLoopProps } from "./type";

const isNodeItem = (item: LogoLoopItem): item is Extract<LogoLoopItem, { node: unknown }> =>
  "node" in item;

const LogoLoop = memo(
  ({
    logos,
    speed = 120,
    direction = "left",
    width = "100%",
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    renderItem,
    ariaLabel = "Partner logos",
    className,
    style,
  }: LogoLoopProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const seqRef = useRef<HTMLUListElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const lastTimestampRef = useRef<number | null>(null);
    const offsetRef = useRef(0);
    const velocityRef = useRef(0);

    const [seqWidth, setSeqWidth] = useState(0);
    const [seqHeight, setSeqHeight] = useState(0);
    const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);

    const isVertical = direction === "up" || direction === "down";

    const effectiveHoverSpeed = useMemo(() => {
      if (hoverSpeed !== undefined) return hoverSpeed;
      if (pauseOnHover === true) return 0;
      if (pauseOnHover === false) return undefined;
      return 0;
    }, [hoverSpeed, pauseOnHover]);

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      const directionMultiplier = isVertical
        ? direction === "up"
          ? 1
          : -1
        : direction === "left"
          ? 1
          : -1;
      return magnitude * directionMultiplier * (speed < 0 ? -1 : 1);
    }, [speed, direction, isVertical]);

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceRect = seqRef.current?.getBoundingClientRect?.();
      const sequenceWidth = sequenceRect?.width ?? 0;
      const sequenceHeight = sequenceRect?.height ?? 0;

      if (isVertical) {
        const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
        if (containerRef.current && parentHeight > 0) {
          const targetHeight = Math.ceil(parentHeight);
          if (containerRef.current.style.height !== `${targetHeight}px`) {
            containerRef.current.style.height = `${targetHeight}px`;
          }
        }
        if (sequenceHeight > 0) {
          setSeqHeight(Math.ceil(sequenceHeight));
          const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight;
          const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
          setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
        }
      } else if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth));
        const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    }, [isVertical]);

    useEffect(() => {
      const images = seqRef.current?.querySelectorAll("img") ?? [];
      if (images.length === 0) {
        updateDimensions();
        return;
      }

      let remaining = images.length;
      const done = () => {
        remaining -= 1;
        if (remaining === 0) updateDimensions();
      };

      images.forEach((img) => {
        if (img.complete) {
          done();
        } else {
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        }
      });

      return () => {
        images.forEach((img) => {
          img.removeEventListener("load", done);
          img.removeEventListener("error", done);
        });
      };
    }, [logos, gap, logoHeight, isVertical, updateDimensions]);

    useEffect(() => {
      if (!window.ResizeObserver) {
        window.addEventListener("resize", updateDimensions);
        updateDimensions();
        return () => window.removeEventListener("resize", updateDimensions);
      }

      const observers: ResizeObserver[] = [];
      [containerRef, seqRef].forEach((ref) => {
        if (!ref.current) return;
        const observer = new ResizeObserver(updateDimensions);
        observer.observe(ref.current);
        observers.push(observer);
      });
      updateDimensions();
      return () => observers.forEach((observer) => observer.disconnect());
    }, [updateDimensions, logos, gap, logoHeight, isVertical]);

    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const seqSize = isVertical ? seqHeight : seqWidth;
      if (seqSize > 0) {
        offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      if (prefersReduced) {
        track.style.transform = "translate3d(0,0,0)";
        return;
      }

      const animate = (timestamp: number) => {
        if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
        const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
        lastTimestampRef.current = timestamp;

        const target =
          isHovered && effectiveHoverSpeed !== undefined ? effectiveHoverSpeed : targetVelocity;
        const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
        velocityRef.current += (target - velocityRef.current) * easingFactor;

        if (seqSize > 0) {
          let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
          nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
          offsetRef.current = nextOffset;

          track.style.transform = isVertical
            ? `translate3d(0, ${-offsetRef.current}px, 0)`
            : `translate3d(${-offsetRef.current}px, 0, 0)`;
        }

        rafRef.current = requestAnimationFrame(animate);
      };

      rafRef.current = requestAnimationFrame(animate);

      return () => {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        lastTimestampRef.current = null;
      };
    }, [targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical]);

    const cssVariables = useMemo(
      () =>
        ({
          "--logoloop-gap": `${gap}px`,
          "--logoloop-logoHeight": `${logoHeight}px`,
          ...(fadeOutColor ? { "--logoloop-fadeColor": fadeOutColor } : {}),
        }) as CSSProperties,
      [gap, logoHeight, fadeOutColor],
    );

    const rootClasses = useMemo(
      () =>
        cx(
          "relative group",
          isVertical ? "overflow-hidden h-full inline-block" : "overflow-x-hidden",
          "[--logoloop-gap:32px]",
          "[--logoloop-logoHeight:28px]",
          "[--logoloop-fadeColorAuto:#ffffff]",
          "dark:[--logoloop-fadeColorAuto:#0b0b0b]",
          scaleOnHover && "py-[calc(var(--logoloop-logoHeight)*0.1)]",
          className,
        ),
      [isVertical, scaleOnHover, className],
    );

    const handleMouseEnter = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(true);
    }, [effectiveHoverSpeed]);

    const handleMouseLeave = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(false);
    }, [effectiveHoverSpeed]);

    const renderLogoItem = useCallback(
      (item: LogoLoopItem, key: string) => {
        if (renderItem) {
          return (
            <li
              className={cx(
                "flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]",
                isVertical ? "mb-[var(--logoloop-gap)]" : "mr-[var(--logoloop-gap)]",
                scaleOnHover && "overflow-visible group/item",
              )}
              key={key}
              role="listitem"
            >
              {renderItem(item, key)}
            </li>
          );
        }

        let content: ReactNode;
        if (isNodeItem(item)) {
          content = (
            <span
              className={cx(
                "inline-flex items-center",
                "motion-reduce:transition-none",
                scaleOnHover &&
                  "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120",
              )}
              aria-hidden={Boolean(item.href && !item.ariaLabel)}
            >
              {item.node}
            </span>
          );
        } else {
          const imgHeight = item.height ?? logoHeight;
          const imgWidth = item.width ?? Math.round(imgHeight * 4);
          const isRemote =
            item.src.startsWith("http://") || item.src.startsWith("https://");
          content = (
            <NextImage
              className={cx(
                "h-[var(--logoloop-logoHeight)] w-auto block object-contain",
                "[-webkit-user-drag:none] pointer-events-none",
                "[image-rendering:-webkit-optimize-contrast]",
                "motion-reduce:transition-none",
                scaleOnHover &&
                  "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120",
              )}
              src={item.src}
              width={imgWidth}
              height={imgHeight}
              sizes={item.sizes ?? `${imgWidth}px`}
              alt={item.alt ?? ""}
              title={item.title}
              loading="lazy"
              decoding="async"
              draggable={false}
              unoptimized={isRemote}
            />
          );
        }

        const itemAriaLabel = isNodeItem(item) ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);
        const inner = item.href ? (
          <a
            className={cx(
              "inline-flex items-center no-underline rounded",
              "transition-opacity duration-200 ease-linear hover:opacity-80",
              "focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2",
            )}
            href={item.href}
            aria-label={itemAriaLabel || "logo link"}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          content
        );

        return (
          <li
            className={cx(
              "flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]",
              isVertical ? "mb-[var(--logoloop-gap)]" : "mr-[var(--logoloop-gap)]",
              scaleOnHover && "overflow-visible group/item",
            )}
            key={key}
            role="listitem"
          >
            {inner}
          </li>
        );
      },
      [isVertical, scaleOnHover, renderItem, logoHeight],
    );

    const containerStyle = useMemo(
      () =>
        ({
          width: isVertical
            ? toCssLength(width) === "100%"
              ? undefined
              : toCssLength(width)
            : (toCssLength(width) ?? "100%"),
          ...cssVariables,
          ...style,
        }) as CSSProperties,
      [width, cssVariables, style, isVertical],
    );

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className={cx("flex items-center", isVertical && "flex-col")}
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
          </ul>
        )),
      [copyCount, logos, renderLogoItem, isVertical],
    );

    return (
      <div
        ref={containerRef}
        className={rootClasses}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {fadeOut &&
          (isVertical ? (
            <>
              <div
                aria-hidden
                className={cx(
                  "pointer-events-none absolute inset-x-0 top-0 z-10",
                  "h-[clamp(24px,8%,120px)]",
                  "bg-[linear-gradient(to_bottom,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]",
                )}
              />
              <div
                aria-hidden
                className={cx(
                  "pointer-events-none absolute inset-x-0 bottom-0 z-10",
                  "h-[clamp(24px,8%,120px)]",
                  "bg-[linear-gradient(to_top,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]",
                )}
              />
            </>
          ) : (
            <>
              <div
                aria-hidden
                className={cx(
                  "pointer-events-none absolute inset-y-0 left-0 z-10",
                  "w-[clamp(24px,8%,120px)]",
                  "bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]",
                )}
              />
              <div
                aria-hidden
                className={cx(
                  "pointer-events-none absolute inset-y-0 right-0 z-10",
                  "w-[clamp(24px,8%,120px)]",
                  "bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]",
                )}
              />
            </>
          ))}

        <div
          ref={trackRef}
          className={cx(
            "flex will-change-transform select-none relative z-0",
            "motion-reduce:transform-none",
            isVertical ? "flex-col h-max w-full" : "flex-row w-max",
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {logoLists}
        </div>
      </div>
    );
  },
);

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;

