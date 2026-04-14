"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import type { BubbleMenuProps } from "./type";
import { defaultItems, randomMenuTilt } from "./functions";
import { cn } from "@/utilities/helpers/classMerge";
import Container from "@/blocks/elements/container/Container";
import Button from "@/blocks/elements/button/Button";

const BubbleMenu = ({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = "Toggle menu",
  menuBg = "#fff",
  menuContentColor = "#111",
  useFixedPosition = false,
  items,
  animationEase = "back.out(1.5)",
  animationDuration = 0.5,
  staggerDelay = 0.12,
}: BubbleMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const bubblesRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const handleDocPointerDown = (e: MouseEvent | TouchEvent) => {
    const target = e.target as Node | null;
    if (!target) return;

    const clickedToggle =
      target instanceof Element &&
      target.closest('[data-bubble-menu-toggle="true"]');
    if (clickedToggle) return;

    const clickedPillLink =
      target instanceof Element && target.closest(".pill-link");
    if (clickedPillLink) return;

    setIsMenuOpen(false);
    onMenuClick?.(false);
  };

  const sourceItems = items?.length ? items : defaultItems;
  const menuItems = useMemo(
    () =>
      sourceItems.map((item) => ({
        ...item,
        rotation: randomMenuTilt(),
      })),
    [sourceItems],
  );

  const navJustifyClass = logo ? "justify-between" : "justify-end";

  const containerClassName = [
    "bubble-menu",
    useFixedPosition ? "fixed" : "absolute",
    "left-0 right-0 top-8",
    `flex items-center ${navJustifyClass}`,
    "gap-4 px-8",
    "pointer-events-none",
    "z-[1001]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean) as HTMLDivElement[];
    const labels = labelRefs.current.filter(Boolean) as HTMLSpanElement[];

    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: "flex" });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });
        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase,
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: "power3.out",
            },
            `-=${animationDuration * 0.9}`,
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: "power3.in",
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          setShowOverlay(false);
        },
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  useEffect(() => {
    if (!isMenuOpen) return;

    document.addEventListener("mousedown", handleDocPointerDown);
    document.addEventListener("touchstart", handleDocPointerDown, {
      passive: true,
    });

    return () => {
      document.removeEventListener("mousedown", handleDocPointerDown);
      document.removeEventListener("touchstart", handleDocPointerDown);
    };
  }, [isMenuOpen, onMenuClick]);

  const overlayPointerClass = isMenuOpen ? "pointer-events-auto" : "pointer-events-none";

  return (
    <>
      <style>{`
        .bubble-menu .menu-line {
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }

        .bubble-menu .menu-icon-spin {
          transform-origin: center;
          will-change: transform;
        }
        @media (min-width: 900px) {
          .bubble-menu-items .pill-scale-wrap .pill-link {
            transform: rotate(var(--item-rot));
            transform-origin: center center;
          }
          .bubble-menu-items .pill-scale-wrap .pill-link:hover {
            transform: rotate(var(--item-rot)) scale(1.06);
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
          }
          .bubble-menu-items .pill-scale-wrap .pill-link:active {
            transform: rotate(var(--item-rot)) scale(0.94);
          }
        }
        @media (max-width: 899px) {
          .bubble-menu-items {
            padding-top: 120px;
            align-items: flex-start;
          }
          .bubble-menu-items .pill-list .pill-col {
            overflow: visible;
          }
          .bubble-menu-items .pill-link {
            font-size: clamp(1.2rem, 3vw, 4rem);
            padding: clamp(1rem, 2vw, 2rem) 0;
            min-height: 80px !important;
          }
          .bubble-menu-items .pill-link:hover {
            transform: scale(1.06);
            background: var(--hover-bg);
            color: var(--hover-color);
          }
          .bubble-menu-items .pill-link:active {
            transform: scale(.94);
          }
        }
      `}</style>

      <nav className={containerClassName} style={style} aria-label="Main navigation">
        {logo ? (
          <Container
            as="div"
            className={[
              "bubble logo-bubble",
              "inline-flex items-center justify-center",
              "rounded-full",
              "border-2 border-secondary bg-primary",
              "shadow-[0_4px_16px_rgba(0,0,0,0.12)]",
              "pointer-events-auto",
              "h-12 md:h-14",
              "px-4 md:px-8",
              "gap-2",
              "will-change-transform",
            ].join(" ")}
            aria-label="Logo"
            style={{
              minHeight: "48px",
              borderRadius: "9999px",
            }}
          >
            <Container
              as="span"
              className="inline-flex items-center justify-center w-[120px] h-full"
              style={{
                ["--logo-max-height" as any]: "60%",
                ["--logo-max-width" as any]: "100%",
              }}
            >
              {logo}
            </Container>
          </Container>
        ) : null}

        <Button
          type="button"
          className={[
            "bubble toggle-bubble menu-btn",
            isMenuOpen ? "open" : "",
            "inline-flex flex-col items-center justify-center",
            "rounded-full",
            "relative border-2 border-secondary bg-primary",
            "cursor-target",
            "pointer-events-auto",
            "box-border h-12 min-h-12 w-12 min-w-12",
            "cursor-pointer p-3",
            "will-change-transform",
          ].join(" ")}
          onClick={handleToggle}
          data-bubble-menu-toggle="true"
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
        >
          <Container
            as="span"
            className={[
              "menu-icon-spin absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col",
              isMenuOpen
                ? "items-center justify-center gap-0"
                : "items-start justify-center gap-[5px]",
            ].join(" ")}
          >
            {isMenuOpen ? (
              <>
                <Container
                  as="span"
                  className="menu-line block shrink-0 rounded-full bg-secondary"
                  style={{
                    width: 22,
                    height: 3,
                    transform: "rotate(45deg)",
                  }}
                />
                <Container
                  as="span"
                  className="menu-line block shrink-0 rounded-full bg-secondary"
                  style={{
                    width: 22,
                    height: 3,
                    marginTop: -3,
                    transform: "rotate(-45deg)",
                  }}
                />
              </>
            ) : (
              <>
                <Container
                  as="span"
                  className="menu-line block shrink-0 rounded-full bg-secondary"
                  style={{ width: 20, height: 3 }}
                />
                <Container
                  as="span"
                  className="menu-line block shrink-0 rounded-full bg-secondary"
                  style={{ width: 14, height: 3 }}
                />
                <Container
                  as="span"
                  className="menu-line block shrink-0 rounded-full bg-secondary"
                  style={{ width: 8, height: 3 }}
                />
              </>
            )}
          </Container>
        </Button>
      </nav>

      {showOverlay && (
        <div
          ref={overlayRef}
          className={[
            "bubble-menu-items",
            "fixed",
            "inset-0",
            "flex items-center justify-center",
            overlayPointerClass,
            "z-[1000]",
          ].join(" ")}
          aria-hidden={!isMenuOpen}
        >
          <ul
            className={[
              "pill-list",
              "list-none m-0 grid w-full max-w-[1600px] grid-cols-1 gap-[20px] px-6",
              "mx-auto min-[900px]:grid-cols-12",
              "pointer-events-auto",
            ].join(" ")}
            role="menu"
            aria-label="Menu links"
          >
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                role="none"
                className={cn(
                  "pill-col box-border flex w-full min-w-0 justify-center items-stretch",
                  idx < 3 ? "min-[900px]:col-span-4" : "min-[900px]:col-span-3",
                  idx === 3 &&
                    menuItems.length === 4 &&
                    "min-[900px]:col-start-5",
                )}
              >
                <div
                  className="pill-scale-wrap flex w-full justify-center"
                  style={{ transformOrigin: "50% 50%" }}
                  ref={(el) => {
                    bubblesRef.current[idx] = el;
                  }}
                >
                  <a
                    role="menuitem"
                    href={item.href}
                    aria-label={item.ariaLabel || item.label}
                    className={[
                      "pill-link",
                      "w-full",
                      "rounded-[999px]",
                      "no-underline",
                      "border-2 border-secondary",
                      "bg-white",
                      "text-inherit",
                      "font-open-sans capitalize text-center",
                      "cursor-target",
                      "shadow-[0_4px_14px_rgba(0,0,0,0.10)]",
                      "flex items-center justify-center",
                      "relative",
                      "transition-[transform,background,color] duration-300 ease-in-out",
                      "box-border",
                      "whitespace-nowrap overflow-hidden",
                    ].join(" ")}
                    style={{
                      ["--item-rot" as any]: `${item.rotation ?? 0}deg`,
                      ["--pill-bg" as any]: menuBg,
                      ["--pill-color" as any]: menuContentColor,
                      ["--hover-bg" as any]: item.hoverStyles?.bgColor || "#f3f4f6",
                      ["--hover-color" as any]: item.hoverStyles?.textColor || menuContentColor,
                      background: "var(--pill-bg)",
                      color: "var(--pill-color)",
                      minHeight: "var(--pill-min-h, 160px)",
                      padding: "clamp(1.5rem, 3vw, 8rem) 0",
                      fontSize: "clamp(1.5rem, 4vw, 4rem)",
                      fontWeight: 400,
                      lineHeight: 1.2,
                      willChange: "transform",
                    }}
                  >
                    <span
                      className="pill-label inline-block"
                      style={{
                        willChange: "transform, opacity",
                        height: "1.2em",
                        lineHeight: 1.2,
                      }}
                      ref={(el) => {
                        labelRefs.current[idx] = el;
                      }}
                    >
                      {item.label}
                    </span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default BubbleMenu;

