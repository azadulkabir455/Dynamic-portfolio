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
        "pt-0 lg:pt-[30px] xl:pt-[60px]",
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
          className={cn("flex flex-col gap-x-[15px] gap-y-3 lg:gap-y-[30px] xl:gap-y-[50px]")}
        >
          <Container
            as="div"
            className={cn(
              "grid grid-cols-1 lg:grid-cols-5 w-full min-w-0 items-end gap-[15px]",
            )}
          >
            <Text
              variant="h2"
              className={cn(
                "text-center lg:text-left pb-5 lg:pb-0",
                "lg:col-span-3 min-w-0 flex-1 font-antonio font-bold capitalize text-primary",
                "text-[40px] lg:text-[60px] xl:text-[80px] leading-[48px] lg:leading-[70px] xl:leading-[90px] tracking-normal",
              )}
            >
              {renderTitleWithBreaks(title)}
            </Text>
            <Container
              as="div"
              className="lg:col-span-2 grid grid-cols-2 shrink-0 flex-row flex-wrap gap-[15px]"
            >
              {firstRowLogos.map((logo, index) =>
                renderLogo(logo, index, "company-logo-top"),
              )}
            </Container>
          </Container>

          {restLogos.length > 0 ? (
              <Container
                className={cn(
                  "grid grid-cols-2 lg:grid-cols-5 justify-items-start gap-x-[15px] gap-y-[15px] lg:gap-y-[30px] xl:gap-y-[50px]",
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
          "mt-[30px] lg:mt-[60px] bg-ternary pt-10 pb-6 lg:py-5",
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
