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
  title,
  centerText = "Technical Skill",
  orbits,
  className,
}: SkillRadialProps) {
  return (
    <Container as="div" className={cn("maxContainer", className)}>
      <Text
        variant="h3"
        className={cn(
          "font-antonio font-bold capitalize text-left",
          "text-[40px] lg:text-[60px] xl:text-[80px] leading-[48px] lg:leading-[70px] xl:leading-[90px] tracking-normal",
          "text-ternary-light",
          "py-[30px] lg:py-[60px] xl:py-[120px]",
        )} 
      >
        {title}
      </Text>
      {orbits && (
        <RadialSkills
          rings={orbitsToRings(orbits)}
          centerText={centerText}
          className="mx-auto"
        />
      )}
    </Container>
  );
}
