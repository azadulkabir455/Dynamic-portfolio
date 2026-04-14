"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Container from "@/blocks/elements/container/Container";
import Image from "@/blocks/elements/image/Image";
import Text from "@/blocks/elements/text/Text";
import { cn } from "@/utilities/helpers/classMerge";
import type { SkillsProps } from "./type";
import { defaultSkillsData } from "./component/data/Data";

/** এর চেয়ে কম পিক্সেল ট্র্যাক হলে সেকশন ১০০vh — কোনো স্ক্রল-থ্রু/রিভিল নয়, সরাসরি পরের সেকশন */
const MIN_SKILLS_SCROLL_TRACK_PX = 120;

function SkillsFooterBlock() {
  return (
    <Container
      as="div"
      className={cn(
        "mt-8 grid gap-4 rounded-2xl border border-dashed border-secondary/25 bg-secondary/5 p-6 md:grid-cols-2 md:p-8",
      )}
    >
      <Text
        variant="p"
        className={cn(
          "font-open-sans text-sm leading-relaxed text-secondary/85 md:text-base",
        )}
      >
        I also spend time on API integration patterns, Git workflows, code
        review habits, and pairing with design so specs translate cleanly into
        components. Tooling evolves, but the goal stays the same: interfaces
        that feel fast, intentional, and easy to extend.
      </Text>
      <Text
        variant="p"
        className={cn(
          "font-open-sans text-sm leading-relaxed text-secondary/85 md:text-base",
        )}
      >
        When learning something new, I prefer small experiments in a side
        branch: prove the idea, measure the trade-offs, then fold the winner
        into the main line of work without surprising the rest of the codebase.
      </Text>
    </Container>
  );
}

const Skills = (props: SkillsProps = {}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  /** স্কিলস স্ক্রল ট্র্যাকের ভেতরে — ভিউপোর্টে bg ইমেজ + গ্রেডিয়েন্ট ফিক্সড (কন্টেন্ট translateY দিয়ে রিভিল) */
  const [skillsViewportPinned, setSkillsViewportPinned] = useState(false);

  const {
    title,
    subtitle,
    backgroundImage,
    backgroundAlt,
    items,
  } = {
    ...defaultSkillsData,
    ...props,
  };

  useEffect(() => {
    const measure = () => {
      if (!contentRef.current) return;
      const ch = contentRef.current.scrollHeight;
      const vh = window.innerHeight;
      /* ভিউপোর্ট উচ্চতা vh; কন্টেন্ট ch। শেষে নিচে সারিবাঁধা দেখাতে translate = -(ch−vh)।
         +80 বা extra slack দিলে শেষে বেশি উপরে উঠে হেডার কাটা পড়ে। */
      const raw = Math.max(0, ch - vh);
      setScrollDistance(raw >= MIN_SKILLS_SCROLL_TRACK_PX ? raw : 0);
    };
    measure();
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [items.length]);

  useLayoutEffect(() => {
    const syncPinned = () => {
      const el = sectionRef.current;
      if (!el) return;
      const vpH = window.innerHeight;
      const y = window.scrollY;
      const start = el.offsetTop;
      const end = start + el.offsetHeight - vpH;
      setSkillsViewportPinned(y >= start - 2 && y <= end + 4);
    };
    syncPinned();
    window.addEventListener("scroll", syncPinned, { passive: true });
    window.addEventListener("resize", syncPinned);
    return () => {
      window.removeEventListener("scroll", syncPinned);
      window.removeEventListener("resize", syncPinned);
    };
  }, [scrollDistance]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  const sectionH =
    scrollDistance > 0 ? `calc(100vh + ${scrollDistance}px)` : "100vh";

  const sectionBgStyle = {
    height: sectionH,
    minHeight: "100vh" as const,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover" as const,
    backgroundPosition: "center" as const,
    backgroundRepeat: "no-repeat" as const,
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={cn("relative isolate w-full overflow-hidden")}
      style={sectionBgStyle}
      data-skills-scroll-track={scrollDistance > 0 ? "true" : "false"}
    >
      {/* সেকশনজুড়ে গ্রেডিয়েন্ট — স্ক্রল করলে সেকশনের সাথে চলে; বডির বেইজ গ্যাপ ঢাকে */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0",
          "bg-gradient-to-b from-[var(--ternary)]/35 via-[var(--ternary)]/22 to-[var(--ternary)]/18",
        )}
        aria-hidden
      />

      {/* ট্র্যাকের ভেতরে: ভিউপোর্টে ইমেজ+গ্রেডিয়েন্ট ফিক্সড — কন্টেন্ট শুধু উপরে সরে রিভিল */}
      {skillsViewportPinned && (
        <div
          className={cn(
            "pointer-events-none fixed inset-x-0 top-0 z-[1]",
            "h-[100dvh] min-h-screen w-full overflow-hidden",
          )}
          aria-hidden
        >
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt=""
              fill
              priority={false}
              sizes="100vw"
              className={cn("object-cover")}
              aria-hidden
            />
          </div>
          <div
            className={cn(
              "absolute inset-0",
              "bg-gradient-to-b from-[var(--ternary)]/35 via-[var(--ternary)]/22 to-[var(--ternary)]/18",
            )}
          />
        </div>
      )}

      {/* স্টিকি ফ্রেম: শুধু স্ক্রলিং কন্টেন্ট — ব্যাকগ্রাউন্ড fixed লেয়ারের উপর */}
      <div
        className={cn(
          "sticky top-0 z-[2]",
          "h-[100dvh] min-h-screen w-full overflow-hidden",
        )}
      >
        <motion.div
          style={{ y: scrollDistance > 0 ? contentY : 0 }}
          className={cn(
            "relative z-10 flex w-full flex-col bg-transparent",
            "px-4 sm:px-6 md:px-8",
          )}
        >
          <div
            ref={contentRef}
            className={cn(
              "maxContainer flex w-full flex-col py-[80px]",
            )}
          >
            <Text
              variant="h2"
              className={cn(
                "font-antonio text-[clamp(2.25rem,6vw,5rem)] font-bold capitalize leading-[1.05] tracking-tight text-secondary",
              )}
            >
              {title}
            </Text>
            <Text
              variant="p"
              className={cn(
                "font-open-sans mt-4 max-w-3xl text-base leading-relaxed text-secondary/95 sm:text-lg md:mt-5 md:text-xl",
              )}
            >
              {subtitle}
            </Text>

            <Container
              as="div"
              className={cn(
                "mt-8 grid w-full gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6",
              )}
            >
              {items.map((item, index) => (
                <Container
                  key={`${item.name}-${index}`}
                  as="article"
                  className={cn(
                    "rounded-2xl border border-secondary/20 bg-secondary/10 p-5 backdrop-blur-sm",
                    "transition-colors duration-200 hover:border-secondary/35 hover:bg-secondary/15",
                    "md:p-6",
                  )}
                >
                  <Text
                    variant="h3"
                    className={cn(
                      "font-antonio text-xl font-bold capitalize leading-snug text-secondary md:text-2xl",
                    )}
                  >
                    {item.name}
                  </Text>
                  <Text
                    variant="p"
                    className={cn(
                      "font-open-sans mt-3 text-sm leading-relaxed text-secondary/90 md:text-base",
                    )}
                  >
                    {item.blurb}
                  </Text>
                </Container>
              ))}
            </Container>

            <SkillsFooterBlock />
            <SkillsFooterBlock />
            <SkillsFooterBlock />
            <SkillsFooterBlock />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
