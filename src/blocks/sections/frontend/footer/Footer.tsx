"use client";

import { useEffect, useRef } from "react";
import Container from "@/blocks/elements/container/Container";
import { cn } from "@/utilities/helpers/classMerge";
import type { FooterProps } from "./type";
import {
  animateScrollTo,
  clampScrollY,
  lockPageScroll,
  unlockPageScroll,
  scrollDurationMs,
} from "@/blocks/elements/3d/SectionScrollSnap/functions";

const EASE = "cubic-bezier(0.72,0,0.28,1)";
const DUR_S = scrollDurationMs / 1000;

function defaultTelHref(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, "");
  return cleaned ? `tel:${cleaned}` : "#";
}

const Footer = ({
  ownerLabel = "Portfolio",
  year = new Date().getFullYear(),
  email = "hello@example.com",
  phone = "+880 1XXX XXX XXX",
  phoneHref,
}: FooterProps = {}) => {
  const tel = phoneHref ?? defaultTelHref(phone);
  const busyRef = useRef(false);

  useEffect(() => {
    const handler = (e: WheelEvent) => {
      if (busyRef.current) return;
      const footer = document.querySelector("footer") as HTMLElement | null;
      const portfolio = document.getElementById("project-two");
      if (!footer || !portfolio) return;

      const scrollY = window.scrollY;
      const vpH = window.innerHeight;
      const portfolioEndY = portfolio.offsetTop + portfolio.offsetHeight - vpH;

      const fixPortfolio = (startTranslate: number) => {
        portfolio.style.cssText = `
          position:fixed;top:0;left:0;width:100%;
          height:${portfolio.offsetHeight}px;
          z-index:50;overflow-y:hidden;
          transform:translateY(-${startTranslate}px);
        `;
      };

      /* ── DOWN: portfolio bottom → footer ── */
      if (e.deltaY > 0 && Math.abs(scrollY - portfolioEndY) < 30) {
        e.preventDefault();
        e.stopImmediatePropagation();
        busyRef.current = true;

        const offset = portfolio.offsetHeight - vpH;
        fixPortfolio(offset);

        requestAnimationFrame(() => {
          portfolio.style.transition = `transform ${DUR_S}s ${EASE}`;
          portfolio.style.transform = `translateY(-${offset + vpH}px)`;
        });

        animateScrollTo(clampScrollY(footer.offsetTop), scrollDurationMs, {
          onStart: lockPageScroll,
          onComplete: () => {
            unlockPageScroll();
            portfolio.style.cssText = "";
            busyRef.current = false;
          },
        });
        return;
      }

      /* ── UP: footer top → portfolio bottom ── */
      if (e.deltaY < 0 && Math.abs(scrollY - footer.offsetTop) < 10) {
        e.preventDefault();
        e.stopImmediatePropagation();
        busyRef.current = true;

        const offset = portfolio.offsetHeight - vpH;
        fixPortfolio(offset + vpH);

        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            portfolio.style.transition = `transform ${DUR_S}s ${EASE}`;
            portfolio.style.transform = `translateY(-${offset}px)`;
          }),
        );

        animateScrollTo(clampScrollY(portfolioEndY), scrollDurationMs, {
          onStart: lockPageScroll,
          onComplete: () => {
            unlockPageScroll();
            portfolio.style.cssText = "";
            busyRef.current = false;
          },
        });
      }
    };

    window.addEventListener("wheel", handler, { passive: false, capture: true });
    return () =>
      window.removeEventListener("wheel", handler, { capture: true });
  }, []);

  return (
    <Container
      as="footer"
      className={cn("flex h-screen w-full items-center bg-secondary px-4 py-5 md:px-5 md:py-6")}
    >
      <Container
        as="div"
        className={cn(
          "maxContainer flex w-full flex-col gap-4 rounded-xl bg-secondary px-4 py-6 sm:px-5 sm:py-7 md:flex-row md:items-center md:justify-between md:gap-6 md:px-6 md:py-8",
        )}
      >
        <p className="font-open-sans text-base font-bold text-primary sm:text-lg">
          © {year} {ownerLabel}. All rights reserved.
        </p>
        <div
          className={cn(
            "flex flex-col gap-3 font-open-sans text-base font-bold sm:flex-row sm:items-center sm:gap-6 sm:text-right sm:text-lg",
          )}
        >
          <a
            href={`mailto:${email}`}
            className={cn(
              "font-bold text-primary underline-offset-4 transition-opacity hover:opacity-85 hover:underline",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            )}
          >
            {email}
          </a>
          <a
            href={tel}
            className={cn(
              "font-bold text-primary underline-offset-4 transition-opacity hover:opacity-85 hover:underline",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            )}
          >
            {phone}
          </a>
        </div>
      </Container>
    </Container>
  );
};

export default Footer;
