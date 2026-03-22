"use client";

import clsx from "clsx";
import Button from "@/blocks/elements/button/Button";
import Container from "@/blocks/elements/container/Container";
import Icon from "@/blocks/elements/icon/Icon";
import { useCarouselState } from "./function";
import { CarouselProps } from "./type";

const SLIDE_DURATION_MS = 400;

export const Carousel = ({
  items = [],
  autoPlay = false,
  interval = 4000,
  visibleItems = 4,
  showDots = false,
  className,
  contentClass,
  controlsClass,
  itemClass,
  ...props
}: CarouselProps) => {
  const { currentIndex, setCurrentIndex, next, previous } = useCarouselState(
    items.length,
    autoPlay,
    interval
  );

  const itemWidthPercent = items.length > 0 ? 100 / visibleItems : 100;
  const trackTranslatePercent = items.length > 0 ? (currentIndex * 100) / items.length : 0;

  return (
    <Container as="section" size="full" className={clsx("relative space-y-4 !px-0", className)} {...props}>
      <div className={clsx("relative w-full", contentClass)}>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={previous}
          className="absolute left-0 top-1/2 z-10 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300 bg-white/90 px-0 text-slate-700 shadow-sm hover:bg-white"
          aria-label="Previous carousel items"
        >
          <Icon name="ChevronLeft" size={22} />
        </Button>

        <div className="overflow-hidden">
          <div
            className={clsx("flex", controlsClass)}
            style={{
              transform: `translateX(-${trackTranslatePercent}%)`,
              transition: `transform ${SLIDE_DURATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className={clsx("min-w-0 shrink-0 pr-5 last:pr-0", itemClass)}
                style={{ flexBasis: `${itemWidthPercent}%` }}
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={next}
          className="absolute right-0 top-1/2 z-10 h-12 w-12 translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300 bg-white/90 px-0 text-slate-700 shadow-sm hover:bg-white"
          aria-label="Next carousel items"
        >
          <Icon name="ChevronRight" size={22} />
        </Button>
      </div>

      {showDots ? (
        <Container as="section" size="full" className="flex justify-center gap-2 !px-0">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={clsx(
                "h-2.5 w-2.5 rounded-full transition-colors duration-200",
                currentIndex === index ? "bg-slate-900" : "bg-slate-300"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </Container>
      ) : null}
    </Container>
  );
};

export default Carousel;

/*
Import:
import Carousel from "@/blocks/componets/carousel/Carousel";

Props:
- items: carousel item list with id and content
- autoPlay: enables automatic slide change
- interval: autoplay delay in milliseconds
- visibleItems: number of visible items in the row
- showDots: shows bottom navigation dots
- className: custom classes for the root wrapper
- contentClass: custom classes for the outer content wrapper
- controlsClass: custom classes for the item grid
- itemClass: custom classes for each visible item wrapper
- ...props: extra native section attributes
*/
