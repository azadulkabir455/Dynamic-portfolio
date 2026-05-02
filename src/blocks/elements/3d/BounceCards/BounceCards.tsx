"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/utilities/helpers/classMerge";

import type { BounceCardsProps } from "./type";

const DEFAULT_TRANSFORM_STYLES = [
  "rotate(10deg) translate(-170px)",
  "rotate(5deg) translate(-85px)",
  "rotate(-3deg)",
  "rotate(-10deg) translate(85px)",
  "rotate(2deg) translate(170px)",
];

const BounceCards = ({
  className = "",
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = DEFAULT_TRANSFORM_STYLES,
  enableHover = false,
  cardWidth = 200,
  cardHeight = 200,
  cardBorderWidth = 8,
  cardBorderColor = "white",
  cardBorderRadius = 30,
}: BounceCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".card",
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay]);

  const handleCardEnter = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const selector = q(`.card-${i}`);
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] ?? "none";

      if (i === hoveredIdx) {
        // Hovered card: keep rotation, just lift to front with slight scale
        gsap.set(selector, { zIndex: 20 });
        gsap.to(selector, {
          scale: 1.08,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        });
      } else {
        // Siblings: instantly drop to back, no movement
        gsap.set(selector, { zIndex: 0 });
        gsap.to(selector, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        });
      }
    });
  };

  const handleContainerLeave = () => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const selector = q(`.card-${i}`);
      gsap.killTweensOf(selector);

      gsap.set(selector, { zIndex: 0 });
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: containerWidth, height: containerHeight }}
      onMouseLeave={handleContainerLeave}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className={cn("card absolute overflow-hidden", `card-${idx}`)}
          style={{
            width: cardWidth,
            height: cardHeight,
            border: `${cardBorderWidth}px solid ${cardBorderColor}`,
            borderRadius: cardBorderRadius,
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transform: transformStyles[idx] ?? "none",
          }}
          onMouseEnter={() => handleCardEnter(idx)}
        >
          <img
            className="h-full w-full object-cover"
            src={src}
            alt={`card-${idx}`}
          />
        </div>
      ))}
    </div>
  );
};

export default BounceCards;
