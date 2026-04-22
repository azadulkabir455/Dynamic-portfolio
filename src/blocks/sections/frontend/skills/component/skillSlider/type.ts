export type SkillSliderTagItem = {
  label: string;
};

export type SkillSliderSlide = {
  id: string;
  title: string;
  tags: SkillSliderTagItem[];
};

export type SkillSliderProps = {
  slides: SkillSliderSlide[];
  className?: string;
};
