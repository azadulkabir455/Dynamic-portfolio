"use client";

import { useEffect, useMemo, useState } from "react";
import Particles from "@/blocks/elements/3d/Particles/Particles";
import Container from "@/blocks/elements/container/Container";
import type { HeroBannerData, HeroBannerProps } from "./type";
import ContentArea from "@/blocks/sections/frontend/heroBanner/component/contentArea/ContentArea";
import { defaultHeroBannerData } from "@/blocks/sections/frontend/heroBanner/component/data/Data";
import { readHeroBannerDataFromStorage } from "@/utilities/dashboard/heroBannerStorage";
import { cn } from "@/utilities/helpers/classMerge";

const HeroBanner = ({ content, variant = "default" }: HeroBannerProps) => {
  const isDashboardPreview = variant === "dashboardPreview";
  const [stored, setStored] = useState<HeroBannerData | null>(null);

  useEffect(() => {
    setStored(readHeroBannerDataFromStorage());
    const sync = () => setStored(readHeroBannerDataFromStorage());
    window.addEventListener("hero-banner-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("hero-banner-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const data = useMemo(() => {
    const base = stored ?? defaultHeroBannerData;
    return content != null
      ? { ...defaultHeroBannerData, ...base, ...content }
      : { ...defaultHeroBannerData, ...base };
  }, [content, stored]);

  const {
    imageSrc,
    imageAlt,
    introText,
    name,
    designation,
    experience,
    aboutMe,
    ctaURL,
    ctaLabel,
    socialLinks,
  } = data;

  return (
    <Container
      as="section"
      id="hero"
      className="relative"
    >
      <Container
        as="div"
        className="relative flex min-h-0 flex-1 flex-col justify-start"
      >
        <Container
          as="div"
          className={cn("absolute inset-0 z-5 overflow-hidden", isDashboardPreview && "pointer-events-none")}
        >
          <Particles
            particleColors={["#C33F40"]}
            particleCount={200}
            particleSpread={9}
            speed={0.08}
            particleBaseSize={80}
            moveParticlesOnHover={!isDashboardPreview}
            alphaParticles={false}
            disableRotation={false}
            pixelRatio={1}
          />
        </Container>

        <ContentArea
          name={name}
          designation={designation}
          introText={introText}
          experience={experience}
          aboutMe={aboutMe}
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          ctaURL={ctaURL}
          socialLinks={socialLinks}
          ctaLabel={ctaLabel}
          hideScrollDownButton={isDashboardPreview}
        />
      </Container>
    </Container>
  );
};

export default HeroBanner;
