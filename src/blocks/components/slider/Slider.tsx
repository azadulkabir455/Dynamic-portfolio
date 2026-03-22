"use client";

import clsx from "clsx";
import Button from "@/blocks/elements/button/Button";
import Card from "@/blocks/elements/card/Card";
import Container from "@/blocks/elements/container/Container";
import Image from "@/blocks/elements/image/Image";
import Link from "@/blocks/elements/link/Link";
import Text from "@/blocks/elements/text/Text";
import { useSliderState } from "./function";
import { SliderItem, SliderProps } from "./type";

const SLIDE_DURATION_MS = 450;

function SlideContent({
  item,
  contentClass,
  overlayClass,
}: {
  item: SliderItem;
  contentClass?: string;
  overlayClass?: string;
}) {
  return (
    <Container
      as="section"
      size="full"
      className={clsx(
        "absolute inset-0 flex flex-col items-center justify-center bg-slate-950/35 text-center text-white",
        overlayClass
      )}
    >
      <Container as="section" size="md" className={clsx("space-y-4", contentClass)}>
        {item.content ? (
          item.content
        ) : (
          <>
            {item.title ? (
              <Text variant="h2" className="text-4xl font-bold uppercase tracking-[0.08em] text-white sm:text-6xl">
                {item.title}
              </Text>
            ) : null}
            {item.description ? (
              <Text variant="p" className="mx-auto max-w-2xl text-sm font-medium uppercase tracking-[0.18em] text-white/90 sm:text-base">
                {item.description}
              </Text>
            ) : null}
            {item.buttonLabel ? (
              item.buttonHref ? (
                <Link
                  href={item.buttonHref}
                  variant="default"
                  className="justify-center text-base font-semibold text-white underline underline-offset-4 hover:text-white/80"
                >
                  {item.buttonLabel}
                </Link>
              ) : (
                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                  {item.buttonLabel}
                </Button>
              )
            ) : null}
          </>
        )}
      </Container>
    </Container>
  );
}

export const Slider = ({
  items = [],
  autoPlay = false,
  interval = 4000,
  className,
  contentClass,
  overlayClass,
  imageClass,
  ...props
}: SliderProps) => {
  const { currentIndex, setCurrentIndex, next, previous } = useSliderState(
    items.length,
    autoPlay,
    interval
  );

  const trackTranslatePercent = items.length > 0 ? (currentIndex * 100) / items.length : 0;

  return (
    <Container as="section" size="full" className={clsx("space-y-4 !px-0", className)} {...props}>
      <Card className="relative overflow-hidden" padding="none">
        <div className={clsx("relative min-h-[430px] w-full", imageClass)}>
          <div className="h-full w-full overflow-hidden">
            <div
              className="flex h-full w-full"
              style={{
                width: items.length > 0 ? `${items.length * 100}%` : "100%",
                transform: `translateX(-${trackTranslatePercent}%)`,
                transition: `transform ${SLIDE_DURATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
              }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative h-[430px] min-w-0 shrink-0"
                  style={{ width: items.length > 0 ? `${100 / items.length}%` : "100%" }}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={1600}
                    height={900}
                    priority={item.id === items[0]?.id}
                    className="h-full w-full object-cover"
                  />
                  <SlideContent item={item} contentClass={contentClass} overlayClass={overlayClass} />
                </div>
              ))}
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={previous}
            className="absolute left-4 top-1/2 z-10 h-11 w-11 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 px-0 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
          >
            {"<"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={next}
            className="absolute right-4 top-1/2 z-10 h-11 w-11 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 px-0 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
          >
            {">"}
          </Button>
        </div>
      </Card>

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
    </Container>
  );
};

export default Slider;

/*
Import:
import Slider from "@/blocks/componets/slider/Slider";

Props:
- items: slide list with image, alt, and overlay content
- autoPlay: enables automatic slide change
- interval: autoplay delay in milliseconds
- className: custom classes for the root wrapper
- contentClass: custom classes for the centered content area
- overlayClass: custom classes for the image overlay
- imageClass: custom classes for the image wrapper
- ...props: extra native section attributes
*/
