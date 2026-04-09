"use client";

import { useEffect, useRef } from "react";
import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import type { ProjectsOneProps } from "./type";
import { cn } from "@/utilities/helpers/classMerge";
import { ProjectCard } from "./component/card/ProjectCard";
import { PROJECT_DEMO_LIST } from "./component/data/Data";
import {
  animateScrollTo,
  clampScrollY,
  isScrollAnimationRunning,
  lockPageScroll,
  scrollDurationMs,
  scrollToSectionById,
  unlockPageScroll,
} from "@/blocks/elements/3d/SectionScrollSnap/functions";

const defaultTitle = "Experiments & Execution";

const SLIDE_COOLDOWN_MS = 520;

function getSlideElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>("[data-project-slide]"),
  );
}

/** কোন স্লাইডের কেন্দ্র কন্টেইনারের দৃশ্যমান কেন্দ্রের কাছাকাছি (offsetParent ভুল এড়িয়ে) */
function getActiveSlideIndex(
  container: HTMLElement,
  slides: HTMLElement[],
): number {
  if (slides.length === 0) return 0;
  const cr = container.getBoundingClientRect();
  const cx = cr.left + cr.width / 2;
  let best = 0;
  let bestDist = Infinity;
  slides.forEach((slide, i) => {
    const sr = slide.getBoundingClientRect();
    const center = sr.left + sr.width / 2;
    const d = Math.abs(center - cx);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  });
  return best;
}

function scrollToSlideIndex(
  container: HTMLElement,
  slides: HTMLElement[],
  index: number,
) {
  const slide = slides[index];
  if (!slide) return;
  const maxLeft = Math.max(0, container.scrollWidth - container.clientWidth);
  const cr = container.getBoundingClientRect();
  const sr = slide.getBoundingClientRect();
  const slideLeftInScroll =
    container.scrollLeft + (sr.left - cr.left);
  const target =
    slideLeftInScroll + sr.width / 2 - cr.width / 2;
  const left = Math.max(0, Math.min(target, maxLeft));
  container.scrollTo({ left, behavior: "smooth" });
}

