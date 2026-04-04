"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import Image from "@/blocks/elements/image/Image";
import { cn } from "@/utilities/helpers/classMerge";
import type { ObjectiveProps } from "./type";
import { defaultObjectiveData } from "./component/data/Data";

const TITLE_EASE = [0.76, 0, 0.24, 1] as const;
const TITLE_DURATION = 0.78;

const LOGO_MOVE_S = 0.55;
const LOGO_EASE_OUT = "easeOut" as const;
const BETWEEN_ROWS_S = 0.12;

/** Matches Tailwind `lg:` — 2 cols below, 3 cols at lg+. */
function useLogoGridColumns(): 2 | 3 {
  const [cols, setCols] = useState<2 | 3>(2);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setCols(mq.matches ? 3 : 2);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return cols;
}

function logoRowDelay(index: number, cols: 2 | 3) {
  const row = Math.floor(index / cols);
  return row * (LOGO_MOVE_S + BETWEEN_ROWS_S);
}

const inViewFull = {
  once: true,
  amount: "all" as const,
  margin: "0px",
};

const inViewParagraph = {
  once: true,
  amount: 0.92,
  margin: "0px",
};

const Objective = (props: ObjectiveProps) => {
  const logoCols = useLogoGridColumns();
  const { titlePrefix, titleEmphasis, paragraph, logos } = {
    ...defaultObjectiveData,
    ...props,
  };

  const titleLineClass = cn(
    "font-antonio text-secondary font-bold tracking-wide capitalize",
    "text-[50px] leading-[1.1]",
    "md:text-[clamp(3rem,7vw,5.5rem)]",
    "lg:text-[100px] lg:leading-[110%]",
  );

  return (
    <Container
      as="section"
      id="objective"
      className={cn(
        "bg-primary rounded-b-xl",
        "maxContainer",
        "px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16",
        "lg:px-10 lg:pb-[120px] lg:pt-[120px]",
      )}
    >
      <Container
        as="div"
        className={cn(
          "border-t border-secondary",
          "pt-10 sm:pt-14",
          "lg:pt-[120px]",
        )}
      >
        <Container
          as="div"
          className={cn(
            "flex flex-col gap-8",
            "lg:flex-row lg:items-center lg:gap-10",
          )}
        >
          <Container
            as="div"
            className={cn(
              "flex w-full flex-col gap-4 sm:gap-5",
              "lg:basis-1/2 lg:shrink-0",
            )}
          >
            <h2 className="m-0 flex flex-col p-0">
              <motion.div
                className="overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={inViewFull}
                variants={{ hidden: {}, visible: {} }}
              >
                <motion.span
                  className={cn(titleLineClass, "block")}
                  variants={{
                    hidden: { y: "110%" },
                    visible: {
                      y: "0%",
                      transition: {
                        duration: TITLE_DURATION,
                        ease: TITLE_EASE,
                        delay: 0.02,
                      },
                    },
                  }}
                >
                  {titlePrefix}
                </motion.span>
              </motion.div>
              <motion.div
                className="overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={inViewFull}
                variants={{ hidden: {}, visible: {} }}
              >
                <motion.span
                  className={cn(titleLineClass, "block md:inline lg:block")}
                  variants={{
                    hidden: { y: "-110%" },
                    visible: {
                      y: "0%",
                      transition: {
                        duration: TITLE_DURATION,
                        ease: TITLE_EASE,
                        delay: 0.08,
                      },
                    },
                  }}
                >
                  {titleEmphasis}
                </motion.span>
              </motion.div>
            </h2>

            <motion.div
              className="overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={inViewParagraph}
              variants={{ hidden: {}, visible: {} }}
            >
              <motion.div
                variants={{
                  hidden: { y: "100%", opacity: 0 },
                  visible: {
                    y: "0%",
                    opacity: 1,
                    transition: {
                      duration: 0.58,
                      delay: 0.12,
                      ease: TITLE_EASE,
                    },
                  },
                }}
              >
                <Text
                  variant="p"
                  className={cn(
                    "mt-0",
                    "text-secondary",
                    "font-open-sans",
                    "text-base leading-relaxed sm:text-lg",
                    "lg:mt-2 lg:text-xl",
                  )}
                >
                  {paragraph}
                </Text>
              </motion.div>
            </motion.div>
          </Container>

          <Container
            as="div"
            className={cn(
              "w-full shrink-0",
              "grid grid-cols-2 gap-0.5 p-1.5",
              "lg:basis-1/2 lg:grid-cols-3",
              "rounded-xl",
              "overflow-hidden",
            )}
          >
            {logos.map((logo, index) => (
              <motion.div
                key={`objective-logo-${index}`}
                className={cn(
                  "overflow-hidden rounded-[10px]",
                  "min-h-[140px] sm:min-h-[160px]",
                  "lg:min-h-[200px]",
                )}
                initial="hidden"
                whileInView="visible"
                viewport={inViewFull}
                variants={{ hidden: {}, visible: {} }}
              >
                <motion.div
                  className={cn(
                    "flex h-full min-h-[inherit] w-full items-center justify-center",
                    "bg-[#d35a5a]",
                    "border border-[#c95050]",
                    "rounded-[10px]",
                  )}
                  variants={{
                    hidden: { y: "100%", opacity: 0 },
                    visible: {
                      y: "0%",
                      opacity: 1,
                      transition: {
                        duration: LOGO_MOVE_S,
                        delay: logoRowDelay(index, logoCols),
                        ease: LOGO_EASE_OUT,
                      },
                    },
                  }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={150}
                    height={44}
                    className={cn(
                      "w-auto object-contain",
                      "h-7 sm:h-8",
                      "grayscale brightness-0 invert opacity-90",
                      "lg:h-9",
                    )}
                  />
                </motion.div>
              </motion.div>
            ))}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Objective;
