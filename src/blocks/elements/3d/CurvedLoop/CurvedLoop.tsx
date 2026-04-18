"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { cn } from "@/utilities/helpers/classMerge";
import type { CurvedLoopProps } from "./type";
import {
  wordGapForCurvedLoop,
  curvedLoopViewBox,
  getCurvePathD,
  prepareMarqueeText,
} from "./functions";

const wordSpacingStyle = {
  wordSpacing: `${wordGapForCurvedLoop * 2}px`,
} as const;

const curvedTextTypography = cn(
  "font-antonio font-bold uppercase tracking-normal text-center",
  "text-[68px] leading-none lg:text-[28px]",
  "fill-secondary",
);

const CurvedLoop = ({
  marqueeText = "",
  speed = 2,
  className,
  wrapperClassName,
  curveAmount = 0,
  direction = "left",
  interactive = true,
}: CurvedLoopProps) => {
  const text = useMemo(() => prepareMarqueeText(marqueeText), [marqueeText]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = useMemo(() => getCurvePathD(curveAmount), [curveAmount]);

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  const textLength = spacing;
  const totalText = textLength
    ? Array(Math.ceil(1800 / textLength) + 2)
        .fill(text)
        .join("")
    : text;
  const ready = spacing > 0;

  useEffect(() => {
    const measure = () => {
      if (measureRef.current) {
        setSpacing(measureRef.current.getComputedTextLength());
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [text, className]);

  useEffect(() => {
    dirRef.current = direction;
  }, [direction]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute("startOffset", `${initial}px`);
      setOffset(initial);
    }
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;
    let rafId = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === "right" ? speed : -speed;
        const currentOffset = parseFloat(
          textPathRef.current.getAttribute("startOffset") || "0",
        );
        let newOffset = currentOffset + delta;
        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;
        textPathRef.current.setAttribute("startOffset", `${newOffset}px`);
        setOffset(newOffset);
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [spacing, speed, ready]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    dragRef.current = true;
    setDragging(true);
    lastXRef.current = e.clientX;
    velRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    const currentOffset = parseFloat(
      textPathRef.current.getAttribute("startOffset") || "0",
    );
    let newOffset = currentOffset + dx;
    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;
    textPathRef.current.setAttribute("startOffset", `${newOffset}px`);
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    setDragging(false);
    dirRef.current = velRef.current > 0 ? "right" : "left";
  };

  const cursorStyle = interactive ? (dragging ? "grabbing" : "grab") : "auto";

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center",
        wrapperClassName ?? "min-h-[42px]",
      )}
      style={{ visibility: ready ? "visible" : "hidden", cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className={cn(
          "block h-auto w-full max-w-full overflow-visible align-top select-none",
          "max-lg:-mb-1 max-lg:-translate-y-px",
        )}
        viewBox={curvedLoopViewBox}
        preserveAspectRatio="xMidYMin meet"
      >
        <text
          ref={measureRef}
          className={cn(curvedTextTypography, className)}
          xmlSpace="preserve"
          style={{
            visibility: "hidden",
            opacity: 0,
            pointerEvents: "none",
            ...wordSpacingStyle,
          }}
        >
          {text}
        </text>
        <defs>
          <path id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready ? (
          <text
            xmlSpace="preserve"
            className={cn(curvedTextTypography, className)}
            style={wordSpacingStyle}
          >
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={`${offset}px`}
              xmlSpace="preserve"
            >
              {totalText}
            </textPath>
          </text>
        ) : null}
      </svg>
    </div>
  );
};

export default CurvedLoop;
