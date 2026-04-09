"use client";

import { motion } from "motion/react";
import GlassIcons from "@/blocks/elements/3d/GlassIcons/GlassIcons";
import Icon from "@/blocks/elements/icon/Icon";
import Container from "@/blocks/elements/container/Container";
import type { ContentAreaProps } from "./type";
import Image from "@/blocks/elements/image/Image";
import Text from "@/blocks/elements/text/Text";
import { cn } from "@/utilities/helpers/classMerge";
import { useLoaderExited } from "@/blocks/elements/3d/PageLoadLoader/functions";

/**
 * Hero / header: animations use `initial` + `animate` (run on first mount).
 * That matches “on page load” for above-the-fold content — not `whileInView`, so scrolling does not re-trigger.
 */

/** How long each move takes (seconds). Same for image + text blocks so timing feels consistent. */
const heroMoveMs = 0.55;

/**
 * Motion’s `"easeOut"` → same as CSS `ease-out`: fast at the start, smooth deceleration at the end.
 * (Browser DevTools / WAAPI show `ease-out` — easy to recognize and tweak.)
 */
const easeOut = "easeOut" as const;

/** Match Objective section title lines (split reveal). */
const titleEase = [0.76, 0, 0.24, 1] as const;
const titleDuration = 0.78;

/** Right column: gap between block 1 → 2 (contact) → 3 (icons). */
const gapAfterSectionS = 0.06;

/** Left image + right block 1 একই ফ্রেমে শুরু (০ = লোডার exit-এ সাথে সাথে). */
const delayHeroStartS = 0;

const heroTransition = (delay: number) => ({
  duration: heroMoveMs,
  delay,
  ease: easeOut,
});

/** Positive y = starts lower (below), animates to 0 = rises into place */
const heroImageInitial = { opacity: 0, y: 220 };
const heroImageAnimate = { opacity: 1, y: 0 };

/** Contact + social rows: slide up duration. */
const rowMoveMs = 0.4;

function rowSlideUp(delay: number, loaderExited: boolean) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: loaderExited ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: {
      duration: rowMoveMs,
      delay,
      ease: easeOut,
    },
  };
}

