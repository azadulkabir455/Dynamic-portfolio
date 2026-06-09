"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Container from "@/blocks/elements/container/Container";
import LogoLoop from "@/blocks/elements/3d/LogoLoop/LogoLoop";
import CertArch from "./component/arch/CertArch";
import Modal from "./component/modal/Modal";
import { certificates, type Certificate } from "./component/data/Data";
import type { LogoLoopItem } from "@/blocks/elements/3d/LogoLoop/type";

const CARD_W = 350;
const CARD_H = 250;
const LIFT = 110;

const Certificates = () => {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let rafId: number;

    const update = () => {
      const containerRect = section.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const cards = section.querySelectorAll<HTMLElement>("[data-cert-card]");

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(centerX - cardCenterX);
        // cosine bell curve: 0 at edges → 1 at center
        const range = CARD_W + 60; // one card + gap
        const t = Math.max(0, 1 - distance / range);
        const curve = t * t * (3 - 2 * t); // smoothstep for natural arc
        const lift = LIFT * curve;
        card.style.transform = `translateY(-${lift.toFixed(1)}px)`;
        card.style.opacity = String((0.45 + 0.55 * curve).toFixed(3));
      });

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const loopItems = useMemo<LogoLoopItem[]>(
    () =>
      certificates.map((cert) => ({
        node: (
          <div
            style={{
              width: CARD_W,
              height: CARD_H + LIFT,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div
              data-cert-card
              className="relative cursor-pointer overflow-hidden rounded-lg shadow-2xl"
              style={{
                width: CARD_W,
                height: CARD_H,
              }}
              onClick={() => setSelected(cert)}
            >
              <Image
                src={cert.src}
                alt={cert.alt}
                fill
                sizes={`${CARD_W}px`}
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        ),
        title: cert.title,
      })),
    [setSelected],
  );

  return (
    <>
      <Container
        as="section"
        ref={sectionRef}
        id="certificates"
        className="ternaryLightBacgroundColor relative w-full pt-[120px]"
      >
        <CertArch />
        <Container className="maxContainer" style={{ paddingTop: 40, paddingBottom: 60 }}>
          <LogoLoop
            logos={loopItems}
            speed={80}
            direction="left"
            width="100%"
            logoHeight={CARD_H + LIFT}
            gap={60}
            pauseOnHover
            ariaLabel="Certificates"
          />
        </Container>
      </Container>

      {selected && (
        <Modal
          src={selected.src}
          alt={selected.alt}
          title={selected.title}
          originalWidth={selected.originalWidth}
          originalHeight={selected.originalHeight}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
};

export default Certificates;
