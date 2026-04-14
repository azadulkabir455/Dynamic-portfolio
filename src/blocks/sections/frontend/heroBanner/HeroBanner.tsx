"use client";

import Particles from "@/blocks/elements/3d/Particles/Particles";
import Container from "@/blocks/elements/container/Container";
import type { HeroBannerProps } from "./type";
import ContentArea from "@/blocks/sections/frontend/heroBanner/component/contentArea/ContentArea";
import { defaultHeroBannerData } from "@/blocks/sections/frontend/heroBanner/component/data/Data";

const HeroBanner = ({ content }: HeroBannerProps) => {
  const data =
    content != null
      ? { ...defaultHeroBannerData, ...content }
      : defaultHeroBannerData;

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
        <Container as="div" className="absolute inset-0 z-5 overflow-hidden">
          <Particles
            particleColors={["#C33F40"]}
            particleCount={200}
            particleSpread={9}
            speed={0.08}
            particleBaseSize={80}
            moveParticlesOnHover
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
        />
      </Container>
    </Container>
  );
};

export default HeroBanner;
