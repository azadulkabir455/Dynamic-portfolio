export type ProjectTwoCardProps = {
  imageSrc: string;
  imageAlt: string;
  /** Small pill label above the title (e.g. category). */
  tag: string;
  title: string;
  description: string;
  liveLink: string;
  viewLink: string;
  liveLabel?: string;
  viewLabel?: string;
  className?: string;
};
