"use client";

import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
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

/** Section টপ ভিউপোর্ট টপে এলে (স্ন্যাপ/স্ক্রল) একবার `visible` — সব অ্যানিমেশন একসাথে। */
const SECTION_TOP_ALIGN_PX = 2;

function useObjectiveSectionReveal(sectionRef: RefObject<HTMLElement | null>) {
  const [phase, setPhase] = useState<"hidden" | "visible">("hidden");
  const doneRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tick = () => {
      if (doneRef.current) return;
      const top = el.getBoundingClientRect().top;
      if (top <= SECTION_TOP_ALIGN_PX) {
        doneRef.current = true;
        setPhase("visible");
      }
    };

    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, [sectionRef]);

  return phase;
}

const Objective = (props: ObjectiveProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionAnimate = useObjectiveSectionReveal(sectionRef);
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
    <section
      ref={sectionRef}
      id="objective"
      className={cn(
        "-mt-px flex h-[100vh] min-h-[100vh] max-h-[100vh] w-full shrink-0 flex-col overflow-hidden",
        "bg-[var(--secondary)]",
      )}
    >
      <Container
        as="div"
        className={cn(
          "maxContainer w-full flex-1",
          "bg-primary rounded-b-xl",
          "overflow-x-hidden",
          "lg:px-10",
        )}
      >
      <Container
        as="div"
        className={cn(
          "pt-10 sm:pt-14",
          "lg:pt-[120px]",
        )}
      >
        <Container
          as="div"
          className={cn(
            "flex flex-col gap-8",
            "lg:flex-row lg:items-center lg:gap-10",
            "min-w-0",
          )}
        >
          <Container
            as="div"
            className={cn(
              "flex w-full min-w-0 flex-col gap-4 sm:gap-5",
              "lg:flex-1",
            )}
          >
            <h2 className="m-0 flex flex-col p-0 font-antonio">
              <motion.div
                className="overflow-hidden"
                initial="hidden"
                animate={sectionAnimate}
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
                animate={sectionAnimate}
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
              animate={sectionAnimate}
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
              "w-full min-w-0 shrink-0",
              "grid grid-cols-2 gap-1",
              "lg:flex-1 lg:grid-cols-3",
              "rounded-xl",
              "overflow-hidden",
            )}
          >
            {logos.map((logo, index) => (
              <motion.div
                key={`objective-logo-${index}`}
                className={cn(
                  "overflow-hidden rounded-[10px]",
                  "min-h-[200px]",
                )}
                initial="hidden"
                animate={sectionAnimate}
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
                        delay: 0,
                        ease: LOGO_EASE_OUT,
                      },
                    },
                  }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={200}
                    height={200}
                    className={cn(
                      "h-[200px] w-auto max-w-full object-contain",
                      "grayscale brightness-0 invert opacity-90",
                    )}
                  />
                </motion.div>
              </motion.div>
            ))}
          </Container>
        </Container>
      </Container>
      </Container>
    </section>
  );
};

export default Objective;
