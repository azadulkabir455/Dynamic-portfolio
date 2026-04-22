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

const secondaryR = 229;
const secondaryG = 206;
const secondaryB = 177;
const s = (a: number) => `rgba(${secondaryR},${secondaryG},${secondaryB},${a})`;

const iconPad = 48;
const iconBorderRadius = 15;
const baseRadius = 200;
const mobileBaseRadius = 160;
const desktopIconSize = 55;
const mobileIconSize = 46;
const maxIconsPerRing = 20;
const xlBreakpoint = 1280;
const lgBreakpoint = 1024;
const mdBreakpoint = 768;

type RingCfg = {
  duration: number;
  direction: 1 | -1;
  spacing: number;
};

function getRingConfigs(iconSize: number): RingCfg[] {
  return [
    { duration: 72, direction: 1, spacing: iconSize * 8 },
    { duration: 52, direction: -1, spacing: iconSize * 5 },
    { duration: 52, direction: 1, spacing: iconSize * 8 },
    { duration: 86, direction: -1, spacing: iconSize * 6 },
    { duration: 52, direction: 1, spacing: iconSize * 8 },
    { duration: 98, direction: -1, spacing: iconSize * 8 },
  ];
}

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
  const centerAlpha = +(0.32 * dimFactor).toFixed(2);
  const edgeAlpha = +(0.04 * dimFactor).toFixed(2);
  return `radial-gradient(circle, ${s(centerAlpha)} 0%, ${s(edgeAlpha)} 100%)`;
}

function getResponsiveContainerHeight(): number {
  if (typeof window === "undefined") return 575;
  if (window.innerWidth >= xlBreakpoint) return 575;
  if (window.innerWidth >= lgBreakpoint) return 500;
  return 430;
}

function getResponsiveIconSize(): number {
  if (typeof window === "undefined") return desktopIconSize;
  return window.innerWidth < mdBreakpoint ? mobileIconSize : desktopIconSize;
}

function getResponsiveBaseRadius(): number {
  if (typeof window === "undefined") return baseRadius;
  return window.innerWidth < mdBreakpoint ? mobileBaseRadius : baseRadius;
}

function RingIcon({
  skill,
  x,
  y,
  ringAngle,
  iconSize,
}: {
  skill: SkillItem;
  x: number;
  y: number;
  ringAngle: MotionValue<number>;
  iconSize: number;
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
        backgroundColor: "var(--primary)",
        border: "1px solid var(--secondary)",
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
  iconSize,
}: {
  ringIndex: number;
  ring: SkillRing;
  radius: number;
  totalRings: number;
  cfg: RingCfg;
  iconSize: number;
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
            border:
              ringIndex === 0
                ? "none"
                : "1px solid var(--secondary)",
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
              iconSize={iconSize}
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
  const iconSize = getResponsiveIconSize();
  const ringConfigs = getRingConfigs(iconSize);
  const effectiveBaseRadius = getResponsiveBaseRadius();
  const maxRadius = containerH - iconPad;
  const ringGap =
    totalRings > 1 ? (maxRadius - effectiveBaseRadius) / (totalRings - 1) : 0;
  const containerW = maxRadius * 2 + iconPad * 2;

  return (
    <Container
      as="div"
      className={cn("relative left-1/2 -translate-x-1/2", className)}
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
          const radius = effectiveBaseRadius + ringGap * ringIndex;
          const cfg = ringConfigs[ringIndex] ?? {
            duration: 44 + ringIndex * 16,
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
              iconSize={iconSize}
            />
          );
        },
      )}

    </Container>
  );
}
