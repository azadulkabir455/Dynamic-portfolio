"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Container from "@/blocks/elements/container/Container";
import Image from "@/blocks/elements/image/Image";
import Text from "@/blocks/elements/text/Text";
import Timeline from "@/blocks/elements/3d/Timeline/Timeline";
import { experienceData } from "@/blocks/sections/frontend/experience/component/data/Data";
import { cn } from "@/utilities/helpers/classMerge";
import type { TimelineItem } from "@/blocks/elements/3d/Timeline/type";
import {
  animateScrollTo,
  clampScrollY,
  lockPageScroll,
  unlockPageScroll,
  scrollDurationMs,
  scrollToSectionById,
} from "@/blocks/elements/3d/SectionScrollSnap/functions";

/** ExperienceItem → TimelineItem */
const timelineItems: TimelineItem[] = experienceData.items.map((item) => ({
  id: item.id,
  period: item.date,
  title: item.designation,
  description: item.jobInfo,
  tag: item.officeName,
  logoSrc: item.logoSrc,
  logoAlt: item.logoAlt,
  imageSrc: item.imageSrc,
  imageAlt: item.imageAlt,
  location: item.location,
  officeName: item.officeName,
  officeInfo: item.officeInfo,
  achievements: item.achievements,
}));

const { left } = experienceData;

const EASE = "cubic-bezier(0.16,1,0.3,1)";
const DUR_S = scrollDurationMs / 1000;

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const busyRef = useRef(false);

  useEffect(() => {
    const measure = () => {
      if (!rightPanelRef.current) return;
      const panelH = rightPanelRef.current.scrollHeight;
      const viewH = window.innerHeight;
      setScrollDistance(Math.max(0, panelH - viewH + 120));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* Transition animations for experience ↔ clients */
  useEffect(() => {
    if (scrollDistance === 0) return;

    const fixedStyle = (div: HTMLDivElement) => {
      div.style.position = "fixed";
      div.style.inset = "0";
      div.style.height = "100vh";
      div.style.zIndex = "60";
    };

    const resetStyle = (div: HTMLDivElement) => {
      div.style.cssText = "";
      busyRef.current = false;
    };

    const handler = (e: WheelEvent) => {
      if (busyRef.current || !sectionRef.current || !stickyRef.current) return;
      const scrollY = window.scrollY;
      const sTop = sectionRef.current.offsetTop;
      const lastItemY = sTop + scrollDistance;
      const clients = document.getElementById("clients");

      /* ── DOWN: last experience item → clients ── */
      if (e.deltaY > 0 && Math.abs(scrollY - lastItemY) < 20) {
        e.preventDefault();
        e.stopImmediatePropagation();
        busyRef.current = true;
        const div = stickyRef.current;
        fixedStyle(div);
        requestAnimationFrame(() => {
          div.style.transition = `transform ${DUR_S}s ${EASE}`;
          div.style.transform = "translateY(-100vh)";
        });
        scrollToSectionById("clients");
        setTimeout(() => resetStyle(div), scrollDurationMs + 150);
        return;
      }

      /* ── UP: clients top → last experience item ── */
      if (e.deltaY < 0 && clients && Math.abs(scrollY - clients.offsetTop) < 20) {
        e.preventDefault();
        e.stopImmediatePropagation();
        busyRef.current = true;
        const div = stickyRef.current;
        fixedStyle(div);
        div.style.transform = "translateY(-100vh)";
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            div.style.transition = `transform ${DUR_S}s ${EASE}`;
            div.style.transform = "translateY(0)";
          }),
        );
        animateScrollTo(clampScrollY(lastItemY), scrollDurationMs, {
          onStart: lockPageScroll,
          onComplete: () => {
            unlockPageScroll();
            resetStyle(div);
          },
        });
      }
    };

    window.addEventListener("wheel", handler, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", handler, { capture: true });
  }, [scrollDistance]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rightY = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="w-full ternaryBacgroundColor"
      style={{ height: `calc(100vh + ${scrollDistance}px)` }}
    >
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden ternaryBacgroundColor">
        <div className="relative w-full h-full">

          <div
            className={cn(
              "relative z-10 flex w-full flex-col h-full",
              "ternaryBacgroundColor",
            )}
          >
            <Container
              as="div"
              className="relative w-full h-full ternaryBacgroundColor pt-0"
            >
              <Container
                as="div"
                className={cn(
                  "relative w-full h-full ternaryBacgroundColor",
                  "px-5 pb-[120px] pt-[120px]",
                )}
              >
                <Container
                  className={cn(
                    "maxContainer flex flex-col gap-12 px-4 md:px-6",
                    "lg:flex-row lg:items-start lg:gap-16",
                    "h-full",
                  )}
                >
                  {/* Left — static panel */}
                  <div
                    className={cn(
                      "flex w-full flex-col",
                      "lg:max-w-[45%] lg:shrink-0 lg:basis-[45%]",
                    )}
                  >
                    <Text
                      variant="h2"
                      className={cn(
                        "font-antonio capitalize leading-tight text-secondary",
                        "text-[clamp(3rem,8vw,72px)]",
                      )}
                    >
                      {left.title}
                    </Text>

                    <Text
                      variant="p"
                      className={cn(
                        "mt-4 font-open-sans text-base leading-relaxed text-secondary/80",
                        "sm:text-lg",
                      )}
                    >
                      {left.paragraph}
                    </Text>

                    <div className="relative mt-8 w-full overflow-hidden rounded-xl">
                      <Image
                        src={left.imageSrc}
                        alt={left.imageAlt}
                        width={480}
                        height={560}
                        className="h-auto w-full rounded-xl object-cover"
                      />
                    </div>
                  </div>

                  {/* Right — scrollable timeline via transform */}
                  <motion.div
                    ref={rightPanelRef}
                    style={{ y: rightY }}
                    className="min-w-0 pt-15 pb-[60px] lg:flex-[0_1_55%]"
                  >
                    <Timeline
                      items={timelineItems}
                      showSpine
                      scrollTargetRef={sectionRef}
                      onActiveIndexChange={() => {}}
                    />
                  </motion.div>
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
