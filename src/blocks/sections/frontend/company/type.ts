import type { LogoProps } from "./component/logo/type";

export type CompanyLogo = LogoProps & {
  href?: string;
};

export type CompanyData = {
  title: string;
  logos: CompanyLogo[];
};

export type CompanyProps = Partial<CompanyData>;

