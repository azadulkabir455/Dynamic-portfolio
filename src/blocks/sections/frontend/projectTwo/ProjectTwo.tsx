"use client";

import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import { cn } from "@/utilities/helpers/classMerge";
import ProjectTwoCard from "@/blocks/sections/frontend/projectTwo/component/card/ProjectTwoCard";
import ProjectTwoHighlightCards from "@/blocks/sections/frontend/projectTwo/component/highlightCards/ProjectTwoHighlightCards";
import { PROJECT_TWO_CARDS } from "@/blocks/sections/frontend/projectTwo/projectTwoData";
import { PROJECT_TWO_HIGHLIGHTS } from "@/blocks/sections/frontend/projectTwo/projectTwoHighlights";
import type { ProjectTwoProps } from "@/blocks/sections/frontend/projectTwo/type";

const defaultTitle = "Featured work";

const ProjectTwo = ({
  sectionTitle = defaultTitle,
  titleClassName,
}: ProjectTwoProps) => {
  return (
    <Container
      as="section"
      className={cn("relative z-0 w-full")}
      id="project-two"
    >
      <Container
        as="div"
        className={cn("-mt-[40px] w-full")}
      >
        <Container
          as="div"
          className={cn(
            "w-full rounded-t-2xl bg-primary py-[120px]",
          )}
        >
          <Container
            as="div"
            className={cn(
              "maxContainer flex w-full flex-col gap-12 px-4 md:gap-16 md:px-6",
              "lg:flex-row lg:items-stretch lg:gap-16",
            )}
          >
            <Container
              as="div"
              className={cn(
                "w-full",
                "lg:max-w-[42%] lg:shrink-0 lg:basis-[42%]",
              )}
            >
              <Container
                as="div"
                className={cn(
                  "lg:sticky lg:top-8",
                  "lg:flex lg:min-h-[calc(100svh-2rem)] lg:flex-col lg:justify-center",
                )}
              >
                <Text
                  variant="h2"
                  className={cn(
                    "font-antonio text-[100px] font-bold capitalize leading-tight text-secondary",
                    titleClassName,
                  )}
                >
                  {sectionTitle}
                </Text>
                <ProjectTwoHighlightCards items={PROJECT_TWO_HIGHLIGHTS} />
              </Container>
            </Container>

            <Container
              as="div"
              className={cn("flex min-h-0 w-full flex-col lg:flex-1")}
            >
              {PROJECT_TWO_CARDS.map((card, i) => (
                <Container
                  key={card.viewLink}
                  as="div"
                  className={cn(
                    "relative isolate w-full",
                    "flex min-h-[100vh] items-center py-6 md:py-10",
                    "sticky top-0",
                  )}
                  style={{ zIndex: i + 1 }}
                >
                  <ProjectTwoCard {...card} className="w-full" />
                </Container>
              ))}
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default ProjectTwo;
