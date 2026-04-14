"use client";

import { useEffect, useRef } from "react";
import {
  animateScrollTo,
  clampScrollY,
  isScrollAnimationRunning,
  lockPageScroll,
  scrollDurationMs,
  scrollToSectionById,
  setSnapCompleteListener,
  snapCooldownMs,
  thresholdForHeight,
  unlockPageScroll,
  visibleInViewport,
} from "./functions";
import {
  getPortfolioStackStep,
  isInPortfolioStackScrollZone,
  isPortfolioStackScrollLocked,
  portfolioCardCount,
  setPortfolioStackStep,
} from "@/blocks/sections/frontend/portfolio/functions";

/** স্ক্রল ইভেন্টে ডেল্টা এত কম হলে ইগনোর। */
const minDeltaPx = 1;

/** উপরে স্ন্যাপ: হিরো বটম সীমার হিস্টেরিসিস। */
const heroBottomSnapMarginPx = 12;

/** Experience থেকে স্ক্রল আপ — দুটো snap point:
 *  1. Timeline TOP এ → #projects
 *  2. Timeline BOTTOM এ (last item দেখা) → সরাসরি #projects (timeline rewind না করেই)
 *  মাঝপথে scroll up করলে শুধু timeline পিছিয়ে যাবে। */
function canSnapFromExperienceToProjects(
  scrollY: number,
  vpH: number,
  experience: HTMLElement,
  projects: HTMLElement,
  expRect: DOMRect,
  projectsRect: DOMRect,
): boolean {
  if (scrollY <= projects.offsetTop + 2) return false;
  if (expRect.bottom <= 0 || expRect.top >= vpH) return false;
  if (projectsRect.top >= 0 && projectsRect.top < vpH * 0.98) return false;
  // শুধু TOP এ — experience section এর একদম শুরুতে
  const atTop = scrollY <= experience.offsetTop + 24;
  if (!atTop) return false;
  return true;
}

/** #projects থেকে উপরে #project-title এ স্ন্যাপ (স্ক্রল আপ)। */
function canSnapFromProjectsListToTitle(
  scrollY: number,
  vpH: number,
  projectTitle: HTMLElement,
  projects: HTMLElement,
  listRect: DOMRect,
  titleRect: DOMRect,
): boolean {
  if (listRect.bottom <= 0 || listRect.top >= vpH) return false;
  if (scrollY < projects.offsetTop - vpH * 0.5) return false;
  if (titleRect.top >= 0) return false;
  return true;
}

/** #project-title থেকে #objective এ স্ন্যাপ আপ। */
function canSnapTitleToObjective(
  scrollY: number,
  vpH: number,
  projectTitle: HTMLElement,
  titleRect: DOMRect,
  objRect: DOMRect,
): boolean {
  if (titleRect.bottom <= 0 || titleRect.top >= vpH) return false;
  if (scrollY < projectTitle.offsetTop - vpH * 0.5) return false;
  if (objRect.top >= 0) return false;
  return true;
}

/** Experience timeline শেষ — এর ভেতরে আছি এবং একদম শেষে। */
function isExperienceScrollComplete(
  scrollY: number,
  vpH: number,
  experience: HTMLElement,
): boolean {
  const expEnd = experience.offsetTop + experience.offsetHeight;
  return scrollY >= expEnd - vpH - 24 && scrollY < expEnd - 2;
}

/** Experience section পার হওয়ার পরপরই — উপরে scroll করলে experience bottom এ snap। */
function isJustAfterExperience(
  scrollY: number,
  vpH: number,
  experience: HTMLElement,
): boolean {
  const exitY = experience.offsetTop + experience.offsetHeight;
  return scrollY >= exitY && scrollY <= exitY + vpH * 0.5;
}

/** project-two ও skills এর মাঝের স্ক্রল জোন — এখানে #project-title এ স্ন্যাপ করব না। */
function isInPortfolioSkillsScrollGap(
  scrollY: number,
  projectTwo: HTMLElement | null,
  skills: HTMLElement | null,
): boolean {
  if (!projectTwo || !skills) return false;
  return (
    scrollY >= projectTwo.offsetTop - 8 &&
    scrollY < skills.offsetTop - 8
  );
}

/**
 * #skills এ লম্বা স্ক্রল ট্র্যাক আছে — পুরো রেঞ্জে (স্টার্ট/এন্ড সহ) নেটিভ স্ক্রল দিয়ে কন্টেন্ট রিভিল;
 * JS স্ন্যাপ চালাব না, যাতে মাঝখানে না গিয়ে পরের সেকশনে লাফ না করে।
 */
