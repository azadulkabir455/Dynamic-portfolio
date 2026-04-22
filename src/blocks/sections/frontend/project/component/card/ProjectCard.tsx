"use client";

import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import AnimatedButton from "@/blocks/elements/3d/AnimatedButton/AnimatedButton";
import { cn } from "@/utilities/helpers/classMerge";
import type { ProjectCardProps } from "./type";
import Image from "@/blocks/elements/image/Image";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";

const flipInner = cn(
  "relative w-full min-h-[min(100vw*1.15,520px)] [aspect-ratio:3/4]",
  "[transform-style:preserve-3d]",
  "transition-[transform] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
  "motion-reduce:aspect-auto motion-reduce:min-h-0",
  "motion-reduce:flex motion-reduce:flex-col motion-reduce:gap-6",
  "group-hover/card:[transform:rotateY(-180deg)]",
  "motion-reduce:group-hover/card:[transform:none]",
);

const faceBase = cn(
  "overflow-hidden rounded-[24px]",
  "absolute inset-0",
  "[backface-visibility:hidden]",
  "motion-reduce:static motion-reduce:inset-auto motion-reduce:min-h-[280px] motion-reduce:shadow-md",
);

const ghostAnchorOverrides = cn(
  "!h-auto !min-h-0 !max-h-none",
  "!rounded-none !border-0 !shadow-none",
  "!bg-transparent hover:!bg-transparent",
  "!p-2 !px-2 !py-2 !pl-2 !pr-2 !pt-2 !pb-2",
  "!gap-2 overflow-visible",
);

const iconOverrides = cn(
  "!h-7 !w-7 !bg-transparent !p-0 !shadow-none",
  "group-hover:!bg-quaternary",
);

const iconGlyphClass = "text-secondary group-hover:text-primary";

export const ProjectCard = ({
  image,
  imageAlt,
  tag,
  title,
  description,
  detailsText,
  detailsUrl,
  liveText,
  liveLink,
  className,
}: ProjectCardProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardId = useId();
  const alt = imageAlt ?? title;

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 1023px)").matches);
    };
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsFlipped(false);
      return;
    }

    const handleOutsidePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && cardRef.current && !cardRef.current.contains(target)) {
        setIsFlipped(false);
      }
    };

    const handleOtherCardOpen = (event: Event) => {
      const openedCardId = (event as CustomEvent<string>).detail;
      if (openedCardId !== cardId) {
        setIsFlipped(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    window.addEventListener("project-card-open", handleOtherCardOpen as EventListener);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
      window.removeEventListener("project-card-open", handleOtherCardOpen as EventListener);
    };
  }, [cardId, isMobile]);

  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    if (!isMobile) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest("a,button")) return;

    setIsFlipped((prev) => {
      const next = !prev;
      if (next) {
        window.dispatchEvent(new CustomEvent("project-card-open", { detail: cardId }));
      }
      return next;
    });
  };

  return (
    <Container
      as="article"
      ref={cardRef}
      className={cn(
        "w-full max-w-[420px] max-h-none lg:max-h-[420px]",
        "group/card perspective-[1400px]",
        isMobile && "cursor-pointer",
        className,
      )}
      aria-label={title}
      onClick={handleCardClick}
    >
      <Container 
        as="div" 
        className={cn(
          flipInner,
          isMobile && isFlipped && "[transform:rotateY(-180deg)]",
        )}
      >
        {/* Front */}
        <Container
          as="div"
          className={cn(
            faceBase,
            "z-[2] flex max-h-none lg:max-h-[480px] min-h-0 flex-col bg-primary",
            "px-[20px] pt-[20px] pb-0",
            "[transform:rotateY(0deg)]",
            !isMobile && "group-hover/card:z-[1]",
            isMobile && (isFlipped ? "z-[1]" : "z-[2]"),
            "motion-reduce:rounded-[24px]",
          )}
        >
          <Container 
          as="div" 
          className={cn("relative min-h-0 flex-1")}>
            <Image
              src={image}
              alt={alt}
              width={480}
              height={320}
              className={cn(
                "h-full w-full",
                "absolute inset-x-0 bottom-0 top-0",
                "object-cover object-bottom",
                "rounded-t-[24px] rounded-b-none",
                "shadow-lg",
              )}
              loading="lazy"
            />
          </Container>
        </Container>

        {/* Back */}
        <Container
          as="div"
          className={cn(
            faceBase,
            "p-7 max-h-none lg:max-h-[480px]",
            "bg-primary text-white",
            "flex flex-col",
            !isMobile && "z-[1] group-hover/card:z-[2]",
            isMobile && (isFlipped ? "z-[2]" : "z-[1]"),
            "[transform:rotateY(180deg)]",
            !isMobile && "pointer-events-none group-hover/card:pointer-events-auto",
            isMobile && (isFlipped ? "pointer-events-auto" : "pointer-events-none"),
            "motion-reduce:[transform:none] motion-reduce:pointer-events-auto",
          )}
        >
          <Text
            variant="span"
            className={cn(
              "text-xs text-secondary leading-[18px] tracking-[3px]",
              "font-open-sans align-middle  font-bold uppercase",
            )}
          >
            {tag}
          </Text>
          <Text
            variant="h3"
            className={cn(
              "mt-2",
              "text-[24px] text-secondary leading-[32px] tracking-normal",
              "font-open-sans align-middle font-bold",
            )}
          >
            {title}
          </Text>
          <Text
            variant="p"
            className={cn(
              "mt-3", 
              "text-[18px] leading-[32px] text-secondary",
              "font-open-sans align-middle  font-semibold  tracking-normal",
            )}
          >
            {description}
          </Text>

          <Container
            as="div"
            className={cn("mt-auto flex flex-col gap-0 pt-4")}
          >
            <AnimatedButton
              text={detailsText}
              link={detailsUrl}
              iconName="ArrowUpRight"
              iconSize={18}
              buttonClassName={ghostAnchorOverrides}
              className="!rounded-none"
              iconClassName={iconGlyphClass}
              iconContainerClassName={iconOverrides}
            />
            <AnimatedButton
              text={liveText}
              link={liveLink}
              iconName="ArrowUpRight"
              iconSize={18}
              buttonClassName={ghostAnchorOverrides}
              className="!rounded-none"
              iconClassName={iconGlyphClass}
              iconContainerClassName={iconOverrides}
            />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default ProjectCard;
