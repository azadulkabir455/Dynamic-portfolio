"use client";

import { useEffect, useRef } from "react";
import {
  animateScrollTo,
  clampScrollY,
  isScrollAnimationRunning,
  lockPageScroll,
  scrollDurationMs,
  scrollToSectionById,
  snapCooldownMs,
  unlockPageScroll,
} from "./functions";
import {
  getPortfolioStackStep,
  isInPortfolioStackScrollZone,
  isPortfolioStackScrollLocked,
  portfolioCardCount,
  setPortfolioStackStep,
} from "@/blocks/sections/frontend/portfolio/functions";

const TOP_EPS = 14;

function near(a: number, b: number, eps: number) {
  return Math.abs(a - b) < eps;
}

/**
 * স্কিলস ট্র্যাকের একদম শেষে — sticky ভিউপোর্টে কন্টেন্ট পুরো রিভিল হওয়ার পরেই।
 * আগের abs(endY−28) ছিল ভুল: ট্র্যাক শেষ হওয়ার আগেই পরের সেকশনে চলে যেত।
 */
function nearSkillsScrollEnd(
  scrollY: number,
  skills: HTMLElement,
  vpH: number,
): boolean {
  const endY = skills.offsetTop + skills.offsetHeight - vpH;
  const EPS = 10;
  if (scrollY < endY - EPS) return false;
  if (scrollY > endY + 40) return false;
  return true;
}

/**
 * পোর্টফোলিও সেকশন ভিউতে + skills এর আগে — স্ক্রল রেঞ্জ সরু হলে চেইন ফায়ার হত না, SectionScrollSnap চলে যেত।
 */
function shouldHandlePortfolioStackWheel(
  scrollY: number,
  projectTwo: HTMLElement,
  skills: HTMLElement | null,
  vpH: number,
): boolean {
  if (!skills) return false;
  if (scrollY >= skills.offsetTop - 2) return false;
  const r = projectTwo.getBoundingClientRect();
  if (r.bottom <= 0 || r.top >= vpH) return false;
  /* ল্যান্ডিং জোন: objective এর পরে বা পোর্টফোলিও টপের কাছে */
  return scrollY >= projectTwo.offsetTop - 56;
}

export default function SectionScrollChain() {
  const lockUntilRef = useRef(0);

  useEffect(() => {
    let rafScrollClamp = 0;
    const clampScrollWhilePortfolioStackIncomplete = () => {
      if (rafScrollClamp) return;
      rafScrollClamp = requestAnimationFrame(() => {
        rafScrollClamp = 0;
        if (isScrollAnimationRunning()) return;
        if (getPortfolioStackStep() >= portfolioCardCount) return;
        if (!isInPortfolioStackScrollZone(window.scrollY)) return;
        const skills = document.getElementById("skills");
        if (!skills) return;
        const vpH = window.innerHeight;
        const maxY = Math.max(0, skills.offsetTop - vpH);
        if (window.scrollY > maxY + 1) {
          window.scrollTo({ top: maxY, behavior: "instant" });
        }
      });
    };
    window.addEventListener("scroll", clampScrollWhilePortfolioStackIncomplete, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", clampScrollWhilePortfolioStackIncomplete);
      if (rafScrollClamp) cancelAnimationFrame(rafScrollClamp);
    };
  }, []);

  useEffect(() => {
    const afterNavigate = (extraMs = 0) => {
      lockUntilRef.current = performance.now() + snapCooldownMs + extraMs;
    };

    const handler = (e: WheelEvent) => {
      if (isScrollAnimationRunning()) return;
      if (performance.now() < lockUntilRef.current) return;

      const scrollY = window.scrollY;
      const vpH = window.innerHeight;
      const delta = e.deltaY;
      if (Math.abs(delta) < 1) return;

      const objective = document.getElementById("objective");
      const projectTwo = document.getElementById("project-two");
      const skills = document.getElementById("skills");
      const projectTitle = document.getElementById("project-title");
      const clients = document.getElementById("clients");
      const intro = document.getElementById("intro");
      const footer = document.getElementById("footer");

      if (objective && projectTwo && delta > 0 && near(scrollY, objective.offsetTop, TOP_EPS)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        /* ডানদিকে প্রথম আইটেম আগে থেকেই দেখা — স্ক্রলের আগে স্টেপ সেট (লেআউট লাফ কমে) */
        setPortfolioStackStep(1);
        scrollToSectionById("project-two");
        afterNavigate(0);
        return;
      }

      if (
        objective &&
        projectTwo &&
        skills &&
        shouldHandlePortfolioStackWheel(scrollY, projectTwo, skills, vpH)
      ) {
        if (isPortfolioStackScrollLocked()) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return;
        }
        const step = getPortfolioStackStep();

        if (delta > 0) {
          if (step < portfolioCardCount) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            setPortfolioStackStep(step + 1);
            /* ট্র্যাকপ্যাডে এক জেসচারে একাধিক হুইল — পরের সেকশনে আগে চলে যাওয়া কমে */
            afterNavigate(420);
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          afterNavigate(scrollDurationMs);
          scrollToSectionById("skills", () => {
            setPortfolioStackStep(1);
            afterNavigate(0);
          });
          return;
        }

        if (delta < 0) {
          if (step > 1) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            setPortfolioStackStep(step - 1);
            afterNavigate(420);
            return;
          }
          /* step === 1: শুধু নিচের (লাস্ট রিমেইনিং) কার্ড — পরের আপে objective */
          if (step === 1) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            scrollToSectionById("objective");
            afterNavigate(0);
            return;
          }
          /* step === 0: দুর্লভ — আগে প্রথম কার্ড দেখানো */
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          setPortfolioStackStep(1);
          afterNavigate(420);
          return;
        }
      }

      if (skills && projectTitle) {
        if (delta > 0 && nearSkillsScrollEnd(scrollY, skills, vpH)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          scrollToSectionById("project-title");
          afterNavigate();
          return;
        }
        if (delta < 0 && near(scrollY, skills.offsetTop, TOP_EPS)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          if (projectTwo) {
            setPortfolioStackStep(portfolioCardCount);
            animateScrollTo(clampScrollY(projectTwo.offsetTop), scrollDurationMs, {
              onStart: lockPageScroll,
              onComplete: () => {
                unlockPageScroll();
                afterNavigate();
              },
            });
          } else {
            scrollToSectionById("project-two");
            afterNavigate();
          }
          return;
        }
      }

      if (skills && projectTitle && delta < 0 && near(scrollY, projectTitle.offsetTop, TOP_EPS)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        scrollToSectionById("skills");
        afterNavigate();
        return;
      }

      if (clients && intro) {
        if (delta > 0 && near(scrollY, clients.offsetTop, TOP_EPS)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          scrollToSectionById("intro");
          afterNavigate();
          return;
        }
        if (delta < 0 && near(scrollY, intro.offsetTop, TOP_EPS)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          scrollToSectionById("clients");
          afterNavigate();
          return;
        }
      }

      if (intro && footer) {
        if (delta > 0 && near(scrollY, intro.offsetTop, TOP_EPS)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          scrollToSectionById("footer");
          afterNavigate();
          return;
        }
        if (delta < 0 && near(scrollY, footer.offsetTop, TOP_EPS)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          scrollToSectionById("intro");
          afterNavigate();
          return;
        }
      }
    };

    window.addEventListener("wheel", handler, { passive: false, capture: true });
    return () =>
      window.removeEventListener("wheel", handler, { capture: true });
  }, []);

  return null;
}