function isInSkillsScrollInterior(scrollY: number, vpH: number): boolean {
  const skills = document.getElementById("skills");
  if (!skills) return false;
  if (skills.offsetHeight <= vpH + 1) return false;
  const start = skills.offsetTop;
  const end = start + skills.offsetHeight - vpH;
  const eps = 4;
  return scrollY >= start - eps && scrollY <= end + eps;
}

const scrollKeys = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
]);

function blockScrollKeys(e: KeyboardEvent) {
  if (!isScrollAnimationRunning()) return;
  if (scrollKeys.has(e.key)) {
    e.preventDefault();
  }
}

function blockTouchDuringSnap(e: TouchEvent) {
  if (!isScrollAnimationRunning()) return;
  e.preventDefault();
}

/**
 * হিরো ↔ অবজেক্টিভ ↔ #project-title ↔ #projects: JS স্ন্যাপ (ট্র্যাকপ্যাড/হুইল/স্ক্রল)।
 */
export default function SectionScrollSnap() {
  const lockUntilRef = useRef(0);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    /** হিরো/অবজেক্টিভ পরে মাউন্ট হলেও স্ন্যাপ চালু রাখতে — প্রতি ইভেন্টে `#id` রিসলভ। */
    lastScrollYRef.current = window.scrollY;

    setSnapCompleteListener(() => {
      lockUntilRef.current = performance.now() + snapCooldownMs;
    });

    let scrollRafId: number | null = null;

    const afterSnap = () => {
      unlockPageScroll();
      lockUntilRef.current = performance.now() + snapCooldownMs;
    };

    const snapOpts = {
      onStart: lockPageScroll,
      onComplete: afterSnap,
    };

    const runSnapLogic = () => {
      const now = performance.now();
      const scrollY = window.scrollY;

      if (isScrollAnimationRunning()) {
        lastScrollYRef.current = scrollY;
        return;
      }

      if (now < lockUntilRef.current) {
        lastScrollYRef.current = scrollY;
        return;
      }

      const delta = scrollY - lastScrollYRef.current;
      lastScrollYRef.current = scrollY;

      if (Math.abs(delta) < minDeltaPx) return;

      const vpH = window.innerHeight;
      if (isInSkillsScrollInterior(scrollY, vpH)) {
        return;
      }
      const hero = document.getElementById("hero");
      const objective = document.getElementById("objective");
      if (!hero || !objective) return;
      const heroRect = hero.getBoundingClientRect();
      const objRect = objective.getBoundingClientRect();
      const projectTitle = document.getElementById("project-title");
      const projects = document.getElementById("projects");
      const experience = document.getElementById("experience");
      const titleRect = projectTitle?.getBoundingClientRect();
      const projectsRect = projects?.getBoundingClientRect();
      const expRect = experience?.getBoundingClientRect();

      if (delta < 0) {
        // just after experience → snap to experience bottom
        if (experience && isJustAfterExperience(scrollY, vpH, experience)) {
          unlockPageScroll();
          const targetY = clampScrollY(
            experience.offsetTop + experience.offsetHeight - vpH,
          );
          animateScrollTo(targetY, scrollDurationMs, snapOpts);
          return;
        }

        // experience start → snap to projects
        if (
          experience &&
          projects &&
          expRect &&
          projectsRect &&
          canSnapFromExperienceToProjects(
            scrollY,
            vpH,
            experience,
            projects,
            expRect,
            projectsRect,
          )
        ) {
          unlockPageScroll();
          const targetY = clampScrollY(projects.offsetTop);
          animateScrollTo(targetY, scrollDurationMs, snapOpts);
          return;
        }
      }

      if (delta > 0) {
        // experience bottom → snap to next section (#intro)
        if (experience && isExperienceScrollComplete(scrollY, vpH, experience)) {
          unlockPageScroll();
          const targetY = clampScrollY(
            experience.offsetTop + experience.offsetHeight,
          );
          animateScrollTo(targetY, scrollDurationMs, snapOpts);
          return;
        }
      }

      if (delta > 0) {
        if (objRect.top <= 1) {
          const projectTwoEl = document.getElementById("project-two");
          const skillsEl = document.getElementById("skills");
          if (
            isInPortfolioStackScrollZone(scrollY) &&
            getPortfolioStackStep() < portfolioCardCount
          ) {
            return;
          }
          if (isInPortfolioSkillsScrollGap(scrollY, projectTwoEl, skillsEl)) {
            return;
          }
          if (
            projectTitle &&
            titleRect &&
            titleRect.top > 1
          ) {
            const stillBeforeTitle =
              scrollY < projectTitle.offsetTop + vpH - 1 &&
              titleRect.top > 2;
            const vis = visibleInViewport(titleRect);
            const need = thresholdForHeight(titleRect.height);
            if (!stillBeforeTitle && vis < need) return;

            unlockPageScroll();
            const targetY = clampScrollY(scrollY + titleRect.top);
            animateScrollTo(targetY, scrollDurationMs, {
              onStart: lockPageScroll,
              onComplete: afterSnap,
            });
            return;
          }

          if (
            projects &&
            projectsRect &&
            titleRect &&
            titleRect.top <= 8 &&
            projectsRect.top > 1
          ) {
            const stillBeforeList =
              scrollY < projects.offsetTop + vpH - 1 &&
              projectsRect.top > 2;
            const vis = visibleInViewport(projectsRect);
            const need = thresholdForHeight(projectsRect.height);
            if (!stillBeforeList && vis < need) return;

            unlockPageScroll();
            const targetY = clampScrollY(scrollY + projectsRect.top);
            animateScrollTo(targetY, scrollDurationMs, {
              onStart: lockPageScroll,
              onComplete: afterSnap,
            });
            return;
          }

          return;
        }

        const stillOnHeroZone =
          scrollY < vpH - 1 && objRect.top > 2;

        const vis = visibleInViewport(objRect);
        const need = thresholdForHeight(objRect.height);
        if (!stillOnHeroZone && vis < need) return;

        unlockPageScroll();
        const targetY = clampScrollY(scrollY + objRect.top);
        animateScrollTo(targetY, scrollDurationMs, snapOpts);
        return;
      }

      if (delta < 0) {
        if (isInPortfolioStackScrollZone(scrollY)) {
          return;
        }

        if (
          projectTitle &&
          projects &&
          experience &&
          titleRect &&
          projectsRect &&
          expRect &&
          canSnapFromProjectsListToTitle(
            scrollY,
            vpH,
            projectTitle,
            projects,
            projectsRect,
            titleRect,
          ) &&
          !canSnapFromExperienceToProjects(
            scrollY,
            vpH,
            experience,
            projects,
            expRect,
            projectsRect,
          )
        ) {
          unlockPageScroll();
          const targetY = clampScrollY(scrollY + titleRect.top);
          animateScrollTo(targetY, scrollDurationMs, snapOpts);
          return;
        }

        if (
          projectTitle &&
          titleRect &&
          canSnapTitleToObjective(
            scrollY,
            vpH,
            projectTitle,
            titleRect,
            objRect,
          )
        ) {
          unlockPageScroll();
          const skillsSnap = document.getElementById("skills");
          const targetY = skillsSnap
            ? clampScrollY(skillsSnap.offsetTop)
            : clampScrollY(scrollY + objRect.top);
          animateScrollTo(targetY, scrollDurationMs, snapOpts);
          return;
        }

        const vis = visibleInViewport(heroRect);
        const need = thresholdForHeight(heroRect.height);
        if (vis < need) return;
        if (heroRect.bottom >= vpH - heroBottomSnapMarginPx) return;

        unlockPageScroll();
        const targetY = clampScrollY(scrollY + heroRect.bottom - vpH);
        animateScrollTo(targetY, scrollDurationMs, snapOpts);
      }
    };

    const onScroll = () => {
      if (scrollRafId !== null) return;
      scrollRafId = requestAnimationFrame(() => {
        scrollRafId = null;
        runSnapLogic();
      });
    };

    const onWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY;
      const vpH = window.innerHeight;

      const projectTwoGuard = document.getElementById("project-two");
      if (
        projectTwoGuard &&
        e.deltaY > 0 &&
        isInPortfolioStackScrollZone(scrollY) &&
        getPortfolioStackStep() < portfolioCardCount
      ) {
        const pr = projectTwoGuard.getBoundingClientRect();
        if (pr.bottom > 8 && pr.top < vpH - 8) {
          if (isPortfolioStackScrollLocked()) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          /* Chain কুলডাউনে স্কিপ হলে এখানে স্টেপ বাড়াতে হবে — না হলে হুইল ব্লক হয় কোনো কাজ ছাড়াই */
          const step = getPortfolioStackStep();
          setPortfolioStackStep(step + 1);
          lockUntilRef.current = performance.now() + 420;
          return;
        }
      }

      /* স্ক্রল আপ: এক এক করে কার্ড নিচে (স্টেপ কমে) — Chain মিস হলে এখানে স্টেপ কমানো */
      if (
        projectTwoGuard &&
        e.deltaY < 0 &&
        isInPortfolioStackScrollZone(scrollY) &&
        getPortfolioStackStep() > 1
      ) {
        const pr = projectTwoGuard.getBoundingClientRect();
        if (pr.bottom > 8 && pr.top < vpH - 8) {
          if (isPortfolioStackScrollLocked()) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          const step = getPortfolioStackStep();
          setPortfolioStackStep(step - 1);
          lockUntilRef.current = performance.now() + 420;
          return;
        }
      }

      /* শুধু শেষ কার্ড (স্টেপ 1) — আপে objective */
      if (
        projectTwoGuard &&
        e.deltaY < 0 &&
        isInPortfolioStackScrollZone(scrollY) &&
        getPortfolioStackStep() === 1
      ) {
        const pr = projectTwoGuard.getBoundingClientRect();
        if (pr.bottom > 8 && pr.top < vpH - 8) {
          if (isPortfolioStackScrollLocked()) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          scrollToSectionById("objective");
          lockUntilRef.current = performance.now() + snapCooldownMs;
          return;
        }
      }

      if (isInSkillsScrollInterior(scrollY, vpH)) {
        return;
      }

      const hero = document.getElementById("hero");
      const objective = document.getElementById("objective");
      if (!hero || !objective) return;

      const heroRect = hero.getBoundingClientRect();
      const objRect = objective.getBoundingClientRect();
      const projectTitle = document.getElementById("project-title");
      const projects = document.getElementById("projects");
      const experience = document.getElementById("experience");
      const titleRect = projectTitle?.getBoundingClientRect();
      const projectsRect = projects?.getBoundingClientRect();
      const expRect = experience?.getBoundingClientRect();
      const projectTwo = document.getElementById("project-two");
      const skills = document.getElementById("skills");
      const inPortfolioSkillsGap = isInPortfolioSkillsScrollGap(
        scrollY,
        projectTwo,
        skills,
      );

      const inExperienceUpToProjectsZone =
        !!experience &&
        !!projects &&
        !!expRect &&
        !!projectsRect &&
        canSnapFromExperienceToProjects(
          scrollY,
          vpH,
          experience,
          projects,
          expRect,
          projectsRect,
        );

      const inProjectsListDownZone =
        !!projectTitle &&
        !!projects &&
        !!titleRect &&
        !!projectsRect &&
        objRect.top <= 1 &&
        titleRect.top <= 8 &&
        projectsRect.top > 2 &&
        scrollY < projects.offsetTop + vpH - 1;

      const inHeroDownZone = scrollY < vpH - 1 && objRect.top > 2;
      const inObjectiveUpZone =
        objRect.top <= 8 &&
        objRect.top >= -5 &&
        scrollY >= vpH * 0.4 &&
        scrollY < vpH * 2;

      const inProjectTitleDownZone =
        !!projectTitle &&
        !!titleRect &&
        objRect.top <= 1 &&
        titleRect.top > 2 &&
        scrollY < projectTitle.offsetTop + vpH - 1 &&
        !inPortfolioSkillsGap;

      const inProjectsListUpZone =
        !!projectTitle &&
        !!projects &&
        !!titleRect &&
        !!projectsRect &&
        !isInPortfolioStackScrollZone(scrollY) &&
        canSnapFromProjectsListToTitle(
          scrollY,
          vpH,
          projectTitle,
          projects,
          projectsRect,
          titleRect,
        );

      const inProjectTitleUpZone =
        !!projectTitle &&
        !!titleRect &&
        !isInPortfolioStackScrollZone(scrollY) &&
        canSnapTitleToObjective(
          scrollY,
          vpH,
          projectTitle,
          titleRect,
          objRect,
        );

      const inPortfolioStackUpZone =
        isInPortfolioStackScrollZone(scrollY) &&
        getPortfolioStackStep() > 1;

      const inExperienceBottomDownZone =
        !!experience && isExperienceScrollComplete(scrollY, vpH, experience);

      const inJustAfterExperienceUpZone =
        !!experience && isJustAfterExperience(scrollY, vpH, experience);

      if (isScrollAnimationRunning()) {
        e.preventDefault();
        return;
      }

      if (performance.now() < lockUntilRef.current) {
        if (
          (inHeroDownZone && e.deltaY > 0) ||
          (inObjectiveUpZone && e.deltaY < 0) ||
          (inProjectTitleDownZone && e.deltaY > 0) ||
          (inProjectsListDownZone && e.deltaY > 0) ||
          (inExperienceUpToProjectsZone && e.deltaY < 0) ||
          (inProjectsListUpZone && e.deltaY < 0) ||
          (inProjectTitleUpZone && e.deltaY < 0) ||
          (inPortfolioStackUpZone && e.deltaY < 0) ||
          (inExperienceBottomDownZone && e.deltaY > 0) ||
          (inJustAfterExperienceUpZone && e.deltaY < 0)
        ) {
          e.preventDefault();
        }
        return;
      }

      if (e.deltaY > 0) {
        // experience bottom → next section (#intro)
        if (inExperienceBottomDownZone && experience) {
          e.preventDefault();
          lockPageScroll();
          lastScrollYRef.current = scrollY;
          const targetY = clampScrollY(
            experience.offsetTop + experience.offsetHeight,
          );
          animateScrollTo(targetY, scrollDurationMs, {
            onStart: lockPageScroll,
            onComplete: afterSnap,
          });
          return;
        }

        if (objRect.top <= 1) {
          const skillsBlock = document.getElementById("skills");
          const projectTwoBlock = document.getElementById("project-two");
          if (
            skillsBlock &&
            projectTwoBlock &&
            getPortfolioStackStep() < portfolioCardCount &&
            scrollY < skillsBlock.offsetTop - 2 &&
            scrollY >= projectTwoBlock.offsetTop - 56
          ) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          if (inProjectTitleDownZone) {
            e.preventDefault();
            lockPageScroll();
            lastScrollYRef.current = scrollY;
            const targetY = clampScrollY(
              scrollY + (titleRect?.top ?? 0),
            );
            animateScrollTo(targetY, scrollDurationMs, {
              onStart: lockPageScroll,
              onComplete: afterSnap,
            });
            return;
          }
          if (
            inProjectsListDownZone &&
            projects &&
            projectsRect
          ) {
            e.preventDefault();
            lockPageScroll();
            lastScrollYRef.current = scrollY;
            const targetY = clampScrollY(scrollY + projectsRect.top);
            animateScrollTo(targetY, scrollDurationMs, {
              onStart: lockPageScroll,
              onComplete: afterSnap,
            });
          }
          return;
        }

        if (inHeroDownZone) {
          e.preventDefault();
          lockPageScroll();
          lastScrollYRef.current = scrollY;
          const targetY = clampScrollY(scrollY + objRect.top);
          animateScrollTo(targetY, scrollDurationMs, snapOpts);
        }
        return;
      }

      if (e.deltaY < 0) {
        // just after experience → experience bottom
        if (inJustAfterExperienceUpZone && experience) {
          e.preventDefault();
          lockPageScroll();
          lastScrollYRef.current = scrollY;
          const targetY = clampScrollY(
            experience.offsetTop + experience.offsetHeight - vpH,
          );
          animateScrollTo(targetY, scrollDurationMs, {
            onStart: lockPageScroll,
            onComplete: afterSnap,
          });
          return;
        }

        if (inExperienceUpToProjectsZone && projects) {
          e.preventDefault();
          lockPageScroll();
          lastScrollYRef.current = scrollY;
          const targetY = clampScrollY(projects.offsetTop);
          animateScrollTo(targetY, scrollDurationMs, {
            onStart: lockPageScroll,
            onComplete: afterSnap,
          });
          return;
        }
        if (inProjectsListUpZone && titleRect && !inExperienceUpToProjectsZone) {
          e.preventDefault();
          lockPageScroll();
          lastScrollYRef.current = scrollY;
          const targetY = clampScrollY(scrollY + titleRect.top);
          animateScrollTo(targetY, scrollDurationMs, snapOpts);
          return;
        }
        if (inProjectTitleUpZone) {
          e.preventDefault();
          lockPageScroll();
          lastScrollYRef.current = scrollY;
          const skillsSnap = document.getElementById("skills");
          const targetY = skillsSnap
            ? clampScrollY(skillsSnap.offsetTop)
            : clampScrollY(scrollY + objRect.top);
          animateScrollTo(targetY, scrollDurationMs, snapOpts);
          return;
        }

        if (heroRect.bottom >= vpH - heroBottomSnapMarginPx) return;

        if (inObjectiveUpZone) {
          e.preventDefault();
          lockPageScroll();
          lastScrollYRef.current = scrollY;
          const targetY = clampScrollY(scrollY + heroRect.bottom - vpH);
          animateScrollTo(targetY, scrollDurationMs, snapOpts);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchmove", blockTouchDuringSnap, {
      passive: false,
    });
    window.addEventListener("keydown", blockScrollKeys);

    return () => {
      setSnapCompleteListener(null);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", blockTouchDuringSnap);
      window.removeEventListener("keydown", blockScrollKeys);
      if (scrollRafId !== null) cancelAnimationFrame(scrollRafId);
      unlockPageScroll();
    };
  }, []);

  return null;
}
