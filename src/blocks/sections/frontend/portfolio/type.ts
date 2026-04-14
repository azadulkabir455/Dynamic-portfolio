import type { PortfolioCardProps } from "./component/card/type";

export type PortfolioViewAllButton = {
  href: string;
  label: string;
};

export type PortfolioData = {
  portfolioTitle: string;
  viewAllButton: PortfolioViewAllButton;
  portfolios: PortfolioCardProps[];
};

export type PortfolioProps = {
  content?: Partial<PortfolioData> | null;
};
