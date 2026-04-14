"use client";

import { useState, useRef } from "react";
import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import AnimatedButton from "@/blocks/elements/3d/AnimatedButton/AnimatedButton";
import PulseVideoButton from "@/blocks/elements/3d/PulseVideoButton/PulseVideoButton";
import { cn } from "@/utilities/helpers/classMerge";
import IntroVideoModal from "./component/modal/IntroVideoModal";
import type { IntroProps } from "./type";
import LogoLoop from "@/blocks/elements/3d/LogoLoop/LogoLoop";
import type { LogoLoopItem } from "@/blocks/elements/3d/LogoLoop/type";

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
              iconName="Mail"
              iconSize={18}
              className="mt-8 min-w-[320px]"
              buttonClassName={cn(
                "border-2 border-primary bg-primary backdrop-blur-md hover:bg-primary/90",
                "[&>span:first-child]:font-open-sans [&>span:first-child]:text-sm [&>span:first-child]:font-semibold [&>span:first-child]:tracking-widest [&>span:first-child]:text-secondary",
                "[&>span:last-child]:border-2 [&>span:last-child]:border-secondary [&>span:last-child]:bg-primary",
              )}
              iconClassName="text-secondary"
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
