"use client";

import { useState, useRef, useEffect } from "react";
import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import AnimatedButton from "@/blocks/elements/3d/AnimatedButton/AnimatedButton";
import PulseVideoButton from "@/blocks/elements/3d/PulseVideoButton/PulseVideoButton";
import { cn } from "@/utilities/helpers/classMerge";
import IntroVideoModal from "./component/modal/IntroVideoModal";
import type { IntroProps } from "./type";
import LogoLoop from "@/blocks/elements/3d/LogoLoop/LogoLoop";
import type { LogoLoopItem } from "@/blocks/elements/3d/LogoLoop/type";
import {
  animateScrollTo,
  clampScrollY,
  lockPageScroll,
  unlockPageScroll,
  scrollDurationMs,
  scrollToSectionById,
} from "@/blocks/elements/3d/SectionScrollSnap/functions";

const EASE = "cubic-bezier(0.72,0,0.28,1)";
const DUR_S = scrollDurationMs / 1000;

const introStatic = {
  title: "Who’s Behind the Screen",
  description: "With around seven years of professional experience as a front-end developer, I specialize in creating visually striking, highly responsive, and performance-optimized web applications. I’m driven by a passion for user-centric design and modern technologies, consistently delivering pixel-perfect interfaces that enhance user experiences and achieve business goals.",
  buttonLabel: "Contact us",
  contactLink: "#contact",
  videoSrc: "/images/intro.mp4",
} as const;

const imageLogos: LogoLoopItem[] = [
  {
    src: "/images/logo/americanbestit.png",
    alt: "American Best IT",
    title: "American Best IT",
  },
  {
    src: "/images/logo/arla.png",
    alt: "Arla",
    title: "Arla",
  },
  {
    src: "/images/logo/beatnik.png",
    alt: "Beatnik",
    title: "Beatnik",
  },
];

const Intro = ({
  title = introStatic.title,
  description = introStatic.description,
  buttonLabel = introStatic.buttonLabel,
  contactLink = introStatic.contactLink,
  videoSrc = introStatic.videoSrc,
  posterSrc,
}: IntroProps = {}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const busyRef = useRef(false);

  useEffect(() => {
    const handler = (e: WheelEvent) => {
      if (busyRef.current) return;
      const section = sectionRef.current;
      if (!section) return;
      const scrollY = window.scrollY;

      /* ── DOWN: Intro → Portfolio (curtain reveal) ── */
      if (e.deltaY > 0 && Math.abs(scrollY - section.offsetTop) < 10) {
        const portfolio = document.getElementById("project-two");
        if (!portfolio) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        busyRef.current = true;

        /* fix Intro on top, slide it away */
        section.style.position = "fixed";
        section.style.inset = "0";
        section.style.height = "100vh";
        section.style.zIndex = "50";
        section.style.borderRadius = "0";

        requestAnimationFrame(() => {
          section.style.transition = `transform ${DUR_S}s ${EASE}`;
          section.style.transform = "translateY(-100vh)";
        });

        animateScrollTo(clampScrollY(portfolio.offsetTop), scrollDurationMs, {
          onStart: lockPageScroll,
          onComplete: () => {
            unlockPageScroll();
            section.style.cssText = "";
            busyRef.current = false;
          },
        });
        return;
      }

      /* ── UP: Portfolio top → Intro (curtain close) ── */
      const portfolio = document.getElementById("project-two");
      if (e.deltaY < 0 && portfolio && Math.abs(scrollY - portfolio.offsetTop) < 10) {
        e.preventDefault();
        e.stopImmediatePropagation();
        busyRef.current = true;

        /* start Intro above viewport, slide it down into view */
        section.style.position = "fixed";
        section.style.inset = "0";
        section.style.height = "100vh";
        section.style.zIndex = "50";
        section.style.borderRadius = "0";
        section.style.transform = "translateY(-100vh)";

        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            section.style.transition = `transform ${DUR_S}s ${EASE}`;
            section.style.transform = "translateY(0)";
          }),
        );

        animateScrollTo(clampScrollY(section.offsetTop), scrollDurationMs, {
          onStart: lockPageScroll,
          onComplete: () => {
            unlockPageScroll();
            section.style.cssText = "";
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
    <>
      <section
        ref={sectionRef}
        className={cn(
          "relative isolate z-10",
          "h-screen w-full",
          "overflow-hidden",
        )}
        id="intro"
      >
        <video
          className={cn(
            "absolute inset-0",
            "h-full w-full",
            "object-cover",
          )}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
        />
        <Container
          className={cn(
            "pointer-events-none absolute inset-0",
            "bg-gradient-to-b from-[var(--ternary)] to-[var(--ternary)]/75",
          )}
          aria-hidden
        />

        <Container
          as="div"
          className={cn(
            "relative z-10 flex flex-col gap-10",
            "min-h-[min(100vh,920px)] max-w-[1540px]",
            "px-4 py-16 md:px-8 md:py-24",
            "lg:flex-row lg:items-center lg:justify-between lg:gap-16",
          )}
        >
          <Container
            as="div"
            className={cn(
              "flex flex-1",
              "justify-center",
            )}
          >
            <PulseVideoButton
              onClick={() => setModalOpen(true)}
              ariaLabel="Play intro video"
            />
          </Container>
          <Container as="div" className="maxContainer flex-1">
            <Text
              variant="h1"
              className={cn(
                "font-antonio text-[100px] leading-tight text-secondary font-bold",
              )}
            >
              {title}
            </Text>
            <Text
              variant="p"
              className={cn(
                "font-open-sans mt-5 text-xl leading-relaxed text-secondary md:text-xl",
              )}
            >
              {description}
            </Text>
            <AnimatedButton
              text={buttonLabel}
              link={contactLink}
              icon="Mail"
              iconSize={18}
              dark={true}
              bordered={false}
              className="mt-8 min-w-[320px]"
              textClassName={cn(
                "font-open-sans text-sm font-semibold tracking-widest",
              )}
            />
          </Container>


        </Container>
      </section>

      <IntroVideoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        videoSrc={videoSrc}
        posterSrc={posterSrc}
      />
    </>
  );
};

export default Intro;
