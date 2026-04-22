export type PortfolioCardSurface = "primary" | "ternaryLight";

export type PortfolioCardProps = {
  title: string;
  description: string;
  duration?: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
  surface?: PortfolioCardSurface;
};