const Project = ({
  title = defaultTitle,
  titleClassName,
}: ProjectsOneProps) => {
  const projects = PROJECT_DEMO_LIST;
  const projectsScrollRef = useRef<HTMLDivElement | null>(null);
  const slideBusyRef = useRef(false);

  const isProjectsSectionPinned = () => {
    const sec = document.getElementById("projects");
    if (!sec) return false;
    const r = sec.getBoundingClientRect();
    const vh = window.innerHeight;
    /* একটু ঢিলা — অল্প স্ক্রল অফসেটেও হিজ্যাক চলে */
    return r.top <= 20 && r.bottom >= vh - 20;
  };

  useEffect(() => {
    const el = projectsScrollRef.current;
    if (!el) return;

    const clearBusySoon = () => {
      window.setTimeout(() => {
        slideBusyRef.current = false;
      }, SLIDE_COOLDOWN_MS);
    };

    const onScrollEnd = () => {
      slideBusyRef.current = false;
    };

    el.addEventListener("scrollend", onScrollEnd);

    const wheelDeltaAxis = (e: WheelEvent) => {
      if (e.ctrlKey) return 0;
      let x = e.deltaX;
      let y = e.deltaY;
      if (e.deltaMode === 1) {
        x *= 16;
        y *= 16;
      } else if (e.deltaMode === 2) {
        x *= window.innerWidth;
        y *= window.innerHeight;
      }
      return Math.abs(x) > Math.abs(y) ? x : y;
    };

    const scrollToExperience = () => {
      if (isScrollAnimationRunning()) return;
      const exp = document.getElementById("experience");
      if (!exp) return;
      const targetY = clampScrollY(
        exp.getBoundingClientRect().top + window.scrollY,
      );
      const startY = window.scrollY;
      /* animateScrollTo — |delta|<0.5 হলে কলব্যাক নেই; busy সেট করার আগে বের হই */
      if (Math.abs(targetY - startY) < 0.5) return;
      slideBusyRef.current = true;
      animateScrollTo(targetY, scrollDurationMs, {
        onStart: lockPageScroll,
        onComplete: () => {
          unlockPageScroll();
          slideBusyRef.current = false;
        },
      });
    };

    /** প্রজেক্ট ক্যারোসেলের ঠিক উপরের সেকশন (টাইটেল) */
    const scrollToProjectTitle = () => {
      if (isScrollAnimationRunning()) return;
      const titleSec = document.getElementById("project-title");
      if (!titleSec) return;
      const targetY = clampScrollY(
        titleSec.getBoundingClientRect().top + window.scrollY,
      );
      const startY = window.scrollY;
      if (Math.abs(targetY - startY) < 0.5) return;
      slideBusyRef.current = true;
      animateScrollTo(targetY, scrollDurationMs, {
        onStart: lockPageScroll,
        onComplete: () => {
          unlockPageScroll();
          slideBusyRef.current = false;
        },
      });
    };

    const onWheel = (e: WheelEvent) => {
      if (!isProjectsSectionPinned()) return;

      const container = projectsScrollRef.current;
      if (!container) return;

      const slides = getSlideElements(container);
      if (slides.length === 0) return;

      const maxLeft = container.scrollWidth - container.clientWidth;
      const delta = wheelDeltaAxis(e);
      if (delta === 0) return;

      if (slideBusyRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (maxLeft <= 0) {
        e.preventDefault();
        e.stopPropagation();
        if (delta > 0) scrollToExperience();
        else if (delta < 0) scrollToProjectTitle();
        return;
      }

      const scrollLeft = container.scrollLeft;
      const EDGE_PX = 12;
      const atEnd = scrollLeft >= maxLeft - EDGE_PX;
      const atStart = scrollLeft <= EDGE_PX;

      const idx = getActiveSlideIndex(container, slides);

      if (delta > 0) {
        if (atEnd) {
          e.preventDefault();
          e.stopPropagation();
          scrollToExperience();
        } else {
          e.preventDefault();
          e.stopPropagation();
          slideBusyRef.current = true;
          const next = Math.min(idx + 1, slides.length - 1);
          scrollToSlideIndex(container, slides, next);
          clearBusySoon();
        }
      } else {
        if (atStart) {
          e.preventDefault();
          e.stopPropagation();
          scrollToProjectTitle();
        } else {
          e.preventDefault();
          e.stopPropagation();
          slideBusyRef.current = true;
          const prev = Math.max(idx - 1, 0);
          scrollToSlideIndex(container, slides, prev);
          clearBusySoon();
        }
      }
    };

    window.addEventListener("wheel", onWheel, { capture: true, passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      el.removeEventListener("scrollend", onScrollEnd);
    };
  }, []);

  if (projects.length === 0) {
    return null;
  }

  return (
    <>
      <Container
        as="section"
        className={cn(
          "relative flex h-screen min-h-screen w-full shrink-0 bg-secondary",
        )}
        id="project-title"
      >
        <div
          className={cn(
            "maxContainer mx-auto flex h-full w-full flex-col items-center justify-center px-10 py-12 text-center",
          )}
        >
          <Text
            variant="h2"
            className={cn(
              "inline-block text-[160px] font-bold capitalize leading-tight tracking-wide text-primary",
              titleClassName,
            )}
          >
            {title}
          </Text>
          <button
            type="button"
            className={cn(
              "projectTitleScrollArrow cursor-target mt-10 border-0 bg-transparent p-0 text-primary",
              "cursor-pointer",
              "focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-4 focus-visible:ring-offset-secondary",
            )}
            aria-label="Scroll to projects section"
            onClick={() => scrollToSectionById("projects")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 40"
              fill="none"
              className="block h-36 w-[4.5rem]"
            >
              {/*
                স্টেমের উপরের বিন্দু ফিক্সড; লাইনের 길ি y২ দিয়ে; চেভ্রন translate সিঙ্ক।
              */}
              <line
                x1={12}
                y1={4}
                x2={12}
                y2={23}
                stroke="currentColor"
                strokeWidth={4}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              >
                <animate
                  attributeName="y2"
                  values="18;23;18"
                  dur="1.8s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.5;1"
                  keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                />
              </line>
              <g>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 -5;0 0;0 -5"
                  dur="1.8s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.5;1"
                  keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                />
                <path
                  vectorEffect="non-scaling-stroke"
                  stroke="currentColor"
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 23l7 9 7-9"
                />
              </g>
            </svg>
          </button>
        </div>
      </Container>

      <Container
        as="section"
        id="projects"
        className={cn(
          "relative flex h-screen min-h-screen w-full shrink-0 bg-secondary",
        )}
      >
        <Container
          as="div"
          className={cn(
            "maxContainer mx-auto flex h-full min-h-0 w-full flex-1 flex-col justify-center px-10 py-10",
          )}
        >
          <div
            ref={projectsScrollRef}
            className={cn(
              "w-full snap-x snap-mandatory overflow-x-auto overflow-y-visible overscroll-x-contain",
              "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            )}
          >
            <div
              className={cn(
                "flex w-max flex-nowrap gap-10 pr-2",
              )}
            >
              {projects.map((project) => (
                <div
                  key={project.viewDetailsLink}
                  data-project-slide
                  className={cn(
                    "shrink-0 snap-center snap-always",
                    "flex col row-span-2",
                  )}
                >
                  <ProjectCard
                    scrollRootRef={projectsScrollRef}
                    imageSrc={project.imageSrc}
                    imageAlt={project.imageAlt}
                    category={project.category}
                    title={project.title}
                    features={project.features}
                    liveLink={project.liveLink}
                    viewDetailsLink={project.viewDetailsLink}
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
};

export default Project;
