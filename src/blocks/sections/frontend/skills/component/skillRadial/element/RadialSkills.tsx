"use client";

import Image from "@/blocks/elements/image/Image";
import { cn } from "@/utilities/helpers/classMerge";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useState } from "react";
import type { RadialSkillsProps, SkillItem, SkillRing } from "../type";
import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";

const primaryR = 195;
const primaryG = 63;
const primaryB = 64;
const p = (a: number) => `rgba(${primaryR},${primaryG},${primaryB},${a})`;

const containerH = 575;
const iconPad = 48;
const iconSize = 55;
const iconBorderRadius = 15;
const baseRadius = 200;
const maxIconsPerRing = 20;
const xlBreakpoint = 1280;
const lgBreakpoint = 1024;

type RingCfg = {
  duration: number;
  direction: 1 | -1;
  spacing: number;
};

const ringConfigs: RingCfg[] = [
  { duration: 68, direction: 1, spacing: iconSize * 8 },
  { duration: 50, direction: -1, spacing: iconSize * 5 },
  { duration: 50, direction: 1, spacing: iconSize * 8 },
  { duration: 80, direction: -1, spacing: iconSize * 6 },
  { duration: 50, direction: 1, spacing: iconSize * 8 },
  { duration: 90, direction: -1, spacing: iconSize * 8 },
];

function getIconCount(radius: number, minCount: number, spacing: number): number {
  const circumference = 2 * Math.PI * radius;
  const ideal = Math.round(circumference / spacing);
  return Math.max(minCount, Math.min(ideal, maxIconsPerRing));
}

function buildDisplaySkills(skills: SkillItem[], count: number): SkillItem[] {
  if (!skills.length) return [];
  return Array.from({ length: count }, (_, i) => skills[i % skills.length]);
}

function getRingBg(ringIndex: number, totalRings: number): string {
  const dimFactor = 1 - ringIndex * (0.7 / Math.max(totalRings - 1, 1));
  const centerAlpha = +(1.0 * dimFactor).toFixed(2);
  const edgeAlpha = +(0.2 * dimFactor).toFixed(2);
  return `radial-gradient(circle, ${p(centerAlpha)} 0%, ${p(edgeAlpha)} 100%)`;
}

function getResponsiveContainerHeight(): number {
  if (typeof window === "undefined") return 575;
  if (window.innerWidth >= xlBreakpoint) return 575;
  if (window.innerWidth >= lgBreakpoint) return 500;
  return 380;
}

function RingIcon({
  skill,
  x,
  y,
  ringAngle,
}: {
  skill: SkillItem;
  x: number;
  y: number;
  ringAngle: MotionValue<number>;
}) {
  const iconAngle = useTransform(ringAngle, (v) => -v);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: iconSize,
        height: iconSize,
        left: x - iconSize / 2,
        top: y - iconSize / 2,
        borderRadius: iconBorderRadius,
        overflow: "hidden",
        backgroundColor: "#C33F40",
        border: "0.5px solid color-mix(in srgb, var(--secondary) 35%, transparent)",
        transformOrigin: "center center",
        rotate: iconAngle,
        zIndex: 2,
      }}
    >
      <Image
        src={skill.imageUrl}
        alt={skill.label}
        width={iconSize}
        height={iconSize}
        className="h-full w-full object-contain p-2 brightness-0 invert"
      />
    </motion.div>
  );
}

function Ring({
  ringIndex,
  ring,
  radius,
  totalRings,
  cfg,
}: {
  ringIndex: number;
  ring: SkillRing;
  radius: number;
  totalRings: number;
  cfg: RingCfg;
}) {
  const ringAngle = useMotionValue(0);

  useEffect(() => {
    const rotateTarget = 360 * cfg.direction;
    const controls = animate(ringAngle, rotateTarget, {
      duration: cfg.duration,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.stop();
  }, [ringAngle, cfg.direction, cfg.duration]);

  const hasIcons = !!(ring?.skills?.length);
  const iconCount = hasIcons ? getIconCount(radius, ring!.skills.length, cfg.spacing) : 0;
  const displaySkills = hasIcons ? buildDisplaySkills(ring!.skills, iconCount) : [];
  const zIdx = totalRings - ringIndex;

  return (
    <Container
     as="div"
      style={{
        position: "absolute",
        left: "50%",
        bottom: 0,
        transform: "translateX(-50%)",
        zIndex: zIdx,
      }}
    >
      <motion.div style={{ rotate: ringAngle, transformOrigin: "0 0" }}>
        <Container
          style={{
            position: "absolute",
            width: radius * 2,
            height: radius * 2,
            left: -radius,
            top: -radius,
            borderRadius: "50%",
            background: getRingBg(ringIndex, totalRings),
            border: ringIndex === 0 ? "none" : `1px solid ${p(0.30)}`,
            zIndex: 1,
          }}
        />

        {displaySkills.map((skill, skillIndex) => {
          const angleDeg = (360 / displaySkills.length) * skillIndex;
          const angleRad = (angleDeg * Math.PI) / 180;
          const x = Math.cos(angleRad) * radius;
          const y = -Math.sin(angleRad) * radius;

          return (
            <RingIcon
              key={skillIndex}
              skill={skill}
              x={x}
              y={y}
              ringAngle={ringAngle}
            />
          );
        })}
      </motion.div>
    </Container>
  );
}

export default function RadialSkills({
  rings,
  centerText,
  className,
}: RadialSkillsProps) {
  const [containerH, setContainerH] = useState<number>(getResponsiveContainerHeight);

  useEffect(() => {
    const updateContainerHeight = () => {
      setContainerH(getResponsiveContainerHeight());
    };

    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);
    return () => window.removeEventListener("resize", updateContainerHeight);
  }, []);

  const totalRings = rings.length;
  const maxRadius = containerH - iconPad;
  const ringGap = totalRings > 1 ? (maxRadius - baseRadius) / (totalRings - 1) : 0;
  const containerW = maxRadius * 2 + iconPad * 2;

  return (
    <Container
      as="div"
      className={cn("relative mx-auto", className)}
      style={{
        width: containerW,
        height: containerH,
        clipPath: "inset(0)",
        WebkitClipPath: "inset(0)",
      }}
    >
      {Array.from({ length: totalRings }, (_, i) => totalRings - 1 - i).map(
        (ringIndex) => {
          const ring = rings[ringIndex];
          const radius = baseRadius + ringGap * ringIndex;
          const cfg = ringConfigs[ringIndex] ?? {
            duration: 38 + ringIndex * 14,
            direction: (ringIndex % 2 === 0 ? 1 : -1) as 1 | -1,
            spacing: iconSize * 8,
          };

          return (
            <Ring
              key={ringIndex}
              ringIndex={ringIndex}
              ring={ring}
              radius={radius}
              totalRings={totalRings}
              cfg={cfg}
            />
          );
        },
      )}

      {centerText && (
        <Container
          as="span"
          className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none select-none"
          style={{ bottom: 20, zIndex: totalRings + 1 }}
        >
          <Text
            variant="h3"
            className="font-antonio text-[44px] xl:text-[54px] font-bold leading-[70px] xl:leading-[78px] tracking-[0%] capitalize text-secondary"
          >
            {centerText}
          </Text>
        </Container>
      )}
    </Container>
  );
}
