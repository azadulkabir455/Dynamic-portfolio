export type PortfolioCardSurface = "primary" | "ternary";

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
