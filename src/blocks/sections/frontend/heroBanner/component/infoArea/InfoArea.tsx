"use client";

import { motion } from "motion/react";
import Container from "@/blocks/elements/container/Container";
import ScrollDownButton from "@/blocks/elements/3d/ScrollDownButton/ScrollDownButton";
import CircularText from "@/blocks/elements/3d/CircularText/CircularText";
import { cn } from "@/utilities/helpers/classMerge";
import type { InfoAreaProps } from "./type";
import AnimatedButton from "@/blocks/elements/3d/AnimatedButton/AnimatedButton";
import Text from "@/blocks/elements/text/Text";
import { useLoaderExited } from "@/blocks/elements/3d/PageLoadLoader/functions";

/** Same feel as hero ContentArea: bottom → top, opacity 0→1, CSS ease-out */
const INFO_MOVE_S = 0.55;
const EASE_OUT = "easeOut" as const;

function slideUp(delay: number) {
  return {
    initial: { opacity: 0, y: 44 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: INFO_MOVE_S,
      delay,
      ease: EASE_OUT,
    },
  };
}

function gatedSlideUp(delay: number, loaderExited: boolean) {
  const m = slideUp(delay);
  return {
    initial: m.initial,
    animate: loaderExited ? m.animate : m.initial,
    transition: m.transition,
  };
}

/** Stagger for the three CTA buttons (left → right on desktop, top → bottom on mobile) */
const BUTTON_DELAYS = [0.34, 0.46, 0.58] as const;

function WhatsAppGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function whatsappHrefFromNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "#";
}

const InfoArea = ({
  introCircleText,
  introText,
  contactEmail,
  whatsappNumber,
  cvHref,
  cvFileName,
}: InfoAreaProps) => {
  const loaderExited = useLoaderExited();
  const mailtoHref = contactEmail ? `mailto:${contactEmail}` : "#";
  const whatsappHref = whatsappHrefFromNumber(whatsappNumber);

  return (
    <Container
      as="div"
      className={cn(
        "maxContainer",
        "relative z-20",
        "flex flex-col items-center gap-6 p-6 text-center sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-10 lg:text-left",
        "rounded-t-xl",
        "bg-[var(--primary)] text-[var(--secondary)]",
      )}
    >
      <motion.div
        className="relative z-10 order-2 flex w-full shrink-0 flex-col items-center justify-center py-2 lg:order-1 lg:basis-[40%] lg:py-0"
        {...gatedSlideUp(0.08, loaderExited)}
      >
        <ScrollDownButton parentClassName="cursor-target absolute z-10" />
        <CircularText
          text={introCircleText}
          onHover="pause"
          spinDuration={20}
          className=""
          textClassName="text-xl uppercase font-medium font-antonio text-secondary sm:text-2xl lg:text-3xl"
        />
      </motion.div>

      <Container
        as="div"
        className="order-1 flex w-full flex-col items-center justify-start gap-4 text-center lg:order-2 lg:basis-[60%] lg:items-start lg:gap-6 lg:text-left"
      >
        <motion.div
          className="flex w-full flex-col items-stretch gap-3 lg:gap-4"
          {...gatedSlideUp(0.2, loaderExited)}
        >
          <Text
            as="p"
            className="secondaryTextColor m-0 mt-0 text-center text-base text-semibold leading-relaxed sm:text-lg lg:text-left lg:text-xl"
          >
            {introText}
          </Text>
        </motion.div>
        <Container
          as="div"
          className="relative z-10 flex w-full max-w-full flex-col items-stretch gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:justify-start lg:gap-5"
        >
          <motion.div
            className="w-full lg:w-[220px] lg:max-w-none"
            {...gatedSlideUp(BUTTON_DELAYS[0], loaderExited)}
          >
            <AnimatedButton
              text="WhatsApp"
              link={whatsappHref}
              iconNode={<WhatsAppGlyph size={22} />}
              iconSize={22}
              iconClassName="secondaryTextColor text-lg uppercase font-bold"
              className="w-full max-w-full justify-start border-1 px-3 secondaryBorderColor lg:w-[220px] lg:max-w-none"
              target="_blank"
              rel="noopener noreferrer"
            />
          </motion.div>
          <motion.div
            className="w-full lg:w-[220px] lg:max-w-none"
            {...gatedSlideUp(BUTTON_DELAYS[1], loaderExited)}
          >
            <AnimatedButton
              text="Email Me"
              link={mailtoHref}
              icon="Mail"
              iconSize={22}
              iconClassName="secondaryTextColor text-lg uppercase font-bold"
              className="w-full max-w-full justify-start border-1 px-3 secondaryBorderColor lg:w-[220px] lg:max-w-none"
            />
          </motion.div>
          <motion.div
            className="w-full lg:w-[220px] lg:max-w-none"
            {...gatedSlideUp(BUTTON_DELAYS[2], loaderExited)}
          >
            <AnimatedButton
              text="Download CV"
              link={cvHref}
              downloadFile={cvFileName}
              icon="Download"
              iconSize={22}
              iconClassName="secondaryTextColor text-lg uppercase font-bold"
              className="w-full max-w-full justify-start border-1 px-3 secondaryBorderColor lg:w-[220px] lg:max-w-none"
              target="_blank"
              rel="noopener noreferrer"
            />
          </motion.div>
        </Container>
      </Container>
    </Container>
  );
};

export default InfoArea;
