"use client";

import { useEffect, useRef } from "react";
import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import { cn } from "@/utilities/helpers/classMerge";
import ProjectTwoCard from "@/blocks/sections/frontend/portfolio/component/card/ProjectTwoCard";
import ProjectTwoHighlightCards from "@/blocks/sections/frontend/portfolio/component/highlightCards/ProjectTwoHighlightCards";
import { PROJECT_TWO_CARDS } from "@/blocks/sections/frontend/portfolio/projectTwoData";
import { PROJECT_TWO_HIGHLIGHTS } from "@/blocks/sections/frontend/portfolio/projectTwoHighlights";
import type { ProjectTwoProps } from "@/blocks/sections/frontend/portfolio/type";
import {
  animateScrollTo,
  clampScrollY,
  lockPageScroll,
  unlockPageScroll,
  scrollDurationMs,
} from "@/blocks/elements/3d/SectionScrollSnap/functions";

const EASE = "cubic-bezier(0.72,0,0.28,1)";
const DUR_S = scrollDurationMs / 1000;

const defaultTitle = "Featured work";

const ProjectTwo = ({
  sectionTitle = defaultTitle,
  titleClassName,
}: ProjectTwoProps) => {
  const busyRef = useRef(false);

  useEffect(() => {
    const handler = (e: WheelEvent) => {
      if (busyRef.current) return;
      const portfolio = document.getElementById("project-two");
      const footer = document.querySelector("footer") as HTMLElement | null;
      if (!portfolio || !footer) return;

      const scrollY = window.scrollY;
      const vpH = window.innerHeight;
      const portfolioEndY = portfolio.offsetTop + portfolio.offsetHeight - vpH;

      /* last card দেখা যাচ্ছে, scroll down → footer curtain reveal */
      if (e.deltaY > 0 && Math.abs(scrollY - portfolioEndY) < 40) {
        e.preventDefault();
        e.stopImmediatePropagation();
        busyRef.current = true;

        const offset = portfolio.offsetHeight - vpH;
        portfolio.style.cssText = `
          position:fixed;top:0;left:0;width:100%;
          height:${portfolio.offsetHeight}px;
          z-index:50;overflow-y:hidden;
          transform:translateY(-${offset}px);
        `;

        requestAnimationFrame(() => {
          portfolio.style.transition = `transform ${DUR_S}s ${EASE}`;
          portfolio.style.transform = `translateY(-${offset + vpH}px)`;
        });

        animateScrollTo(clampScrollY(footer.offsetTop), scrollDurationMs, {
          onStart: lockPageScroll,
          onComplete: () => {
            unlockPageScroll();
            portfolio.style.cssText = "";
            busyRef.current = false;
          },
        });
      }
    };

    window.addEventListener("wheel", handler, { passive: false, capture: true });
    return () =>
      window.removeEventListener("wheel", handler, { capture: true });
  }, []);

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
