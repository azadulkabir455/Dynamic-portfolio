"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Container from "@/blocks/elements/container/Container";
import Image from "@/blocks/elements/image/Image";
import Text from "@/blocks/elements/text/Text";
import AnimatedButton from "@/blocks/elements/3d/AnimatedButton/AnimatedButton";
import { cn } from "@/utilities/helpers/classMerge";
import type { ProjectTwoCardProps } from "./type";

const ProjectTwoCard = ({
  imageSrc,
  imageAlt,
  tag,
  title,
  description,
  liveLink,
  viewLink,
  liveLabel = "Live",
  viewLabel = "View",
  className,
}: ProjectTwoCardProps) => {
  const cardRootRef = useRef<HTMLDivElement>(null);
  const lastPointerRef = useRef({ x: -1, y: -1 });
  const [cardHover, setCardHover] = useState(false);

  const syncHoverFromPointer = useCallback(() => {
    const root = cardRootRef.current;
    const { x, y } = lastPointerRef.current;
    if (!root || x < 0 || y < 0) return;
    const top = document.elementFromPoint(x, y);
    if (!top) {
      setCardHover(false);
      return;
    }
    setCardHover(root.contains(top));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
      syncHoverFromPointer();
    };
    const onScrollOrResize = () => {
      syncHoverFromPointer();
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [syncHoverFromPointer]);

  return (
    <Container
      as="article"
      className={cn("relative w-full", className)}
      aria-label={title}
    >
      <Container
        ref={cardRootRef}
        as="div"
        className={cn("relative z-10 w-full overflow-hidden rounded-2xl")}
      >
        <Container
          as="div"
          className="relative h-[85vh] w-full overflow-hidden"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-full w-full object-cover object-top"
          />

          <Container
            as="div"
            className={cn(
              "pointer-events-none absolute inset-0 z-[1]",
              "bg-gradient-to-t from-[var(--ternary)] via-[var(--ternary)]/50 to-transparent",
            )}
            aria-hidden
          />

          <Container
            as="div"
            className={cn(
              "absolute bottom-0 left-0 right-0 z-[5] flex flex-col justify-end gap-0 p-6 md:p-8",
            )}
          >
            <Container
              as="div"
              className={cn(
                "shrink-0 transition-transform duration-300 ease-out",
                "motion-reduce:transition-none",
                cardHover && "-translate-y-1",
              )}
            >
              <span
                className={cn(
                  "inline-flex rounded-full bg-secondary/15 px-3 py-1",
                  "font-open-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary",
                )}
              >
                {tag}
              </span>
              <Text
                variant="h3"
                className={cn(
                  "font-antonio mt-3 text-2xl font-bold capitalize leading-tight text-secondary",
                  "md:text-3xl md:leading-tight",
                )}
              >
                {title}
              </Text>
            </Container>

            <Container
              as="div"
              className={cn(
                "overflow-hidden",
                "transition-[max-height] duration-300 ease-out",
                "motion-reduce:transition-none",
                cardHover
                  ? "max-h-[min(420px,55vh)]"
                  : "max-h-0",
              )}
            >
              <Container
                as="div"
                className={cn(
                  "pt-3 transition-[transform,opacity] duration-300 ease-out",
                  "motion-reduce:transition-none",
                  cardHover
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0",
                )}
              >
                <Text
                  variant="p"
                  className={cn(
                    "font-open-sans text-sm leading-relaxed text-secondary/95 md:text-base",
                    "line-clamp-4",
                  )}
                >
                  {description}
                </Text>
                <Container
                  as="div"
                  className={cn(
                    "mt-3 grid w-full grid-cols-2 gap-3",
                    "border-t border-secondary/25 pt-3",
                  )}
                >
                  <AnimatedButton
                    text={liveLabel}
                    link={liveLink}
                    icon="ExternalLink"
                    iconSize={18}
                    iconClassName="text-white"
                    textClassName="text-white"
                    dark={false}
                    className={cn(
                      "min-w-0 w-full border-white/25",
                      "hover:bg-white/20",
                      "px-3",
                    )}
                  />
                  <AnimatedButton
                    text={viewLabel}
                    link={viewLink}
                    icon="Eye"
                    iconSize={18}
                    iconClassName="text-white"
                    textClassName="text-white"
                    dark={false}
                    className={cn(
                      "min-w-0 w-full border-white/25",
                      "hover:bg-white/20",
                      "px-3",
                    )}
                  />
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default ProjectTwoCard;
