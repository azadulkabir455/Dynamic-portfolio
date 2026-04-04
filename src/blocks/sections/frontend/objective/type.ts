export type ObjectiveLogo = {
  src: string;
  alt: string;
  href?: string;
};

export type ObjectiveData = {
  titlePrefix: string;
  titleEmphasis: string;
  paragraph: string;
  logos: ObjectiveLogo[];
};

export type ObjectiveProps = Partial<ObjectiveData>;