const ContentArea = ({
  imageSrc,
  imageAlt,
  preTitle,
  preTitleHighlight,
  titleLine1,
  titleLine2,
  socialLinks,
  contactEmail,
  contactPhone,
}: ContentAreaProps) => {
  const loaderExited = useLoaderExited();
  const mailtoHref = contactEmail ? `mailto:${contactEmail}` : "#";
  const telHref = contactPhone
    ? `tel:${contactPhone.replace(/[^\d+]/g, "")}`
    : "#";

  const hasContactPills = Boolean(contactEmail || contactPhone);

  /** Block 1: pre-title + headline line 1 একসাথে; line 2 অল্প পরে। */
  const headlineLine2StaggerS = 0.05;
  const delayTitleLine1S = delayHeroStartS;
  const delayTitleLine2S = delayHeroStartS + headlineLine2StaggerS;

  /** Block 1 শেষ — তারপর contact → icons. */
  const endBlock1S = titleLine2
    ? delayTitleLine2S + titleDuration
    : delayTitleLine1S + titleDuration;

  /** Block 2 — contact pills. */
  const delayContactPillsS = endBlock1S + gapAfterSectionS;
  /** Block 3 — social icons. */
  const delaySocialRowS = hasContactPills
    ? delayContactPillsS + rowMoveMs + gapAfterSectionS
    : endBlock1S + gapAfterSectionS;

  /** বাম ইমেজ = ডান ব্লক ১-এর সাথে প্যারালেল (একই delay). */
  const imageMotionProps = {
    initial: heroImageInitial,
    animate: loaderExited ? heroImageAnimate : heroImageInitial,
    transition: heroTransition(delayHeroStartS),
  };

  const badgeClass = cn(
    "inline-flex max-w-full items-center gap-3 rounded-full border border-[var(--primary)]/40",
    "bg-[var(--primary)]/8 px-2.5 py-1 text-[11px] font-semibold leading-tight tracking-wide",
    "font-open-sans textTextColor transition-colors hover:bg-[var(--primary)]/15",
    "break-all sm:break-normal sm:max-w-[min(100%,280px)]",
  );
  return (
    <Container
      as="div"
      className="relative z-10 flex maxContainer flex-col items-center gap-6 px-4 pb-0 pt-8 sm:px-6 sm:pt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:px-8 lg:pb-0 lg:pt-0"
    >
      <motion.div
        className="relative z-0 order-2 mx-auto flex w-full max-w-[min(100%,360px)] shrink-0 items-center justify-center sm:max-w-[min(100%,420px)] lg:order-1 lg:mx-0 lg:max-w-none lg:basis-[40%]"
        {...imageMotionProps}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={500}
          className="block object-contain object-bottom px-4 grayscale sm:px-6 lg:px-8"
          priority
        />
      </motion.div>
      <Container
        as="div"
        className="relative z-[2] order-1 flex w-full flex-col items-center justify-end text-center lg:order-2 lg:basis-[60%] lg:items-start lg:text-left"
      >
        <motion.div
          className="w-full overflow-hidden"
          initial="hidden"
          animate={loaderExited ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: {} }}
        >
          <motion.div
            className="relative -bottom-2"
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: "0%",
                transition: {
                  duration: titleDuration,
                  ease: titleEase,
                  delay: delayHeroStartS,
                },
              },
            }}
          >
            <Text
              variant="p"
              className="text-base font-semibold leading-relaxed textTextColor font-open-sans capitalize sm:text-lg"
            >
              {preTitle}{" "}
              <Text variant="span" className="primaryTextColor">
                {preTitleHighlight}
              </Text>
            </Text>
          </motion.div>
        </motion.div>

        <h1
          className={cn(
            "font-antonio flex flex-col",
            "text-[110px] font-bold text-[var(--primary)]",
            "leading-[120%] ",
          )}
        >
          <motion.div
            className="overflow-hidden"
            initial="hidden"
            animate={loaderExited ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: {} }}
          >
            <motion.span
              className="block leading-[inherit]"
              variants={{
                hidden: { y: "110%" },
                visible: {
                  y: "0%",
                  transition: {
                    duration: titleDuration,
                    ease: titleEase,
                    delay: delayTitleLine1S,
                  },
                },
              }}
            >
              {titleLine1}
            </motion.span>
          </motion.div>
          {titleLine2 ? (
            <motion.div
              className="overflow-hidden"
              initial="hidden"
              animate={loaderExited ? "visible" : "hidden"}
              variants={{ hidden: {}, visible: {} }}
            >
              <motion.span
                className="block leading-[inherit] md:inline lg:block"
                variants={{
                  hidden: { y: "-110%" },
                  visible: {
                    y: "0%",
                    transition: {
                      duration: titleDuration,
                      ease: titleEase,
                      delay: delayTitleLine2S,
                    },
                  },
                }}
              >
                {titleLine2}
              </motion.span>
            </motion.div>
          ) : null}
        </h1>

        {(contactEmail || contactPhone) && (
          <motion.div
            className="mt-4 mb-5 flex w-full flex-wrap items-center justify-center gap-2 overflow-hidden sm:mt-4 sm:mb-6 lg:justify-start"
            aria-label="Contact"
            {...rowSlideUp(delayContactPillsS, loaderExited)}
          >
            {contactEmail ? (
              <a href={mailtoHref} className={badgeClass}>
                <span className="shrink-0 opacity-90">Email:</span>
                <span className="min-w-0">{contactEmail}</span>
              </a>
            ) : null}
            {contactPhone ? (
              <a href={telHref} className={badgeClass}>
                <span className="shrink-0 opacity-90">Phone:</span>
                <span className="min-w-0">{contactPhone}</span>
              </a>
            ) : null}
          </motion.div>
        )}

        <motion.div
          className={cn(
            "relative z-10 flex w-full justify-center overflow-visible",
            "pt-2 pb-[30px] lg:justify-start",
          )}
          {...rowSlideUp(delaySocialRowS, loaderExited)}
        >
          <GlassIcons
            className="lg:mx-0"
            items={socialLinks.map((social) => ({
              icon: (
                <Icon
                  name={social.iconName}
                  size={20}
                  className="secondaryTextColor"
                />
              ),
              color: social.color,
              label: social.label,
              href: social.link,
            }))}
          />
        </motion.div>
      </Container>
    </Container>
  );
};

export default ContentArea;
