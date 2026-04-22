import type { SkillSliderSlide } from "./component/skillSlider/type";

export type SkillItem = {
  imageUrl: string;
  label: string;
};

export type SkillOrbits = {
  orbitOne: SkillItem[];
  orbitTwo: SkillItem[];
  orbitThree: SkillItem[];
};

export type SkillsData = {
  skillBackgroundImage: string;
  skillTitle: string;
  skillRadialTitle: string;
  skillOrbits: SkillOrbits;
  skillSliderSlides: SkillSliderSlide[];
};

export type SkillsProps = Partial<SkillsData>;
