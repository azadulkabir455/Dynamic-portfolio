export type SkillItem = {
  imageUrl: string;
  label: string;
};

export type SkillRing = {
  skills: SkillItem[];
} | null;

export type SkillRadialProps = {
  title: string;
  centerText?: string;
  orbits?: import("../../type").SkillOrbits;
  className?: string;
};

export type RadialSkillsProps = {
  rings: SkillRing[];
  centerText?: string;
  className?: string;
};
