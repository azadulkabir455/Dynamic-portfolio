export type SkillItem = {
  name: string;
  blurb: string;
};

export type SkillsData = {
  title: string;
  subtitle: string;
  backgroundImage: string;
  backgroundAlt: string;
  items: SkillItem[];
};

export type SkillsProps = Partial<SkillsData>;
