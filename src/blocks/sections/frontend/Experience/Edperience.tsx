"use client";

import { useCallback, useRef, useState } from "react";
import Container from "@/blocks/elements/container/Container";
import Timeline from "@/blocks/elements/3d/Timeline/Timeline";
import LeftContent from "@/blocks/sections/frontend/Experience/component/leftContent/LeftContent";
import { defaultTimeLineData } from "@/blocks/sections/frontend/Experience/timelineData";
import { cn } from "@/utilities/helpers/classMerge";

const fallbackHeading = "Experience";
const fallbackParagraph = "Roles and milestones — scroll the timeline; this panel follows the active step.";
const fallbackImage = "/images/demo.jpg";

const Experience = () => {
  const experienceSectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onActiveIndexChange = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? prev : index));
  }, []);

  const active = defaultTimeLineData[activeIndex] ?? defaultTimeLineData[0];
  const heading = active.panelHeading ?? fallbackHeading;
  const paragraph = active.panelParagraph ?? fallbackParagraph;
  const imageSrc = active.panelImageSrc ?? fallbackImage;
  const imageAlt = active.panelImageAlt ?? active.title;

  const scrollTrackVh = 100 * defaultTimeLineData.length;
  const scrollTrackStyle = { minHeight: `${scrollTrackVh}vh` } as const;

  return (
    <section id="experience" className="w-full">
      <div ref={experienceSectionRef} className="relative w-full" style={scrollTrackStyle}>
        <div className="relative w-full" style={scrollTrackStyle}>
          <div className="rounded-t-xl bg-primary pt-5">
            <Container
              as="div"
              className="relative w-full rounded-t-xl quaternaryBacgroundColor pt-5"
            >
              <div
                className={cn(
                  "rounded-t-xl ternaryBacgroundColor",
                  "min-h-[120px] w-full",
                )}
                aria-hidden
              />
            </Container>
          </div>

          <div
            className={cn(
              "sticky top-0 z-10 flex min-h-screen w-full flex-col",
              "bg-primary pt-0",
            )}
          >
            <Container
              as="div"
              className="relative w-full rounded-t-xl quaternaryBacgroundColor pt-0"
            >
              <Container
                as="div"
                className={cn(
                  "relative w-full  ternaryBacgroundColor",
                  "px-5 pb-[120px] pt-0",
                )}
              >
                <Container
                  className={cn(
                    "maxContainer flex flex-col gap-12 px-4 md:px-6",
                    "lg:flex-row lg:items-stretch lg:gap-16",
                  )}
                >
                  <LeftContent
                    heading={heading}
                    paragraph={paragraph}
                    imageSrc={imageSrc}
                    imageAlt={imageAlt}
                    activeIndex={activeIndex}
                  />

                  <Container as="div" className="min-w-0 lg:flex-[0_1_55%] pt-15">
                    <Timeline
                      items={defaultTimeLineData}
                      showSpine
                      scrollTargetRef={experienceSectionRef}
                      onActiveIndexChange={onActiveIndexChange}
                    />
                  </Container>
                </Container>
              </Container>
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
