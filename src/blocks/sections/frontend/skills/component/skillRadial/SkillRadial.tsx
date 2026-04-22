"use client";

import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import { cn } from "@/utilities/helpers/classMerge";
import type { SkillOrbits } from "../../type";
import RadialSkills from "./element/RadialSkills";
import type { SkillRadialProps, SkillRing } from "./type";

function orbitsToRings(orbits: SkillOrbits): SkillRing[] {
  return [
    null,
    { skills: orbits.orbitOne },
    null,
    { skills: orbits.orbitTwo },
    null,
    { skills: orbits.orbitThree },
  ];
}

export default function SkillRadial({
  centerText = "Technical Skill",
  orbits,
  className,
}: SkillRadialProps) {
  return (
    <Container
      as="div"
      className={cn(
        " pt-[60px] lg:pt-[120px]",
        "bg-gradient-to-b from-primary via-primary/70 to-transparent"
      )}
    >
      <Container as="div"
        className={cn(
          "maxContainer",
          className)}>
        {orbits && (
          <RadialSkills
            rings={orbitsToRings(orbits)}
            centerText={centerText}
            className="mx-auto"
          />
        )}
      </Container>
    </Container>
  );
}
