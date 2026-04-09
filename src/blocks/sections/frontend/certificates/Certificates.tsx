"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import LogoLoop from "@/blocks/elements/3d/LogoLoop/LogoLoop";
import { cn } from "@/utilities/helpers/classMerge";
import { clientsData } from "./component/data/Data";
import type { ClientsProps } from "./type";
import { scrollToSectionById } from "@/blocks/elements/3d/SectionScrollSnap/functions";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const Clients = ({
  title = clientsData.title,
  paragraph = clientsData.paragraph,
}: ClientsProps = {}) => {
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      const section = document.getElementById("clients");
      if (!section) return;
      const scrollY = window.scrollY;

      /* DOWN at clients → intro */
      if (e.deltaY > 0 && Math.abs(scrollY - section.offsetTop) < 10) {
        e.preventDefault();
        e.stopImmediatePropagation();
        scrollToSectionById("intro");
        return;
      }

      /* UP at intro → clients */
      const intro = document.getElementById("intro");
      if (e.deltaY < 0 && intro && Math.abs(scrollY - intro.offsetTop) < 10) {
        e.preventDefault();
        e.stopImmediatePropagation();
        scrollToSectionById("clients");
      }
    };

    window.addEventListener("wheel", handler, { passive: false, capture: true });
    return () =>
      window.removeEventListener("wheel", handler, { capture: true });
  }, []);

  return (
    <Container
      as="section"
      id="clients"
      className={cn(
        "ternaryBacgroundColor relative flex h-screen w-full items-center",
        "px-5",
      )}
    >
      <Container
        className={cn(
          "maxContainer flex w-full flex-col gap-12 px-4 md:px-6",
          "lg:flex-row lg:items-center lg:gap-16",
        )}
      >
        {/* Left — title + paragraph */}
        <div className="flex w-full shrink-0 flex-col lg:max-w-[40%] lg:basis-[40%]">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Text
              variant="h2"
              className={cn(
                "font-antonio capitalize leading-tight text-secondary",
                "text-[100px]",
              )}
            >
              {title}
            </Text>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Text
              variant="p"
              className="mt-4 font-open-sans text-xl leading-relaxed text-secondary/75"
            >
              {paragraph}
            </Text>
          </motion.div>
        </div>

        {/* Right — logo loop */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="min-w-0 flex-1"
        >
          <LogoLoop
            logos={clientsData.logos}
            speed={40}
            direction="left"
            width="100%"
            logoHeight={80}
            gap={48}
            pauseOnHover
            fadeOut
            ariaLabel="Clients and companies"
            className="w-full min-w-0"
          />
        </motion.div>
      </Container>
    </Container>
  );
};

export default Clients;
