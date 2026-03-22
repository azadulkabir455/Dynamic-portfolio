"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/blocks/elements/container/Container";
import Image from "@/blocks/elements/image/Image";
import Text from "@/blocks/elements/text/Text";
import Timeline from "@/blocks/elements/3d/Timeline/Timeline";
import { DEFAULT_TIMELINE_ITEMS } from "@/blocks/sections/frontend/Experience/timelineData";
import { cn } from "@/utilities/helpers/classMerge";

const FALLBACK_HEADING = "Experience";
const FALLBACK_PARAGRAPH =
  "Roles and milestones — scroll the timeline; this panel follows the active step.";
const FALLBACK_IMAGE = "/images/demo.jpg";

type PinState = {
  visible: boolean;
  top: number;
  left: number;
  width: number;
};

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const [pin, setPin] = useState<PinState>({
    visible: true,
    top: 32,
    left: 0,
    width: 0,
  });
  const [isLg, setIsLg] = useState(false);

  const onActiveIndexChange = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? prev : index));
  }, []);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const syncMq = () => setIsLg(mq.matches);
    syncMq();
    mq.addEventListener("change", syncMq);
    return () => mq.removeEventListener("change", syncMq);
  }, []);

  useLayoutEffect(() => {
    if (!isLg) {
      setPin((p) => ({ ...p, visible: true }));
      return;
    }

    const update = () => {
      const section = sectionRef.current;
      const slot = slotRef.current;
      if (!section || !slot) return;

      const sr = section.getBoundingClientRect();
      const vh = window.innerHeight;

      const inView = sr.bottom > 0 && sr.top < vh;
      if (!inView) {
        setPin((p) => ({ ...p, visible: false }));
        return;
      }

      const sl = slot.getBoundingClientRect();
      const top = sr.top < 0 ? 32 : Math.max(sr.top, 32);

      setPin({
        visible: true,
        top,
        left: sl.left,
        width: sl.width,
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isLg]);

  const active =
    DEFAULT_TIMELINE_ITEMS[activeIndex] ?? DEFAULT_TIMELINE_ITEMS[0];
  const heading = active.panelHeading ?? FALLBACK_HEADING;
  const paragraph = active.panelParagraph ?? FALLBACK_PARAGRAPH;
  const imageSrc = active.panelImageSrc ?? FALLBACK_IMAGE;
  const imageAlt = active.panelImageAlt ?? active.title;

  const panelInner = (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Text
          variant="h2"
          className="font-antonio mb-4 text-4xl text-secondary md:text-5xl"
        >
          {heading}
        </Text>
        <Text
          variant="p"
          className="font-open-sans text-base leading-relaxed text-secondary/90 md:text-lg"
        >
          {paragraph}
        </Text>

        <div className="relative mt-6 w-full max-w-md overflow-hidden rounded-xl border border-secondary/25">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={480}
            height={320}
            className="h-auto w-full object-cover"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );

  const desktopFixedStyle: React.CSSProperties | undefined = (() => {
    if (!isLg) return undefined;
    if (!pin.visible) return { display: "none" };
    if (pin.width > 0) {
      return {
        position: "fixed",
        top: pin.top,
        left: pin.left,
        width: pin.width,
        zIndex: 30,
      };
    }
    return undefined;
  })();

  return (
    <Container
      as="section"
      className="w-full rounded-t-xl bg-primary pt-5"
      id="experience"
    >

        <div
          ref={sectionRef}
          className={cn(
            "relative w-full overflow-visible rounded-t-xl",
            "pt-8 pb-16 md:pb-24",
          )}
        >
          <div
            className={cn(
              "maxContainer flex flex-col gap-12 px-4 md:px-6",
              "lg:flex-row lg:items-stretch lg:gap-16",
            )}
          >
            <div
              ref={slotRef}
              className={cn(
                "flex w-full flex-col lg:self-stretch",
                "lg:min-w-0 lg:max-w-[45%] lg:shrink-0 lg:basis-[45%] lg:flex-[0_0_45%]",
              )}
            >
              <div
                className={cn("w-full", !isLg && "relative z-10")}
                style={desktopFixedStyle}
              >
                {panelInner}
              </div>
            </div>

            <Container
              as="div"
              className="min-w-0 lg:flex-[0_1_55%]"
            >
              <Timeline
                items={DEFAULT_TIMELINE_ITEMS}
                showSpine
                onActiveIndexChange={onActiveIndexChange}
              />
            </Container>
          </div>
        </div>
    </Container>
  );
};

export default Experience;
