"use client";

import { useEffect, useMemo, useRef, useState, useId } from "react";
import { cn } from "@/utilities/helpers/classMerge";

const MARQUEE_TEXT = "TRAININGS ✦ & ✦ CERTIFICATIONS ✦ ";
const WORD_SPACING = 30;
const SPEED = 0.5;

// ViewBox: 0 0 1440 215
// Cubic bezier — horizontal tangents at both ends (flat ~30px at edges) + smooth peak
// C1/C4 at same y as endpoints → horizontal entry/exit
// C2/C3 at same y as peak → horizontal arrival at peak → G1-smooth throughout
// Outer: endpoints y=140, peak y=10,  band=69px
// Inner: endpoints y=209, peak y=79
// Text:  endpoints y=194, peak y=64  (46px font, ~20px gap top, 15px gap bottom)
const TEXT_PATH_D =
  "M-100,194 C 450,194 450,64 720,64 C 990,64 990,194 1540,194";
const BG_PATH_D =
  "M-100,140 C 450,140 450,10 720,10 C 990,10 990,140 1540,140 L1540,209 C 990,209 990,79 720,79 C 450,79 450,209 -100,209 Z";
const TEXT_FONT_SIZE = 46;

const textTypography = cn("font-antonio font-bold uppercase leading-none");

const CertArch = () => {
  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const uid = useId();
  const pathId = `cert-arch-${uid}`;
  const ready = spacing > 0;

  const totalText = useMemo(() => {
    if (!spacing) return MARQUEE_TEXT;
    return Array(Math.ceil(2400 / spacing) + 2)
      .fill(MARQUEE_TEXT)
      .join("");
  }, [spacing]);

  useEffect(() => {
    const measure = () => {
      if (measureRef.current) {
        setSpacing(measureRef.current.getComputedTextLength());
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!spacing || !textPathRef.current) return;
    textPathRef.current.setAttribute("startOffset", `${-spacing}px`);
  }, [spacing]);

  useEffect(() => {
    if (!ready) return;
    let rafId = 0;
    const step = () => {
      if (textPathRef.current) {
        const current = parseFloat(
          textPathRef.current.getAttribute("startOffset") || "0",
        );
        let next = current + SPEED;
        if (next >= 0) next -= spacing;
        textPathRef.current.setAttribute("startOffset", `${next}px`);
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [spacing, ready]);

  return (
    <div
      className="w-full"
      style={{ visibility: ready ? "visible" : "hidden" }}
    >
      <svg
        viewBox="0 0 1440 215"
        className="block h-auto w-full max-w-full select-none overflow-visible align-top"
        preserveAspectRatio="xMidYMin meet"
      >
        <path d={BG_PATH_D} fill="var(--quaternary)" />

        <text
          ref={measureRef}
          className={textTypography}
          fontSize={TEXT_FONT_SIZE}
          style={{
            visibility: "hidden",
            opacity: 0,
            pointerEvents: "none",
            wordSpacing: `${WORD_SPACING}px`,
          }}
        >
          {MARQUEE_TEXT}
        </text>

        <defs>
          <path id={pathId} d={TEXT_PATH_D} fill="none" stroke="transparent" />
        </defs>

        {ready && (
          <text
            className={textTypography}
            fontSize={TEXT_FONT_SIZE}
            style={{
              fill: "var(--ternaryLight)",
              wordSpacing: `${WORD_SPACING}px`,
            }}
          >
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={`${-spacing}px`}
              xmlSpace="preserve"
            >
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CertArch;
