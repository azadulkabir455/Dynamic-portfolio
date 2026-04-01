"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Container from "@/blocks/elements/container/Container";
import Icon from "@/blocks/elements/icon/Icon";
import Text from "@/blocks/elements/text/Text";
import { cn } from "@/utilities/helpers/classMerge";
import { EDUCATION_MILESTONES } from "@/blocks/sections/frontend/Education/educationData";
import type { EducationMilestone, EducationProps } from "@/blocks/sections/frontend/Education/type";

const defaultTitle = "Education roadmap";

const ROAD_PATH_D =
  "M 200 36 C 52 120 348 220 200 300 C 52 380 348 480 200 560 C 52 640 348 740 200 780";

const VIEW_W = 400;
const VIEW_H = 800;

const STOP_T = [0.16, 0.5, 0.84] as const;

/** Road is drawn only between first and last milestones (no extra tails). */
const PATH_START_T = STOP_T[0];
const PATH_END_T = STOP_T[STOP_T.length - 1];

function tAlongRoad(scroll01: number): number {
  const s = Math.min(1, Math.max(0, scroll01));
  return PATH_START_T + s * (PATH_END_T - PATH_START_T);
}

/** Polyline along [PATH_START_T, PATH_END_T] — dashed line starts/ends at milestone centers. */
function buildSegmentPathD(pathEl: SVGPathElement, len: number): string {
  const a = PATH_START_T * len;
  const b = PATH_END_T * len;
  const steps = 72;
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const dist = a + (i / steps) * (b - a);
    pts.push(pathEl.getPointAtLength(Math.min(dist, b)));
  }
  const p0 = pts[0]!;
  let d = `M ${p0.x} ${p0.y}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i]!;
    d += ` L ${p.x} ${p.y}`;
  }
  return d;
}

function activeIndexFromProgress(v: number): number {
  if (v >= 2 / 3) return 2;
  if (v >= 1 / 3) return 1;
  return 0;
}

const Education = ({
  sectionTitle = defaultTitle,
  milestones = EDUCATION_MILESTONES,
}: EducationProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [pathLength, setPathLength] = useState(0);
  const [visiblePathD, setVisiblePathD] = useState("");
  const [stopPoints, setStopPoints] = useState<
    { x: number; y: number; t: number }[]
  >([]);
  const [iconPos, setIconPos] = useState({ x: 200, y: 36 });
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setPathLength(len);
    setVisiblePathD(buildSegmentPathD(path, len));
    const pts = STOP_T.map((t) => {
      const p = path.getPointAtLength(t * len);
      return { x: p.x, y: p.y, t };
    });
    setStopPoints(pts);
    const start = path.getPointAtLength(PATH_START_T * len);
    setIconPos({ x: start.x, y: start.y });
  }, []);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || !pathLength) return;
    const v = scrollYProgress.get();
    setActiveIndex(activeIndexFromProgress(v));
    const pt = path.getPointAtLength(tAlongRoad(v) * pathLength);
    setIconPos({ x: pt.x, y: pt.y });
  }, [pathLength, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(activeIndexFromProgress(v));
    const path = pathRef.current;
    if (!path || !pathLength) return;
    const pt = path.getPointAtLength(tAlongRoad(v) * pathLength);
    setIconPos({ x: pt.x, y: pt.y });
  });

  return (
    <Container
      as="section"
      className={cn("relative w-full bg-secondary py-[120px]")}
      id="education"
    >
      <div ref={sectionRef} className="relative min-h-[280vh] w-full">
        <Container as="div" className="maxContainer relative px-4 md:px-6">
          <Text
            variant="h2"
            className={cn(
              "font-antonio text-5xl font-bold capitalize leading-tight text-primary",
              "mb-10 text-center md:text-6xl lg:text-left lg:text-7xl",
            )}
          >
            {sectionTitle}
          </Text>
        </Container>

        <div className="sticky top-0 z-10 flex min-h-screen w-full items-center justify-center px-4 py-10 md:px-6">
          <Container
            as="div"
            className={cn("relative w-full max-w-lg md:max-w-2xl")}
          >
            <div
              className="relative mx-auto w-full"
              style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
            >
              <svg
                className="absolute inset-0 h-full w-full text-primary/40"
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                preserveAspectRatio="xMidYMid meet"
                aria-hidden
              >
                <path
                  ref={pathRef}
                  d={ROAD_PATH_D}
                  fill="none"
                  stroke="none"
                  className="pointer-events-none"
                  aria-hidden
                />
                {visiblePathD ? (
                  <path
                    d={visiblePathD}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeDasharray="12 10"
                    vectorEffect="non-scaling-stroke"
                  />
                ) : null}
                {stopPoints.map((pt, i) => (
                  <g key={i}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={22}
                      className={cn(
                        "transition-colors duration-300",
                        activeIndex === i
                          ? "fill-[#2d9b6a]"
                          : "fill-[#2a2d32]",
                      )}
                    />
                    <text
                      x={pt.x}
                      y={pt.y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      style={{ fontSize: 17, fontWeight: 700 }}
                    >
                      {i + 1}
                    </text>
                  </g>
                ))}
              </svg>

              <div
                className="pointer-events-none absolute z-20 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary bg-secondary shadow-md"
                style={{
                  left: `${(iconPos.x / VIEW_W) * 100}%`,
                  top: `${(iconPos.y / VIEW_H) * 100}%`,
                }}
              >
                <Icon
                  name="MapPin"
                  size={20}
                  className="text-primary"
                  strokeWidth={2.25}
                />
              </div>

              {stopPoints.map((pt, i) => {
                const m = milestones[i];
                if (!m) return null;
                const leftPct = (pt.x / VIEW_W) * 100;
                const topPct = (pt.y / VIEW_H) * 100;
                const flipRight = i % 2 === 1;
                return (
                  <div
                    key={i}
                    className="pointer-events-none absolute z-30"
                    style={{
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                      transform: "translate(-50%, -100%)",
                      marginTop: "-14px",
                    }}
                  >
                    <div
                      className={cn(
                        "pointer-events-auto",
                        flipRight
                          ? "translate-x-[min(10vw,3rem)]"
                          : "-translate-x-[min(10vw,3rem)]",
                      )}
                    >
                      <EducationTooltip
                        open={activeIndex === i}
                        milestone={m}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </div>
      </div>
    </Container>
  );
};

function EducationTooltip({
  open,
  milestone,
}: {
  open: boolean;
  milestone: EducationMilestone;
}) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: open ? 1 : 0,
        y: open ? 0 : 12,
        scale: open ? 1 : 0.94,
      }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "w-[min(100vw-2rem,280px)] rounded-[28px] bg-[#222529] px-5 py-4 text-left shadow-[0_16px_40px_rgba(0,0,0,0.35)]",
        !open && "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <Text
        variant="p"
        className="font-open-sans text-[15px] font-semibold leading-snug text-white"
      >
        {milestone.institutionName}
      </Text>
      <Text
        variant="p"
        className="mt-2 font-open-sans text-sm text-white/70"
      >
        <span className="text-white/95">Subject: </span>
        {milestone.subject}
      </Text>
      <Text variant="p" className="mt-1 font-open-sans text-sm text-white/70">
        <span className="text-white/95">Result: </span>
        {milestone.result}
      </Text>
      <div
        className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 border-x-[10px] border-t-[12px] border-x-transparent border-t-[#222529]"
        aria-hidden
      />
    </motion.div>
  );
}

export default Education;
