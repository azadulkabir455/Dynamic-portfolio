"use client";

import Container from "@/blocks/elements/container/Container";
import { cn } from "@/utilities/helpers/classMerge";
import { defaultSkillsData } from "./component/data/Data";
import SkillsTitle from "./component/title/Title";
import type { SkillsProps } from "./type";
import SkillRadial from "./component/skillRadial/SkillRadial";

const Skills = (props: SkillsProps = {}) => {
  const data = { ...defaultSkillsData, ...props };

  return (
    <Container
      as="section"
      id="skills"
      className={cn(
        "relative w-full overflow-hidden",
        "bg-cover bg-center bg-no-repeat bg-fixed",
      )}
      style={{
        backgroundImage: `linear-gradient(to top, color-mix(in srgb, var(--secondary) 70%, transparent) 0%, color-mix(in srgb, var(--secondary) 50%, transparent) 100%), url("${data.skillBackgroundImage}")`,
      }}
    >
      <SkillsTitle
        imageUrl={data.skillBackgroundImage}
        text={data.skillTitle}
      />
      <SkillRadial title={data.skillRadialTitle} orbits={data.skillOrbits} />
    </Container>
  );
};

export default Skills;
