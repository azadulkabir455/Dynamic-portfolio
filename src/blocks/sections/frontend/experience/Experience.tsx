"use client";

import Image from "next/image";
import { useState, useRef, useLayoutEffect } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import BounceCards from "@/blocks/elements/3d/BounceCards/BounceCards";
import ExperienceCard from "./component/card/ExperienceCard";
import ExperienceHeader from "./component/header/ExperienceHeader";
import { defaultExperienceData } from "./component/data/Data";
import type { ExperienceSectionData } from "./type";
import { cn } from "@/utilities/helpers/classMerge";
import { calculateSpineLine, type SpineLine } from "./function";

const BOUNCE_TRANSFORMS = [
  "rotate(12deg) translate(-145px)",
  "rotate(0deg)",
  "rotate(-12deg) translate(145px)",
];

const Experience = ({
  title,
  paragraph,
  timeline,
}: ExperienceSectionData = defaultExperienceData) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstNodeRef = useRef<HTMLDivElement | null>(null);
  const lastNodeRef = useRef<HTMLDivElement | null>(null);

  const [spineLine, setSpineLine] = useState<SpineLine | null>(null);

  const sectionTitle = title ?? defaultExperienceData.title ?? "";
  const sectionParagraph = paragraph ?? defaultExperienceData.paragraph ?? "";
  const timelineItems = timeline ?? defaultExperienceData.timeline ?? [];

  useLayoutEffect(() => {
    const update = () => {
      const track = trackRef.current;
      const first = firstNodeRef.current;
      const last = lastNodeRef.current;
      if (!track || !first || !last) { setSpineLine(null); return; }
      setSpineLine(calculateSpineLine(track, first, last));
    };
    update();
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => { window.removeEventListener("resize", update); ro.disconnect(); };
  }, [timelineItems.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start -170%", "end 70%"],
  });

  const fillHeightPx = useTransform(
    scrollYProgress,
    [0, 1],
    [0, spineLine?.height ?? 0],
  );

  const [markerProgress, setMarkerProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setMarkerProgress(latest);
  });

  return (
    <Container
      as="section"
      ref={sectionRef}
      id="experience"
      className={cn("py-[80px] lg:py-[120px] secondaryBacgroundColor")}
    >
      <Container as="div" className="maxContainer">
        <ExperienceHeader title={sectionTitle} paragraph={sectionParagraph} />

        <Container as="div" ref={trackRef} className="relative mt-20">
          {/* Vertical spine — fixed at node col center: year(200px) + half node col(40px) = 240px */}
          {spineLine && (
            <>
              <Container
                as="div"
                aria-hidden
                className="absolute hidden w-[20px] -translate-x-1/2 rounded-full bg-primary/20 lg:block"
                style={{ left: 240, top: spineLine.top, height: spineLine.height }}
              />
              <motion.div
                aria-hidden
                className="absolute hidden w-[20px] -translate-x-1/2 rounded-t-full lg:block"
                style={{
                  left: 240,
                  top: spineLine.top,
                  height: fillHeightPx,
                  background:
                    "linear-gradient(to bottom, #C33F40 0%, #C33F40 calc(100% - 80px), rgba(195,63,64,0.4) calc(100% - 40px), rgba(195,63,64,0) 100%)",
                }}
              />
            </>
          )}

          <Container as="div" className="flex flex-col gap-10 lg:gap-32">
            {timelineItems.map((item, index) => {
              const isFirst = index === 0;
              const isLast = index === timelineItems.length - 1;
              const threshold =
                timelineItems.length === 1
                  ? 0
                  : index / (timelineItems.length - 1);
              const markerReached = markerProgress >= threshold;

              return (
                <Container
                  as="div"
                  key={item.id}
                  className="relative grid grid-cols-1 lg:grid-cols-[200px_80px_1fr] lg:items-center"
                >
                  {/* Year label — left col, 200px wide, left-aligned, 15px gap to node via padding */}
                  <Container
                    as="div"
                    className="hidden lg:flex lg:items-center lg:justify-start lg:pl-0 lg:pr-[15px]"
                  >
                    <Text
                      variant="p"
                      className={cn(
                        "font-libre-franklin font-semibold leading-[100%] tracking-[0%]",
                        "text-[32px] text-ternary",
                      )}
                    >
                      {item.year ?? ""}
                    </Text>
                  </Container>

                  {/* Center col — node circle + horizontal connector to right */}
                  <Container
                    as="div"
                    className="hidden lg:col-start-2 lg:row-start-1 lg:flex lg:justify-center lg:relative"
                  >
                    {/* Horizontal connector: node right edge → card, 80px wide */}
                    <Container
                      as="div"
                      className="absolute top-1/2 left-full h-[20px] w-[80px] -translate-y-1/2 z-0 transition-colors duration-500"
                      style={
                        markerReached
                          ? {
                              background:
                                "linear-gradient(to right, rgba(195,63,64,0.3) 0%, #C33F40 100%)",
                            }
                          : { background: "rgba(195,63,64,0.3)" }
                      }
                    />

                    {/* Node circle */}
                    <Container
                      as="div"
                      ref={(el) => {
                        const divEl = el as HTMLDivElement | null;
                        if (isFirst) firstNodeRef.current = divEl;
                        if (isLast) lastNodeRef.current = divEl;
                      }}
                      className={cn(
                        "relative z-10 flex h-[80px] w-[80px] items-center justify-center rounded-full border-[3px] transition-all duration-500",
                        markerReached
                          ? "border-transparent text-white shadow-[0_0_0_6px_rgba(195,63,64,0.12)]"
                          : "border-primary/30 bg-secondary text-primary",
                      )}
                      style={markerReached ? { background: "#c96363" } : undefined}
                    >
                      <svg width="31.5" height="35" viewBox="0 0 32 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M31.2107 4.36975L18.3272 33.2623C17.2947 35.5793 14.206 35.5793 13.1717 33.2623L0.288224 4.36975C-0.879027 1.7535 1.71272 -0.962499 4.14172 0.33425L14.4737 5.85025C15.277 6.279 16.2237 6.279 17.0252 5.85025L27.3572 0.334248C29.7862 -0.960754 32.3797 1.75175 31.2107 4.36975Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Container>
                  </Container>

                  {/* Right col — card + arrow between + bounce cards */}
                  <Container
                    as="div"
                    className="lg:col-start-3 lg:row-start-1 relative flex items-center pl-[80px]"
                  >
                    {/* Experience card */}
                    <div className="flex-shrink-0">
                      <ExperienceCard item={item} />
                    </div>

                    {/* Arrow SVG — above the card by 15px, between card and BounceCards horizontally */}
                    <div
                      className="absolute z-10 pointer-events-none transition-opacity duration-500"
                      style={{
                        left: 350,
                        top: -95,
                        width: 140,
                        height: 127,
                        opacity: markerReached ? 1 : 0,
                      }}
                    >
                        <Image
                          src="/images/Icons/ExperienceCardArrow.svg"
                          width={140}
                          height={127}
                          alt=""
                          aria-hidden
                        />
                    </div>

                    {/* BounceCards — company photos, offset to overlap arrow */}
                    {item.images && item.images.length > 0 && (
                      <div className="ml-40 mt-15 flex-shrink-0">
                        <BounceCards
                          images={item.images}
                          containerWidth={280}
                          containerHeight={200}
                          animationDelay={0.3}
                          animationStagger={0.08}
                          easeType="elastic.out(1, 0.5)"
                          transformStyles={BOUNCE_TRANSFORMS}
                          enableHover
                          cardWidth={180}
                          cardHeight={160}
                          cardBorderWidth={5}
                          cardBorderColor="white"
                          cardBorderRadius={20}
                        />
                      </div>
                    )}
                  </Container>
                </Container>
              );
            })}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Experience;
