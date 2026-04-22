"use client";

import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import { cn } from "@/utilities/helpers/classMerge";
import PortfolioCard from "./component/card/PortfolioCard";
import ViewAllProjectsButton from "./component/cta/ViewAllProjectsButton";
import { defaultPortfolioData } from "./component/data/Data";
import type { PortfolioData, PortfolioProps } from "./type";

const stickyTitleTopClass = "top-[60px]";
const stickyItemTopClasses = [
  "top-[130px] lg:top-[190px]",
  "top-[160px] lg:top-[220px]",
  "top-[190px] lg:top-[250px]",
  "top-[220px] lg:top-[280px]",
] as const;

function mergePortfolioData(content: Partial<PortfolioData>): PortfolioData {
  return {
    ...defaultPortfolioData,
    ...content,
    viewAllButton: {
      ...defaultPortfolioData.viewAllButton,
      ...(content.viewAllButton ?? {}),
    },
    portfolios:
      content.portfolios !== undefined
        ? content.portfolios
        : defaultPortfolioData.portfolios,
  };
}

const Portfolio = ({ content }: PortfolioProps) => {
  const data =
    content != null ? mergePortfolioData(content) : defaultPortfolioData;

  return (
    <Container
      as="section"
      id="project-two"
      className={cn(
        "ternaryBacgroundColor",
        "py-[60px]",
      )}
    >
      <Container
        as="div"
        className={cn("maxContainer")}
      >
        <Container className="relative w-full">
          <Container
            className={cn(
              "sticky mb-[30px] lg:mb-[60px]",
              stickyTitleTopClass,
            )}
            style={{ zIndex: 20 }}
          >
            <Text
              variant="h2"
              className={cn(
                "text-center text-[40px] lg:text-[60px] xl:text-[80px] text-secondary",
                "font-antonio font-bold capitalize leading-[48px] lg:leading-[70px] xl:leading-[90px] tracking-normal ",
              )}
            >
              {data.portfolioTitle}
            </Text>
          </Container>

          <Container className="flex w-full flex-col gap-[50px]">
            {data.portfolios.map((card, stackIndex) => (
              <Container
                key={`${card.title}-${card.buttonLink}-${stackIndex}`}
                className={cn(
                  "sticky w-full max-w-full",
                  stickyItemTopClasses[stackIndex],
                  stackIndex === 0 &&
                    "mx-[10px] w-[calc(100%-20px)] lg:mx-[20px] lg:w-[calc(100%-40px)]",
                  stackIndex === 1 &&
                    "mx-[5px] w-[calc(100%-10px)] lg:mx-[10px] lg:w-[calc(100%-20px)]",
                )}
                style={{ zIndex: 30 + stackIndex }}
              >
                <PortfolioCard
                  {...card}
                  className="w-full"
                  surface={stackIndex % 3 === 1 ? "primary" : "ternaryLight"}
                />
              </Container>
            ))}

            <Container
              className={cn(
                "sticky flex w-full justify-center",
                stickyItemTopClasses[3],
              )}
              style={{ zIndex: 60 }}
            >
              <ViewAllProjectsButton
                allProjectHref={data.viewAllButton.href}
                allProjectLabel={data.viewAllButton.label}
              />
            </Container>
          </Container>

          <Container
            className={cn("sticky w-full", stickyItemTopClasses[3])}
            style={{ zIndex: 70 }}
            aria-hidden
          >
          </Container>

          <Container
            className="w-full shrink-0"
            aria-hidden
          />
        </Container>
      </Container>
    </Container>
  );
};

export default Portfolio;
