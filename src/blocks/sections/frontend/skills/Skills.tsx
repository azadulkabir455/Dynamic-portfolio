"use client";

import Container from "@/blocks/elements/container/Container";
import { cn } from "@/utilities/helpers/classMerge";
import { defaultSkillsData } from "./component/data/Data";
import SkillsTitle from "./component/title/Title";
import type { SkillsProps } from "./type";
import SkillRadial from "./component/skillRadial/SkillRadial";
import SkillSlider from "./component/skillSlider/SkillSlider";

const Skills = (props: SkillsProps = {}) => {
  const data = { ...defaultSkillsData, ...props };

  return (
    <Container>
      <Container
        as="section"
        id="skills"
        className={cn(
          "relative w-full overflow-hidden",
          "bg-cover bg-center bg-no-repeat bg-fixed",
        )}
        style={{
          backgroundImage: `url("${data.skillBackgroundImage}")`,
        }}
      >
        <SkillsTitle
          imageUrl={data.skillBackgroundImage}
          text={data.skillTitle}
        />
        <SkillRadial title={data.skillRadialTitle} orbits={data.skillOrbits} />
      </Container>
      <Container
        as="div"
        className={cn(
          "bg-secondary",
          "maxContainer",
          "rounded-[24px]",
          "relative top-[-60px] lg:top-[-120px]"
        )}
      >
        <Container className={cn(
          "lg:pt-[40px]"
        )}>
          <SkillSlider slides={data.skillSliderSlides} />
        </Container>
      </Container>
    </Container>
  );
};

export default Skills;
