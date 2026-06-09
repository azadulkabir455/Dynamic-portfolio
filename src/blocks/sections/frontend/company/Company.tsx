import { Fragment } from "react";
import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import { cn } from "@/utilities/helpers/classMerge";
import type { CompanyLogo, CompanyProps } from "./type";
import { defaultCompanyData } from "./component/data/Data";
import Logo from "./component/logo/Logo";
import CurvedLoop from "@/blocks/elements/3d/CurvedLoop/CurvedLoop";

function renderTitleWithBreaks(title: string) {
  const parts = title.split(/<br\s*\/?>/i);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 ? <br /> : null}
    </Fragment>
  ));
}

const Company = (props: CompanyProps) => {
  const { title, logos } = {
    ...defaultCompanyData,
    ...props,
  };

  const firstRowLogoCount = 2;
  const firstRowLogos = logos.slice(0, firstRowLogoCount);
  const restLogos = logos.slice(firstRowLogoCount);

  const renderLogo = (logo: CompanyLogo, index: number, keyPrefix: string) => (
    <Logo key={`${keyPrefix}-${index}`} src={logo.src} alt={logo.alt} />
  );

  return (
    <Container
      as="section"
      id="company"
      className={cn(
        "pt-0 md:pt-[60px]",
      )}
    >
      <Container
        as="div"
        className={cn(
          "maxContainer"
        )}
      >
        <Container
          as="div"
          className={cn("flex flex-col gap-x-[15px] gap-y-3 md:gap-y-[30px] xl:gap-y-[50px]")}
        >
          {/* Mobile: title + all logos */}
          <Text
            variant="h2"
            className={cn(
              "md:hidden text-center pb-5",
              "font-antonio font-bold capitalize text-primary",
              "text-[40px] leading-[48px] tracking-normal",
            )}
          >
            {renderTitleWithBreaks(title)}
          </Text>
          <Container
            className="md:hidden grid grid-cols-2 gap-[15px]"
          >
            {logos.map((logo, index) =>
              renderLogo(logo, index, "company-logo-mobile"),
            )}
          </Container>

          {/* Tablet / Desktop */}
          <Container
            as="div"
            className={cn(
              "relative hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-[15px] items-start",
            )}
          >
            <Container
              as="span"
              className="hidden md:block absolute top-[35px] left-[165px] lg:left-[220px] right-[calc(50%-7.5px)] lg:right-[calc(40%-9px)] h-[2px] bg-primary z-0"
              aria-hidden
            />
            <Text
              variant="h2"
              className={cn(
                "md:col-span-2 lg:col-span-3",
                "md:text-left md:pb-0",
                "relative z-10 md:pr-4",
                "font-antonio font-bold capitalize text-primary",
                "md:text-[48px] lg:text-[64px] md:leading-[56px] lg:leading-[70px] tracking-normal",
              )}
            >
              {renderTitleWithBreaks(title)}
            </Text>
            {firstRowLogos.map((logo, index) =>
              renderLogo(logo, index, "company-logo-top"),
            )}
          </Container>

          {restLogos.length > 0 ? (
            <Container
              className={cn(
                "hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-[15px] md:gap-y-[30px] xl:gap-y-[50px]",
              )}
            >
              {restLogos.map((logo, index) =>
                renderLogo(logo, index, "company-logo-grid"),
              )}
            </Container>
          ) : null}
        </Container>
      </Container>
      <Container
        as="div"
        className={cn(
          "mt-[30px] md:mt-[60px] ternaryLightBacgroundColor pt-10 pb-6 md:py-5",
        )}
      >
        <CurvedLoop
          marqueeText="Be ✦ Creative ✦ With ✦ React ✦ Bits ✦"
          speed={0.5}
          direction="left"
          interactive={true}
          wrapperClassName="min-h-0"
        />
      </Container>
    </Container>
  );
};

export default Company;
